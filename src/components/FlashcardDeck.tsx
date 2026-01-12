'use client';

import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface Flashcard {
    id: string;
    term: string;
    en_meaning: string;
    pt_meaning: string;
}

interface FlashcardDeckProps {
    cards: Flashcard[];
}

export default function FlashcardDeck({ cards }: FlashcardDeckProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [showPortuguese, setShowPortuguese] = useState(false);

    if (cards.length === 0) {
        return (
            <div className="text-center p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
                <p className="text-slate-400">No terms analyzed yet. Go back and analyze some terms!</p>
            </div>
        );
    }

    const currentCard = cards[currentIndex];

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % cards.length);
        }, 200);
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
        }, 200);
    };

    return (
        <div className="w-full max-w-md mx-auto perspective-1000">
            <div className="relative h-80 w-full cursor-pointer group" onClick={() => setIsFlipped(!isFlipped)}>
                <div
                    className={`absolute inset-0 w-full h-full duration-500 preserve-3d transition-transform ${isFlipped ? 'rotate-y-180' : ''
                        }`}
                >
                    {/* Front of Card (Term) */}
                    <div className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-2xl shadow-xl flex flex-col items-center justify-center p-8">
                        <span className="text-xs font-mono text-cyan-400 mb-2 uppercase tracking-wider">Term</span>
                        <h2 className="text-3xl font-bold text-white text-center capitalize">{currentCard.term}</h2>
                        <p className="mt-4 text-slate-400 text-sm flex items-center gap-2">
                            <ArrowPathIcon className="w-4 h-4" /> Tap to flip
                        </p>
                    </div>

                    {/* Back of Card (Meaning) */}
                    <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-white border border-slate-200 rounded-2xl shadow-xl flex flex-col p-8 bg-gradient-to-br from-white to-slate-50">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Meaning</span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowPortuguese(!showPortuguese);
                                }}
                                className="text-xs font-bold px-2 py-1 rounded bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                            >
                                {showPortuguese ? '🇺🇸 Show EN' : '🇧🇷 Show PT'}
                            </button>
                        </div>

                        <div className="flex-1 flex items-center justify-center overflow-y-auto">
                            <p className="text-slate-700 text-lg text-center leading-relaxed">
                                {showPortuguese ? currentCard.pt_meaning : currentCard.en_meaning}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between mt-8 px-4">
                <button
                    onClick={handlePrev}
                    className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10"
                >
                    <ChevronLeftIcon className="w-6 h-6" />
                </button>

                <span className="font-mono text-slate-400 text-sm">
                    {currentIndex + 1} / {cards.length}
                </span>

                <button
                    onClick={handleNext}
                    className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10"
                >
                    <ChevronRightIcon className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}
