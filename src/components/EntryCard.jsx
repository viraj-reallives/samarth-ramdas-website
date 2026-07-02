import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import styles from './EntryCard.module.css'

function EntryCard({
  titleMr,
  titleEn,
  descriptionMr,
  descriptionEn,
  to,
  variant = 'secondary',
  disabled = false,
  comingSoon = false,
  children,
}) {
  const className = `${styles.card} ${styles[variant]} ${disabled ? styles.disabled : ''}`

  const content = (
    <>
      <div className={styles.text}>
        <h3 className={styles.title}>
          <span className={styles.titleMr}>{titleMr}</span>
          <span className={styles.titleEn}>{titleEn}</span>
        </h3>
        {(descriptionMr || descriptionEn) && (
          <p className={styles.description}>
            {descriptionMr && <span>{descriptionMr}</span>}
            {descriptionMr && descriptionEn && <span className={styles.descSep}>·</span>}
            {descriptionEn && <span className={styles.descEn}>{descriptionEn}</span>}
          </p>
        )}
        {children}
      </div>
      {!disabled && (
        <span className={styles.cta} aria-hidden="true">
          <FiArrowRight />
        </span>
      )}
      {comingSoon && <span className={styles.comingSoon}>लवकरच / Coming soon</span>}
    </>
  )

  if (disabled || !to) {
    return (
      <div className={className} aria-disabled="true">
        {content}
      </div>
    )
  }

  return (
    <Link to={to} className={className}>
      {content}
    </Link>
  )
}

export default EntryCard
