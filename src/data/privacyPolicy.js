export const privacyOrganisation = 'RealLives Foundation'
export const privacyContactPerson = 'Viraj Kabbur'
export const privacyContactEmail = 'viraj.kabbur@reallivesworld.com'

export const privacyDates = {
  effectiveMr: '२५ ऑगस्ट २०२६',
  effectiveEn: '25 August 2026',
  updatedMr: '२५ ऑगस्ट २०२६',
  updatedEn: '25 August 2026',
}

export const privacySubtitle = {
  subtitleMr: 'श्री समर्थ रामदास मोबाइल अॅप आणि samarthramdas400.in',
  subtitleEn: 'श्री समर्थ रामदास mobile app and samarthramdas400.in',
}

/** @typedef {{ type: 'p' | 'list' | 'labeled' | 'callout' | 'contact', mr: string | string[], en: string | string[], labelMr?: string, labelEn?: string }} PolicyBlock */

/** @type {{ id: string, titleMr: string, titleEn: string, blocks: PolicyBlock[] }[]} */
export const privacySections = [
  {
    id: 'who-we-are',
    titleMr: 'आम्ही कोण आहोत',
    titleEn: 'Who we are',
    blocks: [
      {
        type: 'p',
        mr: 'हे अॅप आणि वेबसाइट {org}, भारत यांनी बनवले आणि देखरेख केले आहे.',
        en: 'This app and website are made and maintained by {org}, India.',
      },
      {
        type: 'p',
        mr: 'या धोरणाबाबत कोणताही प्रश्न असल्यास {email} वर लिहा.',
        en: 'For any question about this policy, write to {email}.',
      },
    ],
  },
  {
    id: 'short-version',
    titleMr: 'थोडक्यात',
    titleEn: 'The short version',
    blocks: [
      {
        type: 'callout',
        mr: 'आम्ही तुम्ही कोण आहात हे विचारत नाही, आणि तुम्ही काय वाचता किंवा ऐकता याचा मागोवा घेत नाही.',
        en: 'We do not ask who you are, and we do not track what you read or listen to.',
      },
      {
        type: 'p',
        mr: 'या अॅपमध्ये खाती नाहीत, साइन-इन नाही, जाहिराती नाहीत आणि विश्लेषण (analytics) नाही. तुमची बुकमार्क्स, डाउनलोड्स आणि प्लेबॅक स्थिती तुमच्या स्वतःच्या डिव्हाइसवर साठवली जाते आणि आमच्याकडे कधीही पाठवली जात नाही.',
        en: 'There are no accounts, no sign-in, no advertising, and no analytics in this app. Your bookmarks, downloads and playback positions are stored on your own device and are never sent to us.',
      },
    ],
  },
  {
    id: 'on-device',
    titleMr: 'काय तुमच्या डिव्हाइसवर राहते',
    titleEn: 'What stays on your device',
    blocks: [
      {
        type: 'p',
        mr: 'अॅप खालील माहिती तुमच्या डिव्हाइसच्या स्वतःच्या स्टोरेजमध्ये स्थानिक पातळीवर साठवते. यापैकी काहीही आमच्या सर्व्हरपर्यंत पोहोचत नाही, आणि आम्ही ते पाहू शकत नाही:',
        en: "The app saves the following locally, using your device's own storage. None of it reaches our servers, and we cannot see it:",
      },
      {
        type: 'list',
        mr: [
          'तुम्ही बुकमार्क केलेली साहित्ये',
          'ऑफलाइन वापरासाठी डाउनलोड केलेल्या फाईल्स',
          'रेकॉर्डिंगमध्ये तुम्ही किती ऐकले आहे',
          'अॅप भाषेची तुमची निवड (मराठी किंवा इंग्रजी)',
        ],
        en: [
          'Works you have bookmarked',
          'Files you have downloaded for offline use',
          'How far through a recording you have listened',
          'Your choice of app language (Marathi or English)',
        ],
      },
      {
        type: 'p',
        mr: 'अॅप अनइंस्टॉल केल्यावर हे सर्व हटवले जाते. डाउनलोड्स स्क्रीनवरून तुम्ही डाउनलोड केलेल्या फाईल्स कधीही काढू शकता.',
        en: 'All of it is deleted when you uninstall the app. You can remove downloaded files at any time from the Downloads screen.',
      },
    ],
  },
  {
    id: 'servers',
    titleMr: 'आमच्या सर्व्हरला काय मिळते',
    titleEn: 'What our servers receive',
    blocks: [
      {
        type: 'p',
        mr: 'अॅप कॅटलॉग किंवा फाईल आणते तेव्हा, ते आमच्या होस्टिंग प्रदात्याकडे, {cloudflare}, एक सामान्य वेब विनंती करते. कोणत्याही वेब सर्व्हरप्रमाणे, Cloudflare सुरक्षा आणि विश्वासार्हतेसाठी मानक तांत्रिक माहिती नोंदवते:',
        en: 'When the app fetches the catalogue or a file, it makes an ordinary web request to our hosting provider, {cloudflare}. Like any web server, Cloudflare records standard technical information for security and reliability:',
      },
      {
        type: 'list',
        mr: [
          'आयपी पत्ता',
          'विनंतीची तारीख आणि वेळ',
          'कोणती फाईल किंवा कॅटलॉग पृष्ठ मागितले गेले',
          'मूलभूत डिव्हाइस किंवा ब्राउझर प्रकार',
        ],
        en: [
          'IP address',
          'Date and time of the request',
          'Which file or catalogue page was requested',
          'Basic device or browser type',
        ],
      },
      {
        type: 'p',
        mr: 'आम्ही हे फक्त सेवा चालू ठेवण्यासाठी आणि दुरुपयोगापासून संरक्षण करण्यासाठी वापरतो. आम्ही तुमची प्रोफाइल तयार करण्यासाठी हे वापरत नाही, इतर कोणत्याही गोष्टीशी जोडत नाही, आणि विकत किंवा शेअर करत नाही. Cloudflare हे आमच्या वतीने त्यांच्या स्वतःच्या गोपनीयता अटींनुसार प्रक्रिया करते.',
        en: 'We use this only to keep the service running and to protect it from abuse. We do not use it to build a profile of you, we do not combine it with anything else, and we do not sell or share it. Cloudflare processes this on our behalf under its own privacy terms.',
      },
    ],
  },
  {
    id: 'updates',
    titleMr: 'अॅप अद्यतने',
    titleEn: 'App updates',
    blocks: [
      {
        type: 'p',
        mr: 'अॅप सुरू होताना अद्यतनांसाठी तपासणी करते. ही तपासणी {expo} चालवलेल्या सर्व्हरशी संपर्क करते आणि फक्त अद्यतन लागू होते का हे ठरवण्यासाठी आवश्यक माहिती पाठवते: अॅप आवृत्ती, प्लॅटफॉर्म आणि डिव्हाइस प्रकार. तुमच्याबद्दल किंवा तुम्ही काय वाचत आहात याबद्दल काहीही पाठवले जात नाही.',
        en: 'The app checks for updates when it starts. This check contacts servers operated by {expo} and sends only what is needed to decide whether an update applies: the app version, the platform, and the device type. It does not send anything about you or what you have been reading.',
      },
    ],
  },
  {
    id: 'permissions',
    titleMr: 'अॅप मागणाऱ्या परवानग्या',
    titleEn: 'Permissions the app asks for',
    blocks: [
      {
        type: 'labeled',
        labelMr: 'सूचना (Android).',
        labelEn: 'Notifications (Android).',
        mr: 'फक्त ऑडिओ पार्श्वभूमीत वाजत असताना प्लेबॅक नियंत्रणे दाखवण्यासाठी. आम्ही जाहिराती किंवा इतर कोणत्याही सूचना पाठवत नाही. नकार दिल्यास अॅप वापरणे थांबत नाही, मात्र सिस्टम पार्श्वभूमी प्लेबॅक व्यत्यय आणू शकते.',
        en: 'Used only to show the playback controls while audio is playing in the background. We do not send promotional or any other notifications. Declining it does not stop you using the app, though background playback may be interrupted by the system.',
      },
      {
        type: 'labeled',
        labelMr: 'स्टोरेज.',
        labelEn: 'Storage.',
        mr: 'डाउनलोड केलेल्या फाईल्स अॅपच्या स्वतःच्या खाजगी फोल्डरमध्ये लिहिल्या जातात. अॅप तुमचे फोटो, संपर्क, स्थान, मायक्रोफोन किंवा डिव्हाइसवरील इतर कोणतीही फाईल वाचत नाही.',
        en: "Downloaded files are written to the app's own private folder. The app does not read your photos, contacts, location, microphone, or any other file on your device.",
      },
    ],
  },
  {
    id: 'we-do-not',
    titleMr: 'आम्ही काय करत नाही',
    titleEn: 'What we do not do',
    blocks: [
      {
        type: 'list',
        mr: [
          'वापरकर्ता खाती नाहीत आणि वैयक्तिक माहिती गोळा केली जात नाही',
          'जाहिराती नाहीत आणि जाहिरात ओळखकर्ते नाहीत',
          'विश्लेषण, ट्रॅकिंग पिक्सेल किंवा तृतीय-पक्ष ट्रॅकर्स नाहीत',
          'कोणाशीही डेटा विकला किंवा शेअर केला जात नाही',
          'क्रॉस-अॅप किंवा क्रॉस-साइट ट्रॅकिंग नाही',
        ],
        en: [
          'No user accounts and no personal information collected',
          'No advertising and no advertising identifiers',
          'No analytics, tracking pixels, or third-party trackers',
          'No selling or sharing of any data with anyone',
          'No cross-app or cross-site tracking',
        ],
      },
    ],
  },
  {
    id: 'website',
    titleMr: 'वेबसाइट',
    titleEn: 'The website',
    blocks: [
      {
        type: 'p',
        mr: 'samarthramdas400.in त्याच तऱ्हेने काम करते. तुम्ही संपर्क फॉर्म वापरल्यास, तो {web3forms} द्वारे आमच्याकडे पोहोचतो, आणि तुम्ही त्यात लिहिलेले सर्व काही आम्हाला मिळते, ईमेल पत्ता दिला असल्यास तोही. आम्ही ते फक्त तुम्हाला उत्तर देण्यासाठी वापरतो.',
        en: 'samarthramdas400.in works the same way. If you use the contact form, it is delivered to us by {web3forms}, and we receive whatever you typed into it, including your email address if you supplied one. We use that only to reply to you.',
      },
    ],
  },
  {
    id: 'children',
    titleMr: 'मुले',
    titleEn: 'Children',
    blocks: [
      {
        type: 'p',
        mr: 'अॅपमध्ये सर्व वयोगटांसाठी योग्य भक्तिमय आणि साहित्यिक सामग्री आहे. आम्ही कोणाचीही वैयक्तिक माहिती गोळा करत नसल्यामुळे, मुलांकडूनही काहीही गोळा करत नाही.',
        en: 'The app contains devotional and literary material suitable for all ages. Because we collect no personal information from anyone, we collect none from children either.',
      },
    ],
  },
  {
    id: 'rights',
    titleMr: 'तुमचे अधिकार',
    titleEn: 'Your rights',
    blocks: [
      {
        type: 'p',
        mr: 'आमच्याकडे तुमची वैयक्तिक माहिती नसल्यामुळे, सामान्यतः पाहण्यासाठी, दुरुस्त करण्यासाठी किंवा हटवण्यासाठी काहीही नसते. आमच्याकडे तुमच्याबद्दल काही आहे असे तुम्हाला वाटत असल्यास, किंवा अॅप डेटा कसा हाताळते याबद्दल काळजी असल्यास, {email} वर लिहा; आम्ही ३० दिवसांत उत्तर देऊ.',
        en: 'Since we hold no personal information about you, there is normally nothing to access, correct or delete. If you believe we hold something about you, or you have a concern about how the app handles data, write to {email} and we will respond within 30 days.',
      },
      {
        type: 'p',
        mr: 'भारताच्या डिजिटल वैयक्तिक डेटा संरक्षण कायदा, २०२३ नुसार, आमचा तक्रार संपर्क {person} ({email}) आहे.',
        en: "Under India's Digital Personal Data Protection Act, 2023, our grievance contact is {person} ({email}).",
      },
    ],
  },
  {
    id: 'changes',
    titleMr: 'या धोरणातील बदल',
    titleEn: 'Changes to this policy',
    blocks: [
      {
        type: 'p',
        mr: 'हे धोरण बदलल्यास, आम्ही वरची तारीख अद्यतनित करू आणि या पृष्ठावर नवीन आवृत्ती प्रकाशित करू. महत्त्वाचे बदल अॅपमध्ये नोंदवले जातील.',
        en: 'If this policy changes, we will update the date at the top and publish the new version on this page. Significant changes will be noted in the app.',
      },
    ],
  },
  {
    id: 'contact',
    titleMr: 'संपर्क',
    titleEn: 'Contact',
    blocks: [{ type: 'contact', mr: '', en: '' }],
  },
]
