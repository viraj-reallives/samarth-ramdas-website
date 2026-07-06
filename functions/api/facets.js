// GET /api/facets
// Returns all filter options grouped by type, with item counts per facet.
//
// GET /api/facets?language=<slug>
// Returns subjects that have at least one content item for that language.

import { jsonResponse } from "../lib/jsonResponse.js";

export async function onRequestGet({ env, request }) {
  try {
    const url = new URL(request.url);
    const language = url.searchParams.get("language")?.trim();

    if (language) {
      const { results } = await env.DB.prepare(
        `SELECT f.slug, f.value, COUNT(DISTINCT ci.id) AS count
           FROM facets f
           JOIN content_facets cf_sub ON cf_sub.facet_id = f.id
           JOIN content_items ci ON ci.id = cf_sub.content_id
           JOIN content_facets cf_lang ON cf_lang.content_id = ci.id
           JOIN facets fl ON fl.id = cf_lang.facet_id
          WHERE f.type = 'subject'
            AND fl.type = 'language'
            AND fl.slug = ?
          GROUP BY f.id
         HAVING count > 0
          ORDER BY count DESC, f.value ASC`
      )
        .bind(language)
        .all();

      return jsonResponse(
        {
          language,
          subjects: results.map((row) => ({
            slug: row.slug,
            value: row.value,
            count: row.count,
          })),
        },
        { cache: true }
      );
    }

    const { results } = await env.DB.prepare(
      `SELECT f.type, f.slug, f.value, COUNT(cf.content_id) AS count
         FROM facets f
         LEFT JOIN content_facets cf ON cf.facet_id = f.id
        GROUP BY f.id
        ORDER BY f.type ASC, count DESC, f.value ASC`
    ).all();

    const grouped = { subject: [], author: [], language: [] };
    for (const row of results) {
      if (grouped[row.type]) {
        grouped[row.type].push({
          slug: row.slug,
          value: row.value,
          count: row.count,
        });
      }
    }

    return jsonResponse(grouped, { cache: true });
  } catch (err) {
    return jsonResponse(
      { error: "Failed to load facets", detail: String(err) },
      { status: 500 }
    );
  }
}
