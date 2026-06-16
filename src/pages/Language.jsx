import { useEffect, useMemo, useState } from 'react'
import InnerBanner from '../components/InnerBanner'
import pageUi from '../styles/pageUi.module.css'
import { Link } from 'react-router-dom'
import { FiGlobe, FiSearch } from 'react-icons/fi'
import { languageCategories, languages } from '../data/languages'
import styles from './Language.module.css'

function LanguageCard({ titleMr, titleEn, href, badge, hintMr, hintEn, featured, index }) {
  const cardClass = featured ? styles.cardFeatured : styles.card
  return (
    <Link
      to={href}
      className={`${cardClass} ${pageUi.cardAnim}`}
      style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
    >
      <div className={styles.cardBorder} aria-hidden="true" />
      <div className={styles.cardContent}>
        <span className={styles.badge}>{badge}</span>
        <div className={styles.titles}>
          <span className={styles.titleMr}>{titleMr}</span>
          <span className={styles.titleEn}>{titleEn}</span>
        </div>
        <p className={styles.hint}>
          <span>{hintMr}</span>
          <span className={styles.hintSep}>·</span>
          <span>{hintEn}</span>
        </p>
        <span className={styles.cta}>
          पहा / Explore
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  )
}

function Language() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    document.title = 'भाषा – श्री समर्थ रामदास'
    return () => {
      document.title = 'श्री समर्थ रामदास - श्री रामदासांचे साहित्य'
    }
  }, [])

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    return languages.filter(({ titleMr, titleEn, category }) => {
      const matchesCategory =
        activeCategory === 'all' || category === activeCategory
      const matchesSearch =
        !query ||
        titleMr.toLowerCase().includes(query) ||
        titleEn.toLowerCase().includes(query)
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, search])

  const categoryCounts = useMemo(() => {
    const counts = { all: languages.length }
    languages.forEach(({ category }) => {
      counts[category] = (counts[category] ?? 0) + 1
    })
    return counts
  }, [])

  return (
    <div className={styles.page}>
      <InnerBanner contentId="language-content" />

      <div className={`${styles.content} ${pageUi.content}`} id="language-content">
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>
            भाषेनुसार वर्गीकरण / Language-wise Classification
          </h1>
          <p className={styles.pageIntro}>
            भाषा निवडा आणि त्या भाषेतील साहित्य पहा.
            <span className={styles.pageIntroEn}>
              Choose a language to browse available literature and audio.
            </span>
          </p>
        </header>

        <div className={`${styles.steps} ${pageUi.steps}`} aria-label="How to use this page">
          <div className={`${styles.step} ${pageUi.step}`}>
            <span className={styles.stepNum}>१</span>
            <span className={styles.stepText}>भाषा निवडा</span>
            <span className={styles.stepSub}>Choose Language</span>
          </div>
          <span className={styles.stepArrow} aria-hidden="true">→</span>
          <div className={`${styles.step} ${pageUi.step}`}>
            <span className={styles.stepNum}>२</span>
            <span className={styles.stepText}>साहित्य पहा</span>
            <span className={styles.stepSub}>Browse Content</span>
          </div>
        </div>

        <div className={styles.toolbar}>
          <label className={styles.searchWrap}>
            <FiSearch className={styles.searchIcon} aria-hidden="true" />
            <input
              type="search"
              className={styles.searchInput}
              placeholder="भाषा शोधा / Search language..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <span className={styles.countBadge}>
            <FiGlobe aria-hidden="true" />
            {filtered.length} भाषा · {filtered.length} Languages
          </span>
        </div>

        <div className={styles.filters} role="tablist" aria-label="Filter languages">
          {languageCategories.map(({ id, titleMr, titleEn }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={activeCategory === id}
              className={activeCategory === id ? styles.filterActive : styles.filterBtn}
              onClick={() => setActiveCategory(id)}
            >
              <span className={styles.filterLabel}>
                <span className={styles.filterMr}>{titleMr}</span>
                <span className={styles.filterEn}>{titleEn}</span>
              </span>
              <span className={styles.filterCount}>{categoryCounts[id] ?? 0}</span>
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className={pageUi.empty}>
            <p>कोणतीही भाषा सापडली नाही.</p>
            <p className={pageUi.emptySub}>No languages found. Try a different search or category.</p>
            <button
              type="button"
              className={pageUi.emptyReset}
              onClick={() => {
                setSearch('')
                setActiveCategory('all')
              }}
            >
              सर्व भाषा पहा / View all languages
            </button>
          </div>
        ) : (
          <div className={styles.grid} key={`${activeCategory}-${search}`}>
            {filtered.map((language, index) => (
              <LanguageCard key={language.slug} {...language} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Language
