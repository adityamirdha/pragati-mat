import React, { useState } from "react";
import HeroSection from "./components/FuturisticHero"; // Clean Hero
import ReconcileQueue from "./components/ReconcileQueue"; // Console jisme Tally aur National Code hai
import SurplusExchange from "./components/SurplusExchange"; // Clean Exchange Table

export default function App() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col">
      
      {/* 1. Standard Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-700 text-white font-bold flex items-center justify-center text-sm shadow-sm">
              PM
            </div>
            <div>
              <span className="font-bold text-slate-900 text-lg tracking-tight">PRAGATI-MAT</span>
              <span className="hidden sm:inline-block ml-2 text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">MoP&NG</span>
            </div>
          </div>

          <nav className="flex items-center gap-1 sm:gap-2">
            <button 
              onClick={() => setActiveTab("overview")}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "overview" ? "bg-slate-100 text-blue-700" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab("console")}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "console" ? "bg-slate-100 text-blue-700" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Console
            </button>
            <button 
              onClick={() => setActiveTab("exchange")}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "exchange" ? "bg-slate-100 text-blue-700" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Exchange
            </button>
          </nav>
        </div>
      </header>

      {/* 2. Main Content Area */}
      <main className="flex-1">
        {/* OVERVIEW TAB: Sirf Clean Hero Section (Batch Ingestion aur Rule Tester hata diye gaye hain) */}
        {activeTab === "overview" && (
          <HeroSection onOpenConsole={() => setActiveTab("console")} />
        )}

        {/* CONSOLE TAB: Yahan aayega apka Adjudication Console (Tally & National Code wala) */}
        {activeTab === "console" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Adjudication Console</h2>
            <ReconcileQueue />
          </div>
        )}

        {/* EXCHANGE TAB: Clean Surplus Material Exchange Table */}
        {activeTab === "exchange" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <SurplusExchange />
          </div>
        )}
      </main>

      {/* 3. Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2026 Ministry of Petroleum & Natural Gas (MoP&NG). Pragati-Mat Initiative.</span>
          <div className="flex gap-4">
            <span className="hover:text-slate-700 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-700 cursor-pointer">Audit Logs</span>
            <span className="hover:text-slate-700 cursor-pointer">Support</span>
          </div>
        </div>
      </footer>

    </div>
  );
}