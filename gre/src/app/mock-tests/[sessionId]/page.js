"use server";

// pages/tests/[testId].js
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import Timer from "@/components/Timer";
import MCQ from "@/components/Questions/MCQ";
import ReadingCompehension from "@/components/Questions/ReadingComprehension";
import OpenEndedQuestions from "@/components/Questions/OpenEndedQuestions";
import QuantitativeQuestions from "@/components/Questions/QuantitativeQuestions";
import { Button } from "@/components/ui/button";
// Check the import statement
import { useCurrentQuestion } from "@/providers/CurrentQuestionContext.js";
import AllQuestions from "@/components/AllQuestions";
import QuestionsNav from "@/components/Questions/QuestionsNav";
import SectionWiseQuestions from "@/components/Questions/SectionWiseQuestions";
import questions from "@/data/Questions";
import { CurrentTestSession, createSession } from "@/lib/create-session";
import { useCurrentSession } from "@/providers/CurrentSessionContext";
import axios from "axios";

const TestPage = async (sessionId) => {
  
  /* const router = useRouter(); */
  /* const { testId } = router.query; */

  const profile = await currentProfile();

  if (!profile) {
    console.log("User does not exists");
  }

  /*   const test = await db.test.findFirst({
    where: {
      testId: testId,
    },
  });

  if (test) {
    console.log(test);
  } */

  let totalDuration = 0;

  /*   const currentTime = new Date();
  const endTime = new Date(
    currentTime.getTime() + test.overallDuration * 60000
  ); */
  // Convert minutes to milliseconds
  /*   const sectionEndTimes = test.sectionDuration.map((duration, index) => {
    totalDuration += parseInt(duration) + (index > 0 ? 15 : 0); // Add break time between sections starting from the second section
    const sectionEndTime = new Date(
      currentTime.getTime() + totalDuration * 60000
    ); // Calculate end time using accumulated total duration
    console.log(sectionEndTime.toString()); // Log end time in ISO format
    console.log(totalDuration);
    return sectionEndTime.toString(); // Return end time in ISO format
  }); */

  /*   console.log(sectionEndTimes);
   */

  /*   const testSession = await db.testSession.create({
    data: {
      profileId: profile.id, // Replace with actual user ID
      testId: test.id,
      duration: "",
      startTime: new Date(),
      endTime: endTime,
      sectionEndTimes: [], // Add test duration in minutes
    },
  });

  if (!testSession) {
    console.log("error in test session creation");
  } */

  const testSession = await db.testSession.findFirst({
    where: {
      id: sessionId.params.sessionId,
    },
    include: {
      test: {
        include: {
          Questions: {
            include: {
              questionType: true,
            }
          },
          analyticalWritingQuestions: {
            include: {
              questionType: true,
            }
          },
          quantitativeQuestions: {
            include: {
              questionType: true,
            }
          },
          readingComprehensionQuestions: {
            include: {
              questionType: true,
            }
          },
          multipleAnswerQuestions: {
            include: {
              questionType: true,
            }
          },
          multipleChoiceQuestions: {
            include: {
              questionType: true,
            }
          },
          dataInterpretationQuestions: {
            include: {
              questionType: true,
            }
          },
        },
      },
    },
  });

  /*   const session = await CurrentTestSession();

  console.log(session); */

  /*   const currentTime = new Date();
   */

  /* const NextClick = ()=>{
    
  } */

  /* let currentQuestion = 0; */
/* 
  const fetchedQuestions = await axios.post("/api/divide-questions", {
    testId: testSession.test.id,
  });
  console.log(fetchedQuestions); */

/*   const testId = testSession.test.testId; */

/*   const questions = await db.question.findMany({
    where: { testId },
    include:{
      questionType: true
    }
  }); */

  console.log(testSession)

  const questions = [...testSession.test.Questions,...testSession.test.analyticalWritingQuestions,...testSession.test.quantitativeQuestions,...testSession.test.readingComprehensionQuestions,...testSession.test.multipleAnswerQuestions,...testSession.test.multipleChoiceQuestions,...testSession.test.dataInterpretationQuestions];

  const sections = testSession.test.sections.reduce((acc, section) => {
    const sectionQuestions = questions.filter(
      (question) => question.section === section
    );
    acc[section] = sectionQuestions;
    return acc;
  }, {});

  console.log("Questions divided into sections:", sections);

  return (
    <div className="w-full relative flex flex-col justify-center items-center">
      {/*       <QuestionsNav questionLength={questions.length} />
       */}{" "}
      {/* <h1>Test 1</h1>
      <p>An test on Gre</p> */}
      {/* <MCQ /> */}
      {/* <ReadingCompehension /> */}
      {/* <OpenEndedQuestions /> */}
      {/* <QuantitativeQuestions /> */}
      {/* <Timer duration={test.duration} /> */}
      <SectionWiseQuestions test={testSession.test} testSession={testSession} questions={sections} />
    </div>
  );
};

/* export async function getServerSideProps({ params }) {
  const { testId } = params;
  const test = await prisma.test.findUnique({
    where: {
      id: testId,
    },
  });
  return {
    props: {
      test,
    },
  };
} */

export default TestPage;