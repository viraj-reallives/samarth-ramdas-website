import { useEffect, useState } from 'react'
import InnerBanner from '../components/InnerBanner'
import pageUi from '../styles/pageUi.module.css'
import { FiChevronLeft, FiChevronRight, FiGrid, FiX, FiZoomIn } from 'react-icons/fi'
import styles from './Daswani.module.css'

function Daswani() {
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
    document.title = 'दासवाणी – श्री समर्थ रामदास'
    return () => {
      document.title = 'श्री समर्थ रामदास - श्री रामदासांचे साहित्य'
    }
  }, [])

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
          <p className={styles.eyebrow}>॥ श्री समर्थ दासवाणी ॥</p>
          <h1 className={styles.pageTitle}>दासवाणी / Daswani</h1>
          <p className={styles.pageIntro}>
            समर्थ रामदासांच्या दैनंदिन दासवाणीचे ५० पाने — प्रत्येक पृष्ठ उघडण्यासाठी क्लिक करा.
            <span className={styles.pageIntroEn}>
              Browse all 50 pages of daily Daswani — click any image to open the reader.
            </span>
          </p>
        </header>

        <section className={styles.gallerySection} id="gallery" aria-labelledby="daswani-gallery-title">
          <div className={styles.galleryHeader}>
            <div className={styles.galleryTitleWrap}>
              <span className={styles.galleryIcon} aria-hidden="true">
                <FiGrid />
              </span>
              <div>
                <h2 className={styles.galleryTitle} id="daswani-gallery-title">
                  गॅलरी / Gallery
                </h2>
                <p className={styles.gallerySub}>
                  दासवाणी पृष्ठ संग्रह · {daswaniImages.length} pages
                </p>
              </div>
            </div>
            <span className={styles.galleryBadge}>{daswaniImages.length} पाने</span>
          </div>

          {loading ? (
            <div className={pageUi.empty}>
              <p>दासवाणी पाने लोड होत आहेत...</p>
              <p className={pageUi.emptySub}>Loading Daswani pages...</p>
            </div>
          ) : error ? (
            <div className={pageUi.empty}>
              <p>दासवाणी पाने लोड करता आली नाहीत.</p>
              <p className={pageUi.emptySub}>Could not load Daswani pages. Please try again later.</p>
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
                  aria-label={`Open ${image.alt}`}
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
                      <span>पहा</span>
                    </span>
                  </div>
                  <span className={styles.cardLabel}>
                    पृष्ठ {image.num}
                    <span>Page {index + 1}</span>
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
          aria-label="Daswani gallery reader"
        >
          <button
            type="button"
            className={styles.viewerClose}
            onClick={closeLightbox}
            aria-label="Close"
          >
            <FiX />
          </button>

          <button
            type="button"
            className={styles.viewerNavLeft}
            onClick={showPrevious}
            aria-label="Previous page"
          >
            <FiChevronLeft />
          </button>

          <button
            type="button"
            className={styles.viewerNavRight}
            onClick={showNext}
            aria-label="Next page"
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
              दासवाणी {activeImage.num}
              <span> · Page {activeIndex + 1} of {daswaniImages.length}</span>
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
              Full size
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default Daswani