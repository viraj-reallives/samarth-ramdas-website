import { Link } from 'react-router-dom'
import { FiBook, FiGrid, FiHeadphones, FiVideo } from 'react-icons/fi'
import { useI18n } from '../i18n/useI18n'
import { TYPE_LABELS } from '../utils/collectionNav'
import styles from './ContentCard.module.css'

const TYPE_ICONS = {
  audio: FiHeadphones,
  gallery: FiGrid,
  book: FiBook,
  video: FiVideo,
}

function ContentCard({
  titleMr,
  titleEn,
  type,
  href,
  count,
  tags = [],
  index = 0,
  onClick,
  compact = false,
}) {
  const { locale, pickField, t } = useI18n()
  const TypeIcon = TYPE_ICONS[type] ?? FiBook
  const typeLabel = TYPE_LABELS[type] ?? { mr: type, en: type }
  const typeText = locale === 'mr' ? typeLabel.mr : typeLabel.en

  const inner = (
    <>
      <div className={styles.top}>
        <span className={styles.typeBadge}>
          <TypeIcon aria-hidden="true" />
          <span>{typeText}</span>
        </span>
        {typeof count === 'number' && (
          <span className={styles.count}>{t('common.countItems', { count })}</span>
        )}
      </div>

      <div className={styles.titles}>
        <p className={styles.titleMr}>{pickField({ titleMr, titleEn }, 'title')}</p>
      </div>

      {tags.length > 0 && (
        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag.id} className={styles.tag}>
              {pickField(tag, 'label')}
            </span>
          ))}
        </div>
      )}
    </>
  )

  const className = `${styles.card} ${compact ? styles.compact : ''}`

  if (onClick) {
    return (
      <button
        type="button"
        className={className}
        onClick={onClick}
        style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
      >
        {inner}
      </button>
    )
  }

  return (
    <Link
      to={href}
      className={className}
      style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
    >
      {inner}
    </Link>
  )
}

export default ContentCard
