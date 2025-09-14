
import React from 'react'

export default function Header({ user, onReset }){
  const hasUser = user?.firstName
  return (
    <header className="sticky top-0 bg-slate-900/80 backdrop-blur border-b border-slate-800">
      <div className="container flex items-center justify-between py-3">
        <h1 className="text-lg font-bold text-emerald-400">FormationConseiller</h1>
        <div className="flex items-center gap-2">
          {hasUser && <span className="text-sm text-slate-300">{user.firstName} {user.lastName}</span>}
          <button onClick={onReset} className="btn btn-outline btn-sm">Réinitialiser</button>
        </div>
      </div>
    </header>
  )
}
