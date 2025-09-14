
import React, { useEffect, useRef } from 'react'

export default function ConfirmationToast({ message }){
  const ref = useRef(null)
  useEffect(()=>{
    const el = ref.current
    if(!el) return
    if(message){
      el.textContent = message
      el.classList.add('show')
      const t = setTimeout(()=>el.classList.remove('show'), 2000)
      return () => clearTimeout(t)
    }
  }, [message])
  return <div ref={ref} className="toast" />
}
