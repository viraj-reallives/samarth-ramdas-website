import { useEffect, useState } from 'react'
import InnerBanner from '../components/InnerBanner'
import pageUi from '../styles/pageUi.module.css'
import { Link, useParams } from 'react-router-dom'
import {
  getLanguageBySlug,
  getLanguageSubjectUrl,
  getOtherLanguages,
  getSubjectsForLanguage,
} from '../data/languages'
import { useI18n } from '../i18n/useI18n'
import { loadSubjectsForLanguage } from '../utils/browseApi'
import styles from './LanguageDetail.module.css'

function SubjectCard({ languageSlug, slug, titleMr, titleEn }) {
  const { t, pickField } = useI18n()

  return (
    <Link
      to={getLanguageSubjectUrl(languageSlug, slug)}
      className={styles.subjectCard}
    >
      <div className={styles.subjectCardBorder} aria-hidden="true" />
      <div className={styles.subjectCardContent}>
        <span className={styles.subjectTitleMr}>{pickField({ titleMr, titleEn }, 'title')}</span>
        <span className={styles.subjectCta}>
          {t('common.view')}
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  )
}

function LanguageDetail() {
  const { t, pickField } = useI18n()
  const { slug } = useParams()
  const language = getLanguageBySlug(slug)
  const otherLanguages = getOtherLanguages(slug)
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) return undefined

    let active = true
    setLoading(true)
    setError(null)

    loadSubjectsForLanguage(slug, getSubjectsForLanguage(slug))
      .then((items) => {
        if (!active) return
        setSubjects(items)
      })
      .catch((err) => {
        if (!active) return
        setError(err.message)
        setSubjects([])
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [slug])

  useEffect(() => {
    if (language) {
      document.title = t('common.documentTitleWithName', { name: pickField(language, 'title') })
    }
    return () => {
      document.title = t('site.title')
    }
  }, [language, t, pickField])

  if (!language) {
    return (
      <div className={styles.page}>
        <div className={`${styles.content} ${pageUi.content}`} id="language-detail-content">
          <p className={styles.notFound}>{t('common.languageNotFound')}</p>
          <Link to="/language" className={styles.backLink}>
            {t('common.backToLanguage')}
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
          <Link to="/browse" className={styles.breadcrumbLink}>
            {t('pages.browse.title')}
          </Link>
          <span className={styles.breadcrumbSep} aria-hidden="true">›</span>
          <Link to="/language" className={styles.breadcrumbLink}>
            {t('common.language')}
          </Link>
          <span className={styles.breadcrumbSep} aria-hidden="true">›</span>
          <span className={styles.breadcrumbCurrent}>
            {pickField(language, 'title')}
          </span>
        </nav>

        <p className={styles.stepLabel}>{t('common.step2ChooseSubject')}</p>

        <h1 className={styles.pageTitle}>{pickField(language, 'title')}</h1>

        <p className={styles.pageIntro}>{t('pages.languageDetail.intro')}</p>

        <div className={styles.layout}>
          <div className={styles.mainColumn}>
            <div className={styles.sectionBar}>
              <span className={styles.sectionTitle}>{t('common.chooseSubject')}</span>
              {!loading && (
                <span className={styles.subjectCount}>
                  {t('pages.authorDetail.countSubjects', { count: subjects.length })}
                </span>
              )}
            </div>

            {loading ? (
              <div className={pageUi.empty}>
                <p>{t('common.loadingSubjects')}</p>
              </div>
            ) : error ? (
              <div className={pageUi.empty}>
                <p>{t('common.loadSubjectsError')}</p>
              </div>
            ) : subjects.length === 0 ? (
              <div className={pageUi.empty}>
                <p>{t('common.noLiteratureForLanguage')}</p>
              </div>
            ) : (
              <div className={styles.subjectGrid}>
                {subjects.map((subject) => (
                  <SubjectCard
                    key={subject.slug}
                    languageSlug={slug}
                    {...subject}
                  />
                ))}
              </div>
            )}
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              <span>{t('common.otherLanguages')}</span>
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
                    <span className={styles.sidebarMr}>{pickField({ titleMr, titleEn }, 'title')}</span>
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
