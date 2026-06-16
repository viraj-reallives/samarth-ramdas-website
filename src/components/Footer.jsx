import { Link } from 'react-router-dom'
import { contactInfo, contentLinks, exploreLinks } from '../data/navigation'
import styles from './Footer.module.css'

function FooterLink({ href, children }) {
  return (
    <Link to={href} className={styles.link}>
      {children}
    </Link>
  )
}

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.wave} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.grid}>
          <section className={styles.brandColumn}>
            <Link to="/" className={styles.logoLink}>
              <img
                src="/assets/logo.png"
                alt="श्री समर्थ रामदास"
                className={styles.logo}
              />
            </Link>
            <p className={styles.mantra}>|| जय जय रघुवीर समर्थ ||</p>
            <p className={styles.brandText}>
              श्री समर्थ रामदासांचे साहित्य, प्रवचने आणि भक्तीगीत — एकाच ठिकाणी.
            </p>
          </section>

          <section className={styles.column}>
            <h2 className={styles.columnTitle}>अन्वेषण # Explore</h2>
            <ul className={styles.linkList}>
              {exploreLinks.map(({ labelMr, labelEn, href }) => (
                <li key={href}>
                  <FooterLink href={href}>
                    <span className={styles.linkMr}>{labelMr}</span>
                    <span className={styles.linkEn}>{labelEn}</span>
                  </FooterLink>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.column}>
            <h2 className={styles.columnTitle}>साहित्य # Content</h2>
            <ul className={styles.linkList}>
              {contentLinks.map(({ label, href }) => (
                <li key={href}>
                  <FooterLink href={href}>{label}</FooterLink>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.column}>
            <h2 className={styles.columnTitle}>संपर्क # Contact</h2>
            <div className={styles.contactBlocks}>
              {contactInfo.map((block) => (
                <address key={block.title} className={styles.contactBlock}>
                  <strong className={styles.contactTitle}>{block.title}</strong>
                  {block.lines.map((line) => (
                    <span key={line} className={styles.contactLine}>
                      {line}
                    </span>
                  ))}
                </address>
              ))}
            </div>
            <Link to="/contact" className={styles.contactButton}>
              संपर्क फॉर्म # Contact Form
            </Link>
          </section>
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {year} Copyright, All Rights Reserved by samarthramdas400.in
          </p>
          <button
            type="button"
            className={styles.backToTop}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Back to Top ↑
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
