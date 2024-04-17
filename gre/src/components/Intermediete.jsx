"use client"

import { useCurrentQuestion } from '@/providers/CurrentQuestionContext';
import { useCurrentSession } from '@/providers/CurrentSessionContext';
import { useRouter } from 'next/navigation'
import React from 'react'
import TestTakerIns from './Instructions/TestTakerIns';
import InstructionsCaller from './Instructions/InstructionsCaller';
import { useCurrentTest } from '@/providers/CurrentTestDetails';

const Intermediete = ({ testSession }) => {
  const router = useRouter();
  const { setCurrentSection,setInstructions,instructions } = useCurrentQuestion();
  const { setCurrentSession,currentSession } = useCurrentSession();
  const { setCurrentTest } = useCurrentTest();
  console.log(testSession.test.sections[0])
  setCurrentSection(testSession.test.sections[0]);
  setCurrentSession(testSession);
  setCurrentTest(testSession.test);

  /* router.push(`/mock-tests/${testSession.id}`); */
  return (
    <InstructionsCaller sessionId={testSession.id} />
  )
}

export default Intermediete