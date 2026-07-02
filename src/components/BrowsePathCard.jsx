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
  layout = 'horizontal',
}) {
  return (
    <Link to={to} className={`${styles.card} ${styles[layout]}`}>
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
      <FiArrowRight className={styles.arrow} aria-hidden="true" />
    </Link>
  )
}

export default BrowsePathCard
