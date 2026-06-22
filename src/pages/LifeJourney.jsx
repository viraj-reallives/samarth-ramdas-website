import { useCallback, useEffect, useRef, useState } from 'react'
import InnerBanner from '../components/InnerBanner'
import pageUi from '../styles/pageUi.module.css'
import { lifeJourneyVisuals } from '../data/lifeJourneyVisuals'
import { FiChevronLeft, FiChevronRight, FiPause, FiPlay, FiX, FiZoomIn } from 'react-icons/fi'
import styles from './LifeJourney.module.css'

const marathiSections = [
  {
    title: 'जन्म',
    text: 'चैत्र शु. ९ ( रामनवमी ) शके १५३० : सन १६०८ दुपारी बारा वाजता. जिल्हा – औरंगाबाद, तालुका – अंबड, गाव – जांब. गोदावरी नदीकाठी, नाव – नारायण. मोठा भाऊ – गंगाधर, पिता – सूर्याजीपंत, माता – राणूबाई, आडनाव – ठोसर. घराण्यात सूर्य आणि श्रीराम यांच्या उपासनेची दीर्घ परंपरा.',
  },
  {
    title: 'बालपण',
    text: 'मर्दानी खेळ, व्यायाम यांची आवड, शरीर कमावलेले, बुध्दी तीव्र, मनोनिग्रह दृढ. वृत्ती हनुमंत आणि श्रीराम यांच्या भक्तीकडे. भक्ती, शुध्द चारित्र्य यांच्या अभावी लोक जन्ममृत्युच्या फेर्यात अडकतात याचे दु:ख वाटे. यातून लोकांची सुटका कशी करता येईल याची बालपणापासून चिंता. स्वत:चा विवाह, गृहस्थाश्रम यांची नावड. जन्मजात विरागी. वयाच्या अकराव्या वर्षी श्रीरामाचा साक्षात्कार. श्रीरामाचा आदेश – कृष्णातीरी जाऊन धर्मस्थापना करणे. शिसोदिया वंशी शिवनामा अवतार घेणार आहे. त्यास उपासना देऊन साह्य करणे.',
  },
  {
    title: null,
    text: 'आईच्या आग्रहाखातर नारायण लग्नाच्या बोहल्यावर उभा राहिला. त्यावेळी वय बारा वर्षांचे. पण विवाहमंत्रातील ‘सावधान’ शब्द ऎकताच खरोखरीच सावध होऊन पलायन. थेट नाशिक – पंचवटी गाठली. श्रीरामाचे दर्शन घेऊन साधनेसाठी निवांत स्थळ म्हणून नाशिकजवळील टाकळी येथे राहणे. तेथे गोदावरी – नंदिनी नद्यांचा संगम.',
  },
  {
    title: 'साधना',
    text: 'भल्या पहाटे उठणे. प्रातर्विधी, स्नान, सूर्यनमस्कार. मग नदीच्या पात्रात कमरेइतक्या पाण्यात उभे राहून सूर्य माथ्यावर येईपर्यंत ‘श्रीराम जय राम जय जय राम’ या तेरा अक्षरी मंत्राचा जप. त्यानंतर फक्त पाच घरी माधुकरी मागणे. श्रीरामाला नैवेद्य दाखवून मग स्वत: जेवणे. दुपारी पंचवटीतील श्रीराममंदिरात जाऊन अध्यात्मग्रंथांचे वाचन – श्रवण. वाल्मिकी रामायणाचा अभ्यास व लेखन. सायंकाळी प्रवचन कीर्तन, रात्री भजन ऎकणे. आरती झाल्यावर निद्रा.',
  },
  {
    title: null,
    text: 'असा क्रम अखंड बारा वर्षे. तेरा कोटी श्रीरामनामाचा जप. परिणामी अष्टसिध्दींची प्राप्ती व श्रीरामाचा साक्षात्कार. धर्मस्थापना करावी, असा रामाचा आदेश. रामानेच ‘समर्थ’ अशी पदवी देणे. पूर्वीचे नारायण हे नाव लुप्त. मात्र स्वत:ला नेहमी ‘रामदास’ म्हणवून घेणे.',
  },
  {
    title: 'तीर्थयात्रा व लोकस्थितीचे अवलोकन',
    text: 'शके १५४४ म्हणजेच सन १६३२ मध्ये तीर्थयात्रा व धर्मस्थापना यासाठी टाकळीतून बाहेर पडणे. पुढील बारा वर्षात आसेतुहिमाचल भारतभ्रमण. लोकस्थितीचे सूक्ष्म अवलोकन. ध्यानात आले की, वारंवार पडणारे ओले – कोरडे दुष्काळ आणि मुसलमान सुलतानांची पाशवी आक्रमणे – त्यांचे मदतनीस आपलेच लोक – यांनी सगळे समाजजीवन उध्वस्त झालेले. लोक भीतिग्रस्त आणि निराश. त्यातून सर्वत्र अधर्म माजलेला. ही देश – लोकस्थिती वर्णन करणारी रामदासांची ‘अस्मानी सुलतानी’ आणि ‘परचक्रनिरुपण’ ही दोन स्फुट काव्ये. भारताच्या संपूर्ण संतवाङ्मयात अशी स्वकाळाची वर्णने करणारी काव्ये नाहीत.',
  },
  {
    title: null,
    text: 'उध्वस्त समाज, निराशेने दैववादी झालेले लोक पाहून रामदासस्वामीही हळहळले. पण नुसते हळहळत बसणे हा विश्वकल्याणाची चिंता लागलेल्या रामदासांचा स्वभावच नव्हता. ह्या दु:स्थितीतून समाजाला बाहेर काढून त्याच्या हातून शुध्द धर्माचे रक्षण, आचरण व्हावे आणि यासाठी स्वत:च्या हाती राज्यसत्ता असायला हवी या विचारांचा त्यांनी प्रसार – प्रचार करायला सुरुवात केली.',
  },
  {
    title: 'कार्यारंभ व विस्तार',
    text: 'आपल्या या समाज जागृतीच्या कार्याला चाफळ हे ठिकाण उत्तम आहे असे समजून स्वामी शके १५६६ – सन १६४४ मध्ये तेथे आले. तेथे श्रीरामाच्या मूर्तीची स्थापना करुन धडाक्याने रामजन्मोत्सव सुरु केला.',
  },
  {
    title: 'मठस्थापना व स्त्रियांचे सबलीकरण',
    text: 'आपल्या राष्ट्र्जागृतीच्या कार्यासाठी रामदासांनी देशभर जागोजागी मठ स्थापन केले. अनेक महंत – शिष्य तयार केले. एवढेच नव्हे तर स्त्रियांनाही या धर्मकार्याला लावले. रामदासांच्या अठरा स्त्री शिष्या होत्या. त्यापैकी वेणाबाईंना त्यांनी मिरजेच्या मठाची व्यवस्था सांगितली. आक्काबाईंना चाफळ व सज्जनगडाची व्यवस्था सांगितली.',
  },
  {
    title: null,
    text: 'चाफळजवळ शिंगणवाडी येथे रामदासस्वामी व शिवाजीराजे यांची शके १५७१ मध्ये – सन १६४९ मध्ये – भेट झाली. रामदासांनी राजांना अनुग्रह दिला. त्यानंतर त्यांच्या अनेक भेटी झाल्या.',
  },
  {
    title: null,
    text: 'या वेळेपर्यंत रामदासस्वामींच्या अवतार कार्याची समाप्ती आली होती. जाण्यापूर्वी त्यांनी शिष्यांना म्हटले, ” माझी काया गेली खरे । परी मी आहे जगदाकारे । करु नका खटपट । पहा माझा ग्रंथ नीट ॥”',
  },
  {
    title: null,
    text: 'अखेरीस माघ वद्य नवमी शके १६०३ – सन १६८१ – रोजी रामदासस्वामींनी सज्जनगडावर देह ठेवला. आता आपल्यापाशी स्वामींच्या दासबोध, मनाचे श्लोक, आत्माराम, या मुख्य ग्रंथांशिवाय मानपंचक, धन्य ते गायनीकळा, सुकृताचा योग, बागप्रकरण, कारखाने प्रकरण, आनंदवनभुवन, शिवकल्याणराजा व इतर खूप मोठा वाङ्मय संभार आहे. त्याच्या अभ्यासाने आजच्या देशाच्या अवनतीच्या काळात आपल्याला नक्कीच देशोध्दाराची प्रेरणा मिळू शकते.',
  },
]

const englishSections = [
  {
    text: 'A saint for all ages who aimed at building powerful & virtuous human religion. Though he lived four centuries ago, his teaching transcends all limits of time. His philosophy not only reawakened & rejuvenated the then doomed spirit of Maharashtra, but is equally valid for today’s Indian scenario, engulfed by corruption, poverty, promiscuity & reckless consumerism.',
  },
  {
    text: 'The principles governing his philosophy are very simple to follow and yet unique as they appeal to the commonsense, demand action in life & aim at building character through actual behavioural changes. According to Samarth Ramdas, “time-management” is at the core of successful life.',
  },
  {
    text: 'Isn’t it the same as the modern managerial jargon? which is directed effectively towards the highest truth. Only Samartha’s philosophy can rescue our nation today from its present doom, take the nation on the part of health & wealth, by teaching youth self-courted & imbibing self-dignity.',
  },
]

const AUTOPLAY_MS = 7000

function LifeJourneyVisualGallery() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [slideDir, setSlideDir] = useState('next')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [isAutoplay, setIsAutoplay] = useState(false)
  const touchStartX = useRef(0)

  const active = lifeJourneyVisuals[activeIndex]
  const total = lifeJourneyVisuals.length
  const progress = ((activeIndex + 1) / total) * 100

  const goTo = useCallback((index, direction = 'next') => {
    setSlideDir(direction)
    setActiveIndex((index + total) % total)
  }, [total])

  const goNext = useCallback(() => goTo(activeIndex + 1, 'next'), [activeIndex, goTo])
  const goPrev = useCallback(() => goTo(activeIndex - 1, 'prev'), [activeIndex, goTo])

  const openLightbox = () => setLightboxOpen(true)
  const closeLightbox = () => setLightboxOpen(false)

  useEffect(() => {
    if (!isAutoplay || lightboxOpen) return undefined

    const timer = window.setInterval(goNext, AUTOPLAY_MS)
    return () => window.clearInterval(timer)
  }, [isAutoplay, lightboxOpen, goNext])

  useEffect(() => {
    const onKeyDown = (event) => {
      const tag = event.target.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return

      if (lightboxOpen) {
        if (event.key === 'Escape') closeLightbox()
        if (event.key === 'ArrowLeft') goPrev()
        if (event.key === 'ArrowRight') goNext()
        return
      }

      if (event.key === 'ArrowLeft') goPrev()
      if (event.key === 'ArrowRight') goNext()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lightboxOpen, goNext, goPrev])

  useEffect(() => {
    if (!lightboxOpen) {
      document.body.style.overflow = ''
      return undefined
    }

    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [lightboxOpen])

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX
  }

  const handleTouchEnd = (event) => {
    const delta = event.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(delta) < 48) return
    if (delta < 0) goNext()
    else goPrev()
  }

  return (
    <section className={styles.visualSection} aria-labelledby="life-journey-visual-title">
      <header className={styles.visualHeader}>
        <p className={styles.visualEyebrow}>॥ जय जय रघुवीर समर्थ ॥</p>
        <h2 className={styles.visualTitle} id="life-journey-visual-title">
          जीवन प्रवास / Life Journey
        </h2>
        <p className={styles.visualIntro}>
          समर्थ रामदास स्वामींच्या जीवनातील महत्त्वाचे टप्पे — टॅप करा, स्वाइप करा किंवा स्लाइडशो पहा.
          <span className={styles.visualIntroEn}>
            Explore key milestones — tap, swipe, or play the slideshow.
          </span>
        </p>
      </header>

      <div className={styles.timeline} role="tablist" aria-label="Life journey stages">
        <div className={styles.timelineTrack} aria-hidden="true">
          <span className={styles.timelineFill} style={{ width: `${progress}%` }} />
        </div>
        {lifeJourneyVisuals.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            className={index === activeIndex ? styles.timelineStepActive : styles.timelineStep}
            onClick={() => goTo(index, index > activeIndex ? 'next' : 'prev')}
          >
            <span className={styles.timelineDot}>{index + 1}</span>
            <span className={styles.timelineLabelMr}>{item.titleMr}</span>
          </button>
        ))}
      </div>

      <div className={styles.viewerCard}>
        <div className={styles.viewerToolbar}>
          <span className={styles.viewerCounter}>
            {activeIndex + 1} / {total}
          </span>
          <button
            type="button"
            className={isAutoplay ? styles.autoplayBtnActive : styles.autoplayBtn}
            onClick={() => setIsAutoplay((value) => !value)}
            aria-pressed={isAutoplay}
            aria-label={isAutoplay ? 'Pause slideshow' : 'Play slideshow'}
          >
            {isAutoplay ? <FiPause /> : <FiPlay />}
            <span>{isAutoplay ? 'थांबवा' : 'स्लाइडशो'}</span>
          </button>
        </div>

        <div
          className={styles.viewerStage}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className={styles.stageFrame}>
            <button
              type="button"
              className={styles.stageImageWrap}
              onClick={openLightbox}
              aria-label={`View ${active.titleEn} full size`}
            >
              <img
                key={active.id}
                src={active.src}
                alt={active.titleMr}
                className={`${styles.stageImage} ${slideDir === 'next' ? styles.slideNext : styles.slidePrev}`}
              />
              <span className={styles.stageZoom}>
                <FiZoomIn />
                मोठे पहा
              </span>
            </button>

            <button
              type="button"
              className={`${styles.stageNav} ${styles.stageNavPrev}`}
              onClick={goPrev}
              aria-label="Previous"
            >
              <FiChevronLeft />
            </button>

            <button
              type="button"
              className={`${styles.stageNav} ${styles.stageNavNext}`}
              onClick={goNext}
              aria-label="Next"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>

        <div className={styles.viewerInfo}>
          <h3 className={styles.viewerTitleMr}>{active.titleMr}</h3>
          <p className={styles.viewerTitleEn}>{active.titleEn}</p>
          <p className={styles.viewerDesc}>{active.descMr}</p>
          <p className={styles.viewerDescEn}>{active.descEn}</p>
        </div>

        <div className={styles.thumbGrid}>
          {lifeJourneyVisuals.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={index === activeIndex ? styles.thumbCardActive : styles.thumbCard}
              onClick={() => goTo(index, index > activeIndex ? 'next' : 'prev')}
              aria-current={index === activeIndex ? 'true' : undefined}
            >
              <span className={styles.thumbCardImgWrap}>
                <img src={item.src} alt="" />
                <span className={styles.thumbCardNum}>{index + 1}</span>
              </span>
              <span className={styles.thumbCardTitle}>{item.titleMr}</span>
            </button>
          ))}
        </div>
      </div>

      {lightboxOpen && (
        <div className={styles.lightbox} onClick={closeLightbox} role="presentation">
          <div
            className={styles.lightboxInner}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={active.titleEn}
          >
            <button type="button" className={styles.lightboxClose} onClick={closeLightbox} aria-label="Close">
              <FiX />
            </button>

            <div className={styles.lightboxTop}>
              <span className={styles.lightboxCounter}>
                {activeIndex + 1} / {total}
              </span>
              <p className={styles.lightboxTitleMr}>{active.titleMr}</p>
            </div>

            <div className={styles.lightboxStage}>
              <button type="button" className={styles.lightboxNav} onClick={goPrev} aria-label="Previous">
                <FiChevronLeft />
              </button>

              <figure className={styles.lightboxFigure}>
                <img src={active.src} alt={active.titleMr} className={styles.lightboxImage} />
              </figure>

              <button
                type="button"
                className={`${styles.lightboxNav} ${styles.lightboxNavNext}`}
                onClick={goNext}
                aria-label="Next"
              >
                <FiChevronRight />
              </button>
            </div>

            <p className={styles.lightboxDesc}>{active.descMr}</p>
          </div>
        </div>
      )}
    </section>
  )
}

function LifeJourney() {
  const [activeTab, setActiveTab] = useState('marathi')

  useEffect(() => {
    document.title = 'जीवन प्रवास – श्री समर्थ रामदास'
    return () => {
      document.title = 'श्री समर्थ रामदास - श्री रामदासांचे साहित्य'
    }
  }, [])

  return (
    <div className={styles.page}>
      <InnerBanner contentId="life-journey-content" />

      <div className={`${styles.section} ${pageUi.content}`} id="life-journey-content">
        <LifeJourneyVisualGallery />

        <div className={styles.tabBar} role="tablist" aria-label="Life journey content">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'marathi'}
            className={activeTab === 'marathi' ? styles.tabActive : styles.tab}
            onClick={() => setActiveTab('marathi')}
          >
            श्री समर्थ चरित्र
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'english'}
            className={activeTab === 'english' ? styles.tabActive : styles.tab}
            onClick={() => setActiveTab('english')}
          >
            Life Journey
          </button>
        </div>

        <div className={styles.content}>
          {activeTab === 'marathi' ? (
            <div role="tabpanel" className={styles.textBlock}>
              {marathiSections.map((section, index) => (
                <p key={index} className={styles.paragraph}>
                  {section.title && (
                    <strong className={styles.sectionTitle}>{section.title} – </strong>
                  )}
                  {section.text}
                </p>
              ))}
            </div>
          ) : (
            <div role="tabpanel" className={styles.textBlock}>
              {englishSections.map((section, index) => (
                <p key={index} className={styles.paragraph}>
                  {section.text}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LifeJourney
