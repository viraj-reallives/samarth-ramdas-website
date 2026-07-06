// GET /api/browse
// Faceted content list with optional filters, search, and pagination.
//
// Query params:
//   subject, author, language — facet slug filters (AND across types)
//   type — audio | pdf
//   q — search title_mr / title_en
//   limit (default 40), offset (default 0)

import { jsonResponse } from "../lib/jsonResponse.js";

function parsePositiveInt(value, fallback) {
  const n = Number.parseInt(value ?? "", 10);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

function buildBrowseFilters(url) {
  const conditions = [];
  const binds = [];

  const facetFilters = [
    ["subject", url.searchParams.get("subject")],
    ["author", url.searchParams.get("author")],
    ["language", url.searchParams.get("language")],
  ];

  for (const [facetType, slug] of facetFilters) {
    if (!slug) continue;
    conditions.push(
      `ci.id IN (
         SELECT cf.content_id
           FROM content_facets cf
           JOIN facets f ON f.id = cf.facet_id
          WHERE f.type = ? AND f.slug = ?
       )`
    );
    binds.push(facetType, slug);
  }

  const fileType = url.searchParams.get("type");
  if (fileType === "audio" || fileType === "pdf") {
    conditions.push("ci.file_type = ?");
    binds.push(fileType);
  }

  const q = url.searchParams.get("q")?.trim();
  if (q) {
    const pattern = `%${q}%`;
    conditions.push("(ci.title_mr LIKE ? OR ci.title_en LIKE ?)");
    binds.push(pattern, pattern);
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  return { where, binds };
}

function shapeBrowseItem(row, base) {
  return {
    slug: row.slug,
    titleMr: row.title_mr,
    titleEn: row.title_en,
    fileType: row.file_type,
    fileUrl: row.file_key ? `${base}/${row.file_key}` : null,
    thumbnailUrl: row.thumbnail_key ? `${base}/${row.thumbnail_key}` : null,
    sizeBytes: row.filesize_bytes,
  };
}

export async function onRequestGet({ env, request }) {
  try {
    const url = new URL(request.url);
    const limit = Math.min(Math.max(parsePositiveInt(url.searchParams.get("limit"), 40), 1), 100);
    const offset = parsePositiveInt(url.searchParams.get("offset"), 0);

    const { where, binds } = buildBrowseFilters(url);
    const base = env.R2_BASE.replace(/\/$/, "");

    const totalRow = await env.DB.prepare(
      `SELECT COUNT(*) AS total FROM content_items ci ${where}`
    )
      .bind(...binds)
      .first();

    const { results } = await env.DB.prepare(
      `SELECT ci.slug, ci.title_mr, ci.title_en, ci.file_type,
              ci.file_key, ci.thumbnail_key, ci.filesize_bytes
         FROM content_items ci
         ${where}
         ORDER BY ci.title_mr COLLATE NOCASE ASC, ci.id ASC
         LIMIT ? OFFSET ?`
    )
      .bind(...binds, limit, offset)
      .all();

    return jsonResponse(
      {
        total: totalRow?.total ?? 0,
        limit,
        offset,
        items: results.map((row) => shapeBrowseItem(row, base)),
      },
      { cache: true }
    );
  } catch (err) {
    return jsonResponse(
      { error: "Failed to browse content", detail: String(err) },
      { status: 500 }
    );
  }
}
