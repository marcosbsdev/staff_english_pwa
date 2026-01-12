import React from 'react';

interface TextInputProps {
    value: string;
    onChange: (value: string) => void;
    onAnalyze: () => void;
    isLoading: boolean;
}

export default function TextInput({ value, onChange, onAnalyze, isLoading }: TextInputProps) {
    return (
        <div className="w-full max-w-2xl flex flex-col gap-4">
            <div className="relative group">
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Paste a code comment, a pull request description, or any English text..."
                    className="w-full min-h-[160px] p-5 text-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                />
                <div className="absolute bottom-4 right-4 text-[10px] text-zinc-400 font-mono">
                    {value.length} characters
                </div>
            </div>

            <button
                onClick={onAnalyze}
                disabled={isLoading || !value.trim()}
                className={`group relative flex items-center justify-center h-14 w-full rounded-2xl font-bold text-white transition-all overflow-hidden ${isLoading || !value.trim()
                        ? 'bg-zinc-200 dark:bg-zinc-800 cursor-not-allowed text-zinc-400'
                        : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg active:scale-[0.98]'
                    }`}
            >
                {isLoading ? (
                    <div className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Analyzing...</span>
                    </div>
                ) : (
                    <span className="flex items-center gap-2">
                        Analyze with AI
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </span>
                )}
            </button>
        </div>
    );
}
