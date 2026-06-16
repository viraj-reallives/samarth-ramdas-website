import { useEffect, useState } from 'react'
import styles from './PageLoader.module.css'

function PageLoader({ visible }) {
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
      aria-label="Website loading"
    >
      <div className={styles.inner}>
        <img src="/assets/logo.png" alt="" className={styles.logo} aria-hidden="true" />
        <div className={styles.spinner} aria-hidden="true" />
        <p className={styles.mantra}>|| जय जय रघुवीर समर्थ ||</p>
        <p className={styles.text}>लोड होत आहे… / Loading…</p>
      </div>
    </div>
  )
}

export default PageLoader
