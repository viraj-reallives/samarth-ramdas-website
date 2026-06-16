import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiHome } from 'react-icons/fi'
import InnerBanner from '../components/InnerBanner'
import pageUi from '../styles/pageUi.module.css'
import styles from './NotFound.module.css'

const quickLinks = [
  { href: '/', labelMr: 'मुख्यपृष्ठ', labelEn: 'Home' },
  { href: '/subject', labelMr: 'विषय', labelEn: 'Subject' },
  { href: '/author', labelMr: 'लेखक', labelEn: 'Author' },
  { href: '/language', labelMr: 'भाषा', labelEn: 'Language' },
  { href: '/contact', labelMr: 'संपर्क', labelEn: 'Contact' },
]

function NotFound() {
  useEffect(() => {
    document.title = '404 – पृष्ठ सापडले नाही | श्री समर्थ रामदास'
    return () => {
      document.title = 'श्री समर्थ रामदास - श्री रामदासांचे साहित्य'
    }
  }, [])

  return (
    <div className={styles.page}>
      <InnerBanner contentId="not-found-content" scrollLabel="खाली स्क्रोल करा / Scroll down" />

      <div className={`${styles.content} ${pageUi.content}`} id="not-found-content">
        <div className={styles.card}>
          <p className={styles.code} aria-hidden="true">
            404
          </p>
          <h1 className={styles.title}>पृष्ठ सापडले नाही / Page Not Found</h1>
          <p className={styles.message}>
            आपण जे पृष्ठ शोधत आहात ते अस्तित्वात नाही किंवा हलवले गेले आहे.
          </p>
          <p className={styles.messageEn}>
            The page you are looking for does not exist or may have been moved.
          </p>

          <div className={styles.actions}>
            <Link to="/" className={styles.primaryBtn}>
              <FiHome aria-hidden="true" />
              मुख्यपृष्ठावर जा / Go to Home
            </Link>
            <button type="button" className={styles.secondaryBtn} onClick={() => window.history.back()}>
              <FiArrowLeft aria-hidden="true" />
              मागे जा / Go Back
            </button>
          </div>

          <div className={styles.links}>
            <p className={styles.linksTitle}>इतर उपयुक्त दुवे / Helpful links</p>
            <div className={styles.linkGrid}>
              {quickLinks.map(({ href, labelMr, labelEn }) => (
                <Link key={href} to={href} className={styles.quickLink}>
                  <span className={styles.quickLinkMr}>{labelMr}</span>
                  <span className={styles.quickLinkEn}>{labelEn}</span>
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
