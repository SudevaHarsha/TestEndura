// pages/api/evaluate-quiz.js

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { data } from "autoprefixer";
import { sendEmailToTeacher } from "@/lib/send-email";
import questions from "@/data/Questions";
import assessEssay from "@/lib/assessEssay";

export async function POST(req, res) {
  const { sessionId } = await req.json();

  try {
    // Fetch questions for the given test session
    console.log(sessionId);
    const testSession = await db.testSession.update({
      where: {
        id: sessionId,
      },
      data: {
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

    /*     let AllQuestions = [];
     */
    const AllQuestions = testSession.test.sections.reduce((acc, section) => {
      return acc.concat([...sections[section]]);
    }, []);

    console.log("ALL", AllQuestions);

    // Evaluate the answers and store results in an array
    const results = [];
    let resultMarks = 0;
    let questionMarks = [];

    console.log(testSession.sessionAnswers);

    const entries = Object.entries(testSession.sessionAnswers);
    for (let i = 0; i < entries.length; i++) {
      const [questionId, userAnswer] = entries[i];
      const question = AllQuestions[questionId];
      const index = i;
      console.log(questionId, question, i);
      if (!question) {
        return new NextResponse(500);
      }

      const correctAnswer = question?.select
        ? question?.correctSentence
        : question.correctAnswer || [];

      const marks = question?.marks || 2;

      let isCorrect = question?.select
        ? correctAnswer === userAnswer[0]
        : arraysEqual(
            userAnswer.sort(),
            correctAnswer.sort(),
            marks,
            questionMarks,
            resultMarks,
            index
          );
      if (
        (question.blankType === "fraction" ||
          question.optionType === "fraction") &&
        question?.denominator > 0
      ) {
        console.log(userAnswer[0]);
        console.log(userAnswer[1]);
        let isNumerator = userAnswer[0] === question?.numerator;
        let isDenominator = userAnswer[1] === question?.denominator;
        console.log(isDenominator, isNumerator);
        isCorrect = isNumerator && isDenominator;
        if (isCorrect) {
          console.log("final");
          resultMarks += marks;
          questionMarks[index] = marks;
        }
        if (!isCorrect) {
          console.log("final");
          resultMarks += 0;
          questionMarks[index] = 0;
        }
        console.log(questionMarks, resultMarks);
      }
      if (
        question.blankType === "numeric units" ||
        question.optionType === "numeric units"
      ) {
        console.log(userAnswer[0]);
        console.log(userAnswer[1]);
        let isNumeric = userAnswer[0] === question?.correctNumeric;
        let isUnits = userAnswer[1] === question?.units;
        console.log(isNumeric, isUnits);
        isCorrect = isNumeric && isUnits;
        if (isNumeric && isUnits) {
          resultMarks += marks;
          questionMarks[index] = marks;
        }
        if (!isCorrect) {
          resultMarks += 0;
          questionMarks[index] = 0;
        }

        console.log(questionMarks, resultMarks);
      }
      if (
        (question.blankType === "numeric" ||
          question.optionType === "numeric") &&
        question?.correctNumeric > 0
      ) {
        console.log(userAnswer[0]);
        let isNumeric = userAnswer[0] === question?.correctNumeric;
        console.log(isNumeric);
        isCorrect = isNumeric;
        if (isNumeric) {
          resultMarks += marks;
          questionMarks[index] = marks;
        }
        console.log(questionMarks, resultMarks);
      }
      if (question?.select === true) {
        console.log(
          userAnswer[0],
          question?.correctSentence.includes(userAnswer[0])
        );
        const isSentence = question.correctSentence.includes(userAnswer[0]);
        console.log(isSentence);
        isCorrect = isSentence;
        if (isSentence) {
          resultMarks += marks;
          questionMarks[index] = marks;
          console.log(questionMarks);
        } else {
          questionMarks[index] = 0;
        }
        console.log(questionMarks, resultMarks);
      }
      if (question.questionType.type === "AnalyticalWriting") {
        const assessment = await assessEssay(question.prompt, userAnswer[0]);

        console.log(assessment);
        questionMarks[index] = marks;
        console.log(questionMarks, resultMarks);
        await sendEmailToTeacher(userAnswer[0]);
      }
      if (
        (correctAnswer.length === 0 || userAnswer.length === 0) &&
        question.blankType === ""
      ) {
        console.log("default");
        questionMarks[index] = 0;
      }
      results.push(isCorrect);
    }

    console.log(
      results,
      questionMarks.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      )
    );

    const resultSession = await db.testSession.update({
      where: {
        id: sessionId,
      },
      data: {
        results: results,
        resultMarks: questionMarks.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        ),
        questionMarks: questionMarks,
      },
    });

    return new NextResponse(200, { results });
  } catch (error) {
    console.error("Error evaluating quiz:", error);
    return new NextResponse(500);
  }
}

// Utility function to check if two arrays are equal
function arraysEqual(arr1, arr2, marks, questionMarks, resultMarks, index) {
  let multipleChoiceMarks = 0;

  if (arr1.length === 0 || arr2.length === 0) {
    questionMarks[index] = 0;
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] === arr2[i]) {
      multipleChoiceMarks = multipleChoiceMarks + marks / arr2.length;
    } else {
      questionMarks[index] = 0;
      return false;
    }
  }
  questionMarks[index] = multipleChoiceMarks;
  resultMarks = resultMarks + multipleChoiceMarks;
  console.log(questionMarks, resultMarks);
  return true;
}
