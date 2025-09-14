import React, { useEffect, useMemo, useState } from 'react'
import { ecouteItems } from '../../data/ecouteData'
import { Ear, MessageCircle, FileText } from 'lucide-react'

const icons = {
  "Se taire": <Ear className="w-5 h-5 text-teal-600" />,
  "Reformuler": <MessageCircle className="w-5 h-5 text-teal-600" />,
  "Prendre des notes": <FileText className="w-5 h-5 text-teal-600" />
}

export default function GrilleEcoute({ data={}, updateData, onBack }) {
  const [state, setState] = useState(data || {})

  useEffect(() => { setState(data || {}) }, [data])

  const total = useMemo(() => Object.values(state).reduce((a, b) => a + (+b?.score || 0), 0), [state])
  const max = ecouteItems.length * 2
  const pct = Math.round((total / max) * 100)

  let label = 'À renforcer'
  let badgeClass = "bg-orange-100 text-orange-700 border border-orange-300"
  if (pct >= 70) { label = "Excellent"; badgeClass = "bg-green-100 text-green-700 border border-green-300" }
  else if (pct >= 50) { label = "Correct"; badgeClass = "bg-yellow-100 text-yellow-700 border border-yellow-300" }

  const save = () => updateData(state)

  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <button className="btn btn-outline" onClick={onBack}>← Accueil</button>
        <h2 className="text-xl font-semibold text-blue-700 flex items-center gap-2">
          <Ear className="w-5 h-5 text-blue-600" /> Grille Observation Écoute
        </h2>
      </div>
      <p className="hint mb-3">0 = Non appliqué · 1 = Partiellement appliqué · 2 = Appliqué</p>

      <div className="space-y-4">
        {ecouteItems.map((it, idx) => {
          const val = state[it]?.score ?? 0
          const comment = state[it]?.comment || ''
          return (
            <div key={idx} className="card">
              <div className="flex items-center gap-2 mb-2">
                {icons[it] || <Ear className="w-5 h-5 text-teal-600" />}
                <h3 className="font-medium text-gray-800">{it}</h3>
              </div>
              <div className="mt-2 flex gap-4">
                {[2, 1, 0].map(v => (
                  <label key={v} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`q${idx}`}
                      checked={val === v}
                      onChange={() =>
                        setState(prev => ({ ...prev, [it]: { score: v, comment } }))
                      }
                    />
                    {v === 2 ? "Appliqué" : v === 1 ? "Partiel" : "Non"}
                  </label>
                ))}
              </div>
              <textarea
                className="input mt-2"
                placeholder="Commentaires..."
                value={comment}
                onChange={e =>
                  setState(prev => ({ ...prev, [it]: { score: val, comment: e.target.value } }))
                }
              />
            </div>
          )
        })}
      </div>

      <div className="synthese flex items-center gap-3 mt-3">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${badgeClass}`}>{label}</span>
        <p>Total : <b>{total}/{max}</b> ({pct}%)</p>
      </div>

      <div className="mt-3 flex gap-2">
        <button className="btn btn-primary" onClick={save}>Sauvegarder</button>
        <button className="btn btn-outline" onClick={onBack}>Retour</button>
      </div>
    </section>
  )
}