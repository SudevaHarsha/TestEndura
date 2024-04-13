import { db } from '@/lib/db';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';


export async function GET(req, res) {

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

    console.log('Questions divided into sections:', allQuestions);
    return NextResponse.json({ allQuestions });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.error(error, { status: 500 });
  }
}
