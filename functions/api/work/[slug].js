// GET /api/work/:slug
// Single content item with full metadata and grouped facet tags.

import { jsonResponse } from "../../lib/jsonResponse.js";

export async function onRequestGet({ env, params }) {
  try {
    let slug = params.slug;
    try {
      slug = decodeURIComponent(slug);
    } catch {
      // keep raw slug if decoding fails
    }

    const item = await env.DB.prepare(
      `SELECT slug, title_mr, title_en, file_type, file_key,
              thumbnail_key, filesize_bytes, created_at
         FROM content_items
        WHERE slug = ?`
    )
      .bind(slug)
      .first();

    if (!item) {
      return jsonResponse({ error: "Work not found" }, { status: 404 });
    }

    const { results: facetRows } = await env.DB.prepare(
      `SELECT f.type, f.slug, f.value
         FROM facets f
         JOIN content_facets cf ON cf.facet_id = f.id
         JOIN content_items ci ON ci.id = cf.content_id
        WHERE ci.slug = ?
        ORDER BY f.type ASC, f.value ASC`
    )
      .bind(slug)
      .all();

    const facets = { subject: [], author: [], language: [] };
    for (const row of facetRows) {
      if (facets[row.type]) {
        facets[row.type].push({ slug: row.slug, value: row.value });
      }
    }

    const base = env.R2_BASE.replace(/\/$/, "");

    return jsonResponse(
      {
        slug: item.slug,
        titleMr: item.title_mr,
        titleEn: item.title_en,
        fileType: item.file_type,
        fileUrl: item.file_key ? `${base}/${item.file_key}` : null,
        thumbnailUrl: item.thumbnail_key ? `${base}/${item.thumbnail_key}` : null,
        sizeBytes: item.filesize_bytes,
        createdAt: item.created_at,
        facets,
      },
      { cache: true }
    );
  } catch (err) {
    return jsonResponse(
      { error: "Failed to load work", detail: String(err) },
      { status: 500 }
    );
  }
}
