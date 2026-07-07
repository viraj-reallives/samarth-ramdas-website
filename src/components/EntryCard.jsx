import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { useI18n } from '../i18n/useI18n'
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
  const { pickField, t } = useI18n()
  const className = `${styles.card} ${styles[variant]} ${disabled ? styles.disabled : ''}`
  const title = pickField({ titleMr, titleEn }, 'title')
  const description = pickField({ descriptionMr, descriptionEn }, 'description')

  const content = (
    <>
      <div className={styles.text}>
        <h3 className={styles.title}>
          <span className={styles.titleMr}>{title}</span>
        </h3>
        {description ? <p className={styles.description}>{description}</p> : null}
        {children}
      </div>
      {!disabled && (
        <span className={styles.cta} aria-hidden="true">
          <FiArrowRight />
        </span>
      )}
      {comingSoon && <span className={styles.comingSoon}>{t('common.comingSoon')}</span>}
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
