import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import styles from './HeroSlider.module.css'

const slides = [
  {
    id: 1,
    image: '/assets/slides/slide1.jpg',
    title: 'श्री समर्थ रामदास स्वामी',
    subtitle: 'आध्यात्मिक वारसा आणि प्रेरणादायी विचार',
    button: 'अधिक जाणून घ्या',
    href: '/about',
  },
  {
    id: 2,
    image: '/assets/slides/slide2.jpg',
    title: 'शिवथरघळ',
    subtitle: 'दासबोधाची पवित्र भूमी',
    button: 'Explore',
    href: '/shivtharghal',
  },
  {
    id: 3,
    image: '/assets/slides/slide3.jpg',
    title: 'जीवन प्रवास',
    subtitle: 'समर्थांच्या कार्याचा प्रेरणादायी इतिहास',
    button: 'Read More',
    href: '/life-journey',
  },
]

function HeroSlider() {
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const paginationRef = useRef(null)

  return (
    <section className={styles.heroSlider} aria-label="Hero slider">
      <Swiper
        className={styles.swiper}
        modules={[EffectFade, Autoplay, Navigation, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={900}
        loop
        autoplay={{
          delay: 4000,
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
      >
        {slides.map(({ id, image, title, subtitle, button, href }) => (
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
              <div className={styles.overlay} aria-hidden="true" />
              <div className={styles.content}>
                <div className={styles.contentInner}>
                  <h2 className={styles.title}>{title}</h2>
                  <p className={styles.subtitle}>{subtitle}</p>
                  <a href={href} className={styles.cta}>
                    {button}
                    <span className={styles.ctaArrow} aria-hidden="true">
                      →
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

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

      <div ref={paginationRef} className={styles.pagination} />
    </section>
  )
}

export default HeroSlider
