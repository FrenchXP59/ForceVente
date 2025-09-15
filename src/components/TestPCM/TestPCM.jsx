import React, { useState, useRef } from "react";
import pcmQuestions from "../../data/pcmData.json"; // JSON avec les 40 questions
import { pcmProfiles } from "../../data/pcmProfiles"; // fichier des profils
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend
} from "recharts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "../../fonts/NotoSans-Regular-normal.js";

// Emojis PCM (exportés depuis Canva, mets PNG ou WebP selon ce que tu as choisi)
import promoteurImg from "../../assets/emoji/promoteur.png";
import empathiqueImg from "../../assets/emoji/empathique.png";
import energiseurImg from "../../assets/emoji/energiseur.png";
import perseverantImg from "../../assets/emoji/perseverant.png";
import analyseurImg from "../../assets/emoji/analyseur.png";
import imagineurImg from "../../assets/emoji/imagineur.png";

export default function TestPCM({ user = {}, data = {}, updateData, onBack }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(data.answers || []);
  const [finished, setFinished] = useState(false);
  const [result, setResult] = useState(null);

  const resultRef = useRef(null);

  // ---- Gestion des réponses ----
  const handleAnswer = (type) => {
    const newAnswers = [...answers];
    newAnswers[step] = type;
    setAnswers(newAnswers);
  };

  const finish = () => {
    const counts = {};
    Object.keys(pcmProfiles).forEach((p) => (counts[p] = 0));
    answers.forEach((a) => {
      if (a) counts[a]++;
    });

    const resultData = { answers, counts };
    setResult(resultData);
    updateData(resultData);
    setFinished(true);
  };

  // ---- Export PDF rapide (capture visuelle) ----
  const exportPDF = async () => {
    const input = resultRef.current;
    if (!input) return;
    const canvas = await html2canvas(input, { backgroundColor: "#ffffff", scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Resultat_PCM.pdf");
  };

  // ---- Export PDF détaillé (rapport structuré avec icônes Canva) ----
 

  const exportDetailedPDF = async (user, result, pcmProfiles, resultRef) => {
    const pdf = new jsPDF("p", "mm", "a4");
    const margin = 15;
    let y = margin;
 // Charger et activer Noto Sans
 pdf.setFont("NotoSans-Regular", "normal");
    // Mapping profil → icône
    const emojiMap = {
      Promoteur: promoteurImg,
      Empathique: empathiqueImg,
      Énergiseur: energiseurImg,
      Persévérant: perseverantImg,
      Analyseur: analyseurImg,
      Imagineur: imagineurImg,
    };

    // --- PAGE 1 : Couverture ---
    pdf.setFillColor(240, 248, 255);
    pdf.rect(0, 0, 210, 297, "F"); // fond bleu clair
    pdf.setFontSize(26);
    pdf.setTextColor(20, 90, 120);
    pdf.text("Rapport PCM", margin, y + 20);

    pdf.setFontSize(14);
    pdf.setTextColor(40, 40, 40);
    pdf.text(`Participant : ${user?.firstName || ""} ${user?.lastName || ""}`, margin, y + 40);
    pdf.text(`Date : ${new Date().toLocaleDateString()}`, margin, y + 50);

    pdf.addPage();

    // --- PAGE 2 : Profil dominant ---
    const best = Object.entries(result.counts).sort((a, b) => b[1] - a[1])[0];
    const [type, score] = best;
    const profile = pcmProfiles[type];
    const icon = emojiMap[profile.title];

    pdf.setFontSize(20);
    pdf.setTextColor(0, 100, 200);

    if (icon) {
      pdf.addImage(icon, "PNG", margin, y, 12, 12); // image couleur
      pdf.text(profile.title, margin + 18, y + 9);
    } else {
      pdf.text(profile.title, margin, y + 9);
    }

    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Score : ${score} réponses`, margin, y + 20);

    pdf.setFontSize(14);
    pdf.setTextColor(40, 40, 40);
    pdf.text(profile.simplified, margin, y + 35, { maxWidth: 180 });

    // Encart Conseils
    pdf.setFillColor(255, 245, 230);
    pdf.rect(margin, y + 60, 180, 35, "F");
    pdf.setTextColor(200, 80, 20);
    pdf.setFontSize(12);
    pdf.text("💡 Conseils :", margin + 5, y + 68);
    pdf.setTextColor(60, 60, 60);
    pdf.text(profile.detailed.advice, margin + 5, y + 78, { maxWidth: 170 });

    pdf.addPage();

    // --- PAGE 3 : Graphiques ---
    if (resultRef && resultRef.current) {
      const canvas = await html2canvas(resultRef.current, {
        backgroundColor: "#ffffff",
        scale: 2
      });
      const imgData = canvas.toDataURL("image/png");

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth() - margin * 2;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.setFontSize(16);
      pdf.setTextColor(20, 90, 120);
      pdf.text("Votre empreinte PCM en un coup d’œil", margin, y);

      pdf.addImage(imgData, "PNG", margin, y + 10, pdfWidth, pdfHeight);
    }

    pdf.addPage();

    // --- PAGE 4 : Synthèse complète ---
    pdf.setFontSize(18);
    pdf.setTextColor(20, 90, 120);
    pdf.text("Synthèse des profils", margin, y);

    let offset = y + 15;
    Object.entries(result.counts).forEach(([t, s]) => {
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`${pcmProfiles[t].title} : ${s}`, margin, offset);
      offset += 8;
    });

    offset += 20;
    pdf.setFontSize(12);
    pdf.setTextColor(180, 80, 20);
    pdf.text(
      "⚠️ Précaution : ce test PCM est un outil pédagogique.\n" +
      "Les résultats reflètent une tendance à un instant donné.\n" +
      "Ils peuvent évoluer selon votre environnement, votre état de stress ou vos expériences.\n" +
      "Ce n’est pas un diagnostic définitif.",
      margin,
      offset,
      { maxWidth: 180 }
    );

    pdf.save("Rapport_PCM.pdf");
  };

  // ---- Phase Résultats ----
  if (finished && result) {
    const best = Object.entries(result.counts).sort((a, b) => b[1] - a[1]);
    const chartData = best.map(([type, score]) => ({ type, score }));
    const radarData = Object.entries(result.counts).map(([type, score]) => ({
      subject: type,
      A: score,
      fullMark: pcmQuestions.length
    }));

    return (
      <section>
        <div className="flex items-center gap-2 mb-4">
          <button className="btn btn-outline" onClick={onBack}>← Accueil</button>
          <h2 className="text-xl font-semibold text-gray-900">Résultats PCM</h2>
        </div>

        <div ref={resultRef}>
          {/* Graphique barres */}
          <div className="card mb-6">
            <h3 className="font-bold text-gray-800 mb-3">Répartition par profil</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="score" fill="#14b8a6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Graphique radar */}
          <div className="card mb-6">
            <h3 className="font-bold text-gray-800 mb-3">Équilibre des profils</h3>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, pcmQuestions.length]} />
                <Radar name="Profil" dataKey="A" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.6} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Boutons export */}
        <div className="flex gap-3 mt-6">
          <button className="btn btn-primary" onClick={exportPDF}>Export PDF (capture)</button>
          <button className="btn btn-primary" onClick={() => exportDetailedPDF(user, result, pcmProfiles, resultRef)}>
            Export PDF détaillé
          </button>
          <button className="btn btn-outline" onClick={onBack}>Retour</button>
        </div>
      </section>
    );
  }

  // ---- Phase Questions ----
  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <button className="btn btn-outline" onClick={onBack}>← Accueil</button>
        <h2 className="text-xl font-semibold text-gray-900">
          Test PCM – Question {step + 1}/{pcmQuestions.length}
        </h2>
      </div>

      <div className="card">
        <p className="font-medium mb-3 text-gray-800">{pcmQuestions[step].question}</p>
        <div className="flex flex-col gap-2">
          {pcmQuestions[step].choices.map((c, i) => (
            <button
              key={i}
              className={`btn w-full text-left ${
                answers[step] === c.type
                  ? "bg-blue-100 border-blue-500 text-blue-700"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => handleAnswer(c.type)}
            >
              {c.text}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <button
          className="btn btn-outline"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
        >
          Précédent
        </button>
        {step < pcmQuestions.length - 1 ? (
          <button
            className="btn btn-primary"
            disabled={!answers[step]}
            onClick={() => setStep((s) => s + 1)}
          >
            Suivant
          </button>
        ) : (
          <button className="btn btn-primary" onClick={finish}>
            Terminer
          </button>
        )}
      </div>
    </section>
  );
}
