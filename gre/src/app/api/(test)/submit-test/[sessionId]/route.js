// pages/api/updateTestSession/[sessionId].js

import { db } from "@/lib/db";
const { NextResponse } = require("next/server");

export async function PATCH(req, { params }) {
  try {
    // Fetch the test session from the database
    const testSession = await db.testSession.findUnique({
      where: {
        id: params.sessionId,
      },
      include: {
        test: true,
      },
    });

    if (!testSession) {
      return new NextResponse(404, { error: "Test session not found" });
    }

    const currentDate = new Date();
    let sectionEndTimes = testSession.sectionEndTimes;
    // Update the sectionEndTimes
    if (
      testSession.sectionEndTimes.length <
      testSession.test.sections.indexOf(testSession.currentSection) + 1
    ) {
    sectionEndTimes = [
        ...testSession.sectionEndTimes,
        currentDate.toString(),
      ];
    } else {
        sectionEndTimes = [
            ...testSession.sectionEndTimes.slice(0,-1),
            currentDate.toString(),
        ]
    }
    const updatedTestSession = await db.testSession.update({
      where: {
        id: testSession.id,
      },
      data: {
        sectionEndTimes: sectionEndTimes,
        finished: true,
      },
    });

    console.log(updatedTestSession, currentQuestion, currentSection);

    return new NextResponse(200, {
      message: "Test session updated successfully",
      testSession: updatedTestSession,
    });
  } catch (error) {
    return new NextResponse(500, {
      error: "Internal server error",
      details: error.message,
    });
  }
}
