import { useState } from 'react'
import { useNav, useT } from '../context.js'
import { Wrap } from '../ui.jsx'

const NAV = [
  { h: '#ministre', v: 'minister', k: 'nav_min' },
  { h: '#bcgipi', v: 'home', k: 'nav_bcgipi' },
  { h: '#signaler-quoi', v: 'home', k: 'nav_what' },
  { h: '#protection', v: 'home', k: 'nav_protect' },
  { h: '#signaler', v: 'report', k: 'nav_report' },
  { h: '#suivre', v: 'track', k: 'nav_track' },
]

export function BrandMark({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill="none" stroke="#4fb488" strokeWidth="4" />
      <path
        d="M8 26 L17 17 L23 23 L32 12"
        fill="none"
        stroke="#f3f6f9"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="12" r="3.5" fill="#4fb488" />
    </svg>
  )
}

export default function Header() {
  const { go } = useNav()
  const { t, lang, setLang } = useT()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-20 bg-navy text-onnavy no-print">
      <Wrap className="flex items-center gap-[18px] min-h-16">
        <a
          className="flex items-center gap-3 text-inherit no-underline"
          href="#accueil"
          onClick={(e) => {
            e.preventDefault()
            go('home', '#accueil')
            setOpen(false)
          }}
        >
          <BrandMark className="w-[38px] h-[38px] shrink-0" />
          <span>
            <b
              className="block font-display font-extrabold text-[1.15rem] leading-none"
              style={{ fontVariationSettings: '"wdth" 120' }}
            >
              Fitaterana Madio
            </b>
            <small className="text-[.78rem] opacity-80">MTM · BCGIPI</small>
          </span>
        </a>

        <button
          type="button"
          className="lg:hidden ml-auto bg-transparent border border-white/35 text-onnavy rounded-md px-[10px] py-1.5 font-semibold text-[.9rem] cursor-pointer"
          aria-expanded={open ? 'true' : 'false'}
          onClick={() => setOpen((o) => !o)}
        >
          Menu
        </button>

        <nav
          aria-label="Navigation principale"
          className={`${
            open ? 'flex' : 'hidden'
          } lg:flex absolute lg:static left-0 right-0 top-16 lg:top-auto bg-navy lg:bg-transparent flex-col lg:flex-row lg:ml-auto gap-1 lg:gap-1 px-[22px] lg:px-0 pt-2 pb-4 lg:pt-0 lg:pb-0`}
        >
          {NAV.map((item) => (
            <a
              key={item.h}
              href={item.h}
              className="text-onnavy no-underline text-[.95rem] px-[10px] py-2 rounded-md hover:bg-white/10"
              onClick={(e) => {
                e.preventDefault()
                go(item.v, item.h)
                setOpen(false)
              }}
            >
              {t(item.k)}
            </a>
          ))}
        </nav>

        <div
          className="flex border border-white/35 rounded-md overflow-hidden shrink-0"
          role="group"
          aria-label="Langue"
        >
          {['fr', 'mg'].map((L) => (
            <button
              key={L}
              type="button"
              aria-pressed={lang === L ? 'true' : 'false'}
              onClick={() => setLang(L)}
              className={`border-0 cursor-pointer px-[10px] py-1.5 font-semibold text-[.82rem] uppercase ${
                lang === L ? 'bg-onnavy text-navy' : 'bg-transparent text-onnavy'
              }`}
            >
              {L}
            </button>
          ))}
        </div>
      </Wrap>
    </header>
  )
}
