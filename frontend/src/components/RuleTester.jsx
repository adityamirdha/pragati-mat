import React, { useState } from "react";
import { ShieldCheck, CheckCircle2, XCircle } from "lucide-react";

export default function RuleTester() {
  const [descA, setDescA] = useState('VALVE-GLOBE-BW-3IN-CL600-SS316');
  const [descB, setDescB] = useState('VALVE GLOBE, 3", 600#, AISI 316, BW ENDS');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runTest = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/match-pair", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description_a: descA, description_b: descB })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-200">Engineering Hard-Guard Simulator</h2>
        <p className="text-xs text-slate-400">Directly test deterministic guards against safety-critical parameter conflicts</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <div>
          <label className="text-xs text-slate-400 block mb-1">CPSE Description A (Legacy Short-Text)</label>
          <input
            type="text"
            value={descA}
            onChange={(e) => setDescA(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm font-mono text-slate-200 focus:border-amber-500 outline-none"
          />
        </div>

        <div>
          <label className="text-xs text-slate-400 block mb-1">CPSE Description B (Verbose Procurement Text)</label>
          <input
            type="text"
            value={descB}
            onChange={(e) => setDescB(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm font-mono text-slate-200 focus:border-amber-500 outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <button
            onClick={() => {
              setDescA('VALVE-GLOBE-BW-3IN-CL600-SS316');
              setDescB('VALVE GLOBE, 3", 600#, AISI 316, BW ENDS');
            }}
            className="text-xs px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
          >
            Preset: Exact Match
          </button>
          <button
            onClick={() => {
              setDescA('VALVE-GLOBE-BW-3IN-CL600-SS316');
              setDescB('VALVE GLOBE, 4", 600#, AISI 316, BW ENDS');
            }}
            className="text-xs px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-rose-300"
          >
            Preset: Dimension Trap (3" vs 4")
          </button>
          <button
            onClick={() => {
              setDescA('VALVE-GLOBE-BW-3IN-CL600-SS316');
              setDescB('VALVE GLOBE, 3", 150#, AISI 316, BW ENDS');
            }}
            className="text-xs px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-rose-300"
          >
            Preset: Rating Trap (CL600 vs CL150)
          </button>
        </div>

        <button
          onClick={runTest}
          className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded text-sm transition mt-2"
        >
          {loading ? "Evaluating..." : "Run Hard-Guard Verification"}
        </button>

        {result && (
          <div className={`mt-6 p-4 rounded-lg border ${
            result.status === "REJECTED"
              ? "bg-rose-950/30 border-rose-500/50 text-rose-300"
              : "bg-emerald-950/30 border-emerald-500/50 text-emerald-300"
          }`}>
            <div className="flex items-center gap-2 font-bold text-sm">
              {result.status === "REJECTED" ? <XCircle size={18} /> : <CheckCircle2 size={18} />}
              <span>{result.status} ({result.confidence}%)</span>
            </div>
            <p className="text-xs mt-1 text-slate-300">{result.reason}</p>

            <div className="grid grid-cols-2 gap-3 mt-4 text-xs font-mono bg-slate-950/80 p-3 rounded border border-slate-800">
              <div>
                <span className="text-slate-500 block mb-1">Parsed Specs A:</span>
                <pre className="text-slate-300 whitespace-pre-wrap">{JSON.stringify(result.features_a, null, 2)}</pre>
              </div>
              <div>
                <span className="text-slate-500 block mb-1">Parsed Specs B:</span>
                <pre className="text-slate-300 whitespace-pre-wrap">{JSON.stringify(result.features_b, null, 2)}</pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}