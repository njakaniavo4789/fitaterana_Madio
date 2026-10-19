import { useMemo, useState } from 'react'
import { useNav, useT } from '../context.js'
import { Wrap, Reveal, Btn } from '../ui.jsx'
import {
  CATS,
  REGIONS,
  ENTITIES,
  SUBS,
  PROFILS,
  ONGOING,
  WITNESS,
  ALREADY,
  MODES,
  SVC_NAME,
  svcOf,
  LIVE,
  ACK_DAYS,
  OR_DAYS,
  PLATFORM,
} from '../data.js'
import { addReport, fmt, fmtDT, addDays, rnd, toast } from '../lib.js'

const STEPS = ['Confidentialité', 'Lieu', 'Faits', 'Pièces', 'Vérification']
const N = STEPS.length
const LAST_CODE = 'fitaterana-madio-dernier-code'

function postForm(fd) {
  return fetch('/', { method: 'POST', body: fd }).then((r) => {
    if (!r.ok) throw new Error('HTTP ' + r.status)
    return r
  })
}

export default function ReportPage() {
  const { go } = useNav()
  const { t } = useT()

  const [step, setStep] = useState(0)
  const [done, setDone] = useState(null)
  const [err, setErr] = useState('')
  const [sendState, setSendState] = useState('')

  const [mode, setMode] = useState('anonyme')
  const [cName, setCName] = useState('')
  const [cPhone, setCPhone] = useState('')
  const [cMail, setCMail] = useState('')
  const [profil, setProfil] = useState('')

  const [entity, setEntity] = useState('')
  const [region, setRegion] = useState('')
  const [place, setPlace] = useState('')
  const [dateF, setDateF] = useState('')
  const [ongoing, setOngoing] = useState('')

  const [cat, setCat] = useState('')
  const [desc, setDesc] = useState('')
  const [amount, setAmount] = useState('')
  const [who, setWho] = useState('')
  const [witness, setWitness] = useState('')
  const [already, setAlready] = useState('')

  const [files, setFiles] = useState([])
  const [goodfaith, setGoodfaith] = useState(false)

  const today = new Date().toISOString().slice(0, 10)

  const entityText = useMemo(() => {
    if (!entity) return ''
    if (entity === 'INCONNU') return 'Je ne sais pas'
    const e = ENTITIES.find((x) => x.c === entity)
    return e ? e.c + ' — ' + e.n : entity
  }, [entity])

  const validate = () => {
    if (step === 0 && mode !== 'anonyme' && !cPhone.trim() && !cMail.trim())
      return 'Indiquez au moins un téléphone ou un courriel, ou choisissez le mode anonyme.'
    if (step === 1 && !entity) return "Choisissez l'entité concernée, ou « Je ne sais pas »."
    if (step === 2) {
      if (!cat) return 'Choisissez la nature des faits.'
      if (desc.trim().length < 40)
        return 'Décrivez les faits en quelques phrases (40 caractères au moins).'
    }
    if (step === 4 && !goodfaith) return 'Cochez la déclaration de bonne foi pour envoyer.'
    return ''
  }

  const next = () => {
    const e = validate()
    if (e) {
      setErr(e)
      return
    }
    setErr('')
    if (step < N - 1) {
      setStep(step + 1)
      window.scrollTo(0, 0)
      return
    }
    submit()
  }

  const prev = () => {
    if (step > 0) {
      setStep(step - 1)
      setErr('')
      window.scrollTo(0, 0)
    }
  }

  const transmit = (rec, now) => {
    if (!LIVE) {
      setSendState('Mode démonstration : ce signalement n’a pas été transmis.')
      return
    }
    setSendState('Transmission en cours…')
    const fd = new FormData()
    const F = {
      'form-name': 'doleance',
      code: rec.code,
      depose_le: fmtDT(now),
      mode: rec.mode,
      profil,
      entite: entityText,
      region,
      lieu: place,
      date_faits: dateF,
      faits_continuent: ongoing,
      nature: cat,
      direction: svcOf(rec.cat),
      description: desc,
      montant: amount,
      fonction_en_cause: who,
      temoins: witness,
      deja_signale: already,
    }
    Object.keys(F).forEach((k) => fd.append(k, F[k] || ''))
    files.slice(0, 3).forEach((f, i) => {
      if (f.size <= 10 * 1024 * 1024) fd.append('piece' + (i + 1), f, f.name)
    })
    const jobs = [postForm(fd)]
    if (rec.mode !== 'anonyme') {
      const id = new FormData()
      id.append('form-name', 'identite')
      id.append('code', rec.code)
      id.append('nom', cName)
      id.append('telephone', cPhone)
      id.append('courriel', cMail)
      jobs.push(postForm(id))
    }
    Promise.all(jobs).then(
      () => setSendState('Transmis au BCGIPI le ' + fmtDT(now) + '.'),
      () =>
        setSendState(
          'La transmission a échoué. Votre code reste valable : réessayez plus tard, ou signalez au 038 76 861 71 (appel ou WhatsApp) en citant votre code.',
        ),
    )
  }

  const submit = () => {
    const now = new Date()
    const code = 'FM-' + now.getFullYear() + '-' + rnd(4) + '-' + rnd(4)
    const key = rnd(10)
    const rec = {
      code,
      key,
      at: now.toISOString(),
      mode,
      entity,
      region,
      cat,
      amount: amount || null,
      ack: null,
      orient: null,
      orientNote: null,
      messages: [],
    }
    addReport(rec)
    try {
      sessionStorage.setItem(LAST_CODE, code)
    } catch (e) {
      /* ignore */
    }
    setDone({
      code,
      key,
      at: now,
      svc: SVC_NAME[svcOf(cat)],
      ackDue: addDays(now, ACK_DAYS),
      orDue: addDays(now, OR_DAYS),
    })
    window.scrollTo(0, 0)
    transmit(rec, now)
  }

  const copy = () => {
    const txt = PLATFORM + ' — Code : ' + done.code + ' — Clé : ' + done.key
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(
        () => toast('Code et clé copiés'),
        () => toast('Copie impossible : notez-les à la main'),
      )
    } else {
      toast('Copie impossible : notez-les à la main')
    }
  }

  /* ---------- Écran de confirmation ---------- */
  if (done) {
    return (
      <div id="view-report">
        <div className="form-shell">
          <h2>{t('form_t')}</h2>
          <Reveal className="panel">
            <h2>Votre signalement est enregistré</h2>
            <p className="sendstate" role="status">
              {sendState}
            </p>
            <p>
              Il est inscrit au registre le <b>{fmtDT(done.at)}</b>. Notez votre code et votre clé :
              vous en aurez besoin pour suivre le dossier et répondre aux enquêteurs. Ils ne seront
              plus jamais affichés.
            </p>
            <div className="receipt">
              <div className="muted">Code de suivi</div>
              <div className="code">{done.code}</div>
              <div className="muted mt-[14px]">Clé personnelle</div>
              <div className="code" style={{ fontSize: '1.3rem' }}>
                {done.key}
              </div>
            </div>
            <p>
              Accusé de réception attendu au plus tard le <b>{fmtDT(done.ackDue)}</b>. Votre
              doléance sera traitée par la <b>{done.svc}</b> au plus tard le{' '}
              <b>{fmt(done.orDue)}</b> (délai maximum).
            </p>
            <div className="flex gap-2.5 flex-wrap">
              <Btn size="small" onClick={copy}>
                Copier le code et la clé
              </Btn>
              <Btn size="small" variant="ghost" onClick={() => go('track', '#suivre')}>
                Suivre ce signalement
              </Btn>
            </div>
          </Reveal>
        </div>
      </div>
    )
  }

  /* ---------- Formulaire ---------- */
  return (
    <div id="view-report">
      <div className="form-shell">
        <h2>{t('form_t')}</h2>
        <p className="muted">
          Environ dix minutes. Vous pouvez revenir en arrière à tout moment. N'utilisez pas un
          ordinateur ou un téléphone de votre service si vous craignez d'être identifié.
        </p>

        <ol className="steps">
          {STEPS.map((s, i) => (
            <li key={s} className={i < step ? 'done' : i === step ? 'now' : ''}>
              <span />
              {s}
            </li>
          ))}
        </ol>

        <form noValidate onSubmit={(e) => e.preventDefault()}>
          <Reveal className="panel" hidden={step !== 0}>
            <h2>Comment souhaitez-vous apparaître ?</h2>
            <fieldset>
              <legend className="sr">Niveau de confidentialité</legend>
              <div className="choice">
                {[
                  [
                    'anonyme',
                    'Anonyme',
                    "Aucune donnée d'identité n'est demandée. Vous suivrez votre dossier uniquement par code.",
                  ],
                  [
                    'confidentiel',
                    'Confidentiel',
                    'Vous donnez un moyen de contact, conservé sous pli séparé. Seul le Coordonnateur Général y a accès.',
                  ],
                  [
                    'identifie',
                    'Identifié',
                    "Vous acceptez d'être entendu comme témoin. Votre identité reste protégée par la loi.",
                  ],
                ].map(([v, b, s]) => (
                  <label key={v}>
                    <input
                      type="radio"
                      name="mode"
                      value={v}
                      checked={mode === v}
                      onChange={() => setMode(v)}
                    />
                    <span>
                      <b>{b}</b>
                      <small>{s}</small>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            {mode !== 'anonyme' && (
              <div>
                <div className="row2">
                  <div>
                    <label className="l" htmlFor="cName">
                      Nom et prénoms
                    </label>
                    <input
                      type="text"
                      id="cName"
                      autoComplete="off"
                      value={cName}
                      onChange={(e) => setCName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="l" htmlFor="cPhone">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="cPhone"
                      autoComplete="off"
                      value={cPhone}
                      onChange={(e) => setCPhone(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-[14px]">
                  <label className="l" htmlFor="cMail">
                    Courriel (facultatif)
                  </label>
                  <input
                    type="email"
                    id="cMail"
                    autoComplete="off"
                    value={cMail}
                    onChange={(e) => setCMail(e.target.value)}
                  />
                </div>
              </div>
            )}

            <fieldset className="mt-[22px]">
              <legend>Vous êtes</legend>
              <select id="profil" value={profil} onChange={(e) => setProfil(e.target.value)}>
                <option value="">— Choisir —</option>
                {PROFILS.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </fieldset>
          </Reveal>

          <Reveal className="panel" hidden={step !== 1}>
            <h2>Où les faits se sont-ils produits ?</h2>
            <fieldset>
              <label className="l" htmlFor="entity">
                Entité concernée
              </label>
              <p className="hint">
                Si vous hésitez, choisissez le sous-secteur le plus proche ou « Je ne sais pas ».
              </p>
              <select id="entity" value={entity} onChange={(e) => setEntity(e.target.value)}>
                <option value="">— Choisir —</option>
                {SUBS.slice(1).map((s) => {
                  const list = ENTITIES.filter((e) => e.s === s)
                  if (!list.length) return null
                  return (
                    <optgroup key={s} label={s}>
                      {list.map((e) => (
                        <option key={e.c} value={e.c}>
                          {e.c} — {e.n}
                        </option>
                      ))}
                    </optgroup>
                  )
                })}
                <option value="INCONNU">Je ne sais pas</option>
              </select>
            </fieldset>
            <div className="row2">
              <fieldset>
                <label className="l" htmlFor="region">
                  Région
                </label>
                <select id="region" value={region} onChange={(e) => setRegion(e.target.value)}>
                  <option value="">— Choisir —</option>
                  {REGIONS.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </fieldset>
              <fieldset>
                <label className="l" htmlFor="place">
                  Lieu précis (facultatif)
                </label>
                <input
                  type="text"
                  id="place"
                  placeholder="Ex. guichet des permis, quai n° 3, terminal fret"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                />
              </fieldset>
            </div>
            <div className="row2">
              <fieldset>
                <label className="l" htmlFor="dateF">
                  Date des faits
                </label>
                <input
                  type="date"
                  id="dateF"
                  max={today}
                  value={dateF}
                  onChange={(e) => setDateF(e.target.value)}
                />
              </fieldset>
              <fieldset>
                <label className="l" htmlFor="ongoing">
                  Les faits continuent-ils ?
                </label>
                <select id="ongoing" value={ongoing} onChange={(e) => setOngoing(e.target.value)}>
                  <option value="">— Choisir —</option>
                  {ONGOING.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </fieldset>
            </div>
          </Reveal>

          <Reveal className="panel" hidden={step !== 2}>
            <h2>Que s'est-il passé ?</h2>
            <fieldset>
              <label className="l" htmlFor="cat">
                Nature des faits
              </label>
              <select id="cat" value={cat} onChange={(e) => setCat(e.target.value)}>
                <option value="">— Choisir —</option>
                {CATS.map((c) => (
                  <option key={c.t}>{c.t}</option>
                ))}
              </select>
            </fieldset>
            <fieldset>
              <label className="l" htmlFor="desc">
                Description
              </label>
              <p className="hint">
                Racontez dans l'ordre : ce qui vous a été demandé ou ce que vous avez vu, par quelle
                fonction, ce qui s'est passé ensuite. Évitez tout détail qui permettrait de vous
                identifier si vous souhaitez rester anonyme.
              </p>
              <textarea
                id="desc"
                maxLength={6000}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <p className="hint">{desc.length} / 6000</p>
            </fieldset>
            <div className="row2">
              <fieldset>
                <label className="l" htmlFor="amount">
                  Montant en jeu, en ariary (facultatif)
                </label>
                <input
                  type="number"
                  id="amount"
                  min="0"
                  step="1000"
                  inputMode="numeric"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </fieldset>
              <fieldset>
                <label className="l" htmlFor="who">
                  Fonction de la ou des personnes en cause (facultatif)
                </label>
                <input
                  type="text"
                  id="who"
                  placeholder="Ex. agent de guichet, chef de service, PRMP"
                  value={who}
                  onChange={(e) => setWho(e.target.value)}
                />
              </fieldset>
            </div>
            <fieldset>
              <label className="l" htmlFor="witness">
                Y a-t-il d'autres témoins ?
              </label>
              <select id="witness" value={witness} onChange={(e) => setWitness(e.target.value)}>
                <option value="">— Choisir —</option>
                {WITNESS.map((w) => (
                  <option key={w}>{w}</option>
                ))}
              </select>
            </fieldset>
            <fieldset>
              <label className="l" htmlFor="already">
                Avez-vous déjà signalé ces faits ailleurs ?
              </label>
              <select id="already" value={already} onChange={(e) => setAlready(e.target.value)}>
                <option value="">— Choisir —</option>
                {ALREADY.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
            </fieldset>
          </Reveal>

          <Reveal className="panel" hidden={step !== 3}>
            <h2>Avez-vous des éléments à joindre ?</h2>
            <p>
              Reçu, quittance absente, photo d'un affichage, capture d'écran, document de marché.
              Tout est facultatif.
            </p>
            <fieldset>
              <label className="l" htmlFor="files">
                Fichiers (images ou PDF, 10 Mo maximum chacun)
              </label>
              <input
                type="file"
                id="files"
                multiple
                accept="image/*,application/pdf"
                onChange={(e) => setFiles(Array.from(e.target.files || []))}
              />
              <ul className="files-list">
                {files.map((f) => {
                  const big = f.size > 10 * 1024 * 1024
                  return (
                    <li key={f.name + f.size} className={big ? 'late' : ''}>
                      {f.name} — {Math.round(f.size / 1024)} Ko
                      {big ? ' (trop volumineux, ne sera pas retenu)' : ''}
                    </li>
                  )
                })}
              </ul>
              <p className="hint">
                Avant l'envoi, la version en service effacera les métadonnées des fichiers (auteur,
                appareil, position GPS). Dans cette maquette, les fichiers ne quittent pas votre
                appareil.
              </p>
            </fieldset>
          </Reveal>

          <Reveal className="panel recap" hidden={step !== 4}>
            <h2>Vérifiez avant d'envoyer</h2>
            <dl>
              {(() => {
                const rows = [
                  ['Confidentialité', MODES[mode]],
                  ['Vous êtes', profil || 'Non précisé'],
                  ['Entité', entityText],
                  ['Région', region || 'Non précisée'],
                  ['Lieu', place || '—'],
                  ['Date des faits', dateF ? fmt(dateF) : 'Non précisée'],
                  ['Nature', cat],
                  ['Description', desc],
                  [
                    'Montant',
                    amount ? Number(amount).toLocaleString('fr-FR') + ' Ar' : '—',
                  ],
                  ['Fonction en cause', who || '—'],
                  ['Pièces jointes', files.length + ' fichier(s)'],
                ]
                if (mode !== 'anonyme') rows.splice(1, 0, ['Contact', 'Conservé sous pli séparé'])
                return rows.map(([k, v]) => (
                  <div key={k} className="contents">
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))
              })()}
            </dl>
            <div className="consent mt-[22px]">
              <input
                type="checkbox"
                id="goodfaith"
                checked={goodfaith}
                onChange={(e) => setGoodfaith(e.target.checked)}
              />
              <label htmlFor="goodfaith">
                Je déclare de bonne foi que les faits rapportés sont, à ma connaissance, exacts. Je
                sais que la dénonciation de faits que je sais faux est punie par la loi.
              </label>
            </div>
          </Reveal>

          <p className="err" role="alert">
            {err}
          </p>
          <div className="nav-row">
            <Btn variant="ghost" onClick={prev} style={{ visibility: step === 0 ? 'hidden' : 'visible' }}>
              Retour
            </Btn>
            <Btn variant="go" onClick={next}>
              {step === N - 1 ? 'Envoyer le signalement' : 'Continuer'}
            </Btn>
          </div>
        </form>
      </div>
    </div>
  )
}
