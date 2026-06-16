import { useEffect } from 'react'
import InnerBanner from '../components/InnerBanner'
import pageUi from '../styles/pageUi.module.css'
import { Link, useParams } from 'react-router-dom'
import {
  getLanguageBySlug,
  getLanguageSubjectUrl,
  getOtherLanguages,
  getSubjectsForLanguage,
} from '../data/languages'
import styles from './LanguageDetail.module.css'

function SubjectCard({ languageSlug, slug, titleMr, titleEn }) {
  return (
    <Link
      to={getLanguageSubjectUrl(languageSlug, slug)}
      className={styles.subjectCard}
    >
      <div className={styles.subjectCardBorder} aria-hidden="true" />
      <div className={styles.subjectCardContent}>
        <span className={styles.subjectTitleMr}>{titleMr}</span>
        <span className={styles.subjectSep}>#</span>
        <span className={styles.subjectTitleEn}>{titleEn}</span>
        <span className={styles.subjectCta}>
          पहा / View
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  )
}

function LanguageDetail() {
  const { slug } = useParams()
  const language = getLanguageBySlug(slug)
  const subjects = getSubjectsForLanguage(slug)
  const otherLanguages = getOtherLanguages(slug)

  useEffect(() => {
    if (language) {
      document.title = `${language.titleMr} – श्री समर्थ रामदास`
    }
    return () => {
      document.title = 'श्री समर्थ रामदास - श्री रामदासांचे साहित्य'
    }
  }, [language])

  if (!language) {
    return (
      <div className={styles.page}>
        <div className={`${styles.content} ${pageUi.content}`} id="language-detail-content">
          <p className={styles.notFound}>Language not found.</p>
          <Link to="/language" className={styles.backLink}>
            Back to Language
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <InnerBanner contentId="language-detail-content" />

      <div className={`${styles.content} ${pageUi.content}`} id="language-detail-content">
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link to="/language" className={styles.breadcrumbLink}>
            भाषा / Language
          </Link>
          <span className={styles.breadcrumbSep} aria-hidden="true">›</span>
          <span className={styles.breadcrumbCurrent}>
            {language.titleMr} / {language.titleEn}
          </span>
        </nav>

        <h1 className={styles.pageTitle}>
          {language.titleMr} # {language.titleEn} -&gt; विषय # Subject
        </h1>

        <p className={styles.pageIntro}>
          खालील विषय निवडा आणि {language.titleMr} भाषेतील साहित्य पहा.
          <span className={styles.pageIntroEn}>
            Select a subject below to browse literature in {language.titleEn}.
          </span>
        </p>

        <div className={styles.layout}>
          <div className={styles.mainColumn}>
            <div className={styles.sectionBar}>
              <span className={styles.sectionTitle}>
                विषय निवडा / Choose Subject
              </span>
              <span className={styles.subjectCount}>
                {subjects.length} विषय · {subjects.length} Subjects
              </span>
            </div>

            <div className={styles.subjectGrid}>
              {subjects.map((subject) => (
                <SubjectCard
                  key={subject.slug}
                  languageSlug={slug}
                  {...subject}
                />
              ))}
            </div>
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              <span>इतर भाषा / Other Language</span>
              <span className={styles.sidebarCount}>{otherLanguages.length}</span>
            </div>
            <nav className={styles.sidebarNav} aria-label="Other languages">
              {otherLanguages.map(({ slug: languageSlug, titleMr, titleEn, href }) => (
                <Link
                  key={languageSlug}
                  to={href}
                  className={styles.sidebarLink}
                >
                  <span className={styles.sidebarLinkText}>
                    <span className={styles.sidebarMr}>{titleMr}</span>
                    <span className={styles.sidebarSep}>#</span>
                    <span className={styles.sidebarEn}>{titleEn}</span>
                  </span>
                  <span className={styles.sidebarArrow} aria-hidden="true">→</span>
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default LanguageDetail
