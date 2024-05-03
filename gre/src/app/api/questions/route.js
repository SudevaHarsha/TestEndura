// pages/api/questions.js

import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const {
    testId,
    typeId,
    subject,
    questionText,
    prompt,
    numberOfOptions,
    options,
    correctAnswer,
    image,
    select,
    blankType,
    highlighted,
    section,
    numberOfBlanks,
    blankOptions,
    paragraph,
    highlightedSentence,
    Quantity1,
    Quantity2,
    correctSentence,
    numerator,
    denominator,
    units,
    correctNumeric,
    description,
    ImageUrl,
    optionType,
    marks,
    question,
  } = await req.json();
  try {
    console.log(
      testId,
      typeId,
      subject,
      questionText,
      prompt,
      numberOfOptions,
      options,
      correctAnswer,
      image,
      select,
      blankType,
      highlighted,
      section,
      numberOfBlanks,
      blankOptions,
      paragraph,
      highlightedSentence,
      Quantity2,
      correctSentence,
      numerator,
      denominator,
      units,
      correctNumeric,
      description,
      ImageUrl,
      optionType,
      marks,
      question
    );
    /*   const newQuestion = await db.question.create({
      data: {
        testId,
        typeId,
        subject,
        questionText,
        options,
        option: parseInt(correctAnswer.length),
        correctAnswer,
        image,
        select,
        blankType,
        highlighted,
        section,
        numberOfBlanks,
      blankOptions,
      paragraph,
      highlightedSentence
      },
    }); */
    let newQuestion = {};
    const questionTypes = await db.questionType.findMany();

    if (
      questionTypes.find((Qtype) => Qtype.id === typeId)?.type ===
      "AnalyticalWriting"
    ) {
      const sentences = paragraph.split(". ");
      const index = sentences.find((sentence, index) => {
        if (sentence === correctAnswer) return index;
      });
      const newQuestion = await db.analyticalWritingQuestion.create({
        data: {
          testId: "66215457c2573476a4b33f99",
          typeId,
          subject,
          questionText,
          correctAnswer,
          questionText,
          section,
          description,
          marks: parseInt(marks),
          prompt,
        },
      });
    }
    if (
      questionTypes.find((Qtype) => Qtype.id === typeId)?.type ===
      "Reading Comprehension"
    ) {
      const sentences = paragraph.split(". ");
      const index = sentences.find((sentence, index) => {
        if (sentence === correctAnswer) return index;
      });
      const newQuestion = await db.readingComprehensionQuestion.create({
        data: {
          testId: "66215457c2573476a4b33f99",
          typeId,
          subject,
          questionText,
          options,
          option: parseInt(correctAnswer.length),
          correctAnswer: correctAnswer,
          correctSentence: [correctSentence],
          select,
          highlighted,
          section,
          description,
          marks: parseInt(marks),
          paragraph,
          highlightedSentence,
        },
      });
    }
    if (
      questionTypes.find((Qtype) => Qtype.id === typeId)?.type ===
        "MultipleAnswerQuestion" ||
      questionTypes.find((Qtype) => Qtype.id === typeId)?.type ===
        "TextCompletion"
    ) {
      const newQuestion = await db.multipleAnswerQuestion.create({
        data: {
          testId: "66215457c2573476a4b33f99",
          typeId,
          subject,
          questionText,
          options,
          correctAnswer,
          blankType,
          section,
          description,
          marks: parseInt(marks),
          numberOfBlanks,
          blankOptions,
          numerator: parseInt(numerator),
          denominator: parseInt(denominator),
          units,
          correctNumeric: parseInt(correctNumeric),
        },
      });
    }
    if (
      questionTypes.find((Qtype) => Qtype.id === typeId)?.type ===
        "DataInterpretation" ||
      questionTypes.find((Qtype) => Qtype.id === typeId)?.type ===
        "TextCompletion"
    ) {
      const newQuestion = await db.DataInterpretationQuestion.create({
        data: {
          testId: "66215457c2573476a4b33f99",
          typeId,
          subject,
          questionText,
          options,
          correctAnswer,
          optionType,
          section,
          description,
          marks: parseInt(marks),
          images: ImageUrl,
          numerator: parseInt(numerator),
          denominator: parseInt(denominator),
          units,
          correctNumeric: parseInt(correctNumeric),
          question,
        },
      });
    }
    if (questionTypes.find((Qtype) => Qtype.id === typeId)?.type === "MCQ") {
      console.log(ImageUrl[0]);
      const newQuestion = await db.multipleChoiceQuestion.create({
        data: {
          testId: "66215457c2573476a4b33f99",
          typeId,
          subject,
          questionText,
          options,
          option: parseInt(correctAnswer.length),
          correctAnswer,
          image,
          section,
          ImageUrl: ImageUrl[0],
          description,
          marks: parseInt(marks),
        },
      });
    }
    if (
      questionTypes.find((Qtype) => Qtype.id === typeId)?.type ===
      "Quantitative"
    ) {
      const newQuestion = await db.quantitativeQuestion.create({
        data: {
          testId: "66215457c2573476a4b33f99",
          typeId,
          subject,
          questionText,
          options,
          option: parseInt(correctAnswer.length),
          correctAnswer,
          section,
          description,
          marks: parseInt(marks),
          Quantity1,
          Quantity2,
          image,
          ImageUrl1: ImageUrl[0],
          ImageUrl2: ImageUrl[1],
        },
      });
    }

    console.log(newQuestion);
    return new NextResponse(201, newQuestion);
  } catch (error) {
    console.log(error);
    return new NextResponse(500, { error: "Could not create question" });
  }
}

export async function PUT(req, res) {
  const { testId, subject, section, selectedQuestions } = await req.json();
  console.log(testId, subject, selectedQuestions);

  try {
    for (const { id, typeId } of selectedQuestions) {
      const questionType = await db.questionType.findUnique({
        where: {
          id: typeId,
        },
      });

      if (!questionType) {
        console.error(`Question type with ID ${typeId} not found.`);
        continue;
      }

      switch (questionType.type) {
        case "AnalyticalWriting":
          await db.analyticalWritingQuestion.update({
            where: {
              id: id,
            },
            data: {
              testId,
              subject,
              section,
            },
          });
          break;

        case "Reading Comprehension":
          await db.readingComprehensionQuestion.update({
            where: {
              id: id,
            },
            data: {
              testId,
              subject,
              section,
            },
          });
          break;

        case "MultipleAnswerQuestion":
          await db.multipleAnswerQuestion.update({
            where: {
              id: id,
            },
            data: {
              testId,
              subject,
              section,
            },
          });
          break;

        case "DataInterpretation":
          await db.DataInterpretationQuestion.update({
            where: {
              id: id,
            },
            data: {
              testId,
              subject,
              section,
            },
          });
          break;

        case "MCQ":
          await db.multipleChoiceQuestion.update({
            where: {
              id: id,
            },
            data: {
              testId,
              subject,
              section,
            },
          });
          break;

        case "Quantitative":
          await db.quantitativeQuestion.update({
            where: {
              id: id,
            },
            data: {
              testId,
              subject,
              section,
            },
          });
          break;

        default:
          console.error(`Unsupported question type: ${question.type}`);
      }
    }

    return new NextResponse(200, {
      message: "Questions updated successfully.",
    });
  } catch (error) {
    console.error("Error updating questions:", error);
    return new NextResponse(500, { error: "Could not update questions." });
  }
}
