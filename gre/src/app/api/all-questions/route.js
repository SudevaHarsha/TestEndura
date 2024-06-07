import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const Questions = await db.$transaction([
      db.multipleChoiceQuestion.findMany(),
      db.multipleAnswerQuestion.findMany(),
      db.readingComprehensionQuestion.findMany(),
      db.quantitativeQuestion.findMany(),
      db.analyticalWritingQuestion.findMany(),
      db.dataInterpretationQuestion.findMany(),
    ]);

    const allQuestions = [
      ...Questions[0],
      ...Questions[1],
      ...Questions[2],
      ...Questions[3],
      ...Questions[4],
      ...Questions[5],
    ];

    const headers = new Headers({
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Expires': '0',
      'Pragma': 'no-cache',
    });

    console.log('Questions divided into sections:', allQuestions);
    return new NextResponse(JSON.stringify({ allQuestions }), { headers });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch questions' }), { status: 500 });
  }
}
