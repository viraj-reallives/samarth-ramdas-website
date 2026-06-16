import { subjectAudios, subjectAuthors, subjectLiterature, subjects } from './subjects'

export const languageCategories = [
  { id: 'all', titleMr: 'सर्व भाषा', titleEn: 'All Languages' },
  { id: 'indian', titleMr: 'भारतीय', titleEn: 'Indian' },
  { id: 'international', titleMr: 'आंतरराष्ट्रीय', titleEn: 'International' },
]

export const languages = [
  {
    slug: 'marathi',
    titleMr: 'मराठी',
    titleEn: 'Marathi',
    href: '/language/marathi',
    category: 'indian',
    badge: 'म',
    hintMr: 'मूळ भाषा — सर्व साहित्य',
    hintEn: 'Primary language — full collection',
    featured: true,
  },
  {
    slug: 'hindi',
    titleMr: 'हिंदी',
    titleEn: 'Hindi',
    href: '/language/hindi',
    category: 'indian',
    badge: 'हि',
    hintMr: 'हिंदी भाषेतील साहित्य',
    hintEn: 'Literature in Hindi',
    featured: true,
  },
  {
    slug: 'english',
    titleMr: 'इंग्लिश',
    titleEn: 'English',
    href: '/language/english',
    category: 'international',
    badge: 'En',
    hintMr: 'English translations & texts',
    hintEn: 'English translations & texts',
    featured: true,
  },
  {
    slug: 'sanskrit',
    titleMr: 'संस्कृत',
    titleEn: 'Sanskrit',
    href: '/language/sanskrit',
    category: 'indian',
    badge: 'सं',
    hintMr: 'संस्कृत भाषेतील ग्रंथ',
    hintEn: 'Sanskrit scriptures',
  },
  {
    slug: 'kannad',
    titleMr: 'कन्नड',
    titleEn: 'Kannad',
    href: '/language/kannad',
    category: 'indian',
    badge: 'ಕ',
    hintMr: 'कन्नड भाषेतील साहित्य',
    hintEn: 'Literature in Kannada',
  },
  {
    slug: 'sindhi',
    titleMr: 'सिंधी',
    titleEn: 'Sindhi',
    href: '/language/sindhi',
    category: 'indian',
    badge: 'सि',
    hintMr: 'सिंधी भाषेतील साहित्य',
    hintEn: 'Literature in Sindhi',
  },
  {
    slug: 'german',
    titleMr: 'जर्मन',
    titleEn: 'German',
    href: '/language/german',
    category: 'international',
    badge: 'De',
    hintMr: 'German language resources',
    hintEn: 'German language resources',
  },
  {
    slug: 'gujrathi',
    titleMr: 'गुजराथी',
    titleEn: 'Gujrathi',
    href: '/language/gujrathi',
    category: 'indian',
    badge: 'ગ',
    hintMr: 'गुजराती भाषेतील साहित्य',
    hintEn: 'Literature in Gujarati',
  },
]

const coreLanguageSubjects = [
  'dasbodh',
  'manache-shlok',
  'dainandin-upasana',
  'others',
  'nirupan',
  'samarth-krupechi-vachane',
  'aarti',
  'samarth-charitra',
  'manache-shlok-pravachane',
  'bhajan',
]

export const languageSubjects = {
  marathi: [
    ...coreLanguageSubjects,
    'karunashtake',
    'samarthanchi-kavyasrushti',
    'shloka',
    'manache-shlok-nirupan',
  ],
  hindi: coreLanguageSubjects,
  english: coreLanguageSubjects,
  sanskrit: coreLanguageSubjects,
  kannad: coreLanguageSubjects,
  sindhi: coreLanguageSubjects,
  german: ['dasbodh', 'manache-shlok', 'samarth-charitra', 'bhajan', 'others'],
  gujrathi: coreLanguageSubjects,
}

export function getLanguageBySlug(slug) {
  return languages.find((language) => language.slug === slug)
}

export function getOtherLanguages(currentSlug) {
  return languages.filter((language) => language.slug !== currentSlug)
}

export function getSubjectsForLanguage(languageSlug) {
  const slugs = languageSubjects[languageSlug] ?? coreLanguageSubjects
  return slugs
    .map((subjectSlug) => subjects.find((subject) => subject.slug === subjectSlug))
    .filter(Boolean)
}

export function getOtherSubjectsForLanguage(languageSlug, currentSubjectSlug) {
  return getSubjectsForLanguage(languageSlug).filter(
    (subject) => subject.slug !== currentSubjectSlug,
  )
}

export function getLanguageSubjectUrl(languageSlug, subjectSlug) {
  return `/language/${languageSlug}/subject/${subjectSlug}`
}

function collectItemsForSubject(subjectSlug, source) {
  const authors = subjectAuthors[subjectSlug] ?? []
  const items = []
  const seen = new Set()

  authors.forEach(({ slug: authorSlug }) => {
    const entries = source[`${subjectSlug}/${authorSlug}`] ?? []
    entries.forEach((item) => {
      const key = `${item.titleMr}|${item.titleEn}`
      if (!seen.has(key)) {
        seen.add(key)
        items.push(item)
      }
    })
  })

  return items
}

export function getAudiosForLanguageSubject(_languageSlug, subjectSlug) {
  return collectItemsForSubject(subjectSlug, subjectAudios)
}

export function getLiteratureForLanguageSubject(_languageSlug, subjectSlug) {
  return collectItemsForSubject(subjectSlug, subjectLiterature)
}
