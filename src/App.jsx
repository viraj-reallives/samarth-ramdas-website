import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import PageLoader from './components/PageLoader'
import Home from './pages/Home'
import LifeJourney from './pages/LifeJourney'
import Contact from './pages/Contact'
import NewsEvents from './pages/NewsEvents'
import Subject from './pages/Subject'
import SubjectDetail from './pages/SubjectDetail'
import SubjectAuthor from './pages/SubjectAuthor'
import Author from './pages/Author'
import AuthorDetail from './pages/AuthorDetail'
import Language from './pages/Language'
import LanguageDetail from './pages/LanguageDetail'
import LanguageSubject from './pages/LanguageSubject'
import Ringtones from './pages/Ringtones'
import Daswani from './pages/Daswani'
import NotFound from './pages/NotFound'
import { removeInitialHtmlLoader, waitForAppReady } from './utils/appLoader'

function AppRoutes() {
  const location = useLocation()
  const [initialLoading, setInitialLoading] = useState(true)
  const [navigating, setNavigating] = useState(false)
  const isFirstRoute = useRef(true)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname, location.search])

  useEffect(() => {
    let active = true

    waitForAppReady().then(() => {
      if (!active) return
      removeInitialHtmlLoader()
      setInitialLoading(false)
    })

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    if (initialLoading) return undefined

    if (isFirstRoute.current) {
      isFirstRoute.current = false
      return undefined
    }

    setNavigating(true)
    const timer = window.setTimeout(() => setNavigating(false), 420)
    return () => window.clearTimeout(timer)
  }, [location.pathname, initialLoading])

  const showLoader = initialLoading || navigating

  return (
    <>
      <PageLoader visible={showLoader} />
      <div className="appShell">
        <Header />
        <main className="appMain">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/life-journey" element={<LifeJourney />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/news-events" element={<NewsEvents />} />
            <Route path="/subject" element={<Subject />} />
            <Route path="/subject/:subjectSlug/author/:authorSlug" element={<SubjectAuthor />} />
            <Route path="/subject/:slug" element={<SubjectDetail />} />
            <Route path="/author" element={<Author />} />
            <Route path="/author/:slug" element={<AuthorDetail />} />
            <Route path="/language" element={<Language />} />
            <Route path="/language/:languageSlug/subject/:subjectSlug" element={<LanguageSubject />} />
            <Route path="/language/:slug" element={<LanguageDetail />} />
            <Route path="/ringtones" element={<Ringtones />} />
            <Route path="/daswani" element={<Daswani />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
