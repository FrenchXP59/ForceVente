import React, { useEffect, useMemo, useState } from 'react'
import { besoinSections } from '../../data/besoinData'
import { Target, DollarSign, Clock, Shield, Monitor } from 'lucide-react'

const icons = {
  objectifs: <Target className="w-5 h-5 text-teal-600" />,
  budget: <DollarSign className="w-5 h-5 text-teal-600" />,
  echeance: <Clock className="w-5 h-5 text-teal-600" />,
  confort: <Monitor className="w-5 h-5 text-teal-600" />,
  risque: <Shield className="w-5 h-5 text-teal-600" />
}

export default function GrilleBesoin({ data = {}, updateData, onBack }) {
  const [state, setState] = useState(data || {})
  const [showExemples, setShowExemples] = useState({})

  useEffect(() => { setState(data || {}) }, [data])

  const total = useMemo(() => Object.values(state).reduce((a, b) => a + (b?.score || 0), 0), [state])
  const max = besoinSections.length * 5
  const pct = Math.round((total / max) * 100)

  const save = () => updateData(state)

  const toggleExemples = (id) => {
    setShowExemples(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <button className="btn btn-outline" onClick={onBack}>← Accueil</button>
        <h2 className="text-xl font-semibold text-blue-700">Grille d'analyse des besoins</h2>
      </div>
      <p className="hint mb-4">Évaluez chaque section de 0 à 5 et ajoutez vos notes.</p>

      <div className="space-y-5">
        {besoinSections.map(s => {
          const val = state[s.id] || { notes: '', score: 0 }
          const showEx = showExemples[s.id]
          
          return (
            <div key={s.id} className="card space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {icons[s.id] || <Monitor className="w-5 h-5 text-teal-600" />}
                  <h3 className="font-semibold text-gray-800">
                    {s.icon && <span className="mr-2">{s.icon}</span>}
                    {s.title}
                  </h3>
                </div>
                <span className="text-sm text-gray-600">{val.score}/5</span>
              </div>

              {/* Questions */}
              <ul className="list-disc ml-6 space-y-1 text-sm text-gray-700 italic">
                {s.questions.map((q, i) => (<li key={i}>{q}</li>))}
              </ul>

              {/* Bouton Exemples */}
              {s.exemples && s.exemples.length > 0 && (
                <div>
                  <button 
                    className="text-xs text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"
                    onClick={() => toggleExemples(s.id)}
                  >
                    💡 {showEx ? 'Masquer' : 'Voir'} des exemples de réponses clients
                  </button>
                  
                  {showEx && (
                    <div className="mt-2 p-3 bg-teal-50 border border-teal-100 rounded text-xs space-y-1">
                      {s.exemples.map((ex, i) => (
                        <div key={i} className="text-gray-700 italic">
                          • "{ex}"
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Notes */}
              <div>
                <label className="label">Notes :</label>
                <textarea
                  className="input min-h-[90px]"
                  value={val.notes}
                  onChange={e => setState(prev => ({ ...prev, [s.id]: { ...val, notes: e.target.value } }))}
                  placeholder="Vos notes pour cette section..."
                />
              </div>

              {/* Slider */}
              <div className="flex items-center gap-3">
                <label className="label">Évaluation :</label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="1"
                  className="grow accent-teal-600"
                  value={val.score}
                  onChange={e => setState(prev => ({ ...prev, [s.id]: { ...val, score: Number(e.target.value) } }))}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Synthèse */}
      <div className="synthese mt-4">
        <h3 className="font-semibold mb-1">Synthèse</h3>
        <p>Score total : <b>{total}/{max}</b> ({pct}%).</p>
      </div>

      {/* Boutons */}
      <div className="mt-4 flex gap-2">
        <button className="btn btn-primary" onClick={save}>Sauvegarder</button>
        <button className="btn btn-outline" onClick={onBack}>Retour</button>
      </div>
    </section>
  )
}
