"use client"

import React, { useEffect } from 'react'
import MCQ from './Questions/MCQ';
import OpenEndedQuestions from './Questions/OpenEndedQuestions';
import QuantitativeQuestions from './Questions/QuantitativeQuestions';
import ReadingCompehension from './Questions/ReadingComprehension';
import { useCurrentQuestion } from '@/providers/CurrentQuestionContext';
import AnalyticalWriting from './Questions/AnalyticalWriting';
import { useTimer } from '@/providers/TimerContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useCurrentSession } from '@/providers/CurrentSessionContext';
import testQuestions from '@/lib/test-questions';
import DataInterpretationQuestions from './Questions/DataInterpretationQuestions';
import ReviewQuestions from './Questions/ReviewQuestions';
import QuestionsNav from './Questions/QuestionsNav';
import ExitSection from './Questions/ExitSection';
import HelpSection from './Questions/HelpSection';

const AllQuestions = ({ questions, testSession, test, previousSectionsLengths }) => {

  const router = useRouter();

  const { currentQuestion, setCurrentQuestion, currentSection, setCurrentSection, nextQuestion, selectedChoices, setSelectedChoices, setPreviousLength, result, review, exitSection, help, markQuestions, setMarkQuestions } = useCurrentQuestion();
  console.log("question", currentQuestion);
  const { currentSession, setCurrentSession } = useCurrentSession();
  console.log(questions, questions.length);

  const previousLength = previousSectionsLengths.reduce((sum, current) => sum + current, 0);
  setPreviousLength(previousLength);


  const currentDate = new Date();
  const handleNext = async () => {
    /* const sectionEndTimes = [...testSession.sectionEndTimes,currentDate]
    const updatedTestSession = await db.testSession.update({
      where: {
        id: testSession.id,
      },
      data: {
        sectionEndTimes: sectionEndTimes,
      },
    }); */
    /* if (result) {
      const sectionKeys = Object.keys(questions);
      const currentIndex = sectionKeys.indexOf(currentSection);
      if (currentIndex < sectionKeys.length - 1) {
        setCurrentSection(sectionKeys[currentIndex + 1]);
        setCurrentQuestion(0);
        router.push('/mock-tests/results')
        return
      }
    } */
    StoreQuestion();
    let converteedAnswers;
    if (typeof currentSession.sessionAnswers === 'string' && (data.startsWith('{') || data.startsWith('['))) {
      converteedAnswers = JsonToArray();
    }
    const updatedTestSession = handleUpdateTimes();

    /* const sectionKeys = Object.keys(questions);
    const currentIndex = sectionKeys.indexOf(currentSection);
    setCurrentSection(sectionKeys[currentIndex + 1]);
    console.log(currentSection); */
    console.log(updatedTestSession);
    router.push(`/timepause/${currentSession.id}`)
    setSelectedChoices([])
  }

  const handleUpdateTimes = async () => {
    const updatedSessionAnswers = JsonToArray();
    const updatedTestSession = await axios.patch(`/api/updateSectionEndTimes/${currentSession.id}`, { sessionAnswers: [...updatedSessionAnswers, selectedChoices], currentSection: currentSection })

    return updatedTestSession;
  }

  const handleSubmit = async () => {
    /* const updatedTestSession = await axios.patch(`/api/updateSectionEndTimes/${currentSession.id}`, { sessionAnswers: [...currentSession.sessionAnswers, selectedChoices] }); */
    await handleUpdateTimes();
    const results = await axios.post("/api/submit", { sessionId: currentSession.id });

    console.log("frontend", results)
  }

  const JsonToArray = () => {
    if (currentSession.sessionAnswers && !Array.isArray(currentSession?.sessionAnswers)) {
      const arrayOfValues = Object.values(currentSession.sessionAnswers);

      return arrayOfValues;
    }
    return currentSession.sessionAnswers;
  }

  const StoreQuestion = () => {
    console.log(currentSession);
    setCurrentQuestion(currentQuestion + 1);
    currentSession.sessionAnswers && setCurrentSession((prevSession) => {
      const updatedSession = { ...prevSession };
      console.log("up", updatedSession.sessionAnswers)
      const prevAnswers = Array.isArray(updatedSession?.sessionAnswers) ? updatedSession.sessionAnswers : Object.values(updatedSession.sessionAnswers);

      if (prevAnswers.length < previousLength + currentQuestion) {
        // Merge the newly selected choices with the existing sessionAnswers
        console.log(previousLength);
        updatedSession.sessionAnswers = [...prevAnswers, selectedChoices];
        return updatedSession;
      } else {
        console.log("previous enabled")
        updatedSession.sessionAnswers[previousLength + currentQuestion] = selectedChoices;
        return updatedSession;
      }
    });
/*     setCurrentSession([...currentSession.sessionAnswers, selectedChoices])
 */    setSelectedChoices([]);
  }

  const NextQuestion = () => {
    if (currentSection === currentSession.test.sections[currentSession.test.sections.length - 1] && currentQuestion === questions.length - 1) {
      console.log("entered");
      handleSubmit();
      router.push("/submission")

      setCurrentSection(currentSession.test.sections[0]);
      setCurrentQuestion(0);
      return
    }
    currentQuestion < questions.length - 1 ? StoreQuestion() : handleNext()
  };

  console.log(currentQuestion);

  return <>
    <QuestionsNav questionLength={questions.length} testSession={testSession} test={test} handleNext={handleNext} NextQuestion={NextQuestion} />
    {questions.map((question, index) => {
      console.log(question, index)
      if (index === currentQuestion) {
        console.log(question.questionType.type);
        if (review) {
          return <ReviewQuestions key='review' questions={questions} />
        }
        if (exitSection) {
          return <ExitSection key='exitSection' handleNext={handleNext} questionLength={questions.length} />
        }
        if (help) {
          return <HelpSection key='help' questionLength={questions.length} />
        }
        if (question.questionType.type === "MCQ") {
          console.log('MCQ');
          return <MCQ key={index} question={question} NextQuestion={NextQuestion} />;
        } else if (question.questionType.type === "MultipleAnswerQuestion" || question.type === "input" || question.type === "TextCompletion") {
          return <OpenEndedQuestions key={index} question={question} NextQuestion={NextQuestion} />;
        } else if (question.questionType.type === "Quantitative") {
          return <QuantitativeQuestions key={index} question={question} NextQuestion={NextQuestion} />;
        } else if (question.questionType.type === "Reading Comprehension") {
          return <ReadingCompehension key={index} question={question} NextQuestion={NextQuestion} />;
        } else if (question.questionType.type === "AnalyticalWriting") {
          return <AnalyticalWriting key={index} question={question} NextQuestion={NextQuestion} />;
        } else if (question.questionType.type === "DataInterpretation") {
          return <DataInterpretationQuestions key={index} question={question} NextQuestion={NextQuestion} />;
        }
      }

      return null; // Return null for unsupported question types
    })}
  </>
}

export default AllQuestions