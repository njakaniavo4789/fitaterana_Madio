import { useT } from '../context.js'
import { Wrap } from '../ui.jsx'
import { LIVE } from '../data.js'

export default function DemoBanner() {
  const { t } = useT()
  if (LIVE) return null
  return (
    <div className="bg-signalsoft text-ink text-[.9rem] py-2 border-b border-rule no-print">
      <Wrap>
        <strong className="text-signal">Maquette de démonstration.</strong> {t('demo')}
      </Wrap>
    </div>
  )
}
