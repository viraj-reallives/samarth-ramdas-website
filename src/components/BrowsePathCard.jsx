import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
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
  layout = 'horizontal',
  ctaMr = 'निवडा',
  ctaEn = 'Choose',
}) {
  const isStacked = layout === 'stacked'

  return (
    <Link to={to} className={`${styles.card} ${styles[layout]}`}>
      {isStacked ? (
        <>
          {image ? (
            <div className={styles.cardVisual}>
              <img src={image} alt="" className={styles.cardImage} loading="lazy" decoding="async" />
            </div>
          ) : null}
          <div className={styles.stackedInner}>
            {!image && icon ? (
              <div className={styles.iconWrap} aria-hidden="true">
                {icon}
              </div>
            ) : null}
            <div className={styles.body}>
              <h3 className={styles.title}>
                <span className={styles.titleMr}>{titleMr}</span>
                <span className={styles.titleEn}>{titleEn}</span>
              </h3>
              {(descriptionMr || descriptionEn) && (
                <p className={styles.description}>
                  {descriptionMr}
                  {descriptionEn && <span className={styles.descEn}>{descriptionEn}</span>}
                </p>
              )}
            </div>
          </div>
          <span className={styles.stackedCta}>
            <span className={styles.ctaLabel}>
              {ctaMr}
              <span className={styles.ctaLabelEn}>{ctaEn}</span>
            </span>
            <FiArrowRight className={styles.ctaIcon} aria-hidden="true" />
          </span>
        </>
      ) : (
        <>
          <div className={styles.iconWrap} aria-hidden="true">
            {icon}
          </div>
          <div className={styles.body}>
            {stepMr && (
              <p className={styles.step}>
                {stepMr}
                <span className={styles.stepEn}>{stepEn}</span>
              </p>
            )}
            <h3 className={styles.title}>
              <span className={styles.titleMr}>{titleMr}</span>
              <span className={styles.titleEn}>{titleEn}</span>
            </h3>
            {(descriptionMr || descriptionEn) && (
              <p className={styles.description}>
                {descriptionMr}
                {descriptionEn && <span className={styles.descEn}>{descriptionEn}</span>}
              </p>
            )}
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
