"use client";

import { useState } from "react";

export default function TestAnalyzePage() {
    const [text, setText] = useState("");
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [language, setLanguage] = useState<"en" | "pt">("en");

    const handleAnalyze = async () => {
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
                throw new Error(data.error || "Failed to analyze");
            }

            setResult(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const currentResult = result?.[language];

    return (
        <main className="min-h-screen p-8 max-w-2xl mx-auto bg-white dark:bg-[#0a0a0a] text-black dark:text-white">
            <h1 className="text-2xl font-bold mb-4">Gemini API Test</h1>

            <div className="flex flex-col gap-4">
                <textarea
                    className="w-full border p-2 rounded bg-white text-black border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                    rows={5}
                    placeholder="Enter English text to analyze..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <button
                    onClick={handleAnalyze}
                    disabled={loading || !text}
                    className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-blue-700 transition font-medium"
                >
                    {loading ? "Analyzing..." : "Analyze"}
                </button>

                {error && (
                    <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded border border-red-200 dark:border-red-800">
                        {error}
                    </div>
                )}

                {result && (
                    <div className="flex flex-col gap-4">
                        <div className="flex border-b border-gray-200 dark:border-gray-800">
                            <button
                                onClick={() => setLanguage("en")}
                                className={`px-4 py-2 font-medium transition-colors ${language === "en"
                                        ? "border-b-2 border-blue-600 text-blue-600"
                                        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                    }`}
                            >
                                English
                            </button>
                            <button
                                onClick={() => setLanguage("pt")}
                                className={`px-4 py-2 font-medium transition-colors ${language === "pt"
                                        ? "border-b-2 border-blue-600 text-blue-600"
                                        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                    }`}
                            >
                                Português
                            </button>
                        </div>

                        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-800">
                            <h2 className="font-semibold mb-4 text-lg border-b pb-2">Analysis Result:</h2>
                            <div className="space-y-6">
                                {currentResult ? (
                                    <>
                                        <section>
                                            <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">Meaning</p>
                                            <p className="text-lg">{currentResult.meaning}</p>
                                        </section>
                                        <section>
                                            <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">Dev Context</p>
                                            <p className="italic text-gray-700 dark:text-gray-300">{currentResult.dev_context}</p>
                                        </section>
                                        <section>
                                            <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">Professional Example</p>
                                            <div className="p-3 bg-white dark:bg-black rounded border border-gray-100 dark:border-gray-800 font-mono text-sm uppercase">
                                                {currentResult.professional_example}
                                            </div>
                                        </section>
                                        <section>
                                            <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">Pronunciation Tip</p>
                                            <p>{currentResult.pronunciation_tip}</p>
                                        </section>
                                    </>
                                ) : (
                                    <p className="text-gray-500">No data available for this language.</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
