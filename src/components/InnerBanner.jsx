import { FiChevronDown } from 'react-icons/fi'
import { resolveCardImage } from '../data/categoryCardImages'
import { useI18n } from '../i18n/useI18n'
import styles from './InnerBanner.module.css'

const DEFAULT_BANNER_IMAGE = '/assets/inner-banner.png'
const DEFAULT_BANNER_IMAGE_MOBILE = '/assets/inner-banner-mobile.jpeg'

function InnerBanner({
  contentId = 'page-content',
  scrollLabel,
  image = DEFAULT_BANNER_IMAGE,
  imageMobile,
  imageAlt,
  visualTheme,
}) {
  const { t, locale } = useI18n()
  const resolvedScrollLabel = scrollLabel ?? t('common.scrollDown')
  const resolvedImageAlt = imageAlt ?? t('site.mantra')
  const resolvedImage = resolveCardImage(image, locale) ?? DEFAULT_BANNER_IMAGE
  const scrollToContent = () => {
    document.getElementById(contentId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const isIllustration = Boolean(visualTheme)
  const mobileImage = isIllustration
    ? null
    : imageMobile ?? (image === DEFAULT_BANNER_IMAGE ? DEFAULT_BANNER_IMAGE_MOBILE : null)

  return (
    <div className={styles.banner} data-visual={isIllustration ? 'illustration' : 'photo'}>
      <div
        className={`${styles.bannerInner} ${isIllustration ? styles.illustration : ''}`}
        data-theme={visualTheme || undefined}
      >
        {isIllustration ? (
          <div
            className={styles.illustrationArt}
            style={{ backgroundImage: `url("${resolvedImage}")` }}
          >
            <img src={resolvedImage} alt={resolvedImageAlt} className={styles.bannerImage} />
          </div>
        ) : mobileImage ? (
          <picture className={styles.bannerPicture}>
            <source media="(max-width: 768px)" srcSet={mobileImage} />
            <img src={resolvedImage} alt={resolvedImageAlt} className={styles.bannerImage} />
          </picture>
        ) : (
          <img src={resolvedImage} alt={resolvedImageAlt} className={styles.bannerImage} />
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
