import { Link } from 'react-router-dom'
import styles from './CategoryCards.module.css'

const categories = [
  {
    id: 'subject',
    title: 'Subject',
    titleMr: 'विषय',
    hintMr: 'विषयानुसार साहित्य व ऑडिओ',
    hintEn: 'Literature & audio by subject',
    image: '/assets/cards/subject.png',
    href: '/subject',
    theme: 'saffron',
    position: 'center 32%',
    positionMobile: 'center 28%',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <path d="M8 7h8M8 11h6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'language',
    title: 'Language',
    titleMr: 'भाषा',
    hintMr: 'भाषेनुसार साहित्य संग्रह',
    hintEn: 'Browse content by language',
    image: '/assets/cards/language.png',
    href: '/language',
    theme: 'teal',
    position: 'center 35%',
    positionMobile: 'center 30%',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'author',
    title: 'Authors',
    titleMr: 'लेखक',
    hintMr: 'लेखकानुसार वर्गीकरण',
    hintEn: 'Explore works by author',
    image: '/assets/cards/author.png',
    href: '/author',
    theme: 'gold',
    position: '58% center',
    positionMobile: '62% center',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="9" cy="8" r="3.5" />
        <path d="M3.5 20v-1.5a4.5 4.5 0 0 1 4.5-4.5H10" strokeLinecap="round" />
        <path d="M16 11v6M13 14h6" strokeLinecap="round" />
        <circle cx="17.5" cy="8.5" r="2.5" />
      </svg>
    ),
  },
  {
    id: 'ringtones',
    title: 'Mobile Ringtones',
    titleMr: 'रिंगटोन्स',
    hintMr: 'मनाचे श्लोक रिंगटोन्स',
    hintEn: 'Download devotional ringtones',
    image: '/assets/cards/ringtones.png',
    href: '/ringtones',
    theme: 'maroon',
    position: '62% center',
    positionMobile: '68% center',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M9 18V5l12-2v13" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
]

const enterAnimations = ['fromBottomLeft', 'fromBottomRight', 'fromTopLeft', 'fromTopRight']

function CategoryCards() {
  return (
    <section className={styles.section} aria-label="Category cards">
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <p className={styles.sectionEyebrow}>|| श्री समर्थ वाङ्मय ||</p>
          <h2 className={styles.sectionTitle}>साहित्य शोधा / Explore Literature</h2>
          <p className={styles.sectionIntro}>
            खालील विभाग निवडा — विषय, भाषा, लेखक किंवा रिंगटोन्स.
          </p>
        </header>

        <div className={styles.grid}>
          {categories.map(
            ({ id, title, titleMr, hintMr, hintEn, image, href, theme, position, positionMobile, icon }, index) => (
              <Link
                key={id}
                to={href}
                className={styles.card}
                data-theme={theme}
                data-enter={enterAnimations[index]}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={styles.cardVisual}>
                  <img
                    src={image}
                    alt=""
                    className={styles.cardImage}
                    style={{
                      '--card-position': position,
                      '--card-position-mobile': positionMobile,
                    }}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className={styles.cardTint} aria-hidden="true" />
                  <div className={styles.cardOverlay} aria-hidden="true" />
                  <div className={styles.cardAccentBar} aria-hidden="true" />
                  <div className={styles.cardHead}>
                    <span className={styles.iconWrap}>{icon}</span>
                    <span className={styles.cardNum} aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                <div className={styles.cardPanel}>
                  <div className={styles.titles}>
                    <span className={styles.titleMr}>{titleMr}</span>
                    <span className={styles.titleEn}>{title}</span>
                  </div>
                  <p className={styles.hint}>
                    <span>{hintMr}</span>
                    <span className={styles.hintSep}>·</span>
                    <span>{hintEn}</span>
                  </p>
                  <span className={styles.cta}>
                    <span className={styles.ctaText}>पहा</span>
                    <span className={styles.ctaTextEn}>/ Explore</span>
                    <span className={styles.ctaArrow} aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            ),
          )}
        </div>
      </div>
    </section>
  )
}

export default CategoryCards
