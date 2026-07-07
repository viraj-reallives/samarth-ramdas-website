import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import { useI18n } from '../i18n/useI18n'
import styles from './SearchBar.module.css'

function SearchBar({
  placeholderMr,
  placeholderEn,
  defaultValue = '',
  className = '',
  large = false,
  onSearch,
}) {
  const navigate = useNavigate()
  const { t, pick } = useI18n()
  const [query, setQuery] = useState(defaultValue)
  const placeholder = pick(
    placeholderMr ?? t('common.searchLiterature'),
    placeholderEn ?? t('common.searchLiterature'),
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmed = query.trim()
    if (onSearch) {
      onSearch(trimmed)
      return
    }
    const params = new URLSearchParams()
    if (trimmed) params.set('q', trimmed)
    navigate(`/browse${params.toString() ? `?${params.toString()}` : ''}`)
  }

  return (
    <form
      className={`${styles.form} ${large ? styles.formLarge : ''} ${className}`.trim()}
      onSubmit={handleSubmit}
      role="search"
    >
      <label className={styles.label}>
        <span className={styles.srOnly}>{placeholder}</span>
        <FiSearch className={styles.icon} aria-hidden="true" />
        <input
          type="search"
          className={styles.input}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
        />
      </label>
      <button type="submit" className={styles.submit}>
        {t('common.search')}
      </button>
    </form>
  )
}

export default SearchBar
