"use client"

import React, { useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useCurrentQuestion } from '@/providers/CurrentQuestionContext';
import { useCurrentSession } from '@/providers/CurrentSessionContext';
import axios from 'axios';
import dynamic from 'next/dynamic';

const AllQuestions = dynamic(() => import('../AllQuestions'), { ssr: false });
const QuestionsNav = dynamic(() => import('./QuestionsNav'), { ssr: false });
const AnalyticalWritingIns = dynamic(() => import('../Instructions/AnalyticalWritingIns'), { ssr: false });
const VerbalReasoning1Ins = dynamic(() => import('../Instructions/VerbalReasoning1Ins'), { ssr: false });
const VerbalReasoning2Ins = dynamic(() => import('../Instructions/VerbalReasoning2Ins'), { ssr: false });
const QuantativeReasoning1Ins = dynamic(() => import('../Instructions/QuantativeReasoning1Ins'), { ssr: false });
const QuantativeReasoning2Ins = dynamic(() => import('../Instructions/QuantativeReasoning2Ins'), { ssr: false });

const SectionWiseQuestions = ({ test, testSession, questions }) => {
    const router = useRouter();
    const { currentSession, setCurrentSession } = useCurrentSession();
    const { currentQuestion, setCurrentQuestion, currentSection, setCurrentSection } = useCurrentQuestion();

    const previousQuestionsLength = useMemo(() => {
        const keysArray = Object.keys(questions); 
        const index = keysArray.indexOf(currentSection);
        const valuesArray = Object.values(questions);
        const lengths = valuesArray.map(innerArray => innerArray.length);
        return lengths.slice(0, index);
    }, [currentSection, questions]);

    const handleNextQuestion = useCallback(() => {
        const sectionKeys = test.sections;
        const currentIndex = sectionKeys.indexOf(currentSection);
        if (currentIndex < sectionKeys.length - 1) {
            setCurrentSection(sectionKeys[currentIndex + 1]);
        } else {
            console.log('Quiz finished');
        }
    }, [currentSection, setCurrentSection, test.sections]);

    const instructionComponents = useMemo(() => ({
        AnalyticalWritingIns: <AnalyticalWritingIns handleNextQuestion={handleNextQuestion} />,
        VerbalReasoning1Ins: <VerbalReasoning1Ins handleNextQuestion={handleNextQuestion} />,
        VerbalReasoning2Ins: <VerbalReasoning2Ins handleNextQuestion={handleNextQuestion} />,
        QuantativeReasoning1Ins: <QuantativeReasoning1Ins handleNextQuestion={handleNextQuestion} />,
        QuantativeReasoning2Ins: <QuantativeReasoning2Ins handleNextQuestion={handleNextQuestion} />
    }), [handleNextQuestion]);

    if (currentSection in instructionComponents) {
        return (
            <>
                <QuestionsNav questionLength={questions.length} testSession={testSession} test={test} NextQuestion={handleNextQuestion} />
                {instructionComponents[currentSection]}
            </>
        );
    } else if (!currentSection.endsWith('Ins')) {
        return (
            <>
                <AllQuestions
                    questions={questions[currentSection]}
                    testSession={testSession}
                    previousSectionsLengths={previousQuestionsLength}
                    test={test}
                />
            </>
        );
    }

    return null; // Default return for invalid sections
};

export default SectionWiseQuestions;
