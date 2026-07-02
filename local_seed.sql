CREATE TABLE collections (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    title           TEXT    NOT NULL,
    slug            TEXT    NOT NULL UNIQUE,
    collection_type TEXT    NOT NULL CHECK (collection_type IN ('audio', 'gallery', 'book', 'event', 'news', 'video')),
    description     TEXT,
    thumbnail_key   TEXT,
    total_items     INTEGER NOT NULL DEFAULT 0,
    is_published    INTEGER NOT NULL DEFAULT 0,
    created_at      TEXT    NOT NULL DEFAULT (datetime('now')),
    updated_at      TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_collections_type      ON collections(collection_type);
CREATE INDEX idx_collections_published ON collections(is_published);

CREATE TABLE collection_items (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    collection_id  INTEGER NOT NULL,
    title          TEXT    NOT NULL,
    item_number    INTEGER,
    r2_key         TEXT    NOT NULL,
    thumbnail_key  TEXT,
    mime_type      TEXT    NOT NULL,
    description    TEXT,
    file_size      INTEGER,
    sort_order     INTEGER NOT NULL DEFAULT 0,
    created_at     TEXT    NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (collection_id) REFERENCES collections(id) ON DELETE CASCADE
);

CREATE INDEX idx_items_collection ON collection_items(collection_id);
CREATE INDEX idx_items_sort       ON collection_items(collection_id, sort_order);
-- ============================================================
-- Seed: Ringtones collection + 32 items
-- Paste into Cloudflare D1 Console (samarth-ramdas-db)
-- Safe to read; assumes schema already applied.
-- ============================================================

-- 1) Create the Ringtones collection (published)
INSERT INTO collections (title, slug, collection_type, description, total_items, is_published)
VALUES ('Ringtones', 'ringtones', 'audio', 'Devotional ringtones', 32, 1);

-- 2) Insert all 32 ringtone items, linked by slug lookup
INSERT INTO collection_items (collection_id, title, r2_key, mime_type, sort_order)
VALUES
  ((SELECT id FROM collections WHERE slug='ringtones'), 'Ase Ho Jaya', 'media/audio/ringtones/ringtones_Ase-Ho-Jaya.mp3', 'audio/mpeg', 1),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'Dehe Tyagita', 'media/audio/ringtones/ringtones_Dehe-Tyagita.mp3', 'audio/mpeg', 2),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'Ganadheesh Jo', 'media/audio/ringtones/ringtones_Ganadheesh-Jo.mp3', 'audio/mpeg', 3),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'Ghanashyam Ha', 'media/audio/ringtones/ringtones_Ghanashyam-Ha.mp3', 'audio/mpeg', 4),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'Jani Bhojani', 'media/audio/ringtones/ringtones_Jani-Bhojani.mp3', 'audio/mpeg', 5),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'Jani Vaad Vevaad', 'media/audio/ringtones/ringtones_Jani-Vaad-Vevaad.mp3', 'audio/mpeg', 6),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'Jay Jay Raghuveer Samarth', 'media/audio/ringtones/ringtones_Jay-Jay-Raghuveer-Samarth.mp3', 'audio/mpeg', 7),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'Kari Vrutti Jo Sant', 'media/audio/ringtones/ringtones_Kari-Vrutti-Jo-Sant.mp3', 'audio/mpeg', 8),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'Komalvacha Brahmanaubhav', 'media/audio/ringtones/ringtones_Komalvacha-Brahmanaubhav.mp3', 'audio/mpeg', 9),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'Komalvacha Pavan', 'media/audio/ringtones/ringtones_Komalvacha-Pavan.mp3', 'audio/mpeg', 10),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'Komalvacha Prabhanda', 'media/audio/ringtones/ringtones_Komalvacha-Prabhanda.mp3', 'audio/mpeg', 11),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'Komalvacha Tadruptta', 'media/audio/ringtones/ringtones_Komalvacha-Tadruptta.mp3', 'audio/mpeg', 12),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'Komalvacha Vidya Vaibhav', 'media/audio/ringtones/ringtones_Komalvacha-Vidya-Vaibhav.mp3', 'audio/mpeg', 13),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'Komalvacha', 'media/audio/ringtones/ringtones_Komalvacha.mp3', 'audio/mpeg', 14),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'Krami Vel Jo', 'media/audio/ringtones/ringtones_Krami-Vel-Jo.mp3', 'audio/mpeg', 15),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'Mana Sajjana Bhakti Panthechi Jave', 'media/audio/ringtones/ringtones_Mana-Sajjana-Bhakti-Panthechi-Jave.mp3', 'audio/mpeg', 16),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'Mana Sang Ha Sarv Sangaas Todi', 'media/audio/ringtones/ringtones_Mana-Sang-Ha-Sarv-Sangaas-Todi.mp3', 'audio/mpeg', 17),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'Mana Shreshth Dharishthya', 'media/audio/ringtones/ringtones_Mana-Shreshth-Dharishthya.mp3', 'audio/mpeg', 18),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'Manachi Shate Aikata Dosh Jati', 'media/audio/ringtones/ringtones_Manachi-Shate-Aikata-Dosh-Jati.mp3', 'audio/mpeg', 19),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'Mhane Janata To Jani', 'media/audio/ringtones/ringtones_Mhane-Janata-To-Jani.mp3', 'audio/mpeg', 20),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'Mukhi Ram Tya', 'media/audio/ringtones/ringtones_Mukhi-Ram-Tya.mp3', 'audio/mpeg', 21),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'Nabhi Vaavare Jo', 'media/audio/ringtones/ringtones_Nabhi-Vaavare-Jo.mp3', 'audio/mpeg', 22),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'Nakore Mana Krodhha', 'media/audio/ringtones/ringtones_Nakore-Mana-Krodhha.mp3', 'audio/mpeg', 23),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'Phookache Mukhi', 'media/audio/ringtones/ringtones_Phookache-Mukhi.mp3', 'audio/mpeg', 24),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'Prabhate Mani Ram', 'media/audio/ringtones/ringtones_Prabhate-Mani-Ram.mp3', 'audio/mpeg', 25),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'Sadasarvada Ram Sannidhahe', 'media/audio/ringtones/ringtones_Sadasarvada-Ram-Sannidhahe.mp3', 'audio/mpeg', 26),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'Sadasarvada Sajjana Che', 'media/audio/ringtones/ringtones_Sadasarvada-Sajjana-Che.mp3', 'audio/mpeg', 27),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'Samrtha Chiya Sevaka', 'media/audio/ringtones/ringtones_Samrtha-Chiya-Sevaka.mp3', 'audio/mpeg', 28),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'Tinhilok Jethun', 'media/audio/ringtones/ringtones_Tinhilok-Jethun.mp3', 'audio/mpeg', 29),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'Tute Vaad Sanvaad', 'media/audio/ringtones/ringtones_Tute-Vaad-Sanvaad.mp3', 'audio/mpeg', 30),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'Vase Rudayi Dev To', 'media/audio/ringtones/ringtones_Vase-Rudayi-Dev-To.mp3', 'audio/mpeg', 31),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'Vicharun Bole', 'media/audio/ringtones/ringtones_Vicharun-Bole.mp3', 'audio/mpeg', 32);
-- ============================================================
-- Seed: Daswani gallery collection + 50 pages
-- Paste into Cloudflare D1 Console (samarth-ramdas-db)
-- Files: media/gallery/daswani/01.png .. 50.png
-- ============================================================

-- 1) Create the Daswani collection (published)
INSERT INTO collections (title, slug, collection_type, description, total_items, is_published)
VALUES ('Daswani', 'daswani', 'gallery', 'Daily Daswani pages', 50, 1);

-- 2) Insert all 50 pages, linked by slug lookup
INSERT INTO collection_items (collection_id, title, item_number, r2_key, mime_type, sort_order)
VALUES
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 1', 1, 'media/gallery/daswani/01.png', 'image/png', 1),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 2', 2, 'media/gallery/daswani/02.png', 'image/png', 2),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 3', 3, 'media/gallery/daswani/03.png', 'image/png', 3),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 4', 4, 'media/gallery/daswani/04.png', 'image/png', 4),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 5', 5, 'media/gallery/daswani/05.png', 'image/png', 5),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 6', 6, 'media/gallery/daswani/06.png', 'image/png', 6),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 7', 7, 'media/gallery/daswani/07.png', 'image/png', 7),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 8', 8, 'media/gallery/daswani/08.png', 'image/png', 8),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 9', 9, 'media/gallery/daswani/09.png', 'image/png', 9),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 10', 10, 'media/gallery/daswani/10.png', 'image/png', 10),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 11', 11, 'media/gallery/daswani/11.png', 'image/png', 11),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 12', 12, 'media/gallery/daswani/12.png', 'image/png', 12),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 13', 13, 'media/gallery/daswani/13.png', 'image/png', 13),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 14', 14, 'media/gallery/daswani/14.png', 'image/png', 14),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 15', 15, 'media/gallery/daswani/15.png', 'image/png', 15),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 16', 16, 'media/gallery/daswani/16.png', 'image/png', 16),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 17', 17, 'media/gallery/daswani/17.png', 'image/png', 17),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 18', 18, 'media/gallery/daswani/18.png', 'image/png', 18),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 19', 19, 'media/gallery/daswani/19.png', 'image/png', 19),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 20', 20, 'media/gallery/daswani/20.png', 'image/png', 20),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 21', 21, 'media/gallery/daswani/21.png', 'image/png', 21),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 22', 22, 'media/gallery/daswani/22.png', 'image/png', 22),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 23', 23, 'media/gallery/daswani/23.png', 'image/png', 23),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 24', 24, 'media/gallery/daswani/24.png', 'image/png', 24),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 25', 25, 'media/gallery/daswani/25.png', 'image/png', 25),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 26', 26, 'media/gallery/daswani/26.png', 'image/png', 26),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 27', 27, 'media/gallery/daswani/27.png', 'image/png', 27),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 28', 28, 'media/gallery/daswani/28.png', 'image/png', 28),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 29', 29, 'media/gallery/daswani/29.png', 'image/png', 29),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 30', 30, 'media/gallery/daswani/30.png', 'image/png', 30),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 31', 31, 'media/gallery/daswani/31.png', 'image/png', 31),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 32', 32, 'media/gallery/daswani/32.png', 'image/png', 32),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 33', 33, 'media/gallery/daswani/33.png', 'image/png', 33),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 34', 34, 'media/gallery/daswani/34.png', 'image/png', 34),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 35', 35, 'media/gallery/daswani/35.png', 'image/png', 35),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 36', 36, 'media/gallery/daswani/36.png', 'image/png', 36),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 37', 37, 'media/gallery/daswani/37.png', 'image/png', 37),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 38', 38, 'media/gallery/daswani/38.png', 'image/png', 38),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 39', 39, 'media/gallery/daswani/39.png', 'image/png', 39),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 40', 40, 'media/gallery/daswani/40.png', 'image/png', 40),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 41', 41, 'media/gallery/daswani/41.png', 'image/png', 41),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 42', 42, 'media/gallery/daswani/42.png', 'image/png', 42),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 43', 43, 'media/gallery/daswani/43.png', 'image/png', 43),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 44', 44, 'media/gallery/daswani/44.png', 'image/png', 44),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 45', 45, 'media/gallery/daswani/45.png', 'image/png', 45),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 46', 46, 'media/gallery/daswani/46.png', 'image/png', 46),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 47', 47, 'media/gallery/daswani/47.png', 'image/png', 47),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 48', 48, 'media/gallery/daswani/48.png', 'image/png', 48),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 49', 49, 'media/gallery/daswani/49.png', 'image/png', 49),
  ((SELECT id FROM collections WHERE slug='daswani'), 'Page 50', 50, 'media/gallery/daswani/50.png', 'image/png', 50);
-- Migration 0002: add item-level slug + bilingual titles to collection_items
-- Needed so the Worker can serve the exact shape React expects
-- ({ slug, titleMr, titleEn, audioUrl }).
ALTER TABLE collection_items ADD COLUMN slug     TEXT;
ALTER TABLE collection_items ADD COLUMN title_mr TEXT;
ALTER TABLE collection_items ADD COLUMN title_en TEXT;

-- slug is looked up per collection, so index the pair
CREATE INDEX idx_items_slug ON collection_items(collection_id, slug);
-- ============================================================
-- Re-seed: Ringtones (regenerated from React source of truth)
-- Run AFTER migration_0002.sql.
-- Replaces the earlier provisional ringtone rows.
-- 32 items, correct slugs + Marathi/English titles, real files.
-- ============================================================

-- Wipe old provisional ringtone items, keep the collection row
DELETE FROM collection_items
WHERE collection_id = (SELECT id FROM collections WHERE slug='ringtones');

-- Insert the correct 32
INSERT INTO collection_items
  (collection_id, slug, title, title_mr, title_en, r2_key, mime_type, sort_order)
VALUES
  ((SELECT id FROM collections WHERE slug='ringtones'), 'ganadheesh-jo', 'Ganadheesh Jo', 'गणाधीश जो', 'Ganadheesh Jo', 'media/audio/ringtones/ringtones_Ganadheesh-Jo.mp3', 'audio/mpeg', 1),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'mukhi-ram-tya', 'Mukhi Ram Tya', 'मुखी राम त्या', 'Mukhi Ram Tya', 'media/audio/ringtones/ringtones_Mukhi-Ram-Tya.mp3', 'audio/mpeg', 2),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'jay-jay-raghuveer-samarth', 'Jay Jay Raghuveer Samarth', 'जय जय रघुवीर समर्थ', 'Jay Jay Raghuveer Samarth', 'media/audio/ringtones/ringtones_Jay-Jay-Raghuveer-Samarth.mp3', 'audio/mpeg', 3),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'prabhate-mani-ram', 'Prabhate Mani Ram', 'प्रभाते मनी राम', 'Prabhate Mani Ram', 'media/audio/ringtones/ringtones_Prabhate-Mani-Ram.mp3', 'audio/mpeg', 4),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'mhane-janata-to-jani', 'Mhane Janata To Jani', 'म्हणे जनता तो जणी', 'Mhane Janata To Jani', 'media/audio/ringtones/ringtones_Mhane-Janata-To-Jani.mp3', 'audio/mpeg', 5),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'jani-bhojani', 'Jani Bhojani', 'जणी भोजनी', 'Jani Bhojani', 'media/audio/ringtones/ringtones_Jani-Bhojani.mp3', 'audio/mpeg', 6),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'jani-vaad-vevaad', 'Jani Vaad Vevaad', 'जणी वाद वेवाद', 'Jani Vaad Vevaad', 'media/audio/ringtones/ringtones_Jani-Vaad-Vevaad.mp3', 'audio/mpeg', 7),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'manachi-shate-aikata-dosh-jati', 'Manachi Shate Aikata Dosh Jati', 'मनाची शते ऐकता दोष जाती', 'Manachi Shate Aikata Dosh Jati', 'media/audio/ringtones/ringtones_Manachi-Shate-Aikata-Dosh-Jati.mp3', 'audio/mpeg', 8),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'kari-vrutti-jo-sant', 'Kari Vrutti Jo Sant', 'करी वृत्ती जो संत', 'Kari Vrutti Jo Sant', 'media/audio/ringtones/ringtones_Kari-Vrutti-Jo-Sant.mp3', 'audio/mpeg', 9),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'nako-re-mana-krodhha', 'Nako re Mana Krodhha', 'नको रे मना क्रोध', 'Nako re Mana Krodhha', 'media/audio/ringtones/ringtones_Nakore-Mana-Krodhha.mp3', 'audio/mpeg', 10),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'phookache-mukhi', 'Phookache Mukhi', 'फुकाचे मुखी', 'Phookache Mukhi', 'media/audio/ringtones/ringtones_Phookache-Mukhi.mp3', 'audio/mpeg', 11),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'mana-sajjana-bhakti-panthechi-jave', 'Mana Sajjana Bhakti Panthechi Jave', 'मना सज्जना भक्ति पांथेची जावे', 'Mana Sajjana Bhakti Panthechi Jave', 'media/audio/ringtones/ringtones_Mana-Sajjana-Bhakti-Panthechi-Jave.mp3', 'audio/mpeg', 12),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'nabhi-vaavare-jo', 'Nabhi Vaavare Jo', 'नभी वावरे जो', 'Nabhi Vaavare Jo', 'media/audio/ringtones/ringtones_Nabhi-Vaavare-Jo.mp3', 'audio/mpeg', 13),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'sada-sarvada-sajjana-che', 'Sada sarvada Sajjana Che', 'सदा सर्वदा सज्जनाचे', 'Sada sarvada Sajjana Che', 'media/audio/ringtones/ringtones_Sadasarvada-Sajjana-Che.mp3', 'audio/mpeg', 14),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'sada-sarvada-ram-sannidh-ahe', 'Sada sarvada Ram Sannidh ahe', 'सदा सर्वदा राम सन्निध आहे', 'Sada sarvada Ram Sannidh ahe', 'media/audio/ringtones/ringtones_Sadasarvada-Ram-Sannidhahe.mp3', 'audio/mpeg', 15),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'mana-sang-ha-sarv-sangaas-todi', 'Mana Sang Ha Sarv Sangaas Todi', 'मना सांग हा सर्व सांगास तोडी', 'Mana Sang Ha Sarv Sangaas Todi', 'media/audio/ringtones/ringtones_Mana-Sang-Ha-Sarv-Sangaas-Todi.mp3', 'audio/mpeg', 16),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'mana-shreshth-dharishthya', 'Mana Shreshth Dharishthya', 'मना श्रेष्ठ धारिसत्या', 'Mana Shreshth Dharishthya', 'media/audio/ringtones/ringtones_Mana-Shreshth-Dharishthya.mp3', 'audio/mpeg', 17),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'samrthachiya-sevaka', 'Samrthachiya Sevaka', 'समर्थाचिया सेवका', 'Samrthachiya Sevaka', 'media/audio/ringtones/ringtones_Samrtha-Chiya-Sevaka.mp3', 'audio/mpeg', 18),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'dehe-tyagita', 'Dehe Tyagita', 'देहे त्यागिता', 'Dehe Tyagita', 'media/audio/ringtones/ringtones_Dehe-Tyagita.mp3', 'audio/mpeg', 19),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'komalvacha', 'Komalvacha', 'कोमालवाचा', 'Komalvacha', 'media/audio/ringtones/ringtones_Komalvacha.mp3', 'audio/mpeg', 20),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'komalvacha-brahmanaubhav', 'Komalvacha Brahmanaubhav', 'कोमालवाचा ब्राहमनौभव', 'Komalvacha Brahmanaubhav', 'media/audio/ringtones/ringtones_Komalvacha-Brahmanaubhav.mp3', 'audio/mpeg', 21),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'komalvacha-pavan', 'Komalvacha Pavan', 'कोमालवाचा पवन', 'Komalvacha Pavan', 'media/audio/ringtones/ringtones_Komalvacha-Pavan.mp3', 'audio/mpeg', 22),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'komalvacha-prabhanda', 'Komalvacha Prabhanda', 'कोमालवाचा प्रभांडा', 'Komalvacha Prabhanda', 'media/audio/ringtones/ringtones_Komalvacha-Prabhanda.mp3', 'audio/mpeg', 23),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'komalvacha-tadruptta', 'Komalvacha Tadruptta', 'कोमलवाचा तद्रूपता', 'Komalvacha Tadruptta', 'media/audio/ringtones/ringtones_Komalvacha-Tadruptta.mp3', 'audio/mpeg', 24),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'komalvacha-vidya-vaibhav', 'Komalvacha Vidya Vaibhav', 'कोमालवाचा विद्या वैभव', 'Komalvacha Vidya Vaibhav', 'media/audio/ringtones/ringtones_Komalvacha-Vidya-Vaibhav.mp3', 'audio/mpeg', 25),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'krami-vel-jo', 'Krami Vel Jo', 'क्रमी वेळ जो', 'Krami Vel Jo', 'media/audio/ringtones/ringtones_Krami-Vel-Jo.mp3', 'audio/mpeg', 26),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'ase-ho-jaya', 'Ase Ho Jaya', 'असे हो जया', 'Ase Ho Jaya', 'media/audio/ringtones/ringtones_Ase-Ho-Jaya.mp3', 'audio/mpeg', 27),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'ghanashyam-ha', 'Ghanashyam Ha', 'घनश्याम हा', 'Ghanashyam Ha', 'media/audio/ringtones/ringtones_Ghanashyam-Ha.mp3', 'audio/mpeg', 28),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'tinhilok-jethun', 'Tinhilok Jethun', 'तिन्हीलोक जेथून', 'Tinhilok Jethun', 'media/audio/ringtones/ringtones_Tinhilok-Jethun.mp3', 'audio/mpeg', 29),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'tute-vaad-sanvaad', 'Tute Vaad Sanvaad', 'तुटे वाद संवाद', 'Tute Vaad Sanvaad', 'media/audio/ringtones/ringtones_Tute-Vaad-Sanvaad.mp3', 'audio/mpeg', 30),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'vaseh-rudayi-dev-to', 'Vaseh Rudayi Dev To', 'वसेह रूडाई देव तो', 'Vaseh Rudayi Dev To', 'media/audio/ringtones/ringtones_Vase-Rudayi-Dev-To.mp3', 'audio/mpeg', 31),
  ((SELECT id FROM collections WHERE slug='ringtones'), 'vicharun-bole', 'Vicharun Bole', 'विचारून बोले', 'Vicharun Bole', 'media/audio/ringtones/ringtones_Vicharun-Bole.mp3', 'audio/mpeg', 32);

-- keep the count accurate
UPDATE collections SET total_items = 32 WHERE slug='ringtones';