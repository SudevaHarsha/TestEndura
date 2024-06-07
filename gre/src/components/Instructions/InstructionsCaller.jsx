import React, { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import { useCurrentQuestion } from '@/providers/CurrentQuestionContext';
import { useCurrentTest } from '@/providers/CurrentTestDetails';
import { useCurrentSession } from '@/providers/CurrentSessionContext';

const NavigationIns = lazy(() => import('./NavigationIns'));
const CopyRightIns = lazy(() => import('./CopyRightIns'));
const TestCenterRegulationsIns = lazy(() => import('./TestCenterRegulationsIns'));
const ConfidentialityAgreementIns = lazy(() => import('./ConfidentialityAgreementIns'));
const GeneralTestIns = lazy(() => import('./GeneralTestIns'));
const TestTakerIns = lazy(() => import('./TestTakerIns'));
const SectionWiseQuestions = lazy(() => import('../Questions/SectionWiseQuestions'));

const InstructionsCaller = ({ sessionId }) => {
  const { instructions, setInstructions } = useCurrentQuestion();
  const { currentTest } = useCurrentTest();
  const { currentSession } = useCurrentSession();
  const [sections, setSections] = useState([]);

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

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {renderInstruction()}
    </Suspense>
  );
};

export default InstructionsCaller;
