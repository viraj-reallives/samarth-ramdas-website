-- D1 schema: literature browse (content_items + facets)
-- Coexists with existing collections / collection_items tables in samarth-ramdas-db.
--
-- Naming alignment with existing schema (local_seed.sql):
--   file_key        ≈ collection_items.r2_key
--   thumbnail_key   = collection_items.thumbnail_key
--   filesize_bytes  ≈ collection_items.file_size
--   file_type       ≈ simplified mime (pdf | audio) vs collection_items.mime_type
--   title_mr/title_en/slug = same columns added in migration 0002

CREATE TABLE IF NOT EXISTS content_items (
    id              INTEGER PRIMARY KEY,
    slug            TEXT    NOT NULL UNIQUE,
    title_mr        TEXT    NOT NULL,
    title_en        TEXT,
    file_key        TEXT,
    file_type       TEXT    CHECK (file_type IS NULL OR file_type IN ('pdf', 'audio')),
    filesize_bytes  INTEGER,
    thumbnail_key   TEXT,
    created_at      TEXT    NOT NULL
);

CREATE TABLE IF NOT EXISTS facets (
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    type    TEXT    NOT NULL CHECK (type IN ('subject', 'author', 'language')),
    value   TEXT    NOT NULL,
    slug    TEXT    NOT NULL,
    UNIQUE (type, slug)
);

CREATE TABLE IF NOT EXISTS content_facets (
    content_id  INTEGER NOT NULL,
    facet_id    INTEGER NOT NULL,
    PRIMARY KEY (content_id, facet_id),
    FOREIGN KEY (content_id) REFERENCES content_items(id) ON DELETE CASCADE,
    FOREIGN KEY (facet_id)    REFERENCES facets(id)       ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_facets_type              ON facets(type);
CREATE INDEX IF NOT EXISTS idx_content_facets_content   ON content_facets(content_id);
CREATE INDEX IF NOT EXISTS idx_content_facets_facet     ON content_facets(facet_id);
CREATE INDEX IF NOT EXISTS idx_content_items_file_type    ON content_items(file_type);
