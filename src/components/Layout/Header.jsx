import React from 'react'
import { GraduationCap } from 'lucide-react'

export default function Header({ user, onReset }) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo + Titre */}
        <div className="flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-teal-600" />
          <h1 className="text-lg font-semibold text-gray-800">
            FormationConseiller
          </h1>
        </div>

        {/* Utilisateur + Déconnexion */}
        {user && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {user.lastName} {user.firstName}
            </span>
            <button
              onClick={onReset}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md text-gray-700"
            >
              Déconnexion
            </button>
          </div>
        )}
      </div>
    </header>
  )
}