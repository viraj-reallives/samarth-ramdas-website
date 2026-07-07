import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiHeadphones, FiSearch } from 'react-icons/fi'
import InnerBanner from '../components/InnerBanner'
import pageUi from '../styles/pageUi.module.css'
import { getAllAudioEntries } from '../data/subjects'
import { useI18n } from '../i18n/useI18n'
import styles from './Audio.module.css'

function AudioCard({ entry, index }) {
  const { t, pickField } = useI18n()

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
        <p className={styles.titleMr}>{pickField(entry, 'title')}</p>
        <p className={styles.meta}>
          {pickField({ titleMr: entry.subjectTitleMr, titleEn: entry.subjectTitleEn }, 'title')}
          {' · '}
          {pickField({ titleMr: entry.authorTitleMr, titleEn: entry.authorTitleEn }, 'title')}
        </p>
      </div>
      <span className={styles.cardCta} aria-hidden="true">
        {t('common.listen')} →
      </span>
    </Link>
  )
}

function Audio() {
  const { t } = useI18n()
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
    document.title = t('pages.audio.documentTitle')
    return () => {
      document.title = t('site.title')
    }
  }, [t])

  return (
    <>
      <InnerBanner contentId="audio-content" />

      <div className={`${styles.content} ${pageUi.content}`} id="audio-content">
        <h1 className={styles.pageTitle}>{t('pages.audio.title')}</h1>
        <p className={styles.pageIntro}>{t('pages.audio.intro')}</p>

        <div className={styles.toolbar}>
          <label className={styles.searchWrap}>
            <FiSearch className={styles.searchIcon} aria-hidden="true" />
            <input
              type="search"
              className={styles.searchInput}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t('pages.audio.searchPlaceholder')}
            />
          </label>
          <p className={styles.count}>
            {t('common.countTracks', { count: filtered.length })}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className={pageUi.empty}>
            <p className={pageUi.emptyTitle}>{t('pages.audio.empty')}</p>
            <p className={pageUi.emptySub}>{t('pages.audio.emptySub')}</p>
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
