import prisma from '@/lib/prisma';
import { NextResponse as NextResp } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { text } = body;

        if (!text || typeof text !== 'string') {
            return NextResp.json({ error: 'Text is required' }, { status: 400 });
        }

        const normalizedTerm = text.trim().toLowerCase();

        // 1. Check cache (PostgreSQL)
        const cached = await prisma.analysis.findUnique({
            where: { term: normalizedTerm }
        });

        if (cached) {
            console.log(`Cache hit for: ${normalizedTerm}`);
            return NextResp.json({
                en: {
                    meaning: cached.en_meaning,
                    dev_context: cached.en_dev_context,
                    professional_example: cached.en_professional_example,
                    pronunciation_tip: cached.en_pronunciation_tip
                },
                pt: {
                    meaning: cached.pt_meaning,
                    dev_context: cached.pt_dev_context,
                    professional_example: cached.pt_professional_example,
                    pronunciation_tip: cached.pt_pronunciation_tip
                }
            });
        }

        if (!process.env.GEMINI_API_KEY) {
            return NextResp.json({ error: 'GEMINI_API_KEY is not configured' }, { status: 500 });
        }

        const systemPrompt = `Você é um Professor de Inglês para Engenheiros de Software. 
    Analise o texto e retorne um JSON com dois objetos: "en" (em inglês) e "pt" (traduzido para português).
    Cada objeto deve conter: meaning, dev_context, professional_example e pronunciation_tip.`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `${systemPrompt}\n\nUser text: ${normalizedTerm}` }] }],
                generationConfig: { responseMimeType: "application/json" }
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Gemini API Error:', data.error);
            const isQuotaError = data.error?.status === 'RESOURCE_EXHAUSTED';
            return NextResp.json({
                error: isQuotaError ? 'Quota exceeded' : (data.error?.message || 'AI service error')
            }, { status: 500 });
        }

        try {
            let content = data.candidates[0].content.parts[0].text;
            const firstBrace = content.indexOf('{');
            const lastBrace = content.lastIndexOf('}');
            if (firstBrace !== -1 && lastBrace !== -1) {
                content = content.substring(firstBrace, lastBrace + 1);
            }

            const result = JSON.parse(content);

            // 2. Save to database (background-ish, but let's wait here for reliability)
            await prisma.analysis.create({
                data: {
                    term: normalizedTerm,
                    en_meaning: result.en.meaning,
                    en_dev_context: result.en.dev_context,
                    en_professional_example: result.en.professional_example,
                    en_pronunciation_tip: result.en.pronunciation_tip,
                    pt_meaning: result.pt.meaning,
                    pt_dev_context: result.pt.dev_context,
                    pt_professional_example: result.pt.professional_example,
                    pt_pronunciation_tip: result.pt.pronunciation_tip,
                }
            });

            return NextResp.json(result);
        } catch (parseError) {
            console.error("Failed to parse/save Gemini response:", parseError);
            return NextResp.json({ error: 'Invalid response format from AI' }, { status: 500 });
        }

    } catch (error: any) {
        console.error('Request Error:', error);
        return NextResp.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}