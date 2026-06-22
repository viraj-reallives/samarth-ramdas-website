import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import InnerBanner from '../components/InnerBanner'
import pageUi from '../styles/pageUi.module.css'
import { FiCheck, FiCopy, FiDownload, FiMail, FiPause, FiPlay, FiSearch, FiShare2, FiX } from 'react-icons/fi'
import { FaFacebookF, FaTelegram, FaWhatsapp } from 'react-icons/fa'
import { downloadRingtone, getRingtoneAudioUrl, getRingtoneAuthor, ringtones } from '../data/ringtones'
import styles from './Ringtones.module.css'

function buildShareMessage(ringtone, audioUrl) {
  return `श्री समर्थ रामदास – ${ringtone.titleMr} (${ringtone.titleEn})\n${audioUrl}`
}

function buildShareLinks(ringtone, audioUrl) {
  const message = buildShareMessage(ringtone, audioUrl)
  const title = `श्री समर्थ रामदास – ${ringtone.titleMr}`

  return {
    message,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(audioUrl)}&text=${encodeURIComponent(title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(audioUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(`Ringtone: ${ringtone.titleEn}`)}&body=${encodeURIComponent(message)}`,
  }
}

const canNativeShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function'

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

function RingtoneCard({ ringtone, onOpenPlayer, index }) {
  return (
    <article
      className={`${styles.card} ${pageUi.cardAnim}`}
      style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
    >
      <div className={styles.cardIcon} aria-hidden="true">
        <FiPlay />
      </div>

      <div className={styles.cardBody}>
        <p className={styles.titleMr}>{ringtone.titleMr}</p>
        <p className={styles.titleEn}>{ringtone.titleEn}</p>
      </div>

      <button
        type="button"
        className={styles.playBtn}
        onClick={() => onOpenPlayer(ringtone)}
        aria-label={`Play ${ringtone.titleEn}`}
      >
        <FiPlay />
        Play
      </button>
    </article>
  )
}

function RingtonePlayerModal({ ringtone, onClose }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasEnded, setHasEnded] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadDone, setDownloadDone] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)
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
    setLinkCopied(false)
    setIsDownloading(false)
  }, [ringtone?.slug])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !ringtone) return undefined

    setCurrentTime(0)
    setDuration(0)
    setHasEnded(false)
    audio.src = getRingtoneAudioUrl(ringtone.slug)
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
  }, [ringtone])

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

  if (!ringtone) {
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
      await downloadRingtone(ringtone)
      setDownloadDone(true)
      window.setTimeout(() => setDownloadDone(false), 2200)
    } finally {
      setIsDownloading(false)
    }
  }

  const audioShareUrl = getRingtoneAudioUrl(ringtone.slug)
  const shareLinks = buildShareLinks(ringtone, audioShareUrl)
  const author = getRingtoneAuthor(ringtone)
  const authorImage = author?.image ?? '/assets/authors/other-authors.png'
  const showAuthorLine = author && ringtone.slug !== 'acharya-dharmendraji'

  const openShareWindow = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleNativeShare = async () => {
    if (!canNativeShare) return

    try {
      await navigator.share({
        title: `श्री समर्थ रामदास – ${ringtone.titleMr}`,
        text: shareLinks.message,
        url: audioShareUrl,
      })
    } catch {
      // User cancelled or share failed silently.
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(audioShareUrl)
      setLinkCopied(true)
      window.setTimeout(() => setLinkCopied(false), 2200)
    } catch {
      const input = document.createElement('input')
      input.value = audioShareUrl
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      setLinkCopied(true)
      window.setTimeout(() => setLinkCopied(false), 2200)
    }
  }

  const statusLabel = hasEnded
    ? 'संपले / Finished'
    : isPlaying
      ? 'आता वाजत आहे / Now Playing'
      : 'रिंगटोन / Ringtone'

  const hintLabel = hasEnded
    ? 'पुन्हा ऐका / Play again'
    : isPlaying
      ? 'ऐकत राहा / Listening...'
      : 'प्ले दाबा / Press play'

  return (
    <div className={styles.modalOverlay} onClick={onClose} role="presentation">
      <div
        className={`${styles.modal} ${isPlaying ? styles.modalPlaying : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ringtone-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.modalMantraHeader}>
          <button
            type="button"
            className={styles.modalClose}
            onClick={onClose}
            aria-label="Close player"
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
          <div className={styles.modalMantraShine} aria-hidden="true" />
          <div className={styles.modalMantraGlow} aria-hidden="true" />
        </div>

        <div className={styles.modalBody}>
          <div className={styles.modalTrackHead}>
            <div
              className={`${styles.authorAvatar} ${isPlaying ? styles.authorAvatarLive : ''}`}
            >
              <img
                key={`${ringtone.slug}-${authorImage}`}
                src={authorImage}
                alt={author?.titleMr ?? 'Ringtone author'}
                className={styles.authorAvatarImage}
              />
            </div>
            <div className={styles.modalTrackInfo}>
              <span
                className={`${styles.modalBadge} ${isPlaying ? styles.modalBadgeLive : ''} ${hasEnded ? styles.modalBadgeEnded : ''}`}
              >
                {isPlaying && <span className={styles.liveDot} aria-hidden="true" />}
                {statusLabel}
              </span>
              <h2 id="ringtone-modal-title" className={styles.modalTitleMr}>
                {ringtone.titleMr}
              </h2>
              <p className={styles.modalTitleEn}>{ringtone.titleEn}</p>
              {showAuthorLine && (
                <p className={styles.modalAuthorLine}>
                  {author.titleMr}
                  <span className={styles.modalAuthorSep}> · </span>
                  <span className={styles.modalAuthorEn}>{author.titleEn}</span>
                </p>
              )}
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
                aria-label="Seek ringtone"
                style={{ '--progress': `${progress}%` }}
              />
              <div className={styles.timeRow}>
                <span>{formatTime(currentTime)}</span>
                <span className={styles.timeRemaining}>
                  {hasEnded ? 'Done' : `-${formatTime(Math.max(duration - currentTime, 0))}`}
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
                    ? `Play again ${ringtone.titleEn}`
                    : isPlaying
                      ? `Pause ${ringtone.titleEn}`
                      : `Play ${ringtone.titleEn}`
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
                  {downloadDone ? 'Saved!' : isDownloading ? 'Saving...' : 'Download'}
                </span>
              </button>
            </div>
          </div>

          <div className={styles.shareSection}>
            <p className={styles.shareLabel}>ऑडिओ लिंक शेअर करा / Share audio link</p>

            <div className={styles.sharePlatforms}>
              <button
                type="button"
                className={`${styles.sharePlatformBtn} ${styles.shareWhatsapp}`}
                onClick={() => openShareWindow(shareLinks.whatsapp)}
                aria-label="Share on WhatsApp"
              >
                <FaWhatsapp />
                <span>WhatsApp</span>
              </button>

              <button
                type="button"
                className={`${styles.sharePlatformBtn} ${styles.shareTelegram}`}
                onClick={() => openShareWindow(shareLinks.telegram)}
                aria-label="Share on Telegram"
              >
                <FaTelegram />
                <span>Telegram</span>
              </button>

              <button
                type="button"
                className={`${styles.sharePlatformBtn} ${styles.shareFacebook}`}
                onClick={() => openShareWindow(shareLinks.facebook)}
                aria-label="Share on Facebook"
              >
                <FaFacebookF />
                <span>Facebook</span>
              </button>

              <button
                type="button"
                className={`${styles.sharePlatformBtn} ${styles.shareEmail}`}
                onClick={() => {
                  window.location.href = shareLinks.email
                }}
                aria-label="Share by email"
              >
                <FiMail />
                <span>Email</span>
              </button>

              {canNativeShare && (
                <button
                  type="button"
                  className={`${styles.sharePlatformBtn} ${styles.shareMore}`}
                  onClick={handleNativeShare}
                  aria-label="Share to other apps"
                >
                  <FiShare2 />
                  <span>More</span>
                </button>
              )}
            </div>

            <div className={styles.shareRow}>
              <input
                type="text"
                readOnly
                value={audioShareUrl}
                className={styles.shareInput}
                aria-label="Ringtone audio link"
                onFocus={(event) => event.target.select()}
              />
              <button
                type="button"
                className={`${styles.shareCopyBtn} ${linkCopied ? styles.shareCopyDone : ''}`}
                onClick={handleCopyLink}
                aria-label="Copy audio link"
              >
                {linkCopied ? <FiCheck /> : <FiCopy />}
                <span>{linkCopied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <p className={styles.modalFooterHint}>
            <kbd>Space</kbd> प्ले/पॉज / Play or pause
          </p>
        </div>

        <audio ref={audioRef} preload="auto" />
      </div>
    </div>
  )
}

function Ringtones() {
  const [search, setSearch] = useState('')
  const [modalRingtone, setModalRingtone] = useState(null)

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return ringtones
    return ringtones.filter(
      ({ titleMr, titleEn }) =>
        titleMr.toLowerCase().includes(query) || titleEn.toLowerCase().includes(query),
    )
  }, [search])

  useEffect(() => {
    document.title = 'रिंगटोन्स – श्री समर्थ रामदास'
    return () => {
      document.title = 'श्री समर्थ रामदास - श्री रामदासांचे साहित्य'
    }
  }, [])

  return (
    <div className={styles.page}>
      <InnerBanner contentId="ringtones-content" />

      <div className={`${styles.content} ${pageUi.content}`} id="ringtones-content">
        <h1 className={styles.pageTitle}>रिंगटोन्स / Ringtones</h1>
        <p className={styles.pageIntro}>
          मनाचे श्लोक रिंगटोन्स ऐका आणि डाउनलोड करा.
          <span className={styles.pageIntroEn}>
            Listen and download Manache Shlok ringtones for your mobile.
          </span>
        </p>

        <div className={styles.toolbar}>
          <label className={styles.searchWrap}>
            <FiSearch className={styles.searchIcon} aria-hidden="true" />
            <input
              type="search"
              className={styles.searchInput}
              placeholder="शोधा / Search ringtones..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <span className={styles.countBadge}>
            {filtered.length} रिंगटोन्स · {filtered.length} Ringtones
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className={pageUi.empty}>
            <p>कोणतेही रिंगटोन्स सापडले नाहीत.</p>
            <p className={pageUi.emptySub}>No ringtones found. Try a different search.</p>
            <button type="button" className={pageUi.emptyReset} onClick={() => setSearch('')}>
              सर्व रिंगटोन्स पहा / View all ringtones
            </button>
          </div>
        ) : (
          <div className={styles.grid} key={search}>
            {filtered.map((ringtone, index) => (
              <RingtoneCard
                key={ringtone.slug}
                ringtone={ringtone}
                index={index}
                onOpenPlayer={setModalRingtone}
              />
            ))}
          </div>
        )}
      </div>

      {modalRingtone && (
        <RingtonePlayerModal
          key={modalRingtone.slug}
          ringtone={modalRingtone}
          onClose={() => setModalRingtone(null)}
        />
      )}
    </div>
  )
}

export default Ringtones
