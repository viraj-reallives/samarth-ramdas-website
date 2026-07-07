import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import { FiChevronDown } from 'react-icons/fi'
import { lifeJourneySlides } from '../data/lifeJourneySlides'
import { useI18n } from '../i18n/useI18n'
import 'swiper/css'
import 'swiper/css/effect-fade'
import styles from './LifeJourneySlider.module.css'

const AUTOPLAY_MS = 6000
const TOTAL = lifeJourneySlides.length

function LifeJourneySlider({ contentId = 'life-journey-content' }) {
  const { t, pickField } = useI18n()
  const sectionRef = useRef(null)
  const thumbRailRef = useRef(null)
  const swiperRef = useRef(null)
  const thumbRefs = useRef([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches,
  )

  const activeSlide = lifeJourneySlides[activeIndex]

  const scrollToContent = () => {
    document.getElementById(contentId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const goToSlide = (index) => {
    swiperRef.current?.slideToLoop(index)
    swiperRef.current?.autoplay?.start()
  }

  const goNext = () => {
    swiperRef.current?.slideNext()
    swiperRef.current?.autoplay?.start()
  }

  const goPrev = () => {
    swiperRef.current?.slidePrev()
    swiperRef.current?.autoplay?.start()
  }

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)')
    const onChange = (event) => setIsMobile(event.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const swiper = swiperRef.current
    if (!swiper?.autoplay) return undefined

    swiper.autoplay.start()

    const section = sectionRef.current
    if (!section) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          swiper.autoplay.start()
          setIsPaused(false)
        } else {
          swiper.autoplay.stop()
          setIsPaused(true)
        }
      },
      { threshold: 0.35 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const thumb = thumbRefs.current[activeIndex]
    const rail = thumbRailRef.current
    if (!thumb || !rail) return

    const targetLeft = thumb.offsetLeft - (rail.clientWidth - thumb.clientWidth) / 2
    rail.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' })
  }, [activeIndex])

  return (
    <section
      ref={sectionRef}
      className={styles.hero}
      aria-label={t('pages.lifeJourney.galleryAria')}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false)
        swiperRef.current?.autoplay?.start()
      }}
    >
      <div className={styles.progressRail} aria-hidden="true">
        <span
          key={`${activeIndex}-${isPaused}`}
          className={`${styles.progressFill} ${isPaused ? styles.progressPaused : ''}`}
          style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
        />
      </div>

      <div className={styles.stage}>
        <div className={styles.imageCanvas}>
          <Swiper
            className={styles.imageSwiper}
            modules={[Autoplay, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            loop
            speed={700}
            allowTouchMove={isMobile}
            autoplay={{
              delay: AUTOPLAY_MS,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
              waitForTransition: false,
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper
              window.requestAnimationFrame(() => swiper.autoplay?.start())
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          >
            {lifeJourneySlides.map((slide, index) => (
              <SwiperSlide key={slide.id}>
                <div className={styles.slideFrame}>
                  <img
                    src={slide.src}
                    alt={pickField(slide, 'title')}
                    className={styles.slideImage}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            type="button"
            className={styles.navZoneLeft}
            onClick={goPrev}
            aria-label={t('pages.lifeJourney.prevImage')}
          />
          <button
            type="button"
            className={styles.navZoneRight}
            onClick={goNext}
            aria-label={t('pages.lifeJourney.nextImage')}
          />

          <div className={styles.imageOverlay}>
            <div key={activeIndex} className={styles.captionBar}>
              <div className={styles.captionMain}>
                <span className={styles.slideBadge}>
                  {String(activeIndex + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
                </span>
                <div>
                  <p className={styles.slideCaptionTitle}>{pickField(activeSlide, 'title')}</p>
                </div>
              </div>
              <p className={styles.samarthIntroText}>{t('pages.lifeJourney.intro')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.footerLead}>
            <p className={styles.samarthKicker}>{t('site.mantra')}</p>
            <p className={styles.mobileActiveTitle}>{pickField(activeSlide, 'title')}</p>
          </div>

          <div className={styles.dots} role="tablist" aria-label="Slide navigation">
            {lifeJourneySlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={pickField(slide, 'title')}
                className={index === activeIndex ? styles.dotActive : styles.dot}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>

          <button
            type="button"
            className={styles.scrollCue}
            onClick={scrollToContent}
            aria-label={t('common.scrollDown')}
          >
            <FiChevronDown aria-hidden="true" />
          </button>
        </div>

        <div ref={thumbRailRef} className={styles.thumbRail}>
          {lifeJourneySlides.map((slide, index) => (
            <button
              key={slide.id}
              ref={(node) => {
                thumbRefs.current[index] = node
              }}
              type="button"
              className={index === activeIndex ? styles.thumbCardActive : styles.thumbCard}
              onClick={() => goToSlide(index)}
              aria-label={slide.titleMr}
              aria-current={index === activeIndex ? 'true' : undefined}
            >
              <span className={styles.thumbImageWrap}>
                <img src={slide.src} alt="" loading="lazy" />
                {index === activeIndex && <span className={styles.thumbActiveRing} aria-hidden="true" />}
              </span>
              <span className={styles.thumbLabel}>{pickField(slide, 'title')}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LifeJourneySlider
