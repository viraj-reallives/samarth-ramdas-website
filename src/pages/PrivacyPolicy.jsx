import { Fragment, useEffect } from 'react'
import pageUi from '../styles/pageUi.module.css'
import { useI18n } from '../i18n/useI18n'
import {
  privacyContactEmail,
  privacyContactPerson,
  privacyDates,
  privacyOrganisation,
  privacySections,
  privacySubtitle,
} from '../data/privacyPolicy'
import styles from './PrivacyPolicy.module.css'

const TOKENS = {
  email: privacyContactEmail,
  org: privacyOrganisation,
  person: privacyContactPerson,
  cloudflare: 'Cloudflare',
  expo: 'Expo',
  web3forms: 'Web3Forms',
}

function PolicyRichText({ text }) {
  const pattern = /(\{email\}|\{org\}|\{person\}|\{cloudflare\}|\{expo\}|\{web3forms\})/g
  const parts = String(text ?? '').split(pattern)

  return parts.map((part, index) => {
    if (part === '{email}') {
      return (
        <a key={index} href={`mailto:${privacyContactEmail}`}>
          {privacyContactEmail}
        </a>
      )
    }

    if (part === '{org}' || part === '{person}' || part === '{cloudflare}' || part === '{expo}' || part === '{web3forms}') {
      const key = part.slice(1, -1)
      return <strong key={index}>{TOKENS[key]}</strong>
    }

    return <Fragment key={index}>{part}</Fragment>
  })
}

function PolicyBlock({ block }) {
  const { pick, pickField } = useI18n()
  const text = pick(block.mr, block.en)

  if (block.type === 'contact') {
    return (
      <address className={styles.contactBlock}>
        <p>
          <strong>{privacyOrganisation}</strong>
        </p>
        <p>{privacyContactPerson}</p>
        <p>
          <a href={`mailto:${privacyContactEmail}`}>{privacyContactEmail}</a>
        </p>
      </address>
    )
  }

  if (block.type === 'list') {
    const list = Array.isArray(text) ? text : []
    return (
      <ul>
        {list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )
  }

  if (block.type === 'labeled') {
    return (
      <p>
        <strong>{pickField(block, 'label')}</strong> <PolicyRichText text={text} />
      </p>
    )
  }

  if (block.type === 'callout') {
    return (
      <p className={styles.callout}>
        <PolicyRichText text={text} />
      </p>
    )
  }

  return (
    <p>
      <PolicyRichText text={text} />
    </p>
  )
}

function PrivacyPolicy() {
  const { t, pickField } = useI18n()

  useEffect(() => {
    document.title = t('pages.privacyPolicy.documentTitle')
    return () => {
      document.title = t('site.title')
    }
  }, [t])

  return (
    <div className={styles.page}>
      <article className={`${styles.content} ${pageUi.content}`} id="privacy-policy-content">
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>{t('pages.privacyPolicy.title')}</h1>
          <p className={styles.subtitle}>{pickField(privacySubtitle, 'subtitle')}</p>
          <p className={styles.meta}>
            {t('pages.privacyPolicy.effectiveDate')}: {pickField(privacyDates, 'effective')}
            <span className={styles.metaSep} aria-hidden="true">
              ·
            </span>
            {t('pages.privacyPolicy.lastUpdated')}: {pickField(privacyDates, 'updated')}
          </p>
        </header>

        <div className={styles.body}>
          {privacySections.map((section) => (
            <section key={section.id} className={styles.section} id={section.id}>
              <h2>{pickField(section, 'title')}</h2>
              {section.blocks.map((block, index) => (
                <PolicyBlock key={`${section.id}-${index}`} block={block} />
              ))}
            </section>
          ))}
        </div>
      </article>
    </div>
  )
}

export default PrivacyPolicy
