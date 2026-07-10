import { useEffect, useId, useState } from 'react'
import ContactDetails from '../components/ContactDetails'
import InnerBanner from '../components/InnerBanner'
import SimpleCaptcha, { useSimpleCaptcha } from '../components/SimpleCaptcha'
import pageUi from '../styles/pageUi.module.css'
import { FiMail, FiSend, FiUser } from 'react-icons/fi'
import { WEB3FORMS_ACCESS_KEY, WEB3FORMS_ENDPOINT } from '../config/web3forms'
import { contactEmail } from '../data/contact'
import { useI18n } from '../i18n/useI18n'
import styles from './Contact.module.css'

const FORM_SUBJECT = 'This is update from samarthramdas400.in website'

function Contact() {
  const { t } = useI18n()
  const [activeTab, setActiveTab] = useState('participation')
  const [status, setStatus] = useState('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const formId = useId()
  const captcha = useSimpleCaptcha()

  useEffect(() => {
    document.title = t('pages.contact.documentTitle')
    return () => {
      document.title = t('site.title')
    }
  }, [t])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!captcha.validate()) {
      setStatus('error')
      setStatusMessage('')
      return
    }

    setStatus('submitting')
    setStatusMessage('')

    const form = event.currentTarget
    const formData = new FormData(form)

    formData.set('subject', FORM_SUBJECT)
    formData.set('form_type', activeTab)

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()
      const success = result?.success === true
      const message =
        result?.message ||
        result?.body?.message ||
        result?.error ||
        t('pages.contact.sendError')

      if (response.ok && success) {
        setStatus('success')
        setStatusMessage(t('pages.contact.success'))
        form.reset()
        captcha.refresh()
        window.setTimeout(() => {
          setStatus('idle')
          setStatusMessage('')
        }, 5000)
        return
      }

      setStatus('error')
      setStatusMessage(message)
    } catch {
      setStatus('error')
      setStatusMessage(t('pages.contact.networkError'))
    }
  }

  return (
    <div className={styles.page}>
      <InnerBanner contentId="contact-content" />

      <div className={`${styles.content} ${pageUi.content}`} id="contact-content">
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>{t('pages.contact.title')}</h1>
          <p className={styles.pageIntro}>{t('pages.contact.intro')}</p>
        </header>

        <div className={styles.layout}>
          <aside className={styles.infoColumn}>
            <h2 className={styles.infoHeading}>{t('pages.contact.detailsHeading')}</h2>
            <ContactDetails />
          </aside>

          <div className={styles.formPanel}>
            <div className={styles.tabBar} role="tablist" aria-label="Contact form type">
              <button
                type="button"
                role="tab"
                id={`${formId}-tab-participation`}
                aria-controls={`${formId}-panel`}
                aria-selected={activeTab === 'participation'}
                className={activeTab === 'participation' ? styles.tabActive : styles.tab}
                onClick={() => {
                  setActiveTab('participation')
                  setStatus('idle')
                  setStatusMessage('')
                  captcha.refresh()
                }}
              >
                {t('pages.contact.participation')}
              </button>
              <button
                type="button"
                role="tab"
                id={`${formId}-tab-feedback`}
                aria-controls={`${formId}-panel`}
                aria-selected={activeTab === 'feedback'}
                className={activeTab === 'feedback' ? styles.tabActive : styles.tab}
                onClick={() => {
                  setActiveTab('feedback')
                  setStatus('idle')
                  setStatusMessage('')
                  captcha.refresh()
                }}
              >
                {t('pages.contact.feedback')}
              </button>
            </div>

            <form
              id={`${formId}-panel`}
              role="tabpanel"
              aria-labelledby={`${formId}-tab-${activeTab}`}
              className={styles.form}
              action={WEB3FORMS_ENDPOINT}
              method="POST"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
              <input type="hidden" name="subject" value={FORM_SUBJECT} />
              <input
                type="checkbox"
                name="botcheck"
                className={styles.botcheck}
                tabIndex={-1}
                autoComplete="off"
              />

              <p className={styles.formHint}>
                {activeTab === 'participation'
                  ? t('pages.contact.participationHint')
                  : t('pages.contact.feedbackHint')}
              </p>

              <p className={styles.formEmailNote}>
                {t('pages.contact.formEmailNote')}{' '}
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              </p>

              <label className={styles.field}>
                <span className={styles.label}>
                  <FiUser aria-hidden="true" />
                  {t('pages.contact.yourName')}
                </span>
                <input
                  type="text"
                  name="name"
                  className={styles.input}
                  placeholder={t('pages.contact.namePlaceholder')}
                  required
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>
                  <FiMail aria-hidden="true" />
                  {t('pages.contact.yourEmail')}
                </span>
                <input
                  type="email"
                  name="email"
                  className={styles.input}
                  placeholder="email@example.com"
                  required
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>{t('pages.contact.message')}</span>
                <textarea
                  name="message"
                  rows={5}
                  className={styles.textarea}
                  placeholder={t('pages.contact.messagePlaceholder')}
                  required
                />
              </label>

              {activeTab === 'feedback' && (
                <label className={styles.field}>
                  <span className={styles.label}>{t('pages.contact.yourPhone')}</span>
                  <input
                    type="tel"
                    name="phone"
                    className={styles.input}
                    placeholder="+91 ..."
                  />
                </label>
              )}

              <SimpleCaptcha
                value={captcha.value}
                onChange={captcha.setValue}
                onRefresh={captcha.refresh}
                challenge={captcha.challenge}
                error={captcha.error}
              />

              {status === 'success' && (
                <p className={styles.success} role="status">
                  {statusMessage}
                </p>
              )}

              {status === 'error' && (
                <p className={styles.error} role="alert">
                  {statusMessage}
                </p>
              )}

              <button
                type="submit"
                className={styles.submitButton}
                disabled={status === 'submitting'}
              >
                <FiSend aria-hidden="true" />
                {status === 'submitting' ? t('common.sending') : t('common.submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
