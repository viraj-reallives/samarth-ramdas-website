import { authors } from './authors'
import { languages } from './languages'

export const featuredSubjectLinks = [
  { labelMr: 'दासबोध', labelEn: 'Dasbodh', href: '/subject/dasbodh' },
  { labelMr: 'मनाचे श्लोक', labelEn: 'Manache Shlok', href: '/subject/manache-shlok' },
  { labelMr: 'निरूपण', labelEn: 'Nirupan', href: '/subject/nirupan' },
  { labelMr: 'भजन', labelEn: 'Bhajan', href: '/subject/bhajan' },
  { labelMr: 'रिंगटोन्स', labelEn: 'Ringtones', href: '/ringtones' },
]

export const libraryMegaMenu = {
  id: 'library',
  labelMr: 'ग्रंथालय',
  labelEn: 'Library',
  href: '/subject',
  columns: [
    {
      titleMr: 'विषय',
      titleEn: 'Subject',
      href: '/subject',
      links: featuredSubjectLinks,
    },
    {
      titleMr: 'लेखक',
      titleEn: 'Author',
      href: '/author',
      links: authors.slice(0, 6).map(({ slug, titleMr, titleEn }) => ({
        labelMr: titleMr,
        labelEn: titleEn,
        href: `/author/${slug}`,
      })),
    },
    {
      titleMr: 'भाषा',
      titleEn: 'Language',
      href: '/language',
      links: languages.slice(0, 6).map(({ slug, titleMr, titleEn }) => ({
        labelMr: titleMr,
        labelEn: titleEn,
        href: `/language/${slug}`,
      })),
    },
    {
      titleMr: 'दासवाणी',
      titleEn: 'Daswani',
      href: '/daswani',
      links: [
        { labelMr: 'दासवाणी संग्रह', labelEn: 'Daswani Collection', href: '/daswani' },
        { labelMr: 'सर्व विषय', labelEn: 'All Subjects', href: '/subject' },
        { labelMr: 'सर्व लेखक', labelEn: 'All Authors', href: '/author' },
      ],
    },
  ],
}

export const mediaMenu = {
  id: 'media',
  labelMr: 'मीडिया',
  labelEn: 'Media',
  href: '/ringtones',
  links: [
    { id: 'ringtones', labelMr: 'रिंगटोन्स', labelEn: 'Ringtones', href: '/ringtones', icon: 'ringtones' },
    { id: 'gallery', labelMr: 'गॅलरी', labelEn: 'Gallery', href: '/daswani#gallery', icon: 'gallery' },
  ],
}

export const libraryRoutePrefixes = ['/subject', '/author', '/language', '/daswani']
export const mediaRoutePrefixes = ['/ringtones']

export const mainNavItems = [
  { type: 'link', href: '/', labelMr: 'मुख्यपृष्ठ', labelEn: 'Home' },
  { type: 'link', href: '/life-journey', labelMr: 'जीवन प्रवास', labelEn: 'Life Journey' },
  { type: 'mega', ...libraryMegaMenu },
  { type: 'dropdown', ...mediaMenu },
  { type: 'link', href: '/news-events', labelMr: 'वृत्त आणि घटना', labelEn: 'News & Events' },
  { type: 'link', href: '/contact', labelMr: 'संपर्क', labelEn: 'Contact' },
]
