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
import AnalyticalWritingIns from '../Instructions/AnalyticalWritingIns';
import VerbalReasoning1Ins from '../Instructions/VerbalReasoning1Ins';
import VerbalReasoning2Ins from '../Instructions/VerbalReasoning2Ins';
import QuantativeReasoning2Ins from '../Instructions/QuantativeReasoning2Ins';
import QuantativeReasoning1Ins from '../Instructions/QuantativeReasoning1Ins';

const SectionWiseQuestions = ({ test, testSession, questions }) => {

    const router = useRouter();

    const { currentSession, setCurrentSession } = useCurrentSession();
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

        return lengths.slice(0, index)
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

    const handleNextQuestion = () => {
        const sectionKeys = test.sections;
        const currentIndex = sectionKeys.indexOf(currentSection);

        setCurrentSection(sectionKeys[currentIndex + 1]);
    }

    if (currentSection === 'AnalyticalWritingIns') {
        console.log(currentSection)
        return <>
            <QuestionsNav questionLength={questions.length} testSession={testSession} test={test} NextQuestion={handleNextQuestion} />
            <AnalyticalWritingIns handleNextQuestion={handleNextQuestion} />
        </>;
    } else if (currentSection === 'VerbalReasoning1Ins') {
        return <>
            <QuestionsNav questionLength={questions.length} testSession={testSession} test={test} NextQuestion={handleNextQuestion} />
            <VerbalReasoning1Ins handleNextQuestion={handleNextQuestion} />;
        </>
    } else if (currentSection === 'VerbalReasoning2Ins') {
        return <>
            <QuestionsNav questionLength={questions.length} testSession={testSession} test={test} NextQuestion={handleNextQuestion} />
            <VerbalReasoning2Ins handleNextQuestion={handleNextQuestion} />;
        </>
    } else if (currentSection === 'QuantativeReasoning1Ins') {
        return <>
            <QuestionsNav questionLength={questions.length} testSession={testSession} test={test} NextQuestion={handleNextQuestion} />
            <QuantativeReasoning1Ins handleNextQuestion={handleNextQuestion} />;
        </>
    } else if (currentSection === 'QuantativeReasoning2Ins') {
        return <>
            <QuestionsNav questionLength={questions.length} testSession={testSession} test={test} NextQuestion={handleNextQuestion} />
            <QuantativeReasoning2Ins handleNextQuestion={handleNextQuestion} />;
        </>
    } else if (!currentSection.endsWith('Ins')) {
        return (
            <>
                <AllQuestions
                    questions={questions[currentSection]}
                    testSession={testSession}
                    previousSectionsLengths={previousSectionsLengths}
                    test={test}
                />
                {/* <Timeout handleNextSection={handleNextSection} /> */}
            </>
        );
    }

};

export default SectionWiseQuestions;
