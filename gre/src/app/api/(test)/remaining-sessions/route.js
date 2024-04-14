import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
const { NextResponse } = require("next/server");

export async function GET(req, res) {
  try {
    const filteredSessions = await db.testSession.findMany({
        where: {
          finished: false
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
            },
          },
        },
      });

    console.log('remaining sessions fetched:', filteredSessions);
    return NextResponse.json({ filteredSessions });
  } catch (error) {
    console.error('Error fetching results:', error);
    return NextResponse.error(error, { status: 500 });
  }
}
