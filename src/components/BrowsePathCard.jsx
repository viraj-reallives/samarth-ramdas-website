import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { resolveCardImage } from '../data/categoryCardImages'
import { useI18n } from '../i18n/useI18n'
import styles from './BrowsePathCard.module.css'

function BrowsePathCard({
  titleMr,
  titleEn,
  descriptionMr,
  descriptionEn,
  stepMr,
  stepEn,
  to,
  icon,
  image,
  visualTheme,
  layout = 'horizontal',
  ctaMr,
  ctaEn,
}) {
  const { pick, pickField, t, locale } = useI18n()
  const isStacked = layout === 'stacked'
  const title = pickField({ titleMr, titleEn }, 'title')
  const description = pickField({ descriptionMr, descriptionEn }, 'description')
  const step = pickField({ stepMr, stepEn }, 'step')
  const cta = pick(ctaMr ?? t('common.choose'), ctaEn ?? t('common.choose'))
  const resolvedImage = resolveCardImage(image, locale)

  return (
    <Link to={to} className={`${styles.card} ${styles[layout]}`}>
      {isStacked ? (
        <>
          {resolvedImage ? (
            <div
              className={`${styles.cardVisual} ${visualTheme ? styles.illustration : ''}`}
              data-theme={visualTheme || undefined}
            >
              <img src={resolvedImage} alt="" className={styles.cardImage} loading="lazy" decoding="async" />
            </div>
          ) : null}
          <div className={styles.stackedInner}>
            {!resolvedImage && icon ? (
              <div className={styles.iconWrap} aria-hidden="true">
                {icon}
              </div>
            ) : null}
            <div className={styles.body}>
              <h3 className={styles.title}>
                <span className={styles.titleMr}>{title}</span>
              </h3>
              {description ? (
                <p className={styles.description}>{description}</p>
              ) : null}
            </div>
          </div>
          <span className={styles.stackedCta}>
            <span className={styles.ctaLabel}>{cta}</span>
            <FiArrowRight className={styles.ctaIcon} aria-hidden="true" />
          </span>
        </>
      ) : (
        <>
          <div className={styles.iconWrap} aria-hidden="true">
            {icon}
          </div>
          <div className={styles.body}>
            {step ? (
              <p className={styles.step}>{step}</p>
            ) : null}
            <h3 className={styles.title}>
              <span className={styles.titleMr}>{title}</span>
            </h3>
            {description ? <p className={styles.description}>{description}</p> : null}
          </div>
          <span className={styles.horizontalCta} aria-hidden="true">
            <FiArrowRight />
          </span>
        </>
      )}
    </Link>
  )
}

export default BrowsePathCard
