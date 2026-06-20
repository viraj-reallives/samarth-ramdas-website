import styles from './SiteLogo.module.css'

function SiteLogo({ variant = 'color', className = '' }) {
  const isWhite = variant === 'white'

  return (
    <span
      className={`${styles.logo} ${isWhite ? styles.logoWhite : styles.logoColor} ${className}`}
      aria-label="श्री समर्थ रामदास"
      role="img"
    >
      <span className={styles.mainTitle}>श्री समर्थ रामदास</span>
      <span className={styles.sideBlock} aria-hidden="true">
        <span className={styles.mantra}>॥ श्री राम समर्थ ॥</span>
        <span className={styles.mantra}>॥ जय जय रघुवीर समर्थ ॥</span>
      </span>
    </span>
  )
}

export default SiteLogo
