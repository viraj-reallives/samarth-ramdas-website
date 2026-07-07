import { FiChevronDown } from 'react-icons/fi'
import { useI18n } from '../i18n/useI18n'
import styles from './InnerBanner.module.css'

const DEFAULT_BANNER_IMAGE = '/assets/inner-banner.jpeg'
const DEFAULT_BANNER_IMAGE_MOBILE = '/assets/inner-banner-mobile.jpeg'

function InnerBanner({
  contentId = 'page-content',
  scrollLabel,
  image = DEFAULT_BANNER_IMAGE,
  imageMobile,
  imageAlt,
}) {
  const { t } = useI18n()
  const resolvedScrollLabel = scrollLabel ?? t('common.scrollDown')
  const resolvedImageAlt = imageAlt ?? t('site.mantra')
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
            <img src={image} alt={resolvedImageAlt} className={styles.bannerImage} />
          </picture>
        ) : (
          <img src={image} alt={resolvedImageAlt} className={styles.bannerImage} />
        )}
        <div className={styles.bannerOverlay} aria-hidden="true" />
        <button
          type="button"
          className={styles.scrollCue}
          onClick={scrollToContent}
          aria-label={resolvedScrollLabel}
        >
          <FiChevronDown aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export default InnerBanner
