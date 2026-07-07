import { useState } from 'react'
import { downloadContentFile } from '../utils/downloadContent'
import { useI18n } from '../i18n/useI18n'
import cardStyles from '../pages/SubjectAuthor.module.css'
import styles from './DownloadContentCards.module.css'

function Mp3Icon() {
  return (
    <svg
      className={cardStyles.mp3Icon}
      viewBox="0 0 64 80"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M8 4h32l16 16v56a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4z"
        fill="#ffffff"
        stroke="#e8661a"
        strokeWidth="2"
      />
      <path d="M40 4v16h16" fill="none" stroke="#e8661a" strokeWidth="2" />
      <text x="32" y="48" textAnchor="middle" fontSize="13" fontWeight="700" fill="#e8661a">
        MP3
      </text>
      <path d="M24 58h6v8h-6zM34 54h6v12h-6z" fill="#e8661a" />
      <path d="M50 8l6 4v6l-6-4z" fill="#c41e1e" stroke="#c41e1e" strokeWidth="1" />
      <path
        d="M53 14v8M50 17h6"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function PdfIcon() {
  return (
    <svg
      className={cardStyles.pdfIcon}
      viewBox="0 0 64 80"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M8 4h32l16 16v56a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4z"
        fill="#ffffff"
        stroke="#333333"
        strokeWidth="2"
      />
      <path d="M40 4v16h16" fill="none" stroke="#333333" strokeWidth="2" />
      <text x="32" y="52" textAnchor="middle" fontSize="14" fontWeight="700" fill="#c41e1e">
        PDF
      </text>
      <path
        d="M32 58v12M26 64l6 6 6-6"
        fill="none"
        stroke="#c41e1e"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function AudioDownloadCard({ item, onListen }) {
  const { t, pickField } = useI18n()
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    if (!item.fileUrl || isDownloading) return
    setIsDownloading(true)
    try {
      await downloadContentFile({
        fileUrl: item.fileUrl,
        titleEn: item.titleEn,
        fileType: item.fileType ?? 'audio',
        slug: item.slug,
      })
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <article className={cardStyles.downloadCard}>
      <Mp3Icon />
      <div className={cardStyles.cardText}>
        <p className={cardStyles.cardTitleMr}>{pickField(item, 'title')}</p>
      </div>
      {item.fileUrl ? (
        <div className={styles.cardActions}>
          <button
            type="button"
            className={styles.btnListen}
            onClick={() => onListen(item)}
          >
            {t('common.listen')}
          </button>
          <button
            type="button"
            className={styles.btnDownload}
            onClick={handleDownload}
            disabled={isDownloading}
          >
            {isDownloading ? t('common.saving') : t('common.download')}
          </button>
        </div>
      ) : (
        <span className={styles.btnUnavailable}>{t('common.unavailable')}</span>
      )}
    </article>
  )
}

export function LiteratureDownloadCard({ item }) {
  const { t, pickField } = useI18n()
  const [isDownloading, setIsDownloading] = useState(false)

  const handleRead = () => {
    if (!item.fileUrl) return
    window.open(item.fileUrl, '_blank', 'noopener,noreferrer')
  }

  const handleDownload = async () => {
    if (!item.fileUrl || isDownloading) return
    setIsDownloading(true)
    try {
      await downloadContentFile({
        fileUrl: item.fileUrl,
        titleEn: item.titleEn,
        fileType: item.fileType ?? 'pdf',
        slug: item.slug,
      })
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <article className={cardStyles.downloadCard}>
      <PdfIcon />
      <div className={cardStyles.cardText}>
        <p className={cardStyles.cardTitleMr}>{pickField(item, 'title')}</p>
      </div>
      {item.fileUrl ? (
        <div className={styles.cardActions}>
          <button
            type="button"
            className={styles.btnRead}
            onClick={handleRead}
          >
            {t('common.read')}
          </button>
          <button
            type="button"
            className={styles.btnDownload}
            onClick={handleDownload}
            disabled={isDownloading}
          >
            {isDownloading ? t('common.saving') : t('common.download')}
          </button>
        </div>
      ) : (
        <span className={styles.btnUnavailable}>{t('common.unavailable')}</span>
      )}
    </article>
  )
}
