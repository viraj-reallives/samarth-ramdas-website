import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import InnerBanner from '../components/InnerBanner'
import SearchBar from '../components/SearchBar'
import FilterChips from '../components/FilterChips'
import ContentCard from '../components/ContentCard'
import BrowsePathCard from '../components/BrowsePathCard'
import pageUi from '../styles/pageUi.module.css'
import { browseByLinks, popularLibraryLinks } from '../data/headerNav'
import {
  TYPE_LABELS,
  getCollectionHref,
  getCollectionLabel,
} from '../utils/collectionNav'
import { FiBookOpen, FiGlobe, FiUsers } from 'react-icons/fi'
import styles from './Browse.module.css'

const FACET_DEFS = [
  { id: 'subject', labelMr: 'विषय', labelEn: 'Subject', disabled: true, comingSoon: true },
  { id: 'author', labelMr: 'लेखक', labelEn: 'Author', disabled: true, comingSoon: true },
  { id: 'language', labelMr: 'भाषा', labelEn: 'Language', disabled: true, comingSoon: true },
  { id: 'type', labelMr: 'प्रकार', labelEn: 'Type', disabled: false },
]

const TYPE_OPTIONS = Object.entries(TYPE_LABELS).map(([value, labels]) => ({
  value,
  labelMr: labels.mr,
  labelEn: labels.en,
}))

const PATH_ICONS = {
  '/subject': <FiBookOpen />,
  '/author': <FiUsers />,
  '/language': <FiGlobe />,
}

function collectionTags(collection) {
  const typeLabel = TYPE_LABELS[collection.type]
  const tags = []

  if (typeLabel) {
    tags.push({ id: `type-${collection.type}`, labelMr: typeLabel.mr, labelEn: typeLabel.en })
  }

  // TODO(facets): add author, subject, and language tags when schema supports them
  return tags
}

function Browse() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [collections, setCollections] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [typeMenuOpen, setTypeMenuOpen] = useState(false)

  const query = searchParams.get('q') ?? ''
  const activeType = searchParams.get('type') ?? ''

  useEffect(() => {
    fetch('/api/collections')
      .then((res) => {
        if (!res.ok) throw new Error(`API returned ${res.status}`)
        return res.json()
      })
      .then((data) => setCollections(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    document.title = 'साहित्य शोधा / Browse – श्री समर्थ रामदास'
    return () => {
      document.title = 'श्री समर्थ रामदास - श्री रामदासांचे साहित्य'
    }
  }, [])

  const activeFilters = useMemo(() => {
    const filters = []
    if (activeType) {
      const typeLabel = TYPE_LABELS[activeType]
      if (typeLabel) {
        filters.push({
          id: `type:${activeType}`,
          facetId: 'type',
          labelMr: typeLabel.mr,
          labelEn: typeLabel.en,
        })
      }
    }
    if (query.trim()) {
      filters.push({
        id: `q:${query}`,
        facetId: 'search',
        labelMr: `"${query.trim()}"`,
        labelEn: 'Search',
      })
    }
    return filters
  }, [activeType, query])

  const availableTypes = useMemo(
    () => [...new Set(collections.map((c) => c.type).filter(Boolean))],
    [collections],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return collections.filter((collection) => {
      if (activeType && collection.type !== activeType) return false
      if (!q) return true
      const { titleMr, titleEn } = getCollectionLabel(collection)
      const haystack = [titleMr, titleEn, collection.title, collection.description, collection.slug]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [collections, query, activeType])

  const facets = FACET_DEFS.map((facet) => ({
    ...facet,
    active: facet.id === 'type' && (typeMenuOpen || Boolean(activeType)),
  }))

  const handleFacetClick = (facetId) => {
    if (facetId === 'type') {
      setTypeMenuOpen((open) => !open)
    }
    // TODO(facets): wire subject, author, language facet clicks
  }

  const handleRemoveFilter = (filterId) => {
    const next = new URLSearchParams(searchParams)
    if (filterId.startsWith('type:')) {
      next.delete('type')
      setTypeMenuOpen(false)
    }
    if (filterId.startsWith('q:')) {
      next.delete('q')
    }
    setSearchParams(next, { replace: true })
  }

  const handleTypeSelect = (typeValue) => {
    const next = new URLSearchParams(searchParams)
    if (typeValue) {
      next.set('type', typeValue)
    } else {
      next.delete('type')
    }
    setSearchParams(next, { replace: true })
    setTypeMenuOpen(false)
  }

  const handleSearchNavigate = (nextQuery) => {
    const next = new URLSearchParams(searchParams)
    const trimmed = nextQuery.trim()
    if (trimmed) {
      next.set('q', trimmed)
    } else {
      next.delete('q')
    }
    setSearchParams(next, { replace: true })
  }

  const showFilteredResults = Boolean(query.trim() || activeType)

  return (
    <div className={styles.page}>
      <InnerBanner contentId="browse-content" />

      <div className={`${styles.content} ${pageUi.content}`} id="browse-content">
        <section className={styles.searchHero}>
          <header className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>साहित्य शोधा / Browse</h1>
            <p className={styles.pageIntro}>
              एकाच ठिकाणी शोधा — जे माहित आहे ते निवडा, नंतर फिल्टर करा.
              <span className={styles.pageIntroEn}>
                Search in one place — start with what you know, then narrow down.
              </span>
            </p>
          </header>

          <div className={styles.searchRow}>
            <SearchBar
              key={query}
              defaultValue={query}
              large
              className={styles.searchBar}
              placeholderMr="साहित्य शोधा…"
              placeholderEn="Search collections…"
              onSearch={handleSearchNavigate}
            />
          </div>
        </section>

        {!showFilteredResults && (
          <section className={styles.discoveryPanel} aria-label="Browse paths">
            <h2 className={styles.sectionTitle}>
              जे माहित आहे ते निवडा
              <span className={styles.sectionTitleEn}>Start with what you know</span>
            </h2>
            <div className={styles.pathGrid}>
              {browseByLinks.map((link) => (
                <BrowsePathCard
                  key={link.href}
                  layout="stacked"
                  to={link.href}
                  titleMr={link.labelMr}
                  titleEn={link.labelEn}
                  descriptionMr={link.hintMr}
                  descriptionEn={link.hintEn}
                  icon={PATH_ICONS[link.href]}
                />
              ))}
            </div>

            <div className={styles.shortcutBlock}>
              <p className={styles.shortcutLabel}>लोकप्रिय / Popular</p>
              <div className={styles.shortcutRow}>
                {popularLibraryLinks.map((link) => (
                  <Link key={link.href} to={link.href} className={styles.shortcut}>
                    <span className={styles.shortcutMr}>{link.labelMr}</span>
                    <span className={styles.shortcutSep} aria-hidden="true">
                      ·
                    </span>
                    <span className={styles.shortcutEn}>{link.labelEn}</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section
          id="browse-results"
          className={styles.collectionsPanel}
          aria-label="Collections"
        >
          <div className={styles.collectionsHeader}>
            <h2 className={styles.sectionTitle}>
              {showFilteredResults ? 'निकाल' : 'संग्रह'}
              <span className={styles.sectionTitleEn}>
                {showFilteredResults ? 'Results' : 'Collections'}
              </span>
            </h2>
            {!loading && !error && (
              <span className={styles.countBadge}>
                {filtered.length} निकाल
                <span className={styles.countBadgeEn}>{filtered.length} results</span>
              </span>
            )}
          </div>

          {showFilteredResults && (
            <div className={styles.filterWrap}>
              <FilterChips
                facets={facets}
                activeFilters={activeFilters}
                onFacetClick={handleFacetClick}
                onRemoveFilter={handleRemoveFilter}
              />
            </div>
          )}

          {typeMenuOpen && (
            <div className={styles.typeMenu} role="group" aria-label="Filter by type">
              <button
                type="button"
                className={`${styles.typeOption} ${!activeType ? styles.typeOptionActive : ''}`}
                onClick={() => handleTypeSelect('')}
              >
                सर्व / All
              </button>
              {TYPE_OPTIONS.filter((opt) => availableTypes.includes(opt.value)).map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={`${styles.typeOption} ${
                    activeType === opt.value ? styles.typeOptionActive : ''
                  }`}
                  onClick={() => handleTypeSelect(opt.value)}
                >
                  {opt.labelMr} / {opt.labelEn}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div className={pageUi.empty}>
              <p>संग्रह लोड होत आहेत...</p>
              <p className={pageUi.emptySub}>Loading collections...</p>
            </div>
          ) : error ? (
            <div className={pageUi.empty}>
              <p>संग्रह लोड करता आले नाहीत.</p>
              <p className={pageUi.emptySub}>Could not load collections. Please try again later.</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className={pageUi.empty}>
              <p>कोणतेही निकाल सापडले नाहीत.</p>
              <p className={pageUi.emptySub}>No results found. Try adjusting your filters.</p>
            </div>
          ) : (
            <div className={styles.grid}>
              {filtered.map((collection, index) => {
                const { titleMr, titleEn } = getCollectionLabel(collection)
                return (
                  <ContentCard
                    key={collection.slug}
                    compact
                    titleMr={titleMr}
                    titleEn={titleEn}
                    type={collection.type}
                    href={getCollectionHref(collection.slug)}
                    count={collection.count}
                    tags={collectionTags(collection)}
                    index={index}
                  />
                )
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default Browse
