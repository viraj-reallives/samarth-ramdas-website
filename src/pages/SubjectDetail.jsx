import { useEffect } from 'react'
import InnerBanner from '../components/InnerBanner'
import pageUi from '../styles/pageUi.module.css'
import { Link, useParams } from 'react-router-dom'
import {
  getOtherSubjects,
  getSubjectAuthorUrl,
  getSubjectBySlug,
  subjectAuthors,
} from '../data/subjects'
import { useI18n } from '../i18n/useI18n'
import styles from './SubjectDetail.module.css'

function AuthorAvatar({ title, image }) {
  if (image) {
    return (
      <div className={styles.photoFrame}>
        <img src={image} alt={title} className={styles.authorPhoto} loading="lazy" />
      </div>
    )
  }

  return (
    <div className={styles.photoFrame}>
      <div className={styles.photoPlaceholder} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c1.6-3.5 5-5.5 8-5.5s6.4 2 8 5.5" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  )
}

function AuthorCard({ slug, authorSlug, titleMr, titleEn, image, subjectSlug }) {
  const { t, pickField } = useI18n()
  const linkSlug = authorSlug ?? slug
  const title = pickField({ titleMr, titleEn }, 'title')

  return (
    <Link to={getSubjectAuthorUrl(subjectSlug, linkSlug)} className={styles.authorCard}>
      <div className={styles.authorCardBorder} aria-hidden="true" />
      <div className={styles.authorCardContent}>
        <AuthorAvatar title={title} image={image} />
        <div className={styles.authorText}>
          <span className={styles.authorTitleMr}>{title}</span>
        </div>
        <span className={styles.authorCta}>
          {t('common.viewLiterature')}
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  )
}

function SubjectDetail() {
  const { t, pickField } = useI18n()
  const { slug } = useParams()
  const subject = getSubjectBySlug(slug)
  const authors = subjectAuthors[slug] ?? []
  const otherSubjects = getOtherSubjects(slug)

  useEffect(() => {
    if (subject) {
      document.title = t('common.documentTitleWithName', { name: pickField(subject, 'title') })
    }
    return () => {
      document.title = t('site.title')
    }
  }, [subject, t, pickField])

  if (!subject) {
    return (
      <div className={styles.page}>
        <div className={`${styles.content} ${pageUi.content}`} id="subject-detail-content">
          <p className={styles.notFound}>{t('common.subjectNotFound')}</p>
          <Link to="/subject" className={styles.backLink}>
            {t('common.backToSubject')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <InnerBanner contentId="subject-detail-content" />

      <div className={`${styles.content} ${pageUi.content}`} id="subject-detail-content">
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link to="/browse" className={styles.breadcrumbLink}>
            {t('pages.browse.title')}
          </Link>
          <span className={styles.breadcrumbSep} aria-hidden="true">›</span>
          <Link to="/subject" className={styles.breadcrumbLink}>
            {t('common.subject')}
          </Link>
          <span className={styles.breadcrumbSep} aria-hidden="true">›</span>
          <span className={styles.breadcrumbCurrent}>
            {pickField(subject, 'title')}
          </span>
        </nav>

        <p className={styles.stepLabel}>{t('common.step2ChooseAuthor')}</p>

        <h1 className={styles.pageTitle}>{pickField(subject, 'title')}</h1>

        <p className={styles.pageIntro}>{t('pages.subjectDetail.intro')}</p>

        <div className={styles.layout}>
          <div className={styles.mainColumn}>
            <div className={styles.sectionBar}>
              <span className={styles.sectionTitle}>{t('common.chooseAuthor')}</span>
              <span className={styles.authorCount}>
                {t('pages.subjectDetail.countAuthors', { count: authors.length })}
              </span>
            </div>

            <div
              className={`${styles.authorGrid} ${
                authors.length <= 4 ? styles.authorGridFour : ''
              }`}
            >
              {authors.map((author, index) => (
                <AuthorCard
                  key={author.id ?? `${author.slug}-${index}`}
                  {...author}
                  subjectSlug={slug}
                />
              ))}
            </div>
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              <span>{t('common.otherSubjects')}</span>
              <span className={styles.sidebarCount}>{otherSubjects.length}</span>
            </div>
            <nav className={styles.sidebarNav} aria-label="Other subjects">
              {otherSubjects.map(({ slug: subjectSlug, titleMr, titleEn }) => (
                <Link
                  key={subjectSlug}
                  to={`/subject/${subjectSlug}`}
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

export default SubjectDetail
