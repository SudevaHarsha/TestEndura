// pages/api/evaluate-quiz.js

import { NextResponse } from 'next/server';
import { db } from "@/lib/db";
import { data } from 'autoprefixer';

export async function GET(req,{params}) {

  try {
    // Fetch questions for the given test session
    console.log(params.sessionId);
    const testSession = await db.testSession.update({
        where: {
          id: params.sessionId,
        },
        data: {
          finished: true
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

      console.log(testSession);

    if (!testSession) {
      return new NextResponse(404);
    }

    const questions = [
      ...testSession.test.Questions,
      ...testSession.test.analyticalWritingQuestions,
      ...testSession.test.quantitativeQuestions,
      ...testSession.test.readingComprehensionQuestions,
      ...testSession.test.multipleAnswerQuestions,
      ...testSession.test.multipleChoiceQuestions,
    ];

    const sections = testSession.test.sections.reduce((acc, section) => {
      const sectionQuestions = questions.filter(
        (question) => question.section === section
      );
      acc[section] = sectionQuestions;
      return acc;
    }, {});

/*     let AllQuestions = [];
 */
    const AllQuestions = testSession.test.sections.reduce((acc, section) => {
      return acc.concat([...sections[section]])
    },[]);

    console.log("ALL",AllQuestions)

    return new NextResponse(200, { AllQuestions });
  } catch (error) {
    console.error('Error evaluating quiz:', error);
    return new NextResponse(500);
  }
}

// Utility function to check if two arrays are equal
function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}
