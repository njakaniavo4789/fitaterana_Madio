import { useEffect, useRef, useState } from 'react'
import { useNav } from '../context.js'
import { WA_NUMBER } from '../data.js'
import { Btn } from '../ui.jsx'

export default function WhatsAppPanel({ onClose }) {
  const { go } = useNav()
  const [ent, setEnt] = useState('')
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState('')
  const first = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => first.current && first.current.focus(), 50)
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(t)
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const send = () => {
    if (msg.trim().length < 15) {
      setErr('Décrivez les faits en une ou deux phrases.')
      return
    }
    setErr('')
    const txt =
      '[Fitaterana Madio] Doléance\n' +
      (ent ? 'Entité : ' + ent + '\n' : '') +
      'Faits : ' +
      msg.trim()
    window.open(
      'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(txt),
      '_blank',
      'noopener',
    )
  }

  return (
    <section className="panel-pop" role="dialog" aria-modal="false" aria-label="Signaler par WhatsApp">
      <header className="flex items-center justify-between p-4 bg-[#1fa855] text-white">
        <h3 className="m-0 text-[1.05rem]">Signaler par WhatsApp</h3>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="bg-transparent border-0 text-inherit text-[1.6rem] leading-none cursor-pointer px-1"
        >
          ×
        </button>
      </header>
      <div className="p-4 overflow-auto">
        <p className="bg-signalsoft border-l-4 border-signal py-2.5 px-3 rounded-r-lg text-[.93rem] mb-3.5">
          <b>Ce canal n'est pas anonyme.</b> WhatsApp transmet votre numéro de téléphone au BCGIPI.
          Pour rester anonyme, utilisez le formulaire en ligne.
        </p>
        <label className="block font-bold mb-1.5" htmlFor="waEnt">
          Service ou entité concernée
        </label>
        <input
          id="waEnt"
          ref={first}
          type="text"
          value={ent}
          onChange={(e) => setEnt(e.target.value)}
          placeholder="Ex. ATT, guichet des permis, Alarobia"
        />
        <label className="block font-bold mb-1.5 mt-3" htmlFor="waMsg">
          Ce qui s'est passé
        </label>
        <textarea
          id="waMsg"
          rows={5}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Où, quand, quel service, quelle somme, quelle fonction."
          style={{ minHeight: 'auto' }}
        />
        <p className="text-signal font-semibold text-[.92rem] min-h-[1.2em] mt-2" role="alert">
          {err}
        </p>
        <div className="flex flex-col gap-2.5 items-start mt-2">
          <Btn variant="wa" onClick={send}>
            Ouvrir WhatsApp et envoyer
          </Btn>
          <button
            type="button"
            className="bg-transparent border-0 p-0 mt-1.5 text-line font-bold text-[.92rem] underline cursor-pointer"
            onClick={() => {
              onClose()
              go('report', '#signaler')
            }}
          >
            Signaler sans donner mon numéro
          </button>
        </div>
        <p className="text-muted text-[.9rem] mt-3.5 mb-0">
          Numéro du BCGIPI : +261 38 76 861 71. Le message s'ouvre dans WhatsApp : vous le relisez
          avant de l'envoyer.
        </p>
      </div>
    </section>
  )
}
