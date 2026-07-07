import { useEffect } from 'react'
import InnerBanner from '../components/InnerBanner'
import pageUi from '../styles/pageUi.module.css'
import { Link, useParams } from 'react-router-dom'
import {
  getAuthorBySlug,
  getAuthorSubjectUrl,
  getAuthorUrl,
  getOtherAuthors,
  getSubjectsForAuthor,
} from '../data/authors'
import { useI18n } from '../i18n/useI18n'
import styles from './AuthorDetail.module.css'

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

function SubjectCard({ slug, titleMr, titleEn, authorSlug }) {
  const { t, pickField } = useI18n()

  return (
    <Link to={getAuthorSubjectUrl(slug, authorSlug)} className={styles.subjectCard}>
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

function AuthorDetail() {
  const { t, pickField } = useI18n()
  const { slug } = useParams()
  const author = getAuthorBySlug(slug)
  const authorSubjects = getSubjectsForAuthor(slug)
  const otherAuthors = getOtherAuthors(slug)

  useEffect(() => {
    if (author) {
      document.title = t('common.documentTitleWithName', { name: pickField(author, 'title') })
    }
    return () => {
      document.title = t('site.title')
    }
  }, [author, t, pickField])

  if (!author) {
    return (
      <div className={styles.page}>
        <div className={`${styles.content} ${pageUi.content}`} id="author-detail-content">
          <p className={styles.notFound}>{t('common.authorNotFound')}</p>
          <Link to="/author" className={styles.backLink}>
            {t('common.backToAuthor')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <InnerBanner contentId="author-detail-content" />

      <div className={`${styles.content} ${pageUi.content}`} id="author-detail-content">
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link to="/browse" className={styles.breadcrumbLink}>
            {t('pages.browse.title')}
          </Link>
          <span className={styles.breadcrumbSep} aria-hidden="true">›</span>
          <Link to="/author" className={styles.breadcrumbLink}>
            {t('common.author')}
          </Link>
          <span className={styles.breadcrumbSep} aria-hidden="true">›</span>
          <span className={styles.breadcrumbCurrent}>
            {pickField(author, 'title')}
          </span>
        </nav>

        <div className={styles.authorHero}>
          <AuthorAvatar title={pickField(author, 'title')} image={author.image} />
          <div className={styles.authorHeroText}>
            <p className={styles.stepLabel}>{t('common.step2ChooseSubject')}</p>
            <h1 className={styles.pageTitle}>{pickField(author, 'title')}</h1>
            <p className={styles.pageSubtitle}>{t('pages.authorDetail.intro')}</p>
            <span className={styles.subjectCountBadge}>
              {t('pages.authorDetail.countSubjects', { count: authorSubjects.length })}
            </span>
          </div>
        </div>

        <div className={styles.layout}>
          <div className={styles.mainColumn}>
            <div className={styles.sectionBar}>
              <span className={styles.sectionTitle}>{t('common.chooseSubject')}</span>
            </div>

            {authorSubjects.length > 0 ? (
              <div
                className={`${styles.subjectGrid} ${
                  authorSubjects.length <= 4 ? styles.subjectGridFour : ''
                }`}
              >
                {authorSubjects.map((subject) => (
                  <SubjectCard key={subject.slug} {...subject} authorSlug={slug} />
                ))}
              </div>
            ) : (
              <p className={styles.emptyMessage}>{t('common.noSubjectsForAuthor')}</p>
            )}
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              <span>{t('common.otherAuthors')}</span>
              <span className={styles.sidebarCount}>{otherAuthors.length}</span>
            </div>
            <nav className={styles.sidebarNav} aria-label="Other authors">
              {otherAuthors.map(({ slug: authorSlug, titleMr, titleEn, image }) => (
                <Link
                  key={authorSlug}
                  to={getAuthorUrl(authorSlug)}
                  className={styles.sidebarLink}
                >
                  <span className={styles.sidebarLinkInner}>
                    {image ? (
                      <img src={image} alt="" className={styles.sidebarThumb} loading="lazy" />
                    ) : (
                      <span className={styles.sidebarThumbPlaceholder} aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                          <circle cx="12" cy="8" r="4" />
                          <path d="M4 20c1.6-3.5 5-5.5 8-5.5s6.4 2 8 5.5" strokeLinecap="round" />
                        </svg>
                      </span>
                    )}
                    <span className={styles.sidebarLinkText}>
                      <span className={styles.sidebarMr}>{pickField({ titleMr, titleEn }, 'title')}</span>
                    </span>
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

export default AuthorDetail
