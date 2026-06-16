export const exploreLinks = [
  { labelMr: 'मुख्यपृष्ठ', labelEn: 'Home', href: '/' },
  { labelMr: 'जीवन प्रवास', labelEn: 'Life Journey', href: '/life-journey' },
  { labelMr: 'वृत्त आणि घटना', labelEn: 'News & Events', href: '/news-events' },
]

export const contentLinks = [
  { label: 'विषय / Subject', href: '/subject' },
  { label: 'लेखक / Author', href: '/author' },
  { label: 'भाषा / Language', href: '/language' },
  { label: 'रिंगटोन्स / Ringtones', href: '/ringtones' },
  { label: 'दासवाणी / Daswani', href: '/daswani' },
]

export const contactInfo = [
  {
    title: 'श्री समर्थ रामदास जन्मोत्सव चतुःशताब्दी सोहळा',
    lines: [
      'वैष्णव २१८४/ब, सदाशिव पेठ,',
      'वेदशास्त्रोत्तेजक सभेजवळ, पुणे ४११०३०.',
    ],
  },
  {
    title: 'सुरेश नीलकंठ नवरे',
    lines: [
      "'संपदा'",
      '१९ कलानिकेतन को-ऑ हौसिंग सोसायटी,',
      'कलानगर, सातारा रोड, पुणे ४११०४३',
      'महाराष्ट्र (भारत)',
    ],
  },
]

export function toExploreLabel({ labelMr, labelEn }) {
  return `${labelMr} / ${labelEn}`
}
