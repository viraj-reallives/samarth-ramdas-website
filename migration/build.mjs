#!/usr/bin/env node
/**
 * Reads migration/*.csv and writes seed.sql, r2_files.txt, report.json
 * Usage: node migration/build.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MIGRATION_DIR = __dirname;

// ---------------------------------------------------------------------------
// CSV parsing (handles quoted fields with commas and escaped quotes)
// ---------------------------------------------------------------------------

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        field += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        field += ch;
      }
      continue;
    }

    if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      row.push(field);
      field = '';
    } else if (ch === '\n' || (ch === '\r' && next === '\n')) {
      row.push(field);
      field = '';
      if (row.length > 1 || row[0] !== '') rows.push(row);
      row = [];
      if (ch === '\r') i++;
    } else if (ch !== '\r') {
      field += ch;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    if (row.length > 1 || row[0] !== '') rows.push(row);
  }

  return rows;
}

function readCsv(filename) {
  const text = fs.readFileSync(path.join(MIGRATION_DIR, filename), 'utf8');
  const rows = parseCsv(text.trim());
  const headers = rows[0];
  return rows.slice(1).map((cells) => {
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = cells[i] ?? '';
    });
    return obj;
  });
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function splitTitle(fullTitle) {
  const idx = fullTitle.indexOf(' # ');
  if (idx === -1) {
    return { titleMr: fullTitle.trim(), titleEn: '' };
  }
  return {
    titleMr: fullTitle.slice(0, idx).trim(),
    titleEn: fullTitle.slice(idx + 3).trim(),
  };
}

function splitCategoryName(name) {
  const cleaned = name.replace(/&amp;/g, '&');
  return splitTitle(cleaned);
}

function decodeSlug(slug) {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

function normalizeUploadPath(raw) {
  if (!raw || typeof raw !== 'string') return null;
  let p = raw.trim();
  if (!p) return null;

  // Full URL → path
  p = p.replace(/^https?:\/\/[^/]+/i, '');
  // Strip optional /demo/ prefix and wp-content/uploads prefix
  p = p.replace(/^\/?(?:demo\/)?wp-content\/uploads\//i, '');
  p = p.replace(/^\/+/, '');
  return p || null;
}

function parseFilesJson(jsonStr) {
  if (!jsonStr || jsonStr.trim() === '' || jsonStr.trim() === '[]') {
    return null;
  }
  try {
    const arr = JSON.parse(jsonStr);
    if (!Array.isArray(arr) || arr.length === 0) return null;
    return normalizeUploadPath(arr[0]);
  } catch {
    return null;
  }
}

function detectFileType(fileKey) {
  if (!fileKey) return null;
  const ext = path.extname(fileKey).toLowerCase();
  if (ext === '.pdf') return 'pdf';
  if (ext === '.mp3') return 'audio';
  return null;
}

function parseFilesize(raw) {
  if (raw === '' || raw === null || raw === undefined) return null;
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 0) return null;
  return Math.trunc(n);
}

function sqlStr(value) {
  if (value === null || value === undefined) return 'NULL';
  return `'${String(value).replace(/'/g, "''")}'`;
}

function scoreContentRow(row) {
  const fileKey = parseFilesJson(row.files_json);
  const size = parseFilesize(row.filesize_bytes);
  let score = 0;
  if (fileKey) score += 10;
  if (size !== null && size > 0) score += 1;
  return score;
}

// ---------------------------------------------------------------------------
// Load inputs
// ---------------------------------------------------------------------------

const contentRows = readCsv('content.csv');
const facetRows = readCsv('facets.csv');
const thumbnailRows = readCsv('thumbnails.csv');

const thumbnails = new Map();
for (const row of thumbnailRows) {
  const id = String(row.attachment_id).trim();
  const key = normalizeUploadPath(row.image_path) ?? row.image_path?.trim();
  if (id && key) thumbnails.set(id, key);
}

// Category facet mapping (skip comment lines)
const mappingText = fs.readFileSync(
  path.join(MIGRATION_DIR, 'category_facet_mapping.csv'),
  'utf8',
);
const mappingRows = parseCsv(mappingText.trim())
  .slice(1)
  .filter((cells) => cells[0] && !cells[0].startsWith('#'));

const facetMapping = new Map();
for (const [slug, , facetType] of mappingRows) {
  if (slug && facetType) {
    const s = slug.trim();
    const t = facetType.trim();
    facetMapping.set(s, t);
    facetMapping.set(decodeSlug(s), t);
  }
}

// ---------------------------------------------------------------------------
// Dedupe content by wp_id (prefer row with a real file)
// ---------------------------------------------------------------------------

const contentByWpId = new Map();
const skippedContent = [];

for (const row of contentRows) {
  const wpId = String(row.wp_id).trim();
  if (!wpId) continue;

  const existing = contentByWpId.get(wpId);
  if (!existing) {
    contentByWpId.set(wpId, row);
    continue;
  }

  if (scoreContentRow(row) > scoreContentRow(existing)) {
    contentByWpId.set(wpId, row);
  }
}

// Build content_items
const contentItems = [];
const usedSlugs = new Set();
const duplicateSlugFixes = [];

for (const [wpId, row] of contentByWpId) {
  const { titleMr, titleEn } = splitTitle(row.full_title);
  let slug = decodeSlug(row.slug?.trim() || '');
  if (!slug) {
    skippedContent.push({ wpId, reason: 'missing slug' });
    continue;
  }

  if (usedSlugs.has(slug)) {
    const newSlug = `${slug}-${wpId}`;
    duplicateSlugFixes.push({ wpId, original: slug, fixed: newSlug });
    slug = newSlug;
  }
  usedSlugs.add(slug);

  const fileKey = parseFilesJson(row.files_json);
  const fileType = detectFileType(fileKey);
  const filesizeBytes = parseFilesize(row.filesize_bytes);
  const thumbId = String(row.thumbnail_id ?? '').trim();
  const thumbnailKey =
    thumbId && thumbId !== 'NULL' ? thumbnails.get(thumbId) ?? null : null;

  if (thumbId && thumbId !== 'NULL' && !thumbnailKey) {
    skippedContent.push({ wpId, reason: `thumbnail_id ${thumbId} not found in thumbnails.csv` });
  }

  contentItems.push({
    id: Number(wpId),
    slug,
    titleMr,
    titleEn: titleEn || null,
    fileKey,
    fileType,
    filesizeBytes,
    thumbnailKey,
    createdAt: row.created_at?.trim() || null,
  });
}

contentItems.sort((a, b) => a.id - b.id);

// ---------------------------------------------------------------------------
// Build facets + content_facets
// ---------------------------------------------------------------------------

const facetKeyToId = new Map(); // "type|slug" → id
const facets = [];
const contentFacets = [];
const unmappedSlugs = new Set();
const skippedFacetLinks = [];

let facetIdCounter = 1;

function getOrCreateFacet(type, slug, value) {
  const key = `${type}|${slug}`;
  if (facetKeyToId.has(key)) return facetKeyToId.get(key);

  const id = facetIdCounter++;
  facetKeyToId.set(key, id);
  facets.push({ id, type, slug, value });
  return id;
}

const contentIds = new Set(contentItems.map((c) => c.id));
const seenContentFacet = new Set();

for (const row of facetRows) {
  const wpId = Number(row.wp_id);
  if (!contentIds.has(wpId)) continue;

  const slug = row.category_slug?.trim();
  if (!slug) continue;

  let facetType = facetMapping.get(slug) ?? facetMapping.get(decodeSlug(slug));
  if (!facetType) {
    facetType = 'subject';
    unmappedSlugs.add(slug);
  }

  if (facetType === 'skip') continue;

  const { titleMr } = splitCategoryName(row.category_name);
  const facetSlug = decodeSlug(slug);
  const facetId = getOrCreateFacet(facetType, facetSlug, titleMr);

  const linkKey = `${wpId}|${facetId}`;
  if (seenContentFacet.has(linkKey)) continue;
  seenContentFacet.add(linkKey);
  contentFacets.push({ contentId: wpId, facetId });
}

facets.sort((a, b) => a.type.localeCompare(b.type) || a.slug.localeCompare(b.slug));

// ---------------------------------------------------------------------------
// R2 file manifest
// ---------------------------------------------------------------------------

const r2Files = new Set();
let pdfCount = 0;
let audioCount = 0;
let imageCount = 0;

function addR2File(key) {
  if (!key) return;
  if (r2Files.has(key)) return;
  r2Files.add(key);

  const ext = path.extname(key).toLowerCase();
  if (ext === '.pdf') pdfCount++;
  else if (ext === '.mp3') audioCount++;
  else if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext)) imageCount++;
}

for (const item of contentItems) {
  addR2File(item.fileKey);
  addR2File(item.thumbnailKey);
}

const r2List = [...r2Files].sort();

// ---------------------------------------------------------------------------
// Emit seed.sql
// ---------------------------------------------------------------------------

const lines = [];
lines.push('-- Generated by migration/build.mjs — do not edit by hand');
lines.push(`-- ${new Date().toISOString()}`);
lines.push('');
lines.push('PRAGMA foreign_keys = OFF;');
lines.push('DELETE FROM content_facets;');
lines.push('DELETE FROM facets;');
lines.push('DELETE FROM content_items;');
lines.push('');

lines.push('-- content_items');
for (const item of contentItems) {
  lines.push(
    `INSERT INTO content_items (id, slug, title_mr, title_en, file_key, file_type, filesize_bytes, thumbnail_key, created_at) VALUES (${item.id}, ${sqlStr(item.slug)}, ${sqlStr(item.titleMr)}, ${sqlStr(item.titleEn)}, ${sqlStr(item.fileKey)}, ${sqlStr(item.fileType)}, ${item.filesizeBytes ?? 'NULL'}, ${sqlStr(item.thumbnailKey)}, ${sqlStr(item.createdAt)});`,
  );
}

lines.push('');
lines.push('-- facets');
for (const facet of facets) {
  lines.push(
    `INSERT INTO facets (id, type, value, slug) VALUES (${facet.id}, ${sqlStr(facet.type)}, ${sqlStr(facet.value)}, ${sqlStr(facet.slug)});`,
  );
}

lines.push('');
lines.push('-- content_facets');
for (const link of contentFacets) {
  lines.push(
    `INSERT INTO content_facets (content_id, facet_id) VALUES (${link.contentId}, ${link.facetId});`,
  );
}

lines.push('');
lines.push('PRAGMA foreign_keys = ON;');

fs.writeFileSync(path.join(MIGRATION_DIR, 'seed.sql'), lines.join('\n') + '\n');
fs.writeFileSync(path.join(MIGRATION_DIR, 'r2_files.txt'), r2List.join('\n') + '\n');

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

const facetTypeCounts = { subject: 0, author: 0, language: 0 };
for (const f of facets) facetTypeCounts[f.type]++;

const itemsWithFile = contentItems.filter((c) => c.fileKey).length;
const itemsWithoutFile = contentItems.length - itemsWithFile;
const nonPdfAudioFiles = contentItems.filter(
  (c) => c.fileKey && !c.fileType,
).length;

const report = {
  generatedAt: new Date().toISOString(),
  contentItems: contentItems.length,
  itemsWithFile,
  itemsWithoutFile,
  nonPdfAudioFiles,
  facets: {
    total: facets.length,
    byType: facetTypeCounts,
    contentFacetLinks: contentFacets.length,
  },
  r2Files: {
    total: r2List.length,
    pdf: pdfCount,
    audio: audioCount,
    image: imageCount,
    other: r2List.length - pdfCount - audioCount - imageCount,
  },
  duplicateSlugFixes,
  unmappedSlugs: [...unmappedSlugs].sort(),
  skippedContent,
  warnings: [],
};

if (unmappedSlugs.size > 0) {
  report.warnings.push(
    `${unmappedSlugs.size} category slug(s) missing from category_facet_mapping.csv — defaulted to subject`,
  );
}
if (nonPdfAudioFiles > 0) {
  report.warnings.push(
    `${nonPdfAudioFiles} item(s) have non-pdf/mp3 files (file_key stored, file_type NULL)`,
  );
}

fs.writeFileSync(
  path.join(MIGRATION_DIR, 'report.json'),
  JSON.stringify(report, null, 2) + '\n',
);

// Console summary
console.log('Migration build complete\n');
console.log(`  content_items:     ${report.contentItems}`);
console.log(`    with file_key:   ${itemsWithFile}`);
console.log(`    without file:    ${itemsWithoutFile}`);
console.log(`  facets:            ${report.facets.total}`);
console.log(`    subject:         ${facetTypeCounts.subject}`);
console.log(`    author:          ${facetTypeCounts.author}`);
console.log(`    language:        ${facetTypeCounts.language}`);
console.log(`  content_facets:    ${contentFacets.length}`);
console.log(`  r2_files:          ${r2List.length} (pdf: ${pdfCount}, audio: ${audioCount}, image: ${imageCount})`);

if (duplicateSlugFixes.length) {
  console.log(`  slug collisions:   ${duplicateSlugFixes.length} fixed with -wp_id suffix`);
}
if (unmappedSlugs.size) {
  console.log(`  unmapped slugs:    ${unmappedSlugs.size} (defaulted to subject — see report.json)`);
}
if (skippedContent.length) {
  console.log(`  content warnings:  ${skippedContent.length} (see report.json)`);
}
if (report.warnings.length) {
  console.log('\nWarnings:');
  for (const w of report.warnings) console.log(`  - ${w}`);
}

console.log('\nWrote: seed.sql, r2_files.txt, report.json');
