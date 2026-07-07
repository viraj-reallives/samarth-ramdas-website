import { useEffect, useState } from 'react'
import { useI18n } from '../i18n/useI18n'
import styles from './PageLoader.module.css'

function PageLoader({ visible }) {
  const { t } = useI18n()
  const [mounted, setMounted] = useState(visible)

  useEffect(() => {
    if (visible) {
      setMounted(true)
      return undefined
    }

    const timer = window.setTimeout(() => setMounted(false), 480)
    return () => window.clearTimeout(timer)
  }, [visible])

  if (!mounted) return null

  return (
    <div
      className={visible ? styles.loader : styles.loaderHidden}
      role="status"
      aria-live="polite"
      aria-label={t('pages.loader.loading')}
    >
      <div className={styles.inner}>
        <img src="/assets/logo.png" alt="" className={styles.logo} aria-hidden="true" />
        <div className={styles.spinner} aria-hidden="true" />
        <p className={styles.mantra}>|| जय जय रघुवीर समर्थ ||</p>
        <p className={styles.text}>{t('pages.loader.loading')}</p>
      </div>
    </div>
  )
}

export default PageLoader
