import { useEffect, useState } from 'react'
import InnerBanner from '../components/InnerBanner'
import AudioPlayerModal from '../components/AudioPlayerModal'
import { AudioDownloadCard, LiteratureDownloadCard } from '../components/DownloadContentCards'
import pageUi from '../styles/pageUi.module.css'
import { Link, useParams } from 'react-router-dom'
import {
  getAuthorForSubject,
  getOtherAuthorsForSubject,
  getSubjectAuthorUrl,
  getSubjectBySlug,
} from '../data/subjects'
import { useI18n } from '../i18n/useI18n'
import { fetchBrowseItems, getDefaultDownloadTab } from '../utils/browseApi'
import styles from './SubjectAuthor.module.css'

function SubjectAuthor() {
  const { t, pickField, joinFields } = useI18n()
  const { subjectSlug, authorSlug } = useParams()
  const [activeTab, setActiveTab] = useState('audios')
  const [audios, setAudios] = useState([])
  const [literature, setLiterature] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [playingTrack, setPlayingTrack] = useState(null)

  const subject = getSubjectBySlug(subjectSlug)
  const author = getAuthorForSubject(subjectSlug, authorSlug)
  const otherAuthors = getOtherAuthorsForSubject(subjectSlug, authorSlug)

  useEffect(() => {
    if (!subjectSlug || !authorSlug) return undefined

    let active = true
    setLoading(true)
    setError(null)

    Promise.all([
      fetchBrowseItems({ subject: subjectSlug, author: authorSlug, type: 'audio' }),
      fetchBrowseItems({ subject: subjectSlug, author: authorSlug, type: 'pdf' }),
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
  }, [subjectSlug, authorSlug])

  useEffect(() => {
    if (subject && author) {
      document.title = t('common.documentTitleDashPair', {
        first: pickField(author, 'title'),
        second: pickField(subject, 'title'),
      })
    }
    return () => {
      document.title = t('site.title')
    }
  }, [subject, author, t, pickField])

  if (!subject || !author) {
    return (
      <div className={styles.page}>
        <div className={`${styles.content} ${pageUi.content}`} id="subject-author-content">
          <p className={styles.notFound}>{t('common.contentNotFound')}</p>
          <Link to="/subject" className={styles.backLink}>
            {t('common.backToSubject')}
          </Link>
        </div>
      </div>
    )
  }

  const gridClassName = styles.downloadGrid
  const activeItems = activeTab === 'audios' ? audios : literature
  const playerSubtitle = `${pickField(subject, 'title')} · ${pickField(author, 'title')}`

  return (
    <div className={styles.page}>
      <InnerBanner contentId="subject-author-content" />

      <div className={`${styles.content} ${pageUi.content}`} id="subject-author-content">
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
                {joinFields([subject, author], 'title')}
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
            <div className={styles.sidebarHeader}>{t('common.authors')}</div>
            {otherAuthors.length > 0 ? (
              <nav className={styles.sidebarNav} aria-label="Other authors">
                {otherAuthors.map(({ slug, titleMr, titleEn }) => (
                  <Link
                    key={slug}
                    to={getSubjectAuthorUrl(subjectSlug, slug)}
                    className={styles.sidebarLink}
                  >
                    {pickField({ titleMr, titleEn }, 'title')}
                  </Link>
                ))}
              </nav>
            ) : (
              <p className={styles.sidebarEmpty}>
                {t('common.noOtherAuthors', { name: pickField(subject, 'title') })}
              </p>
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

export default SubjectAuthor
