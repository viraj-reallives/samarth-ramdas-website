import { FiChevronDown } from 'react-icons/fi'
import styles from './InnerBanner.module.css'

function InnerBanner({
  contentId = 'page-content',
  scrollLabel = 'खाली स्क्रोल करा / Scroll down',
}) {
  const scrollToContent = () => {
    document.getElementById(contentId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className={styles.banner}>
      <div className={styles.bannerInner}>
        <img
          src="/assets/inner-banner.png"
          alt="|| जय जय रघुवीर समर्थ ||"
          className={styles.bannerImage}
        />
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
