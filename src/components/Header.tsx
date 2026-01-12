import React from 'react';

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 h-20 bg-white/80 dark:bg-black/80 backdrop-blur-md z-50 border-b border-zinc-100 dark:border-zinc-900 px-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-black text-xs">SE</span>
                </div>
                <span className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-50 uppercase">
                    Staff English <span className="text-blue-600">AI</span>
                </span>
            </div>

            <div className="flex items-center gap-4">
                <div className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full">
                    <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-widest">Beta</span>
                </div>
            </div>
        </header>
    );
}
