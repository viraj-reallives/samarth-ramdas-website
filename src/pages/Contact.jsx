import { useEffect, useId, useRef, useState } from 'react'
import InnerBanner from '../components/InnerBanner'
import pageUi from '../styles/pageUi.module.css'
import { FiMail, FiMapPin, FiSend, FiUpload, FiUser } from 'react-icons/fi'
import {
  WEB3FORMS_ACCESS_KEY,
  WEB3FORMS_ENDPOINT,
  WEB3FORMS_MAX_FILE_SIZE_MB,
} from '../config/web3forms'
import { contactInfo } from '../data/navigation'
import styles from './Contact.module.css'

const FORM_SUBJECT = 'This is update from samarthramdas400.in website'

const MAX_FILE_SIZE_BYTES = WEB3FORMS_MAX_FILE_SIZE_MB * 1024 * 1024

function Contact() {
  const [activeTab, setActiveTab] = useState('participation')
  const [status, setStatus] = useState('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const [selectedFileName, setSelectedFileName] = useState('')
  const fileInputRef = useRef(null)
  const formId = useId()

  useEffect(() => {
    document.title = 'संपर्क – श्री समर्थ रामदास'
    return () => {
      document.title = 'श्री समर्थ रामदास - श्री रामदासांचे साहित्य'
    }
  }, [])

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    setSelectedFileName('')
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) {
      setSelectedFileName('')
      return
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setStatus('error')
      setStatusMessage(
        `फाईल ${WEB3FORMS_MAX_FILE_SIZE_MB} MB पेक्षा लहान असावी. / File must be smaller than ${WEB3FORMS_MAX_FILE_SIZE_MB} MB.`,
      )
      event.target.value = ''
      setSelectedFileName('')
      return
    }

    setStatus('idle')
    setStatusMessage('')
    setSelectedFileName(file.name)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
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
        'संदेश पाठवता आला नाही. कृपया पुन्हा प्रयत्न करा. / Could not send your message. Please try again.'

      if (response.ok && success) {
        const hadFile = Boolean(fileInputRef.current?.files?.[0])
        setStatus('success')
        setStatusMessage(
          hadFile
            ? 'धन्यवाद! आपली माहिती आणि फाईल ई-मेलवर पाठवली गेली. / Thank you! Your details and file have been emailed.'
            : 'धन्यवाद! आपली माहिती पाठवली गेली. / Thank you! Your details have been sent.',
        )
        form.reset()
        resetFileInput()
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
      setStatusMessage(
        'नेटवर्क त्रुटी. कृपया पुन्हा प्रयत्न करा. / Network error. Please try again.',
      )
    }
  }

  return (
    <div className={styles.page}>
      <InnerBanner contentId="contact-content" />

      <div className={`${styles.content} ${pageUi.content}`} id="contact-content">
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>संपर्क / Contact</h1>
          <p className={styles.pageIntro}>
            खालील पत्त्यावर संपर्क करा किंवा फॉर्म भरून आम्हाला लिहा.
          </p>
        </header>

        <div className={styles.layout}>
          <aside className={styles.infoColumn}>
            <h2 className={styles.infoHeading}>संपर्क माहिती / Contact Details</h2>
            {contactInfo.map((block) => (
              <div key={block.title} className={styles.infoCard}>
                <span className={styles.infoIcon} aria-hidden="true">
                  <FiMapPin />
                </span>
                <div>
                  <p className={styles.infoTitle}>{block.title}</p>
                  {block.lines.map((line) => (
                    <p key={line} className={styles.infoLine}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
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
                  resetFileInput()
                }}
              >
                <span className={styles.tabMr}>सहभाग</span>
                <span className={styles.tabEn}>Participation</span>
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
                  resetFileInput()
                }}
              >
                <span className={styles.tabMr}>प्रतिक्रिया</span>
                <span className={styles.tabEn}>Feedback</span>
              </button>
            </div>

            <form
              id={`${formId}-panel`}
              role="tabpanel"
              aria-labelledby={`${formId}-tab-${activeTab}`}
              className={styles.form}
              action={WEB3FORMS_ENDPOINT}
              method="POST"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
              <input type="hidden" name="subject" value={FORM_SUBJECT} />

              <p className={styles.formHint}>
                {activeTab === 'participation'
                  ? 'सहभागासाठी आपली माहिती भरा. / Fill in your details to participate.'
                  : 'आपली प्रतिक्रिया किंवा सूचना पाठवा. / Send your feedback or suggestions.'}
              </p>

              <label className={styles.field}>
                <span className={styles.label}>
                  <FiUser aria-hidden="true" />
                  आपले नाव / Your name
                </span>
                <input
                  type="text"
                  name="name"
                  className={styles.input}
                  placeholder="नाव लिहा / Enter your name"
                  required
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>
                  <FiMail aria-hidden="true" />
                  ई-मेल / Your email
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
                <span className={styles.label}>संदेश / Message</span>
                <textarea
                  name="message"
                  rows={5}
                  className={styles.textarea}
                  placeholder="आपला संदेश लिहा / Write your message..."
                  required
                />
              </label>

              {activeTab === 'participation' ? (
                <label className={styles.field}>
                  <span className={styles.label}>
                    <FiUpload aria-hidden="true" />
                    फाईल (ऐच्छिक) / File (optional)
                  </span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    name="attachment"
                    className={styles.fileInput}
                    accept="image/*,.pdf,.doc,.docx,.txt"
                    onChange={handleFileChange}
                  />
                  <span className={styles.fileHint}>
                    {selectedFileName
                      ? `निवडलेली फाईल: ${selectedFileName} / Selected: ${selectedFileName}`
                      : `जास्तीत जास्त ${WEB3FORMS_MAX_FILE_SIZE_MB} MB — ई-मेलमध्ये जोडली जाईल / Max ${WEB3FORMS_MAX_FILE_SIZE_MB} MB, sent as email attachment`}
                  </span>
                </label>
              ) : (
                <label className={styles.field}>
                  <span className={styles.label}>दूरध्वनी / Your phone</span>
                  <input
                    type="tel"
                    name="phone"
                    className={styles.input}
                    placeholder="+91 ..."
                  />
                </label>
              )}

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
                {status === 'submitting' ? 'पाठवत आहे... / Sending...' : 'पाठवा / Submit'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
