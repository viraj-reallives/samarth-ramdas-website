import { useEffect, useState } from 'react'
import InnerBanner from '../components/InnerBanner'
import AudioPlayerModal from '../components/AudioPlayerModal'
import { AudioDownloadCard, LiteratureDownloadCard } from '../components/DownloadContentCards'
import pageUi from '../styles/pageUi.module.css'
import { Link, useParams } from 'react-router-dom'
import {
  getLanguageBySlug,
  getLanguageSubjectUrl,
  getSubjectsForLanguage,
} from '../data/languages'
import { getSubjectBySlug } from '../data/subjects'
import { useI18n } from '../i18n/useI18n'
import { fetchBrowseItems, getDefaultDownloadTab, loadSubjectsForLanguage } from '../utils/browseApi'
import styles from './SubjectAuthor.module.css'

function LanguageSubject() {
  const { t, pickField, joinFields } = useI18n()
  const { languageSlug, subjectSlug } = useParams()
  const [activeTab, setActiveTab] = useState('audios')
  const [audios, setAudios] = useState([])
  const [literature, setLiterature] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [playingTrack, setPlayingTrack] = useState(null)
  const [otherSubjects, setOtherSubjects] = useState([])

  const language = getLanguageBySlug(languageSlug)
  const subject = getSubjectBySlug(subjectSlug)

  useEffect(() => {
    if (!languageSlug) return undefined

    let active = true

    loadSubjectsForLanguage(languageSlug, getSubjectsForLanguage(languageSlug))
      .then((items) => {
        if (!active) return
        setOtherSubjects(items.filter((item) => item.slug !== subjectSlug))
      })
      .catch(() => {
        if (!active) return
        setOtherSubjects([])
      })

    return () => {
      active = false
    }
  }, [languageSlug, subjectSlug])

  useEffect(() => {
    if (!languageSlug || !subjectSlug) return undefined

    let active = true
    setLoading(true)
    setError(null)

    Promise.all([
      fetchBrowseItems({ subject: subjectSlug, language: languageSlug, type: 'audio' }),
      fetchBrowseItems({ subject: subjectSlug, language: languageSlug, type: 'pdf' }),
    ])
      .then(([audioItems, pdfItems]) => {
        if (!active) return
        setAudios(audioItems)
        setLiterature(pdfItems)
        setActiveTab(getDefaultDownloadTab(audioItems.length, pdfItems.length))
      })
      .catch((err) => {
        if (!active) return
        setError(err.message)
        setAudios([])
        setLiterature([])
        setActiveTab('audios')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [languageSlug, subjectSlug])

  useEffect(() => {
    if (subject && language) {
      document.title = t('common.documentTitleWithPair', {
        primary: pickField(subject, 'title'),
        secondary: pickField(language, 'title'),
      })
    }
    return () => {
      document.title = t('site.title')
    }
  }, [subject, language, t, pickField])

  if (!language || !subject) {
    return (
      <div className={styles.page}>
        <div className={`${styles.content} ${pageUi.content}`} id="language-subject-content">
          <p className={styles.notFound}>{t('common.contentNotFound')}</p>
          <Link to="/language" className={styles.backLink}>
            {t('common.backToLanguage')}
          </Link>
        </div>
      </div>
    )
  }

  const gridClassName = styles.downloadGrid
  const activeItems = activeTab === 'audios' ? audios : literature
  const playerSubtitle = `${pickField(language, 'title')} · ${pickField(subject, 'title')}`

  return (
    <div className={styles.page}>
      <InnerBanner contentId="language-subject-content" />

      <div className={`${styles.content} ${pageUi.content}`} id="language-subject-content">
        <h1 className={styles.pageTitle}>{t('common.downloads')}</h1>

        <div className={styles.layout}>
          <div className={styles.mainColumn}>
            <div className={styles.tabBar} role="tablist" aria-label="Download type">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'audios'}
                className={activeTab === 'audios' ? styles.tabActive : styles.tab}
                onClick={() => setActiveTab('audios')}
              >
                {t('common.audios')}
                {audios.length > 0 && (
                  <span className={styles.tabCount}>{audios.length}</span>
                )}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'literature'}
                className={activeTab === 'literature' ? styles.tabActive : styles.tab}
                onClick={() => setActiveTab('literature')}
              >
                {t('common.literature')}
                {literature.length > 0 && (
                  <span className={styles.tabCount}>{literature.length}</span>
                )}
              </button>
            </div>

            <div className={styles.panel} role="tabpanel">
              <p className={styles.breadcrumb}>
                {joinFields([language, subject], 'title')}
              </p>

              {loading ? (
                <div className={pageUi.empty}>
                  <p>{t('common.loadingDownloads')}</p>
                </div>
              ) : error ? (
                <div className={pageUi.empty}>
                  <p>{t('common.loadDownloadsError')}</p>
                </div>
              ) : activeItems.length > 0 ? (
                <div className={gridClassName}>
                  {activeTab === 'audios'
                    ? audios.map((item) => (
                        <AudioDownloadCard
                          key={item.slug}
                          item={item}
                          onListen={setPlayingTrack}
                        />
                      ))
                    : literature.map((item) => (
                        <LiteratureDownloadCard key={item.slug} item={item} />
                      ))}
                </div>
              ) : (
                <p className={styles.emptyMessage}>
                  {activeTab === 'audios'
                    ? t('common.noAudiosForPair')
                    : t('common.noLiteratureForPair')}
                </p>
              )}
            </div>
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>{t('common.subject')}</div>
            {otherSubjects.length > 0 ? (
              <nav className={styles.sidebarNav} aria-label="Other subjects">
                {otherSubjects.map(({ slug, titleMr, titleEn }) => (
                  <Link
                    key={slug}
                    to={getLanguageSubjectUrl(languageSlug, slug)}
                    className={styles.sidebarLink}
                  >
                    {pickField({ titleMr, titleEn }, 'title')}
                  </Link>
                ))}
              </nav>
            ) : (
              <p className={styles.sidebarEmpty}>{t('common.noOtherSubjects')}</p>
            )}
          </aside>
        </div>
      </div>

      {playingTrack && (
        <AudioPlayerModal
          track={playingTrack}
          subtitle={playerSubtitle}
          onClose={() => setPlayingTrack(null)}
        />
      )}
    </div>
  )
}

export default LanguageSubject
