import { Link } from 'react-router-dom'
import ContactDetails from './ContactDetails'
import SiteLogo from './SiteLogo'
import { contentLinks, exploreLinks } from '../data/navigation'
import { useI18n } from '../i18n/useI18n'
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
  const { t, pickField } = useI18n()

  return (
    <footer className={styles.footer}>
      <div className={styles.wave} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.grid}>
          <section className={styles.brandColumn}>
            <Link to="/" className={styles.logoLink}>
              <SiteLogo size="footer" />
            </Link>
            <p className={styles.mantra}>{t('site.mantra')}</p>
            <p className={styles.brandText}>{t('footer.brandText')}</p>
          </section>

          <section className={styles.column}>
            <h2 className={styles.columnTitle}>{t('footer.explore')}</h2>
            <ul className={styles.linkList}>
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>
                    <span className={styles.linkMr}>{pickField(link, 'label')}</span>
                  </FooterLink>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.column}>
            <h2 className={styles.columnTitle}>{t('footer.content')}</h2>
            <ul className={styles.linkList}>
              {contentLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>
                    <span className={styles.linkMr}>{pickField(link, 'label')}</span>
                  </FooterLink>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.column}>
            <h2 className={styles.columnTitle}>{t('footer.contact')}</h2>
            <ContactDetails variant="footer" />
            <Link to="/contact" className={styles.contactButton}>
              {t('footer.contactForm')}
            </Link>
          </section>
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.copyright}>{t('footer.copyright', { year })}</p>
          <button
            type="button"
            className={styles.backToTop}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {t('footer.backToTop')} ↑
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
