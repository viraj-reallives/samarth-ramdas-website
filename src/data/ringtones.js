import { getAuthorBySlug } from './authors'
import { downloadContentFile } from '../utils/downloadContent'

// NOTE: Ringtone DATA now comes from the API (/api/collections/ringtones).
// This file keeps only the author-attribution logic and the download helper,
// which operate on a ringtone object the component already has in hand.

const RINGTONE_AUTHOR_BY_SLUG = {
  'acharya-dharmendraji': 'dharmendraji',
  komalvacha: 'charudatta-aphle',
  'komalvacha-brahmanaubhav': 'charudatta-aphle',
  'komalvacha-pavan': 'charudatta-aphle',
  'komalvacha-prabhanda': 'charudatta-aphle',
  'komalvacha-tadruptta': 'charudatta-aphle',
  'komalvacha-vidya-vaibhav': 'charudatta-aphle',
  'jay-jay-raghuveer-samarth': 'sansthan',
  'samrthachiya-sevaka': 'mohanbua-ramadasi',
}

const RINGTONE_AUTHOR_POOL = [
  'dharmendraji',
  'chaitanya-maharaj',
  'sushamatai-watve',
  'charudatta-aphle',
  'mohanbua-ramadasi',
  'sansthan',
  'varadanand-bharati',
  'mujaffar-hussain',
  'sunil-chincholkar',
  'makarandnath',
  'shivaji-bhosale',
  'dada-jadhav',
  'ramchandra-dekhane',
  'swarnalata-bhishikar',
  'kalyani-namjoshi',
  'shreedhar-swami',
]

// Deterministic hash of a slug -> stable index into the pool.
// This makes the fallback author depend on the slug (stable forever),
// not on the ringtone's position in the list (which the API order could change).
function hashSlug(slug) {
  let h = 0
  for (let i = 0; i < slug.length; i += 1) {
    h = (h * 31 + slug.charCodeAt(i)) & 0xffffffff
  }
  return h >>> 0
}

// Resolve the author slug for a ringtone: explicit map first, else stable pool pick.
export function getRingtoneAuthorSlug(slug) {
  if (!slug) return null
  return (
    RINGTONE_AUTHOR_BY_SLUG[slug]
    ?? RINGTONE_AUTHOR_POOL[hashSlug(slug) % RINGTONE_AUTHOR_POOL.length]
  )
}

// Given a ringtone object (from the API), return the full author record.
export function getRingtoneAuthor(ringtone) {
  if (!ringtone) return null
  const authorSlug = ringtone.authorSlug ?? getRingtoneAuthorSlug(ringtone.slug)
  return getAuthorBySlug(authorSlug) ?? null
}

// The API item already carries audioUrl; keep a filename helper for downloads.
export function getRingtoneFileName(ringtone) {
  if (ringtone.fileName) return ringtone.fileName
  // derive a friendly filename from the audioUrl or slug
  if (ringtone.audioUrl) {
    const last = ringtone.audioUrl.split('/').pop()
    if (last) return last
  }
  return `${ringtone.slug}.mp3`
}

export async function downloadRingtone(ringtone) {
  await downloadContentFile({
    fileUrl: ringtone.audioUrl,
    titleEn: ringtone.titleEn,
    fileType: 'audio',
    slug: ringtone.slug,
  })
}