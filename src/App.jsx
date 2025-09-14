
import React, { useEffect, useState } from 'react'
import Header from './components/Layout/Header'
import Container from './components/Layout/Container'
import HomePage from './components/Home/HomePage'
import GrilleBesoin from './components/GrilleBesoin/GrilleBesoin'
import GrilleEcoute from './components/GrilleEcoute/GrilleEcoute'
import TestPosture from './components/TestPosture/TestPosture'
import PDFExport from './components/Export/PDFExport'
import ConfirmationToast from './components/Common/ConfirmationToast'
import { useFormation } from './hooks/useFormation'

const PAGES = { HOME:'home', HUB:'hub', BESOIN:'besoin', ECOUTE:'ecoute', POSTURE:'posture' }

export default function App(){
  const [page, setPage] = useState(PAGES.HOME)
  const [toast, setToast] = useState('')
  const {
    user, updateUser,
    besoins, updateBesoins,
    ecoute, updateEcoute,
    posture, updatePosture,
    resetAll
  } = useFormation()

  useEffect(()=>{
    const saved = localStorage.getItem('fc_current')
    if(user) setPage(saved || (user.firstName ? PAGES.HUB : PAGES.HOME))
  }, [user])

  const go = (p) => { setPage(p); localStorage.setItem('fc_current', p) }
  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(''), 2000) }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onReset={()=>{ resetAll(); go(PAGES.HOME) }} />
      <Container>
        {page===PAGES.HOME && <HomePage user={user} onStart={(u)=>{updateUser(u); go(PAGES.HUB)}} />}
        {page===PAGES.HUB && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button className="tile" onClick={()=>go(PAGES.BESOIN)}>📊 Grille BESOIN</button>
              <button className="tile" onClick={()=>go(PAGES.ECOUTE)}>👂 Grille ÉCOUTE</button>
              <button className="tile" onClick={()=>go(PAGES.POSTURE)}>🎯 Test POSTURE (QCM)</button>
            </div>
            <PDFExport user={user} besoins={besoins} ecoute={ecoute} posture={posture} />
          </div>
        )}
        {page===PAGES.BESOIN && (
          <GrilleBesoin
            data={besoins}
            updateData={(d)=>{updateBesoins(d); showToast('Grille BESOIN sauvegardée ✅')}}
            onBack={()=>go(PAGES.HUB)}
          />
        )}
        {page===PAGES.ECOUTE && (
          <GrilleEcoute
            data={ecoute}
            updateData={(d)=>{updateEcoute(d); showToast('Grille ÉCOUTE sauvegardée ✅')}}
            onBack={()=>go(PAGES.HUB)}
          />
        )}
        {page===PAGES.POSTURE && (
          <TestPosture
            data={posture}
            updateData={(d)=>{updatePosture(d); showToast('Test POSTURE enregistrée ✅')}}
            onBack={()=>go(PAGES.HUB)}
          />
        )}
      </Container>
      <ConfirmationToast message={toast} />
    </div>
  )
}
