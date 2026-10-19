const ITEMS = [
  'Fitaterana tsy misy kolikoly — Des transports sans corruption',
  'Aucun acte ne doit se payer une seconde fois',
  'Exigez une quittance numérotée pour tout paiement',
  'Signalez au 038 76 861 71',
  'Accusé de réception sous 48 heures',
  'Votre doléance est traitée en 15 jours au maximum',
  'Vous pouvez signaler sans donner votre nom',
  'Les représailles contre un déclarant sont un délit',
  'Aza mandoa vola tsy ara-dalàna',
]

export default function Ticker() {
  return (
    <div className="ticker bg-line text-white overflow-hidden whitespace-nowrap font-semibold text-[.95rem] no-print">
      <div className="ticker-track" role="marquee" aria-label="Messages clés">
        {ITEMS.map((m, i) => (
          <span key={i}>{m}</span>
        ))}
        {ITEMS.map((m, i) => (
          <span key={`b${i}`} aria-hidden="true">
            {m}
          </span>
        ))}
      </div>
    </div>
  )
}
