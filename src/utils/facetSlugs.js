// Maps site route slugs → D1 facet slugs (from migration/category_facet_mapping.csv).
// When no entry exists, the site slug is used as-is.

const AUTHOR_FACET_SLUG = {
  'sushamatai-watve': 'sushamatai',
  'charudatta-aphle': 'caphale',
  'kumudagraj-ashok-joshi': 'ashok-joshi',
  dharmendraji: 'acharya-dharmendraji',
  'mujaffar-hussain': 'mujaffar_husain',
  'dada-jadhav': 'dadajadhav',
  'shreedhar-swami': 'shridhar_swami',
  'shivaji-bhosale': 'shivaji_bhosale',
  'mohanbua-ramadasi': 'mohabua_ramdasi',
  'varadanand-bharati': 'varadanand_bhrati',
  'ramchandra-dekhane': 'dr_dekhane',
  'kalyani-namjoshi': 'kalyani_tai_namjoshi',
  'chaitanya-maharaj': 'chaitanya_maharaj',
  'sunil-chincholkar': 'chincholkar',
  'shrinivas-rairikar': 'shriniwas_rairikar',
  'other-authors': 'transparent-writer-icon-png',
  'govinddev-giri': 'swami-govinddev-giri-acharya-kishorji-vyas',
  'maya-joshi':
    'सौ-माया-जोशी-mrs-maya-joshi',
  'sudhir-nirgudkar':
    'डॉ-सुधीर-निर्गुडकर',
};

const SUBJECT_FACET_SLUG = {
  dasbodh: 'दासबोध-dasbodh',
  'dasbodh-vachan': 'shreemat-dasbodh-vachan',
  'manache-shlok-pravachane': 'shree-manache-shlok-pravachane',
};

export function toAuthorFacetSlug(siteSlug) {
  return AUTHOR_FACET_SLUG[siteSlug] ?? siteSlug;
}

export function toSubjectFacetSlug(siteSlug) {
  return SUBJECT_FACET_SLUG[siteSlug] ?? siteSlug;
}

export function toLanguageFacetSlug(siteSlug) {
  return siteSlug;
}

export function buildBrowseUrl({ subject, author, language, type, limit = 100 }) {
  const params = new URLSearchParams();
  if (subject) params.set('subject', toSubjectFacetSlug(subject));
  if (author) params.set('author', toAuthorFacetSlug(author));
  if (language) params.set('language', toLanguageFacetSlug(language));
  if (type) params.set('type', type);
  params.set('limit', String(limit));
  return `/api/browse?${params.toString()}`;
}
