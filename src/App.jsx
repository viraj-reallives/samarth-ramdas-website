import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
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

function App() {
  return (
    <BrowserRouter>
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
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
