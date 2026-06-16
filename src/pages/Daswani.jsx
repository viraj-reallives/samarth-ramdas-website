import { useEffect, useState } from 'react'
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi'
import styles from './Daswani.module.css'

const daswaniImages = Array.from({ length: 50 }, (_, index) => {
  const num = String(index + 1).padStart(2, '0')
  return {
    id: index + 1,
    num,
    src: `/assets/daswani/${num}.png`,
    alt: `दासवाणी पृष्ठ ${index + 1}`,
  }
})

function Daswani() {
  const [activeIndex, setActiveIndex] = useState(null)

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
  }, [activeIndex])

  const activeImage = activeIndex !== null ? daswaniImages[activeIndex] : null

  const nearbyPages = activeIndex !== null
    ? Array.from({ length: 7 }, (_, i) => activeIndex - 3 + i).filter(
        (i) => i >= 0 && i < daswaniImages.length,
      )
    : []

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
        <h1 className={styles.pageTitle}>दासवाणी / Daswani</h1>
        <p className={styles.pageIntro}>
          समर्थ रामदासांच्या दैनंदिन दासवाणीचे ५० पाने — कोणतेही पृष्ठ उघडण्यासाठी क्लिक करा.
        </p>

        <div className={styles.grid}>
          {daswaniImages.map((image, index) => (
            <button
              key={image.id}
              type="button"
              className={styles.card}
              onClick={() => openLightbox(index)}
              aria-label={`Open ${image.alt}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={styles.cardImage}
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {activeImage && (
        <div
          className={styles.viewer}
          role="dialog"
          aria-modal="true"
          aria-label="Daswani reader"
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
