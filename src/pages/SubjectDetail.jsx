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
import styles from './SubjectDetail.module.css'

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

function AuthorCard({ slug, authorSlug, titleMr, titleEn, image, subjectSlug }) {
  const linkSlug = authorSlug ?? slug

  return (
    <Link to={getSubjectAuthorUrl(subjectSlug, linkSlug)} className={styles.authorCard}>
      <div className={styles.authorCardBorder} aria-hidden="true" />
      <div className={styles.authorCardContent}>
        <AuthorAvatar titleMr={titleMr} image={image} />
        <div className={styles.authorText}>
          <span className={styles.authorTitleMr}>{titleMr}</span>
          <span className={styles.separator}>#</span>
          <span className={styles.authorTitleEn}>{titleEn}</span>
        </div>
        <span className={styles.authorCta}>
          साहित्य पहा
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  )
}

function SubjectDetail() {
  const { slug } = useParams()
  const subject = getSubjectBySlug(slug)
  const authors = subjectAuthors[slug] ?? []
  const otherSubjects = getOtherSubjects(slug)

  useEffect(() => {
    if (subject) {
      document.title = `${subject.titleMr} – श्री समर्थ रामदास`
    }
    return () => {
      document.title = 'श्री समर्थ रामदास - श्री रामदासांचे साहित्य'
    }
  }, [subject])

  if (!subject) {
    return (
      <div className={styles.page}>
        <div className={`${styles.content} ${pageUi.content}`} id="subject-detail-content">
          <p className={styles.notFound}>Subject not found.</p>
          <Link to="/subject" className={styles.backLink}>
            Back to Subject
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
          <Link to="/subject" className={styles.breadcrumbLink}>
            विषय / Subject
          </Link>
          <span className={styles.breadcrumbSep} aria-hidden="true">›</span>
          <span className={styles.breadcrumbCurrent}>
            {subject.titleMr} / {subject.titleEn}
          </span>
        </nav>

        <h1 className={styles.pageTitle}>
          {subject.titleMr} # {subject.titleEn} -&gt; लेखक # Authors
        </h1>

        <p className={styles.pageIntro}>
          खालील लेखक निवडा आणि ऑडिओ व साहित्य पहा.
          <span className={styles.pageIntroEn}>
            Select an author below to view audio & literature.
          </span>
        </p>

        <div className={styles.layout}>
          <div className={styles.mainColumn}>
            <div className={styles.sectionBar}>
              <span className={styles.sectionTitle}>
                लेखक निवडा / Choose Author
              </span>
              <span className={styles.authorCount}>
                {authors.length} लेखक · {authors.length} Authors
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
              <span>इतर विषय / Other Subjects</span>
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
                    <span className={styles.sidebarMr}>{titleMr}</span>
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

export default SubjectDetail
