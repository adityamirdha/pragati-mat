import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { BarChart3, PieChart as PieIcon, ShieldAlert } from "lucide-react";

export default function SurplusCharts({ opportunities }) {
  if (!opportunities || opportunities.length === 0) return null;

  // 1. Compute CPSE-wise Locked Capital
  const cpseCapitalMap = { ONGC: 0, IOCL: 0, BPCL: 0, GAIL: 0 };

  opportunities.forEach((opp) => {
    opp.holdings.forEach((h) => {
      const cpse = h.cpse ? h.cpse.toUpperCase() : "OTHER";
      const val = (h.stock_qty || 0) * (h.unit_price_inr || 0);
      if (cpseCapitalMap[cpse] !== undefined) {
        cpseCapitalMap[cpse] += val;
      } else {
        cpseCapitalMap[cpse] = val;
      }
    });
  });

  const barData = Object.keys(cpseCapitalMap).map((key) => ({
    name: key,
    capitalCr: Number((cpseCapitalMap[key] / 10000000).toFixed(2)),
  }));

  // 2. Compute Category Distribution
  const categoryMap = {};
  opportunities.forEach((opp) => {
    const spec = opp.material_spec || "General Spare";
    categoryMap[spec] = (categoryMap[spec] || 0) + (opp.total_locked_capital_inr || 0);
  });

  const pieColors = ["#37D9FF", "#6C63FF", "#38EF7D", "#F59E0B", "#EC4899"];
  const pieData = Object.keys(categoryMap).slice(0, 5).map((key, idx) => ({
    name: key,
    value: Number((categoryMap[key] / 100000).toFixed(2)),
    color: pieColors[idx % pieColors.length],
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0B0F16] border border-cyan-500/40 p-2.5 rounded-lg shadow-xl text-xs font-mono">
          <div className="text-slate-300 font-bold">{payload[0].payload.name}</div>
          <div className="text-cyan-300 mt-1">
            Locked: ₹ {payload[0].value} {payload[0].unit || "Cr"}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8">
      {/* CPSE-wise Locked Capital Bar Chart */}
      <div className="lg:col-span-7 bg-[#0B0F16] border border-slate-800/90 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BarChart3 size={16} className="text-cyan-400" />
            <h3 className="text-xs font-bold font-mono tracking-wider text-slate-200 uppercase">
              Locked Capital by CPSE Holding (₹ Cr)
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-500">Live Inventory Valuation</span>
        </div>

        <div className="h-56 w-full font-mono text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
              <Bar dataKey="capitalCr" radius={[6, 6, 0, 0]} unit="Cr">
                {barData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index % 2 === 0 ? "#37D9FF" : "#6C63FF"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Material Spec Share Donut Chart */}
      <div className="lg:col-span-5 bg-[#0B0F16] border border-slate-800/90 rounded-2xl p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <PieIcon size={16} className="text-indigo-400" />
              <h3 className="text-xs font-bold font-mono tracking-wider text-slate-200 uppercase">
                Top Spec Allocations (₹ Lakhs)
              </h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-400">High Recovery</span>
          </div>

          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip content={<CustomTooltip />} />
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={68}
                  paddingAngle={4}
                  dataKey="value"
                  unit="Lakhs"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`slice-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Mini Legend */}
        <div className="grid grid-cols-2 gap-2 text-[11px] font-mono mt-2 pt-2 border-t border-slate-800">
          {pieData.slice(0, 4).map((p, i) => (
            <div key={i} className="flex items-center gap-2 truncate">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
              <span className="text-slate-400 truncate">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}