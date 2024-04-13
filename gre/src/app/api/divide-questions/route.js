// pages/api/divideQuestionsIntoSections.js

import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const { testId } = await req.json();

  try {
    // Fetch test details including sections
    const test = await db.test.findUnique({
      where: { id: testId },
    });

    if (!test) {
      return NextResponse.error(new Error("Test not found"), { status: 404 });
    }

    // Fetch questions related to the test
    const questions = await db.question.findMany({
      where: { testId },
    });

    // Divide questions into sections based on the test's sections
    /* const sections = test.sections.map((section) => {
      const sectionQuestions = questions.filter((question) => question.section === section);
      return { [section]: sectionQuestions }
    }); */

    const sections = test.sections.reduce((acc, section) => {
      const sectionQuestions = questions.filter(
        (question) => question.section === section
      );
      acc[section] = sectionQuestions;
      return acc;
    }, {});

    /*     const sections = test.sections.reduce((acc, section) => {
        const sectionQuestions = questions[section];
        if (sectionQuestions) {
          acc[section.name] = sectionQuestions;
        }
        return acc;
      }, {}); */

    console.log("Questions divided into sections:", sections);
    return NextResponse.json({ sections });
  } catch (error) {
    console.error("Error dividing questions into sections:", error);
    return NextResponse.error(error, { status: 500 });
  }
}
