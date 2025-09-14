import React from 'react'

export default function HomePage({ user, onStart }) {
  const handle = (e) => {
    e.preventDefault()
    const data = {
      firstName: e.currentTarget.firstName.value.trim(),
      lastName: e.currentTarget.lastName.value.trim()
    }
    if (!data.firstName || !data.lastName) return
    onStart(data)
  }

  return (
    <section className="card max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">Bienvenue 👋</h2>
      <p className="text-gray-500 mb-4">Renseignez vos informations pour démarrer.</p>
      <form onSubmit={handle} className="space-y-4">
        <div>
          <label className="label">Prénom *</label>
          <input
            type="text"
            className="input"
            name="firstName"
            placeholder="Ex : Thomas"
            defaultValue={user.firstName}
            required
          />
        </div>
        <div>
          <label className="label">Nom *</label>
          <input
            type="text"
            className="input"
            name="lastName"
            placeholder="Ex : Martin"
            defaultValue={user.lastName}
            required
          />
        </div>
        <button className="btn btn-primary w-full">Commencer</button>
      </form>
    </section>
  )
}