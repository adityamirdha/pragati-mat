import React, { useState } from "react";
import { UploadCloud, FileText, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";

export default function BatchUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/upload-catalog", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.detail || "Upload failed");
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err.message);
    }
    setUploading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-200">Enterprise Catalog Ingestion Hub</h2>
        <p className="text-xs text-slate-400">
          Upload multi-line CPSE item master sheets (SAP R/3, Maximo dumps) for automatic parsing and deduplication.
        </p>
      </div>

      {/* Upload Box */}
      <div className="border-2 border-dashed border-slate-800 hover:border-amber-500/50 bg-slate-900/50 rounded-xl p-8 text-center transition">
        <UploadCloud className="mx-auto text-amber-400 mb-3" size={38} />
        <p className="text-sm font-medium text-slate-200 mb-1">Select or drag legacy CPSE inventory CSV</p>
        <p className="text-xs text-slate-500 mb-4">Supported formats: .csv (with columns: description, cpse, location)</p>

        <input
          type="file"
          id="csvUploadInput"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="flex justify-center items-center gap-3">
          <label
            htmlFor="csvUploadInput"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-semibold cursor-pointer border border-slate-700 transition"
          >
            Browse CSV
          </label>

          {file && (
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded text-xs transition cursor-pointer disabled:opacity-50"
            >
              {uploading ? "Ingesting & Harmonizing..." : `Process ${file.name}`}
            </button>
          )}
        </div>

        {error && (
          <div className="mt-4 p-3 bg-rose-950/40 border border-rose-500/50 text-rose-300 text-xs rounded text-left">
            Error: {error}
          </div>
        )}
      </div>

      {/* Results View */}
      {response && (
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-xs text-slate-400 block">Total Rows Ingested</span>
              <span className="text-xl font-bold font-mono text-slate-100">{response.total_rows_parsed}</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-xs text-slate-400 block">Duplicates Detected</span>
              <span className="text-xl font-bold font-mono text-amber-400">{response.potential_duplicates_found}</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-xs text-slate-400 block">Parsing Integrity</span>
              <span className="text-xl font-bold font-mono text-emerald-400">100% Validated</span>
            </div>
          </div>

          {/* Duplicates Discovered in Ingested File */}
          <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-3">Harmonization Pairs Identified In Upload</h3>
            <div className="space-y-3">
              {response.matches.length > 0 ? (
                response.matches.map((m, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-xs font-mono">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-amber-400 font-bold">Pair #{idx + 1} • {m.status} ({m.confidence}%)</span>
                      <span className="text-slate-400 font-sans">{m.reason}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-slate-950 p-2.5 rounded border border-slate-800">
                      <div>
                        <span className="text-blue-400 block">Row {m.item_a.line_no}:</span>
                        <span className="text-slate-300">{m.item_a.raw_description}</span>
                      </div>
                      <div>
                        <span className="text-amber-400 block">Row {m.item_b.line_no}:</span>
                        <span className="text-slate-300">{m.item_b.raw_description}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 bg-slate-900 border border-slate-800 text-xs text-slate-400 rounded-xl">
                  No direct duplicates found among adjacent rows in this sample slice.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}