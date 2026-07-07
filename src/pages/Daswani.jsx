import { useEffect, useState } from 'react'
import InnerBanner from '../components/InnerBanner'
import pageUi from '../styles/pageUi.module.css'
import { FiChevronLeft, FiChevronRight, FiGrid, FiX, FiZoomIn } from 'react-icons/fi'
import { useI18n } from '../i18n/useI18n'
import styles from './Daswani.module.css'

function Daswani() {
  const { t } = useI18n()
  const [activeIndex, setActiveIndex] = useState(null)
  const [daswaniImages, setDaswaniImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/collections/daswani')
      .then((res) => {
        if (!res.ok) throw new Error(`API returned ${res.status}`)
        return res.json()
      })
      .then((data) => setDaswaniImages(data.items))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const openLightbox = (index) => setActiveIndex(index)
  const closeLightbox = () => setActiveIndex(null)

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === null ? null : (current - 1 + daswaniImages.length) % daswaniImages.length,
    )
  }

  const showNext = () => {
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % daswaniImages.length,
    )
  }

  useEffect(() => {
    document.title = t('pages.daswani.documentTitle')
    return () => {
      document.title = t('site.title')
    }
  }, [t])

  useEffect(() => {
    if (activeIndex === null) {
      document.body.style.overflow = ''
      return undefined
    }

    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setActiveIndex(null)
      if (event.key === 'ArrowLeft') {
        setActiveIndex((current) =>
          current === null ? null : (current - 1 + daswaniImages.length) % daswaniImages.length,
        )
      }
      if (event.key === 'ArrowRight') {
        setActiveIndex((current) =>
          current === null ? null : (current + 1) % daswaniImages.length,
        )
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeIndex, daswaniImages.length])

  const activeImage = activeIndex !== null ? daswaniImages[activeIndex] : null

  const nearbyPages = activeIndex !== null
    ? Array.from({ length: 7 }, (_, i) => activeIndex - 3 + i).filter(
        (i) => i >= 0 && i < daswaniImages.length,
      )
    : []

  return (
    <div className={styles.page}>
      <InnerBanner contentId="daswani-content" />

      <div className={`${styles.content} ${pageUi.content}`} id="daswani-content">
        <header className={styles.pageHeader}>
          <p className={styles.eyebrow}>{t('pages.daswani.eyebrow')}</p>
          <h1 className={styles.pageTitle}>{t('pages.daswani.title')}</h1>
          <p className={styles.pageIntro}>{t('pages.daswani.intro')}</p>
        </header>

        <section className={styles.gallerySection} id="gallery" aria-labelledby="daswani-gallery-title">
          <div className={styles.galleryHeader}>
            <div className={styles.galleryTitleWrap}>
              <span className={styles.galleryIcon} aria-hidden="true">
                <FiGrid />
              </span>
              <div>
                <h2 className={styles.galleryTitle} id="daswani-gallery-title">
                  {t('pages.daswani.galleryTitle')}
                </h2>
                <p className={styles.gallerySub}>
                  {t('pages.daswani.pagesArchive')} · {t('pages.daswani.pageCount', { count: daswaniImages.length })}
                </p>
              </div>
            </div>
            <span className={styles.galleryBadge}>
              {t('pages.daswani.pageCount', { count: daswaniImages.length })}
            </span>
          </div>

          {loading ? (
            <div className={pageUi.empty}>
              <p>{t('pages.daswani.loading')}</p>
            </div>
          ) : error ? (
            <div className={pageUi.empty}>
              <p>{t('pages.daswani.loadError')}</p>
            </div>
          ) : (
            <div className={styles.grid}>
              {daswaniImages.map((image, index) => (
                <button
                  key={image.id}
                  type="button"
                  className={`${styles.card} ${pageUi.cardAnim}`}
                  style={{ animationDelay: `${Math.min(index, 10) * 35}ms` }}
                  onClick={() => openLightbox(index)}
                  aria-label={`${t('pages.daswani.openReader')} ${image.alt}`}
                >
                  <div className={styles.cardImageWrap}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className={styles.cardImage}
                      loading="lazy"
                    />
                    <span className={styles.cardOverlay} aria-hidden="true">
                      <FiZoomIn />
                      <span>{t('pages.daswani.view')}</span>
                    </span>
                  </div>
                  <span className={styles.cardLabel}>
                    {t('pages.daswani.pageLabel', { num: image.num })}
                  </span>
                </button>
              ))}
            </div>
          )}
        </section>
      </div>

      {activeImage && (
        <div
          className={styles.viewer}
          role="dialog"
          aria-modal="true"
          aria-label={t('pages.daswani.readerAria')}
        >
          <button
            type="button"
            className={styles.viewerClose}
            onClick={closeLightbox}
            aria-label={t('pages.daswani.closeReader')}
          >
            <FiX />
          </button>

          <button
            type="button"
            className={styles.viewerNavLeft}
            onClick={showPrevious}
            aria-label={t('pages.daswani.previousPage')}
          >
            <FiChevronLeft />
          </button>

          <button
            type="button"
            className={styles.viewerNavRight}
            onClick={showNext}
            aria-label={t('pages.daswani.nextPage')}
          >
            <FiChevronRight />
          </button>

          <div className={styles.viewerStage}>
            <img
              key={activeImage.src}
              src={activeImage.src}
              alt={activeImage.alt}
              className={styles.viewerImage}
            />
          </div>

          <div className={styles.viewerBar}>
            <p className={styles.viewerTitle}>
              {t('pages.daswani.title')} {activeImage.num}
              <span>
                {' '}
                · {t('pages.daswani.pageOf', {
                  current: activeIndex + 1,
                  total: daswaniImages.length,
                })}
              </span>
            </p>

            <div className={styles.viewerPager}>
              {nearbyPages.map((pageIndex) => (
                <button
                  key={pageIndex}
                  type="button"
                  className={
                    pageIndex === activeIndex
                      ? styles.pagerBtnActive
                      : styles.pagerBtn
                  }
                  onClick={() => setActiveIndex(pageIndex)}
                >
                  {daswaniImages[pageIndex].num}
                </button>
              ))}
            </div>

            <a
              href={activeImage.src}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.viewerOpen}
            >
              {t('pages.daswani.fullSize')}
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default Daswani
