import { FiX } from 'react-icons/fi'
import styles from './FilterChips.module.css'

function FilterChips({ facets = [], activeFilters = [], onFacetClick, onRemoveFilter }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.facetRow} role="group" aria-label="Filters">
        {facets.map((facet) => (
          <button
            key={facet.id}
            type="button"
            className={`${styles.facetChip} ${facet.disabled ? styles.facetDisabled : ''} ${
              facet.active ? styles.facetActive : ''
            }`}
            disabled={facet.disabled}
            title={
              facet.comingSoon
                ? `${facet.labelMr} / ${facet.labelEn} — Coming soon`
                : `${facet.labelMr} / ${facet.labelEn}`
            }
            onClick={() => !facet.disabled && onFacetClick?.(facet.id)}
          >
            <span className={styles.chipMr}>{facet.labelMr}</span>
            <span className={styles.chipEn}>{facet.labelEn}</span>
            {facet.comingSoon && <span className={styles.comingSoon}>लवकरच</span>}
          </button>
        ))}
      </div>

      {activeFilters.length > 0 && (
        <div className={styles.activeRow} aria-label="Active filters">
          {activeFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={styles.activeChip}
              onClick={() => onRemoveFilter?.(filter.id)}
              aria-label={`Remove filter ${filter.labelEn}`}
            >
              <span>{filter.labelMr}</span>
              <span className={styles.activeSep}>/</span>
              <span className={styles.activeEn}>{filter.labelEn}</span>
              <FiX className={styles.removeIcon} aria-hidden="true" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default FilterChips
