import { useCallback, useEffect, useMemo, useState } from 'react'
import { NavContext, I18nContext } from './context.js'
import { FR, MG, PAGES, HASHVIEW } from './data.js'
import Header from './components/Header.jsx'
import Ticker from './components/Ticker.jsx'
import DemoBanner from './components/DemoBanner.jsx'
import Footer from './components/Footer.jsx'
import Pager from './components/Pager.jsx'
import Fabs from './components/Fabs.jsx'
import WhatsAppPanel from './components/WhatsAppPanel.jsx'
import AIChat from './components/AIChat.jsx'
import Toast from './components/Toast.jsx'
import HomePage from './pages/HomePage.jsx'
import MinisterPage from './pages/MinisterPage.jsx'
import ReportPage from './pages/ReportPage.jsx'
import TrackPage from './pages/TrackPage.jsx'
import RegistryPage from './pages/RegistryPage.jsx'

function initial() {
  const hash = typeof window !== 'undefined' ? window.location.hash : ''
  const view = HASHVIEW[hash] || 'home'
  let page = PAGES.findIndex((p) => p.a === hash)
  if (hash === '#registre') page = -1
  if (page < 0 && view !== 'registry') page = 0
  return { view, page }
}

export default function App() {
  const start = useMemo(initial, [])
  const [view, setView] = useState(start.view)
  const [page, setPage] = useState(start.page)
  const [lang, setLang] = useState('fr')
  const [panel, setPanel] = useState(null)

  const go = useCallback((nextView, nextHash, opts = {}) => {
    setView(nextView)
    if (nextHash) {
      try {
        history.replaceState(null, '', nextHash)
      } catch (e) {
        /* ignore */
      }
    }
    if (!opts.fromPager) {
      if (nextView === 'registry') {
        setPage(-1)
      } else {
        let i = PAGES.findIndex(
          (p) => p.v === nextView && (nextView !== 'home' || p.a === nextHash),
        )
        if (nextView === 'home' && nextHash === '#accueil') i = 0
        if (i >= 0) setPage(i)
      }
    }
    if (nextView === 'home' && nextHash) {
      const id = nextHash.slice(1)
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          const el = document.getElementById(id)
          if (el) el.scrollIntoView()
        }),
      )
      return
    }
    window.scrollTo(0, 0)
  }, [])

  const navValue = useMemo(() => ({ go, view }), [go, view])

  const t = useCallback((k) => (lang === 'mg' && MG[k]) || FR[k] || k, [lang])

  useEffect(() => {
    document.documentElement.lang = lang === 'mg' ? 'mg' : 'fr'
  }, [lang])

  useEffect(() => {
    const open = (e) => setPanel(e.detail)
    const onKey = (e) => {
      if (e.key === 'Escape') setPanel(null)
    }
    window.addEventListener('app-open-panel', open)
    document.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('app-open-panel', open)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const i18nValue = useMemo(() => ({ t, lang, setLang }), [t, lang])

  const close = () => setPanel(null)
  const viewClass = (v) => `view${view === v ? ' active' : ''}`

  return (
    <NavContext.Provider value={navValue}>
      <I18nContext.Provider value={i18nValue}>
        <Header />
        <Ticker />
        <DemoBanner />

        <main>
          <div className={viewClass('home')}>
            <HomePage />
          </div>
          <div className={viewClass('minister')}>
            <MinisterPage />
          </div>
          <div className={viewClass('report')}>
            <ReportPage />
          </div>
          <div className={viewClass('track')}>
            <TrackPage />
          </div>
          <div className={viewClass('registry')}>
            <RegistryPage />
          </div>
        </main>

        <Footer />

        {!panel && <Fabs onOpen={setPanel} />}
        {panel === 'wa' && <WhatsAppPanel onClose={close} />}
        {panel === 'ai' && <AIChat onClose={close} />}

        <Pager page={page} setPage={setPage} />
        <Toast />
      </I18nContext.Provider>
    </NavContext.Provider>
  )
}
