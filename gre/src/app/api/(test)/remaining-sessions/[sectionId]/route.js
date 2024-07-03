import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const revalidate = 600;

export async function GET(req, { params }) {
  try {
    const filteredSessions = await db.testSession.findMany({
      where: {
        finished: false,
        test: {
          testSectionId: params.sectionId,
        },
      },
      include: {
        test: {
          include: {
            Questions: {
              include: {
                questionType: true,
              },
            },
            analyticalWritingQuestions: {
              include: {
                questionType: true,
              },
            },
            quantitativeQuestions: {
              include: {
                questionType: true,
              },
            },
            readingComprehensionQuestions: {
              include: {
                questionType: true,
              },
            },
            multipleAnswerQuestions: {
              include: {
                questionType: true,
              },
            },
            multipleChoiceQuestions: {
              include: {
                questionType: true,
              },
            },
          },
        },
      },
    });

    console.log('Remaining sessions fetched:', filteredSessions);
    return NextResponse.json({ filteredSessions });
  } catch (error) {
    console.error('Error fetching results:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
