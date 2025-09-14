
import React from 'react'
import { jsPDF } from 'jspdf'
import { besoinSections } from '../../data/besoinData'

export default function PDFExport({ user, besoins, ecoute, posture }){
  const exportPdf = () => {
    const doc = new jsPDF()
    let y = 12
    doc.setFontSize(16); doc.text('Rapport – FormationConseiller', 12, y); y+=8
    doc.setFontSize(11); doc.text(`Nom: ${user.firstName||''} ${user.lastName||''}`,12,y); y+=8

    // Besoin
    doc.setFontSize(13); doc.text('1) Grille BESOIN',12,y); y+=6; doc.setFontSize(10)
    besoinSections.forEach(s=>{
      const d = besoins?.[s.id] || { notes:'', score:0 }
      doc.text(`• ${s.title} – score ${d.score||0}/5`, 14, y); y+=5
      const lines = doc.splitTextToSize(`Notes: ${d.notes||'-'}`, 180)
      doc.text(lines, 18, y); y += (lines.length*5)+2
    })

    // Écoute
    doc.setFontSize(13); doc.text('2) Grille ÉCOUTE',12,y); y+=6; doc.setFontSize(10)
    if(ecoute){
      Object.entries(ecoute).forEach(([k,v])=>{ doc.text(`• ${k}: ${v}/2`,14,y); y+=5 })
    }

    // Posture
    y+=2; doc.setFontSize(13); doc.text('3) Test POSTURE',12,y); y+=6; doc.setFontSize(10)
    if(posture?.max){ doc.text(`Score: ${posture.score}/${posture.max} (${posture.pct}%) – ${posture.profile}`,14,y); y+=6 }
    else { doc.text('Non rempli',14,y); y+=6 }

    doc.save('rapport-formation.pdf')
  }

  return (
    <button onClick={exportPdf} className="btn btn-primary w-full mt-2">📄 Exporter le rapport PDF</button>
  )
}
