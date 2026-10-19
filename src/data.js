export const PLATFORM = 'Fitaterana Madio'
/* Mode en ligne : true quand le site est hébergé chez Netlify. */
export const FORCE_LIVE = false
export const LIVE =
  FORCE_LIVE || (typeof location !== 'undefined' && /\.netlify\.app$/.test(location.hostname))
export const WA_NUMBER = '261387686171'
/* Délais de traitement (en jours). */
export const ACK_DAYS = 2 // accusé de réception : 48 heures
export const OR_DAYS = 15 // délai maximum de traitement de la doléance

export const ENTITIES = [
  { c: 'ATT', n: 'Agence des Transports Terrestres', s: 'Routier' },
  { c: 'SPAT', n: 'Société du Port à gestion Autonome de Toamasina', s: 'Maritime et fluvial' },
  { c: 'SPAM', n: 'Port à gestion autonome de Mahajanga', s: 'Maritime et fluvial' },
  { c: 'SPAAN', n: "Port à gestion autonome d'Antsiranana", s: 'Maritime et fluvial' },
  { c: 'SPATO', n: 'Port à gestion autonome de Toliara', s: 'Maritime et fluvial' },
  { c: 'SMMC', n: 'Société de Manutention des Marchandises Conventionnelles', s: 'Maritime et fluvial' },
  { c: 'MICTSL', n: 'Madagascar International Container Terminal Services', s: 'Maritime et fluvial' },
  { c: 'APMF', n: 'Agence Portuaire, Maritime et Fluviale', s: 'Maritime et fluvial' },
  { c: 'ENEMM', n: "École nationale d'enseignement maritime", s: 'Maritime et fluvial' },
  { c: 'ACM', n: 'Aviation Civile de Madagascar', s: 'Aérien' },
  { c: 'ADEMA', n: 'Société Aéroports de Madagascar', s: 'Aérien' },
  { c: 'AIRMAD', n: 'Air Madagascar / Madagascar Airlines', s: 'Aérien' },
  { c: 'ENEAM', n: "École nationale d'enseignement aéronautique et météorologique", s: 'Aérien' },
  { c: 'ASECNA', n: 'Agence pour la Sécurité de la Navigation aérienne', s: 'Aérien' },
  { c: 'SOFITRANS', n: 'SOFITRANS', s: 'Aérien' },
  { c: 'MADARAIL', n: 'Société MADARAIL — réseau ferroviaire Nord', s: 'Ferroviaire' },
  { c: 'FCE', n: 'Réseau Fianarantsoa — Côte Est', s: 'Ferroviaire' },
  { c: 'SETU', n: "Société d'Exploitation du Train Urbain", s: 'Transport urbain' },
  { c: 'CAB', n: 'Cabinet du Ministre', s: 'Administration centrale' },
  { c: 'SG', n: 'Secrétariat Général et directions rattachées', s: 'Administration centrale' },
  { c: 'PRMP', n: 'Personne Responsable des Marchés Publics', s: 'Administration centrale' },
  { c: 'CGP', n: 'Coordonnateur Général des Projets', s: 'Administration centrale' },
  { c: 'DGTT', n: 'Direction Générale des Transports Terrestres', s: 'Administration centrale' },
  { c: 'DGTMFA', n: 'Direction Générale des Transports Maritime, Fluvial et Aérien', s: 'Administration centrale' },
  { c: 'DGM', n: 'Direction Générale de la Météorologie', s: 'Météorologie' },
  { c: 'DRI', n: 'Directions Régionales et Interrégionales', s: 'Régions' },
]

export const SUBS = [
  'Tous',
  'Routier',
  'Maritime et fluvial',
  'Aérien',
  'Ferroviaire',
  'Transport urbain',
  'Météorologie',
  'Administration centrale',
  'Régions',
]

export const CATS = [
  {
    t: 'Paiement indu au guichet',
    svc: 'DIA',
    d: 'Somme réclamée en plus du tarif officiel, ou pour un acte gratuit.',
    e: 'Permis de conduire, carte grise, visite technique, licence de transport',
  },
  {
    t: 'Encaissement sans quittance',
    svc: 'DIA',
    d: "Paiement accepté sans remise d'une quittance numérotée.",
    e: "Redevance portuaire, droits de gare, frais d'examen",
  },
  {
    t: 'Titre délivré sans épreuve',
    svc: 'DIA',
    d: 'Permis, brevet, licence ou certificat obtenu sans examen réel ou hors critères.',
    e: 'Permis de conduire, brevets des gens de mer, certification aéronautique',
  },
  {
    t: 'Passage accéléré contre paiement',
    svc: 'DIA',
    d: 'Traitement prioritaire ou contrôle allégé moyennant une somme.',
    e: "Passage portuaire des marchandises, contrôle à l'aéroport",
  },
  {
    t: 'Marché public arrangé',
    svc: 'DIA',
    d: 'Favoritisme, entente, fractionnement, commission sur un paiement.',
    e: 'Pourcentage exigé pour débloquer un paiement, cahier des charges taillé sur mesure',
  },
  {
    t: 'Détournement de biens publics',
    svc: 'DIA',
    d: 'Usage privé de véhicules, carburant, matériel ou recettes.',
    e: 'Recettes non reversées, véhicule de service à usage personnel',
  },
  {
    t: "Conflit d'intérêts",
    svc: 'DPI',
    d: 'Un agent décide dans un dossier où lui ou un proche a un intérêt.',
    e: 'Attribution à une société liée à un responsable',
  },
  {
    t: 'Cadeau ou avantage illicite',
    svc: 'DPI',
    d: 'Cadeau, invitation ou avantage offert ou accepté en lien avec la fonction.',
    e: 'Voyage offert par un opérateur contrôlé',
  },
  {
    t: 'Recrutement ou concours truqué',
    svc: 'DIA',
    d: 'Place, note ou admission obtenue contre paiement ou par piston.',
    e: "Concours des écoles du secteur, recrutement d'agents",
  },
  {
    t: 'Abus de fonctions',
    svc: 'DIA',
    d: 'Usage de la fonction pour obtenir un avantage ou nuire.',
    e: "Blocage volontaire d'un dossier, contrôle abusif",
  },
  {
    t: 'Représailles contre un déclarant',
    svc: 'DPI',
    d: 'Mutation, sanction ou menace après un signalement ou un témoignage.',
    e: 'Agent muté après avoir refusé une instruction irrégulière',
  },
  {
    t: 'Autre anomalie de gestion',
    svc: 'DPI',
    d: 'Toute irrégularité qui ne rentre pas dans les cases ci-dessus.',
    e: "Absence d'affichage des tarifs, délais non respectés",
  },
]

export const REGIONS = [
  'Analamanga',
  'Alaotra-Mangoro',
  "Amoron'i Mania",
  'Analanjirofo',
  'Androy',
  'Anosy',
  'Atsimo-Andrefana',
  'Atsimo-Atsinanana',
  'Atsinanana',
  'Betsiboka',
  'Boeny',
  'Bongolava',
  'Diana',
  'Haute Matsiatra',
  'Ihorombe',
  'Itasy',
  'Melaky',
  'Menabe',
  'Sava',
  'Sofia',
  'Vakinankaratra',
  'Vatovavy',
  'Fitovinany',
  'Ambatosoa',
]

export const PROFILS = [
  "Usager d'un service",
  "Agent du Ministère ou d'un organisme rattaché",
  'Opérateur ou transporteur',
  'Entreprise soumissionnaire ou prestataire',
  'Témoin extérieur',
  'Je préfère ne pas le dire',
]

export const ONGOING = ["Oui, ils se répètent", 'Non, fait unique', 'Je ne sais pas']
export const WITNESS = ['Oui', 'Non', 'Je ne sais pas']
export const ALREADY = ['Non', 'Oui, à ma hiérarchie', 'Oui, au BIANCO', 'Oui, à une autre autorité']

export const SVC_NAME = {
  DIA: "Direction de l'Inspection et de l'Audit (DIA)",
  DPI: "Direction de la Promotion de l'Intégrité (DPI)",
}

export function svcOf(cat) {
  const c = CATS.find((x) => x.t === cat)
  return c ? c.svc : 'DIA'
}

export const MODES = { anonyme: 'Anonyme', confidentiel: 'Confidentiel', identifie: 'Identifié' }

export const ORIENT = [
  'Traité — mesures correctives',
  'Traité — procédure disciplinaire proposée',
  'Transmis au BIANCO',
  'Transmis au Pôle Anti-Corruption',
  'Transmis à la Cour des comptes / CDBF',
  'Transmis au SAMIFIN',
  'Non retenu — décision motivée',
]

export const PAGES = [
  { v: 'home', a: '#accueil', t: 'Accueil' },
  { v: 'minister', a: '#ministre', t: 'Le mot du Ministre' },
  { v: 'home', a: '#bcgipi', t: 'Le BCGIPI' },
  { v: 'home', a: '#signaler-quoi', t: 'Que signaler ?' },
  { v: 'home', a: '#perimetre', t: 'Qui est concerné' },
  { v: 'home', a: '#protection', t: 'Vos protections' },
  { v: 'home', a: '#canaux', t: 'Autres façons de signaler' },
  { v: 'home', a: '#faq', t: 'Questions fréquentes' },
  { v: 'report', a: '#signaler', t: 'Faire un signalement' },
  { v: 'track', a: '#suivre', t: 'Suivre mon signalement' },
]

export const HASHVIEW = {
  '#ministre': 'minister',
  '#snlcc': 'minister',
  '#pilcc': 'minister',
  '#signaler': 'report',
  '#suivre': 'track',
  '#registre': 'registry',
}

/* ---------- Textes (FR puis MG) ---------- */
export const FR = {
  demo: "Aucune donnée saisie ici n'est transmise au BCGIPI : les signalements restent dans ce navigateur.",
  nav_min: 'Le mot du Ministre',
  nav_bcgipi: 'Le BCGIPI',
  nav_what: 'Que signaler ?',
  nav_protect: 'Vos protections',
  nav_report: 'Signaler',
  nav_track: 'Suivre',
  kicker: 'Ministère des Transports et de la Météorologie — plateforme officielle de signalement',
  lead: "Un agent vous a réclamé une somme non prévue ? Un marché vous paraît arrangé ? Un titre a été délivré sans épreuve ? Signalez-le au BCGIPI, en ligne, de façon anonyme si vous le souhaitez. Chaque signalement est inscrit au registre, reçoit un accusé de réception sous 48 heures et est traité en 15 jours au maximum par la DIA ou la DPI, selon sa nature.",
  cta_report: 'Faire un signalement',
  cta_track: 'Suivre mon signalement',
  f1: 'entités couvertes, dont 18 organismes rattachés',
  f2: "pour l'accusé de réception",
  f3: 'au maximum pour traiter votre doléance',
  route_t: 'Le trajet de votre signalement',
  r1w: 'Jour 0',
  r1: 'Dépôt et inscription au registre horodaté. Vous recevez un code de suivi.',
  r2w: 'Sous 48 heures',
  r2: 'Accusé de réception versé à votre dossier de suivi.',
  r3w: '15 jours au maximum',
  r3: 'Traitement de la doléance par la DIA ou la DPI selon sa nature, et décision écrite motivée.',
  r4w: 'Suites',
  r4: 'Mesures correctives, procédure disciplinaire, ou transmission au BIANCO, au PAC, à la Cour des comptes ou au SAMIFIN.',
  r5w: 'Retour',
  r5: 'Vous êtes informé des suites, sous votre code.',
  b_t: 'Le BCGIPI, structure anti-corruption du Ministère',
  w_t: 'Ce que vous pouvez signaler',
  p_t: 'Qui est concerné',
  pr_t: 'Vos protections',
  c_t: 'Autres façons de signaler',
  q_t: 'Questions fréquentes',
  form_t: 'Faire un signalement',
  track_t: 'Suivre mon signalement',
}

export const MG = {
  demo: "Tsy alefa any amin'ny BCGIPI ny angona soratana eto : mijanona ato amin'ity navigateur ity ny fitarainana.",
  nav_min: "Tenin'ny Minisitra",
  nav_bcgipi: 'Ny BCGIPI',
  nav_what: 'Inona no ampahafantarina ?',
  nav_protect: "Ny fiarovana anao",
  nav_report: 'Hitaraina',
  nav_track: 'Hanaraka',
  kicker: "Ministeran'ny Fitaterana sy ny Toetrandro — sehatra ofisialy fametrahana fitarainana",
  lead: 'Nisy mpiasa nangataka vola tsy voalaza ao amin\'ny saran-dalana ofisialy ? Toa voalamina mialoha ny tolotra iray ? Nomena taratasy nefa tsy nisy fanadinana ? Ampahafantararo ny BCGIPI, an-tserasera, ary afaka tsy mitonona anarana ianao. Voasoratra ao amin\'ny rejisitra ny fitarainana rehetra, mahazo fanamarinana fandraisana ao anatin\'ny 48 ora ary karakarain\'ny DIA na ny DPI ao anatin\'ny 15 andro farafahabetsany.',
  cta_report: 'Hametraka fitarainana',
  cta_track: 'Hanaraka ny fitarainako',
  f1: "sampan-draharaha voakasika, anisan'izany ireo rafitra 18 miankina",
  f2: "ho an'ny fanamarinana fandraisana",
  f3: 'farafahabetsany hikarakarana ny fitarainanao',
  route_t: "Ny lalan'ny fitarainanao",
  r1w: 'Andro 0',
  r1: 'Fametrahana sy fanoratana ao amin\'ny rejisitra. Mahazo kaody fanarahana ianao.',
  r2w: "Ao anatin'ny 48 ora",
  r2: 'Fanamarinana fandraisana apetraka ao amin\'ny antontan-taratasinao.',
  r3w: '15 andro farafahabetsany',
  r3: 'Karakarain\'ny DIA na ny DPI ny fitarainana araka ny toetrany, ary misy fanapahan-kevitra an-tsoratra voazava antony.',
  r4w: 'Tohiny',
  r4: "Fanitsiana, fanenjehana ara-pitsipi-pifehezana, na fandefasana any amin'ny BIANCO, PAC, Fitsarana momba ny Kaonty na SAMIFIN.",
  r5w: 'Valiny',
  r5: 'Ampahafantarina anao ny tohiny, amin\'ny alalan\'ny kaodinao.',
  b_t: "Ny BCGIPI, rafitra miady amin'ny kolikoly ao amin'ny Ministera",
  w_t: 'Izay azonao ampahafantarina',
  p_t: 'Iza no voakasika',
  pr_t: 'Ny fiarovana anao',
  c_t: 'Fomba hafa hitarainana',
  q_t: 'Fanontaniana matetika',
  form_t: 'Hametraka fitarainana',
  track_t: 'Hanaraka ny fitarainako',
}

/* ---------- Assistant ---------- */
export const KB = [
  {
    k: ['signaler', 'deposer', 'doleance', 'plainte', 'comment', 'faire', 'hitaraina', 'fitarainana'],
    a: "Pour signaler, ouvrez « Signaler » dans le menu : 5 étapes, environ dix minutes. Vous pouvez rester anonyme. À la fin, notez votre code et votre clé. Vous pouvez aussi appeler le 038 76 861 71, écrire sur WhatsApp au +261 38 76 861 71, ou envoyer un courriel à raharilalaina.en@gmail.com.",
  },
  {
    k: ['anonym', 'nom', 'identite', 'identifie', 'reconnu', 'savoir', 'chef', 'hierarchie'],
    a: "Vous n'êtes pas obligé de donner votre nom. En mode confidentiel, votre contact est conservé sous pli séparé et seul le Coordonnateur Général y a accès. Un agent peut saisir le BCGIPI sans passer par sa hiérarchie. Attention : WhatsApp et le téléphone font apparaître votre numéro.",
  },
  {
    k: ['represaille', 'menace', 'mute', 'mutation', 'peur', 'protege', 'protection', 'sanction'],
    a: "Les représailles contre un déclarant sont un délit (article 36 de la loi n° 2016-020). En cas de représailles, le Ministre prend des mesures conservatoires sous huit jours. Signalez-les avec la nature « Représailles contre un déclarant », en citant votre premier code.",
  },
  {
    k: ['delai', 'combien', 'temps', 'quand', 'jour', 'heure', 'attente'],
    a: 'Vous recevez un accusé de réception sous 48 heures. Votre doléance est traitée en 15 jours au maximum par la DIA ou la DPI, selon sa nature, avec une décision écrite et motivée.',
  },
  {
    k: ['dia', 'dpi', 'traite', 'qui', 'direction', 'service'],
    a: 'La DIA traite les faits à vérifier sur place ou sur pièces : paiements indus, encaissements sans quittance, titres frauduleux, marchés, détournements, concours, abus de fonctions. La DPI traite les conflits d’intérêts, les cadeaux illicites, les représailles et les autres manquements (accueil, affichage, comportement).',
  },
  {
    k: ['permis', 'guichet', 'quittance', 'argent', 'payer', 'paye', 'tarif', 'vola', 'kolikoly', 'pourcentage'],
    a: "Tout acte a un tarif officiel, et certains sont gratuits. Exigez une quittance numérotée pour tout paiement. Si on vous demande une somme en plus, notez le lieu, la date, le service et le montant, puis signalez-le : vous n'avez pas besoin de connaître le nom de l'agent.",
  },
  {
    k: ['code', 'cle', 'perdu', 'suivre', 'suivi', 'etat'],
    a: "Votre code (FM-2026-XXXX-XXXX) et votre clé permettent de suivre votre dossier dans « Suivre ». S'ils sont perdus, le BCGIPI ne peut pas les retrouver : déposez un nouveau signalement en mentionnant l'ancien (date approximative, service).",
  },
  {
    k: ['police', 'gendarme', 'route', 'circulation', 'bianco', 'toroka'],
    a: "Les faits impliquant la police de la circulation relèvent du ministère chargé de la sécurité publique : adressez-les au BIANCO via sa plateforme i-Toroka. Les faits pénaux du secteur des transports sont transmis par le BCGIPI au BIANCO.",
  },
  {
    k: ['contact', 'telephone', 'numero', 'whatsapp', 'email', 'courriel', 'mail', 'adresse'],
    a: 'Téléphone et WhatsApp : 038 76 861 71 (+261 38 76 861 71). Courriel : raharilalaina.en@gmail.com (chef de service chargé des doléances) ou tmanjakalahy@gmail.com (Directeur de la Promotion de l’Intégrité).',
  },
  {
    k: ['faux', 'mensonge', 'abusive', 'preuve', 'sur', 'certain'],
    a: "Vous n'avez pas à apporter la preuve complète : décrivez de bonne foi ce que vous avez vu ou vécu. Seule la dénonciation de faits que l'on sait faux est punie.",
  },
  {
    k: ['bonjour', 'salut', 'manao', 'salama', 'bonsoir'],
    a: 'Bonjour ! Je peux vous expliquer comment signaler, vos protections, les délais ou qui traite votre doléance. Que voulez-vous savoir ?',
  },
]

export const FALLBACK_ANSWER =
  'Je peux vous renseigner sur la façon de signaler, l’anonymat, vos protections, les délais (48 heures et 15 jours au maximum) et les contacts du BCGIPI. Pour déposer une doléance, utilisez le formulaire « Signaler ».'

export const CHAT_RULES =
  'Tu es l’assistant de « Fitaterana Madio », la plateforme de signalement des faits de corruption du Ministère des Transports et de la Météorologie de Madagascar, opérée par le BCGIPI (Bureau de Coordination Générale de l’Inspection et de la Promotion de l’Intégrité). Réponds dans la langue de l’usager (français ou malgache), avec bienveillance, en 120 mots au plus, en texte simple sans mise en forme.\n' +
  'FAITS À UTILISER : signalement en ligne via le menu « Signaler » (5 étapes, anonyme, confidentiel ou identifié), code et clé remis à la fin, suivi via « Suivre ». Accusé de réception sous 48 heures ; traitement en 15 jours au maximum avec décision écrite motivée. La DIA traite les faits à vérifier sur place ou sur pièces (paiements indus, encaissements sans quittance, titres frauduleux, marchés, détournements, concours, abus de fonctions) ; la DPI traite conflits d’intérêts, cadeaux illicites, représailles, autres manquements. Suites possibles : mesures correctives, procédure disciplinaire, transmission au BIANCO, au Pôle Anti-Corruption, à la Cour des comptes ou au SAMIFIN. Contacts : téléphone et WhatsApp 038 76 861 71, courriels raharilalaina.en@gmail.com et tmanjakalahy@gmail.com. Protection : loi n° 2016-020, articles 56 à 59 (identité protégée), article 36 (représailles punies) ; mesures conservatoires du Ministre sous 8 jours ; la dénonciation sciemment mensongère est punie. Hors champ : police de la circulation (BIANCO, i-Toroka). Périmètre : le Ministère, ses 24 régions et 18 organismes rattachés (ATT, ports, APMF, ACM, ADEMA, Air Madagascar, MADARAIL, etc.).\n' +
  'RÈGLES : ne demande jamais le nom, le numéro ou un détail qui identifie l’usager, et conseille de ne pas en donner ici. Tu ne reçois ni ne transmets aucune doléance : oriente vers le formulaire. Tu peux aider l’usager à formuler les faits (où, quand, quel service, quel montant, quelle fonction). Ne te prononce jamais sur la culpabilité d’une personne nommée. N’invente aucun fait, numéro ou procédure absents ci-dessus ; si tu ne sais pas, dis-le et renvoie vers le 038 76 861 71. En cas de danger immédiat, conseille d’appeler les forces de l’ordre. Reste dans le sujet de la plateforme et de l’intégrité publique.'
