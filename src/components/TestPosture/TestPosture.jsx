import React, { useEffect, useState } from 'react'
import { postureQuestions } from '../../data/postureData'
import { Target, Award, AlertTriangle } from 'lucide-react'

export default function TestPosture({ data={}, updateData, onBack }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState(data?.answers || Array(postureQuestions.length).fill(null))
  const [finished, setFinished] = useState(false)
  const [result, setResult] = useState(null)

  useEffect(() => {
    if (data?.answers) setAnswers(data.answers)
  }, [data])

  const handleAnswer = (qi, ci) => {
    const newAnswers = [...answers]
    newAnswers[qi] = ci
    setAnswers(newAnswers)
  }

  const handleFinish = () => {
    const score = answers.reduce((acc, ans, i) => acc + (ans === postureQuestions[i].correctIndex ? 1 : 0), 0)
    const max = postureQuestions.length
    const pct = Math.round((score / max) * 100)
    let profile = "Profil à Renforcer"
    let icon = <AlertTriangle className="w-6 h-6 text-orange-600" />
    let badgeClass = "bg-orange-100 text-orange-700 border border-orange-300"

    if (pct >= 70) {
      profile = "Profil Expert"
      icon = <Award className="w-6 h-6 text-blue-600" />
      badgeClass = "bg-blue-100 text-blue-700 border border-blue-300"
    } else if (pct >= 50) {
      profile = "Profil Prometteur"
      icon = <Target className="w-6 h-6 text-green-600" />
      badgeClass = "bg-green-100 text-green-700 border border-green-300"
    }

    const res = { answers, score, max, pct, profile, icon, badgeClass }
    setResult(res)
    updateData(res)
    setFinished(true)
  }

  if (finished && result) {
    return (
      <section>
        <div className="flex items-center gap-2 mb-3">
          <button className="btn btn-outline" onClick={onBack}>← Accueil</button>
          <h2 className="text-xl font-semibold">Test Auto-diagnostic Posture</h2>
        </div>
        <div className="card space-y-3">
          <div className="flex items-center gap-2">
            {result.icon}
            <h3 className={`font-bold ${result.badgeClass.split(" ")[1]}`}>{result.profile}</h3>
          </div>
          <p>Score : <b>{result.score}/{result.max}</b> ({result.pct}%)</p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
            {result.profile === "Profil Expert" && "Vous maîtrisez vos techniques de posture. Continuez à perfectionner l’écoute émotionnelle."}
            {result.profile === "Profil Prometteur" && "Vous avez de bonnes bases. Continuez vos efforts pour renforcer la gestion des objections."}
            {result.profile === "Profil à Renforcer" && "Travaillez vos techniques de questionnement et développez l’écoute active."}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <button className="btn btn-outline" onClick={onBack}>← Accueil</button>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-600" /> Test Auto-diagnostic Posture
        </h2>
      </div>

      {/* Progression */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all"
          style={{ width: `${((step + 1) / postureQuestions.length) * 100}%` }}
        />
      </div>

      {/* Question courante */}
      <div className="card">
        <p className="font-medium mb-3">Question {step + 1} sur {postureQuestions.length}</p>
        <p className="mb-4">{postureQuestions[step].question}</p>
        <div className="flex flex-col gap-2">
          {postureQuestions[step].choices.map((c, ci) => (
            <button
              key={ci}
              className={`btn w-full text-left ${
                answers[step] === ci 
                  ? "bg-blue-100 border-blue-500 text-blue-700" 
                  : "bg-white border-gray-300 text-gray-700"
              }`}
              onClick={() => handleAnswer(step, ci)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <button
          className="btn btn-outline"
          onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={step === 0}
        >
          Précédent
        </button>
        {step < postureQuestions.length - 1 ? (
          <button className="btn btn-primary" onClick={() => setStep(s => s + 1)}>Suivant</button>
        ) : (
          <button className="btn btn-primary" onClick={handleFinish}>Terminer</button>
        )}
      </div>
    </section>
  )
}