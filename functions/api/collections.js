// GET /api/collections
// Returns the index of all published collections, so the app can build
// navigation / landing pages without hardcoding what exists.
//
// Shape: { slug, title, type, description, count, thumbnail }

export async function onRequestGet({ env }) {
    try {
      const { results } = await env.DB.prepare(
        `SELECT slug, title, collection_type, description,
                total_items, thumbnail_key
           FROM collections
          WHERE is_published = 1
          ORDER BY title`
      ).all();
  
      const base = env.R2_BASE.replace(/\/$/, "");
      const collections = results.map((c) => ({
        slug: c.slug,
        title: c.title,
        type: c.collection_type,
        description: c.description,
        count: c.total_items,
        // thumbnail_key may be null; only build a URL if present
        thumbnail: c.thumbnail_key ? `${base}/${c.thumbnail_key}` : null,
      }));
  
      return Response.json(collections, {
        headers: { "Cache-Control": "public, max-age=300" },
      });
    } catch (err) {
      return Response.json(
        { error: "Failed to load collections", detail: String(err) },
        { status: 500 }
      );
    }
  }