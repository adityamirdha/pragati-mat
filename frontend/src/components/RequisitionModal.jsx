import React, { useState } from "react";
import { X, Building2, Truck, CheckCircle2, ShieldCheck, ArrowRight, FileText, Download } from "lucide-react";

export default function RequisitionModal({ opportunity, onClose }) {
  const [authorized, setAuthorized] = useState(false);
  const [transferQty, setTransferQty] = useState(
    opportunity ? Math.min(10, opportunity.total_surplus_units) : 1
  );

  if (!opportunity) return null;

  const sourceCPSE = opportunity.holdings[0] || { cpse: "IOCL", location: "Gujarat Refinery", unit_price_inr: 45000 };
  const targetCPSE = opportunity.holdings[1] || { cpse: "ONGC", location: "Hazira Plant", unit_price_inr: 45000 };

  const requisitionId = `REQ-MOPNG-${opportunity.cluster_id}-${Math.floor(1000 + Math.random() * 9000)}`;
  const savedCapitalINR = transferQty * (sourceCPSE.unit_price_inr || 25000);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0B0F16] border border-cyan-500/40 rounded-2xl shadow-[0_0_60px_rgba(55,217,255,0.2)] p-6 md:p-8 text-slate-100">
        {/* Top Header */}
        <div className="flex justify-between items-start border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/40">
                MoP&NG INTER-CPSE PROTOCOL
              </span>
              <span className="text-xs font-mono text-slate-400">#{requisitionId}</span>
            </div>
            <h2 className="text-xl font-bold text-slate-100 mt-1">Inter-CPSE Material Transfer Requisition</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        {!authorized ? (
          <div className="space-y-6 mt-6">
            {/* Specification Badge */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-500 uppercase tracking-wider block font-mono">Standard Canonical Specification</span>
              <div className="text-base font-bold text-cyan-300 mt-0.5">{opportunity.material_spec}</div>
              <div className="text-xs font-mono text-slate-400 mt-1">
                DN: {opportunity.dimension || "N/A"} • Rating: {opportunity.class || "N/A"} • Target UNSPSC: 40141607
              </div>
            </div>

            {/* Transfer Route Vector */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 text-xs">
              <div className="space-y-1">
                <span className="text-slate-500 font-mono">SURPLUS ORIGIN (DONOR)</span>
                <div className="font-bold text-amber-400 flex items-center gap-1.5">
                  <Building2 size={14} /> {sourceCPSE.cpse}
                </div>
                <div className="text-slate-400">{sourceCPSE.location}</div>
                <div className="text-slate-500 font-mono">In Stock: {sourceCPSE.stock_qty} Units</div>
              </div>

              <div className="flex flex-col items-center justify-center py-2 md:py-0 border-y md:border-y-0 md:border-x border-slate-800">
                <Truck size={20} className="text-cyan-400 animate-pulse mb-1" />
                <span className="text-[10px] font-mono text-cyan-400 font-semibold">SOVEREIGN FREIGHT</span>
                <span className="text-[10px] text-slate-500">Transit ETA: 36 Hrs</span>
              </div>

              <div className="space-y-1 md:text-right">
                <span className="text-slate-500 font-mono">REQUISITIONING SISTER CPSE</span>
                <div className="font-bold text-cyan-400 flex items-center md:justify-end gap-1.5">
                  <Building2 size={14} /> {targetCPSE.cpse}
                </div>
                <div className="text-slate-400">{targetCPSE.location}</div>
                <div className="text-emerald-400 font-mono">Avoids Fresh Tender</div>
              </div>
            </div>

            {/* Quantity Slider & Financial Metric */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <label className="text-xs text-slate-400 block mb-2 font-mono">
                  Units to Requisition (Max: {opportunity.total_surplus_units})
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1"
                    max={opportunity.total_surplus_units}
                    value={transferQty}
                    onChange={(e) => setTransferQty(parseInt(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                  <span className="font-mono font-bold text-lg text-cyan-300 w-12 text-right">
                    {transferQty}
                  </span>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-center">
                <span className="text-xs text-slate-400 font-mono">Immediate Locked Capital Saved</span>
                <div className="text-xl font-mono font-bold text-emerald-400 mt-1">
                  ₹ {(savedCapitalINR / 100000).toFixed(2)} Lakhs
                </div>
                <span className="text-[10px] text-slate-500">Direct Capex Outflow Averted</span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={onClose}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => setAuthorized(true)}
                className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs rounded-xl shadow-[0_0_25px_rgba(55,217,255,0.35)] transition duration-200 cursor-pointer flex items-center gap-2"
              >
                <ShieldCheck size={16} /> Authorize Sovereign Transfer
              </button>
            </div>
          </div>
        ) : (
          /* Success Receipt View */
          <div className="text-center py-10 space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-xl font-bold text-slate-100">Transfer Requisition Formally Logged</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              Order <span className="font-mono text-cyan-300">#{requisitionId}</span> has been dispatched to {sourceCPSE.cpse} Central Stores and notified to {targetCPSE.cpse} Materials Management Division.
            </p>

            <div className="p-4 bg-slate-950 max-w-md mx-auto rounded-xl border border-slate-800 text-xs font-mono text-slate-300 text-left space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Material Spec:</span>
                <span className="font-bold text-white">{opportunity.material_spec}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Transferred Units:</span>
                <span className="font-bold text-cyan-300">{transferQty} Units</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Capex Preserved:</span>
                <span className="font-bold text-emerald-400">₹ {(savedCapitalINR / 100000).toFixed(2)} L</span>
              </div>
            </div>

            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}