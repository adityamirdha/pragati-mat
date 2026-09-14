import React, { useState, useEffect } from "react";

const CASE_DATA = {
  "CASE-A": {
    name: "Case A: Exact Deterministic Match",
    scenarioType: "EXACT_MATCH",
    cpsePresets: [
      {
        cpseName: "ONGC Hazira",
        plant: "Hazira Gas Processing Complex, Gujarat",
        localCode: "MAT-ONGC-40118",
        materialGroup: "Piping & Valves (Class 02)",
        description: "GATE VALVE 2 INCH CLASS 150 FLANGED RF WCB BODY",
        oem: "FOSTER FLUID CONTROLS",
        mpn: "F5-GV-150-2",
        specSummary: "2\" NPS, ASME CL150, Raised Face, WCB Carbon Steel Body, Trim 8",
        codePrefix: "IN-MAT-VLV-150-",
        matchScore: "98.8%",
        badgeText: "Exact Identity — 100% Standard Match",
        badgeStyle: "bg-emerald-50 text-emerald-700 border-emerald-300",
        verdictTitle: "Deterministic Match Confirmed",
        verdictDesc: "All attributes, metallurgy, and OEM part numbers match the National Master Catalog benchmark.",
        tallyRows: [
          { label: "Item / Valve Name", input: "GATE VALVE 2 INCH FLANGED RF", target: "GATE VALVE 2 IN RF FLANGED", status: "MATCH", remark: "Identical taxonomy item" },
          { label: "OEM Manufacturer", input: "FOSTER FLUID CONTROLS", target: "FOSTER FLUID CONTROLS", status: "MATCH", remark: "Empanelled vendor" },
          { label: "Material Composition", input: "ASTM A216 WCB", target: "CARBON STEEL ASTM A216 WCB", status: "MATCH", remark: "Verified metallurgy" },
          { label: "Catalog Reference Code", input: "MAT-ONGC-40118", target: "NAT-CAT-VLV-02-150", status: "MATCH", remark: "Central registry mapped" },
          { label: "Manufacturer Part No (MPN)", input: "F5-GV-150-2", target: "F5-GV-150-2", status: "MATCH", remark: "Exact part number match" },
          { label: "Size Dimension", input: "2 Inch (DN 50)", target: "2 Inch (DN 50)", status: "MATCH", remark: "Standard nominal bore" },
          { label: "Pressure Rating No.", input: "150 # (Class 150)", target: "150 # (Class 150)", status: "MATCH", remark: "Deterministic match" }
        ]
      },
      {
        cpseName: "IOCL Panipat",
        plant: "Panipat Refinery & Petrochemical Complex, Haryana",
        localCode: "MAT-IOCL-10293",
        materialGroup: "Piping & Valves (Class 02)",
        description: "GATE VALVE 2\" 150# RF FLANGED ASTM A216 WCB",
        oem: "FOSTER FLUID CONTROLS",
        mpn: "F5-GV-150-2",
        specSummary: "2\" NPS, ASME CL150, Raised Face, WCB Carbon Steel Body, Trim 8",
        codePrefix: "IN-MAT-VLV-150-",
        matchScore: "97.5%",
        badgeText: "Exact Identity — 100% Standard Match",
        badgeStyle: "bg-emerald-50 text-emerald-700 border-emerald-300",
        verdictTitle: "Deterministic Match Confirmed",
        verdictDesc: "All attributes match standard benchmark.",
        tallyRows: [
          { label: "Item / Valve Name", input: "GATE VALVE 2\" 150# RF", target: "GATE VALVE 2 IN RF FLANGED", status: "MATCH", remark: "Synonym mapped" },
          { label: "OEM Manufacturer", input: "FOSTER FLUID CONTROLS", target: "FOSTER FLUID CONTROLS", status: "MATCH", remark: "Empanelled vendor" },
          { label: "Material Composition", input: "ASTM A216 WCB", target: "CARBON STEEL ASTM A216 WCB", status: "MATCH", remark: "Verified metallurgy" },
          { label: "Catalog Reference Code", input: "MAT-IOCL-10293", target: "NAT-CAT-VLV-02-150", status: "MATCH", remark: "Central registry mapped" },
          { label: "Manufacturer Part No (MPN)", input: "F5-GV-150-2", target: "F5-GV-150-2", status: "MATCH", remark: "Exact part number match" },
          { label: "Size Dimension", input: "2 Inch (DN 50)", target: "2 Inch (DN 50)", status: "MATCH", remark: "Standard nominal bore" },
          { label: "Pressure Rating No.", input: "150 # (Class 150)", target: "150 # (Class 150)", status: "MATCH", remark: "Deterministic match" }
        ]
      }
    ]
  },

  "CASE-B": {
    name: "Case B: Critical Safety Conflict",
    scenarioType: "SAFETY_CONFLICT",
    cpsePresets: [
      {
        cpseName: "CPCL Manali",
        plant: "Manali Refinery Complex, Chennai",
        localCode: "MAT-CPCL-77301",
        materialGroup: "Piping & High Pressure Fittings",
        description: "GATE VALVE 2 IN CL600/CL150 DUAL RATED FLANGED CS",
        oem: "FOSTER FLUID CONTROLS",
        mpn: "F5-GV-ERR-2",
        specSummary: "Conflicting Class 150 vs Class 600 pressure rating in ERP data sheet",
        codePrefix: null,
        matchScore: "54.2%",
        badgeText: "Hard Conflict — Safety Gate Blocked",
        badgeStyle: "bg-rose-50 text-rose-700 border-rose-300",
        verdictTitle: "Safety Rule Violation: Hydrocarbon Flange Rupture Risk",
        verdictDesc: "Mismatch between Class 150 and Class 600. Deploying this in high-pressure service will lead to catastrophic physical failure.",
        tallyRows: [
          { label: "Item / Valve Name", input: "GATE VALVE 2 IN DUAL RATED", target: "GATE VALVE 2 IN RF FLANGED", status: "MISMATCH", remark: "Ambiguous dual specification" },
          { label: "OEM Manufacturer", input: "FOSTER FLUID CONTROLS", target: "FOSTER FLUID CONTROLS", status: "MATCH", remark: "Vendor verified" },
          { label: "Material Composition", input: "CARBON STEEL (CS)", target: "CARBON STEEL ASTM A216 WCB", status: "MATCH", remark: "Alloy type compliant" },
          { label: "Catalog Reference Code", input: "MAT-CPCL-77301", target: "NAT-CAT-VLV-02-150", status: "MISMATCH", remark: "Cannot map conflicting item" },
          { label: "Manufacturer Part No (MPN)", input: "F5-GV-ERR-2", target: "F5-GV-150-2", status: "MISMATCH", remark: "Invalid safety revision" },
          { label: "Size Dimension", input: "2 Inch (DN 50)", target: "2 Inch (DN 50)", status: "MATCH", remark: "Dimension matches" },
          { label: "Pressure Rating No.", input: "CL 600 (High Pressure)", target: "CL 150 (Benchmark)", status: "CONFLICT", remark: "CRITICAL 600 vs 150 CONFLICT" }
        ]
      }
    ]
  },

  "CASE-C": {
    name: "Case C: Incomplete Data",
    scenarioType: "INSUFFICIENT_DATA",
    cpsePresets: [
      {
        cpseName: "BPCL Kochi",
        plant: "Kochi Refinery, Ambalamugal, Kerala",
        localCode: "MAT-BPCL-99120",
        materialGroup: "Rotary Machinery (Class 14)",
        description: "CENTRIFUGAL WATER PUMP 50 CUM/HR WITHOUT MOTOR",
        oem: "Unspecified / Local Vendor",
        mpn: "N/A",
        specSummary: "50 m³/hr capacity, dynamic head rating missing, impeller metallurgy absent",
        codePrefix: null,
        matchScore: "41.0%",
        badgeText: "Insufficient Data — Held for Enrichment",
        badgeStyle: "bg-amber-50 text-amber-700 border-amber-300",
        verdictTitle: "Missing Mandatory Specifications",
        verdictDesc: "Item cannot be evaluated accurately because dynamic head and impeller alloy are absent from ERP data. Requires datasheet upload.",
        tallyRows: [
          { label: "Equipment Name", input: "CENTRIFUGAL WATER PUMP", target: "CENTRIFUGAL PUMP 50 M3/HR", status: "MATCH", remark: "Equipment category matched" },
          { label: "OEM Manufacturer", input: "Unspecified / Local Vendor", target: "KIRLOSKAR / FLOWSERVE", status: "MISSING", remark: "OEM not declared in ERP" },
          { label: "Impeller Metallurgy", input: "Not Listed", target: "STAINLESS STEEL 316", status: "MISSING", remark: "Mandatory alloy info absent" },
          { label: "Catalog Reference Code", input: "MAT-BPCL-99120", target: "NAT-CAT-PMP-14-500", status: "MISSING", remark: "Insufficient for auto-mapping" },
          { label: "Manufacturer Part No (MPN)", input: "N/A", target: "MANDATORY_OEM_PN", status: "MISSING", remark: "Part number not provided" },
          { label: "Flow Capacity Rating", input: "50 CUM/HR", target: "50 M3/HR", status: "MATCH", remark: "Capacity aligns with benchmark" },
          { label: "Dynamic Head (Meters)", input: "Not Specified", target: "45 - 60 Meters", status: "MISSING", remark: "Required parameter absent" }
        ]
      }
    ]
  },

  "CASE-D": {
    name: "Case D: Cross-OEM Functional Equivalence",
    scenarioType: "FUNCTIONAL_EQUIVALENCE",
    cpsePresets: [
      {
        cpseName: "IOCL Gujarat",
        plant: "Koyali Refinery, Vadodara",
        localCode: "MAT-IOCL-88402",
        materialGroup: "Instrumentation & Line Valves",
        description: "BALL VALVE 1 INCH FULL BORE CLASS 300 SS316 (CF8M) FLANGED",
        oem: "L&T VALVES LIMITED",
        mpn: "LT-BV-300-FB-01",
        specSummary: "1\" Full Bore, Class 300, ASTM A351 CF8M Body, Fire Safe API 607",
        codePrefix: "IN-EQV-BV-300-",
        matchScore: "95.4%",
        badgeText: "Equivalence Approved — Cross-Enterprise Shareable",
        badgeStyle: "bg-blue-50 text-blue-700 border-blue-300",
        verdictTitle: "Form, Fit & Functional Equivalence Certified",
        verdictDesc: "OEM and Part Numbers differ across CPSE catalogs, but operational capabilities conform to API 6D / API 607. Qualified for Inter-CPSE Surplus Pool.",
        tallyRows: [
          { label: "Item / Valve Name", input: "BALL VALVE 1 INCH FULL BORE", target: "BALL VALVE 1 IN FULL BORE", status: "EQUIV", remark: "Functionally interchangeable" },
          { label: "OEM Manufacturer", input: "L&T VALVES LIMITED", target: "L&T / FLOWSERVE / AUDCO", status: "EQUIV", remark: "Interoperable approved vendor" },
          { label: "Material Composition", input: "SS316 (CF8M)", target: "STAINLESS STEEL ASTM A351 CF8M", status: "MATCH", remark: "Metallurgical standard matches" },
          { label: "Catalog Reference Code", input: "MAT-IOCL-88402", target: "NAT-CAT-BV-03-300", status: "EQUIV", remark: "Mapped under Equivalence Pool" },
          { label: "Manufacturer Part No (MPN)", input: "LT-BV-300-FB-01", target: "CROSS_OEM_FAMILY", status: "EQUIV", remark: "Cross-referenced part family" },
          { label: "Size Dimension", input: "1 Inch (DN 25)", target: "1 Inch (DN 25)", status: "MATCH", remark: "100% Dimensional match" },
          { label: "Pressure Rating No.", input: "300 # (Class 300)", target: "300 # (Class 300)", status: "MATCH", remark: "Pressure numbers aligned" }
        ]
      },
      {
        cpseName: "NRL Numaligarh",
        plant: "Numaligarh Refinery Site, Assam",
        localCode: "MAT-NRL-33190",
        materialGroup: "Process Line Valves",
        description: "BALL VALVE 1\" CL300 STAINLESS STEEL CF8M FLANGED ENDS",
        oem: "FLOWSERVE SANMAR",
        mpn: "FS-300-BV-01",
        specSummary: "1\" Bore, ASME CL300, SS316 Equivalent, Fire Safe Certified",
        codePrefix: "IN-EQV-BV-300-",
        matchScore: "94.8%",
        badgeText: "Equivalence Approved — Cross-Enterprise Shareable",
        badgeStyle: "bg-blue-50 text-blue-700 border-blue-300",
        verdictTitle: "Form, Fit & Functional Equivalence Certified",
        verdictDesc: "Interchangeable across public sector surplus exchange.",
        tallyRows: [
          { label: "Item / Valve Name", input: "BALL VALVE 1\" CL300", target: "BALL VALVE 1 IN FULL BORE", status: "EQUIV", remark: "Functionally interchangeable" },
          { label: "OEM Manufacturer", input: "FLOWSERVE SANMAR", target: "L&T / FLOWSERVE / AUDCO", status: "EQUIV", remark: "Interoperable approved vendor" },
          { label: "Material Composition", input: "CF8M (SS 316)", target: "STAINLESS STEEL ASTM A351 CF8M", status: "MATCH", remark: "Metallurgical standard matches" },
          { label: "Catalog Reference Code", input: "MAT-NRL-33190", target: "NAT-CAT-BV-03-300", status: "EQUIV", remark: "Mapped under Equivalence Pool" },
          { label: "Manufacturer Part No (MPN)", input: "FS-300-BV-01", target: "CROSS_OEM_FAMILY", status: "EQUIV", remark: "Cross-referenced part family" },
          { label: "Size Dimension", input: "1 Inch (DN 25)", target: "1 Inch (DN 25)", status: "MATCH", remark: "100% Dimensional match" },
          { label: "Pressure Rating No.", input: "300 # (Class 300)", target: "300 # (Class 300)", status: "MATCH", remark: "Pressure numbers aligned" }
        ]
      }
    ]
  }
};

export default function ReconcileQueue() {
  const [selectedCase, setSelectedCase] = useState("CASE-A");
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);

  const activeCaseConfig = CASE_DATA[selectedCase];
  const [editableData, setEditableData] = useState(activeCaseConfig.cpsePresets[0]);

  const [isProcessing, setIsProcessing] = useState(false);
  const [adjudicationResult, setAdjudicationResult] = useState(null);

  const [isGeneratingCode, setIsGeneratingCode] = useState(false);
  const [generatedNationalCode, setGeneratedNationalCode] = useState(null);
  const [copied, setCopied] = useState(false);

  // Switch Case
  const handleCaseChange = (caseKey) => {
    setSelectedCase(caseKey);
    setSelectedPresetIndex(0);
    setEditableData({ ...CASE_DATA[caseKey].cpsePresets[0] });
    setAdjudicationResult(null);
    setGeneratedNationalCode(null);
    setCopied(false);
  };

  // Switch Company Preset
  const handlePresetSelect = (idx) => {
    setSelectedPresetIndex(idx);
    setEditableData({ ...activeCaseConfig.cpsePresets[idx] });
    setAdjudicationResult(null);
    setGeneratedNationalCode(null);
    setCopied(false);
  };

  const handleInputChange = (field, value) => {
    setEditableData((prev) => ({ ...prev, [field]: value }));
    setAdjudicationResult(null);
    setGeneratedNationalCode(null);
  };

  const handleRunAdjudication = () => {
    setIsProcessing(true);
    setAdjudicationResult(null);
    setGeneratedNationalCode(null);
    setCopied(false);

    setTimeout(() => {
      setAdjudicationResult({
        scenarioType: activeCaseConfig.scenarioType,
        badgeText: editableData.badgeText,
        badgeStyle: editableData.badgeStyle,
        verdictTitle: editableData.verdictTitle,
        verdictDesc: editableData.verdictDesc,
        matchScore: editableData.matchScore,
        tallyRows: editableData.tallyRows
      });
      setIsProcessing(false);
    }, 500);
  };

  const handleGetNationalCode = () => {
    setIsGeneratingCode(true);
    setTimeout(() => {
      const prefix = editableData.codePrefix || "IN-MAT-";
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      setGeneratedNationalCode(`${prefix}${randomCode}`);
      setIsGeneratingCode(false);
    }, 400);
  };

  const handleCopyCode = () => {
    if (generatedNationalCode) {
      navigator.clipboard.writeText(generatedNationalCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 text-slate-800">

      {/* 1. Case Selector Strip */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Select Test Adjudication Scenario</h2>
          <p className="text-xs text-slate-500">Pick one of 4 distinct real-world CPSE audit scenarios.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {Object.keys(CASE_DATA).map((k) => (
            <button
              key={k}
              onClick={() => handleCaseChange(k)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition ${
                selectedCase === k
                  ? "bg-blue-700 text-white border-blue-700 shadow-sm"
                  : "bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100"
              }`}
            >
              {CASE_DATA[k].name.split(":")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Interactive Record Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              {activeCaseConfig.name}
            </span>
            <p className="text-xs text-slate-500 mt-0.5">Edit inputs or switch company to observe distinct audit behavior.</p>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-500 whitespace-nowrap">Source CPSE:</label>
            <div className="relative">
              <select
                value={selectedPresetIndex}
                onChange={(e) => handlePresetSelect(Number(e.target.value))}
                className="appearance-none bg-white border border-slate-300 hover:border-blue-500 text-slate-800 text-xs font-bold py-1.5 pl-3 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                {activeCaseConfig.cpsePresets.map((preset, idx) => (
                  <option key={idx} value={idx}>
                    {preset.cpseName}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Form Inputs Stacked */}
        <div className="p-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Incoming Material Description (ERP Raw Text)
            </label>
            <input
              type="text"
              value={editableData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="w-full text-sm font-bold text-slate-900 px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Local Material Code (ERP ID)
            </label>
            <input
              type="text"
              value={editableData.localCode}
              onChange={(e) => handleInputChange("localCode", e.target.value)}
              className="w-full font-mono text-sm font-bold text-slate-800 bg-white border border-slate-300 rounded-lg px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Enterprise & Plant Location
            </label>
            <input
              type="text"
              value={editableData.plant}
              onChange={(e) => handleInputChange("plant", e.target.value)}
              className="w-full text-sm font-medium text-slate-800 bg-white border border-slate-300 rounded-lg px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Original Equipment Manufacturer (OEM)
            </label>
            <input
              type="text"
              value={editableData.oem}
              onChange={(e) => handleInputChange("oem", e.target.value)}
              className="w-full text-sm font-medium text-slate-800 bg-white border border-slate-300 rounded-lg px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Manufacturer Part Number (MPN / Model)
            </label>
            <input
              type="text"
              value={editableData.mpn}
              onChange={(e) => handleInputChange("mpn", e.target.value)}
              className="w-full font-mono text-sm font-bold text-slate-800 bg-white border border-slate-300 rounded-lg px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Action Trigger Bar */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-600">
            Execute rule validation and check identity tally against National Standard Catalog.
          </span>
          <button
            onClick={handleRunAdjudication}
            disabled={isProcessing}
            className="w-full sm:w-auto px-6 py-2.5 bg-blue-700 hover:bg-blue-800 disabled:bg-slate-400 text-white font-semibold text-sm rounded-lg shadow-sm transition flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Evaluating Scenario...
              </>
            ) : (
              "Run Adjudication Command"
            )}
          </button>
        </div>
      </div>

      {/* 3. Output Section */}
      {adjudicationResult && !isProcessing && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            
            {/* Header Status Bar */}
            <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-slate-50/70">
              <span className={`px-3 py-1.5 text-xs font-bold rounded-md border ${adjudicationResult.badgeStyle}`}>
                {adjudicationResult.badgeText}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-300">
                  Confidence Score: <strong>{adjudicationResult.matchScore}</strong>
                </span>
                <span className="text-xs text-slate-500 font-mono hidden sm:inline">
                  Source: <strong>{editableData.cpseName}</strong>
                </span>
              </div>
            </div>

            {/* Seamless Attribute Tally List */}
            <div className="p-6 space-y-3">
              {adjudicationResult.tallyRows.map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-3.5 rounded-lg bg-slate-50/70 border border-slate-200 hover:bg-slate-50 transition flex flex-col md:flex-row md:items-center justify-between gap-3"
                >
                  <div className="w-full md:w-5/12">
                    <span className="text-[11px] font-bold uppercase text-slate-400 block mb-0.5">{item.label}</span>
                    <span className="text-xs font-bold text-slate-900">{item.input}</span>
                  </div>

                  <div className="text-slate-400 hidden md:block text-xs">➔</div>

                  <div className="w-full md:w-5/12">
                    <span className="text-[11px] font-bold uppercase text-slate-400 block mb-0.5">National Benchmark Target</span>
                    <span className="text-xs font-semibold text-slate-700">{item.target}</span>
                  </div>

                  <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-slate-200">
                    <span className="text-[11px] text-slate-500 italic hidden lg:inline">{item.remark}</span>
                    
                    {/* Distinct Status Badges for all 4 cases */}
                    {item.status === "MATCH" && (
                      <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200 whitespace-nowrap">
                        MATCHED ✓
                      </span>
                    )}
                    {item.status === "CONFLICT" && (
                      <span className="px-2.5 py-1 rounded bg-rose-50 text-rose-700 font-bold text-xs border border-rose-200 whitespace-nowrap">
                        CONFLICT ✕
                      </span>
                    )}
                    {item.status === "MISMATCH" && (
                      <span className="px-2.5 py-1 rounded bg-rose-50 text-rose-700 font-bold text-xs border border-rose-200 whitespace-nowrap">
                        MISMATCH ✕
                      </span>
                    )}
                    {item.status === "MISSING" && (
                      <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-700 font-bold text-xs border border-amber-200 whitespace-nowrap">
                        MISSING ⚠️
                      </span>
                    )}
                    {item.status === "EQUIV" && (
                      <span className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 font-bold text-xs border border-blue-200 whitespace-nowrap">
                        EQUIVALENT ⟷
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Assessment Note */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs">
              <span className="font-bold text-slate-900">{adjudicationResult.verdictTitle}: </span>
              <span className="text-slate-600">{adjudicationResult.verdictDesc}</span>
            </div>
          </div>

          {/* 4. Distinct Bottom Action Boxes for all 4 Cases */}

          {/* CASE A: Standard Green Code Issuance */}
          {adjudicationResult.scenarioType === "EXACT_MATCH" && (
            <div className="bg-white rounded-xl border border-emerald-200 p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-emerald-900 flex items-center gap-2">
                    <span>🏛️</span> National Material Master Harmonization
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    100% Deterministic match. Ready to generate Standard National Material Master Code.
                  </p>
                </div>

                {!generatedNationalCode ? (
                  <button
                    onClick={handleGetNationalCode}
                    disabled={isGeneratingCode}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg shadow-sm transition flex items-center gap-2"
                  >
                    {isGeneratingCode ? "Generating..." : "Get National Code"}
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="px-3.5 py-1.5 bg-emerald-50 border border-emerald-300 rounded-lg">
                      <span className="text-[10px] uppercase font-bold text-emerald-600 block leading-tight">Assigned National Material Code</span>
                      <span className="font-mono text-sm font-bold text-emerald-900">{generatedNationalCode}</span>
                    </div>
                    <button
                      onClick={handleCopyCode}
                      className="px-3 py-2 text-xs font-semibold rounded-lg border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700"
                    >
                      {copied ? "Copied! ✓" : "Copy"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* CASE B: Safety Gate Hard Blocker Notice */}
          {adjudicationResult.scenarioType === "SAFETY_CONFLICT" && (
            <div className="bg-rose-50 rounded-xl border border-rose-200 p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-rose-900 flex items-center gap-2">
                    <span>🛑</span> Engineering Safety Gate: Code Generation Denied
                  </h4>
                  <p className="text-xs text-rose-700 mt-1">
                    Severe pressure rating conflict detected. Material cannot be merged or shared without mechanical engineering clearance.
                  </p>
                </div>
                <span className="px-3 py-2 bg-white border border-rose-300 text-rose-700 font-bold text-xs rounded-lg">
                  LOCKED BY SAFETY AUDIT
                </span>
              </div>
            </div>
          )}

          {/* CASE C: Incomplete Data / Data Enrichment Prompt */}
          {adjudicationResult.scenarioType === "INSUFFICIENT_DATA" && (
            <div className="bg-amber-50 rounded-xl border border-amber-200 p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-amber-900 flex items-center gap-2">
                    <span>📝</span> Action Required: Upload Engineering Datasheet
                  </h4>
                  <p className="text-xs text-amber-700 mt-1">
                    Missing head and impeller metallurgy parameters. Please supply OEM catalog or data sheet to resume evaluation.
                  </p>
                </div>
                <button
                  onClick={() => alert("Datasheet upload queue opened for BPCL Kochi.")}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs rounded-lg shadow-sm transition"
                >
                  Upload Data Sheet
                </button>
              </div>
            </div>
          )}

          {/* CASE D: Blue Interoperable Equivalence Code */}
          {adjudicationResult.scenarioType === "FUNCTIONAL_EQUIVALENCE" && (
            <div className="bg-white rounded-xl border border-blue-200 p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-blue-900 flex items-center gap-2">
                    <span>⟷</span> Inter-CPSE Equivalence Framework
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Different manufacturers verified as functionally interchangeable under API 6D. Ready for Equivalence Code assignment.
                  </p>
                </div>

                {!generatedNationalCode ? (
                  <button
                    onClick={handleGetNationalCode}
                    disabled={isGeneratingCode}
                    className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs rounded-lg shadow-sm transition flex items-center gap-2"
                  >
                    {isGeneratingCode ? "Certifying..." : "Get Equivalence Code"}
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="px-3.5 py-1.5 bg-blue-50 border border-blue-300 rounded-lg">
                      <span className="text-[10px] uppercase font-bold text-blue-700 block leading-tight">National Equivalence Code</span>
                      <span className="font-mono text-sm font-bold text-blue-900">{generatedNationalCode}</span>
                    </div>
                    <button
                      onClick={handleCopyCode}
                      className="px-3 py-2 text-xs font-semibold rounded-lg border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700"
                    >
                      {copied ? "Copied! ✓" : "Copy"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}