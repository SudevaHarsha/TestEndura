// pages/api/evaluate-quiz.js

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendEmailToStudent, sendEmailToTeacher } from "@/lib/send-email";

export async function PATCH(req, { params }) {
  const { essayMarks } = await req.json();

  console.log(params.sessionId)
  try {
    // Retrieve current test session
    const testSession = await db.testSession.findUnique({
      where: {
        id: params.sessionId,
      },
    });

    if (!testSession) {
      return new NextResponse(404);
    }

    // Calculate updated result marks
    const updatedMarks =  testSession?.essayMarks > 0 ? testSession?.resultMarks-testSession?.essayMarks+parseInt(essayMarks) : testSession?.resultMarks + parseInt(essayMarks);
    let QuestionMarks = testSession.questionMarks;
    QuestionMarks[0] = parseInt(essayMarks);
    let updatedResults = testSession?.results;
    updatedResults[0] = true;

    // Update test session with new result marks
    const resultSession = await db.testSession.update({
      where: {
        id: params.sessionId,
      },
      data: {
        essayMarks: parseInt(essayMarks),
        resultMarks: updatedMarks,
        questionMarks: QuestionMarks,
        results :updatedResults
      },
    });

    const profile = await db.profile.findUnique({
      where: {
        id: resultSession.profileId
      }
    })

    sendEmailToStudent(parseInt(essayMarks),profile.email)

    console.log(resultSession);

    return new NextResponse(200, { resultSession });
  } catch (error) {
    console.error("Error evaluating quiz:", error);
    return new NextResponse(500);
  }
}
