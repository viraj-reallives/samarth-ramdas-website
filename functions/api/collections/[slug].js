// GET /api/collections/:slug   (e.g. /api/collections/ringtones, /api/collections/daswani)
//
// The single generic detail endpoint. Replaces the type-specific
// /api/ringtones and /api/gallery/[slug] routes.
//
// It returns items for ANY collection, shaping each item according to the
// collection's type so the consuming React page gets what it expects:
//   - audio    -> { id, slug, titleMr, titleEn, audioUrl }
//   - gallery  -> { id, num, src, alt, titleMr, titleEn }
//   - other    -> a sensible generic shape { id, slug, title, url, ... }
//
// The response wraps the items with collection metadata so the page has
// everything in one request:
//   { slug, title, type, description, count, items: [...] }

export async function onRequestGet({ env, params }) {
    try {
      const slug = params.slug;
  
      const collection = await env.DB.prepare(
        `SELECT id, title, collection_type, description, is_published
           FROM collections
          WHERE slug = ?`
      ).bind(slug).first();
  
      if (!collection) {
        return Response.json({ error: "Collection not found" }, { status: 404 });
      }
  
      const { results } = await env.DB.prepare(
        `SELECT id, item_number, slug, title, title_mr, title_en, r2_key, mime_type
           FROM collection_items
          WHERE collection_id = ?
          ORDER BY sort_order`
      ).bind(collection.id).all();
  
      const base = env.R2_BASE.replace(/\/$/, "");
      const url = (key) => `${base}/${key}`;
  
      // Shape each item according to the collection's type.
      const shapers = {
        audio: (r) => ({
          id: r.id,
          slug: r.slug,
          titleMr: r.title_mr,
          titleEn: r.title_en,
          audioUrl: url(r.r2_key),
        }),
        gallery: (r) => {
          const n = r.item_number;
          return {
            id: n,
            num: String(n).padStart(2, "0"),
            src: url(r.r2_key),
            alt: r.title_mr || `पृष्ठ ${n}`,
            titleMr: r.title_mr,
            titleEn: r.title_en,
          };
        },
      };
      // Fallback shape for book / event / news / video until they have pages.
      const generic = (r) => ({
        id: r.id,
        slug: r.slug,
        num: r.item_number,
        title: r.title,
        titleMr: r.title_mr,
        titleEn: r.title_en,
        url: url(r.r2_key),
        mimeType: r.mime_type,
      });
  
      const shape = shapers[collection.collection_type] || generic;
      const items = results.map(shape);
  
      return Response.json(
        {
          slug: collection.slug ?? slug,
          title: collection.title,
          type: collection.collection_type,
          description: collection.description,
          count: items.length,
          items,
        },
        { headers: { "Cache-Control": "public, max-age=300" } }
      );
    } catch (err) {
      return Response.json(
        { error: "Failed to load collection", detail: String(err) },
        { status: 500 }
      );
    }
  }