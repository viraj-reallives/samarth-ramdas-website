import { useEffect, useMemo, useState } from 'react'
import InnerBanner from '../components/InnerBanner'
import { CATEGORY_BANNER_IMAGES, CATEGORY_BANNER_THEMES } from '../data/categoryCardImages'
import pageUi from '../styles/pageUi.module.css'
import { Link } from 'react-router-dom'
import { FiSearch, FiUsers } from 'react-icons/fi'
import { authors, getAuthorUrl, getSubjectsForAuthor } from '../data/authors'
import { useI18n } from '../i18n/useI18n'
import styles from './Author.module.css'

function AuthorAvatar({ titleMr, image }) {
  if (image) {
    return (
      <div className={styles.photoFrame}>
        <img src={image} alt={titleMr} className={styles.photo} loading="lazy" />
      </div>
    )
  }

  return (
    <div className={styles.photoFrame}>
      <div className={styles.photoPlaceholder} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c1.6-3.5 5-5.5 8-5.5s6.4 2 8 5.5" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  )
}

function AuthorCard({ slug, titleMr, titleEn, image, subjectCount, index }) {
  const { t, pickField } = useI18n()

  return (
    <Link
      to={getAuthorUrl(slug)}
      className={`${styles.card} ${pageUi.cardAnim}`}
      style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
    >
      <div className={styles.cardBorder} aria-hidden="true" />
      <div className={styles.cardContent}>
        <AuthorAvatar titleMr={titleMr} image={image} />
        <div className={styles.text}>
          <span className={styles.titleMr}>{pickField({ titleMr, titleEn }, 'title')}</span>
        </div>
        <div className={styles.cardMeta}>
          <span className={styles.subjectBadge}>
            {t('pages.authorDetail.countSubjects', { count: subjectCount })}
          </span>
          <span className={styles.cardCta}>
            {t('common.viewLiterature')}
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </Link>
  )
}

function Author() {
  const { t } = useI18n()
  const [search, setSearch] = useState('')

  useEffect(() => {
    document.title = t('pages.author.documentTitle')
    return () => {
      document.title = t('site.title')
    }
  }, [t])

  const authorsWithCounts = useMemo(
    () =>
      authors.map((author) => ({
        ...author,
        subjectCount: getSubjectsForAuthor(author.slug).length,
      })),
    [],
  )

  const filteredAuthors = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return authorsWithCounts

    return authorsWithCounts.filter(
      ({ titleMr, titleEn }) =>
        titleMr.toLowerCase().includes(query) || titleEn.toLowerCase().includes(query),
    )
  }, [authorsWithCounts, search])

  const withPhotoCount = useMemo(
    () => authorsWithCounts.filter((author) => Boolean(author.image)).length,
    [authorsWithCounts],
  )

  return (
    <div className={styles.page}>
      <InnerBanner
        contentId="author-content"
        image={CATEGORY_BANNER_IMAGES.author}
        imageAlt={t('pages.author.bannerAlt')}
        scrollLabel={t('pages.author.scrollLabel')}
        visualTheme={CATEGORY_BANNER_THEMES.author}
      />

      <div className={`${styles.content} ${pageUi.content}`} id="author-content">
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>{t('pages.author.title')}</h1>
          <p className={styles.pageIntro}>{t('pages.author.intro')}</p>
        </header>

        <div className={`${styles.steps} ${pageUi.steps}`} aria-label="How to use this page">
          <div className={`${styles.step} ${pageUi.step}`}>
            <span className={styles.stepNum}>{t('pages.author.step1Num')}</span>
            <span className={styles.stepText}>{t('pages.author.step1')}</span>
          </div>
          <span className={styles.stepArrow} aria-hidden="true">→</span>
          <div className={`${styles.step} ${pageUi.step}`}>
            <span className={styles.stepNum}>{t('pages.author.step2Num')}</span>
            <span className={styles.stepText}>{t('pages.author.step2')}</span>
          </div>
          <span className={styles.stepArrow} aria-hidden="true">→</span>
          <div className={`${styles.step} ${pageUi.step}`}>
            <span className={styles.stepNum}>{t('pages.author.step3Num')}</span>
            <span className={styles.stepText}>{t('pages.author.step3')}</span>
          </div>
        </div>

        <div className={styles.toolbar}>
          <label className={styles.searchWrap}>
            <FiSearch className={styles.searchIcon} aria-hidden="true" />
            <input
              type="search"
              className={styles.searchInput}
              placeholder={t('pages.author.searchPlaceholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <div className={styles.countBadges}>
            <span className={styles.countBadge}>
              <FiUsers aria-hidden="true" />
              {t('pages.subject.countAuthors', { count: filteredAuthors.length })}
            </span>
            <span className={styles.countBadgeMuted}>
              {t('pages.author.withPhoto', { count: withPhotoCount })}
            </span>
          </div>
        </div>

        {filteredAuthors.length === 0 ? (
          <div className={pageUi.empty}>
            <p>{t('pages.author.empty')}</p>
            <p className={pageUi.emptySub}>{t('pages.author.emptySub')}</p>
            <button type="button" className={pageUi.emptyReset} onClick={() => setSearch('')}>
              {t('pages.author.viewAll')}
            </button>
          </div>
        ) : (
          <div className={styles.grid} key={search}>
            {filteredAuthors.map((author, index) => (
              <AuthorCard key={author.slug} {...author} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Author
