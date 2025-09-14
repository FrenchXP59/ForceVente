import React from 'react'
import { GraduationCap } from 'lucide-react'

export default function Header({ user, onReset }) {
  const hasUser = user?.firstName

  return (
    <header className="sticky top-0 bg-gray-100 border-b border-gray-200 shadow-sm z-10">
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-blue-600" />
          <h1 className="text-lg font-bold text-blue-700">FormationConseiller</h1>
        </div>
        <div className="flex items-center gap-3">
          {hasUser && (
            <span className="text-sm text-gray-600">
              {user.firstName} {user.lastName}
            </span>
          )}
          <button
            onClick={onReset}
            className="btn btn-outline text-sm"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </header>
  )
}
