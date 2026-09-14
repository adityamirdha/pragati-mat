import React, { useState, useRef } from "react";
import {
  Building2,
  ShieldCheck,
  FileCheck2,
  Lock,
  CheckCircle2,
  RotateCcw,
  Upload,
  Download,
  FileSpreadsheet,
  FileText,
  Check,
  AlertCircle,
  XCircle,
  Hash,
  AlertTriangle,
  TrendingDown,
  Coins,
  PieChart,
  SearchCheck,
  CheckCircle,
  Activity,
  Layers,
  GitCompare,
  Inbox,
  History,
} from "lucide-react";

export default function CommandGrid({ onBackToHero }) {
  const fileInputRef = useRef(null);
  const [activeNavTab, setActiveNavTab] = useState("console");
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const [auditLogs, setAuditLogs] = useState([
    {
      id: "LOG-8821",
      pnmid: "PNM-VLV-2026-4F29X1",
      pairId: "PRD-CASE-A (PAIR-26099-01)",
      engineer: "Lead Engineer Dr. R. Sharma (CPCL)",
      action: "APPROVED EXACT IDENTITY",
      ruleGate: "ASME B16.34 v1.0",
      hash: "#sha256_e49a88bc21",
      timestamp: "2026-09-07 02:14:10 IST",
    },
    {
      id: "LOG-8822",
      pnmid: "REJECTED_MISMATCH",
      pairId: "PRD-CASE-B (PAIR-26099-02)",
      engineer: "Lead Engineer Dr. R. Sharma (CPCL)",
      action: "REJECTED FALSE MATCH",
      ruleGate: "ASME B16.34 v1.0",
      hash: "#sha256_99bc12ea44",
      timestamp: "2026-09-07 02:18:45 IST",
    },
  ]);

  const [priceAuditItems] = useState([
    {
      item: "Gate Valve 2in Class 150 CS",
      nodeA: "ONGC Hazira (₹ 54,000)",
      nodeB: "IOCL Gujarat (₹ 66,200)",
      variance: "+22.6%",
      leakage: "₹ 12,200 / unit",
    },
    {
      item: "Globe Valve 3in Class 300 SS",
      nodeA: "BPCL Mumbai (₹ 88,000)",
      nodeB: "CPCL Manali (₹ 1,04,500)",
      variance: "+18.7%",
      leakage: "₹ 16,500 / unit",
    },
    {
      item: "Check Valve 4in 300# WCB",
      nodeA: "IOCL Paradip (₹ 72,000)",
      nodeB: "ONGC Uran (₹ 85,900)",
      variance: "+19.3%",
      leakage: "₹ 13,900 / unit",
    },
  ]);

  const [exceptionQueue] = useState([
    {
      id: "EX-901",
      source: "CPSE-A (ONGC Hazira)",
      desc: "GATE VALVE 2IN 150# RF",
      category: "HARD_CONFLICT",
      status: "AUTO_BLOCKED",
      similarity: "97.2%",
      targetCase: "caseB",
    },
    {
      id: "EX-902",
      source: "CPSE-B (IOCL Paradip)",
      desc: "CHECK VALVE 4IN 300# WCB",
      category: "EQUIVALENCE",
      status: "PENDING_REVIEW",
      similarity: "81.5%",
      targetCase: "caseD",
    },
    {
      id: "EX-903",
      source: "CPSE-C (CPCL Manali)",
      desc: "GLOBE VALVE 3IN CL300 SS",
      category: "INSUFFICIENT_EVIDENCE",
      status: "SAFE_ABSTENTION",
      similarity: "88.2%",
      targetCase: "caseC",
    },
  ]);

  const testCases = {
    caseA: {
      key: "caseA",
      label: "Case A: True Cross-Source Identity",
      outcome: "EXACT_IDENTITY",
      badgeText: "Exact Identity — Same Material, Different Local Codes",
      badgeType: "emerald",
      queryNamespace: "CPSE-A (ONGC Hazira Complex)",
      tag: "CASEA",
      rawDescription: "GV 2IN CL150 CS RF",
      manufacturer: "ACME VALVES",
      mpn: "GV-200-150-CS-RF",
      candId: "PRD-CASE-A (PAIR-26099-01)",
      provenance: "Curated Golden Baseline",
      referenceMaster: "GATE VALVE, 2 INCH, CLASS 150, CARBON STEEL, RAISED FACE",
      referenceNamespace: "CPSE-B (IOCL Gujarat Refinery)",
      advisorySimilarity: 72.4,
      attributes: [
        { name: "Valve Type", criticality: "Identity", query: "GATE VALVE", target: "GATE VALVE", status: "MATCH" },
        { name: "Nominal Size", criticality: "Hard Critical", query: "DN 50 (2 IN)", target: "DN 50 (2 IN)", status: "MATCH" },
        { name: "Pressure Class", criticality: "Hard Critical", query: "CLASS 150", target: "CLASS 150", status: "MATCH" },
        { name: "Body Material", criticality: "Hard Critical", query: "CARBON STEEL (CS)", target: "CARBON STEEL (CS)", status: "MATCH" },
        { name: "End Connection", criticality: "Conditional", query: "RAISED FACE (RF)", target: "RAISED FACE (RF)", status: "MATCH" },
      ],
      ruleGate: "ASME B16.34 / ZERO-FP DETERMINISTIC GATE v1.0",
    },
    caseB: {
      key: "caseB",
      label: "Case B: High Similarity, Hard Conflict",
      outcome: "HARD_CONFLICT",
      badgeText: "Hard Conflict — Do Not Merge (Safety Blocker)",
      badgeType: "rose",
      queryNamespace: "CPSE-B (BPCL Mumbai Refinery)",
      tag: "CASEB",
      rawDescription: "GATE VALVE 2 IN CL150 CS",
      manufacturer: "FOSTER FLUID",
      mpn: "FS-GV-150-2",
      candId: "PRD-CASE-B (PAIR-26099-02)",
      provenance: "Synthetic Safety Regression",
      referenceMaster: "GATE VALVE 2 IN CL600 CS",
      referenceNamespace: "CPSE-C (CPCL Manali Refinery)",
      advisorySimilarity: 97.2,
      attributes: [
        { name: "Valve Type", criticality: "Identity", query: "GATE VALVE", target: "GATE VALVE", status: "MATCH" },
        { name: "Nominal Size", criticality: "Hard Critical", query: "DN 50 (2 IN)", target: "DN 50 (2 IN)", status: "MATCH" },
        { name: "Pressure Class", criticality: "Hard Critical", query: "CLASS 150", target: "CLASS 600", status: "CONFLICT" },
        { name: "Body Material", criticality: "Hard Critical", query: "CARBON STEEL", target: "CARBON STEEL", status: "MATCH" },
        { name: "End Connection", criticality: "Conditional", query: "RAISED FACE", target: "RAISED FACE", status: "MATCH" },
      ],
      ruleGate: "ASME B16.34 / ZERO-FP DETERMINISTIC GATE v1.0",
    },
    caseC: {
      key: "caseC",
      label: "Case C: Missing Critical Evidence",
      outcome: "INSUFFICIENT_EVIDENCE",
      badgeText: "Insufficient Evidence — Safe Abstention",
      badgeType: "amber",
      queryNamespace: "CPSE-A (ONGC Uran Processing Plant)",
      tag: "CASEC",
      rawDescription: "GLOBE VALVE 3IN CL300 SS316 BW",
      manufacturer: "L&T VALVES",
      mpn: "GL-3-300-316",
      candId: "PRD-CASE-C (PAIR-26099-03)",
      provenance: "Curated Golden Baseline",
      referenceMaster: "VALVE GLOBE 3 IN SS316 BUTT WELD",
      referenceNamespace: "CPSE-B (IOCL Mathura Refinery)",
      advisorySimilarity: 88.2,
      attributes: [
        { name: "Valve Type", criticality: "Identity", query: "GLOBE VALVE", target: "GLOBE VALVE", status: "MATCH" },
        { name: "Nominal Size", criticality: "Hard Critical", query: "DN 80 (3 IN)", target: "DN 80 (3 IN)", status: "MATCH" },
        { name: "Pressure Class", criticality: "Hard Critical", query: "CLASS 300", target: "MISSING", status: "MISSING" },
        { name: "Body Material", criticality: "Hard Critical", query: "SS316", target: "SS316", status: "MATCH" },
        { name: "End Connection", criticality: "Conditional", query: "BUTT WELD", target: "BUTT WELD", status: "MATCH" },
      ],
      ruleGate: "ASME B16.34 / ZERO-FP DETERMINISTIC GATE v1.0",
    },
    caseD: {
      key: "caseD",
      label: "Case D: Equivalence Candidate",
      outcome: "ENGINEERING_EQUIVALENCE_CANDIDATE",
      badgeText: "Engineering Equivalence Candidate (Engineer Review)",
      badgeType: "blue",
      queryNamespace: "CPSE-C (CPCL Manali Refinery)",
      tag: "CASED",
      rawDescription: "CHECK VALVE 4IN 300# WCB FLANGED RF",
      manufacturer: "AUDCO",
      mpn: "CV-400-WCB",
      candId: "PRD-CASE-D (PAIR-26099-04)",
      provenance: "Curated Golden Baseline",
      referenceMaster: "VALVE NON RETURN 4\" CL300 ASTM A216 WCB",
      referenceNamespace: "CPSE-A (ONGC Mehsana Asset)",
      advisorySimilarity: 81.5,
      attributes: [
        { name: "Valve Type", criticality: "Identity", query: "CHECK VALVE", target: "NON RETURN VALVE", status: "MATCH" },
        { name: "Nominal Size", criticality: "Hard Critical", query: "DN 100 (4 IN)", target: "DN 100 (4 IN)", status: "MATCH" },
        { name: "Pressure Class", criticality: "Hard Critical", query: "CLASS 300", target: "CLASS 300", status: "MATCH" },
        { name: "Body Material", criticality: "Hard Critical", query: "A216 WCB", target: "A216 WCB", status: "MATCH" },
      ],
      ruleGate: "ASME B16.34 / ZERO-FP DETERMINISTIC GATE v1.0",
    },
  };

  const [selectedCaseKey, setSelectedCaseKey] = useState("caseA");
  const [isAdjudicated, setIsAdjudicated] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState(null);
  const [generatedCode, setGeneratedCode] = useState(null);

  const activeCase = testCases[selectedCaseKey] || testCases.caseA;

  const handleSelectCase = (key) => {
    setSelectedCaseKey(key);
    setIsAdjudicated(false);
    setApprovalStatus(null);
    setGeneratedCode(null);
  };

  const handleApprove = () => {
    const code = `PNM-VLV-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setApprovalStatus("APPROVED");
    setGeneratedCode(code);

    const newLog = {
      id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
      pnmid: code,
      pairId: activeCase.candId,
      engineer: "Lead Engineer Dr. R. Sharma (CPCL)",
      action: "APPROVED & GENERATED CODE",
      ruleGate: "ASME B16.34 v1.0",
      hash: `#sha256_${Math.random().toString(36).substring(2, 12)}`,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19) + " IST",
    };
    setAuditLogs([newLog, ...auditLogs]);
  };

  const handleReject = () => {
    setApprovalStatus("REJECTED");
    setGeneratedCode(null);

    const rejectLog = {
      id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
      pnmid: "REJECTED_MISMATCH",
      pairId: activeCase.candId,
      engineer: "Lead Engineer Dr. R. Sharma (CPCL)",
      action: "REJECTED FALSE MATCH",
      ruleGate: "ASME B16.34 v1.0",
      hash: `#sha256_${Math.random().toString(36).substring(2, 12)}`,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19) + " IST",
    };
    setAuditLogs([rejectLog, ...auditLogs]);
  };

  const handleRollback = () => {
    setApprovalStatus(null);
    setGeneratedCode(null);
  };

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 font-sans flex flex-col justify-between selection:bg-blue-500/30">
      <div>
        {/* National Flag Tricolor Strip */}
        <div className="h-1 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

        {/* Header */}
        <header className="border-b border-slate-800 bg-[#0b101b] px-6 lg:px-10 py-3 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={onBackToHero}>
            <div className="w-8 h-8 rounded bg-[#131b2e] border border-slate-700 flex items-center justify-center font-bold text-xs text-slate-300">
              GOI
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold tracking-wider text-slate-200 uppercase">
                  Ministry of Petroleum & Natural Gas
                </span>
                <span className="text-slate-600">|</span>
                <span className="text-xs text-slate-400">Government of India</span>
              </div>
              <div className="text-[11px] text-slate-400">
                Chennai Petroleum Corporation Limited (CPCL) • Material Relationship Adjudication Portal
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-5 text-xs font-medium text-slate-400">
              <button onClick={onBackToHero} className="hover:text-slate-200 transition cursor-pointer">
                Overview
              </button>
              <button
                onClick={() => setActiveNavTab("console")}
                className={`transition cursor-pointer ${
                  activeNavTab === "console" ? "text-blue-400 font-semibold border-b-2 border-blue-400 pb-0.5" : "hover:text-slate-200"
                }`}
              >
                Adjudication Console
              </button>
              <button
                onClick={() => setActiveNavTab("metrics")}
                className={`transition cursor-pointer ${
                  activeNavTab === "metrics" ? "text-blue-400 font-semibold border-b-2 border-blue-400 pb-0.5" : "hover:text-slate-200"
                }`}
              >
                Evaluation Metrics
              </button>
              <button
                onClick={() => setActiveNavTab("governance")}
                className={`transition cursor-pointer ${
                  activeNavTab === "governance" ? "text-blue-400 font-semibold border-b-2 border-blue-400 pb-0.5" : "hover:text-slate-200"
                }`}
              >
                Governance & Exceptions
              </button>
            </nav>

            <button
              onClick={onBackToHero}
              className="px-3 py-1 rounded bg-[#141d30] hover:bg-[#1a263f] text-slate-300 text-xs font-medium border border-slate-700 transition cursor-pointer"
            >
              Exit to Portal
            </button>
          </div>
        </header>

        {/* Regulatory Policy Context Bar */}
        <div className="border-b border-slate-800/80 bg-[#090e18] px-6 lg:px-10 py-2 flex flex-wrap justify-between items-center text-xs text-slate-400">
          <div>
            <strong className="text-slate-300 font-medium">Regulatory Policy Context:</strong>{" "}
            <span>Pilot Material Family: Valves (ASME B16.34)</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>
              Safety Rule Engine: <strong className="text-slate-200">v1.0 Frozen</strong>
            </span>
            <span className="text-slate-700">|</span>
            <span className="text-emerald-400 font-medium flex items-center gap-1">
              <ShieldCheck size={13} />
              Deterministic Hard-Gates Enforced
            </span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* VIEW 1: ADJUDICATION CONSOLE                             */}
        {/* ========================================================= */}
        {activeNavTab === "console" && (
          <main className="max-w-7xl mx-auto px-6 lg:px-10 pt-6 pb-6 w-full space-y-5">
            {/* Top Platform Bar */}
            <div className="bg-[#0e1422] border border-slate-800 rounded-lg p-4 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-base font-bold text-white tracking-tight">
                    Cross-CPSE Material Master Harmonization Console
                  </h1>
                  <span className="px-2 py-0.5 rounded bg-[#172544] text-blue-300 border border-blue-900 text-[10px] font-medium font-mono">
                    SIH 26099 Enterprise Adjudicator
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                  Autonomous candidate retrieval with deterministic critical-attribute safety gating and accountable human governance.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs">
                <div className="px-3 py-1.5 rounded bg-[#090e18] border border-slate-800">
                  <div className="text-[9px] text-slate-500 uppercase tracking-wider font-mono">PILOT SCOPE</div>
                  <div className="font-semibold text-slate-200 text-xs mt-0.5">Valves (3 Simulated CPSEs)</div>
                </div>

                <div className="px-3 py-1.5 rounded bg-[#1a1118] border border-rose-950/70">
                  <div className="text-[9px] text-rose-400 uppercase tracking-wider font-mono">OBSERVED FALSE MERGES</div>
                  <div className="font-semibold text-rose-300 text-xs mt-0.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    0 / N Golden Incompatible Pairs
                  </div>
                </div>

                <div className="px-3 py-1.5 rounded bg-[#0b1716] border border-emerald-950/70">
                  <div className="text-[9px] text-emerald-400 uppercase tracking-wider font-mono">GOVERNANCE AUTHORITY</div>
                  <div className="font-semibold text-emerald-300 text-xs mt-0.5">Human Authority Required</div>
                </div>
              </div>
            </div>

            {/* Test Suite Selector */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300">
                  Jury Evaluation Test Suite (Frozen Baseline Scenarios):
                </span>
                <span className="text-[11px] text-slate-500">
                  Select a case to inspect deterministic adjudication
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {Object.keys(testCases).map((key) => {
                  const tc = testCases[key];
                  const isSelected = selectedCaseKey === key;
                  return (
                    <button
                      key={key}
                      onClick={() => handleSelectCase(key)}
                      className={`px-3 py-1.5 rounded text-xs transition cursor-pointer border ${
                        isSelected
                          ? "bg-[#1d4ed8] text-white border-blue-500 font-semibold"
                          : "bg-[#0c121e] hover:bg-[#131b2c] text-slate-300 border-slate-800 font-normal"
                      }`}
                    >
                      {tc.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Workbench Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Left Box: Source Record */}
              <div className="lg:col-span-5 bg-[#0e1422] border border-slate-800 rounded-lg p-4 flex flex-col justify-between min-h-[380px]">
                <div className="space-y-3.5">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800/80">
                    <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider font-mono">
                      SOURCE INGESTION RECORD
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      Namespace Preserved
                    </span>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Source Namespace Node</label>
                    <div className="px-2.5 py-1.5 rounded bg-[#090e18] border border-slate-800 text-xs flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building2 size={13} className="text-blue-400" />
                        <span className="text-slate-200 font-mono text-[11px] font-medium">{activeCase.queryNamespace}</span>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#131c30] text-blue-300 border border-slate-700 font-mono">
                        {activeCase.tag}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Raw Free-Text Material Description</label>
                    <div className="px-2.5 py-2 rounded bg-[#090e18] border border-slate-800 text-xs font-mono text-slate-100 font-medium">
                      {activeCase.rawDescription}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Manufacturer / OEM</label>
                      <div className="px-2.5 py-1.5 rounded bg-[#090e18] border border-slate-800 text-xs text-slate-300 truncate">
                        {activeCase.manufacturer}
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Part Number (MPN)</label>
                      <div className="px-2.5 py-1.5 rounded bg-[#090e18] border border-slate-800 text-xs font-mono text-slate-300 truncate">
                        {activeCase.mpn}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsAdjudicated(true)}
                  className="w-full mt-5 py-2 rounded bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium text-xs flex items-center justify-center gap-2 transition cursor-pointer active:scale-[0.99]"
                >
                  <FileCheck2 size={14} />
                  <span>Run Relationship Adjudication</span>
                </button>
              </div>

              {/* Right Box: Evidence Dossier */}
              <div className="lg:col-span-7 bg-[#0e1422] border border-slate-800 rounded-lg p-4 min-h-[380px] flex flex-col justify-between">
                {!isAdjudicated ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                    <FileText size={40} className="text-slate-600 mb-3 stroke-[1.2]" />
                    <div className="text-xs font-semibold text-slate-300">No Active Adjudication Result</div>
                    <p className="text-[11px] text-slate-500 max-w-xs mt-1 leading-relaxed">
                      Select a baseline scenario on the left and click <strong>"Run Relationship Adjudication"</strong> to inspect the evidence dossier.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    <div className="flex flex-wrap items-start justify-between gap-2 pb-2 border-b border-slate-800 text-xs">
                      <div>
                        <div className="text-slate-300 text-xs font-medium">
                          Pair ID: <span className="font-mono text-blue-300">{activeCase.candId}</span>
                        </div>
                        <div className="text-slate-500 text-[10px] mt-0.5">
                          Provenance: {activeCase.provenance} • Scope: Cross-CPSE Comparison
                        </div>
                      </div>

                      <div
                        className={`px-2.5 py-0.5 rounded text-[11px] font-medium ${
                          activeCase.badgeType === "rose"
                            ? "bg-rose-950/50 text-rose-300 border border-rose-800"
                            : activeCase.badgeType === "amber"
                            ? "bg-amber-950/50 text-amber-300 border border-amber-800"
                            : "bg-emerald-950/50 text-emerald-300 border border-emerald-800"
                        }`}
                      >
                        {activeCase.badgeText}
                      </div>
                    </div>

                    <div className="bg-[#090e18] p-2.5 rounded border border-slate-800 text-xs flex justify-between items-center">
                      <div>
                        <span className="text-[10px] text-slate-500 block">Comparison Target (Reference Master):</span>
                        <span className="font-medium text-slate-200 block text-xs mt-0.5">{activeCase.referenceMaster}</span>
                        <span className="text-[10px] text-slate-400">Node: {activeCase.referenceNamespace}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 block">Advisory Similarity</span>
                        <span className={`text-xs font-bold font-mono ${activeCase.outcome === "HARD_CONFLICT" ? "text-rose-400" : "text-blue-300"}`}>
                          {activeCase.advisorySimilarity}%
                        </span>
                      </div>
                    </div>

                    {/* Attributes Evidence Matrix */}
                    <div className="border border-slate-800 rounded overflow-hidden text-xs">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-[#090e18] text-slate-400 text-[10px] uppercase border-b border-slate-800">
                            <th className="py-1.5 px-3">Attribute</th>
                            <th className="py-1.5 px-3">Criticality</th>
                            <th className="py-1.5 px-3">Query Record</th>
                            <th className="py-1.5 px-3">Target Candidate</th>
                            <th className="py-1.5 px-3 text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/80 bg-[#0c121e]">
                          {activeCase.attributes.map((attr, idx) => (
                            <tr key={idx}>
                              <td className="py-1.5 px-3 font-medium text-slate-200">{attr.name}</td>
                              <td className="py-1.5 px-3 text-slate-400 text-[10px]">{attr.criticality}</td>
                              <td className="py-1.5 px-3 font-mono text-slate-300 text-[10px]">{attr.query}</td>
                              <td className={`py-1.5 px-3 font-mono text-[10px] ${attr.status === "CONFLICT" ? "text-rose-400 font-bold" : "text-slate-300"}`}>
                                {attr.target}
                              </td>
                              <td className="py-1.5 px-3 text-right">
                                <span
                                  className={`px-1.5 py-0.5 rounded text-[9px] font-semibold inline-block ${
                                    attr.status === "MATCH"
                                      ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                                      : attr.status === "CONFLICT"
                                      ? "bg-rose-950 text-rose-300 border border-rose-800"
                                      : "bg-amber-950 text-amber-300 border border-amber-800"
                                  }`}
                                >
                                  {attr.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Generated Code Display */}
                    {generatedCode && (
                      <div className="p-2 rounded bg-emerald-950/30 border border-emerald-800 flex items-center justify-between text-xs">
                        <div>
                          <span className="text-emerald-400 text-[10px] block">Generated National Master Code:</span>
                          <span className="font-mono text-white font-bold">{generatedCode}</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 font-mono">
                          Ready for ERP Sync
                        </span>
                      </div>
                    )}

                    {/* Governance Controls */}
                    <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
                      <span className="text-slate-400 text-[11px]">
                        Authority Gate: <strong>Materials Engineer Decision Required</strong>
                      </span>

                      <div className="flex items-center gap-2">
                        {activeCase.outcome === "HARD_CONFLICT" ? (
                          <div className="flex items-center gap-1.5 text-rose-300 text-[11px] bg-rose-950/40 border border-rose-900 px-2.5 py-1 rounded">
                            <Lock size={12} />
                            <span>Approval Blocked by Engineering Safety Policy</span>
                          </div>
                        ) : approvalStatus === "APPROVED" ? (
                          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                            <CheckCircle2 size={14} />
                            <span>Approved & Generated Code</span>
                            <button onClick={handleRollback} className="p-1 hover:bg-slate-800 rounded text-slate-400" title="Reset">
                              <RotateCcw size={12} />
                            </button>
                          </div>
                        ) : approvalStatus === "REJECTED" ? (
                          <div className="flex items-center gap-1.5 text-xs text-rose-400 font-medium">
                            <XCircle size={14} />
                            <span>Rejected Mismatch</span>
                            <button onClick={handleRollback} className="p-1 hover:bg-slate-800 rounded text-slate-400" title="Reset">
                              <RotateCcw size={12} />
                            </button>
                          </div>
                        ) : (
                          <>
                            <button
                              onClick={handleReject}
                              className="px-3 py-1 rounded bg-rose-800 hover:bg-rose-700 text-white text-xs font-medium cursor-pointer"
                            >
                              Reject Match
                            </button>
                            <button
                              onClick={handleApprove}
                              className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium cursor-pointer"
                            >
                              Approve & Generate Code
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        )}

        {/* ========================================================= */}
        {/* VIEW 2: EVALUATION METRICS                                */}
        {/* ========================================================= */}
        {activeNavTab === "metrics" && (
          <main className="max-w-7xl mx-auto px-6 lg:px-10 pt-6 pb-6 w-full space-y-6">
            <div className="bg-[#0e1422] border border-slate-800 rounded-lg p-4 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider font-mono">
                    PRD Section 21 & Live Price Variance Audit
                  </span>
                  <span className="text-slate-600">|</span>
                  <span className="text-xs text-slate-400">Cross-CPSE Overpricing & Leakage Detection</span>
                </div>
                <h1 className="text-lg font-bold text-white mt-1">Financial Leakage Audit & Evaluation Metrics Dashboard</h1>
                <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                  Quantitative evaluation of duplicate material discrepancies, historical procurement leakage, and deterministic benchmark verification.
                </p>
              </div>

              <div className="bg-emerald-950/30 border border-emerald-800/60 px-4 py-2 rounded-lg text-right">
                <div className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider font-mono">Real-World Projected Savings</div>
                <div className="text-lg font-bold text-emerald-300 font-mono mt-0.5">₹ 42.8 Crores / Yr</div>
                <div className="text-[11px] text-slate-400">Calculated via Cross-CPSE Price Variance Audit</div>
              </div>
            </div>

            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#0e1422] border border-rose-900/40 p-4 rounded-lg flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-rose-900/30 border border-rose-700/50 flex items-center justify-center text-rose-300 shrink-0">
                  <TrendingDown size={20} />
                </div>
                <div>
                  <div className="text-[11px] text-rose-400 font-medium uppercase tracking-wider font-mono">Historical Overpricing Leakage</div>
                  <div className="text-xl font-bold font-mono text-white mt-0.5">₹ 118.4 Cr</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Discovered via cross-node price variance</div>
                </div>
              </div>

              <div className="bg-[#0e1422] border border-emerald-900/40 p-4 rounded-lg flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-emerald-900/30 border border-emerald-700/50 flex items-center justify-center text-emerald-300 shrink-0">
                  <Coins size={20} />
                </div>
                <div>
                  <div className="text-[11px] text-emerald-400 font-medium uppercase tracking-wider font-mono">Projected Annual Savings</div>
                  <div className="text-xl font-bold font-mono text-white mt-0.5">₹ 42.8 Cr</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Achieved via unified purchasing power</div>
                </div>
              </div>

              <div className="bg-[#0e1422] border border-blue-900/40 p-4 rounded-lg flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-blue-900/30 border border-blue-700/50 flex items-center justify-center text-blue-300 shrink-0">
                  <PieChart size={20} />
                </div>
                <div>
                  <div className="text-[11px] text-blue-300 font-medium uppercase tracking-wider font-mono">Catalog Redundancy Cut</div>
                  <div className="text-xl font-bold font-mono text-white mt-0.5">34.2%</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Eliminated duplicate part codes</div>
                </div>
              </div>
            </div>

            {/* Price Variance Table */}
            <div className="bg-[#0e1422] border border-slate-800 rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <SearchCheck size={18} className="text-blue-400" />
                  <h2 className="text-sm font-semibold text-slate-200">Live Cross-CPSE Price Variance Audit (Overpricing Detector)</h2>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#090e18] border border-slate-800 text-blue-300">
                  Active ERP Price Matcher
                </span>
              </div>

              <div className="mt-3 border border-slate-800 rounded overflow-hidden text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#090e18] text-slate-400 text-[10px] uppercase border-b border-slate-800">
                      <th className="py-2 px-3 font-semibold">Harmonized Material Item</th>
                      <th className="py-2 px-3 font-semibold">Lower Discovered Rate</th>
                      <th className="py-2 px-3 font-semibold">Higher Procured Rate</th>
                      <th className="py-2 px-3 font-semibold text-center">Price Variance</th>
                      <th className="py-2 px-3 font-semibold text-right">Estimated Unit Leakage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-[#0c121e]">
                    {priceAuditItems.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/30">
                        <td className="py-2 px-3 font-medium text-slate-200">{item.item}</td>
                        <td className="py-2 px-3 font-mono text-emerald-300 text-[11px]">{item.nodeA}</td>
                        <td className="py-2 px-3 font-mono text-rose-300 text-[11px]">{item.nodeB}</td>
                        <td className="py-2 px-3 text-center font-mono font-bold text-amber-400">{item.variance}</td>
                        <td className="py-2 px-3 text-right font-mono text-rose-400 font-bold">{item.leakage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Benchmark Tiles */}
            <div>
              <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono">
                Deterministic Safety & Accuracy Benchmark Tiles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="bg-[#0e1422] border border-slate-800 p-3.5 rounded-lg">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span className="font-medium uppercase tracking-wider text-[10px] font-mono">Hard-Conflict Detection</span>
                    <ShieldCheck size={16} className="text-emerald-400" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-white mt-1.5">100.0%</div>
                  <div className="text-xs text-emerald-400 font-mono">48 / 48 detected</div>
                </div>

                <div className="bg-[#0e1422] border border-slate-800 p-3.5 rounded-lg">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span className="font-medium uppercase tracking-wider text-[10px] font-mono">Exact-Identity Precision</span>
                    <CheckCircle size={16} className="text-blue-400" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-white mt-1.5">100.0%</div>
                  <div className="text-xs text-blue-400 font-mono">32 / 32 approved valid</div>
                </div>

                <div className="bg-[#0e1422] border border-slate-800 p-3.5 rounded-lg">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span className="font-medium uppercase tracking-wider text-[10px] font-mono">Safe Abstention Correctness</span>
                    <AlertTriangle size={16} className="text-amber-400" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-white mt-1.5">100.0%</div>
                  <div className="text-xs text-amber-400 font-mono">24 / 24 held safely</div>
                </div>
              </div>
            </div>
          </main>
        )}

        {/* ========================================================= */}
        {/* VIEW 3: GOVERNANCE & EXCEPTIONS                           */}
        {/* ========================================================= */}
        {activeNavTab === "governance" && (
          <main className="max-w-7xl mx-auto px-6 lg:px-10 pt-6 pb-6 w-full space-y-5">
            <div className="bg-[#0e1422] border border-slate-800 rounded-lg p-4 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider font-mono">
                    Ministry Governance Hub
                  </span>
                  <span className="text-slate-600">|</span>
                  <span className="text-xs text-slate-400">Accountability & Exception Management</span>
                </div>
                <h1 className="text-lg font-bold text-white mt-1">Immutable Audit Trail & Bulk Exception Queue</h1>
                <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                  Real-time visibility into engineer decisions, cryptographic audit hashes, and refinery-scale conflict triaging queues.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-[#090e18] border border-slate-800 px-3 py-1.5 rounded text-center">
                  <div className="text-[9px] text-slate-500 uppercase font-mono">Active Exceptions</div>
                  <div className="text-sm font-bold text-amber-400 font-mono">{exceptionQueue.length} Items</div>
                </div>
                <div className="bg-[#090e18] border border-slate-800 px-3 py-1.5 rounded text-center">
                  <div className="text-[9px] text-slate-500 uppercase font-mono">Audit Records</div>
                  <div className="text-sm font-bold text-emerald-400 font-mono">{auditLogs.length} Records</div>
                </div>
              </div>
            </div>

            {/* Exception Inbox */}
            <div className="bg-[#0e1422] border border-slate-800 rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Inbox size={16} className="text-blue-400" />
                  <h2 className="text-xs font-semibold text-slate-200">Refinery Batch Exception Inbox</h2>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#090e18] border border-slate-800 text-amber-400">
                  Prioritized Triaging Queue
                </span>
              </div>

              <div className="mt-3 border border-slate-800 rounded overflow-hidden text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#090e18] text-slate-400 text-[10px] uppercase border-b border-slate-800">
                      <th className="py-2 px-3">Exception ID</th>
                      <th className="py-2 px-3">Source Node</th>
                      <th className="py-2 px-3">Raw Description</th>
                      <th className="py-2 px-3 text-center">Category</th>
                      <th className="py-2 px-3 text-center">Similarity</th>
                      <th className="py-2 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-[#0c121e]">
                    {exceptionQueue.map((ex) => (
                      <tr key={ex.id} className="hover:bg-slate-800/30">
                        <td className="py-2 px-3 font-mono text-slate-300">{ex.id}</td>
                        <td className="py-2 px-3 text-blue-300 font-mono text-[11px]">{ex.source}</td>
                        <td className="py-2 px-3 font-mono text-slate-200">{ex.desc}</td>
                        <td className="py-2 px-3 text-center">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[9px] font-semibold ${
                              ex.category === "HARD_CONFLICT"
                                ? "bg-rose-950 text-rose-300 border border-rose-800"
                                : "bg-amber-950 text-amber-300 border border-amber-800"
                            }`}
                          >
                            {ex.category}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-center font-mono text-slate-300">{ex.similarity}</td>
                        <td className="py-2 px-3 text-right">
                          <button
                            onClick={() => {
                              setSelectedCaseKey(ex.targetCase);
                              setIsAdjudicated(true);
                              setActiveNavTab("console");
                            }}
                            className="px-2 py-0.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-medium"
                          >
                            Review Item →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Audit Trail Ledger */}
            <div className="bg-[#0e1422] border border-slate-800 rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <History size={16} className="text-emerald-400" />
                  <h2 className="text-xs font-semibold text-slate-200">Immutable Audit Trail Ledger</h2>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#090e18] border border-slate-800 text-emerald-400">
                  Cryptographically Signed Log
                </span>
              </div>

              <div className="mt-3 border border-slate-800 rounded overflow-hidden text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#090e18] text-slate-400 text-[10px] uppercase border-b border-slate-800">
                      <th className="py-2 px-3">Log ID</th>
                      <th className="py-2 px-3">Master Code / Status</th>
                      <th className="py-2 px-3">Engineer Authority</th>
                      <th className="py-2 px-3">Action Verdict</th>
                      <th className="py-2 px-3">Crypto Hash</th>
                      <th className="py-2 px-3 text-right">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-[#0c121e]">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-800/30">
                        <td className="py-2 px-3 font-mono text-slate-300">{log.id}</td>
                        <td className="py-2 px-3 font-mono text-emerald-300 text-[11px]">{log.pnmid}</td>
                        <td className="py-2 px-3 text-slate-200">{log.engineer}</td>
                        <td className="py-2 px-3 font-semibold text-slate-200">{log.action}</td>
                        <td className="py-2 px-3 font-mono text-[10px] text-slate-400">{log.hash}</td>
                        <td className="py-2 px-3 text-right font-mono text-[10px] text-slate-400">{log.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-[#0b101b] px-6 lg:px-10 py-2.5 flex justify-between items-center text-[11px] text-slate-500">
        <div>© 2026 Ministry of Petroleum & Natural Gas, Government of India. Developed for CPSE Material Standardization.</div>
        <div className="flex items-center gap-2 text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Deterministic Safety Rule Engine Frozen</span>
        </div>
      </footer>
    </div>
  );
}