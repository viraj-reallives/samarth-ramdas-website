# WordPress → D1 migration

Transforms WordPress CSV exports into a D1 schema, seed SQL, and an R2 upload manifest for the **samarth-ramdas-website** project.

## Inputs

| File | Description |
|------|-------------|
| `content.csv` | One row per literature item (may contain duplicate `wp_id` — build script dedupes) |
| `thumbnails.csv` | `attachment_id` → image path |
| `facets.csv` | Item tags (`wp_id`, category name/slug) |
| `category_facet_mapping.csv` | Maps each category slug → `subject` / `author` / `language` / `skip` |

## Outputs (generated)

| File | Description |
|------|-------------|
| `schema.sql` | `content_items`, `facets`, `content_facets` tables |
| `seed.sql` | INSERT statements |
| `r2_files.txt` | One R2 object key per line (literature + thumbnails) |
| `report.json` | Build summary, warnings, unmapped slugs |

## Schema alignment with existing D1

The React app (`../samarth-ramdas-website`) already has:

- `collections` / `collection_items` — ringtones, daswani gallery, etc.
- Columns: `r2_key`, `mime_type`, `file_size`, `thumbnail_key`, `slug`, `title_mr`, `title_en`

This migration adds **new tables** for the literature browse feature (subject / author / language facets). Naming is aligned where it matters:

| New (`content_items`) | Existing (`collection_items`) |
|-----------------------|-------------------------------|
| `file_key`            | `r2_key`                      |
| `file_type`           | simplified `mime_type` (`pdf` / `audio`) |
| `filesize_bytes`      | `file_size`                   |
| `thumbnail_key`       | `thumbnail_key`               |

`collections` / `collection_items` are **not** modified by this migration.

## Build

```bash
cd migration
node build.mjs
```

Re-run whenever CSV inputs change. Review `report.json` after each run.

## Load into D1

From the **samarth-ramdas-website** directory (where `wrangler.toml` lives):

### Local (dev)

```bash
cd ../samarth-ramdas-website

# Apply schema (first time only)
npx wrangler d1 execute samarth-ramdas-db --local --file=../site_samarth/migration/schema.sql

# Load seed data
npx wrangler d1 execute samarth-ramdas-db --local --file=../site_samarth/migration/seed.sql
```

### Remote (production)

```bash
cd ../samarth-ramdas-website

npx wrangler d1 execute samarth-ramdas-db --remote --file=../site_samarth/migration/schema.sql
npx wrangler d1 execute samarth-ramdas-db --remote --file=../site_samarth/migration/seed.sql
```

> **Note:** `seed.sql` deletes and re-inserts all rows in the three literature tables. It does not touch `collections` / `collection_items`.

## Upload files to R2

Keys in `r2_files.txt` are relative to `wp-content/uploads/` on the WordPress server.

### Option A — wrangler (one file at a time)

```bash
BUCKET=your-r2-bucket-name   # set your bucket name
UPLOADS=/path/to/site_samarth/wp-content/uploads

while IFS= read -r key; do
  npx wrangler r2 object put "$BUCKET/$key" --file="$UPLOADS/$key"
done < ../site_samarth/migration/r2_files.txt
```

### Option B — rclone (bulk, recommended)

```bash
# One-time: configure an R2 remote (Cloudflare dashboard → R2 → Manage R2 API Tokens)
rclone copy /path/to/site_samarth/wp-content/uploads/ r2:your-bucket-name/ \
  --include-from ../site_samarth/migration/r2_files.txt \
  --files-from-raw
```

Or generate an include file from the manifest:

```bash
sed 's|^|--include |' r2_files.txt > r2_include.txt
rclone copy /path/to/site_samarth/wp-content/uploads/ r2:your-bucket-name/ \
  --include-from r2_include.txt
```

Public URLs are served via `R2_BASE` in `wrangler.toml`:
`https://pub-31371e9d4db049cfba14534a68b77428.r2.dev/<file_key>`

## category_facet_mapping.csv

Rows with `facet_type = skip` are **not** imported (e.g. `literature`, `audios` — content-type meta tags).

If a slug appears in `facets.csv` but not in the mapping file, the build script defaults it to `subject` and lists it in `report.json` for manual reclassification.

Review and edit `category_facet_mapping.csv` before a production import.
