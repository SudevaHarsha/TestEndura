import { db } from '@/lib/db';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 600;
export async function GET(req, res) {
  try {
    const questionTypes = await db.questionType.findMany();

    if (!questionTypes) {
      return NextResponse.error(new Error('Question type not found'), { status: 404 });
    }

    console.log('Questions fetched:', questionTypes);
    return NextResponse.json({ questionTypes, questionTypes });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.error(error, { status: 500 });
  }
}
