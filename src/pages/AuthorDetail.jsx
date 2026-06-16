import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  getAuthorBySlug,
  getAuthorSubjectUrl,
  getAuthorUrl,
  getOtherAuthors,
  getSubjectsForAuthor,
} from '../data/authors'
import styles from './AuthorDetail.module.css'

function AuthorAvatar({ titleMr, image }) {
  if (image) {
    return (
      <div className={styles.photoFrame}>
        <img src={image} alt={titleMr} className={styles.authorPhoto} loading="lazy" />
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
  return (
    <Link to={getAuthorSubjectUrl(slug, authorSlug)} className={styles.subjectCard}>
      <div className={styles.subjectCardBorder} aria-hidden="true" />
      <div className={styles.subjectCardContent}>
        <span className={styles.subjectTitleMr}>{titleMr}</span>
        <span className={styles.separator}>#</span>
        <span className={styles.subjectTitleEn}>{titleEn}</span>
        <span className={styles.subjectCta}>
          पहा / View
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  )
}

function AuthorDetail() {
  const { slug } = useParams()
  const author = getAuthorBySlug(slug)
  const authorSubjects = getSubjectsForAuthor(slug)
  const otherAuthors = getOtherAuthors(slug)

  useEffect(() => {
    if (author) {
      document.title = `${author.titleMr} – श्री समर्थ रामदास`
    }
    return () => {
      document.title = 'श्री समर्थ रामदास - श्री रामदासांचे साहित्य'
    }
  }, [author])

  if (!author) {
    return (
      <div className={styles.page}>
        <div className={styles.content}>
          <p className={styles.notFound}>Author not found.</p>
          <Link to="/author" className={styles.backLink}>
            Back to Author
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.banner}>
        <img
          src="/assets/inner-banner.png"
          alt="|| जय जय रघुवीर समर्थ ||"
          className={styles.bannerImage}
        />
      </div>

      <div className={styles.content}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link to="/author" className={styles.breadcrumbLink}>
            लेखक / Author
          </Link>
          <span className={styles.breadcrumbSep} aria-hidden="true">›</span>
          <span className={styles.breadcrumbCurrent}>
            {author.titleMr} / {author.titleEn}
          </span>
        </nav>

        <div className={styles.authorHero}>
          <AuthorAvatar titleMr={author.titleMr} image={author.image} />
          <div className={styles.authorHeroText}>
            <h1 className={styles.pageTitle}>
              {author.titleMr} # {author.titleEn}
            </h1>
            <p className={styles.pageSubtitle}>
              खालील विषय निवडा आणि ऑडिओ व साहित्य पहा.
              <span className={styles.pageSubtitleEn}>
                Select a subject below to browse audio & literature.
              </span>
            </p>
            <span className={styles.subjectCountBadge}>
              {authorSubjects.length} विषय · {authorSubjects.length} Subjects
            </span>
          </div>
        </div>

        <div className={styles.layout}>
          <div className={styles.mainColumn}>
            <div className={styles.sectionBar}>
              <span className={styles.sectionTitle}>विषय निवडा / Choose Subject</span>
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
              <p className={styles.emptyMessage}>या लेखकासाठी विषय उपलब्ध नाहीत.</p>
            )}
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              <span>इतर लेखक / Other Authors</span>
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
                      <span className={styles.sidebarMr}>{titleMr}</span>
                      <span className={styles.sidebarEn}>{titleEn}</span>
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
