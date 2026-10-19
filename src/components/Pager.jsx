import { useEffect, useRef, useState } from 'react'
import { useNav } from '../context.js'
import { PAGES } from '../data.js'

const homeIds = PAGES.filter((p) => p.v === 'home').map((p) => p.a.slice(1))

function pageOf(id) {
  const i = PAGES.findIndex((p) => p.a === '#' + id)
  return i < 0 ? 0 : i
}

export default function Pager({ page, setPage }) {
  const { view, go } = useNav()
  const [lock, setLock] = useState(0)
  const lockRef = useRef(0)

  const goPage = (i) => {
    if (i < 0 || i >= PAGES.length) return
    lockRef.current = Date.now() + 600
    setLock(Date.now())
    setPage(i)
    go(PAGES[i].v, PAGES[i].a, { fromPager: true })
  }

  const label =
    page < 0 ? (
      <b>Espace BCGIPI</b>
    ) : (
      <>
        <b>{PAGES[page].t}</b> — {page + 1} / {PAGES.length}
      </>
    )

  /* Synchronisation avec le défilement sur la page d'accueil */
  useEffect(() => {
    const onScroll = () => {
      if (view !== 'home') return
      let best = 0
      const y = window.innerHeight * 0.35
      homeIds.forEach((id) => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= y) best = pageOf(id)
      })
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4)
        best = pageOf(homeIds[homeIds.length - 1])
      if (Date.now() < lockRef.current) return
      setPage((cur) => (cur === best ? cur : best))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [view, setPage])

  const print = () => {
    const details = Array.from(document.querySelectorAll('#view-home details'))
    details.forEach((d) => {
      d.dataset.was = d.open ? '1' : '0'
      d.open = true
    })
    try {
      window.print()
    } catch (e) {
      /* ignore */
    }
    setTimeout(() => {
      details.forEach((d) => {
        d.open = d.dataset.was === '1'
      })
    }, 500)
  }

  const btn =
    'font-bold text-[.95rem] px-4 py-[9px] rounded-lg border-2 border-ink bg-transparent text-ink cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed'

  return (
    <nav
      aria-label="Navigation pas à pas"
      className="fixed left-0 right-0 bottom-0 z-30 bg-surface border-t border-rule no-print"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="max-w-[1160px] mx-auto px-[22px] py-2.5 flex items-center gap-2.5">
        <button type="button" className={btn} disabled={page === 0} onClick={() => goPage(page < 0 ? PAGES.length - 1 : page - 1)}>
          Précédent
        </button>
        <span className="flex-1 text-center text-[.92rem] text-muted max-xs:hidden" aria-live="polite">
          {label}
        </span>
        <button type="button" className={`${btn} ml-auto`} onClick={print}>
          Imprimer
        </button>
        <button
          type="button"
          className="font-bold text-[.95rem] px-4 py-[9px] rounded-lg border-2 border-line bg-line text-white cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed"
          disabled={page === PAGES.length - 1}
          onClick={() => goPage(page < 0 ? 0 : page + 1)}
        >
          Suivant
        </button>
      </div>
    </nav>
  )
}
