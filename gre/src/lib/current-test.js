// Import the Prisma Client instance
import { db } from "@/lib/db";

// Define an asynchronous function to fetch the current test
export const currentTest = async ({ testId }) => {
  // If testId is not provided, return null
  if (!testId) {
    return null;
  }

  try {
    // Fetch the test from the database using the testId
    const test = await db.test.findFirst({
      where: {
        id: testId // Use the id field instead of testId
      }
    });

    // Return the fetched test
    return test;
  } catch (error) {
    // Log any errors that occur during the database query
    console.error("Error fetching test:", error);
    // Return null if an error occurs
    return null;
  }
};
