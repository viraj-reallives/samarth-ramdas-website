import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import HeroSlider from '../components/HeroSlider'
import SearchBar from '../components/SearchBar'
import BrowsePathCard from '../components/BrowsePathCard'
import { FiArrowRight, FiBookOpen, FiGlobe, FiUsers } from 'react-icons/fi'
import styles from './Home.module.css'

const BROWSE_PATHS = [
  {
    to: '/subject',
    titleMr: 'विषयानुसार',
    titleEn: 'By Subject',
    descriptionMr: 'दासबोध, मनाचे श्लोक… नंतर लेखक निवडा',
    descriptionEn: 'Dasbodh, Manache Shlok… then choose author',
    icon: <FiBookOpen />,
  },
  {
    to: '/author',
    titleMr: 'लेखकानुसार',
    titleEn: 'By Author',
    descriptionMr: 'लेखक निवडा, नंतर विषय निवडा',
    descriptionEn: 'Pick an author, then choose subject',
    icon: <FiUsers />,
  },
  {
    to: '/language',
    titleMr: 'भाषेनुसार',
    titleEn: 'By Language',
    descriptionMr: 'मराठी, हिंदी, संस्कृत… नंतर विषय निवडा',
    descriptionEn: 'Marathi, Hindi, Sanskrit… then choose subject',
    icon: <FiGlobe />,
  },
]

function Home() {
  useEffect(() => {
    document.title = 'श्री समर्थ रामदास - श्री रामदासांचे साहित्य'
  }, [])

  return (
    <>
      <HeroSlider />

      <section className={styles.section} aria-label="Explore Samarth Ramdas literature">
        <div className={styles.container}>
          <div className={styles.searchHero}>
            <header className={styles.header}>
              <p className={styles.mantra}>॥ श्री समर्थ रामदास ॥</p>
              <p className={styles.subtitle}>
                एकाच ठिकाणी शोधा — जे माहित आहे ते निवडा, उर्वरित फिल्टर करा.
              </p>
              <p className={styles.subtitleEn}>
                Search in one place — start with what you know, then narrow down.
              </p>
            </header>

            <div className={styles.searchWrap}>
              <SearchBar large className={styles.searchBar} />
            </div>

            <Link to="/browse" className={styles.browseCallout}>
              <span className={styles.browseCalloutText}>
                <span className={styles.browseCalloutMr}>सर्व साहित्य शोधा</span>
                <span className={styles.browseCalloutSep} aria-hidden="true">
                  ·
                </span>
                <span className={styles.browseCalloutEn}>Browse all literature</span>
              </span>
              <span className={styles.browseCalloutHint}>
                रिंगटोन्स, दासवाणी आणि इतर संग्रह
              </span>
              <FiArrowRight className={styles.browseCalloutArrow} aria-hidden="true" />
            </Link>
          </div>

          <div className={styles.discoveryPanel}>
            <h2 className={styles.pathHeading}>
              जे माहित आहे ते निवडा
              <span className={styles.pathHeadingEn}>Start with what you know</span>
            </h2>
            <div className={styles.pathGrid}>
              {BROWSE_PATHS.map((path) => (
                <BrowsePathCard key={path.to} layout="stacked" {...path} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
