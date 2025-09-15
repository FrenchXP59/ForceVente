import React, { useEffect, useState } from 'react'
import Header from './components/Layout/Header'
import Container from './components/Layout/Container'
import HomePage from './components/Home/HomePage'
import GrilleBesoin from './components/GrilleBesoin/GrilleBesoin'
import GrilleEcoute from './components/GrilleEcoute/GrilleEcoute'
import TestPCM from "./components/TestPCM/TestPCM";
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
        {page===PAGES.HOME && (
          <HomePage user={user} onStart={(u)=>{updateUser(u); go(PAGES.HUB)}} />
        )}

        {page===PAGES.HUB && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {/* Carte BESOIN */}
              <button className="tile-besoin" onClick={()=>go(PAGES.BESOIN)}>
                <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 3v18h18" />
                    <path d="M18 17V9" />
                    <path d="M13 17V5" />
                    <path d="M8 17v-3" />
                  </svg>
                </div>
                <span>Grille BESOIN</span>
              </button>

              {/* Carte ÉCOUTE */}
              <button className="tile-ecoute" onClick={()=>go(PAGES.ECOUTE)}>
                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 9v6" />
                    <path d="M15 9v6" />
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z" />
                  </svg>
                </div>
                <span>Grille ÉCOUTE</span>
              </button>

              {/* Carte PCM */}
              <button className="tile-posture" onClick={()=>go(PAGES.POSTURE)}>
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                </div>
                <span>Test PCM (QCM)</span>
              </button>

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
          <TestPCM
        
user={user}
data={posture}
updateData={(d)=>{updatePosture(d); showToast('Test PCM enregistré ✅')}}
onBack={()=>go(PAGES.HUB)}
 />
  )}
      </Container>
      <ConfirmationToast message={toast} />
    </div>
  )
}