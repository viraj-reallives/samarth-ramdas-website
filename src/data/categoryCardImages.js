export const CATEGORY_CARD_IMAGES = {
  subject: {
    imageMr: '/assets/cards/vishay.png',
    imageEn: '/assets/cards/topic.png',
  },
  author: {
    imageMr: '/assets/cards/lekhak.png',
    imageEn: '/assets/cards/author.png',
  },
  language: {
    imageMr: '/assets/cards/bhasha.png',
    imageEn: '/assets/cards/language.png',
  },
  ringtones: '/assets/cards/ringtones.jpg',
}

export function resolveCardImage(source, locale) {
  if (!source) return undefined
  if (typeof source === 'string') return source
  const mr = source.imageMr ?? source.mr
  const en = source.imageEn ?? source.en
  return locale === 'en' ? (en ?? mr) : (mr ?? en)
}

export const CATEGORY_BANNER_IMAGES = {
  subject: CATEGORY_CARD_IMAGES.subject,
  author: CATEGORY_CARD_IMAGES.author,
  language: CATEGORY_CARD_IMAGES.language,
  ringtones: CATEGORY_CARD_IMAGES.ringtones,
}

export const CATEGORY_BANNER_THEMES = {
  subject: 'subject',
  author: 'author',
  language: 'language',
}

export const CATEGORY_CARD_IMAGE_BY_PATH = {
  '/subject': CATEGORY_CARD_IMAGES.subject,
  '/author': CATEGORY_CARD_IMAGES.author,
  '/language': CATEGORY_CARD_IMAGES.language,
  '/ringtones': CATEGORY_CARD_IMAGES.ringtones,
}

export const CATEGORY_CARD_THEME_BY_PATH = {
  '/subject': 'subject',
  '/author': 'author',
  '/language': 'language',
}
