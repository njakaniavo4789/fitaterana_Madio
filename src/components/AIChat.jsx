import { useEffect, useRef, useState } from 'react'
import { KB, FALLBACK_ANSWER, CHAT_RULES } from '../data.js'
import { Btn } from '../ui.jsx'

function norm(t) {
  return t
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function localAnswer(q) {
  const n = norm(q)
  let best = null
  let score = 0
  KB.forEach((entry) => {
    let s = 0
    entry.k.forEach((k) => {
      if (n.includes(k)) s++
    })
    if (s > score) {
      score = s
      best = entry
    }
  })
  return best ? best.a : FALLBACK_ANSWER
}

const CHIPS = ['Comment signaler ?', 'Suis-je protégé ?', 'Quels délais ?', 'Qui traite ma doléance ?', 'Contacts']

export default function AIChat({ onClose }) {
  const [msgs, setMsgs] = useState([])
  const [busy, setBusy] = useState(false)
  const [text, setText] = useState('')
  const turnsRef = useRef([])
  const sampleFn = useRef(null)
  const ctlRef = useRef(null)
  const logRef = useRef(null)
  const inputRef = useRef(null)

  const bubble = (role, content, typing = false) =>
    setMsgs((m) => [...m, { role, content, typing }])

  useEffect(() => {
    bubble(
      'bot',
      "Bonjour, je suis l'assistant de Fitaterana Madio. Je réponds à vos questions sur le signalement, l'anonymat, vos protections et les délais. Que voulez-vous savoir ?",
    )
    const t = setTimeout(() => inputRef.current && inputRef.current.focus(), 50)
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    try {
      if (window.claude && typeof window.claude.use === 'function') {
        window.claude.use('sample').then(
          (f) => {
            sampleFn.current = f || null
          },
          () => {
            sampleFn.current = null
          },
        )
      }
    } catch (e) {
      sampleFn.current = null
    }
    return () => {
      clearTimeout(t)
      document.removeEventListener('keydown', onKey)
      if (ctlRef.current) ctlRef.current.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [msgs, busy])

  const done = (lastIndex, value) => {
    setMsgs((m) =>
      m.map((x, i) => (i === lastIndex ? { role: 'bot', content: value, typing: false } : x)),
    )
    setBusy(false)
  }

  const ask = (raw) => {
    const q = (raw || '').trim()
    if (!q || busy) return
    setBusy(true)
    setMsgs((m) => [
      ...m,
      { role: 'me', content: q },
      { role: 'bot', content: 'Je réfléchis…', typing: true },
    ])
    const lastIndex = msgs.length + 1
    setText('')

    if (!sampleFn.current) {
      setTimeout(() => done(lastIndex, localAnswer(q)), 450)
      return
    }

    const turns = turnsRef.current
    const first = turns.length ? turns[0].content : q
    const input = turns.length
      ? [
          { role: 'user', content: CHAT_RULES + '\n\nQuestion de l’usager : ' + first },
          ...turns.slice(1),
          { role: 'user', content: q },
        ]
      : [{ role: 'user', content: CHAT_RULES + '\n\nQuestion de l’usager : ' + q }]

    ctlRef.current = new AbortController()
    sampleFn
      .current(input, {
        cache: false,
        modelTier: 'quick',
        signal: ctlRef.current.signal,
        onText: (o) => {
          setMsgs((m) =>
            m.map((x, i) => (i === lastIndex ? { role: 'bot', content: o.text, typing: false } : x)),
          )
        },
      })
      .then(
        (r) => {
          turnsRef.current = [...turns, { role: 'user', content: q }, { role: 'assistant', content: r.text }].slice(-16)
          done(lastIndex, r.text)
        },
        (e) => {
          if (e && e.code === 'not_granted') sampleFn.current = null
          turnsRef.current = [...turns, { role: 'user', content: q }].slice(-16)
          done(lastIndex, localAnswer(q))
        },
      )
  }

  return (
    <section className="panel-pop" role="dialog" aria-modal="false" aria-label="Assistant Fitaterana Madio">
      <header className="flex items-center justify-between p-4 bg-navy text-onnavy">
        <h3 className="m-0 text-[1.05rem]">Assistant Fitaterana Madio</h3>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="bg-transparent border-0 text-inherit text-[1.6rem] leading-none cursor-pointer px-1"
        >
          ×
        </button>
      </header>

      <div className="chat" ref={logRef} aria-live="polite">
        {msgs.map((m, i) => (
          <div key={i} className={`msg ${m.role}${m.typing ? ' typing' : ''}`}>
            {m.content}
          </div>
        ))}
      </div>

      <div className="flex gap-1.5 flex-wrap pt-2 px-3 bg-surface">
        {CHIPS.map((c) => (
          <button
            key={c}
            type="button"
            disabled={busy}
            onClick={() => ask(c)}
            className="border border-rule bg-paper text-ink rounded-2xl px-[11px] py-[5px] font-semibold text-[.82rem] cursor-pointer disabled:opacity-50"
          >
            {c}
          </button>
        ))}
      </div>

      <form
        className="flex gap-2 p-3 bg-surface border-t border-rule"
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault()
          ask(text)
        }}
      >
        <label className="sr" htmlFor="chatText">
          Votre message
        </label>
        <textarea
          id="chatText"
          ref={inputRef}
          rows={1}
          maxLength={1500}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              ask(text)
            }
          }}
          placeholder="Posez votre question…"
          className="resize-none min-h-[42px] max-h-[110px]"
          style={{ minHeight: '42px' }}
        />
        <Btn size="small" type="submit" disabled={busy}>
          Envoyer
        </Btn>
      </form>

      <p className="text-muted text-[.78rem] px-3 pb-2.5 m-0 bg-surface">
        Assistant automatique. Ne donnez ni votre nom ni un détail qui vous identifie. L'assistant ne
        transmet aucune doléance : pour signaler, utilisez le formulaire.
      </p>
    </section>
  )
}
