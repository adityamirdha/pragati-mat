import React, { useState } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  AlertCircle,
  GitCompare,
  Lock,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Building2,
  FileCheck2,
  ChevronRight,
  Barcode,
  Check,
  X,
  Loader2,
} from "lucide-react";

export default function RelationshipAdjudicationCard({
  item,
  onApproveIdentity,
  onReject,
  onRollbackPNMID,
}) {
  const [justification, setJustification] = useState("");
  const [justificationError, setJustificationError] = useState(false);
  const [apiDecision, setApiDecision] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const isHardConflict = item.canonicalOutcome === "HARD_CONFLICT";
  const isInsufficient = item.canonicalOutcome === "INSUFFICIENT_EVIDENCE";
  const isEEC = item.canonicalOutcome === "ENGINEERING_EQUIVALENCE_CANDIDATE";
  const isExactIdentity = item.canonicalOutcome === "EXACT_IDENTITY";
  const isApproved = Boolean(item.pnmid) || apiDecision === "APPROVE";

  const nationalCode =
    item.pnmid ||
    item.nationalCode ||
    `IN-MOPNG-${item.candidateId || item.id || "0000"}`;

  const handleApprove = () => {
    if (!justification.trim()) {
      setJustificationError(true);
      return;
    }
    setJustificationError(false);
    if (onApproveIdentity) {
      onApproveIdentity(item.id, justification);
    }
  };

  const handleAdjudicateAction = async (action) => {
    setIsProcessing(true);
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
      const res = await fetch(`${baseUrl}/api/adjudicate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cluster_id: typeof item.id === "number" ? item.id : null,
          record_id: String(item.candidateId || item.id),
          action: action,
          nation_code: nationalCode,
          remarks: justification || `Action triggered as ${action}`,
        }),
      });

      const data = await res.json();
      if (data.success || res.ok) {
        setApiDecision(action);
        if (action === "REJECT" && onReject) {
          onReject(item.id);
        }
      }
    } catch (err) {
      console.error("Adjudication API error:", err);
      // Fallback state update
      setApiDecision(action);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      className={`rounded-xl border transition-all duration-150 overflow-hidden mb-5 bg-[#111827] ${
        isHardConflict
          ? "border-rose-900/60 shadow-sm"
          : isInsufficient
          ? "border-amber-900/60 shadow-sm"
          : isEEC
          ? "border-indigo-900/60 shadow-sm"
          : isApproved
          ? "border-emerald-900/60 shadow-sm"
          : "border-slate-800 shadow-sm"
      }`}
    >
      {/* 1. STATUS HEADER: FORMAL VERDICT STRIP */}
      <div
        className={`px-5 py-3 border-b flex flex-wrap items-center justify-between gap-3 text-xs font-sans ${
          isHardConflict
            ? "bg-rose-950/25 border-rose-900/40 text-rose-300"
            : isInsufficient
            ? "bg-amber-950/25 border-amber-900/40 text-amber-300"
            : isEEC
            ? "bg-indigo-950/25 border-indigo-900/40 text-indigo-300"
            : isApproved
            ? "bg-emerald-950/25 border-emerald-900/40 text-emerald-300"
            : "bg-slate-900/70 border-slate-800 text-slate-200"
        }`}
      >
        <div className="flex items-center gap-2.5">
          {isHardConflict && <ShieldAlert size={16} className="text-rose-400" />}
          {isInsufficient && <AlertCircle size={16} className="text-amber-400" />}
          {isEEC && <GitCompare size={16} className="text-indigo-400" />}
          {(isExactIdentity || isApproved) && (
            <ShieldCheck size={16} className="text-emerald-400" />
          )}

          <span className="font-semibold tracking-wide text-xs uppercase">
            {isHardConflict && "Hard Conflict — Do Not Merge"}
            {isInsufficient && "Insufficient Evidence — Safe Abstention"}
            {isEEC &&
              "Engineering Equivalence Candidate — Requires Engineer Review"}
            {isExactIdentity &&
              !isApproved &&
              "Exact Identity — Same Material, Different Local Codes"}
            {isApproved &&
              `Approved Identity Mapping (PNMID: ${item.pnmid || nationalCode})`}
          </span>

          {item.isDuplicateRecord && (
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] font-mono border border-slate-700">
              Same-Source Duplicate Flag
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-slate-400">
            Advisory Text Similarity:{" "}
            <strong className="text-slate-200">{item.semanticSimilarity}%</strong>
          </span>
          <span className="text-slate-700">|</span>
          <span className="text-slate-400">Case ID: {item.candidateId}</span>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* 2. SIDE-BY-SIDE RECORD CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
          {/* Source Record A */}
          <div className="bg-[#151f32] p-4 rounded-lg border border-slate-800 text-xs">
            <div className="flex justify-between items-center mb-2 pb-1.5 border-b border-slate-800/80">
              <span className="inline-flex items-center gap-1.5 text-blue-300 font-medium">
                <Building2 size={13} /> {item.recordA.sourceNamespace}
              </span>
              <span className="font-mono text-slate-400">
                Code: <strong className="text-slate-200">{item.recordA.localCode}</strong>
              </span>
            </div>
            <div className="font-medium text-slate-100 leading-snug">
              {item.recordA.rawDescription}
            </div>
            <div className="mt-2.5 pt-2 border-t border-slate-800/60 grid grid-cols-2 gap-1 text-[11px] font-mono text-slate-400">
              <div>
                OEM: <span className="text-slate-300">{item.recordA.manufacturer || "N/A"}</span>
              </div>
              <div>
                MPN: <span className="text-slate-300">{item.recordA.partNumber || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Source Record B */}
          <div className="bg-[#151f32] p-4 rounded-lg border border-slate-800 text-xs">
            <div className="flex justify-between items-center mb-2 pb-1.5 border-b border-slate-800/80">
              <span className="inline-flex items-center gap-1.5 text-amber-300 font-medium">
                <Building2 size={13} /> {item.recordB.sourceNamespace}
              </span>
              <span className="font-mono text-slate-400">
                Code: <strong className="text-slate-200">{item.recordB.localCode}</strong>
              </span>
            </div>
            <div className="font-medium text-slate-100 leading-snug">
              {item.recordB.rawDescription}
            </div>
            <div className="mt-2.5 pt-2 border-t border-slate-800/60 grid grid-cols-2 gap-1 text-[11px] font-mono text-slate-400">
              <div>
                OEM: <span className="text-slate-300">{item.recordB.manufacturer || "N/A"}</span>
              </div>
              <div>
                MPN: <span className="text-slate-300">{item.recordB.partNumber || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. CANONICAL PREVIEW STRIP */}
        <div className="bg-[#0f172a] border border-slate-800 px-4 py-2.5 rounded-lg flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">
              Deterministic Standard Specification:
            </span>
            <span className="font-mono font-semibold text-blue-300">
              {item.canonicalDescriptionPreview}
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">
            ASME B16.34 Standardized
          </span>
        </div>

        {/* 4. FORMAL ATTRIBUTE COMPARISON TABLE */}
        <div className="border border-slate-800 rounded-lg overflow-hidden">
          <div className="bg-[#0f172a] px-4 py-2 text-[11px] font-medium text-slate-400 uppercase tracking-wider border-b border-slate-800 flex justify-between">
            <span>Engineering Attribute Evidence</span>
            <span>Policy Status</span>
          </div>

          <div className="divide-y divide-slate-800/80 text-xs">
            {item.attributeComparison.map((attr, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-12 items-center px-4 py-2 ${
                  attr.status === "CONFLICT"
                    ? "bg-rose-950/20"
                    : attr.status === "MISSING"
                    ? "bg-amber-950/20"
                    : "bg-[#111827]"
                }`}
              >
                <div className="col-span-3 text-slate-300 font-medium">
                  {attr.attributeName}
                </div>

                <div className="col-span-3 font-mono text-xs">
                  <span className="text-[10px] text-slate-500 block">Record A</span>
                  <span
                    className={
                      attr.status === "CONFLICT"
                        ? "text-rose-300 font-semibold"
                        : "text-slate-200"
                    }
                  >
                    {attr.valueA || "MISSING"}
                  </span>
                </div>

                <div className="col-span-3 font-mono text-xs">
                  <span className="text-[10px] text-slate-500 block">Record B</span>
                  <span
                    className={
                      attr.status === "CONFLICT"
                        ? "text-rose-300 font-semibold"
                        : "text-slate-200"
                    }
                  >
                    {attr.valueB || "MISSING"}
                  </span>
                </div>

                <div className="col-span-3 flex justify-end items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                      attr.status === "MATCH"
                        ? "bg-emerald-950/60 text-emerald-300 border border-emerald-800/50"
                        : attr.status === "CONFLICT"
                        ? "bg-rose-950/80 text-rose-300 border border-rose-800/60"
                        : "bg-amber-950/60 text-amber-300 border border-amber-800/50"
                    }`}
                  >
                    {attr.status}
                  </span>

                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                      attr.criticality === "HARD_CRITICAL"
                        ? "bg-rose-950/40 text-rose-400 border border-rose-900/40"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {attr.criticality === "HARD_CRITICAL" ? "HARD" : "COND"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. SAFETY GATE FINDINGS */}
        <div
          className={`p-3.5 rounded-lg border text-xs leading-relaxed ${
            isHardConflict
              ? "bg-rose-950/20 border-rose-900/40 text-rose-200"
              : isInsufficient
              ? "bg-amber-950/20 border-amber-900/40 text-amber-200"
              : isEEC
              ? "bg-indigo-950/20 border-indigo-900/40 text-indigo-200"
              : "bg-emerald-950/15 border-emerald-900/40 text-emerald-200"
          }`}
        >
          <div className="font-semibold mb-0.5 flex items-center gap-2">
            <span>Safety Rule Assessment:</span>
          </div>
          <p className="text-slate-300">{item.safetyGateReason}</p>
          <div className="mt-1.5 text-[11px] font-mono text-slate-400">
            Rule Version: <span className="text-slate-300">{item.ruleVersion}</span> •
            Policy: ASME B16.34 Zero-FP Deterministic Guard
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* APPROVE & REJECT SECTION (LOCATED ABOVE NATION CODE BOX)       */}
        {/* ------------------------------------------------------------- */}
        <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-lg shadow-inner flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <FileCheck2 size={16} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                  Adjudication Decision
                </span>
                {apiDecision && (
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-full ${
                      apiDecision === "APPROVE"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                        : "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                    }`}
                  >
                    {apiDecision === "APPROVE" ? "Approved" : "Rejected"}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Authorize or decline master mapping before finalizing National Code.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              disabled={isProcessing}
              onClick={() => handleAdjudicateAction("REJECT")}
              className="flex-1 sm:flex-none px-3.5 py-1.5 rounded-md text-xs font-medium text-rose-300 bg-rose-950/30 border border-rose-800/60 hover:bg-rose-900/50 hover:border-rose-700 transition cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              {isProcessing ? <Loader2 size={13} className="animate-spin" /> : <X size={13} />}
              Reject
            </button>

            <button
              type="button"
              disabled={isProcessing}
              onClick={() => handleAdjudicateAction("APPROVE")}
              className="flex-1 sm:flex-none px-3.5 py-1.5 rounded-md text-xs font-medium text-emerald-300 bg-emerald-950/30 border border-emerald-800/60 hover:bg-emerald-900/50 hover:border-emerald-700 transition cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              {isProcessing ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />}
              Approve
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* NATION CODE BOX                                               */}
        {/* ------------------------------------------------------------- */}
        <div className="p-3 bg-[#0d1527] border border-blue-900/50 rounded-lg flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Barcode size={16} className="text-blue-400" />
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono block">
                Harmonized Nation Code (CPSE Standard)
              </span>
              <span className="font-mono font-bold text-sm text-blue-300 tracking-wide">
                {nationalCode}
              </span>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/60 border border-blue-800/50 text-blue-300">
            MoP&NG Unified Protocol
          </span>
        </div>

        {/* 6. FORMAL GOVERNANCE ACTIONS */}
        <div className="pt-3 border-t border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            <span>Governing Authority: </span>
            <strong className="text-slate-200 font-medium">
              Materials Engineer Review Required
            </strong>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
            {isHardConflict ? (
              <div className="flex items-center gap-2 bg-rose-950/40 border border-rose-900/50 px-3.5 py-1.5 rounded-md text-rose-300 text-xs">
                <Lock size={13} />
                <span>Approval Blocked by Engineering Safety Gate</span>
              </div>
            ) : isApproved ? (
              <div className="flex items-center gap-2.5">
                <span className="text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
                  <CheckCircle2 size={15} /> Reversible Identity Minted:{" "}
                  {item.pnmid || nationalCode}
                </span>
                <button
                  onClick={() => {
                    setApiDecision(null);
                    onRollbackPNMID(item.id);
                  }}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md text-xs transition cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw size={12} /> Rollback
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Mandatory engineering justification..."
                  value={justification}
                  onChange={(e) => setJustification(e.target.value)}
                  className={`bg-[#0f172a] border px-3 py-1.5 rounded-md text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 min-w-[250px] ${
                    justificationError ? "border-rose-500" : "border-slate-800"
                  }`}
                />
                <button
                  onClick={handleApprove}
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-md flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <FileCheck2 size={14} />
                  {isExactIdentity ? "Approve & Mint PNMID" : "Confirm Candidate"}
                </button>
                <button
                  onClick={() => {
                    handleAdjudicateAction("REJECT");
                  }}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-md transition cursor-pointer"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}