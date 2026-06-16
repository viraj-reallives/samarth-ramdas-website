import { dasbodhVachanSansthanItems } from './dasbodhVachanSansthan.js'

export const subjectCategories = [
  { id: 'all', titleMr: 'सर्व विषय', titleEn: 'All Subjects' },
  { id: 'texts', titleMr: 'मुख्य ग्रंथ', titleEn: 'Core Texts' },
  { id: 'discourse', titleMr: 'प्रवचने', titleEn: 'Discourses' },
  { id: 'devotion', titleMr: 'भक्ती', titleEn: 'Devotion' },
  { id: 'life', titleMr: 'चरित्र', titleEn: 'Life & Wisdom' },
  { id: 'other', titleMr: 'इतर', titleEn: 'Other' },
]

export const subjects = [
  {
    slug: 'dasbodh',
    titleMr: 'दासबोध',
    titleEn: 'Dasbodh',
    category: 'texts',
    icon: 'book',
    hintMr: 'समर्थांचा मुख्य आध्यात्मिक ग्रंथ',
    hintEn: 'Main spiritual scripture',
  },
  {
    slug: 'manache-shlok',
    titleMr: 'मनाचे श्लोक',
    titleEn: 'Manache Shlok',
    category: 'texts',
    icon: 'scroll',
    hintMr: 'दैनंदिन स्मरणीय श्लोक',
    hintEn: 'Daily remembrance verses',
  },
  {
    slug: 'nirupan',
    titleMr: 'निरूपण',
    titleEn: 'Nirupan',
    category: 'discourse',
    icon: 'mic',
    hintMr: 'ग्रंथांचे सविस्तर निरूपण',
    hintEn: 'Detailed commentary discourses',
  },
  {
    slug: 'dasbodh-vachan',
    titleMr: 'श्रीमत् दासबोध वाचन',
    titleEn: 'Shreemat Dasbodh Vachan',
    category: 'discourse',
    icon: 'mic',
    hintMr: 'दासबोध वाचन मालिका',
    hintEn: 'Dasbodh reading series',
  },
  {
    slug: 'manache-shlok-pravachane',
    titleMr: 'श्री मनाचे श्लोक प्रवचने',
    titleEn: 'Shree Manache Shlok Pravachane',
    category: 'discourse',
    icon: 'mic',
    hintMr: 'मनाचे श्लोक प्रवचने',
    hintEn: 'Manache Shlok lectures',
  },
  {
    slug: 'samarth-krupechi-vachane',
    titleMr: 'समर्थकृपेची वचने',
    titleEn: 'Samarth krupechi vachane',
    category: 'discourse',
    icon: 'mic',
    hintMr: 'समर्थकृपेची प्रेरणादायी वचने',
    hintEn: 'Inspiring grace-filled talks',
  },
  {
    slug: 'bhajan',
    titleMr: 'भजन',
    titleEn: 'Bhajan',
    category: 'devotion',
    icon: 'music',
    hintMr: 'भक्तीगीत आणि कीर्तन',
    hintEn: 'Devotional songs & kirtan',
  },
  {
    slug: 'karunashtake',
    titleMr: 'करुणाष्टके',
    titleEn: 'Karunashtake',
    category: 'texts',
    icon: 'scroll',
    hintMr: 'करुणामय स्तोत्रे',
    hintEn: 'Compassionate hymns',
  },
  {
    slug: 'dasnavami-dasbodh-adhava',
    titleMr: 'दासनवमी दासबोध आढावा',
    titleEn: 'Dasnavami Dasbodh Adhava',
    category: 'discourse',
    icon: 'mic',
    hintMr: 'दासनवमी विशेष आढावा',
    hintEn: 'Dasnavami special overview',
  },
  {
    slug: 'navavidha-bhakti',
    titleMr: 'नवविध भक्ती',
    titleEn: 'Navavidha Bhakti',
    category: 'devotion',
    icon: 'heart',
    hintMr: 'नव प्रकारची भक्ती साधना',
    hintEn: 'Nine forms of devotion',
  },
  {
    slug: 'manache-shlok-nirupan',
    titleMr: 'मनाचे श्लोक निरूपण',
    titleEn: 'Manache Shlok Nirupan',
    category: 'discourse',
    icon: 'mic',
    hintMr: 'श्लोकांचे सविस्तर निरूपण',
    hintEn: 'Verse-by-verse explanation',
  },
  {
    slug: 'dainandin-upasana',
    titleMr: 'दैनंदिन उपासना',
    titleEn: 'Dainandin Upasana',
    category: 'devotion',
    icon: 'prayer',
    hintMr: 'रोजची उपासना व साधना',
    hintEn: 'Daily worship & practice',
  },
  {
    slug: 'samarth-charitra',
    titleMr: 'समर्थ चरित्र',
    titleEn: 'Samarth Charitra',
    category: 'life',
    icon: 'life',
    hintMr: 'समर्थांचे जीवनचरित्र',
    hintEn: 'Life story of Samarth',
  },
  {
    slug: 'samarthanchi-kavyasrushti',
    titleMr: 'समर्थांची काव्यसृष्टी',
    titleEn: 'Samarthanchi Kavyasrushti',
    category: 'life',
    icon: 'pen',
    hintMr: 'काव्यरचना आणि साहित्य',
    hintEn: 'Poetry & literary works',
  },
  {
    slug: 'guru-tatva',
    titleMr: 'गुरू तत्व',
    titleEn: 'Guru Tatva',
    category: 'life',
    icon: 'guru',
    hintMr: 'गुरू महिमा आणि तत्त्व',
    hintEn: 'Guru philosophy & glory',
  },
  {
    slug: 'aarti',
    titleMr: 'आरती',
    titleEn: 'Aarti',
    category: 'devotion',
    icon: 'lamp',
    hintMr: 'आरती आणि स्तुती',
    hintEn: 'Aarti & devotional praise',
  },
  {
    slug: 'others',
    titleMr: 'इतर',
    titleEn: 'Others',
    category: 'other',
    icon: 'folder',
    hintMr: 'इतर विषय आणि साहित्य',
    hintEn: 'Miscellaneous content',
  },
  {
    slug: 'shloka',
    titleMr: 'श्लोक',
    titleEn: 'Shloka',
    category: 'texts',
    icon: 'scroll',
    hintMr: 'विविध श्लोक संग्रह',
    hintEn: 'Collection of verses',
  },
]

export const subjectAudios = {
  'manache-shlok/charudatta-aphle': [
    {
      titleMr: 'मनाचे श्लोक #',
      titleEn: 'Manache Shlok',
    },
  ],
  'manache-shlok/sushamatai-watve': [
    {
      titleMr: 'मनाचे श्लोक #',
      titleEn: 'Manache Shlok Dr Sushamatai Watve Part 1',
    },
    {
      titleMr: 'मनाचे श्लोक #',
      titleEn: 'Manache Shlok Dr Sushamatai Watve Part 2',
    },
    {
      titleMr: 'मनाचे श्लोक #',
      titleEn: 'Manache Shlok Dr Sushamatai Watve Part 3',
    },
    {
      titleMr: 'मनाचे श्लोक #',
      titleEn: 'Manache Shlok Dr Sushamatai Watve Part 4',
    },
  ],
  'manache-shlok/kumudagraj-ashok-joshi': [
    {
      titleMr: 'मनवा मेरे 116 to 205 श्लोक #',
      titleEn: 'Manva Mere 116 to 205 Shlok',
    },
    {
      titleMr: 'मनवा मेरे 1 to 115 श्लोक #',
      titleEn: 'Manva Mere 1 to 115 Shlok',
    },
  ],
  'nirupan/mujaffar-hussain': [
    {
      titleMr: 'प्रो.मुज्जफ्फर हुसेन #',
      titleEn: 'Mujjaffar Hussain',
    },
  ],
  'nirupan/dharmendraji': [
    {
      titleMr: 'आचार्य धर्मेन्द्रजी #',
      titleEn: 'Acharya Dharmendraji',
    },
  ],
  'nirupan/dada-jadhav': [
    {
      titleMr: 'प्रो. दादा जाधव #',
      titleEn: 'Dada Jadhav',
    },
  ],
  'nirupan/charudatta-aphle': [
    {
      titleMr: 'भीमरूपी निरुपण #',
      titleEn: 'Bhimrupi nirupan',
    },
  ],
  'dasbodh-vachan/sansthan': dasbodhVachanSansthanItems,
}

export const subjectLiterature = {
  'dasbodh/sushamatai-watve': [
    {
      titleMr: 'श्रीमत् दासबोध दशक १ समास ९ #',
      titleEn: 'Shreemat Dasbodh Dashak 1 Samas 9',
    },
    {
      titleMr: 'समर्थकृपेची वचने #',
      titleEn: 'Samartha krupechi Vachane',
    },
    {
      titleMr: 'श्रीमत् दासबोध संक्षिप्त #',
      titleEn: 'Shrimat Dasbodh Sankshipt',
    },
    {
      titleMr: 'दासबोध नित्यपाठ #',
      titleEn: 'Dasbodh Nityapath',
    },
  ],
  'manache-shlok/sushamatai-watve': [
    {
      titleMr: 'मनाचे श्लोक #',
      titleEn: 'Manache Shlok Dr Sushamatai Watve Part 1',
      cardType: 'mp3',
    },
    {
      titleMr: 'मनाचे श्लोक #',
      titleEn: 'Manache Shlok Dr Sushamatai Watve Part 2',
      cardType: 'mp3',
    },
    {
      titleMr: 'मनाचे श्लोक #',
      titleEn: 'Manache Shlok Dr Sushamatai Watve Part 3',
      cardType: 'mp3',
    },
    {
      titleMr: 'मनाचे श्लोक #',
      titleEn: 'Manache Shlok Dr Sushamatai Watve Part 4',
      cardType: 'mp3',
    },
  ],
  'manache-shlok/kumudagraj-ashok-joshi': [
    {
      titleMr: 'मनुआ मेरे #',
      titleEn: 'Manua Mere',
    },
    {
      titleMr: 'मनवा मेरे 116 to 205 श्लोक #',
      titleEn: 'Manva Mere 116 to 205 Shlok',
      cardType: 'mp3',
    },
    {
      titleMr: 'मनवा मेरे 1 to 115 श्लोक #',
      titleEn: 'Manva Mere 1 to 115 Shlok',
      cardType: 'mp3',
    },
  ],
  'nirupan/other-authors': [
    {
      titleMr: 'लेखनक्रिया निरूपण #',
      titleEn: 'Lekhankriya Nirupan',
    },
    {
      titleMr: 'स्वाध्याय मनोबोध #',
      titleEn: 'Swadhyay Manobodh',
    },
  ],
  'nirupan/sansthan': [
    {
      titleMr: 'विद्यार्थियों के श्री समर्थ रामदास #',
      titleEn: 'Vidhyathiyo ke Shree Samarth Ramdas',
    },
    {
      titleMr: 'युवकांचे रामदास #',
      titleEn: 'Yuvakanche Ramdas',
    },
    {
      titleMr: 'विद्यार्थ्यांचे रामदास #',
      titleEn: 'Vidyarthyanche Ramdas',
    },
    {
      titleMr: 'विनोबांचे समर्थ स्मरण #',
      titleEn: 'Vinobanche Samarth Smaran',
    },
    {
      titleMr: 'श्री समर्थ रामदास कृत आत्माराम #',
      titleEn: 'Shree Samarth Ramdas Krut Aatmaram',
    },
  ],
  'nirupan/mujaffar-hussain': [
    {
      titleMr: 'प्रो.मुज्जफ्फर हुसेन #',
      titleEn: 'Mujjaffar Hussain',
      cardType: 'mp3',
    },
  ],
  'nirupan/dharmendraji': [
    {
      titleMr: 'आचार्य धर्मेन्द्रजी #',
      titleEn: 'Acharya Dharmendraji',
      cardType: 'mp3',
    },
  ],
  'nirupan/dada-jadhav': [
    {
      titleMr: 'प्रो. दादा जाधव #',
      titleEn: 'Dada Jadhav',
      cardType: 'mp3',
    },
  ],
  'nirupan/charudatta-aphle': [
    {
      titleMr: 'भीमरूपी निरुपण #',
      titleEn: 'Bhimrupi nirupan',
      cardType: 'mp3',
    },
  ],
  'nirupan/varadanand-bharati': [
    {
      titleMr: 'मनोबोध 1 #',
      titleEn: 'Manobodh1',
    },
    {
      titleMr: 'मनोबोध 2 #',
      titleEn: 'Manobodh2',
    },
    {
      titleMr: 'मनोबोध 3 #',
      titleEn: 'Manobodh3',
    },
    {
      titleMr: 'मनोबोध 4 #',
      titleEn: 'Manobodh4',
    },
  ],
  'dasbodh-vachan/sansthan': dasbodhVachanSansthanItems.map((item) => ({
    ...item,
    cardType: 'mp3',
  })),
}

export const subjectAuthors = {
  dasbodh: [
    {
      slug: 'sushamatai-watve',
      titleMr: 'डॉ. सुषमाताई वाटवे',
      titleEn: 'Dr Sushamatai Watve',
      image: '/assets/authors/sushamatai.jpg',
    },
    {
      slug: 'other-authors',
      titleMr: 'इतर लेखक',
      titleEn: 'Other Authors',
      image: '/assets/authors/other-authors.png',
    },
    {
      slug: 'shrikrushna-deshmukh',
      titleMr: 'श्रीकृष्ण देशमुख',
      titleEn: 'Shrikrushna Deshmukh',
    },
    {
      slug: 'sunil-chincholkar',
      titleMr: 'सुनील चिंचोळकर',
      titleEn: 'Sunil Chincholkar',
      image: '/assets/authors/chincholkar.jpg',
    },
    {
      slug: 'shrinivas-rairikar',
      titleMr: 'श्रीनिवास रायरीकर',
      titleEn: 'Shrinivas Rairikar',
      image: '/assets/authors/shriniwas.jpg',
    },
  ],
  'manache-shlok': [
    {
      slug: 'other-authors',
      titleMr: 'इतर लेखक',
      titleEn: 'Other Authors',
      image: '/assets/authors/other-authors.png',
    },
    {
      slug: 'charudatta-aphle',
      titleMr: 'चारूदत्त आफळे',
      titleEn: 'Charudatta Aphle',
      image: '/assets/authors/caphale.jpg',
    },
    {
      slug: 'sushamatai-watve',
      titleMr: 'डॉ. सुषमाताई वाटवे',
      titleEn: 'Dr Sushamatai Watve',
      image: '/assets/authors/sushamatai.jpg',
    },
    {
      slug: 'kumudagraj-ashok-joshi',
      titleMr: 'कुमुदाग्रज -अशोक जोशी',
      titleEn: 'Kumudagraj - Ashok Joshi',
    },
  ],
  nirupan: [
    {
      slug: 'other-authors',
      titleMr: 'इतर लेखक',
      titleEn: 'Other Authors',
      image: '/assets/authors/other-authors.png',
    },
    {
      slug: 'sansthan',
      titleMr: 'संस्थान',
      titleEn: 'Sansthan',
      image: '/assets/authors/sansthan.jpg',
    },
    {
      slug: 'mujaffar-hussain',
      titleMr: 'प्रो.मुज्जफ्फर हुसेन',
      titleEn: 'Mujjaffar Hussain',
      image: '/assets/authors/mujaffar.jpg',
    },
    {
      slug: 'dharmendraji',
      titleMr: 'आचार्य धर्मेन्द्रजी',
      titleEn: 'Acharya Dharmendraji',
      image: '/assets/authors/dharmendra.jpg',
    },
    {
      slug: 'dada-jadhav',
      titleMr: 'प्रो. दादा जाधव',
      titleEn: 'Dada Jadhav',
      image: '/assets/authors/dadajadhav.jpg',
    },
    {
      slug: 'charudatta-aphle',
      titleMr: 'चारूदत्त आफळे',
      titleEn: 'Charudatta Aphle',
      image: '/assets/authors/caphale.jpg',
    },
    {
      slug: 'varadanand-bharati',
      titleMr: 'वरदानंद भारती',
      titleEn: 'Varadanand Bharati',
      image: '/assets/authors/varadanand.jpg',
    },
  ],
  'dasbodh-vachan': [
    {
      slug: 'sansthan',
      titleMr: 'संस्थान',
      titleEn: 'Sansthan',
      image: '/assets/authors/sansthan.jpg',
    },
  ],
  'manache-shlok-pravachane': [
    {
      slug: 'mujaffar-hussain',
      titleMr: 'प्रो. मुज्जाफर हुसैन',
      titleEn: 'Mujjaffar Hussain',
      image: '/assets/authors/mujaffar.jpg',
    },
    {
      slug: 'dharmendraji',
      titleMr: 'आचार्य धर्मेन्द्रजी',
      titleEn: 'Acharya Dharmendraji',
      image: '/assets/authors/dharmendra.jpg',
    },
    {
      slug: 'chaitanya-maharaj',
      titleMr: 'चैतन्य महाराज',
      titleEn: 'Chaitanya Maharaj',
      image: '/assets/authors/chaitanya.jpg',
    },
    {
      slug: 'shrinivas-rairikar',
      titleMr: 'श्रीनिवास रायरीकर',
      titleEn: 'Shrinivas Rairikar',
      image: '/assets/authors/shriniwas.jpg',
    },
    {
      slug: 'makarandnath',
      titleMr: 'मकरंदनाथ',
      titleEn: 'Makarandnath',
      image: '/assets/authors/makarandnath.jpg',
    },
    {
      slug: 'kalyanitai-namjoshi',
      titleMr: 'कल्याणीताई नामजोशी',
      titleEn: 'Kalyanitai Namjoshi',
      image: '/assets/authors/kalyani.jpg',
    },
    {
      slug: 'prabhakar-pujari',
      titleMr: 'प्रभाकर पुजारी',
      titleEn: 'Prabhakar Pujari',
    },
    {
      slug: 'sushamatai-watve',
      titleMr: 'डॉ. सुषमाताई वाटवे',
      titleEn: 'Dr Sushamatai Watve',
      image: '/assets/authors/sushamatai.jpg',
    },
    {
      slug: 'other-authors',
      titleMr: 'इतर लेखक',
      titleEn: 'Other Authors',
      image: '/assets/authors/other-authors.png',
    },
  ],
  'samarth-krupechi-vachane': [
    {
      slug: 'sushamatai-watve',
      titleMr: 'डॉ. सुषमाताई वाटवे',
      titleEn: 'Dr Sushamatai Watve',
      image: '/assets/authors/sushamatai.jpg',
    },
  ],
  bhajan: [
    {
      slug: 'ramchandra-dekhane',
      titleMr: 'डॉ. रामचंद्र देखणे',
      titleEn: 'Dr. Ramchandra Dekhane',
      image: '/assets/authors/dekhane.jpg',
    },
    {
      slug: 'maya-joshi',
      titleMr: 'सौ. माया जोशी',
      titleEn: 'Mrs. Maya Joshi',
    },
    {
      slug: 'other-authors',
      titleMr: 'इतर लेखक',
      titleEn: 'Other Authors',
      image: '/assets/authors/other-authors.png',
    },
  ],
  karunashtake: [
    {
      slug: 'chaitanya-maharaj',
      titleMr: 'चैतन्य महाराज',
      titleEn: 'Chaitanya Maharaj',
      image: '/assets/authors/chaitanya.jpg',
    },
    {
      slug: 'charudatta-aphle',
      titleMr: 'चारुदत्त आफळे',
      titleEn: 'Charudatta Aphle',
      image: '/assets/authors/caphale.jpg',
    },
    {
      slug: 'sansthan',
      titleMr: 'संस्थान',
      titleEn: 'Sansthan',
      image: '/assets/authors/sansthan.jpg',
    },
  ],
  'dasnavami-dasbodh-adhava': [
    {
      slug: 'sushamatai-watve',
      titleMr: 'डॉ. सुषमाताई वाटवे',
      titleEn: 'Dr Sushamatai Watve',
      image: '/assets/authors/sushamatai.jpg',
    },
  ],
  'navavidha-bhakti': [
    {
      slug: 'mohanbua-ramadasi',
      titleMr: 'मोहनबुवा रामदासी',
      titleEn: 'Mohanbua Ramadasi',
      image: '/assets/authors/mohanbua.jpg',
    },
  ],
  'manache-shlok-nirupan': [
    {
      slug: 'ramchandra-dekhane',
      titleMr: 'डॉ. रामचंद्र देखणे',
      titleEn: 'Dr. Ramchandra Dekhane',
      image: '/assets/authors/dekhane.jpg',
    },
    {
      slug: 'swarnalata-bhishikar',
      titleMr: 'डॉ स्वर्णलता भिषीकर',
      titleEn: 'Dr Swarnalata Bhishikar',
      image: '/assets/authors/swarnalata.jpg',
    },
  ],
  'dainandin-upasana': [
    {
      slug: 'sansthan',
      titleMr: 'संस्थान',
      titleEn: 'Sansthan',
      image: '/assets/authors/sansthan.jpg',
    },
  ],
  'samarth-charitra': [
    {
      slug: 'shivajirao-bhosale',
      titleMr: 'प्रा. शिवाजीराव भोसले',
      titleEn: 'Prof. ShivajiRao Bhosale',
      image: '/assets/authors/shivaji.jpg',
    },
    {
      slug: 'varadanand-bharati',
      titleMr: 'वरदानंद भारती',
      titleEn: 'Varadanand Bharati',
      image: '/assets/authors/varadanand.jpg',
    },
    {
      slug: 'swami-govinddev-giri',
      titleMr: 'स्वामी गोविंददेव गिरी (आचार्य किशोर व्यास)',
      titleEn: 'Swami Govinddev Giri (Acharya Kishorji Vyas)',
    },
    {
      slug: 'other-authors',
      titleMr: 'इतर लेखक',
      titleEn: 'Other Authors',
      image: '/assets/authors/other-authors.png',
    },
  ],
  'samarthanchi-kavyasrushti': [
    {
      slug: 'sunil-chincholkar',
      titleMr: 'सुनील चिंचोळकर',
      titleEn: 'Sunil Chincholkar',
      image: '/assets/authors/chincholkar.jpg',
    },
  ],
  'guru-tatva': [
    {
      id: 'shreedhar-swami-1',
      slug: 'shreedhar-swami-1',
      authorSlug: 'shreedhar-swami',
      titleMr: 'श्रीधर स्वामी',
      titleEn: 'Shreedhar Swami',
      image: '/assets/authors/shridhar-swami-1.jpg',
    },
    {
      id: 'shreedhar-swami-2',
      slug: 'shreedhar-swami-2',
      authorSlug: 'shreedhar-swami',
      titleMr: 'श्रीधर स्वामी',
      titleEn: 'Shreedhar Swami',
      image: '/assets/authors/shridhar-swami-2.jpg',
    },
    {
      id: 'shreedhar-swami-3',
      slug: 'shreedhar-swami-3',
      authorSlug: 'shreedhar-swami',
      titleMr: 'श्रीधर स्वामी',
      titleEn: 'Shreedhar Swami',
      image: '/assets/authors/shridhar-swami-3.jpg',
    },
    {
      id: 'shreedhar-swami-4',
      slug: 'shreedhar-swami-4',
      authorSlug: 'shreedhar-swami',
      titleMr: 'श्रीधर स्वामी',
      titleEn: 'Shreedhar Swami',
      image: '/assets/authors/shridhar-swami-4.jpg',
    },
  ],
  aarti: [
    {
      slug: 'charudatta-aphle',
      titleMr: 'चारुदत्त आफळे',
      titleEn: 'Charudatta Aphle',
      image: '/assets/authors/caphale.jpg',
    },
  ],
  others: [
    {
      slug: 'sansthan',
      titleMr: 'संस्थान',
      titleEn: 'Sansthan',
      image: '/assets/authors/sansthan.jpg',
    },
    {
      slug: 'other-authors',
      titleMr: 'इतर लेखक',
      titleEn: 'Other Authors',
      image: '/assets/authors/other-authors.png',
    },
    {
      slug: 'charudatta-aphle',
      titleMr: 'चारुदत्त आफळे',
      titleEn: 'Charudatta Aphle',
      image: '/assets/authors/caphale.jpg',
    },
    {
      slug: 'sunil-chincholkar',
      titleMr: 'सुनील चिंचोळकर',
      titleEn: 'Sunil Chincholkar',
      image: '/assets/authors/chincholkar.jpg',
    },
    {
      slug: 'mohanbua-ramadasi',
      titleMr: 'मोहनबुवा रामदासी',
      titleEn: 'Mohanbua Ramadasi',
      image: '/assets/authors/mohanbua.jpg',
    },
    {
      slug: 'sudhir-nirgudkar',
      titleMr: 'डॉ. सुधीर निर्गुडकर',
      titleEn: 'Dr. Sudhir Nirgudkar',
    },
  ],
  shloka: [
    {
      slug: 'sansthan',
      titleMr: 'संस्थान',
      titleEn: 'Sansthan',
      image: '/assets/authors/sansthan.jpg',
    },
    {
      slug: 'other-authors',
      titleMr: 'इतर लेखक',
      titleEn: 'Other Authors',
      image: '/assets/authors/other-authors.png',
    },
  ],
}

export const subjectSidebarAuthorOrder = {
  'manache-shlok': {
    default: [
      'sushamatai-watve',
      'kumudagraj-ashok-joshi',
      'other-authors',
      'charudatta-aphle',
    ],
    'charudatta-aphle': [
      'sushamatai-watve',
      'kumudagraj-ashok-joshi',
      'other-authors',
    ],
    'sushamatai-watve': [
      'other-authors',
      'charudatta-aphle',
      'kumudagraj-ashok-joshi',
    ],
    'kumudagraj-ashok-joshi': [
      'sushamatai-watve',
      'charudatta-aphle',
      'other-authors',
    ],
  },
  nirupan: {
    default: [
      'varadanand-bharati',
      'dharmendraji',
      'mujaffar-hussain',
      'dada-jadhav',
      'sansthan',
      'charudatta-aphle',
      'other-authors',
    ],
    'other-authors': [
      'varadanand-bharati',
      'dharmendraji',
      'mujaffar-hussain',
      'dada-jadhav',
      'sansthan',
      'charudatta-aphle',
    ],
    'sansthan': [
      'varadanand-bharati',
      'dharmendraji',
      'mujaffar-hussain',
      'dada-jadhav',
      'charudatta-aphle',
      'other-authors',
    ],
    'mujaffar-hussain': [
      'varadanand-bharati',
      'dharmendraji',
      'dada-jadhav',
      'sansthan',
      'charudatta-aphle',
      'other-authors',
    ],
    'dharmendraji': [
      'varadanand-bharati',
      'mujaffar-hussain',
      'dada-jadhav',
      'sansthan',
      'charudatta-aphle',
      'other-authors',
    ],
    'dada-jadhav': [
      'varadanand-bharati',
      'dharmendraji',
      'mujaffar-hussain',
      'sansthan',
      'charudatta-aphle',
      'other-authors',
    ],
    'charudatta-aphle': [
      'varadanand-bharati',
      'dharmendraji',
      'mujaffar-hussain',
      'dada-jadhav',
      'sansthan',
      'other-authors',
    ],
    'varadanand-bharati': [
      'dharmendraji',
      'mujaffar-hussain',
      'dada-jadhav',
      'sansthan',
      'charudatta-aphle',
      'other-authors',
    ],
  },
}

export function getSubjectBySlug(slug) {
  return subjects.find((subject) => subject.slug === slug)
}

export function getOtherSubjects(currentSlug) {
  return subjects.filter((subject) => subject.slug !== currentSlug)
}

export function getAuthorsForSubject(subjectSlug) {
  return subjectAuthors[subjectSlug] ?? []
}

export function getAuthorForSubject(subjectSlug, authorSlug) {
  return getAuthorsForSubject(subjectSlug).find(
    (author) => author.slug === authorSlug || author.authorSlug === authorSlug,
  )
}

export function getOtherAuthorsForSubject(subjectSlug, currentAuthorSlug) {
  const authors = getAuthorsForSubject(subjectSlug).filter(
    (author) =>
      author.slug !== currentAuthorSlug &&
      (author.authorSlug ?? author.slug) !== currentAuthorSlug,
  )
  const seenLinkSlugs = new Set()
  const uniqueAuthors = authors.filter((author) => {
    const linkSlug = author.authorSlug ?? author.slug
    if (seenLinkSlugs.has(linkSlug)) return false
    seenLinkSlugs.add(linkSlug)
    return true
  })
  const subjectOrder = subjectSidebarAuthorOrder[subjectSlug]
  if (!subjectOrder) return uniqueAuthors

  const order =
    subjectOrder[currentAuthorSlug] ?? subjectOrder.default ?? []

  return [...uniqueAuthors].sort(
    (a, b) => order.indexOf(a.slug) - order.indexOf(b.slug),
  )
}

export function getSubjectAuthorUrl(subjectSlug, authorSlug) {
  return `/subject/${subjectSlug}/author/${authorSlug}`
}

export function getLiteratureForAuthor(subjectSlug, authorSlug) {
  return subjectLiterature[`${subjectSlug}/${authorSlug}`] ?? []
}

export function getAudiosForAuthor(subjectSlug, authorSlug) {
  return subjectAudios[`${subjectSlug}/${authorSlug}`] ?? []
}
