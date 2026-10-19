import { useEffect, useState } from 'react'
import { useT } from '../context.js'
import { Reveal, Btn } from '../ui.jsx'
import { ACK_DAYS, OR_DAYS, svcOf } from '../data.js'
import { addDays, fmt, fmtDT, useReports } from '../lib.js'

const LAST_CODE = 'fitaterana-madio-dernier-code'

function StatusItem({ cls, title, text }) {
  return (
    <li className={cls}>
      <b>{title}</b>
      <span className="muted">{text}</span>
    </li>
  )
}

export default function TrackPage() {
  const { t } = useT()
  const reports = useReports()
  const [code, setCode] = useState('')
  const [key, setKey] = useState('')
  const [err, setErr] = useState('')
  const [found, setFound] = useState(null)

  useEffect(() => {
    try {
      const c = sessionStorage.getItem(LAST_CODE)
      if (c) setCode(c)
    } catch (e) {
      /* ignore */
    }
  }, [])

  const search = () => {
    const c = code.trim().toUpperCase()
    const k = key.trim().toUpperCase()
    setErr('')
    const r = reports.find((x) => x.code === c && x.key === k)
    if (!r) {
      setFound(null)
      setErr(
        'Aucun signalement ne correspond à ce code et à cette clé. Vérifiez la saisie, en particulier les lettres O et I qui ne sont jamais utilisées.',
      )
      return
    }
    setFound(r)
  }

  return (
    <div id="view-track">
      <div className="form-shell">
        <h2>{t('track_t')}</h2>
        <p className="muted">Saisissez le code et la clé remis lors du dépôt.</p>
        <Reveal className="panel">
          <div className="row2">
            <div>
              <label className="l" htmlFor="tCode">
                Code de suivi
              </label>
              <input
                type="text"
                id="tCode"
                placeholder="FM-2026-XXXX-XXXX"
                autoComplete="off"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <div>
              <label className="l" htmlFor="tKey">
                Clé personnelle
              </label>
              <input
                type="text"
                id="tKey"
                autoComplete="off"
                value={key}
                onChange={(e) => setKey(e.target.value)}
              />
            </div>
          </div>
          <p className="err" role="alert">
            {err}
          </p>
          <Btn variant="go" className="mt-2" onClick={search}>
            Consulter
          </Btn>

          {found && (
            <div className="track-result">
              <h3>Signalement {found.code}</h3>
              <p className="muted">
                Déposé le {fmtDT(found.at)} · {found.cat}
              </p>
              <ol className="status-line">
                <StatusItem cls="ok" title="Inscrit au registre" text={fmtDT(found.at)} />
                <StatusItem
                  cls={found.ack ? 'ok' : 'cur'}
                  title="Accusé de réception"
                  text={
                    found.ack
                      ? 'Émis le ' + fmt(found.ack)
                      : 'Attendu au plus tard le ' + fmtDT(addDays(found.at, ACK_DAYS))
                  }
                />
                <StatusItem
                  cls={found.orient ? 'ok' : found.ack ? 'cur' : ''}
                  title={'Traitement par la ' + svcOf(found.cat)}
                  text={
                    found.orient
                      ? found.orient + (found.orientNote ? ' — ' + found.orientNote : '')
                      : 'Au plus tard le ' +
                        fmt(addDays(found.at, OR_DAYS)) +
                        ' (délai maximum)'
                  }
                />
                <StatusItem
                  cls={found.orient ? 'cur' : ''}
                  title="Suites"
                  text="Vous serez informé ici des suites données."
                />
              </ol>
              <p className="hint">
                Dans la version en service, cet espace permettra aussi d'échanger des messages avec
                l'enquêteur sans révéler votre identité.
              </p>
            </div>
          )}
        </Reveal>
      </div>
    </div>
  )
}
