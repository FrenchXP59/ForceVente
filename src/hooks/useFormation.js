
import { useEffect, useState } from 'react'
import { STORAGE_KEYS, getStorageData, setStorageData } from '../utils/localStorage'

export function useFormation(){
  const [user, setUser] = useState({ firstName: '', lastName: '' })
  const [besoins, setBesoins] = useState({})
  const [ecoute, setEcoute] = useState({})
  const [posture, setPosture] = useState({ answers: [], score: 0, max: 0, pct: 0, profile: null })

  useEffect(()=>{
    const u = getStorageData(STORAGE_KEYS.USER)
    const b = getStorageData(STORAGE_KEYS.BESOINS)
    const e = getStorageData(STORAGE_KEYS.ECOUTE)
    const p = getStorageData(STORAGE_KEYS.POSTURE)
    if(u) setUser(u)
    if(b) setBesoins(b)
    if(e) setEcoute(e)
    if(p) setPosture(p)
  }, [])

  const updateUser = (u)=>{ setUser(u); setStorageData(STORAGE_KEYS.USER, u) }
  const updateBesoins = (b)=>{ setBesoins(b); setStorageData(STORAGE_KEYS.BESOINS, b) }
  const updateEcoute = (e)=>{ setEcoute(e); setStorageData(STORAGE_KEYS.ECOUTE, e) }
  const updatePosture = (p)=>{ setPosture(p); setStorageData(STORAGE_KEYS.POSTURE, p) }

  const resetAll = ()=>{
    setUser({ firstName:'', lastName:'' })
    setBesoins({}); setEcoute({}); setPosture({ answers: [], score: 0, max: 0, pct: 0, profile: null })
    Object.values(STORAGE_KEYS).forEach(k=>localStorage.removeItem(k))
  }

  return { user, updateUser, besoins, updateBesoins, ecoute, updateEcoute, posture, updatePosture, resetAll }
}
