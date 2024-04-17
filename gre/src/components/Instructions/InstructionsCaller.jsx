import { useCurrentQuestion } from '@/providers/CurrentQuestionContext'
import React, { useEffect, useState } from 'react'
import NavigationIns from './NavigationIns';
import CopyRightIns from './CopyRightIns';
import TestCenterRegulationsIns from './TestCenterRegulationsIns';
import ConfidentialityAgreementIns from './ConfidentialityAgreementIns';
import GeneralTestIns from './GeneralTestIns';
import TestTakerIns from './TestTakerIns';
import SectionWiseQuestions from '../Questions/SectionWiseQuestions';
import { useCurrentTest } from '@/providers/CurrentTestDetails';
import { useCurrentSession } from '@/providers/CurrentSessionContext';
import axios from 'axios'

const InstructionsCaller = ({ sessionId }) => {
    const { instructions, setInstructions } = useCurrentQuestion();
    const { currentTest } = useCurrentTest();
    const { currentSession } = useCurrentSession();

    const [sections,setSections] = useState([]);

    const handleNextInsrtruction = () => {
        setInstructions(instructions + 1)
    }
    /* useEffect(() => {
        const fetchQuestions = async () => {
            const { sections, testSession } = await axios.get(`/api/sections-wise-questions/${sessionId}`);
            console.log(sections, testSession)

            setSections(sections)
        }

        fetchQuestions()
    }, []) */
    if (instructions === 0) {
        return <TestTakerIns handleNextInsrtruction={handleNextInsrtruction} />;
    } else if (instructions === 1) {
        return <NavigationIns handleNextInsrtruction={handleNextInsrtruction} />;
    } else if (instructions === 2) {
        return <CopyRightIns handleNextInsrtruction={handleNextInsrtruction} />;
    } else if (instructions === 3) {
        return <TestCenterRegulationsIns handleNextInsrtruction={handleNextInsrtruction} />;
    } else if (instructions === 4) {
        return <ConfidentialityAgreementIns handleNextInsrtruction={handleNextInsrtruction} />;
    } else if (instructions === 5) {
        return <GeneralTestIns handleNextInsrtruction={handleNextInsrtruction} sessionId={sessionId} />;
    } else if (instructions === 6) {
        return <SectionWiseQuestions test={currentTest} testSession={currentSession} questions={sections} />
    }
}

export default InstructionsCaller