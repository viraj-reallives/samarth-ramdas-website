import { useCallback, useMemo, useState } from 'react'
import { FiRefreshCw, FiShield } from 'react-icons/fi'
import { useI18n } from '../i18n/useI18n'
import styles from './SimpleCaptcha.module.css'

function createChallenge() {
  const a = Math.floor(Math.random() * 9) + 1
  const b = Math.floor(Math.random() * 9) + 1
  return { a, b, answer: a + b }
}

function SimpleCaptcha({ value, onChange, onRefresh, challenge, error }) {
  const { t } = useI18n()

  return (
    <div className={styles.captcha}>
      <span className={styles.label}>
        <FiShield aria-hidden="true" />
        {t('pages.captcha.securityCheck')}
      </span>

      <div className={styles.row}>
        <span className={styles.question} aria-live="polite">
          {challenge.a} + {challenge.b} = ?
        </span>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          className={error ? styles.inputError : styles.input}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={t('pages.captcha.answer')}
          aria-label="Captcha answer"
          autoComplete="off"
        />
        <button
          type="button"
          className={styles.refresh}
          onClick={onRefresh}
          aria-label={t('pages.captcha.refresh')}
        >
          <FiRefreshCw aria-hidden="true" />
        </button>
      </div>

      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  )
}

export function useSimpleCaptcha() {
  const { t } = useI18n()
  const [challenge, setChallenge] = useState(createChallenge)
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  const refresh = useCallback(() => {
    setChallenge(createChallenge())
    setValue('')
    setError('')
  }, [])

  const isValid = useMemo(() => {
    const trimmed = value.trim()
    if (!trimmed) return false
    return Number(trimmed) === challenge.answer
  }, [value, challenge.answer])

  const validate = useCallback(() => {
    const trimmed = value.trim()
    if (!trimmed) {
      setError(t('pages.captcha.enterAnswer'))
      return false
    }
    if (Number(trimmed) !== challenge.answer) {
      setError(t('pages.captcha.wrongAnswer'))
      return false
    }
    setError('')
    return true
  }, [value, challenge.answer, t])

  return {
    challenge,
    value,
    setValue,
    error,
    isValid,
    validate,
    refresh,
  }
}

export default SimpleCaptcha
