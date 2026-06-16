import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { subjectAuthors, subjectCategories, subjects } from '../data/subjects'
import styles from './Subject.module.css'

const subjectIcons = {
  book: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  scroll: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M8 4h9a2 2 0 0 1 2 2v14H9a2 2 0 0 0-2 2V6a2 2 0 1 1 2-2z" />
      <path d="M8 4v16" strokeLinecap="round" />
    </svg>
  ),
  mic: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0M12 17v4M8 21h8" strokeLinecap="round" />
    </svg>
  ),
  music: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M9 18V5l12-2v13" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
    </svg>
  ),
  prayer: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 3v4M8 7h8M10 11h4v10H10z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  life: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c1.5-4 6-6 8-6s6.5 2 8 6" strokeLinecap="round" />
    </svg>
  ),
  pen: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  guru: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  lamp: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M9 18h6M10 22h4M12 2v2M8 8c0-2.2 1.8-4 4-4s4 1.8 4 4c0 2-1.2 3.6-3 4.4V14H11v-1.6C9.2 11.6 8 10 8 8z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  folder: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
    </svg>
  ),
}

function SubjectCard({ slug, titleMr, titleEn, icon, hintMr, hintEn, authorCount }) {
  return (
    <Link to={`/subject/${slug}`} className={styles.card}>
      <div className={styles.cardBorder} aria-hidden="true" />
      <div className={styles.cardContent}>
        <span className={styles.iconWrap}>{subjectIcons[icon]}</span>
        <div className={styles.titles}>
          <span className={styles.titleMr}>{titleMr}</span>
          <span className={styles.titleEn}>{titleEn}</span>
        </div>
        <p className={styles.hint}>
          <span>{hintMr}</span>
          <span className={styles.hintSep}>·</span>
          <span>{hintEn}</span>
        </p>
        <div className={styles.cardMeta}>
          <span className={styles.authorBadge}>
            {authorCount} लेखक · {authorCount} Authors
          </span>
          <span className={styles.cardCta}>
            पहा
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </Link>
  )
}

function Subject() {
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    document.title = 'विषय – श्री समर्थ रामदास'
    return () => {
      document.title = 'श्री समर्थ रामदास - श्री रामदासांचे साहित्य'
    }
  }, [])

  const subjectsWithCounts = useMemo(
    () =>
      subjects.map((subject) => ({
        ...subject,
        authorCount: subjectAuthors[subject.slug]?.length ?? 0,
      })),
    [],
  )

  const filteredSubjects = useMemo(
    () =>
      activeCategory === 'all'
        ? subjectsWithCounts
        : subjectsWithCounts.filter((s) => s.category === activeCategory),
    [activeCategory, subjectsWithCounts],
  )

  const categoryCounts = useMemo(() => {
    const counts = { all: subjects.length }
    subjects.forEach(({ category }) => {
      counts[category] = (counts[category] ?? 0) + 1
    })
    return counts
  }, [])

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
            विषयानुसार वर्गीकरण / Subject-wise Classification
          </h1>
          <p className={styles.pageIntro}>
            खालील विषय निवडा → लेखक पहा → ऑडिओ व साहित्य डाउनलोड करा.
            <span className={styles.pageIntroEn}>
              Pick a subject below → browse authors → download audio & literature.
            </span>
          </p>
        </header>

        <div className={styles.steps} aria-label="How to use this page">
          <div className={styles.step}>
            <span className={styles.stepNum}>१</span>
            <span className={styles.stepText}>विषय निवडा</span>
            <span className={styles.stepSub}>Choose Subject</span>
          </div>
          <span className={styles.stepArrow} aria-hidden="true">→</span>
          <div className={styles.step}>
            <span className={styles.stepNum}>२</span>
            <span className={styles.stepText}>लेखक निवडा</span>
            <span className={styles.stepSub}>Pick Author</span>
          </div>
          <span className={styles.stepArrow} aria-hidden="true">→</span>
          <div className={styles.step}>
            <span className={styles.stepNum}>३</span>
            <span className={styles.stepText}>साहित्य पहा</span>
            <span className={styles.stepSub}>View Content</span>
          </div>
        </div>

        <div className={styles.filters} role="tablist" aria-label="Filter subjects by category">
          {subjectCategories.map(({ id, titleMr, titleEn }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={activeCategory === id}
              className={activeCategory === id ? styles.filterActive : styles.filterBtn}
              onClick={() => setActiveCategory(id)}
            >
              <span className={styles.filterMr}>{titleMr}</span>
              <span className={styles.filterEn}>{titleEn}</span>
              <span className={styles.filterCount}>{categoryCounts[id] ?? 0}</span>
            </button>
          ))}
        </div>

        <p className={styles.resultCount}>
          {filteredSubjects.length} विषय दाखवत आहे · Showing {filteredSubjects.length} subjects
        </p>

        <div className={styles.grid}>
          {filteredSubjects.map((subject) => (
            <SubjectCard key={subject.slug} {...subject} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Subject
