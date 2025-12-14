import React, { useState } from 'react';
import { Activity, CheckCircle } from 'lucide-react';

export default function SBARView({ showNotification }) {
  const [situation, setSituation] = useState('');
  const [background, setBackground] = useState('');
  const [assessment, setAssessment] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [generated, setGenerated] = useState(false);

  const generateReport = () => {
    if (!situation || !background || !assessment || !recommendation) {
      showNotification('Please fill in all fields');
      return;
    }
    setGenerated(true);
    showNotification('SBAR Generated & Copied to Clipboard');
  };

  const clearForm = () => {
    setSituation('');
    setBackground('');
    setAssessment('');
    setRecommendation('');
    setGenerated(false);
  };

  return (
    <div className="h-full flex flex-col pb-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Smart SBAR</h2>
        {generated && (
          <button onClick={clearForm} className="text-red-500 text-sm font-medium">
            Clear
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto space-y-4">
        {!generated ? (
          <>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Situation</label>
              <textarea
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                placeholder="Who is it? Where are they? What is the problem?"
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none text-sm min-h-[80px]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Background</label>
              <textarea
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                placeholder="Clinical history, admission diagnosis..."
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none text-sm min-h-[80px]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Assessment</label>
              <textarea
                value={assessment}
                onChange={(e) => setAssessment(e.target.value)}
                placeholder="What do you think is the issue? Vitals?"
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none text-sm min-h-[80px]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Recommendation</label>
              <textarea
                value={recommendation}
                onChange={(e) => setRecommendation(e.target.value)}
                placeholder="What do you want to happen? Orders?"
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none text-sm min-h-[80px]"
              />
            </div>
          </>
        ) : (
          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800">
            <h3 className="text-emerald-800 dark:text-emerald-400 font-bold mb-4 flex items-center gap-2">
              <CheckCircle size={20} /> Ready for Handoff
            </h3>
            <div className="prose prose-sm text-slate-700 dark:text-slate-300 space-y-3 font-mono text-sm">
              <p>
                <span className="font-bold">S:</span> {situation}
              </p>
              <p>
                <span className="font-bold">B:</span> {background}
              </p>
              <p>
                <span className="font-bold">A:</span> {assessment}
              </p>
              <p>
                <span className="font-bold">R:</span> {recommendation}
              </p>
            </div>
            <div className="mt-6 flex gap-3">
              <button className="flex-1 bg-emerald-600 text-white py-2 rounded-lg font-medium hover:bg-emerald-700 transition">
                Copy Text
              </button>
              <button className="flex-1 bg-white border border-emerald-200 text-emerald-700 py-2 rounded-lg font-medium hover:bg-emerald-50 transition">
                Save to EMR
              </button>
            </div>
          </div>
        )}
      </div>

      {!generated && (
        <div className="pt-4">
          <button
            onClick={generateReport}
            className="w-full bg-slate-800 dark:bg-emerald-600 text-white py-3 rounded-xl font-bold shadow-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
          >
            <Activity size={18} /> Generate SBAR
          </button>
        </div>
      )}
    </div>
  );
}
