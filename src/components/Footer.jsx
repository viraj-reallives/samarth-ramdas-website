import { Link } from 'react-router-dom'
import { contactInfo, contentLinks, exploreLinks } from '../data/navigation'
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
  const { t, pickField, locale } = useI18n()

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
            <div className={styles.contactBlocks}>
              {contactInfo.map((block) => {
                const lines = locale === 'mr' ? block.linesMr : block.linesEn
                return (
                  <address key={block.id} className={styles.contactBlock}>
                    <strong className={styles.contactTitle}>{pickField(block, 'title')}</strong>
                    {lines.map((line) => (
                      <span key={line} className={styles.contactLine}>
                        {line}
                      </span>
                    ))}
                  </address>
                )
              })}
            </div>
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
