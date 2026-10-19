import { useCallback, useEffect, useRef, useState } from 'react'
import { useNav } from '../context.js'
import { Wrap, Reveal, Btn } from '../ui.jsx'
import { prefersReduce, useCountUp } from '../lib.js'

const ENGAGEMENTS = [
  'Aucun service rendu par un agent du secteur ne donne lieu à un paiement autre que celui prévu par les textes, dont le montant est affiché.',
  "Aucun agent ne subira de mesure défavorable pour avoir signalé de bonne foi un fait de corruption ni pour avoir refusé une instruction irrégulière.",
  "Tout fait porté à la connaissance du Ministère est transmis aux autorités compétentes, sans considération de la fonction de la personne concernée.",
  "L'exécution de la politique est mesurée chaque année, ses résultats étant publiés.",
]

const AXES = [
  ["Axe 1", "Protéger l'usager au point de contact"],
  ['Axe 2', 'Sécuriser la délivrance des titres'],
  ['Axe 3', 'Rendre la dépense vérifiable'],
  ['Axe 4', 'Détecter'],
  ['Axe 5', 'Protéger ceux qui signalent'],
  ['Axe 6', 'Rendre compte'],
]

const MESURES = [
  'Affichage opposable des tarifs, gratuités, pièces et délais',
  'Quittance numérotée obligatoire pour tout encaissement',
  'Canal de signalement unique à délais opposables',
  'Suppression des intermédiaires aux abords des guichets',
  "Achèvement de la dématérialisation de l'examen du permis",
  'Authentification systématique des titres et diplômes',
  'Rapprochement systématique titres, quittances et recettes',
  'Rotation obligatoire aux postes exposés',
  'Constat contradictoire obligatoire avant tout décompte',
  "Clause d'intégrité et publication des attributaires",
]

function Fig({ value, label }) {
  const [ref, text] = useCountUp(value)
  return (
    <div>
      <b ref={ref}>{text}</b>
      <span>{label}</span>
    </div>
  )
}

function Carousel() {
  const [cur, setCur] = useState(0)
  const timer = useRef(null)
  const restart = useCallback(() => {
    clearInterval(timer.current)
    if (prefersReduce()) return
    timer.current = setInterval(() => setCur((c) => (c + 1) % ENGAGEMENTS.length), 6000)
  }, [])
  useEffect(() => {
    restart()
    return () => clearInterval(timer.current)
  }, [restart])

  return (
    <>
      <div
        className="carousel"
        aria-roledescription="carrousel"
        onMouseEnter={() => clearInterval(timer.current)}
        onMouseLeave={restart}
      >
        {ENGAGEMENTS.map((text, i) => (
          <div key={text} className={`slide${i === cur ? ' on' : ''}`} aria-hidden={i === cur ? 'false' : 'true'}>
            <div className="no">Engagement {i + 1} sur {ENGAGEMENTS.length}</div>
            <p>{text}</p>
          </div>
        ))}
      </div>
      <div className="dots" role="group" aria-label="Choisir un engagement">
        {ENGAGEMENTS.map((_, i) => (
          <button
            key={i}
            type="button"
            className="dots-b"
            aria-label={`Engagement ${i + 1}`}
            aria-current={i === cur ? 'true' : 'false'}
            onClick={() => {
              setCur(i)
              restart()
            }}
          />
        ))}
      </div>
    </>
  )
}

export default function MinisterPage() {
  const { go } = useNav()

  return (
    <div id="view-minister">
      <section className="min-hero" id="ministre">
        <Wrap className="min-grid">
          <Reveal as="figure" className="min-photo">
            <img src="/ministre.jpg" alt="Portrait du Ministre des Transports et de la Météorologie" />
            <figcaption>
              <b>ANDRIANAVALONA RAMANAMBOLA Herizo</b>
              Ministre des Transports et de la Météorologie
            </figcaption>
          </Reveal>
          <div className="min-text">
            <p className="min-kicker">Le mot du Ministre</p>
            <Reveal as="p" className="min-quote">
              « Aucun de ces actes ne doit se payer une seconde fois. »
            </Reveal>
            <p>
              Le Ministère des Transports et de la Météorologie délivre chaque jour des actes dont
              dépendent la sécurité des personnes et le fonctionnement de l'économie : un permis de
              conduire, un certificat de visite technique, une licence de transport, un titre de
              navigation, une autorisation d'occupation portuaire. Aucun de ces actes ne doit se
              payer une seconde fois.
            </p>
            <p>
              J'affirme ici la politique du Ministère : éradiquer la corruption dans le secteur des
              transports et de la météorologie. Ce n'est pas une formule. C'est un objectif que je
              fixe, dont je réponds, et dont les résultats seront mesurés chaque année et publiés, y
              compris lorsqu'ils seront défavorables.
            </p>
            <p>
              Cet engagement s'inscrit dans la Stratégie Nationale de Lutte Contre la Corruption
              2025-2030, qui prescrit expressément la formulation et le suivi de politiques internes
              dans les ministères sectoriels : le présent document en est l'exécution pour notre
              secteur. Il recense 678 risques dans les quarante-trois entités du Ministère et de ses
              organismes rattachés, les qualifie au regard des infractions que la loi réprime, en
              établit le coût pour la population, et en déduit un ordre d'action fondé sur le nombre
              de personnes soulagées.
            </p>
            <p>
              J'attends de chaque directeur général, de chaque directeur régional et de chaque chef
              de service qu'il en fasse un instrument de travail. L'obligation que la loi leur fait
              est personnelle : elle ne se délègue pas. Je veillerai à ce qu'elle soit tenue.
            </p>
            <div className="min-sign">
              <b>Le Ministre des Transports et de la Météorologie</b>
              Antananarivo, le 1<sup>er</sup> octobre 2026 — extrait du mot de présentation de la
              PILCC
            </div>
          </div>
        </Wrap>
      </section>

      <section className="engage">
        <Wrap>
          <Reveal as="h2">Quatre engagements du Ministre</Reveal>
          <Carousel />
        </Wrap>
      </section>

      <section className="block py-[72px] border-b border-rule">
        <Wrap>
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 mb-9">
            <Reveal as="h2">Les cinq objectifs poursuivis</Reveal>
            <Reveal as="ol" className="obj-list">
              <li>
                Protéger l'usager au point de contact : savoir ce que l'on doit payer, ce que l'on
                doit fournir, sous quel délai, et détenir une preuve de ce que l'on a versé.
              </li>
              <li>
                Sécuriser la délivrance des titres qui engagent la sécurité des personnes.
              </li>
              <li>Rendre la dépense vérifiable : aucun paiement avant constatation contradictoire.</li>
              <li>Détecter par les rapprochements, et protéger sans condition ceux qui signalent.</li>
              <li>Rendre compte publiquement des résultats, chaque année.</li>
            </Reveal>
          </div>
        </Wrap>
      </section>

      <section className="block py-[72px] border-b border-rule" id="snlcc">
        <Wrap>
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 mb-9">
            <Reveal as="h2">
              La Stratégie Nationale de Lutte Contre la Corruption 2025-2030
            </Reveal>
            <div className="measure">
              <p>
                La Stratégie Nationale fixe la vision du pays et s'organise en trois objectifs
                stratégiques, déclinés en neuf effets attendus. Elle prescrit de doter les structures
                anti-corruption des moyens nécessaires à la mise en œuvre des politiques internes
                (sous-effet 2.2.1) et d'appuyer les ministères sectoriels dans leur formulation et
                leur suivi (sous-effet 2.2.2).
              </p>
            </div>
          </div>
          <Reveal as="p" className="vision">
            Faire de Madagascar une île où les réseaux de corruption et l'impunité ne freinent plus
            le développement durable.
          </Reveal>
          <Reveal className="os">
            <div>
              <b>Objectif stratégique 1</b>
              <p>Mettre fin à l'impunité</p>
            </div>
            <div>
              <b>Objectif stratégique 2</b>
              <p>Propulser l'approche multi-acteurs</p>
            </div>
            <div>
              <b>Objectif stratégique 3</b>
              <p>Promouvoir une culture d'intégrité partagée</p>
            </div>
          </Reveal>
          <p className="muted measure mt-[22px]">
            Le secteur des transports ne figure pas parmi les sept secteurs prioritaires de la
            Stratégie Nationale. La PILCC lui apporte la cartographie sectorielle que la Stratégie
            appelle sans l'avoir programmée.
          </p>
        </Wrap>
      </section>

      <section className="block py-[72px]" id="pilcc">
        <Wrap>
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 mb-9">
            <Reveal as="h2">
              La Politique Interne de Lutte Contre la Corruption du Ministère
            </Reveal>
            <div className="measure">
              <p>
                Signée par le Ministre le 1<sup>er</sup> octobre 2026, la PILCC décline la Stratégie
                Nationale pour le secteur des transports et de la météorologie. Elle comprend un
                document principal et un volume annexe technique, et porte un slogan : « Des
                transports sans corruption ».
              </p>
            </div>
          </div>
          <div className="figs">
            <Fig value={678} label="risques appréciés" />
            <Fig value={88} label="risques critiques" />
            <Fig value={43} label="entités couvertes" />
            <Fig value={48} label="mesures, dont 10 prioritaires" />
          </div>
          <Reveal as="h3">Six axes d'action</Reveal>
          <Reveal className="axes">
            {AXES.map(([i, b]) => (
              <div key={i}>
                <i>{i}</i>
                <b>{b}</b>
              </div>
            ))}
          </Reveal>
          <div className="marquee" aria-label="Les dix mesures prioritaires">
            <div className="marquee-track">
              {MESURES.map((m, i) => (
                <span key={`a${i}`}>
                  <b>Mesure {i + 1}</b>
                  {m}
                </span>
              ))}
              {MESURES.map((m, i) => (
                <span key={`b${i}`} aria-hidden="true">
                  <b>Mesure {i + 1}</b>
                  {m}
                </span>
              ))}
            </div>
          </div>
          <p className="mt-7">
            <Btn
              variant="go"
              onClick={() => go('report', '#signaler')}
            >
              Faire un signalement
            </Btn>
          </p>
        </Wrap>
      </section>
    </div>
  )
}
