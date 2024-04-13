import { db } from '@/lib/db';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET(req, res) {
  try {
    const tests = await db.test.findMany();

    if (!tests) {
      return NextResponse.error(new Error('Question type not found'), { status: 404 });
    }

    console.log('Tests fetched:', tests);
    return NextResponse.json({ tests, tests });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.error(error, { status: 500 });
  }
}
