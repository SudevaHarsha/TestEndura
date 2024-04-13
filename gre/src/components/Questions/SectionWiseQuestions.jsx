"use client"

/* import questions from '@/data/Questions'; */
import React, { useEffect, useRef, useState } from 'react';
import AllQuestions from '../AllQuestions';
import { useCurrentQuestion } from '@/providers/CurrentQuestionContext';
import QuestionsNav from './QuestionsNav';
import Timeout from '../TimeOut';
import { useRouter } from 'next/navigation';
import { useCurrentSession } from '@/providers/CurrentSessionContext';
import axios from 'axios';
import testQuestions from '@/lib/test-questions';

const SectionWiseQuestions = ({test,testSession,questions}) => {

    const router = useRouter();

    const {currentSession,setCurrentSession} = useCurrentSession();
    const { currentQuestion, setCurrentQuestion, currentSection, setCurrentSection, nextQuestion } = useCurrentQuestion();
    console.log("question", currentQuestion);
    console.log(currentSection)

    let lengthsOfPreviousPairs = [];

    const previousQuestionsLength = () => {
      const keysArray = Object.keys(questions); // Convert keys to array
      const index = keysArray.indexOf(currentSection);
      const valuesArray = Object.values(questions);

      const lengths = valuesArray.map(innerArray => innerArray.length)
  
      console.log(lengths);

      return lengths.slice(0,index)
    }
    const previousSectionsLengths = previousQuestionsLength();
    console.log(previousSectionsLengths);
/*     setCurrentSession(testSession);
 */   /*  const cquestions = questions[currentSection];
    console.log(cquestions); */
/*     const handleNextSection = () => {
        const sectionKeys = Object.keys(questions);
        const currentIndex = sectionKeys.indexOf(currentSection);
        if (currentIndex < sectionKeys.length - 1) {
            setCurrentSection(sectionKeys[currentIndex + 1]);
            setCurrentQuestion(0);
        } else {
            console.log('Quiz finished');
            // You can handle quiz completion here
        }
    }; */

    /* useEffect(()=>{
        const fetchedQuestions = axios.post("/api/divide-questions",{testId:test.id})
        console.log(fetchedQuestions);
    },[]) */
    console.log(questions)

    return (
        <>
            <AllQuestions questions={questions[currentSection]} testSession={testSession} previousSectionsLengths={previousSectionsLengths} test={test}/>
            {/* <Timeout handleNextSection={handleNextSection} /> */}
        </>
    );
};

export default SectionWiseQuestions;
