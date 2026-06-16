import { useEffect } from 'react'
import styles from './NewsEvents.module.css'

const monthlyItems = [
  {
    titleMr: 'रघुवीर समर्थ मासिक जानेवारी २०१३ #',
    titleEn: 'Raghuveer Samarth Masik January 2013',
  },
  {
    titleMr: 'रघुवीर समर्थ मासिक फेब्रुवारी २०१३ #',
    titleEn: 'Raghuveer Samarth Masik February 2013',
  },
  {
    titleMr: 'रघुवीर समर्थ मासिक एप्रिल २०१३ #',
    titleEn: 'Raghuveer Samarth Masik April 2013',
  },
  {
    titleMr: 'रघुवीर समर्थ मासिक मे २०१३ #',
    titleEn: 'Raghuveer Samarth Masik May 2013',
  },
  {
    titleMr: 'रघुवीर समर्थ मासिक जून २०१३ #',
    titleEn: 'Raghuveer Samarth Masik June 2013',
  },
  {
    titleMr: 'रघुवीर समर्थ मासिक जुलाइ २०१३ #',
    titleEn: 'Raghuveer Samarth Masik July 2013',
  },
  {
    titleMr: 'रघुवीर समर्थ मासिक ऑगस्ट २०१३ #',
    titleEn: 'Raghuveer Samarth Masik August 2013',
  },
]

const articleItems = [
  {
    titleMr: 'समर्थांची करुणाष्टके - मारुतीबुवा रामदासी #',
    titleEn: 'Samarthanchi Karunashtake - Marutibua Ramdasi',
  },
  {
    titleMr: 'समर्थ वाङ्मयाचे महत्त्व #',
    titleEn: 'Sant Vangmay Aani Shree Samarth Vangmayache Mahatv',
  },
  {
    titleMr: 'समर्थास समर्थ कित्ती म्हणोनी म्हणावे - विनायक परब #',
    titleEn: 'Ya Samarthas Samarth Kiti Mhanoni Mhanave - Vinayak Parab',
  },
  {
    titleMr: 'दास डोंगरी राहतो - विवेक वैद्य #',
    titleEn: 'Das Dongari Rahto - Vivek Vaidya',
  },
  {
    titleMr: 'एक आगळा संत - गिरीश कुबेर #',
    titleEn: 'Ek Aagla Sant - Girish Kuber',
  },
]

function PdfIcon() {
  return (
    <svg
      className={styles.pdfIcon}
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

function DownloadCard({ titleMr, titleEn }) {
  return (
    <article className={styles.card}>
      <PdfIcon />
      <div className={styles.cardText}>
        <p className={styles.titleMr}>{titleMr}</p>
        <p className={styles.titleEn}>{titleEn}</p>
      </div>
      <a href="#" className={styles.downloadButton}>
        Download File
      </a>
    </article>
  )
}

function NewsEvents() {
  useEffect(() => {
    document.title = 'वृत्त आणि घटना # News & Events – श्री समर्थ रामदास'
    return () => {
      document.title = 'श्री समर्थ रामदास - श्री रामदासांचे साहित्य'
    }
  }, [])

  return (
    <div className={styles.page}>
      <div className={styles.banner}>
        <img
          src="/assets/inner-banner.png"
          alt="|| जय जय रघुवीर समर्थ ||"
          className={styles.bannerImage}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.grid}>
          {monthlyItems.map((item) => (
            <DownloadCard key={item.titleEn} {...item} />
          ))}
        </div>

        <div className={styles.grid}>
          {articleItems.map((item) => (
            <DownloadCard key={item.titleEn} {...item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default NewsEvents
