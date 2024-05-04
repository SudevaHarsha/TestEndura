import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
const { NextResponse } = require("next/server");

export async function GET(req, res) {
  try {
    const results = await db.testSession.findMany({
      where: {
        finished: true,
      },
      include: {
        test: {
          include: {
            Questions: {
              include: {
                questionType: true,
              }
            },
            analyticalWritingQuestions: {
              include: {
                questionType: true,
              }
            },
            quantitativeQuestions: {
              include: {
                questionType: true,
              }
            },
            readingComprehensionQuestions: {
              include: {
                questionType: true,
              }
            },
            multipleAnswerQuestions: {
              include: {
                questionType: true,
              }
            },
            multipleChoiceQuestions: {
              include: {
                questionType: true,
              }
            },
            dataInterpretationQuestions: {
              include: {
                questionType: true,
              }
            },
          },
        },
      },
      orderBy: {
        updatedAt: 'desc', // Sort by createdAt field in descending order
      },
    });
    /* if (!results || results.length === 0) {
      return NextResponse.error(new Error('results not found'), { status: 404 });
    } */

    console.log('results fetched:', results);
    return NextResponse.json({ results });
  } catch (error) {
    console.error('Error fetching results:', error);
    return NextResponse.error(error, { status: 500 });
  }
}
