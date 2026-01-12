'use client';

import { useEffect, useState } from 'react';
import FlashcardDeck from '@/components/FlashcardDeck';
import Header from '@/components/Header';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface Flashcard {
    id: string;
    term: string;
    en_meaning: string;
    en_dev_context: string;
    en_professional_example: string;
    en_pronunciation_tip: string;
    pt_meaning: string;
    pt_dev_context: string;
    pt_professional_example: string;
    pt_pronunciation_tip: string;
}

export default function StudyPage() {
    const [cards, setCards] = useState<Flashcard[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCards() {
            try {
                const res = await fetch('/api/flashcards');
                if (res.ok) {
                    const data = await res.json();
                    setCards(data);
                }
            } catch (error) {
                console.error('Failed to load cards', error);
            } finally {
                setLoading(false);
            }
        }
        fetchCards();
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500/30">
            <Header />

            <main className="max-w-xl mx-auto px-4 pt-24 pb-8 flex flex-col items-center">

                <div className="w-full flex items-center justify-between mb-8">
                    <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors">
                        <ArrowLeftIcon className="w-4 h-4" />
                        Back to Analysis
                    </Link>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        Study Mode
                    </h1>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-8 h-8 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
                        <p className="text-slate-500 animate-pulse">Shuffling deck...</p>
                    </div>
                ) : (
                    <FlashcardDeck cards={cards} />
                )}

            </main>
        </div>
    );
}
