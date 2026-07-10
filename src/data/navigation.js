export const exploreLinks = [
  { labelMr: 'मुख्यपृष्ठ', labelEn: 'Home', href: '/' },
  { labelMr: 'साहित्य शोधा', labelEn: 'Browse', href: '/browse' },
  { labelMr: 'जीवन प्रवास', labelEn: 'Life Journey', href: '/life-journey' },
  // { labelMr: 'वृत्त आणि घटना', labelEn: 'News & Events', href: '/news-events' },
]

export const contentLinks = [
  { labelMr: 'विषय', labelEn: 'Subject', href: '/subject' },
  { labelMr: 'लेखक', labelEn: 'Author', href: '/author' },
  { labelMr: 'भाषा', labelEn: 'Language', href: '/language' },
  { labelMr: 'रिंगटोन्स', labelEn: 'Ringtones', href: '/ringtones' },
  { labelMr: 'दासवाणी', labelEn: 'Daswani', href: '/daswani' },
]

export function toExploreLabel({ labelMr, labelEn }) {
  return `${labelMr} / ${labelEn}`
}
