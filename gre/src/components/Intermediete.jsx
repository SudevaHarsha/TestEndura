"use client"

import { useCurrentQuestion } from '@/providers/CurrentQuestionContext';
import { useCurrentSession } from '@/providers/CurrentSessionContext';
import { useRouter } from 'next/navigation'
import React from 'react'

const Intermediete = ({testSession}) => {
    const router = useRouter();
    const {setCurrentSection} = useCurrentQuestion();
    const {setCurrentSession} = useCurrentSession();
    console.log(testSession.test.sections[0])
    setCurrentSection(testSession.test.sections[0]);
    setCurrentSession(testSession);

    router.push(`insrtructions/${testSession.id}`)
  return (
    <div>Redirecting to test</div>
  )
}

export default Intermediete