import { Link } from 'react-router-dom'
import styles from './CategoryCards.module.css'

const categories = [
  {
    id: 'subject',
    title: 'Subject',
    titleMr: 'विषय',
    image: '/assets/cards/subject.jpg',
    href: '/subject',
    theme: 'saffron',
    position: 'center 30%',
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
    image: '/assets/cards/language.jpg',
    href: '/language',
    theme: 'teal',
    position: 'left center',
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
    image: '/assets/cards/author.jpg',
    href: '/author',
    theme: 'gold',
    position: 'left 35%',
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
    image: '/assets/cards/ringtones.jpg',
    href: '/ringtones',
    theme: 'maroon',
    position: 'left center',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M9 18V5l12-2v13" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
]

function CategoryCards() {
  return (
    <section className={styles.section} aria-label="Category cards">
      <div className={styles.container}>
        <div className={styles.grid}>
          {categories.map(({ id, title, titleMr, image, href, theme, position, icon }) => (
            <Link
              key={id}
              to={href}
              className={styles.card}
              data-theme={theme}
            >
              <div
                className={styles.cardBg}
                style={{ backgroundImage: `url(${image})`, backgroundPosition: position }}
                aria-hidden="true"
              />
              <div className={styles.cardOverlay} aria-hidden="true" />
              <div className={styles.cardBorder} aria-hidden="true" />

              <div className={styles.cardBody}>
                <span className={styles.iconWrap}>{icon}</span>
                <div className={styles.titles}>
                  <span className={styles.titleMr}>{titleMr}</span>
                  <span className={styles.titleEn}>{title}</span>
                </div>
                <span className={styles.cta}>
                  <span>Explore</span>
                  <span className={styles.ctaArrow}>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryCards
