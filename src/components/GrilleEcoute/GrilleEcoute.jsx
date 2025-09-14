
import React, { useEffect, useMemo, useState } from 'react'
import { ecouteItems } from '../../data/ecouteData'

export default function GrilleEcoute({ data={}, updateData, onBack }){
  const [state, setState] = useState(data || {})
  useEffect(()=>{ setState(data||{}) }, [data])

  const total = useMemo(()=>Object.values(state).reduce((a,b)=>a+(+b||0),0), [state])
  const max = ecouteItems.length * 2
  const pct = Math.round((total/max)*100)
  const label = pct>=70 ? 'Excellent' : pct>=50 ? 'Correct' : 'À renforcer'

  const save = ()=> updateData(state)

  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <button className="btn btn-outline" onClick={onBack}>← Retour</button>
        <h2 className="text-xl font-semibold">Grille d'auto-évaluation de l'écoute</h2>
      </div>
      <p className="hint mb-3">0 = jamais / 1 = parfois / 2 = toujours</p>

      <div className="space-y-2">
        {ecouteItems.map(it=>(
          <div className="row" key={it}>
            <label className="grow">{it}</label>
            <select className="input w-24" value={state[it] ?? 0}
              onChange={e=>setState(prev=>({...prev, [it]: Number(e.target.value)}))}>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
        ))}
      </div>

      <div className="synthese">
        <h3 className="font-semibold mb-1">Synthèse</h3>
        <p>Total : <b>{total}/{max}</b> ({pct}%) – {label}</p>
      </div>

      <div className="mt-3 flex gap-2">
        <button className="btn btn-primary" onClick={save}>Sauvegarder</button>
        <button className="btn btn-outline" onClick={onBack}>Retour</button>
      </div>
    </section>
  )
}
