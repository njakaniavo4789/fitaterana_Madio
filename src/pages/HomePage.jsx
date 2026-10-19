import { useEffect, useState } from 'react'
import { useNav, useT } from '../context.js'
import { Wrap, Reveal, Btn, LinkBtn, Chip, Counter, SectionHead } from '../ui.jsx'
import { CATS, ENTITIES, SUBS, SVC_NAME } from '../data.js'
import { useReports, prefersReduce, visits } from '../lib.js'

const ROT = [
  'Un paiement sans quittance ?',
  'Un permis sans examen ?',
  'Un marché arrangé ?',
  'Un passage accéléré contre de l’argent ?',
  'Un pourcentage exigé pour être payé ?',
  'Une menace après un signalement ?',
  'Signalez-le. Nous traitons en 15 jours au plus.',
]

function Rotator() {
  const [i, setI] = useState(0)
  const [cls, setCls] = useState('')
  useEffect(() => {
    if (prefersReduce()) return undefined
    const id = setInterval(() => {
      setCls('out')
      setTimeout(() => {
        setI((v) => (v + 1) % ROT.length)
        setCls('in')
        requestAnimationFrame(() => requestAnimationFrame(() => setCls('')))
      }, 500)
    }, 3200)
    return () => clearInterval(id)
  }, [])
  return (
    <p className="rotator" aria-live="off">
      <span className={cls}>{ROT[i]}</span>
    </p>
  )
}

function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`block py-[72px] border-b border-rule ${className}`}>
      <Wrap>{children}</Wrap>
    </section>
  )
}

export default function HomePage() {
  const { t } = useT()
  const { go } = useNav()
  const reports = useReports()
  const [sub, setSub] = useState('Tous')

  const entities = ENTITIES.filter((e) => sub === 'Tous' || e.s === sub)
  const goReport = (e) => {
    e.preventDefault()
    go('report', '#signaler')
  }
  const goTrack = (e) => {
    e.preventDefault()
    go('track', '#suivre')
  }

  return (
    <div id="view-home">
      {/* ---------- Héros ---------- */}
      <section id="accueil" className="hero bg-navy text-onnavy pt-14 overflow-hidden">
        <Wrap className="grid md:grid-cols-[1.25fr_.75fr] gap-10 items-end">
          <div>
            <p className="text-base opacity-85 mb-3.5">{t('kicker')}</p>
            <h1 className="mb-[.15em]">Des transports sans corruption</h1>
            <p
              className="font-display font-medium text-[clamp(1.1rem,2.2vw,1.45rem)] opacity-90 mb-[22px]"
              style={{ fontVariationSettings: '"wdth" 95' }}
            >
              Fitaterana tsy misy kolikoly
            </p>
            <Rotator />
            <p className="lead text-[1.15rem] max-w-[56ch] opacity-95">{t('lead')}</p>
            <div className="flex gap-3 flex-wrap mt-[26px] mb-10">
              <LinkBtn href="#signaler" onClick={goReport} variant="go">
                {t('cta_report')}
              </LinkBtn>
              <LinkBtn href="#suivre" onClick={goTrack} variant="ghost" className="text-onnavy">
                {t('cta_track')}
              </LinkBtn>
            </div>
          </div>
          <dl className="border-t border-white/25 pt-[22px] pb-[30px] grid grid-cols-3 gap-2.5 md:block md:pt-0 md:border-t-0 md:border-l-2 md:border-white/25 md:pb-10 md:pl-[22px]">
            <dt
              className="font-display font-extrabold text-[2rem] leading-none"
              style={{ fontVariationSettings: '"wdth" 110' }}
            >
              43
            </dt>
            <dd className="m-0 opacity-85 md:mb-[18px] md:mt-1">{t('f1')}</dd>
            <dt
              className="font-display font-extrabold text-[2rem] leading-none"
              style={{ fontVariationSettings: '"wdth" 110' }}
            >
              48 h
            </dt>
            <dd className="m-0 opacity-85 md:mb-[18px] md:mt-1">{t('f2')}</dd>
            <dt
              className="font-display font-extrabold text-[2rem] leading-none"
              style={{ fontVariationSettings: '"wdth" 110' }}
            >
              15 j
            </dt>
            <dd className="m-0 opacity-85 md:mb-[18px] md:mt-1">{t('f3')}</dd>
          </dl>
        </Wrap>
      </section>

      {/* ---------- Compteurs ---------- */}
      <section aria-label="Compteurs" className="bg-surface border-b border-rule">
        <Wrap className="grid grid-cols-2 md:grid-cols-4">
          <Counter
            className="live border-r border-b md:border-b-0 border-rule"
            value={visits}
            live
            label="visiteurs"
          />
          <Counter
            className="border-b md:border-b-0 md:border-r border-rule"
            value={reports.length}
            live
            label="doléances déposées"
          />
          <Counter className="border-r border-rule" value={678} label="risques recensés par la PILCC" />
          <Counter value={43} label="entités sous surveillance" />
        </Wrap>
      </section>

      {/* ---------- Trajet ---------- */}
      <section className="route bg-navy text-onnavy pt-11 pb-14" aria-labelledby="routeTitle">
        <Wrap>
          <h2
            id="routeTitle"
            className="text-[1.25rem] mb-5 opacity-95"
            style={{ fontVariationSettings: '"wdth" 105' }}
          >
            {t('route_t')}
          </h2>
          <ol className="line-map">
            {[
              ['r1w', 'r1'],
              ['r2w', 'r2'],
              ['r3w', 'r3'],
              ['r4w', 'r4'],
              ['r5w', 'r5'],
            ].map(([wk, tk]) => (
              <li key={wk}>
                <span className="stop" aria-hidden="true" />
                <div>
                  <span className="when">{t(wk)}</span>
                  <span className="what">{t(tk)}</span>
                </div>
              </li>
            ))}
          </ol>
        </Wrap>
      </section>

      {/* ---------- BCGIPI ---------- */}
      <Section id="bcgipi">
        <SectionHead title={t('b_t')}>
          <p>
            Le Bureau de Coordination Générale de l'Inspection et de la Promotion de l'Intégrité est
            chargé des missions d'inspection, d'audit, de contrôle interne ainsi que de prévention et
            de lutte contre la corruption au sein du Ministère des Transports et de la Météorologie
            et de ses organismes rattachés (article 13 nouveau du décret n° 2021-863, modifié par le
            décret n° 2026-1171).
          </p>
          <p className="muted">
            Il est la structure anti-corruption du Ministère au sens de la Stratégie Nationale de
            Lutte Contre la Corruption 2025-2030, et le gardien de la Politique Interne de Lutte
            Contre la Corruption (PILCC) signée par le Ministre le 1er octobre 2026.
          </p>
        </SectionHead>

        <Reveal className="grid md:grid-cols-3 border border-rule rounded-[10px] overflow-hidden bg-surface">
          <div className="p-[26px] border-b md:border-b-0 md:border-r border-rule">
            <span className="inline-block font-bold text-[.8rem] bg-linesoft text-line px-[9px] py-[3px] rounded-[20px] mb-2.5">
              Coordination générale
            </span>
            <h3>Le Coordonnateur Général</h3>
            <p>Pilote la mise en œuvre de la PILCC et en rend compte au Ministre.</p>
            <ul className="pl-[18px] mt-2.5">
              <li className="mb-1.5">Tient le registre unique des signalements</li>
              <li className="mb-1.5">Calcule et publie la notation d'intégrité par entité</li>
              <li className="mb-1.5">Établit le rapport annuel public avant le 31 mars</li>
              <li className="mb-1.5">Saisit les autorités de contrôle et de poursuite</li>
            </ul>
          </div>
          <div className="p-[26px] border-b md:border-b-0 md:border-r border-rule">
            <span className="inline-block font-bold text-[.8rem] bg-linesoft text-line px-[9px] py-[3px] rounded-[20px] mb-2.5">
              DIA
            </span>
            <h3>Direction de l'Inspection et de l'Audit</h3>
            <p>Vérifie sur place et sur pièces.</p>
            <ul className="pl-[18px] mt-2.5">
              <li className="mb-1.5">Analyses de vulnérabilité des procédures</li>
              <li className="mb-1.5">Contrôles inopinés et missions d'audit</li>
              <li className="mb-1.5">Contre-vérification de la notation</li>
              <li className="mb-1.5">Suivi des recommandations</li>
            </ul>
          </div>
          <div className="p-[26px]">
            <span className="inline-block font-bold text-[.8rem] bg-linesoft text-line px-[9px] py-[3px] rounded-[20px] mb-2.5">
              DPI
            </span>
            <h3>Direction de la Promotion de l'Intégrité</h3>
            <p>Prévient avant qu'il faille sanctionner.</p>
            <ul className="pl-[18px] mt-2.5">
              <li className="mb-1.5">Code de conduite et doctrine d'intégrité</li>
              <li className="mb-1.5">
                Formation et sensibilisation des agents, usagers et opérateurs
              </li>
              <li className="mb-1.5">Animation du réseau des référents intégrité</li>
              <li className="mb-1.5">Registres des cadeaux et des déclarations d'intérêts</li>
            </ul>
          </div>
        </Reveal>

        <Reveal className="mt-[34px] p-6 bg-linesoft rounded-[10px]" id="qui-traite">
          <h3 className="mb-1.5">Qui traite votre doléance ?</h3>
          <p className="muted measure">
            Selon la nature des faits, la doléance est confiée à l'une des deux directions du
            BCGIPI, qui la traite dans un délai de 15 jours au maximum à compter du dépôt. Lorsque
            les faits relèvent d'une autorité extérieure, la direction saisie prépare la
            transmission.
          </p>
          <div className="grid md:grid-cols-2 gap-5 mt-3.5">
            {['DIA', 'DPI'].map((k) => (
              <div key={k} className="bg-surface border border-rule rounded-lg p-[18px]">
                <span className="inline-block font-bold text-[.8rem] bg-linesoft text-line px-[9px] py-[3px] rounded-[20px] mb-2.5">
                  {k}
                </span>
                <b className="block mb-1.5">
                  {k === 'DIA'
                    ? 'Faits à vérifier sur place ou sur pièces'
                    : 'Manquements à l’éthique et protection des déclarants'}
                </b>
                <span className="block text-[.95rem] text-ink2">
                  {CATS.filter((c) => c.svc === k)
                    .map((c) => c.t)
                    .join(' · ')}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-[22px] mt-[34px]">
          {[
            ['678 risques', 'appréciés sur 43 entités par la cartographie de la PILCC'],
            ['88 critiques', 'dont le permis de conduire et le passage portuaire'],
            ['48 mesures', 'réparties en six axes, dont « Protéger ceux qui signalent »'],
            ['24 régions', 'couvertes par les directions régionales et interrégionales'],
          ].map(([b, s]) => (
            <div key={b} className="border-t-[3px] border-ink pt-3">
              <b className="block font-display" style={{ fontVariationSettings: '"wdth" 105' }}>
                {b}
              </b>
              <span className="muted">{s}</span>
            </div>
          ))}
        </div>

        <div className="mt-[34px] p-[22px] bg-surface border border-rule rounded-[10px]">
          <h3>Le BCGIPI ne travaille pas seul</h3>
          <p className="muted mt-2">
            Selon la nature des faits, le dossier est orienté vers l'autorité compétente.
          </p>
          <ul className="flex flex-wrap gap-x-[26px] gap-y-2.5 list-none p-0 mt-2.5">
            {[
              ['BIANCO', 'enquête pénale (mémorandum d’entente signé)'],
              ['Pôles Anti-Corruption', 'poursuites et jugement'],
              ['Cour des comptes / CDBF', 'fautes de gestion'],
              ['SAMIFIN', 'soupçons de blanchiment'],
              ['Conseil de discipline', 'fautes des agents publics'],
            ].map(([b, s]) => (
              <li key={b} className="text-[.97rem]">
                <b className="font-display">{b}</b> — {s}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ---------- Que signaler ---------- */}
      <Section id="signaler-quoi">
        <SectionHead title={t('w_t')}>
          <p>
            La corruption ne se limite pas à la remise d'argent. La loi n° 2016-020 réprime aussi le
            favoritisme, l'abus de fonctions, la prise illégale d'intérêts ou les représailles
            contre ceux qui parlent. Voici les situations les plus fréquentes dans le secteur.
          </p>
        </SectionHead>

        <Reveal
          className="grid gap-px bg-rule border border-rule rounded-[10px] overflow-hidden"
          style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))' }}
        >
          {CATS.map((c) => (
            <article key={c.t} className="bg-surface p-[22px]">
              <span className="inline-block font-bold text-[.75rem] text-line bg-linesoft px-2 py-0.5 rounded-xl mb-2">
                Traité par la {c.svc}
              </span>
              <h3 className="text-[1.05rem]">{c.t}</h3>
              <p className="text-[.95rem] text-ink2 m-0">{c.d}</p>
              <span className="block mt-2 text-[.88rem] text-muted">Exemple : {c.e}</span>
            </article>
          ))}
        </Reveal>

        <div className="mt-[26px] py-[18px] pl-[22px] pr-4 border-l-4 border-signal bg-signalsoft rounded-r-lg">
          <b>Ce que cette plateforme ne traite pas.</b> Les faits impliquant la police de la
          circulation routière relèvent du ministère chargé de la sécurité publique : adressez-les
          au BIANCO via i-Toroka. Les contestations d'une décision individuelle (refus de titre,
          sanction) suivent les voies de recours ordinaires. En cas de danger immédiat, contactez les
          forces de l'ordre.
        </div>
      </Section>

      {/* ---------- Périmètre ---------- */}
      <Section id="perimetre">
        <SectionHead title={t('p_t')}>
          <p>
            L'administration centrale, les directions régionales des 24 régions et les 18 organismes
            rattachés, quelle que soit leur forme juridique : établissements publics, sociétés à
            participation publique, concessionnaires, organisme international. Les stagiaires,
            vacataires et prestataires placés sous l'autorité d'un service sont également couverts.
          </p>
        </SectionHead>

        <div className="flex flex-wrap gap-2 mb-[22px]" role="group" aria-label="Filtrer par sous-secteur">
          {SUBS.filter((s) => s === 'Tous' || ENTITIES.some((e) => e.s === s)).map((s) => (
            <Chip key={s} active={sub === s} onClick={() => setSub(s)}>
              {s}
            </Chip>
          ))}
        </div>

        <Reveal
          className="grid gap-3"
          style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))' }}
        >
          {entities.map((e) => (
            <div
              key={e.c}
              className="bg-surface border border-rule rounded-lg px-4 py-3.5 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 items-baseline"
            >
              <span
                className="font-display font-extrabold text-base text-line min-w-[70px]"
                style={{ fontVariationSettings: '"wdth" 80' }}
              >
                {e.c}
              </span>
              <span className="text-[.95rem]">{e.n}</span>
              <span className="col-start-2 text-[.82rem] text-muted">{e.s}</span>
            </div>
          ))}
        </Reveal>
      </Section>

      {/* ---------- Protections ---------- */}
      <Section id="protection">
        <SectionHead title={t('pr_t')}>
          <p>
            Sept citoyens sur dix craignent des représailles s'ils signalent des faits. La
            plateforme a été conçue à partir de ce constat : un canal qui ne protège pas ne reçoit
            rien.
          </p>
        </SectionHead>

        <Reveal className="grid md:grid-cols-2 gap-7">
          <div className="bg-surface border border-rule rounded-[10px] p-6">
            <h3>Ce qui vous protège</h3>
            <ul className="pl-[18px] m-0">
              {[
                [
                  'Anonymat possible.',
                  "Vous n'êtes jamais obligé de donner votre nom. Vous dialoguez avec le BCGIPI par votre code de suivi.",
                ],
                [
                  'Identité sous pli séparé.',
                  "Si vous vous identifiez, votre identité est conservée à part du dossier et n'est révélée à personne sans votre accord.",
                ],
                [
                  'La loi vous couvre.',
                  "Les articles 56 à 59 de la loi n° 2016-020 protègent l'identité des dénonciateurs, témoins et lanceurs d'alerte. Les représailles sont un délit (article 36 ; article 374 du Code pénal).",
                ],
                [
                  'Mesures conservatoires sous 8 jours.',
                  'En cas de représailles contre un agent déclarant, le Ministre prend des mesures conservatoires dans les huit jours.',
                ],
                ['Saisine directe.', 'Vous pouvez saisir le BCGIPI sans passer par votre hiérarchie.'],
              ].map(([b, s]) => (
                <li key={b} className="mb-[9px]">
                  <b>{b}</b> {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-surface border border-signal rounded-[10px] p-6">
            <h3>Ce que l'on attend de vous</h3>
            <ul className="pl-[18px] m-0">
              {[
                [
                  'De la bonne foi.',
                  "Décrivez ce que vous avez vu ou vécu. Vous n'avez pas à apporter la preuve complète : c'est le travail des enquêteurs.",
                ],
                [
                  'Des faits précis.',
                  'Où, quand, quel service, quelle somme, quelle fonction. Pas besoin de nommer une personne si vous ne la connaissez pas.',
                ],
                [
                  "Pas d'accusation mensongère.",
                  "La dénonciation abusive, faite en sachant les faits faux, est punie (article 35 de la loi n° 2016-020 ; article 373.1 du Code pénal).",
                ],
                [
                  'Conservez votre code.',
                  'Il est le seul moyen de suivre votre signalement et de répondre aux questions des enquêteurs.',
                ],
              ].map(([b, s]) => (
                <li key={b} className="mb-[9px]">
                  <b>{b}</b> {s}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Section>

      {/* ---------- Canaux ---------- */}
      <Section id="canaux">
        <SectionHead title={t('c_t')}>
          <p>
            Le canal est unique, mais il a plusieurs portes. Tous les signalements, quel que soit
            leur mode de dépôt, sont inscrits au même registre et soumis aux mêmes délais.
          </p>
        </SectionHead>

        <Reveal className="grid gap-4 grid-cols-1 xs:grid-cols-2 xl:grid-cols-5 lg:grid-cols-4">
          <div className="bg-surface border border-rule rounded-[10px] p-5">
            <b className="block font-display mb-1" style={{ fontVariationSettings: '"wdth" 105' }}>
              Par téléphone
            </b>
            <a href="tel:+261387686171" className="font-display font-extrabold text-[1.25rem] no-underline text-line">
              038 76 861 71
            </a>
            <br />
            <span className="muted text-[.9rem]">Appel ou message</span>
          </div>
          <div className="bg-surface border border-rule rounded-[10px] p-5">
            <b className="block font-display mb-1" style={{ fontVariationSettings: '"wdth" 105' }}>
              Par WhatsApp
            </b>
            <a
              href="https://wa.me/261387686171"
              target="_blank"
              rel="noopener noreferrer"
              className="font-display font-extrabold text-[1.25rem] no-underline text-line break-all"
            >
              +261 38 76 861 71
            </a>
            <br />
            <a
              href="#signaler"
              className="bg-transparent border-0 p-0 mt-1.5 text-line font-bold text-[.92rem] underline cursor-pointer inline-block"
              onClick={(e) => {
                e.preventDefault()
                window.dispatchEvent(new CustomEvent('app-open-panel', { detail: 'wa' }))
              }}
            >
              Rédiger un message
            </a>
          </div>
          <div className="bg-surface border border-rule rounded-[10px] p-5">
            <b className="block font-display mb-1" style={{ fontVariationSettings: '"wdth" 105' }}>
              Par courriel
            </b>
            <a href="mailto:tmanjakalahy@gmail.com" className="break-all">
              tmanjakalahy@gmail.com
            </a>
            <br />
            <span className="muted text-[.88rem]">
              Directeur de la Promotion de l'Intégrité
            </span>
            <br />
            <a href="mailto:raharilalaina.en@gmail.com" className="break-all">
              raharilalaina.en@gmail.com
            </a>
            <br />
            <span className="muted text-[.88rem]">
              Chef de service chargé du traitement des doléances
            </span>
          </div>
          <div className="bg-surface border border-rule rounded-[10px] p-5">
            <b className="block font-display mb-1" style={{ fontVariationSettings: '"wdth" 105' }}>
              En personne ou par courrier
            </b>
            BCGIPI, Ministère des Transports et de la Météorologie, Antananarivo — ou auprès du
            référent intégrité de chaque entité
          </div>
          <div className="bg-surface border border-rule rounded-[10px] p-5">
            <b className="block font-display mb-1" style={{ fontVariationSettings: '"wdth" 105' }}>
              Auprès du BIANCO
            </b>
            Plateforme nationale i-Toroka, pour tout fait de corruption, y compris hors du secteur
          </div>
        </Reveal>
      </Section>

      {/* ---------- FAQ ---------- */}
      <Section id="faq">
        <SectionHead title={t('q_t')}>
          <span />
        </SectionHead>
        {[
          [
            'Dois-je donner mon nom ?',
            "Non. Le signalement anonyme est accepté et traité. Donner un moyen de contact confidentiel aide toutefois les enquêteurs à vous poser des questions ; à défaut, ils vous les poseront via votre code de suivi.",
          ],
          [
            'Que se passe-t-il si je perds mon code ?',
            "Pour protéger votre anonymat, le BCGIPI ne peut pas le retrouver. Vous pouvez déposer un nouveau signalement en mentionnant l'ancien (date approximative, service concerné) : les deux seront rapprochés au registre.",
          ],
          [
            'Qui traite ma doléance, et en combien de temps ?',
            'La Direction de l\'Inspection et de l\'Audit (DIA) traite les faits qui demandent une vérification sur place ou sur pièces : paiements indus, encaissements sans quittance, titres frauduleux, marchés, détournements, concours. La Direction de la Promotion de l\'Intégrité (DPI) traite les manquements à l\'éthique, les conflits d\'intérêts, les cadeaux illicites et les représailles contre les déclarants. Dans les deux cas, le délai maximum est de 15 jours à compter du dépôt.',
          ],
          [
            'Mon signalement peut-il être classé sans suite ?',
            'Un signalement peut ne pas donner lieu à poursuites, mais il ne peut jamais être classé sans décision écrite et motivée versée au registre. Vous en êtes informé sous votre code.',
          ],
          [
            "Je suis agent du Ministère. Mon chef peut-il savoir que j'ai signalé ?",
            'Non. La saisine du BCGIPI est directe et n\'emprunte pas la voie hiérarchique. Toute mesure défavorable prise contre vous en raison d\'un signalement constitue un délit de représailles.',
          ],
          [
            'Quelle différence avec i-Toroka du BIANCO ?',
            "i-Toroka est la plateforme nationale du BIANCO, compétente pour tous les secteurs. Cette plateforme est propre au secteur des transports et de la météorologie : elle permet au Ministère de corriger ses procédures et de sanctionner ses agents, et le BCGIPI transmet au BIANCO les faits qui relèvent de l'enquête pénale, conformément au mémorandum d'entente signé entre les deux institutions.",
          ],
        ].map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </Section>
    </div>
  )
}
