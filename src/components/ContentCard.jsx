import { Link } from 'react-router-dom'
import { FiBook, FiGrid, FiHeadphones, FiVideo } from 'react-icons/fi'
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
  const TypeIcon = TYPE_ICONS[type] ?? FiBook
  const typeLabel = TYPE_LABELS[type] ?? { mr: type, en: type }

  const inner = (
    <>
      <div className={styles.top}>
        <span className={styles.typeBadge}>
          <TypeIcon aria-hidden="true" />
          <span>{typeLabel.mr}</span>
          <span className={styles.typeEn}>{typeLabel.en}</span>
        </span>
        {typeof count === 'number' && (
          <span className={styles.count}>{count} items</span>
        )}
      </div>

      <div className={styles.titles}>
        <p className={styles.titleMr}>{titleMr}</p>
        <p className={styles.titleEn}>{titleEn}</p>
      </div>

      {tags.length > 0 && (
        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag.id} className={styles.tag}>
              {tag.labelMr}
              <span className={styles.tagEn}>{tag.labelEn}</span>
            </span>
          ))}
        </div>
      )}
    </>
  )

  const className = `${styles.card} ${compact ? styles.compact : ''} ${onClick ? styles.cardButton : ''}`
  const style = { animationDelay: `${Math.min(index, 8) * 40}ms` }

  if (onClick) {
    return (
      <button type="button" className={className} style={style} onClick={onClick}>
        {inner}
      </button>
    )
  }

  return (
    <Link to={href} className={className} style={style}>
      {inner}
    </Link>
  )
}

export default ContentCard
