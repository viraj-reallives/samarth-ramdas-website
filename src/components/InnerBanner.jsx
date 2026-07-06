import { FiChevronDown } from 'react-icons/fi'
import styles from './InnerBanner.module.css'

const DEFAULT_BANNER_IMAGE = '/assets/inner-banner.jpeg'
const DEFAULT_BANNER_IMAGE_MOBILE = '/assets/inner-banner-mobile.jpeg'

function InnerBanner({
  contentId = 'page-content',
  scrollLabel = 'खाली स्क्रोल करा / Scroll down',
  image = DEFAULT_BANNER_IMAGE,
  imageMobile,
  imageAlt = '|| जय जय रघुवीर समर्थ ||',
}) {
  const scrollToContent = () => {
    document.getElementById(contentId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const mobileImage =
    imageMobile ?? (image === DEFAULT_BANNER_IMAGE ? DEFAULT_BANNER_IMAGE_MOBILE : null)

  return (
    <div className={styles.banner}>
      <div className={styles.bannerInner}>
        {mobileImage ? (
          <picture className={styles.bannerPicture}>
            <source media="(max-width: 768px)" srcSet={mobileImage} />
            <img src={image} alt={imageAlt} className={styles.bannerImage} />
          </picture>
        ) : (
          <img src={image} alt={imageAlt} className={styles.bannerImage} />
        )}
        <div className={styles.bannerOverlay} aria-hidden="true" />
        <button
          type="button"
          className={styles.scrollCue}
          onClick={scrollToContent}
          aria-label={scrollLabel}
        >
          <FiChevronDown aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export default InnerBanner
