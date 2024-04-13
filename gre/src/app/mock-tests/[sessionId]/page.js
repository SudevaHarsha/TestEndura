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
  /* const questions = [
    {
      type: "Multiple Choice",
      option: "1",
      question: "What is the capital of France?",
      options: ["Madrid", "Paris", "Rome", "Berlin"],
      correctAnswer: "B",
      image:null,
    },
    {
      type: "Multiple Choice",
      option: "2",
      question: "Select the countries located in South America.",
      options: ["Brazil", "China", "Australia", "Argentina", "Mexico"],
      correctAnswers: ["A", "D"],
      image:"/i6.gif",
    },
    {
      type: "Reading Comprehension",
      highlighted: false,
      select: false,
      highlightSentence: null,
      option: "",
      passage: "[Include a short passage]",
      question: "What is the main idea of the passage?",
      options: ["Brazil", "China", "Australia", "Argentina", "Mexico"],
      image:"/i6.gif",
    },
    {
      type: "Reading Comprehension",
      highlighted: true,
      select: false,
      option: "1",
      highlightSentence:
        "In the realm of science and medicine, relentless exploration leads to groundbreaking discoveries.",
      passage: "[Include a short passage with a highlighted sentence]",
      question: "What does the highlighted sentence suggest?",
      options: ["Brazil", "China", "Australia", "Argentina", "Mexico"],
    },
    {
      type: "Reading Comprehension",
      passage: "[Include a short passage]",
      highlighted: false,
      select: true,
      option: "2",
      highlightSentence: null,
      question: "What is gre",
      options: []
    },
    {
      type: "Blank",
      blankType: "",
      option: "1",
      sentence:
        "Complete the sentence: The __________ is the largest mammal on Earth.",
      options: ["Elephant", "Blue Whale", "Cheetah", "Giraffe"],
      correctAnswer: "B",
    },
    {
      type: "Blank",
      blankType: "",
      option: "2",
      sentence:
        "Fill in the blanks with the correct words: The four main seasons are spring, summer, __________, and winter.",
      options: ["Autumn", "Monsoon", "Fall", "Rainy"],
      correctAnswers: ["A", "D"],
    },
    {
      type: "input",
      blankType: "input",
      sentence:
        "Fill in the blank with the correct numerical value: The speed of light is approximately __________ kilometers per second.",
      blanks: ["country"],
    },
    {
      type: "Analytical Writing",
      blankType: "input",
      sentence:
        "Fill in the blank with the correct numerical value: The speed of light is approximately __________ kilometers per second.",
      blanks: ["country"],
    },
    {
      type: "Quantitative",
      question: "which is more",
      quantityA:
        "The area of a rectangle with length 8 units and width 5 units.",
      quantityB: "The area of a square with side length 6 units.",
      options: [
        "A is greater",
        "B is greater",
        "The two quantities are equal",
        "The relationship cannot be determined from the information given",
      ],
      image:"/i6.gif"
    },
  ]; */

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
