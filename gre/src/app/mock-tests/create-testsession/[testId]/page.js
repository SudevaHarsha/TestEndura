"use server";

import AttemptsExceeded from "@/components/AttemptsExceeded";
import Instructions from "@/components/Instructions";
import Intermediete from "@/components/Intermediete";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import React from "react";

const page = async (testId) => {
  const profile = await currentProfile();

  /* const router = useRouter(); */
  console.log(testId.params.testId);

  if (!profile) {
    console.log("User does not exists");
  }

  const test = await db.test.findFirst({
    where: {
      id: testId.params.testId,
    },
  });
  console.log("Test Found", test);

  if (!test) {
    return redirect("/mock-tests");
  }

  const currentTime = new Date();
  const endTime = new Date(
    currentTime.getTime() + test.overallDuration * 60000
  );

  const previousSessions = await db.testSession.findMany({
    where: {
      id: testId.params.id,
    },
  });
  console.log(previousSessions.length > test.totalAttempts)

  if(test.totalAttempts && previousSessions.length > test.totalAttempts) {
    console.log.apply('attemps exceeded');
    return <AttemptsExceeded />
  }

  if(!profile.assignedTests.includes(test.id)) {
    return <div>You Are Not Allowed To Take This Test</div>
  }

  const testSession = await db.testSession.create({
    data: {
      profileId: profile.id, // Replace with actual user ID
      testId: test.id,
      duration: "",
      startTime: new Date(),
      endTime: endTime,
      sectionEndTimes: [], // Add test duration in minutes
      sessionAnswers: [],
    },
    include: {
      test: true,
    },
  });

  console.log(testSession.id);

  if (!testSession) {
    console.log("error in test session creation");
    redirect("/mock-tests");
  }

  return <Intermediete testSession={testSession} />;
};

export default page;