import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiHome } from 'react-icons/fi'
import InnerBanner from '../components/InnerBanner'
import pageUi from '../styles/pageUi.module.css'
import { useI18n } from '../i18n/useI18n'
import styles from './NotFound.module.css'

const quickLinks = [
  { href: '/', labelMr: 'मुख्यपृष्ठ', labelEn: 'Home' },
  { href: '/subject', labelMr: 'विषय', labelEn: 'Subject' },
  { href: '/author', labelMr: 'लेखक', labelEn: 'Author' },
  { href: '/language', labelMr: 'भाषा', labelEn: 'Language' },
  { href: '/contact', labelMr: 'संपर्क', labelEn: 'Contact' },
]

function NotFound() {
  const { t, pickField } = useI18n()

  useEffect(() => {
    document.title = t('pages.notFound.documentTitle')
    return () => {
      document.title = t('site.title')
    }
  }, [t])

  return (
    <div className={styles.page}>
      <InnerBanner contentId="not-found-content" />

      <div className={`${styles.content} ${pageUi.content}`} id="not-found-content">
        <div className={styles.card}>
          <p className={styles.code} aria-hidden="true">
            404
          </p>
          <h1 className={styles.title}>{t('pages.notFound.title')}</h1>
          <p className={styles.message}>{t('pages.notFound.message')}</p>

          <div className={styles.actions}>
            <Link to="/" className={styles.primaryBtn}>
              <FiHome aria-hidden="true" />
              {t('pages.notFound.backHome')}
            </Link>
            <button type="button" className={styles.secondaryBtn} onClick={() => window.history.back()}>
              <FiArrowLeft aria-hidden="true" />
              {t('common.goBack')}
            </button>
          </div>

          <div className={styles.links}>
            <p className={styles.linksTitle}>{t('common.helpfulLinks')}</p>
            <div className={styles.linkGrid}>
              {quickLinks.map((link) => (
                <Link key={link.href} to={link.href} className={styles.quickLink}>
                  {pickField(link, 'label')}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
