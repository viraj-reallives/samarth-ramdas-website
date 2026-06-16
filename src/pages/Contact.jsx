import { useEffect, useId, useState } from 'react'
import { FiMail, FiMapPin, FiSend, FiUpload, FiUser } from 'react-icons/fi'
import { contactInfo } from '../data/navigation'
import styles from './Contact.module.css'

function Contact() {
  const [activeTab, setActiveTab] = useState('participation')
  const [submitted, setSubmitted] = useState(false)
  const formId = useId()

  useEffect(() => {
    document.title = 'संपर्क – श्री समर्थ रामदास'
    return () => {
      document.title = 'श्री समर्थ रामदास - श्री रामदासांचे साहित्य'
    }
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
    window.setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <div className={styles.page}>
      <div className={styles.banner}>
        <img
          src="/assets/inner-banner.png"
          alt="|| जय जय रघुवीर समर्थ ||"
          className={styles.bannerImage}
        />
      </div>

      <div className={styles.content}>
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
                onClick={() => setActiveTab('participation')}
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
                onClick={() => setActiveTab('feedback')}
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
              onSubmit={handleSubmit}
            >
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
                <span className={styles.label}>संदेश (ऐच्छिक) / Message (optional)</span>
                <textarea
                  name="message"
                  rows={5}
                  className={styles.textarea}
                  placeholder="आपला संदेश लिहा / Write your message..."
                />
              </label>

              {activeTab === 'participation' ? (
                <label className={styles.field}>
                  <span className={styles.label}>
                    <FiUpload aria-hidden="true" />
                    फाईल (ऐच्छिक) / File (optional)
                  </span>
                  <input type="file" name="file" className={styles.fileInput} />
                </label>
              ) : (
                <>
                  <label className={styles.field}>
                    <span className={styles.label}>दूरध्वनी / Your phone</span>
                    <input
                      type="tel"
                      name="phone"
                      className={styles.input}
                      placeholder="+91 ..."
                    />
                  </label>

                  <label className={styles.checkboxField}>
                    <input type="checkbox" name="updates" className={styles.checkbox} />
                    <span>मला वेबसाइट अपडेट्स मिळवायचे आहेत / I would like to receive website updates</span>
                  </label>
                </>
              )}

              {submitted && (
                <p className={styles.success} role="status">
                  धन्यवाद! आपला संदेश मिळाला. / Thank you! Your message has been received.
                </p>
              )}

              <button type="submit" className={styles.submitButton}>
                <FiSend aria-hidden="true" />
                पाठवा / Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
