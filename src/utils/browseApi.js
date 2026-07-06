import {
  toAuthorFacetSlug,
  toLanguageFacetSlug,
  toSubjectFacetSlug,
} from './facetSlugs'

/** Prefer the tab with more items; tie-break on audios. */
export function getDefaultDownloadTab(audioCount, literatureCount) {
  return literatureCount > audioCount ? 'literature' : 'audios'
}

function buildBrowseParams({ subject, author, language, type, q, limit = 100, offset = 0 }) {
  const params = new URLSearchParams()
  if (subject) params.set('subject', toSubjectFacetSlug(subject))
  if (author) params.set('author', toAuthorFacetSlug(author))
  if (language) params.set('language', toLanguageFacetSlug(language))
  if (type) params.set('type', type)
  if (q?.trim()) params.set('q', q.trim())
  params.set('limit', String(limit))
  params.set('offset', String(offset))
  return params
}

export async function fetchBrowseItems({ subject, author, language, type, limit = 100 }) {
  const res = await fetch(`/api/browse?${buildBrowseParams({ subject, author, language, type, limit })}`)
  if (!res.ok) throw new Error(`API returned ${res.status}`)
  const data = await res.json()
  return data.items ?? []
}

export async function searchBrowseContent({ q, type, limit = 100, offset = 0 }) {
  const res = await fetch(`/api/browse?${buildBrowseParams({ q, type, limit, offset })}`)
  if (!res.ok) throw new Error(`API returned ${res.status}`)
  const data = await res.json()
  return {
    items: data.items ?? [],
    total: data.total ?? 0,
  }
}

export async function fetchLanguageSubjectFacets(languageSlug) {
  const res = await fetch(
    `/api/facets?language=${encodeURIComponent(toLanguageFacetSlug(languageSlug))}`,
  )
  if (!res.ok) throw new Error(`API returned ${res.status}`)
  const data = await res.json()
  return data.subjects ?? []
}

/** Keep only site subjects that have content for the given language in D1. */
export function filterSubjectsByLanguageContent(staticSubjects, apiSubjects) {
  const facetSlugsWithContent = new Set(apiSubjects.map((subject) => subject.slug))

  return staticSubjects.filter((subject) => {
    const facetSlug = toSubjectFacetSlug(subject.slug)
    return facetSlugsWithContent.has(facetSlug) || facetSlugsWithContent.has(subject.slug)
  })
}

export async function loadSubjectsForLanguage(languageSlug, staticSubjects) {
  const apiSubjects = await fetchLanguageSubjectFacets(languageSlug)
  return filterSubjectsByLanguageContent(staticSubjects, apiSubjects)
}
