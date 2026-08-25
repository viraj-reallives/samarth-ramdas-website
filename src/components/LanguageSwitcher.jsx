import { useEffect, useRef, useState } from 'react'
import { FiChevronDown, FiGlobe } from 'react-icons/fi'
import { useLocation, useNavigate } from 'react-router-dom'
import { privacyPolicyPath } from '../i18n/translate'
import { useI18n } from '../i18n/useI18n'
import styles from './LanguageSwitcher.module.css'

const OPTIONS = [
  { id: 'mr', labelKey: 'language.marathi' },
  { id: 'en', labelKey: 'language.english' },
]

function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n()
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  const current = OPTIONS.find((option) => option.id === locale) ?? OPTIONS[0]

  useEffect(() => {
    if (!open) return undefined

    const handlePointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [open])

  return (
    <div ref={rootRef} className={styles.root}>
      <button
        type="button"
        className={`${styles.trigger} ${open ? styles.triggerOpen : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('language.label')}
        onClick={() => setOpen((value) => !value)}
      >
        <FiGlobe className={styles.icon} aria-hidden="true" />
        <span className={styles.current}>{t(current.labelKey)}</span>
        <FiChevronDown className={styles.chevron} aria-hidden="true" />
      </button>

      {open ? (
        <ul className={styles.menu} role="listbox" aria-label={t('language.label')}>
          {OPTIONS.map((option) => {
            const selected = option.id === locale
            return (
              <li key={option.id} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  className={`${styles.option} ${selected ? styles.optionActive : ''}`}
                  onClick={() => {
                    setLocale(option.id)
                    setOpen(false)
                    if (location.pathname.startsWith('/privacy-policy')) {
                      navigate(privacyPolicyPath(option.id), { replace: true })
                    }
                  }}
                >
                  <span className={styles.optionLabel}>{t(option.labelKey)}</span>
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}

export default LanguageSwitcher
