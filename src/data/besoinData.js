// src/data/besoinData.js

export const besoinSections = [
  { 
    id: 'objectifs', 
    title: 'Objectifs', 
    icon: '🎯',
    questions: [
      'Quel est votre objectif principal ?',
      'Qu\'est-ce qui changerait pour vous si cet objectif était atteint ?',
      'Avez-vous d\'autres projets à moyen terme ?'
    ],
    exemples: [
      'Je veux devenir propriétaire pour arrêter de payer un loyer',
      'J\'aurais enfin la sécurité pour ma famille et mes enfants',
      'Oui, on pense à un deuxième enfant d\'ici 2 ans'
    ]
  },
  { 
    id: 'budget', 
    title: 'Budget', 
    icon: '💰',
    questions: [
      'Quel est votre budget mensuel disponible ?',
      'Avez-vous des contraintes budgétaires particulières ?',
      'Comment gérez-vous vos finances actuellement ?'
    ],
    exemples: [
      'J\'ai environ 500€/mois à mettre de côté après toutes mes charges',
      'Je ne veux pas dépasser 1200€/mois de remboursement de crédit',
      'Je gère tout manuellement sur Excel, c\'est un peu le bazar'
    ]
  },
  { 
    id: 'echeance', 
    title: 'Échéance', 
    icon: '⏰',
    questions: [
      'Dans quel délai souhaitez-vous aboutir ?',
      'Y a-t-il une urgence particulière ?',
      'Avez-vous une date limite à respecter ?'
    ],
    exemples: [
      'Je voudrais acheter dans 6 mois maximum',
      'Mon bail se termine fin mars, c\'est assez urgent',
      'Pas de date précise mais idéalement avant la rentrée scolaire'
    ]
  },
  { 
    id: 'confort', 
    title: 'Confort / Usage', 
    icon: '🏠',
    questions: [
      'Quelles sont vos habitudes actuelles ?',
      'Quelles contraintes souhaitez-vous éviter ?',
      'Quels critères sont prioritaires pour vous ?'
    ],
    exemples: [
      'J\'utilise beaucoup mon application mobile, je veux tout gérer en ligne',
      'Je déteste les démarches administratives compliquées',
      'La simplicité et la rapidité sont essentielles pour moi'
    ]
  },
  { 
    id: 'risque', 
    title: 'Risque / Sécurité', 
    icon: '🛡️',
    questions: [
      'Quelles sont vos préoccupations principales ?',
      'Quel niveau de risque acceptez-vous ?',
      'Avez-vous déjà rencontré un problème similaire ?'
    ],
    exemples: [
      'J\'ai peur de perdre mon apport si le projet échoue',
      'Je préfère la sécurité, je n\'aime pas prendre de risques',
      'J\'ai eu un découvert non autorisé l\'an dernier, ça m\'a coûté cher'
    ]
  }
]
