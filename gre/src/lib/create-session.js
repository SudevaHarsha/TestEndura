import { db } from "./db";
import { currentProfile } from "./current-profile";

export const CurrentTestSession = async () => {
  const profile = await currentProfile();

  if (!profile) {
    console.log("User does not exist");
    return null;
  }

  // Query the database for the current test session of the user
  const currentSession = await db.testSession.findFirst({
    where: {
      profileId: profile.id,
      finished: false, // Optionally, include conditions based on your requirements
    },
    orderBy: {
      startTime: "desc", // Optionally, order by start time to get the latest session
    },
  });

  return currentSession;
};
