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
import { fetchBrowseItems, getDefaultDownloadTab, loadSubjectsForLanguage } from '../utils/browseApi'
import styles from './SubjectAuthor.module.css'

function LanguageSubject() {
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
      document.title = `${subject.titleMr} (${language.titleMr}) – श्री समर्थ रामदास`
    }
    return () => {
      document.title = 'श्री समर्थ रामदास - श्री रामदासांचे साहित्य'
    }
  }, [subject, language])

  if (!language || !subject) {
    return (
      <div className={styles.page}>
        <div className={`${styles.content} ${pageUi.content}`} id="language-subject-content">
          <p className={styles.notFound}>Content not found.</p>
          <Link to="/language" className={styles.backLink}>
            Back to Language
          </Link>
        </div>
      </div>
    )
  }

  const gridClassName = styles.downloadGrid
  const activeItems = activeTab === 'audios' ? audios : literature

  const playerSubtitle = `${language.titleMr} · ${subject.titleMr}`

  return (
    <div className={styles.page}>
      <InnerBanner contentId="language-subject-content" />

      <div className={`${styles.content} ${pageUi.content}`} id="language-subject-content">
        <h1 className={styles.pageTitle}>Downloads</h1>

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
                ध्वनिफीत / Audios
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
                वाङ्मय / Literature
                {literature.length > 0 && (
                  <span className={styles.tabCount}>{literature.length}</span>
                )}
              </button>
            </div>

            <div className={styles.panel} role="tabpanel">
              <p className={styles.breadcrumb}>
                {language.titleMr} · {language.titleEn} → {subject.titleMr} · {subject.titleEn}
              </p>

              {loading ? (
                <div className={pageUi.empty}>
                  <p>साहित्य लोड होत आहे...</p>
                  <p className={pageUi.emptySub}>Loading downloads...</p>
                </div>
              ) : error ? (
                <div className={pageUi.empty}>
                  <p>साहित्य लोड करता आले नाही.</p>
                  <p className={pageUi.emptySub}>Could not load downloads. Please try again later.</p>
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
                    ? 'No audios available for this language and subject.'
                    : 'No literature available for this language and subject.'}
                </p>
              )}
            </div>
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>विषय / Subject</div>
            {otherSubjects.length > 0 ? (
              <nav className={styles.sidebarNav} aria-label="Other subjects">
                {otherSubjects.map(({ slug, titleMr, titleEn }) => (
                  <Link
                    key={slug}
                    to={getLanguageSubjectUrl(languageSlug, slug)}
                    className={styles.sidebarLink}
                  >
                    {titleMr} · {titleEn}
                  </Link>
                ))}
              </nav>
            ) : (
              <p className={styles.sidebarEmpty}>No other subjects available.</p>
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
