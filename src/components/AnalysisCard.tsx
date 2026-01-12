import React from 'react';

interface AnalysisData {
    meaning: string;
    dev_context: string;
    professional_example: string;
    pronunciation_tip: string;
}

interface AnalysisCardProps {
    data: {
        en: AnalysisData;
        pt: AnalysisData;
    };
}

export default function AnalysisCard({ data }: AnalysisCardProps) {
    const [lang, setLang] = React.useState<'en' | 'pt'>('en');
    const current = data[lang];

    return (
        <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 border border-zinc-100 dark:border-zinc-800">
            <div className="flex border-b border-zinc-100 dark:border-zinc-800">
                <button
                    onClick={() => setLang('en')}
                    className={`flex-1 py-4 text-sm font-semibold transition-all ${lang === 'en'
                            ? 'text-blue-600 bg-blue-50/50 dark:bg-blue-900/20 shadow-[inset_0_-2px_0_0_#2563eb]'
                            : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
                        }`}
                >
                    English
                </button>
                <button
                    onClick={() => setLang('pt')}
                    className={`flex-1 py-4 text-sm font-semibold transition-all ${lang === 'pt'
                            ? 'text-blue-600 bg-blue-50/50 dark:bg-blue-900/20 shadow-[inset_0_-2px_0_0_#2563eb]'
                            : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
                        }`}
                >
                    Português
                </button>
            </div>

            <div className="p-6 space-y-8">
                <section>
                    <h3 className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2">Meaning</h3>
                    <p className="text-xl font-medium leading-relaxed text-zinc-900 dark:text-zinc-100">
                        {current.meaning}
                    </p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-zinc-50 dark:border-zinc-800/50">
                    <section>
                        <h3 className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2">Dev Context</h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed italic">
                            {current.dev_context}
                        </p>
                    </section>

                    <section>
                        <h3 className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2">Pronunciation</h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            {current.pronunciation_tip}
                        </p>
                    </section>
                </div>

                <section className="pt-4 border-t border-zinc-50 dark:border-zinc-800/50">
                    <h3 className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-3">Professional Example</h3>
                    <div className="p-4 bg-zinc-50 dark:bg-black rounded-xl border border-zinc-100 dark:border-zinc-800/50 font-mono text-xs leading-relaxed text-zinc-800 dark:text-zinc-300">
                        {current.professional_example}
                    </div>
                </section>
            </div>
        </div>
    );
}
