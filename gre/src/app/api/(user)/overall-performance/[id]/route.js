/* const testName = 'test-1';
const attempts = 2;
const testDate = '20-12-2004';
const startTime = '18:40';
const endTime = '19:30';
const testScore = 40;
const correctAnswers = 6;
const wrongAnswers = 4;
const unattempted = 10;
const totalMarks = 40;
const totalTime = 70; */

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { finished } from "nodemailer/lib/xoauth2";

export async function GET(req,{params}) {
  try {

    const testSessions = await db.testSession.findMany({
      where: {
        profileId: params.id,
        finished: true,
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

    console.log(testSessions);

    if (!testSessions) {
      return new NextResponse(404);
    }

    const overallPerformance = {}
    let AnalyticalWritingScores = [];
    let VerbalReasoningScores = [];
    let QuantitativeReasoningScores = [];

    testSessions.forEach((testSession, index) => {
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

      const AllQuestions = testSession.test.sections.reduce((acc, section) => {
        return acc.concat([...sections[section]]);
      }, []);

      const totalTestMarks = AllQuestions.reduce(
        (total, question) => total + (question?.marks ? question?.marks : 2),
        0
      );

      if (!AllQuestions) {
        return NextResponse.error(new Error("Question type not found"), {
          status: 404,
        });
      }

      const startISOString = new Date(testSession?.createdAt);
      const endISOString = new Date(
        testSession?.sectionEndTimes[testSession.sectionEndTimes.length - 1]
      );
      const sessionAnswers = JsonToArray(testSession);

      const testDate = startISOString.toISOString().split("T")[0];
      const startTime = `${startISOString.getHours()}:${startISOString.getMinutes()}:${startISOString.getSeconds()}`;
      const endTime = `${endISOString.getHours()}:${endISOString.getMinutes()}:${endISOString.getSeconds()}`;
      const testScore = `${testSession?.resultMarks}/${totalTestMarks}`;
      const correctAnswers = `${
        testSession?.results.filter((result) => result === true).length
      }`;
      const wrongAnswers = `${
        testSession?.results.filter((result) => result === false).length -
        sessionAnswers.filter((answer) => answer.length === 0).length
      }`;
      const unattempted = `${
        sessionAnswers.filter((answer) => answer.length === 0).length
      }`;
      const totalMarks = `${testSession.resultMarks}/${totalTestMarks}`;
      const totalTime = `${(
        (endISOString.getTime() - startISOString.getTime()) /
        (1000 * 60)
      ).toFixed(2)}/${testSession?.test?.overallDuration}`;

      //section-wise Analysis

      testSession.test.sections.forEach((section, index) => {
        const SectionQuestions = sections[section];

        const valuesArray = Object.values(sections);

        const lengths = valuesArray.map((innerArray) => innerArray.length);

        console.log(lengths);

        const previousSectionsLengths = lengths.slice(0, index);
        const previousLength = previousSectionsLengths.reduce(
          (sum, current) => sum + current,
          0
        );

        const sectionCorrectAnswers = `${
          testSession?.results
            .slice(previousLength, previousLength + SectionQuestions.length)
            .filter((result) => result === true).length
        }`;
        const SectionWrongAnswers = `${
          testSession?.results
            .slice(previousLength, previousLength + SectionQuestions.length)
            .filter((result) => result === false).length -
          sessionAnswers
            .slice(previousLength, previousLength + SectionQuestions.length)
            .filter((answer) => answer.length === 0).length
        }`;
        const sectionUnattempted = `${
          sessionAnswers
            .slice(previousLength, previousLength + SectionQuestions.length)
            .filter((answer) => answer.length === 0).length
        }`;
        const accuracy =
          sectionCorrectAnswers === 0
            ? 0
            : (sectionCorrectAnswers / SectionQuestions.length) * 100;

          if(section==='AnalyticalWriting') {
            console.log('entered');
            AnalyticalWritingScores.push(accuracy);
          }
          if(section==='VerbalReasoning1' || section==='VerbalReasoning2') {
            VerbalReasoningScores.push(accuracy);
          }
          if(section==='QuantativeReasoning1' || section==='QuantativeReasoning2') {
            QuantitativeReasoningScores.push(accuracy);
          }

      });
      overallPerformance[index] = {
        testName: testSession?.test?.name,
        testDate,
        startTime,
        endTime,
        testScore,
        correctAnswers,
        wrongAnswers,
        unattempted,
        totalMarks,
        totalTime,
      }
    });

    const AnalyticalPerformance = AnalyticalWritingScores.reduce((total, num) => total + num, 0) === 0 ? 0 :AnalyticalWritingScores.reduce((total, num) => total + num, 0) / AnalyticalWritingScores.length ;
    const VerbalPerformance = VerbalReasoningScores.reduce((total, num) => total + num, 0) === 0 ? 0 :VerbalReasoningScores.reduce((total, num) => total + num, 0) / VerbalReasoningScores.length ;
    const QuantitativePerformance = QuantitativeReasoningScores.reduce((total, num) => total + num, 0) === 0 ? 0 :QuantitativeReasoningScores.reduce((total, num) => total + num, 0) / QuantitativeReasoningScores.length ;

    const response = {
      overallPerformance,
      AnalyticalPerformance,
      VerbalPerformance,
      QuantitativePerformance
    };

    console.log("Performance fetched:", response);
    return NextResponse.json({ response, response });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.error(error, { status: 500 });
  }
}

const JsonToArray = (currentSession) => {
  if (
    currentSession.sessionAnswers &&
    !Array.isArray(currentSession?.sessionAnswers)
  ) {
    const arrayOfValues = Object.values(currentSession.sessionAnswers);

    return arrayOfValues;
  }
  return currentSession.sessionAnswers;
};
