// pages/api/divideQuestionsIntoSections.js

import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, {params}) {

  try {
    const testSession = await db.testSession.findFirst({
      where: {
        id: params.sessionId,
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
            dataInterpretationQuestions: {
              include: {
                questionType: true,
              },
            },
          },
        },
      },
    });

    const questions = [
      ...testSession.test.Questions,
      ...testSession.test.analyticalWritingQuestions,
      ...testSession.test.quantitativeQuestions,
      ...testSession.test.readingComprehensionQuestions,
      ...testSession.test.multipleAnswerQuestions,
      ...testSession.test.multipleChoiceQuestions,
      ...testSession.test.dataInterpretationQuestions,
    ];

    const sections = testSession.test.sections.reduce((acc, section) => {
      const sectionQuestions = questions.filter(
        (question) => question.section === section
      );
      acc[section] = sectionQuestions;
      return acc;
    }, {});

    console.log("Questions divided into sections:", sections);
    return NextResponse.json({ sections, testSession });
  } catch (error) {
    console.error("Error dividing questions into sections:", error);
    return NextResponse.error(error, { status: 500 });
  }
}
