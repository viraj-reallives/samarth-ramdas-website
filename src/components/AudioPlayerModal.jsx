import { useCallback, useEffect, useRef, useState } from 'react'
import { FiCheck, FiDownload, FiHeadphones, FiPause, FiPlay, FiX } from 'react-icons/fi'
import { downloadContentFile } from '../utils/downloadContent'
import { useI18n } from '../i18n/useI18n'
import styles from './AudioPlayerModal.module.css'

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return '0:00'
  }

  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${String(secs).padStart(2, '0')}`
}

function WaveBars({ active }) {
  return (
    <span className={active ? styles.waveActive : styles.wave} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
    </span>
  )
}

function AudioPlayerModal({ track, subtitle, onClose }) {
  const { t, pickField } = useI18n()
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasEnded, setHasEnded] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadDone, setDownloadDone] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const togglePlayback = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      if (hasEnded) {
        audio.currentTime = 0
        setHasEnded(false)
      }
      audio.play().catch(() => setIsPlaying(false))
      return
    }

    audio.pause()
  }, [hasEnded])

  useEffect(() => {
    setDownloadDone(false)
    setIsDownloading(false)
  }, [track?.slug])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !track?.fileUrl) return undefined

    setCurrentTime(0)
    setDuration(0)
    setHasEnded(false)
    audio.src = track.fileUrl
    audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))

    const onPlay = () => {
      setIsPlaying(true)
      setHasEnded(false)
    }
    const onPause = () => setIsPlaying(false)
    const onEnded = () => {
      setIsPlaying(false)
      setHasEnded(true)
    }
    const onTimeUpdate = () => setCurrentTime(audio.currentTime)
    const onLoadedMetadata = () => setDuration(audio.duration || 0)
    const onDurationChange = () => setDuration(audio.duration || 0)

    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('loadedmetadata', onLoadedMetadata)
    audio.addEventListener('durationchange', onDurationChange)

    return () => {
      audio.pause()
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
      audio.removeEventListener('durationchange', onDurationChange)
    }
  }, [track])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key === ' ' && event.target === document.body) {
        event.preventDefault()
        togglePlayback()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose, togglePlayback])

  if (!track) {
    return null
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  const handleSeek = (event) => {
    const audio = audioRef.current
    if (!audio || !duration) return

    const nextTime = Number(event.target.value)
    audio.currentTime = nextTime
    setCurrentTime(nextTime)
  }

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      await downloadContentFile({
        fileUrl: track.fileUrl,
        titleEn: track.titleEn,
        fileType: track.fileType ?? 'audio',
        slug: track.slug,
      })
      setDownloadDone(true)
      window.setTimeout(() => setDownloadDone(false), 2200)
    } finally {
      setIsDownloading(false)
    }
  }

  const statusLabel = hasEnded
    ? t('pages.player.finished')
    : isPlaying
      ? t('pages.player.nowPlaying')
      : t('pages.player.audio')

  const hintLabel = hasEnded
    ? t('pages.player.playAgain')
    : isPlaying
      ? t('pages.player.playing')
      : t('pages.player.pressPlay')

  return (
    <div className={styles.modalOverlay} onClick={onClose} role="presentation">
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="audio-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.modalMantraHeader}>
          <button
            type="button"
            className={styles.modalClose}
            onClick={onClose}
            aria-label={t('pages.player.close')}
          >
            <FiX />
          </button>
          <p className={styles.modalMantra}>
            <span>॥</span>
            <span className={styles.mantraWord}>जय</span>
            <span className={styles.mantraWord}>जय</span>
            <span className={styles.mantraWord}>रघुवीर</span>
            <span className={styles.mantraWord}>समर्थ</span>
            <span>॥</span>
          </p>
          <p className={styles.modalMantraSub}>श्री समर्थ रामदास</p>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.modalTrackHead}>
            <div
              className={`${styles.authorAvatar} ${isPlaying ? styles.authorAvatarLive : ''}`}
            >
              {track.thumbnailUrl ? (
                <img
                  key={`${track.slug}-${track.thumbnailUrl}`}
                  src={track.thumbnailUrl}
                  alt=""
                  className={styles.authorAvatarImage}
                />
              ) : (
                <span className={styles.avatarFallback} aria-hidden="true">
                  <FiHeadphones />
                </span>
              )}
            </div>
            <div className={styles.modalTrackInfo}>
              <span
                className={`${styles.modalBadge} ${isPlaying ? styles.modalBadgeLive : ''} ${hasEnded ? styles.modalBadgeEnded : ''}`}
              >
                {isPlaying && <span className={styles.liveDot} aria-hidden="true" />}
                {statusLabel}
              </span>
              <h2 id="audio-modal-title" className={styles.modalTitleMr}>
                {pickField(track, 'title')}
              </h2>
              {subtitle && <p className={styles.modalSubtitle}>{subtitle}</p>}
            </div>
          </div>

          <div
            className={`${styles.modalPlayer} ${isPlaying ? styles.modalPlayerActive : ''} ${hasEnded ? styles.modalPlayerEnded : ''}`}
          >
            <div className={styles.progressWrap}>
              <input
                type="range"
                className={styles.progressInput}
                min={0}
                max={duration || 0}
                step={0.1}
                value={Math.min(currentTime, duration || 0)}
                onChange={handleSeek}
                aria-label={t('pages.player.seek')}
                style={{ '--progress': `${progress}%` }}
              />
              <div className={styles.timeRow}>
                <span>{formatTime(currentTime)}</span>
                <span className={styles.timeRemaining}>
                  {hasEnded ? t('pages.player.done') : `-${formatTime(Math.max(duration - currentTime, 0))}`}
                </span>
              </div>
            </div>

            <div className={styles.controlsRow}>
              <button
                type="button"
                className={isPlaying ? styles.modalPlayBtnActive : styles.modalPlayBtn}
                onClick={togglePlayback}
                aria-label={
                  hasEnded
                    ? `${t('pages.player.playAgain')} ${pickField(track, 'title')}`
                    : isPlaying
                      ? `${t('common.listen')} ${pickField(track, 'title')}`
                      : `${t('common.play')} ${pickField(track, 'title')}`
                }
              >
                {hasEnded ? <FiPlay /> : isPlaying ? <FiPause /> : <FiPlay />}
              </button>

              <div className={styles.playerMeta}>
                <WaveBars active={isPlaying} />
                <p className={styles.playerHint}>{hintLabel}</p>
              </div>

              <button
                type="button"
                className={`${styles.modalDownloadBtn} ${downloadDone ? styles.modalDownloadDone : ''}`}
                onClick={handleDownload}
                disabled={isDownloading || downloadDone}
              >
                {downloadDone ? <FiCheck /> : <FiDownload />}
                <span>
                  {downloadDone ? t('common.saved') : isDownloading ? t('common.saving') : t('common.download')}
                </span>
              </button>
            </div>
          </div>

          <p className={styles.modalFooterHint}>
            <kbd>Space</kbd> {t('pages.player.spaceHint')}
          </p>
        </div>

        <audio ref={audioRef} preload="metadata" />
      </div>
    </div>
  )
}

export default AudioPlayerModal
