import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import { FiChevronDown } from 'react-icons/fi'
import { lifeJourneySlides } from '../data/lifeJourneySlides'
import 'swiper/css'
import 'swiper/css/effect-fade'
import styles from './LifeJourneySlider.module.css'

const AUTOPLAY_MS = 6000
const TOTAL = lifeJourneySlides.length

const SAMARTH_INTRO_MR =
  'श्री समर्थ रामदास स्वामी — भक्ती, ज्ञान, शक्ती आणि कर्तव्य यांच्या मार्गाने समाज जागृतीचे अपूर्व कार्य.'

function LifeJourneySlider({ contentId = 'life-journey-content' }) {
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
      aria-label="जीवन प्रवास चित्रमाला"
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
                    alt={slide.titleMr}
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
            aria-label="मागील चित्र"
          />
          <button
            type="button"
            className={styles.navZoneRight}
            onClick={goNext}
            aria-label="पुढील चित्र"
          />

          <div className={styles.imageOverlay}>
            <div key={activeIndex} className={styles.captionBar}>
              <div className={styles.captionMain}>
                <span className={styles.slideBadge}>
                  {String(activeIndex + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
                </span>
                <div>
                  <p className={styles.slideCaptionTitle}>{activeSlide.titleMr}</p>
                  <p className={styles.slideCaptionEn}>{activeSlide.titleEn}</p>
                </div>
              </div>
              <p className={styles.samarthIntroText}>{SAMARTH_INTRO_MR}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.footerLead}>
            <p className={styles.samarthKicker}>॥ जय जय रघुवीर समर्थ ॥</p>
            <p className={styles.mobileActiveTitle}>{activeSlide.titleMr}</p>
          </div>

          <div className={styles.dots} role="tablist" aria-label="Slide navigation">
            {lifeJourneySlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={slide.titleMr}
                className={index === activeIndex ? styles.dotActive : styles.dot}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>

          <button
            type="button"
            className={styles.scrollCue}
            onClick={scrollToContent}
            aria-label="खाली स्क्रोल करा / Scroll down"
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
              <span className={styles.thumbLabel}>{slide.titleMr}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LifeJourneySlider
