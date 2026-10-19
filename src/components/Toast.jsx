import { useEffect, useRef, useState } from 'react'

export default function Toast() {
  const [msg, setMsg] = useState('')
  const [show, setShow] = useState(false)
  const timer = useRef(null)

  useEffect(() => {
    const onToast = (e) => {
      setMsg(e.detail)
      setShow(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setShow(false), 2600)
    }
    window.addEventListener('app-toast', onToast)
    return () => {
      window.removeEventListener('app-toast', onToast)
      clearTimeout(timer.current)
    }
  }, [])

  return (
    <div
      role="status"
      className={`fixed left-1/2 -translate-x-1/2 z-50 bg-ink text-paper px-[18px] py-2.5 rounded-lg font-semibold transition-opacity no-print ${
        show ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ bottom: 'calc(80px + env(safe-area-inset-bottom, 0px))' }}
    >
      {msg}
    </div>
  )
}
