import React, { useState } from "react";

const INITIAL_SURPLUS_ITEMS = [
  {
    id: "SUR-2026-001",
    materialCode: "MAT-ONGC-40118",
    nationalCode: "IN-MAT-VLV-150-5921",
    itemDescription: "Gate Valve 2\" Class 150 Raised Face WCB Body",
    category: "Piping & Valves",
    holdingCpse: "ONGC Hazira",
    location: "Hazira Complex, Gujarat",
    quantity: 45,
    unit: "Nos",
    condition: "Unused / Surplus",
    bookValue: "₹ 3,82,500",
    status: "Available for Requisition"
  },
  {
    id: "SUR-2026-002",
    materialCode: "MAT-IOCL-88402",
    nationalCode: "IN-MAT-VLV-300-8812",
    itemDescription: "Ball Valve 1\" Full Bore Class 300 SS316 Flanged",
    category: "Valves & Fittings",
    holdingCpse: "IOCL Panipat",
    location: "Panipat Refinery, Haryana",
    quantity: 120,
    unit: "Nos",
    condition: "Factory Sealed",
    bookValue: "₹ 8,40,000",
    status: "Available for Requisition"
  },
  {
    id: "SUR-2026-003",
    materialCode: "MAT-GAIL-77210",
    nationalCode: "IN-MAT-PIP-02-3341",
    itemDescription: "Seamless Carbon Steel Pipe 4\" Sch 40 ASTM A106 Gr B",
    category: "Piping Material",
    holdingCpse: "GAIL Pata",
    location: "Pata Petrochemicals, UP",
    quantity: 350,
    unit: "Meters",
    condition: "Stored Indoors",
    bookValue: "₹ 12,25,000",
    status: "Available for Requisition"
  },
  {
    id: "SUR-2026-004",
    materialCode: "MAT-BPCL-10499",
    nationalCode: "IN-MAT-FLG-08-9901",
    itemDescription: "Weld Neck Flange 6\" Class 300 RF A105",
    category: "Flanges & Fittings",
    holdingCpse: "BPCL Kochi",
    location: "Kochi Refinery, Kerala",
    quantity: 80,
    unit: "Nos",
    condition: "Surplus New",
    bookValue: "₹ 4,16,000",
    status: "Reserved"
  }
];

export default function SurplusExchange() {
  const [items, setItems] = useState(INITIAL_SURPLUS_ITEMS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCpse, setSelectedCpse] = useState("ALL");
  const [requisitionSuccess, setRequisitionSuccess] = useState(null);

  // Filter items based on search and selected CPSE
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.itemDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.materialCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nationalCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCpse =
      selectedCpse === "ALL" ? true : item.holdingCpse.toLowerCase().includes(selectedCpse.toLowerCase());

    return matchesSearch && matchesCpse;
  });

  const handleRequestTransfer = (item) => {
    setRequisitionSuccess(`Requisition Request logged successfully for ${item.itemDescription} (${item.holdingCpse})`);
    setTimeout(() => {
      setRequisitionSuccess(null);
    }, 4000);
  };

  return (
    <div className="space-y-6 text-slate-800">
      
      {/* 1. Header & Quick Metrics */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Inter-CPSE Surplus Material Exchange</h2>
          <p className="text-xs text-slate-500 mt-1">
            Browse idle inventory across public sector enterprises and claim materials with standardized National Codes.
          </p>
        </div>

        {/* Quick Stats Badges */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="px-3.5 py-2 rounded-lg bg-blue-50 border border-blue-200 text-blue-800">
            <span className="block text-[10px] text-blue-600 font-bold uppercase">Total Surplus Listed</span>
            ₹ 28.63 Lakhs
          </div>
          <div className="px-3.5 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800">
            <span className="block text-[10px] text-emerald-600 font-bold uppercase">Participating CPSEs</span>
            4 Enterprises
          </div>
        </div>
      </div>

      {/* Requisition Alert Message */}
      {requisitionSuccess && (
        <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center justify-between">
          <span>✓ {requisitionSuccess}</span>
          <button onClick={() => setRequisitionSuccess(null)} className="text-emerald-700 font-bold ml-4">✕</button>
        </div>
      )}

      {/* 2. Filter & Search Strip */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by name, National Code, or OEM..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs font-medium pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
          />
          <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
        </div>

        {/* CPSE Enterprise Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-xs font-semibold text-slate-500 whitespace-nowrap">Filter by Enterprise:</label>
          <select
            value={selectedCpse}
            onChange={(e) => setSelectedCpse(e.target.value)}
            className="text-xs font-bold py-1.5 px-3 bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="ALL">All CPSEs</option>
            <option value="ONGC">ONGC</option>
            <option value="IOCL">IOCL</option>
            <option value="GAIL">GAIL</option>
            <option value="BPCL">BPCL</option>
          </select>
        </div>

      </div>

      {/* 3. Surplus Materials Catalog Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-600 font-semibold">
                <th className="py-3 px-4">Item & Specification</th>
                <th className="py-3 px-4">National Code</th>
                <th className="py-3 px-4">Holding Enterprise</th>
                <th className="py-3 px-4 text-center">Available Qty</th>
                <th className="py-3 px-4">Est. Value</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-slate-400">
                    No surplus items match your query.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition">
                    
                    {/* Description */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <p className="font-bold text-slate-900 leading-snug">{item.itemDescription}</p>
                      <span className="text-[11px] text-slate-500 block mt-0.5 font-mono">
                        Internal Ref: {item.materialCode}
                      </span>
                    </td>

                    {/* National Harmonized Code */}
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-700">
                      <span className="px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-[11px]">
                        {item.nationalCode}
                      </span>
                    </td>

                    {/* Holding CPSE */}
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-slate-800">{item.holdingCpse}</p>
                      <p className="text-[11px] text-slate-500">{item.location}</p>
                    </td>

                    {/* Quantity */}
                    <td className="py-3.5 px-4 text-center font-bold text-slate-800">
                      {item.quantity} <span className="text-[10px] text-slate-400 font-normal">{item.unit}</span>
                    </td>

                    {/* Value */}
                    <td className="py-3.5 px-4 font-semibold text-slate-700">
                      {item.bookValue}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 text-center">
                      {item.status === "Available for Requisition" ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Available
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          Reserved
                        </span>
                      )}
                    </td>

                    {/* Action Button */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleRequestTransfer(item)}
                        disabled={item.status !== "Available for Requisition"}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-700 hover:bg-blue-800 disabled:bg-slate-200 disabled:text-slate-400 text-white transition shadow-sm"
                      >
                        Claim / Requisition
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}