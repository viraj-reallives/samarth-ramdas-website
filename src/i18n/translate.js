import en from './locales/en.json'
import mr from './locales/mr.json'

export const LOCALES = {
  mr: { label: 'मराठी', short: 'मर', messages: mr },
  en: { label: 'English', short: 'EN', messages: en },
}

export const DEFAULT_LOCALE = 'mr'
export const LOCALE_STORAGE_KEY = 'samarth-ramdas-locale'

const catalogs = { en, mr }

function getByPath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), obj)
}

export function translate(locale, key, vars = {}) {
  const catalog = catalogs[locale] ?? catalogs[DEFAULT_LOCALE]
  let text = getByPath(catalog, key) ?? getByPath(catalogs.en, key) ?? key

  if (typeof text !== 'string') return key

  Object.entries(vars).forEach(([name, value]) => {
    text = text.replaceAll(`{${name}}`, String(value))
  })

  return text
}

export function pickLocalized(locale, mr, en) {
  if (locale === 'mr') return mr ?? en ?? ''
  return en ?? mr ?? ''
}

export function pickField(locale, obj, base) {
  if (!obj) return ''
  const mr = obj[`${base}Mr`] ?? obj[`${base}_mr`]
  const en = obj[`${base}En`] ?? obj[`${base}_en`]
  return pickLocalized(locale, mr, en)
}

export function joinFields(locale, items, base = 'title', separator = ' → ') {
  if (!Array.isArray(items) || items.length === 0) return ''
  return items.map((item) => pickField(locale, item, base)).join(separator)
}
