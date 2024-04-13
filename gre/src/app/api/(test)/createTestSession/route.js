import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
const { NextResponse } = require("next/server");

export async function POST(req, res) {
  try {
    // Get the testId from the request body
    const { testId } = req.json();

    // Retrieve the current profile
    const profile = await currentProfile();

    if (!profile) {
      console.log("User does not exist");
      return new NextResponse(400, { error: "User does not exist" });
    }

    // Find the test using the provided testId
    const test = await db.test.findFirst({
      where: {
        testId: testId,
      },
    });

    if (!test) {
      console.log("Test not found");
      return new NextResponse(404, { error: "Test not found" });
    }

    // Calculate the end time for the test session
    const currentTime = new Date();
    const endTime = new Date(currentTime.getTime() + test.overallDuration * 60000);

    // Create a new test session
    const testSession = await db.testSession.create({
      data: {
        profileId: profile.id,
        testId: test.id,
        duration: "",
        startTime: new Date(),
        endTime: endTime,
        sectionEndTimes: [],
      },
    });

    if (!testSession) {
      console.log("Error creating test session");
      return new NextResponse(500, { error: "Error creating test session" });
    }

    console.log("Test session created successfully");
    return new NextResponse(200, { message: "Test session created successfully", testSession });
  } catch (error) {
    console.error("Error:", error.message);
    return new NextResponse(500, { error: "Internal server error" });
  }
}
