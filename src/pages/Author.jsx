import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiSearch, FiUsers } from 'react-icons/fi'
import { authors, getAuthorUrl, getSubjectsForAuthor } from '../data/authors'
import styles from './Author.module.css'

function AuthorAvatar({ titleMr, image }) {
  if (image) {
    return (
      <div className={styles.photoFrame}>
        <img src={image} alt={titleMr} className={styles.photo} loading="lazy" />
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

function AuthorCard({ slug, titleMr, titleEn, image, subjectCount }) {
  return (
    <Link to={getAuthorUrl(slug)} className={styles.card}>
      <div className={styles.cardBorder} aria-hidden="true" />
      <div className={styles.cardContent}>
        <AuthorAvatar titleMr={titleMr} image={image} />
        <div className={styles.text}>
          <span className={styles.titleMr}>{titleMr}</span>
          <span className={styles.separator}>#</span>
          <span className={styles.titleEn}>{titleEn}</span>
        </div>
        <div className={styles.cardMeta}>
          <span className={styles.subjectBadge}>
            {subjectCount} विषय · {subjectCount} Subjects
          </span>
          <span className={styles.cardCta}>
            साहित्य पहा
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </Link>
  )
}

function Author() {
  const [search, setSearch] = useState('')

  useEffect(() => {
    document.title = 'लेखक – श्री समर्थ रामदास'
    return () => {
      document.title = 'श्री समर्थ रामदास - श्री रामदासांचे साहित्य'
    }
  }, [])

  const authorsWithCounts = useMemo(
    () =>
      authors.map((author) => ({
        ...author,
        subjectCount: getSubjectsForAuthor(author.slug).length,
      })),
    [],
  )

  const filteredAuthors = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return authorsWithCounts

    return authorsWithCounts.filter(
      ({ titleMr, titleEn }) =>
        titleMr.toLowerCase().includes(query) || titleEn.toLowerCase().includes(query),
    )
  }, [authorsWithCounts, search])

  const withPhotoCount = useMemo(
    () => authorsWithCounts.filter((author) => Boolean(author.image)).length,
    [authorsWithCounts],
  )

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
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>
            लेखकानुसार वर्गीकरण / Author-wise Classification
          </h1>
          <p className={styles.pageIntro}>
            खालील लेखक निवडा → विषय पहा → ऑडिओ व साहित्य डाउनलोड करा.
            <span className={styles.pageIntroEn}>
              Select an author below → browse subjects → download audio & literature.
            </span>
          </p>
        </header>

        <div className={styles.steps} aria-label="How to use this page">
          <div className={styles.step}>
            <span className={styles.stepNum}>१</span>
            <span className={styles.stepText}>लेखक निवडा</span>
            <span className={styles.stepSub}>Choose Author</span>
          </div>
          <span className={styles.stepArrow} aria-hidden="true">→</span>
          <div className={styles.step}>
            <span className={styles.stepNum}>२</span>
            <span className={styles.stepText}>विषय पहा</span>
            <span className={styles.stepSub}>Browse Subjects</span>
          </div>
          <span className={styles.stepArrow} aria-hidden="true">→</span>
          <div className={styles.step}>
            <span className={styles.stepNum}>३</span>
            <span className={styles.stepText}>साहित्य पहा</span>
            <span className={styles.stepSub}>View Content</span>
          </div>
        </div>

        <div className={styles.toolbar}>
          <label className={styles.searchWrap}>
            <FiSearch className={styles.searchIcon} aria-hidden="true" />
            <input
              type="search"
              className={styles.searchInput}
              placeholder="लेखक शोधा / Search author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <div className={styles.countBadges}>
            <span className={styles.countBadge}>
              <FiUsers aria-hidden="true" />
              {filteredAuthors.length} लेखक · {filteredAuthors.length} Authors
            </span>
            <span className={styles.countBadgeMuted}>
              {withPhotoCount} with photo
            </span>
          </div>
        </div>

        {filteredAuthors.length === 0 ? (
          <p className={styles.empty}>कोणताही लेखक सापडला नाही.</p>
        ) : (
          <div className={styles.grid}>
            {filteredAuthors.map((author) => (
              <AuthorCard key={author.slug} {...author} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Author
