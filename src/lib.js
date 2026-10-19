import { useEffect, useRef, useState, useSyncExternalStore } from 'react'

/* ---------- Utilitaires ---------- */
export function fmt(d) {
  return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function fmtDT(d) {
  return new Date(d).toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function addDays(d, n) {
  const x = new Date(d)
  x.setDate(x.getDate() + n)
  return x
}

export function rnd(n) {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let out = ''
  const b = new Uint8Array(n)
  crypto.getRandomValues(b)
  for (let i = 0; i < n; i++) out += alphabet[b[i] % alphabet.length]
  return out
}

export function prefersReduce() {
  return typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false
}

export function toast(message) {
  window.dispatchEvent(new CustomEvent('app-toast', { detail: message }))
}

/* ---------- Registre local ---------- */
const KEY = 'fitaterana-madio-registre-demo'

function load() {
  try {
    const v = localStorage.getItem(KEY)
    return v ? JSON.parse(v) : []
  } catch (e) {
    return []
  }
}

let list = load()
let mem = null
const subs = new Set()

function commit(next) {
  list = next
  let ok = true
  try {
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch (e) {
    ok = false
  }
  if (!ok) mem = next
  subs.forEach((f) => f())
}

function subscribe(fn) {
  subs.add(fn)
  return () => subs.delete(fn)
}

export function getReports() {
  return list
}

export function useReports() {
  return useSyncExternalStore(subscribe, getReports, getReports)
}

export function addReport(rec) {
  commit([rec, ...list])
}

export function patchReport(code, patch) {
  commit(list.map((x) => (x.code === code ? { ...x, ...patch } : x)))
}

export function seedReports(items) {
  commit([...list, ...items])
}

export function clearReports() {
  mem = null
  try {
    localStorage.removeItem(KEY)
  } catch (e) {
    /* ignore */
  }
  commit([])
}

/* ---------- Compteur de visiteurs ---------- */
const VKEY = 'fitaterana-madio-visites'
export const visits = (() => {
  let n = 0
  try {
    n = parseInt(localStorage.getItem(VKEY) || '0', 10) || 0
    const seen = sessionStorage.getItem(VKEY)
    if (!seen) {
      n++
      localStorage.setItem(VKEY, String(n))
      sessionStorage.setItem(VKEY, '1')
    }
  } catch (e) {
    n = 1
  }
  return n
})()

/* ---------- Apparition au défilement ---------- */
export function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (!('IntersectionObserver' in window) || prefersReduce()) {
      el.classList.add('in')
      return undefined
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

/* ---------- Compteur animé ---------- */
export function useCountUp(target) {
  const ref = useRef(null)
  const [text, setText] = useState('0')

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const run = () => {
      const to = Math.max(0, Math.round(target))
      if (prefersReduce()) {
        setText(to.toLocaleString('fr-FR'))
        return
      }
      const t0 = performance.now()
      const d = 1400
      let raf
      const frame = (t) => {
        const k = Math.min(1, (t - t0) / d)
        const e = 1 - Math.pow(1 - k, 3)
        setText(Math.round(to * e).toLocaleString('fr-FR'))
        if (k < 1) raf = requestAnimationFrame(frame)
      }
      raf = requestAnimationFrame(frame)
      return () => cancelAnimationFrame(raf)
    }

    if (!('IntersectionObserver' in window)) {
      setText(Math.round(target).toLocaleString('fr-FR'))
      return undefined
    }
    let cleanup
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            cleanup = run()
            io.unobserve(en.target)
          }
        })
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      if (cleanup) cleanup()
    }
  }, [target])

  return [ref, text]
}
