"use client";

import { useCurrentQuestion } from '@/providers/CurrentQuestionContext';
import { useCurrentSession } from '@/providers/CurrentSessionContext';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import InstructionsCaller from './Instructions/InstructionsCaller';
import { useCurrentTest } from '@/providers/CurrentTestDetails';

const Intermediete = ({ testSession }) => {
  const router = useRouter();
  const { setCurrentSection, setInstructions, instructions } = useCurrentQuestion();
  const { setCurrentSession, currentSession } = useCurrentSession();
  const { setCurrentTest } = useCurrentTest();

  useEffect(() => {
    setCurrentSection(testSession.test.sections[0]);
    setCurrentSession(testSession);
    setCurrentTest(testSession.test);

    // Uncomment the line below if you want to navigate after setting the session
    // router.push(`/mock-tests/${testSession.id}`);
  }, [testSession, setCurrentSection, setCurrentSession, setCurrentTest]);

  return (
    <InstructionsCaller sessionId={testSession.id} />
  );
}

export default Intermediete;
