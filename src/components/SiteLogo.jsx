import { SITE_LOGO_ALT, SITE_LOGO_SRC } from '../config/branding'
import styles from './SiteLogo.module.css'

function SiteLogo({
  variant = 'color',
  size = 'header',
  className = '',
  priority = false,
  decorative = false,
}) {
  const sizeClass =
    size === 'footer' ? styles.logoFooter : size === 'loader' ? styles.logoLoader : styles.logoHeader

  return (
    <img
      src={SITE_LOGO_SRC}
      alt={decorative ? '' : SITE_LOGO_ALT}
      aria-hidden={decorative ? true : undefined}
      className={`${styles.logo} ${sizeClass} ${variant === 'white' ? styles.logoOnDark : ''} ${className}`}
      width={360}
      height={120}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
    />
  )
}

export default SiteLogo
