"use server";

import AttemptsExceeded from "@/components/AttemptsExceeded";
import Instructions from "@/components/Instructions";
import Intermediete from "@/components/Intermediete";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ params }) => {
  const { testId } = params;

  // Fetch the user profile and the test details in parallel
  const [profile, test] = await Promise.all([
    currentProfile(),
    db.test.findFirst({
      where: {
        id: testId,
      },
    }),
  ]);

  // Check if profile and test exist
  if (!profile) {
    console.log("User does not exist");
    return redirect("/login");
  }

  if (!test) {
    console.log("Test not found");
    return redirect("/mock-tests");
  }

  // Check if the user is allowed to take the test
  if (!profile.assignedTests.includes(test.id)) {
    return <div>You Are Not Allowed To Take This Test</div>;
  }

  // Fetch previous sessions and check attempts limit
  const previousSessionsCount = await db.testSession.count({
    where: {
      testId: testId,
      profileId: profile.id,
    },
  });

  if (test.totalAttempts && previousSessionsCount >= test.totalAttempts) {
    console.log("Attempts exceeded");
    return <AttemptsExceeded />;
  }

  // Create a new test session
  const currentTime = new Date();
  const endTime = new Date(currentTime.getTime() + test.overallDuration * 60000);

  const testSession = await db.testSession.create({
    data: {
      profileId: profile.id,
      testId: test.id,
      duration: "", // Specify duration if needed
      startTime: currentTime,
      endTime: endTime,
      sectionEndTimes: [], // Initialize with empty array or appropriate value
      sessionAnswers: [], // Initialize with empty array or appropriate value
    },
    include: {
      test: true,
    },
  });

  if (!testSession) {
    console.log("Error in test session creation");
    return redirect("/mock-tests");
  }

  console.log(testSession.id);

  return <Intermediete testSession={testSession} />;
};

export default page;
