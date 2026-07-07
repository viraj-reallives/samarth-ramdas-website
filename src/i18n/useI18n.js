import { useContext } from 'react'
import { I18nContext } from './I18nProvider'
import { DEFAULT_LOCALE, joinFields, pickField, pickLocalized, translate } from './translate'

export function useI18n() {
  const context = useContext(I18nContext)

  if (context) return context

  return {
    locale: DEFAULT_LOCALE,
    setLocale: () => {},
    locales: {},
    t: (key, vars) => translate(DEFAULT_LOCALE, key, vars),
    pick: (mr, en) => pickLocalized(DEFAULT_LOCALE, mr, en),
    pickField: (obj, base) => pickField(DEFAULT_LOCALE, obj, base),
    joinFields: (items, base, separator) => joinFields(DEFAULT_LOCALE, items, base, separator),
  }
}
