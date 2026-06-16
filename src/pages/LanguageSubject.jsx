import { useEffect, useState } from 'react'
import InnerBanner from '../components/InnerBanner'
import pageUi from '../styles/pageUi.module.css'
import { Link, useParams } from 'react-router-dom'
import {
  getAudiosForLanguageSubject,
  getLanguageBySlug,
  getLanguageSubjectUrl,
  getLiteratureForLanguageSubject,
  getOtherSubjectsForLanguage,
} from '../data/languages'
import { getSubjectBySlug } from '../data/subjects'
import styles from './SubjectAuthor.module.css'

function Mp3Icon() {
  return (
    <svg
      className={styles.mp3Icon}
      viewBox="0 0 64 80"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M8 4h32l16 16v56a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4z"
        fill="#ffffff"
        stroke="#e8661a"
        strokeWidth="2"
      />
      <path d="M40 4v16h16" fill="none" stroke="#e8661a" strokeWidth="2" />
      <text x="32" y="48" textAnchor="middle" fontSize="13" fontWeight="700" fill="#e8661a">
        MP3
      </text>
      <path d="M24 58h6v8h-6zM34 54h6v12h-6z" fill="#e8661a" />
      <path d="M50 8l6 4v6l-6-4z" fill="#c41e1e" stroke="#c41e1e" strokeWidth="1" />
      <path
        d="M53 14v8M50 17h6"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function PdfIcon() {
  return (
    <svg
      className={styles.pdfIcon}
      viewBox="0 0 64 80"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M8 4h32l16 16v56a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4z"
        fill="#ffffff"
        stroke="#333333"
        strokeWidth="2"
      />
      <path d="M40 4v16h16" fill="none" stroke="#333333" strokeWidth="2" />
      <text x="32" y="52" textAnchor="middle" fontSize="14" fontWeight="700" fill="#c41e1e">
        PDF
      </text>
      <path
        d="M32 58v12M26 64l6 6 6-6"
        fill="none"
        stroke="#c41e1e"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function LiteratureCard({ titleMr, titleEn, cardType = 'pdf' }) {
  const Icon = cardType === 'mp3' ? Mp3Icon : PdfIcon

  return (
    <article className={styles.downloadCard}>
      <Icon />
      <div className={styles.cardText}>
        <p className={styles.cardTitleMr}>{titleMr}</p>
        <p className={styles.cardTitleEn}>{titleEn}</p>
      </div>
      <a href="#" className={styles.downloadButton}>
        Download File
      </a>
    </article>
  )
}

function AudioCard({ titleMr, titleEn }) {
  return (
    <article className={styles.downloadCard}>
      <Mp3Icon />
      <div className={styles.cardText}>
        <p className={styles.cardTitleMr}>{titleMr}</p>
        <p className={styles.cardTitleEn}>{titleEn}</p>
      </div>
      <a href="#" className={styles.downloadButton}>
        Download File
      </a>
    </article>
  )
}

function LanguageSubject() {
  const { languageSlug, subjectSlug } = useParams()
  const [activeTab, setActiveTab] = useState('audios')

  const language = getLanguageBySlug(languageSlug)
  const subject = getSubjectBySlug(subjectSlug)
  const otherSubjects = getOtherSubjectsForLanguage(languageSlug, subjectSlug)
  const audios = getAudiosForLanguageSubject(languageSlug, subjectSlug)
  const literature = getLiteratureForLanguageSubject(languageSlug, subjectSlug)

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

  const showAudios = activeTab === 'audios' && audios.length > 0
  const showLiterature = activeTab === 'literature' && literature.length > 0
  const emptyMessage =
    activeTab === 'audios' ? 'No Audios available.' : 'No Literature available.'
  const activeItems = activeTab === 'audios' ? audios : literature
  const gridClassName =
    activeItems.length > 8
      ? `${styles.downloadGrid} ${styles.downloadGridWide}`
      : styles.downloadGrid

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
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'literature'}
                className={activeTab === 'literature' ? styles.tabActive : styles.tab}
                onClick={() => setActiveTab('literature')}
              >
                वाङ्मय / Literature
              </button>
            </div>

            <div className={styles.panel} role="tabpanel">
              <p className={styles.breadcrumb}>
                {language.titleMr} # {language.titleEn} -&gt; {subject.titleMr} #{' '}
                {subject.titleEn}
              </p>
              {showAudios ? (
                <div className={gridClassName}>
                  {audios.map((item) => (
                    <AudioCard key={item.titleEn} {...item} />
                  ))}
                </div>
              ) : showLiterature ? (
                <div className={gridClassName}>
                  {literature.map((item) => (
                    <LiteratureCard key={item.titleEn} {...item} />
                  ))}
                </div>
              ) : (
                <p className={styles.emptyMessage}>{emptyMessage}</p>
              )}
            </div>
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>विषय # Subject</div>
            {otherSubjects.length > 0 ? (
              <nav className={styles.sidebarNav} aria-label="Other subjects">
                {otherSubjects.map(({ slug, titleMr, titleEn }) => (
                  <Link
                    key={slug}
                    to={getLanguageSubjectUrl(languageSlug, slug)}
                    className={styles.sidebarLink}
                  >
                    {titleMr} # {titleEn}
                  </Link>
                ))}
              </nav>
            ) : (
              <p className={styles.sidebarEmpty}>No other subjects available.</p>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}

export default LanguageSubject
