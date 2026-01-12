"use client";

import { useState } from "react";
import Header from "@/components/Header";
import TextInput from "@/components/TextInput";
import Link from "next/link";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
import AnalysisCard from "@/components/AnalysisCard";

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze text. Please try again.");
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans selection:bg-blue-100 selection:text-blue-900">
      <Header />

      <main className="pt-32 pb-20 px-6 flex flex-col items-center gap-12 animate-in fade-in duration-700">
        <div className="text-center space-y-4 max-w-xl">
          <h2 className="text-4xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
            Master Technical <span className="text-blue-600">English</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed">
            Translate and analyze software engineering terms with AI context, professional examples, and pronunciation tips.
          </p>
        </div>

        <TextInput
          value={text}
          onChange={setText}
          onAnalyze={handleAnalyze}
          isLoading={loading}
        />

        <Link
          href="/study"
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 hover:from-cyan-500/20 hover:to-blue-500/20 border border-cyan-500/20 rounded-full text-cyan-600 dark:text-cyan-400 text-sm font-semibold transition-all group"
        >
          <AcademicCapIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
          Start Study Mode
        </Link>

        {error && (
          <div className="w-full max-w-2xl p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {result && <AnalysisCard data={result} />}

        {!result && !loading && !error && (
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-zinc-300 dark:text-zinc-800 text-[10px] font-bold uppercase tracking-widest">
              Try analyzing expressions like
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {["Feature Flag", "Tech Debt", "Pull Request", "Edge Case"].map((item) => (
                <button
                  key={item}
                  onClick={() => setText(item)}
                  className="px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="py-12 border-t border-zinc-100 dark:border-zinc-900 text-center">
        <p className="text-xs text-zinc-400 dark:text-zinc-600 font-medium tracking-wide">
          © 2026 STAFF ENGLISH • DESIGNED FOR SOFTWARE ENGINEERS
        </p>
      </footer>
    </div>
  );
}
