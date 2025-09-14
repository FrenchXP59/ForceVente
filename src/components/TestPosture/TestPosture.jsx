
import React, { useEffect, useMemo, useState } from 'react'
import { postureQuestions } from '../../data/postureData'

export default function TestPosture({ data={}, updateData, onBack }){
  const [answers, setAnswers] = useState(data?.answers || Array(postureQuestions.length).fill(null))

  useEffect(()=>{ setAnswers(data?.answers || Array(postureQuestions.length).fill(null)) }, [data])

  const score = useMemo(()=> answers.reduce((a,ans,i)=> a + (ans===postureQuestions[i].correctIndex ? 1 : 0), 0), [answers])
  const max = postureQuestions.length
  const pct = Math.round((score/max)*100)
  const profile = pct>=70 ? 'Solide' : pct>=50 ? 'Prometteur' : 'À travailler'

  const save = ()=> updateData({ answers, score, max, pct, profile })

  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <button className="btn btn-outline" onClick={onBack}>← Retour</button>
        <h2 className="text-xl font-semibold">Test de posture (QCM)</h2>
      </div>

      <div className="space-y-3">
        {postureQuestions.map((q, qi)=>(
          <div className="card" key={qi}>
            <p className="font-medium">Q{qi+1}. {q.question}</p>
            <div className="mt-2 flex flex-col gap-2">
              {q.choices.map((c,ci)=>(
                <label key={ci} className="flex items-center gap-2">
                  <input type="radio" name={`q${qi}`} checked={answers[qi]===ci}
                    onChange={()=> setAnswers(prev=>{ const n=[...prev]; n[qi]=ci; return n })}/>
                  <span>{c}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="synthese">
        <h3 className="font-semibold mb-1">Résultat</h3>
        <p>Score : <b>{score}/{max}</b> ({pct}%) – {profile}</p>
      </div>

      <div className="mt-3 flex gap-2">
        <button className="btn btn-primary" onClick={save}>Valider</button>
        <button className="btn btn-outline" onClick={onBack}>Retour</button>
      </div>
    </section>
  )
}
