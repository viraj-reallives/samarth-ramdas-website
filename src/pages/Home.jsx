import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import HeroSlider from '../components/HeroSlider'
import SearchBar from '../components/SearchBar'
import BrowsePathCard from '../components/BrowsePathCard'
import { CATEGORY_CARD_IMAGE_BY_PATH } from '../data/categoryCardImages'
import { useI18n } from '../i18n/useI18n'
import { FiArrowRight } from 'react-icons/fi'
import styles from './Home.module.css'

const BROWSE_PATHS = [
  {
    to: '/subject',
    titleMr: 'विषयानुसार',
    titleEn: 'By Subject',
    descriptionMr: 'दासबोध, मनाचे श्लोक… नंतर लेखक निवडा',
    descriptionEn: 'Dasbodh, Manache Shlok… then choose author',
    image: CATEGORY_CARD_IMAGE_BY_PATH['/subject'],
  },
  {
    to: '/author',
    titleMr: 'लेखकानुसार',
    titleEn: 'By Author',
    descriptionMr: 'लेखक निवडा, नंतर विषय निवडा',
    descriptionEn: 'Pick an author, then choose subject',
    image: CATEGORY_CARD_IMAGE_BY_PATH['/author'],
  },
  {
    to: '/language',
    titleMr: 'भाषेनुसार',
    titleEn: 'By Language',
    descriptionMr: 'मराठी, हिंदी, संस्कृत… नंतर विषय निवडा',
    descriptionEn: 'Marathi, Hindi, Sanskrit… then choose subject',
    image: CATEGORY_CARD_IMAGE_BY_PATH['/language'],
  },
]

function Home() {
  const { t } = useI18n()

  useEffect(() => {
    document.title = t('site.title')
  }, [t])

  return (
    <>
      <HeroSlider />

      <section className={styles.section} aria-label="Explore Samarth Ramdas literature">
        <div className={styles.container}>
          <div className={styles.searchHero}>
            <header className={styles.header}>
              <p className={styles.mantra}>{t('home.mantra')}</p>
              <p className={styles.subtitle}>{t('home.subtitle')}</p>
            </header>

            <div className={styles.searchWrap}>
              <SearchBar large className={styles.searchBar} />
            </div>

            <Link to="/browse" className={styles.browseCallout}>
              <span className={styles.browseCalloutText}>{t('home.browseAllLiterature')}</span>
              <span className={styles.browseCalloutHint}>{t('home.browseHint')}</span>
              <FiArrowRight className={styles.browseCalloutArrow} aria-hidden="true" />
            </Link>
          </div>

          <div className={styles.discoveryPanel}>
            <h2 className={styles.pathHeading}>{t('home.pathHeading')}</h2>
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
