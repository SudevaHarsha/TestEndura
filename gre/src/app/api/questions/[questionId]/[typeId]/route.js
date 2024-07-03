import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
const { NextResponse } = require("next/server");

export async function GET(req, { params }) {
  /*  const {id} = await req.params; */

  try {
    const typeId = params.typeId;
    const questionTypes = await db.questionType.findMany();

    const profile = await currentProfile();

    if(profile.role != 'admin') {
      return NextResponse.error(new Error("Unauthorized"), { status: 404 });
    }
    let Question = [];

    if (
      questionTypes.find((Qtype) => Qtype.id === typeId)?.type ===
      "Analytical Writing"
    ) {
      Question = await db.analyticalWritingQuestion.findUnique({
        where: { id: params.questionId },
      });
    }
    if (
      questionTypes.find((Qtype) => Qtype.id === typeId)?.type ===
      "Reading Comprehension"
    ) {
      Question = await db.readingComprehensionQuestion.findUnique({
        where: { id: params.questionId },
      });
    }
    if (
      questionTypes.find((Qtype) => Qtype.id === typeId)?.type ===
      "MultipleAnswerQuestion"
    ) {
      Question = await db.multipleAnswerQuestion.findUnique({
        where: { id: params.questionId },
      });
    }
    if (
      questionTypes.find((Qtype) => Qtype.id === typeId)?.type ===
      "TextCompletion"
    ) {
      Question = await db.multipleAnswerQuestion.findUnique({
        where: { id: params.questionId },
      });
    }
    if (
      questionTypes.find((Qtype) => Qtype.id === typeId)?.type ===
      "DataInterpretation"
    ) {
      Question = await db.dataInterpretationQuestion.findUnique({
        where: { id: params.questionId },
      });
    }
    if (
      questionTypes.find((Qtype) => Qtype.id === typeId)?.type ===
      "MCQ"
    ) {
      Question = await db.multipleChoiceQuestion.findUnique({
        where: { id: params.questionId },
      });
    }
    if (
      questionTypes.find((Qtype) => Qtype.id === typeId)?.type ===
      "Quantitative"
    ) {
      Question = await db.quantitativeQuestion.findUnique({
        where: { id: params.questionId },
      });
    }

    if (!Question) {
      return NextResponse.error(new Error("Question not found"), { status: 404 });
    }
    return NextResponse.json({ Question });
  } catch (error) {
    console.error("Error deleting Question:", error);
    return NextResponse.error(error, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  const profile = await currentProfile();

  if (profile.role !== 'admin') {
    return NextResponse.error(new Error("Unauthorized"), { status: 403 });
  }

  try {
    const {
      testId,
      typeId,
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
      marks
    } = await req.json();

    const questionTypes = await db.questionType.findMany();

    let editedQuestion;

    if (questionTypes.find((Qtype) => Qtype.id === typeId)?.type === "Analytical Writing") {
      editedQuestion = await db.analyticalWritingQuestion.update({
        where: { id: params.questionId },
        data: {
          testId,
          typeId,
          questionText,
          correctAnswer,
          section,
          description,
          marks: parseInt(marks),
          prompt,
        },
      });
    } else if (questionTypes.find((Qtype) => Qtype.id === typeId)?.type === "Reading Comprehension") {
      editedQuestion = await db.readingComprehensionQuestion.update({
        where: { id: params.questionId },
        data: {
          testId,
          typeId,
          questionText,
          options,
          correctAnswer,
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
    } else if (questionTypes.find((Qtype) => Qtype.id === typeId)?.type === "MultipleAnswerQuestion") {
      editedQuestion = await db.multipleAnswerQuestion.update({
        where: { id: params.questionId },
        data: {
          testId,
          typeId,
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
          correctNumeric: parseInt(correctNumeric)
        },
      });
    } else if (questionTypes.find((Qtype) => Qtype.id === typeId)?.type === "TextCompletion") {
      editedQuestion = await db.multipleAnswerQuestion.update({
        where: { id: params.questionId },
        data: {
          testId,
          typeId,
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
          correctNumeric: parseInt(correctNumeric)
        },
      });
    } else if (questionTypes.find((Qtype) => Qtype.id === typeId)?.type === "MCQ") {
      editedQuestion = await db.multipleChoiceQuestion.update({
        where: { id: params.questionId },
        data: {
          testId,
          typeId,
          questionText,
          options,
          correctAnswer,
          image,
          section,
          description,
          marks: parseInt(marks),
        },
      });
    } else if (questionTypes.find((Qtype) => Qtype.id === typeId)?.type === "Quantitative") {
      editedQuestion = await db.quantitativeQuestion.update({
        where: { id: params.questionId },
        data: {
          testId,
          typeId,
          questionText,
          options,
          correctAnswer,
          section,
          description,
          marks: parseInt(marks),
          Quantity1,
          Quantity2,
        },
      });
    } else if (questionTypes.find((Qtype) => Qtype.id === typeId)?.type === "DataInterpretation") {
      editedQuestion = await db.dataInterpretationQuestion.update({
        where: { id: params.questionId },
        data: {
          testId,
          typeId,
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
          correctNumeric: parseInt(correctNumeric)
        },
      });
    }

    if (!editedQuestion) {
      return NextResponse.error(new Error("Question not found"), { status: 404 });
    }

    return NextResponse.json({ editedQuestion });
  } catch (error) {
    console.error("Error in updating question:", error);
    return NextResponse.error(error, { status: 500 });
  }
}


export async function DELETE(req, { params }) {
  /*  const {id} = await req.params; */

  try {
    const typeId = params.typeId;
    const questionTypes = await db.questionType.findMany();

    const profile = await currentProfile();

    if(profile.role != 'admin') {
      return NextResponse.error(new Error("Unauthorized"), { status: 404 });
    }
    let deletedQuestion = [];

    if (
      questionTypes.find((Qtype) => Qtype.id === typeId)?.type ===
      "Analytical Writing"
    ) {
      deletedQuestion = await db.analyticalWritingQuestion.delete({
        where: { id: params.questionId },
      });
    }
    if (
      questionTypes.find((Qtype) => Qtype.id === typeId)?.type ===
      "Reading Comprehension"
    ) {
      deletedQuestion = await db.readingComprehensionQuestion.delete({
        where: { id: params.questionId },
      });
    }
    if (
      questionTypes.find((Qtype) => Qtype.id === typeId)?.type ===
      "Blank"
    ) {
      deletedQuestion = await db.multipleAnswerQuestion.delete({
        where: { id: params.questionId },
      });
    }
    if (
      questionTypes.find((Qtype) => Qtype.id === typeId)?.type ===
      "MCQ"
    ) {
      deletedQuestion = await db.multipleChoiceQuestion.delete({
        where: { id: params.questionId },
      });
    }
    if (
      questionTypes.find((Qtype) => Qtype.id === typeId)?.type ===
      "Quantitative"
    ) {
      deletedQuestion = await db.quantitativeQuestion.delete({
        where: { id: params.questionId },
      });
    }

    if (!deletedQuestion) {
      return NextResponse.error(new Error("Question not found"), { status: 404 });
    }
    return NextResponse.json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error("Error deleting Question:", error);
    return NextResponse.error(error, { status: 500 });
  }
}
