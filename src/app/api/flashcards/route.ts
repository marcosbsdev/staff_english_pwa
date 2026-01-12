import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Prevent static caching

export async function GET() {
    try {
        const cards = await prisma.analysis.findMany({
            orderBy: { createdAt: 'desc' },
            take: 50, // Limit to 50 most recent for now
            select: {
                id: true,
                term: true,
                en_meaning: true,
                en_dev_context: true,
                en_professional_example: true,
                en_pronunciation_tip: true,
                pt_meaning: true,
                pt_dev_context: true,
                pt_professional_example: true,
                pt_pronunciation_tip: true,
            },
        });

        return NextResponse.json(cards);
    } catch (error) {
        console.error('Error fetching flashcards:', error);
        return NextResponse.json(
            { error: 'Failed to fetch flashcards' },
            { status: 500 }
        );
    }
}
