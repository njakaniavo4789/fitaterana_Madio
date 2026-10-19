import { useNav, useT } from '../context.js'
import { Wrap } from '../ui.jsx'

export default function Footer() {
  const { go } = useNav()
  const { t } = useT()

  const link = (label, view, hash) => (
    <a
      href={hash}
      className="text-onnavy"
      onClick={(e) => {
        e.preventDefault()
        go(view, hash)
      }}
    >
      {label}
    </a>
  )

  return (
    <footer className="bg-navy text-onnavy pt-11 pb-9 text-[.93rem]">
      <Wrap>
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr] gap-[30px]">
          <div>
            <b className="font-display text-[1.15rem]">Fitaterana Madio</b>
            <p className="mt-2">
              Plateforme de signalement du Ministère des Transports et de la Météorologie, opérée
              par le Bureau de Coordination Générale de l'Inspection et de la Promotion de
              l'Intégrité.
            </p>
          </div>
          <div>
            <b>Textes de référence</b>
            <p className="mt-2">
              Loi n° 2016-020 sur la lutte contre la corruption
              <br />
              Décret n° 2021-863 modifié par le décret n° 2026-1171
              <br />
              Stratégie Nationale de Lutte Contre la Corruption 2025-2030
              <br />
              PILCC du MTM, 1er octobre 2026
            </p>
          </div>
          <div>
            <b>Accès</b>
            <p className="mt-2">
              {link(t('cta_report'), 'report', '#signaler')}
              <br />
              {link(t('cta_track'), 'track', '#suivre')}
              <br />
              {link('Espace BCGIPI (démonstration)', 'registry', '#registre')}
            </p>
          </div>
        </div>
        <p className="mt-7 opacity-70 text-[.85rem]">
          Repoblikan'i Madagasikara — Fitiavana, Tanindrazana, Fandrosoana
        </p>
      </Wrap>
    </footer>
  )
}
