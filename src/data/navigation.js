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

export const contactInfo = [
  {
    id: 'quadricentennial',
    titleMr: 'श्री समर्थ रामदास जन्मोत्सव चतुःशताब्दी सोहळा',
    titleEn: 'Shree Samarth Ramdas Quadricentennial Celebration',
    linesMr: [
      'वैष्णव २१८४/ब, सदाशिव पेठ,',
      'वेदशास्त्रोत्तेजक सभेजवळ, पुणे ४११०३०.',
    ],
    linesEn: [
      'Vaishnav 2184/B, Sadashiv Peth,',
      'Near Ved Shastra Uttejak Sabha, Pune 411030.',
    ],
  },
  {
    id: 'suresh-navare',
    titleMr: 'सुरेश नीलकंठ नवरे',
    titleEn: 'Suresh Neelkanth Navare',
    linesMr: [
      "'संपदा'",
      '१९ कलानिकेतन को-ऑ हौसिंग सोसायटी,',
      'कलानगर, सातारा रोड, पुणे ४११०४३',
      'महाराष्ट्र (भारत)',
    ],
    linesEn: [
      "'Sampada'",
      '19 Kalaniketan Co-op. Housing Society,',
      'Kala Nagar, Satara Road, Pune 411043',
      'Maharashtra (India)',
    ],
  },
]

export function toExploreLabel({ labelMr, labelEn }) {
  return `${labelMr} / ${labelEn}`
}
