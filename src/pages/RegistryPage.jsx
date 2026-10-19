import { Wrap, Btn } from '../ui.jsx'
import { ACK_DAYS, OR_DAYS, MODES, ORIENT, svcOf } from '../data.js'
import { addDays, fmt, fmtDT, rnd, toast, useReports, seedReports, clearReports, patchReport } from '../lib.js'

export default function RegistryPage() {
  const reports = useReports()
  const now = new Date()

  let ackOk = 0
  let orOk = 0
  let late = 0

  const rows = reports.map((r) => {
    const dAck = addDays(r.at, ACK_DAYS)
    const dOr = addDays(r.at, OR_DAYS)

    let ackText
    let ackCls = ''
    if (r.ack) {
      ackText = 'Émis le ' + fmt(r.ack)
      if (new Date(r.ack) <= dAck) {
        ackOk++
        ackCls = 'ontime'
      } else {
        ackCls = 'late'
      }
    } else {
      ackText = 'Échéance ' + fmtDT(dAck)
      if (now > dAck) {
        ackCls = 'late'
        late++
      }
    }

    let orText
    let orCls = ''
    if (r.orient) {
      orText = r.orient
      orCls = 'ontime'
      orOk++
    } else {
      orText = 'Échéance ' + fmt(dOr)
      if (now > dOr) orCls = 'late'
    }

    return { r, ackText, ackCls, orText, orCls }
  })

  const kpis = [
    [reports.length, 'signalements au registre'],
    [reports.length ? Math.round((ackOk / reports.length) * 100) + ' %' : '—', 'accusés dans les 48 heures'],
    [orOk, 'doléances traitées'],
    [late, 'accusés en retard'],
  ]

  const seed = () => {
    const base = new Date()
    const items = [
      ['ATT', 'Paiement indu au guichet', 20, 'anonyme', true, true],
      ['SPAT', 'Passage accéléré contre paiement', 9, 'confidentiel', true, false],
      ['PRMP', 'Marché public arrangé', 1, 'anonyme', false, false],
      ['APMF', 'Titre délivré sans épreuve', 5, 'identifie', false, false],
    ].map(([ent, cat, days, mode, ack, orient]) => {
      const at = addDays(base, -days)
      return {
        code: 'FM-' + at.getFullYear() + '-' + rnd(4) + '-' + rnd(4),
        key: rnd(10),
        at: at.toISOString(),
        mode,
        entity: ent,
        cat,
        ack: ack ? addDays(at, 1).toISOString() : null,
        orient: orient ? 'Traité — mesures correctives' : null,
        messages: [],
      }
    })
    seedReports(items)
    toast('Exemples ajoutés')
  }

  return (
    <div id="view-registry">
      <Wrap className="pt-11 pb-20">
        <h2>Registre unique des signalements</h2>
        <p className="muted measure">
          Vue réservée au BCGIPI, présentée ici à titre de démonstration à partir des signalements
          saisis dans ce navigateur. Elle illustre les mesures 5.1 et 5.2 de la PILCC : registre
          horodaté, accusé de réception sous 48 heures, traitement par la DIA ou la DPI en 15 jours
          au maximum (en deçà des plafonds de 15 et 45 jours fixés par la PILCC), interdiction du
          classement sans décision écrite. L'identité des déclarants n'y figure pas.
        </p>

        <div className="kpis">
          {kpis.map(([b, s]) => (
            <div key={s}>
              <b>{String(b)}</b>
              <span className="muted">{s}</span>
            </div>
          ))}
        </div>

        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Déposé le</th>
                <th>Entité</th>
                <th>Nature</th>
                <th>Mode</th>
                <th>Traité par</th>
                <th>Accusé (48 h)</th>
                <th>Décision (15 j max.)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ r, ackText, ackCls, orText, orCls }) => (
                <tr key={r.code}>
                  <td>{r.code}</td>
                  <td>{fmtDT(r.at)}</td>
                  <td>{r.entity}</td>
                  <td>{r.cat}</td>
                  <td>{MODES[r.mode] || r.mode}</td>
                  <td className="svc">{svcOf(r.cat)}</td>
                  <td className={ackCls}>{ackText}</td>
                  <td className={orCls}>{orText}</td>
                  <td>
                    {!r.ack ? (
                      <Btn
                        variant="ghost"
                        size="small"
                        onClick={() => {
                          patchReport(r.code, { ack: new Date().toISOString() })
                          toast('Accusé de réception émis')
                        }}
                      >
                        Accuser réception
                      </Btn>
                    ) : !r.orient ? (
                      <select
                        aria-label="Décision de traitement"
                        defaultValue=""
                        onChange={(e) => {
                          if (!e.target.value) return
                          patchReport(r.code, {
                            orient: e.target.value,
                            orientNote: 'décision écrite versée au registre',
                          })
                          toast("Décision d'orientation enregistrée")
                        }}
                      >
                        <option value="">Décision…</option>
                        {ORIENT.map((x) => (
                          <option key={x}>{x}</option>
                        ))}
                      </select>
                    ) : (
                      'Suivi en cours'
                    )}
                  </td>
                </tr>
              ))}
              {!reports.length && (
                <tr>
                  <td colSpan={9}>
                    Le registre est vide. Déposez un signalement depuis l'onglet « Signaler », ou
                    ajoutez des exemples.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex gap-2.5 flex-wrap">
          <Btn variant="ghost" size="small" onClick={seed}>
            Ajouter des exemples
          </Btn>
          <Btn
            variant="ghost"
            size="small"
            onClick={() => {
              clearReports()
              toast('Registre de démonstration vidé')
            }}
          >
            Vider le registre de démonstration
          </Btn>
        </div>
      </Wrap>
    </div>
  )
}
