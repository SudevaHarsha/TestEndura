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

import { db } from "@/lib/db";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    console.log(params.sessionId);
    const testSession = await db.testSession.findUnique({
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
      (total, question) => (total + (question?.marks ? question?.marks : 2)),
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
      sessionAnswers.filter((answer) => answer.length === 0)
        .length
    }`;
    const unattempted = `${
      sessionAnswers.filter((answer) => answer.length === 0)
        .length
    }`;
    const totalMarks = `${testSession.resultMarks}/${totalTestMarks}`;
    const totalTime = `${(
      (endISOString.getTime() - startISOString.getTime()) /
      (1000 * 60)
    ).toFixed(2)}/${testSession?.test?.overallDuration}`;

    //section-wise Analysis

    const sectionAnalysis = {};

    testSession.test.sections.forEach((section, index) => {
      const SectionQuestions = sections[section];

      const valuesArray = Object.values(sections);

      const lengths = valuesArray.map((innerArray) => innerArray.length);

      console.log(lengths);

      const previousSectionsLengths = lengths.slice(0, index);
      const previousLength = previousSectionsLengths.reduce((sum, current) => sum + current,0);

      const startISOString =
        index === 0
          ? new Date(testSession?.createdAt)
          : new Date(testSession?.sectionEndTimes[index - 0]);
      const endISOString = new Date(testSession?.sectionEndTimes[index]);

      const sectionCorrectAnswers = `${
        testSession?.results.slice(previousLength,previousLength+SectionQuestions.length).filter((result) => result === true).length
      }`;
      const SectionWrongAnswers = `${
        testSession?.results.slice(previousLength,previousLength+SectionQuestions.length).filter((result) => result === false).length -
        sessionAnswers.slice(previousLength,previousLength+SectionQuestions.length).filter((answer) => answer.length === 0)
          .length
      }`;
      const sectionUnattempted = `${
        sessionAnswers.slice(previousLength,previousLength+SectionQuestions.length).filter((answer) => answer.length === 0)
          .length
      }`;
      const totalSectionTime = `${(
        (endISOString.getTime() - startISOString.getTime()) /
        (1000 * 60)
      ).toFixed(2)}/${testSession?.test?.sectionDuration[index]}`;
      const AvgTimePerQuestion = totalSectionTime < 1 ? 0 : totalSectionTime/SectionQuestions.length;
      const accuracy = sectionCorrectAnswers === 0 ? 0 : (sectionCorrectAnswers/SectionQuestions.length) * 100;
      const totalSectionMarks = testSession.questionMarks.slice(previousLength,previousLength+SectionQuestions.length).reduce((total, question) => (total + (question.marks ? question?.marks : 2)),0);
      const userSectionMarks = testSession.questionMarks.slice(previousLength,previousLength+SectionQuestions.length).reduce((total, question) => (total + question),0);

      sectionAnalysis[section] = {
        sectionName: section,
        totalSectionTime,
        totalSectionMarks,
        userSectionMarks,
        sectionCorrectAnswers,
        SectionWrongAnswers,
        sectionUnattempted,
        AvgTimePerQuestion,
        accuracy: accuracy.toFixed(2)
    };
    });

    const response = {
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
      sectionAnalysis
    };

    console.log("Analytics fetched:", response);
    return NextResponse.json({ response, response });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.error(error, { status: 500 });
  }
}

const JsonToArray = (currentSession) => {
  if (currentSession.sessionAnswers && !Array.isArray(currentSession?.sessionAnswers)) {
    const arrayOfValues = Object.values(currentSession.sessionAnswers);

    return arrayOfValues;
  }
  return currentSession.sessionAnswers;
}