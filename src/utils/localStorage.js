
export const STORAGE_KEYS = {
  USER: 'fc_user',
  BESOINS: 'fc_besoin',
  ECOUTE: 'fc_ecoute',
  POSTURE: 'fc_posture'
}

export const getStorageData = (key) => {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null } catch(e){ return null }
}
export const setStorageData = (key, data) => {
  try { localStorage.setItem(key, JSON.stringify(data)) } catch(e) {}
}
