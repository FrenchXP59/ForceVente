
import React, { useEffect, useMemo, useState } from 'react'
import { besoinSections } from '../../data/besoinData'

export default function GrilleBesoin({ data={}, updateData, onBack }){
  const [state, setState] = useState(data || {})

  useEffect(()=>{ setState(data||{}) }, [data])

  const total = useMemo(()=>Object.values(state).reduce((a,b)=>a+(b?.score||0),0), [state])
  const max = besoinSections.length * 5
  const pct = Math.round((total/max)*100)

  const save = ()=> updateData(state)

  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <button className="btn btn-outline" onClick={onBack}>← Retour</button>
        <h2 className="text-xl font-semibold">Grille d'analyse des besoins</h2>
      </div>
      <p className="hint mb-3">Évaluez chaque section de 0 à 5 et ajoutez vos notes.</p>

      <div className="space-y-3">
        {besoinSections.map(s=>{
          const val = state[s.id] || { notes:'', score:0 }
          return (
            <div key={s.id} className="card">
              <div className="flex items-center justify-between">
                <h3 className="text-emerald-400 font-semibold">{s.title}</h3>
                <span className="text-sm text-slate-400">/5</span>
              </div>
              <ul className="list-disc ml-6 my-2 text-slate-300">
                {s.questions.map((q,i)=>(<li key={i}>{q}</li>))}
              </ul>

              <label className="label">Notes :</label>
              <textarea className="input min-h-[90px]" value={val.notes}
                onChange={e=>setState(prev=>({...prev, [s.id]:{...val, notes:e.target.value}}))}
                placeholder="Vos notes pour cette section..." />

              <div className="row mt-2">
                <label className="label">Évaluation :</label>
                <input type="range" min="0" max="5" step="1"
                  className="grow accent-emerald-400"
                  value={val.score}
                  onChange={e=>setState(prev=>({...prev, [s.id]:{...val, score:Number(e.target.value)}}))}/>
                <span className="scoreShow">{val.score}</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="synthese">
        <h3 className="font-semibold mb-1">Synthèse</h3>
        <p>Score total : <b>{total}/{max}</b> ({pct}%).</p>
      </div>

      <div className="mt-3 flex gap-2">
        <button className="btn btn-primary" onClick={save}>Sauvegarder</button>
        <button className="btn btn-outline" onClick={onBack}>Retour</button>
      </div>
    </section>
  )
}
