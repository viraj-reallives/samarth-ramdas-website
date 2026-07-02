import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import styles from './SearchBar.module.css'

function SearchBar({
  placeholderMr = 'साहित्य शोधा…',
  placeholderEn = 'Search literature…',
  defaultValue = '',
  className = '',
  large = false,
  onSearch,
}) {
  const navigate = useNavigate()
  const [query, setQuery] = useState(defaultValue)

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmed = query.trim()
    // TODO(search): wire to real full-text search API when available
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
        <span className={styles.srOnly}>{placeholderMr} / {placeholderEn}</span>
        <FiSearch className={styles.icon} aria-hidden="true" />
        <input
          type="search"
          className={styles.input}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={`${placeholderMr} / ${placeholderEn}`}
        />
      </label>
      <button type="submit" className={styles.submit}>
        शोधा / Search
      </button>
    </form>
  )
}

export default SearchBar
