import { useEffect, useMemo, useState } from 'react'
import InnerBanner from '../components/InnerBanner'
import { CATEGORY_BANNER_IMAGES, CATEGORY_BANNER_THEMES } from '../data/categoryCardImages'
import pageUi from '../styles/pageUi.module.css'
import { Link, useSearchParams } from 'react-router-dom'
import { FiBookOpen, FiSearch, FiUsers } from 'react-icons/fi'
import { subjectAuthors, subjectCategories, subjects } from '../data/subjects'
import { useI18n } from '../i18n/useI18n'
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

function SubjectCard({ slug, titleMr, titleEn, icon, hintMr, hintEn, authorCount, index }) {
  const { pickField, t } = useI18n()

  return (
    <Link
      to={`/subject/${slug}`}
      className={`${styles.card} ${pageUi.cardAnim}`}
      style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
    >
      <div className={styles.cardBorder} aria-hidden="true" />
      <div className={styles.cardContent}>
        <span className={styles.iconWrap}>{subjectIcons[icon]}</span>
        <div className={styles.titles}>
          <span className={styles.titleMr}>{pickField({ titleMr, titleEn }, 'title')}</span>
        </div>
        <p className={styles.hint}>{pickField({ hintMr, hintEn }, 'hint')}</p>
        <div className={styles.cardMeta}>
          <span className={styles.authorBadge}>
            {t('pages.subject.countAuthors', { count: authorCount })}
          </span>
          <span className={styles.cardCta}>
            {t('common.view')}
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </Link>
  )
}

function Subject() {
  const { t, pickField } = useI18n()
  const [searchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState(() => searchParams.get('search') ?? '')

  useEffect(() => {
    const query = searchParams.get('search') ?? ''
    setSearch(query)
  }, [searchParams])

  useEffect(() => {
    document.title = t('pages.subject.documentTitle')
    return () => {
      document.title = t('site.title')
    }
  }, [t])

  const subjectsWithCounts = useMemo(
    () =>
      subjects.map((subject) => ({
        ...subject,
        authorCount: subjectAuthors[subject.slug]?.length ?? 0,
      })),
    [],
  )

  const filteredSubjects = useMemo(() => {
    const byCategory =
      activeCategory === 'all'
        ? subjectsWithCounts
        : subjectsWithCounts.filter((s) => s.category === activeCategory)

    const query = search.trim().toLowerCase()
    if (!query) return byCategory

    return byCategory.filter(
      ({ titleMr, titleEn, hintMr, hintEn }) =>
        titleMr.toLowerCase().includes(query) ||
        titleEn.toLowerCase().includes(query) ||
        hintMr.toLowerCase().includes(query) ||
        hintEn.toLowerCase().includes(query),
    )
  }, [activeCategory, search, subjectsWithCounts])

  const totalAuthors = useMemo(() => {
    const unique = new Set()
    Object.values(subjectAuthors).forEach((authors) => {
      authors.forEach(({ slug }) => unique.add(slug))
    })
    return unique.size
  }, [])


  const categoryCounts = useMemo(() => {
    const counts = { all: subjects.length }
    subjects.forEach(({ category }) => {
      counts[category] = (counts[category] ?? 0) + 1
    })
    return counts
  }, [])

  return (
    <div className={styles.page}>
      <InnerBanner
        contentId="subject-content"
        scrollLabel={t('pages.subject.scrollLabel')}
        image={CATEGORY_BANNER_IMAGES.subject}
        imageAlt={t('pages.subject.bannerAlt')}
        visualTheme={CATEGORY_BANNER_THEMES.subject}
      />

      <div className={`${styles.content} ${pageUi.content}`} id="subject-content">
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>{t('pages.subject.title')}</h1>
          <p className={styles.pageIntro}>{t('pages.subject.intro')}</p>
        </header>

        <div className={`${styles.steps} ${pageUi.steps}`} aria-label="How to use this page">
          <div className={`${styles.step} ${pageUi.step}`}>
            <span className={styles.stepNum}>{t('pages.subject.step1Num')}</span>
            <span className={styles.stepText}>{t('pages.subject.step1')}</span>
          </div>
          <span className={styles.stepArrow} aria-hidden="true">→</span>
          <div className={`${styles.step} ${pageUi.step}`}>
            <span className={styles.stepNum}>{t('pages.subject.step2Num')}</span>
            <span className={styles.stepText}>{t('pages.subject.step2')}</span>
          </div>
          <span className={styles.stepArrow} aria-hidden="true">→</span>
          <div className={`${styles.step} ${pageUi.step}`}>
            <span className={styles.stepNum}>{t('pages.subject.step3Num')}</span>
            <span className={styles.stepText}>{t('pages.subject.step3')}</span>
          </div>
        </div>

        <div className={styles.toolbar}>
          <label className={styles.searchWrap}>
            <FiSearch className={styles.searchIcon} aria-hidden="true" />
            <input
              type="search"
              className={styles.searchInput}
              placeholder={t('pages.subject.searchPlaceholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <div className={styles.countBadges}>
            <span className={styles.countBadge}>
              <FiBookOpen aria-hidden="true" />
              {t('pages.subject.countSubjects', { count: filteredSubjects.length })}
            </span>
            <span className={styles.countBadgeMuted}>
              <FiUsers aria-hidden="true" />
              {t('pages.subject.countAuthors', { count: totalAuthors })}
            </span>
          </div>
        </div>

        <div className={styles.filters} role="tablist" aria-label="Filter subjects by category">
          {subjectCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={activeCategory === category.id}
              className={activeCategory === category.id ? styles.filterActive : styles.filterBtn}
              onClick={() => setActiveCategory(category.id)}
            >
              <span className={styles.filterMr}>{pickField(category, 'title')}</span>
              <span className={styles.filterCount}>{categoryCounts[category.id] ?? 0}</span>
            </button>
          ))}
        </div>

        {search.trim() && (
          <p className={styles.resultCount}>
            {t('pages.subject.resultsFor', {
              count: filteredSubjects.length,
              query: search.trim(),
            })}
          </p>
        )}

        {filteredSubjects.length === 0 ? (
          <div className={pageUi.empty}>
            <p>{t('pages.subject.empty')}</p>
            <p className={pageUi.emptySub}>{t('pages.subject.emptySub')}</p>
            <button
              type="button"
              className={pageUi.emptyReset}
              onClick={() => {
                setSearch('')
                setActiveCategory('all')
              }}
            >
              {t('pages.subject.viewAll')}
            </button>
          </div>
        ) : (
          <div className={styles.grid} key={`${activeCategory}-${search}`}>
            {filteredSubjects.map((subject, index) => (
              <SubjectCard key={subject.slug} {...subject} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Subject
