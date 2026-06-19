import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiHeadphones, FiSearch } from 'react-icons/fi'
import InnerBanner from '../components/InnerBanner'
import pageUi from '../styles/pageUi.module.css'
import { getAllAudioEntries } from '../data/subjects'
import styles from './Audio.module.css'

function AudioCard({ entry, index }) {
  return (
    <Link
      to={entry.browseUrl}
      className={`${styles.card} ${pageUi.cardAnim}`}
      style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
    >
      <span className={styles.iconWrap} aria-hidden="true">
        <FiHeadphones />
      </span>
      <div className={styles.cardBody}>
        <p className={styles.titleMr}>{entry.titleMr}</p>
        <p className={styles.titleEn}>{entry.titleEn}</p>
        <p className={styles.meta}>
          {entry.subjectTitleMr} · {entry.authorTitleMr}
        </p>
      </div>
      <span className={styles.cardCta} aria-hidden="true">
        ऐका →
      </span>
    </Link>
  )
}

function Audio() {
  const [search, setSearch] = useState('')
  const allEntries = useMemo(() => getAllAudioEntries(), [])

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return allEntries

    return allEntries.filter(
      ({ titleMr, titleEn, subjectTitleMr, subjectTitleEn, authorTitleMr, authorTitleEn }) =>
        [titleMr, titleEn, subjectTitleMr, subjectTitleEn, authorTitleMr, authorTitleEn].some(
          (value) => value.toLowerCase().includes(query),
        ),
    )
  }, [allEntries, search])

  useEffect(() => {
    document.title = 'ऑडिओ – श्री समर्थ रामदास'
    return () => {
      document.title = 'श्री समर्थ रामदास - श्री रामदासांचे साहित्य'
    }
  }, [])

  return (
    <>
      <InnerBanner contentId="audio-content" />

      <div className={`${styles.content} ${pageUi.content}`} id="audio-content">
        <h1 className={styles.pageTitle}>ऑडिओ / Audio</h1>
        <p className={styles.pageIntro}>
          समर्थ वाङ्मयाची ध्वनिफीत — विषय आणि लेखकानुसार ऐका.
          <span className={styles.pageIntroEn}>
            Listen to spiritual audio by subject and author.
          </span>
        </p>

        <div className={styles.toolbar}>
          <label className={styles.searchWrap}>
            <FiSearch className={styles.searchIcon} aria-hidden="true" />
            <input
              type="search"
              className={styles.searchInput}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="शोधा / Search audio..."
            />
          </label>
          <p className={styles.count}>
            {filtered.length} ऑडिओ · {filtered.length} tracks
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className={pageUi.empty}>
            <p className={pageUi.emptyTitle}>ऑडिओ सापडले नाहीत</p>
            <p className={pageUi.emptySub}>No audio found. Try a different search.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {filtered.map((entry, index) => (
              <AudioCard key={entry.id} entry={entry} index={index} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Audio
