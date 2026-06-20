const R2_BASE = 'https://pub-31371e9d4db049cfba14534a68b77428.r2.dev'
const R2_RINGTONES = `${R2_BASE}/ringtones`

const R2_FILES = {
  'ganadheesh-jo': 'Ganadheesh-Jo.mp3',
  'ghanashyam-ha': 'Ghanashyam-Ha.mp3',
  'jani-bhojani': 'Jani-Bhojani.mp3',
  'jani-sarvsukhi': 'Jani-Sarvsukhi.mp3',
  'jani-vaad-vevaad': 'Jani-Vaad-Vevaad.mp3',
  'jay-jay-raghuveer-samarth': 'Jay-Jay-Raghuveer-Samarth.mp3',
  'kari-vrutti-jo-sant': 'Kari-Vrutti-Jo-Sant.mp3',
  'komalvacha-brahmanaubhav': 'Komalvacha-Brahmanaubhav.mp3',
  'komalvacha-pavan': 'Komalvacha-Pavan.mp3',
  'komalvacha-prabhanda': 'Komalvacha-Prabhanda.mp3',
  'komalvacha-tadruptta': 'Komalvacha-Tadruptta.mp3',
  'komalvacha-vidya-vaibhav': 'Komalvacha-Vidya-Vaibhav.mp3',
  komalvacha: 'Komalvacha.mp3',
  'krami-vel-jo': 'Krami-Vel-Jo.mp3',
  'mana-goojare-tooj-he-prapta-jhale': 'Mana-Goojare-Tooj-He-Prapta-Jhale.mp3',
  'mana-sajjana-bhakti-panthechi-jave': 'Mana-Sajjana-Bhakti-Panthechi-Jave.mp3',
  'mana-sang-ha-sarv-sangaas-todi': 'Mana-Sang-Ha-Sarv-Sangaas-Todi.mp3',
  'mana-shreshth-dharishthya': 'Mana-Shreshth-Dharishthya.mp3',
  'manachi-shate-aikata-dosh-jati': 'Manachi-Shate-Aikata-Dosh-Jati.mp3',
  'mhane-janata-to-jani': 'Mhane-Janata-To-Jani.mp3',
  'mukhi-ram-tya': 'Mukhi-Ram-Tya.mp3',
  'nabhi-vaavare-jo': 'Nabhi-Vaavare-Jo.mp3',
  'nako-re-mana-krodhha': 'Nakore-Mana-Krodhha.mp3',
  'phookache-mukhi': 'Phookache-Mukhi.mp3',
  'prabhate-mani-ram': 'Prabhate-Mani-Ram.mp3',
  'sada-sarvada-ram-sannidh-ahe': 'Sadasarvada-Ram-Sannidhahe.mp3',
  'sada-sarvada-sajjana-che': 'Sadasarvada-Sajjana-Che.mp3',
  'samrthachiya-sevaka': 'Samrtha-Chiya-Sevaka.mp3',
  'tinhilok-jethun': 'Tinhilok-Jethun.mp3',
  'tute-vaad-sanvaad': 'Tute-Vaad-Sanvaad.mp3',
  'vaseh-rudayi-dev-to': 'Vaseh-Rudayi-Dev-To.mp3',
  'vicharun-bole': 'Vicharun-Bole.mp3',
  'ase-ho-jaya': 'Ase-Ho-Jaya.mp3',
  'dehe-tyagita': 'Dehe-Tyagita.mp3',
}

function withR2Audio(entry) {
  const fileName = R2_FILES[entry.slug]
  if (!fileName) {
    return entry
  }

  const url = `${R2_RINGTONES}/${fileName}`
  return {
    ...entry,
    audioUrl: url,
    downloadPath: url,
    fileName,
  }
}

const ringtoneData = [
  {
    slug: 'acharya-dharmendraji',
    titleMr: 'आचार्य धर्मेंद्रजी',
    titleEn: 'Acharya Dharmendraji',
    audioUrl: `${R2_BASE}/acharya_dharmendraji.mp3`,
    downloadPath: `${R2_BASE}/acharya_dharmendraji.mp3`,
    fileName: 'acharya_dharmendraji.mp3',
  },
  {
    slug: 'ganadheesh-jo',
    titleMr: 'गणाधीश जो',
    titleEn: 'Ganadheesh Jo',
  },
  {
    slug: 'mukhi-ram-tya',
    titleMr: 'मुखी राम त्या',
    titleEn: 'Mukhi Ram Tya',
  },
  {
    slug: 'jay-jay-raghuveer-samarth',
    titleMr: 'जय जय रघुवीर समर्थ',
    titleEn: 'Jay Jay Raghuveer Samarth',
  },
  {
    slug: 'prabhate-mani-ram',
    titleMr: 'प्रभाते मनी राम',
    titleEn: 'Prabhate Mani Ram',
  },
  {
    slug: 'mhane-janata-to-jani',
    titleMr: 'म्हणे जनता तो जणी',
    titleEn: 'Mhane Janata To Jani',
  },
  {
    slug: 'jani-bhojani',
    titleMr: 'जणी भोजनी',
    titleEn: 'Jani Bhojani',
  },
  {
    slug: 'jani-sarvsukhi',
    titleMr: 'जणी सर्वसूखी',
    titleEn: 'Jani Sarvsukhi',
  },
  {
    slug: 'jani-vaad-vevaad',
    titleMr: 'जणी वाद वेवाद',
    titleEn: 'Jani Vaad Vevaad',
  },
  {
    slug: 'manachi-shate-aikata-dosh-jati',
    titleMr: 'मनाची शते ऐकता दोष जाती',
    titleEn: 'Manachi Shate Aikata Dosh Jati',
  },
  {
    slug: 'kari-vrutti-jo-sant',
    titleMr: 'करी वृत्ती जो संत',
    titleEn: 'Kari Vrutti Jo Sant',
  },
  {
    slug: 'nako-re-mana-krodhha',
    titleMr: 'नको रे मना क्रोध',
    titleEn: 'Nako re Mana Krodhha',
  },
  {
    slug: 'phookache-mukhi',
    titleMr: 'फुकाचे मुखी',
    titleEn: 'Phookache Mukhi',
  },
  {
    slug: 'mana-goojare-tooj-he-prapta-jhale',
    titleMr: 'मना गूजरे तूज हे प्राप्ता झाले',
    titleEn: 'Mana Goojare Tooj He Prapta Jhale',
  },
  {
    slug: 'mana-sajjana-bhakti-panthechi-jave',
    titleMr: 'मना सज्जना भक्ति पांथेची जावे',
    titleEn: 'Mana Sajjana Bhakti Panthechi Jave',
  },
  {
    slug: 'nabhi-vaavare-jo',
    titleMr: 'नभी वावरे जो',
    titleEn: 'Nabhi Vaavare Jo',
  },
  {
    slug: 'sada-sarvada-sajjana-che',
    titleMr: 'सदा सर्वदा सज्जनाचे',
    titleEn: 'Sada sarvada Sajjana Che',
  },
  {
    slug: 'sada-sarvada-ram-sannidh-ahe',
    titleMr: 'सदा सर्वदा राम सन्निध आहे',
    titleEn: 'Sada sarvada Ram Sannidh ahe',
  },
  {
    slug: 'mana-sang-ha-sarv-sangaas-todi',
    titleMr: 'मना सांग हा सर्व सांगास तोडी',
    titleEn: 'Mana Sang Ha Sarv Sangaas Todi',
  },
  {
    slug: 'mana-shreshth-dharishthya',
    titleMr: 'मना श्रेष्ठ धारिसत्या',
    titleEn: 'Mana Shreshth Dharishthya',
  },
  {
    slug: 'samrthachiya-sevaka',
    titleMr: 'समर्थाचिया सेवका',
    titleEn: 'Samrthachiya Sevaka',
  },
  {
    slug: 'dehe-tyagita',
    titleMr: 'देहे त्यागिता',
    titleEn: 'Dehe Tyagita',
  },
  {
    slug: 'komalvacha',
    titleMr: 'कोमालवाचा',
    titleEn: 'Komalvacha',
  },
  {
    slug: 'komalvacha-brahmanaubhav',
    titleMr: 'कोमालवाचा ब्राहमनौभव',
    titleEn: 'Komalvacha Brahmanaubhav',
  },
  {
    slug: 'komalvacha-pavan',
    titleMr: 'कोमालवाचा पवन',
    titleEn: 'Komalvacha Pavan',
  },
  {
    slug: 'komalvacha-prabhanda',
    titleMr: 'कोमालवाचा प्रभांडा',
    titleEn: 'Komalvacha Prabhanda',
  },
  {
    slug: 'komalvacha-tadruptta',
    titleMr: 'कोमलवाचा तद्रूपता',
    titleEn: 'Komalvacha Tadruptta',
  },
  {
    slug: 'komalvacha-vidya-vaibhav',
    titleMr: 'कोमालवाचा विद्या वैभव',
    titleEn: 'Komalvacha Vidya Vaibhav',
  },
  {
    slug: 'krami-vel-jo',
    titleMr: 'क्रमी वेळ जो',
    titleEn: 'Krami Vel Jo',
  },
  {
    slug: 'ase-ho-jaya',
    titleMr: 'असे हो जया',
    titleEn: 'Ase Ho Jaya',
  },
  {
    slug: 'ghanashyam-ha',
    titleMr: 'घनश्याम हा',
    titleEn: 'Ghanashyam Ha',
  },
  {
    slug: 'tinhilok-jethun',
    titleMr: 'तिन्हीलोक जेथून',
    titleEn: 'Tinhilok Jethun',
  },
  {
    slug: 'tute-vaad-sanvaad',
    titleMr: 'तुटे वाद संवाद',
    titleEn: 'Tute Vaad Sanvaad',
  },
  {
    slug: 'vaseh-rudayi-dev-to',
    titleMr: 'वसेह रूडाई देव तो',
    titleEn: 'Vaseh Rudayi Dev To',
  },
  {
    slug: 'vicharun-bole',
    titleMr: 'विचारून बोले',
    titleEn: 'Vicharun Bole',
  },
]

export const ringtones = ringtoneData.map(withR2Audio)

export function getRingtoneAudioUrl(slug) {
  const ringtone = ringtones.find((item) => item.slug === slug)
  if (ringtone?.audioUrl) {
    return ringtone.audioUrl
  }

  return `/assets/ringtones/${slug}.mp3`
}

export function getRingtoneDownloadUrl(ringtone) {
  if (ringtone.audioUrl) {
    return ringtone.audioUrl
  }

  if (ringtone.downloadPath?.toLowerCase().includes('.mp3')) {
    return ringtone.downloadPath
  }

  return getRingtoneAudioUrl(ringtone.slug)
}

export function getRingtoneFileName(ringtone) {
  return ringtone.fileName || `${ringtone.slug}.mp3`
}

export async function downloadRingtone(ringtone) {
  const url = getRingtoneDownloadUrl(ringtone)
  const fileName = getRingtoneFileName(ringtone)

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Download failed')
    }

    const blob = await response.blob()
    const objectUrl = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = objectUrl
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(objectUrl)
  } catch {
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    document.body.appendChild(link)
    link.click()
    link.remove()
  }
}
