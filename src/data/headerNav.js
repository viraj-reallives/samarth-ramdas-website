export const popularLibraryLinks = [
  { labelMr: 'दासबोध', labelEn: 'Dasbodh', href: '/subject/dasbodh' },
  { labelMr: 'मनाचे श्लोक', labelEn: 'Manache Shlok', href: '/subject/manache-shlok' },
  { labelMr: 'रिंगटोन्स', labelEn: 'Ringtones', href: '/ringtones' },
  { labelMr: 'दासवाणी', labelEn: 'Daswani', href: '/daswani' },
]

export const browseByLinks = [
  {
    labelMr: 'विषयानुसार',
    labelEn: 'By Subject',
    href: '/subject',
    hintMr: 'दासबोध, भजन… नंतर लेखक',
    hintEn: 'Pick subject, then author',
  },
  {
    labelMr: 'लेखकानुसार',
    labelEn: 'By Author',
    href: '/author',
    hintMr: 'लेखक निवडा, नंतर विषय',
    hintEn: 'Pick author, then subject',
  },
  {
    labelMr: 'भाषेनुसार',
    labelEn: 'By Language',
    href: '/language',
    hintMr: 'मराठी, हिंदी… नंतर विषय',
    hintEn: 'Pick language, then subject',
  },
]

export const libraryMegaMenu = {
  id: 'library',
  labelMr: 'ग्रंथालय',
  labelEn: 'Library',
  href: '/browse',
  introMr: 'एकाच ठिकाणी शोधा — विषय, लेखक, भाषा किंवा संग्रह.',
  introEn: 'Search in one place — subject, author, language, or collection.',
  columns: [
    {
      variant: 'featured',
      titleMr: 'साहित्य शोधा',
      titleEn: 'Browse all',
      href: '/browse',
      hintMr: 'सर्व साहित्य, रिंगटोन्स आणि गॅलरी एकाच ठिकाणी',
      hintEn: 'All literature, ringtones & galleries together',
    },
    {
      titleMr: 'लोकप्रिय',
      titleEn: 'Popular',
      href: '/browse',
      links: popularLibraryLinks,
    },
    {
      titleMr: 'यानुसार शोधा',
      titleEn: 'Browse by',
      href: '/browse',
      links: browseByLinks,
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

export const libraryRoutePrefixes = ['/browse', '/subject', '/author', '/language', '/daswani']
export const mediaRoutePrefixes = ['/ringtones']

export const mainNavItems = [
  { type: 'link', href: '/', labelMr: 'मुख्यपृष्ठ', labelEn: 'Home' },
  { type: 'link', href: '/life-journey', labelMr: 'जीवन प्रवास', labelEn: 'Life Journey' },
  { type: 'mega', ...libraryMegaMenu },
  { type: 'dropdown', ...mediaMenu },
  // { type: 'link', href: '/news-events', labelMr: 'वृत्त आणि घटना', labelEn: 'News & Events' },
  { type: 'link', href: '/contact', labelMr: 'संपर्क', labelEn: 'Contact' },
]
