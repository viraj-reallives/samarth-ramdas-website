import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  LOCALES,
  joinFields,
  pickField,
  pickLocalized,
  translate,
} from './translate'

export const I18nContext = createContext(null)

function readStoredLocale() {
  if (typeof window === 'undefined') return DEFAULT_LOCALE
  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY)
  return stored && LOCALES[stored] ? stored : DEFAULT_LOCALE
}

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState(() => readStoredLocale())

  const setLocale = useCallback((next) => {
    if (!LOCALES[next]) return
    setLocaleState(next)
    window.localStorage.setItem(LOCALE_STORAGE_KEY, next)
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale === 'mr' ? 'mr' : 'en'
  }, [locale])

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      locales: LOCALES,
      t: (key, vars) => translate(locale, key, vars),
      pick: (mr, en) => pickLocalized(locale, mr, en),
      pickField: (obj, base) => pickField(locale, obj, base),
      joinFields: (items, base, separator) => joinFields(locale, items, base, separator),
    }),
    [locale, setLocale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
