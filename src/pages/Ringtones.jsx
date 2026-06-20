import { useEffect, useMemo, useRef, useState } from 'react'
import InnerBanner from '../components/InnerBanner'
import pageUi from '../styles/pageUi.module.css'
import { FiDownload, FiPause, FiPlay, FiSearch } from 'react-icons/fi'
import { downloadRingtone, getRingtoneAudioUrl, ringtones } from '../data/ringtones'
import styles from './Ringtones.module.css'

function WaveBars({ active }) {
  return (
    <span className={active ? styles.waveActive : styles.wave} aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  )
}

function RingtoneCard({ ringtone, isPlaying, isActive, onPlay, onPause, onDownload, index }) {
  const cardClass = isActive ? styles.cardActive : styles.card
  return (
    <article
      className={`${cardClass} ${pageUi.cardAnim}`}
      style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
    >
      <button
        type="button"
        className={isPlaying ? styles.playBtnActive : styles.playBtn}
        onClick={isPlaying ? onPause : onPlay}
        aria-label={isPlaying ? `Pause ${ringtone.titleEn}` : `Play ${ringtone.titleEn}`}
      >
        {isPlaying ? <FiPause /> : <FiPlay />}
      </button>

      <div className={styles.cardBody}>
        <p className={styles.titleMr}>{ringtone.titleMr}</p>
        <p className={styles.titleEn}>{ringtone.titleEn}</p>
        {isActive && <WaveBars active={isPlaying} />}
      </div>

      <button
        type="button"
        className={styles.downloadBtn}
        onClick={() => onDownload(ringtone)}
        aria-label={`Download ${ringtone.titleEn}`}
      >
        <FiDownload />
        Download
      </button>
    </article>
  )
}

function Ringtones() {
  const [search, setSearch] = useState('')
  const [playingSlug, setPlayingSlug] = useState(null)
  const [activeSlug, setActiveSlug] = useState(null)
  const audioRef = useRef(null)

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return ringtones
    return ringtones.filter(
      ({ titleMr, titleEn }) =>
        titleMr.toLowerCase().includes(query) || titleEn.toLowerCase().includes(query),
    )
  }, [search])

  const activeRingtone = ringtones.find((r) => r.slug === activeSlug)

  const playRingtone = (ringtone) => {
    setActiveSlug(ringtone.slug)
    setPlayingSlug(ringtone.slug)
    const audio = audioRef.current
    if (!audio) return

    audio.src = getRingtoneAudioUrl(ringtone.slug)
    audio.play().catch(() => {
      downloadRingtone(ringtone)
      setPlayingSlug(null)
    })
  }

  const handleDownload = (ringtone) => {
    downloadRingtone(ringtone)
  }

  const pauseRingtone = () => {
    audioRef.current?.pause()
    setPlayingSlug(null)
  }

  useEffect(() => {
    document.title = 'रिंगटोन्स – श्री समर्थ रामदास'
    return () => {
      document.title = 'श्री समर्थ रामदास - श्री रामदासांचे साहित्य'
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return undefined

    const onEnded = () => setPlayingSlug(null)
    audio.addEventListener('ended', onEnded)
    return () => audio.removeEventListener('ended', onEnded)
  }, [])

  return (
    <div className={styles.page}>
      <audio ref={audioRef} preload="none" />

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
                isPlaying={playingSlug === ringtone.slug}
                isActive={activeSlug === ringtone.slug}
                onPlay={() => playRingtone(ringtone)}
                onPause={pauseRingtone}
                onDownload={handleDownload}
              />
            ))}
          </div>
        )}
      </div>

      {activeRingtone && (
        <div className={styles.playerBar}>
          <div className={styles.playerInfo}>
            <WaveBars active={playingSlug === activeRingtone.slug} />
            <div>
              <p className={styles.playerTitleMr}>{activeRingtone.titleMr}</p>
              <p className={styles.playerTitleEn}>{activeRingtone.titleEn}</p>
            </div>
          </div>
          <div className={styles.playerActions}>
            <button
              type="button"
              className={styles.playerBtn}
              onClick={
                playingSlug === activeRingtone.slug
                  ? pauseRingtone
                  : () => playRingtone(activeRingtone)
              }
            >
              {playingSlug === activeRingtone.slug ? <FiPause /> : <FiPlay />}
            </button>
            <button
              type="button"
              className={styles.playerDownload}
              onClick={() => handleDownload(activeRingtone)}
              aria-label={`Download ${activeRingtone.titleEn}`}
            >
              <FiDownload />
              Download
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Ringtones
