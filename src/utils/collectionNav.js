export const COLLECTION_ROUTES = {
  ringtones: '/ringtones',
  daswani: '/daswani',
}

export const COLLECTION_LABELS = {
  ringtones: { titleMr: 'रिंगटोन्स', titleEn: 'Ringtones' },
  daswani: { titleMr: 'दासवाणी', titleEn: 'Daswani Gallery' },
}

export const TYPE_LABELS = {
  audio: { mr: 'ऑडिओ', en: 'Audio' },
  gallery: { mr: 'गॅलरी', en: 'Gallery' },
  book: { mr: 'ग्रंथ', en: 'Book' },
  event: { mr: 'घटना', en: 'Event' },
  news: { mr: 'वृत्त', en: 'News' },
  video: { mr: 'व्हिडिओ', en: 'Video' },
}

export function getCollectionHref(slug) {
  return COLLECTION_ROUTES[slug] ?? '/browse'
}

export function getCollectionLabel(collection) {
  const known = COLLECTION_LABELS[collection.slug]
  if (known) return known
  return { titleMr: collection.title, titleEn: collection.title }
}
