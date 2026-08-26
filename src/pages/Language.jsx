import { useEffect, useMemo, useState } from 'react'
import InnerBanner from '../components/InnerBanner'
import { CATEGORY_BANNER_IMAGES, CATEGORY_BANNER_THEMES } from '../data/categoryCardImages'
import pageUi from '../styles/pageUi.module.css'
import { Link } from 'react-router-dom'
import { FiGlobe, FiSearch } from 'react-icons/fi'
import { languageCategories, languages } from '../data/languages'
import { useI18n } from '../i18n/useI18n'
import styles from './Language.module.css'

function LanguageCard({ titleMr, titleEn, href, badge, hintMr, hintEn, featured, index }) {
  const { t, pickField } = useI18n()
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
          <span className={styles.titleMr}>{pickField({ titleMr, titleEn }, 'title')}</span>
        </div>
        <p className={styles.hint}>
          {pickField({ hintMr, hintEn }, 'hint')}
        </p>
        <span className={styles.cta}>
          {t('common.explore')}
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  )
}

function Language() {
  const { t, pickField } = useI18n()
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    document.title = t('pages.language.documentTitle')
    return () => {
      document.title = t('site.title')
    }
  }, [t])

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
      <InnerBanner
        contentId="language-content"
        image={CATEGORY_BANNER_IMAGES.language}
        imageAlt={t('pages.language.bannerAlt')}
        scrollLabel={t('pages.language.scrollLabel')}
        visualTheme={CATEGORY_BANNER_THEMES.language}
      />

      <div className={`${styles.content} ${pageUi.content}`} id="language-content">
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>{t('pages.language.title')}</h1>
          <p className={styles.pageIntro}>{t('pages.language.intro')}</p>
        </header>

        <div className={`${styles.steps} ${pageUi.steps}`} aria-label="How to use this page">
          <div className={`${styles.step} ${pageUi.step}`}>
            <span className={styles.stepNum}>{t('pages.language.step1Num')}</span>
            <span className={styles.stepText}>{t('pages.language.step1')}</span>
          </div>
          <span className={styles.stepArrow} aria-hidden="true">→</span>
          <div className={`${styles.step} ${pageUi.step}`}>
            <span className={styles.stepNum}>{t('pages.language.step2Num')}</span>
            <span className={styles.stepText}>{t('pages.language.step2')}</span>
          </div>
        </div>

        <div className={styles.toolbar}>
          <label className={styles.searchWrap}>
            <FiSearch className={styles.searchIcon} aria-hidden="true" />
            <input
              type="search"
              className={styles.searchInput}
              placeholder={t('pages.language.searchPlaceholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <span className={styles.countBadge}>
            <FiGlobe aria-hidden="true" />
            {t('pages.language.countLanguages', { count: filtered.length })}
          </span>
        </div>

        <div className={styles.filters} role="tablist" aria-label="Filter languages">
          {languageCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={activeCategory === category.id}
              className={activeCategory === category.id ? styles.filterActive : styles.filterBtn}
              onClick={() => setActiveCategory(category.id)}
            >
              <span className={styles.filterLabel}>
                <span className={styles.filterMr}>{pickField(category, 'title')}</span>
              </span>
              <span className={styles.filterCount}>{categoryCounts[category.id] ?? 0}</span>
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className={pageUi.empty}>
            <p>{t('pages.language.empty')}</p>
            <p className={pageUi.emptySub}>{t('pages.language.emptySub')}</p>
            <button
              type="button"
              className={pageUi.emptyReset}
              onClick={() => {
                setSearch('')
                setActiveCategory('all')
              }}
            >
              {t('pages.language.viewAllLanguages')}
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
