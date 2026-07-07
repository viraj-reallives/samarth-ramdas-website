import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import InnerBanner from '../components/InnerBanner'
import SearchBar from '../components/SearchBar'
import FilterChips from '../components/FilterChips'
import ContentCard from '../components/ContentCard'
import BrowsePathCard from '../components/BrowsePathCard'
import AudioPlayerModal from '../components/AudioPlayerModal'
import { AudioDownloadCard, LiteratureDownloadCard } from '../components/DownloadContentCards'
import pageUi from '../styles/pageUi.module.css'
import { browseByLinks, popularLibraryLinks } from '../data/headerNav'
import { CATEGORY_CARD_IMAGE_BY_PATH } from '../data/categoryCardImages'
import {
  TYPE_LABELS,
  getCollectionHref,
  getCollectionLabel,
} from '../utils/collectionNav'
import { searchBrowseContent } from '../utils/browseApi'
import { useI18n } from '../i18n/useI18n'
import styles from './Browse.module.css'
import downloadStyles from './SubjectAuthor.module.css'

const FACET_DEFS = [
  { id: 'subject', labelMr: 'विषय', labelEn: 'Subject', disabled: true, comingSoon: true },
  { id: 'author', labelMr: 'लेखक', labelEn: 'Author', disabled: true, comingSoon: true },
  { id: 'language', labelMr: 'भाषा', labelEn: 'Language', disabled: true, comingSoon: true },
  { id: 'type', labelMr: 'प्रकार', labelEn: 'Type', disabled: false },
]

const CONTENT_TYPE_OPTIONS = [
  { value: 'audio', labelMr: 'ऑडिओ', labelEn: 'Audio' },
  { value: 'pdf', labelMr: 'वाङ्मय', labelEn: 'Literature' },
]

const TYPE_OPTIONS = Object.entries(TYPE_LABELS).map(([value, labels]) => ({
  value,
  labelMr: labels.mr,
  labelEn: labels.en,
}))

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
  const { t, pickField } = useI18n()
  const [searchParams, setSearchParams] = useSearchParams()
  const [collections, setCollections] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [typeMenuOpen, setTypeMenuOpen] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [searchTotal, setSearchTotal] = useState(0)
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchError, setSearchError] = useState(null)
  const [playingTrack, setPlayingTrack] = useState(null)

  const query = searchParams.get('q') ?? ''
  const activeType = searchParams.get('type') ?? ''
  const isContentSearch = Boolean(query.trim())

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
    document.title = t('pages.browse.documentTitle')
    return () => {
      document.title = t('site.title')
    }
  }, [t])

  useEffect(() => {
    if (!isContentSearch) {
      setSearchResults([])
      setSearchTotal(0)
      setSearchLoading(false)
      setSearchError(null)
      return undefined
    }

    let active = true
    setSearchLoading(true)
    setSearchError(null)

    const browseType = activeType === 'audio' || activeType === 'pdf' ? activeType : undefined

    searchBrowseContent({ q: query, type: browseType, limit: 100 })
      .then(({ items, total }) => {
        if (!active) return
        setSearchResults(items)
        setSearchTotal(total)
      })
      .catch((err) => {
        if (!active) return
        setSearchError(err.message)
        setSearchResults([])
        setSearchTotal(0)
      })
      .finally(() => {
        if (active) setSearchLoading(false)
      })

    return () => {
      active = false
    }
  }, [query, activeType, isContentSearch])

  const activeFilters = useMemo(() => {
    const filters = []
    if (activeType) {
      const typeLabel =
        CONTENT_TYPE_OPTIONS.find((opt) => opt.value === activeType) ??
        (TYPE_LABELS[activeType]
          ? { labelMr: TYPE_LABELS[activeType].mr, labelEn: TYPE_LABELS[activeType].en }
          : null)
      if (typeLabel) {
        filters.push({
          id: `type:${activeType}`,
          facetId: 'type',
          labelMr: typeLabel.labelMr,
          labelEn: typeLabel.labelEn,
        })
      }
    }
    if (query.trim()) {
      filters.push({
        id: `q:${query}`,
        facetId: 'search',
        labelMr: `"${query.trim()}"`,
        labelEn: `"${query.trim()}"`,
      })
    }
    return filters
  }, [activeType, query])

  const availableTypes = useMemo(() => {
    if (isContentSearch) return CONTENT_TYPE_OPTIONS.map((opt) => opt.value)
    return [...new Set(collections.map((c) => c.type).filter(Boolean))]
  }, [collections, isContentSearch])

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

  const resultCount = isContentSearch ? searchTotal : filtered.length
  const resultsLoading = isContentSearch ? searchLoading : loading
  const resultsError = isContentSearch ? searchError : error

  const typeMenuOptions = isContentSearch
    ? CONTENT_TYPE_OPTIONS
    : TYPE_OPTIONS.filter((opt) => availableTypes.includes(opt.value))

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
      <InnerBanner
        contentId="browse-content"
        image="/assets/inner-banner.jpeg"
      />

      <div className={`${styles.content} ${pageUi.content}`} id="browse-content">
        <section className={styles.searchHero}>
          <header className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>{t('pages.browse.title')}</h1>
            <p className={styles.pageIntro}>{t('pages.browse.intro')}</p>
          </header>

          <div className={styles.searchRow}>
            <SearchBar
              key={query}
              defaultValue={query}
              large
              className={styles.searchBar}
              onSearch={handleSearchNavigate}
            />
          </div>
        </section>

        {!showFilteredResults && (
          <section className={styles.discoveryPanel} aria-label="Browse paths">
            <h2 className={styles.sectionTitle}>{t('pages.browse.startHeading')}</h2>
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
                  image={CATEGORY_CARD_IMAGE_BY_PATH[link.href]}
                />
              ))}
            </div>

            <div className={styles.shortcutBlock}>
              <p className={styles.shortcutLabel}>{t('pages.browse.popular')}</p>
              <div className={styles.shortcutRow}>
                {popularLibraryLinks.map((link) => (
                  <Link key={link.href} to={link.href} className={styles.shortcut}>
                    {pickField(link, 'label')}
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
              {showFilteredResults ? t('pages.browse.results') : t('pages.browse.collections')}
            </h2>
            {!resultsLoading && !resultsError && (
              <span className={styles.countBadge}>
                {t('pages.browse.countResults', { count: resultCount })}
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
            <div className={styles.typeMenu} role="group" aria-label={t('common.filterByType')}>
              <button
                type="button"
                className={`${styles.typeOption} ${!activeType ? styles.typeOptionActive : ''}`}
                onClick={() => handleTypeSelect('')}
              >
                {t('common.all')}
              </button>
              {typeMenuOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={`${styles.typeOption} ${
                    activeType === opt.value ? styles.typeOptionActive : ''
                  }`}
                  onClick={() => handleTypeSelect(opt.value)}
                >
                  {pickField(opt, 'label')}
                </button>
              ))}
            </div>
          )}

          {resultsLoading ? (
            <div className={pageUi.empty}>
              <p>
                {isContentSearch
                  ? t('pages.browse.loadingContent')
                  : t('common.loadingCollections')}
              </p>
            </div>
          ) : resultsError ? (
            <div className={pageUi.empty}>
              <p>
                {isContentSearch
                  ? t('pages.browse.loadingContentError')
                  : t('common.loadCollectionsError')}
              </p>
            </div>
          ) : isContentSearch ? (
            searchResults.length === 0 ? (
              <div className={pageUi.empty}>
                <p>{t('common.noResults')}</p>
                <p className={pageUi.emptySub}>{t('pages.browse.adjustFilters')}</p>
              </div>
            ) : (
              <>
                {searchTotal > searchResults.length && (
                  <p className={styles.resultNote}>
                    {t('common.showingResults', {
                      shown: searchResults.length,
                      total: searchTotal,
                    })}
                  </p>
                )}
                <div className={`${downloadStyles.downloadGrid} ${downloadStyles.downloadGridCompact}`}>
                  {searchResults.map((item) =>
                    item.fileType === 'audio' ? (
                      <AudioDownloadCard
                        key={item.slug}
                        item={item}
                        onListen={setPlayingTrack}
                      />
                    ) : (
                      <LiteratureDownloadCard key={item.slug} item={item} />
                    ),
                  )}
                </div>
              </>
            )
          ) : filtered.length === 0 ? (
            <div className={pageUi.empty}>
              <p>{t('common.noResults')}</p>
              <p className={pageUi.emptySub}>{t('pages.browse.adjustFilters')}</p>
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

      {playingTrack && (
        <AudioPlayerModal
          track={playingTrack}
          subtitle={query.trim()}
          onClose={() => setPlayingTrack(null)}
        />
      )}
    </div>
  )
}

export default Browse
