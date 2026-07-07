import { FiX } from 'react-icons/fi'
import { useI18n } from '../i18n/useI18n'
import styles from './FilterChips.module.css'

function FilterChips({ facets = [], activeFilters = [], onFacetClick, onRemoveFilter }) {
  const { pickField, t } = useI18n()

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
                ? `${pickField(facet, 'label')} — ${t('common.comingSoon')}`
                : pickField(facet, 'label')
            }
            onClick={() => !facet.disabled && onFacetClick?.(facet.id)}
          >
            <span className={styles.chipMr}>{pickField(facet, 'label')}</span>
            {facet.comingSoon && <span className={styles.comingSoon}>{t('common.comingSoon')}</span>}
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
              aria-label={`Remove filter ${pickField(filter, 'label')}`}
            >
              <span>{pickField(filter, 'label')}</span>
              <FiX className={styles.removeIcon} aria-hidden="true" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default FilterChips
