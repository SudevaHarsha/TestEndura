// pages/api/updateTestSession/[sessionId].js

import { db } from "@/lib/db";
const { NextResponse } = require("next/server");

export async function PATCH(req, { params }) {
  try {
    // Fetch the test session from the database
    const { sessionAnswers, currentSection } = await req.json();
    const testSession = await db.testSession.findUnique({
      where: {
        id: params.sessionId,
      },
      include:{
        test:true
      },
    });

    if (!testSession) {
      return new NextResponse(404, { error: "Test session not found" });
    }

    const currentDate = new Date();
    // Update the sectionEndTimes
    const sectionEndTimes = [
      ...testSession.sectionEndTimes,
      currentDate.toString(),
    ];
    /* const upadatedSessionAnswers = JSON.stringify(sessionAnswers); */
    console.log(sessionAnswers);
    const updatedTestSession = await db.testSession.update({
      where: {
        id: testSession.id,
      },
      data: {
        sectionEndTimes: sectionEndTimes,
        currentSection,
        sessionAnswers: {...testSession.sessionAnswers, ...sessionAnswers },
      },
    });

    console.log(updatedTestSession);

    return new NextResponse(200, {
      message: "Test session updated successfully",
      testSession: updatedTestSession,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(500, {
      error: "Internal server error",
      details: error.message,
    });
  }
}
