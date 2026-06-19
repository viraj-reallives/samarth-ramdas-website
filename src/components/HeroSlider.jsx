import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import styles from './HeroSlider.module.css'

const slides = [
  {
    id: 1,
    image: '/assets/slides/slide1.jpg',
    kicker: '॥ श्री समर्थ रामदास ॥',
    title: 'श्री समर्थ रामदास स्वामी',
    subtitle: 'आध्यात्मिक वारसा आणि प्रेरणादायी विचार',
    button: 'अधिक जाणून घ्या',
    href: '/life-journey',
  },
  {
    id: 2,
    image: '/assets/slides/slide2.jpg',
    kicker: 'पवित्र तीर्थक्षेत्र',
    title: 'शिवथरघळ',
    subtitle: 'दासबोधाची पवित्र भूमी — समर्थांच्या वाणीचा उगम',
    button: 'दासबोध वाचा',
    href: '/subject/dasbodh',
  },
  {
    id: 3,
    image: '/assets/slides/slide3.jpg',
    kicker: 'जीवन आणि कार्य',
    title: 'जीवन प्रवास',
    subtitle: 'समर्थांच्या कार्याचा प्रेरणादायी इतिहास',
    button: 'प्रवास पहा',
    href: '/life-journey',
  },
]

const AUTOPLAY_MS = 5500

function HeroSlider() {
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const paginationRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  return (
    <section
      className={styles.heroSlider}
      aria-label="Hero slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Swiper
        className={styles.swiper}
        modules={[EffectFade, Autoplay, Navigation, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1000}
        loop
        autoplay={{
          delay: AUTOPLAY_MS,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        pagination={{
          el: paginationRef.current,
          clickable: true,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current
          swiper.params.navigation.nextEl = nextRef.current
          swiper.params.pagination.el = paginationRef.current
        }}
        onInit={(swiper) => {
          swiper.navigation.init()
          swiper.navigation.update()
          swiper.pagination.init()
          swiper.pagination.render()
          swiper.pagination.update()
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {slides.map(({ id, image, kicker, title, subtitle, button, href }) => (
          <SwiperSlide key={id}>
            <div className={styles.slide}>
              <div className={styles.imageWrap}>
                <img
                  src={image}
                  alt=""
                  className={styles.slideImage}
                  loading={id === 1 ? 'eager' : 'lazy'}
                />
              </div>
              <div className={styles.overlayTop} aria-hidden="true" />
              <div className={styles.overlayMain} aria-hidden="true" />
              <div className={styles.overlayBottom} aria-hidden="true" />
              <div className={styles.content}>
                <div className={styles.contentInner}>
                  <p className={styles.kicker}>{kicker}</p>
                  <h2 className={styles.title}>{title}</h2>
                  <p className={styles.subtitle}>{subtitle}</p>
                  <Link to={href} className={styles.cta}>
                    <span>{button}</span>
                    <span className={styles.ctaIcon} aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path
                          d="M5 12h14M13 6l6 6-6 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.controls}>
        <div className={styles.slideMeta}>
          <span className={styles.slideCount}>
            <span className={styles.slideCurrent}>
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span className={styles.slideDivider}>/</span>
            <span className={styles.slideTotal}>{String(slides.length).padStart(2, '0')}</span>
          </span>
          <div className={styles.progressTrack} aria-hidden="true">
            <span
              key={`${activeIndex}-${isPaused}`}
              className={`${styles.progressBar} ${isPaused ? styles.progressPaused : ''}`}
              style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
            />
          </div>
        </div>

        <div className={styles.navGroup}>
          <button
            ref={prevRef}
            type="button"
            className={`${styles.navButton} ${styles.navPrev}`}
            aria-label="Previous slide"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            ref={nextRef}
            type="button"
            className={`${styles.navButton} ${styles.navNext}`}
            aria-label="Next slide"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div ref={paginationRef} className={styles.pagination} />
    </section>
  )
}

export default HeroSlider
