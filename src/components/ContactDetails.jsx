import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { contactAddress, contactEmail, contactPhones } from '../data/contact'
import { useI18n } from '../i18n/useI18n'
import styles from './ContactDetails.module.css'

function ContactDetails({ variant = 'page' }) {
  const { t, pickField, locale } = useI18n()
  const compact = variant === 'footer'
  const lines = locale === 'mr' ? contactAddress.linesMr : contactAddress.linesEn

  const blockClass = compact ? `${styles.block} ${styles.blockCompact}` : `${styles.block} ${styles.card}`
  const iconClass = compact ? `${styles.icon} ${styles.iconCompact}` : styles.icon
  const titleClass = compact ? styles.titleCompact : styles.title
  const lineClass = compact ? styles.lineCompact : styles.line
  const linkClass = compact ? styles.phoneLinkCompact : styles.phoneLink
  const emailLinkClass = compact ? styles.emailLinkCompact : styles.emailLink

  return (
    <div className={styles.blocks}>
      <address className={blockClass}>
        <span className={iconClass} aria-hidden="true">
          <FiMapPin />
        </span>
        <div className={styles.body}>
          <p className={titleClass}>{pickField(contactAddress, 'title')}</p>
          {lines.map((line) => (
            <p key={line} className={lineClass}>
              {line}
            </p>
          ))}
        </div>
      </address>

      <div className={blockClass}>
        <span className={iconClass} aria-hidden="true">
          <FiPhone />
        </span>
        <div className={styles.body}>
          <p className={titleClass}>{t('pages.contact.phoneHeading')}</p>
          <ul className={styles.phoneList}>
            {contactPhones.map((phone) => (
              <li key={phone.tel}>
                <a href={`tel:${phone.tel}`} className={`${styles.phoneLink} ${linkClass}`}>
                  {phone.display}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={blockClass}>
        <span className={iconClass} aria-hidden="true">
          <FiMail />
        </span>
        <div className={styles.body}>
          <p className={titleClass}>{t('pages.contact.emailLabel')}</p>
          <a href={`mailto:${contactEmail}`} className={`${styles.emailLink} ${emailLinkClass}`}>
            {contactEmail}
          </a>
        </div>
      </div>
    </div>
  )
}

export default ContactDetails
