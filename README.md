
# FormationConseiller (React + Vite + Tailwind)

App React modulaire : **BESOIN** (questions types, notes, slider /5), **ÉCOUTE** (0/1/2), **POSTURE** (QCM), **export PDF**, **localStorage**.

## Démarrage local
```bash
npm install
npm run dev
```

## Déploiement Netlify
- **Build command** : `npm run build`
- **Publish directory** : `dist`
- `netlify.toml` inclut un redirect SPA.

## Modifier les contenus
- `src/data/besoinData.js` – sections + questions types
- `src/data/ecouteData.js` – items d'évaluation
- `src/data/postureData.js` – QCM (choices + correctIndex)
