"use client"

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { ChevronRight, ChevronLeft } from "lucide-react";
import TimerClock from '../Timer'
import { Timer } from "lucide-react";
import { useCurrentQuestion } from '@/providers/CurrentQuestionContext';
import { useTimer } from '@/providers/TimerContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { db } from '@/lib/db';
import { useCurrentSession } from '@/providers/CurrentSessionContext';

const QuestionsNav = ({ questionLength, test, testSession, handleNext, NextQuestion }) => {

    const router = useRouter();

    const onTimeout = () => {
        router.push("/timeout")
    }

    const currentTime = new Date();
    const endTime = new Date(currentTime.getTime() + "30" * 60000);

    const { currentQuestion, setCurrentQuestion, setReview, currentSection, setExitSection, setHelp, markQuestions, setMarkQuestions } = useCurrentQuestion();
    const { currentSession } = useCurrentSession();
    /* const {sessionStarted, sessionExpired, minutes, seconds, resetTimer, duration} = useTimer(); */

    const PreviousQuestion = () => {
        console.log("previous");
        currentQuestion != 0 ? setCurrentQuestion(currentQuestion - 1) : currentQuestion
    };

    const handleExit = async () => {
        /*  const url = qs.stringifyUrl({
             url: `/api/updateTestDuration/${testSession.id}`,
             query: socketQuery,
           }); */
        const response = await axios.put(`/api/updateTestDuration/${currentSession ? currentSession.id : currentSession.id}`, {
            currentQuestion, currentSection, finished: false, sessionAnswers: currentSession.sessionAnswers
        });
        console.log(response.testSession);
        router.push("/mock-tests")
    }

    /*     let totalDuration = 0;
     */
    /* const handleExitSection = async () => {
        const sectionEndTimes = test.sectionDuration.map((duration, index) => {
            totalDuration += parseInt(duration) + (index > 0 ? 15 : 0); // Add break time between sections starting from the second section
            const sectionEndTime = new Date(
                currentTime.getTime() + totalDuration * 60000
            ); // Calculate end time using accumulated total duration
            console.log(sectionEndTime.toString()); // Log end time in ISO format
            console.log(totalDuration);
            if (index > currentSection) {
                return sectionEndTime.toString(); // Return end time in ISO format
            }
        });
        const testSession = await db.testSession.update({
            where: {
                id: params.sessionId
            },
            data: {
                sectionEndTimes:sectionEndTimes
            }
        })
    } */

    const handleExitSection = () => {
        setExitSection(true);
    }

    const handleHelpSection = () => {
        setHelp(true);
    }

    const handleMark = () => {
        setMarkQuestions([...markQuestions, currentQuestion])
    }

    return <>
        <div className="w-[100%] sm:flex justify-between p-6 pb-0 hidden">
            <div className="flex flex-col">
                {/* topic */}
                <p>
                    <span className="text-slate-400">Topic</span> &nbsp;
                    <span className="px-2 py-1 text-white rounded-lg bg-slate-800">
                        {currentSection}
                    </span>
                </p>
                <div className="flex self-start mt-3 text-slate-400">
                    <Timer className="mr-2" />
                    <TimerClock TestDuration="30" test={test} testSession={testSession} />
                </div>
            </div>
            <div>
                Question <span className='font-bold'>{currentQuestion + 1}</span> <span>{"/" + questionLength}</span>
            </div>
            <div className='flex gap-6'>
                <div className=' flex gap-4'>
                    <div className="text center">
                        <Button className="h-11 w-20 text-white bg-strong hover:bg-strong/90 px-3 my-auto text-center" onClick={handleHelpSection}>Help</Button>
                    </div>
                    <div className="text center">
                        <Button className="h-11 w-20 text-white bg-secondary hover:bg-secondary/90 px-3 my-auto text-center" onClick={handleMark}>Mark</Button>
                    </div>
                    <div className="text center">
                        <Button className="h-11 w-20 text-white bg-secondary hover:bg-secondary/90 px-3 my-auto text-center" onClick={() => setReview(true)}>Review</Button>
                    </div>
                </div>
                <div className='flex gap-4'>
                    <div className="text center">
                        <Button onClick={handleExitSection} className="h-11 text-white bg-red-600 hover:bg-red-600/90 px-3 my-auto text-center"> Exit Section</Button>
                    </div>
                    <div className="text center">
                        <Button onClick={handleExit} className="h-11 text-white bg-red-600 hover:bg-red-600/90 px-3 my-auto text-center"> Exit Test</Button>
                    </div>
                    <div className="text center">
                        <Button onClick={PreviousQuestion} className="h-11 text-white bg-strong hover:bg-strong/90 px-3 my-auto text-center"><ChevronLeft className="w-4 h-4 mr-2 text-white" /> previous</Button>
                    </div>
                    <div className="text center">
                        <Button onClick={NextQuestion} className="h-11 text-white bg-strong hover:bg-strong/90 px-3 my-auto text-center">Next <ChevronRight className="w-4 h-4 mr-2 text-white" /></Button>
                    </div>
                </div>
            </div>
        </div>
        <div className="w-[100%] flex flex-col justify-between px-4 mt-6 pb-0 sm:hidden">
            <div className="flex items-center justify-between">
                <div className="px-2 py-1 text-white rounded-lg bg-slate-800 text-sm">
                    {currentSection}
                </div>
                <div className="flex self-start text-slate-400 items-center">
                    <Timer className="mr-2" />
                    <TimerClock TestDuration="30" test={test} testSession={testSession} />
                </div>
            </div>
            <div className='flex justify-between items-center mt-2'>
                <div>
                    Question <span className='font-bold'>{currentQuestion + 1}</span> <span>{"/" + questionLength}</span>
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <div className="text center">
                        <Button className="h-8 w-15 text-sm/4 rounded-[8px] text-white bg-strong hover:bg-strong/90 px-3 my-auto text-center">Help</Button>
                    </div>
                    <div className="text center">
                        <Button className="h-8 w-15 text-sm/4 rounded-[8px] text-white bg-blue-600 hover:bg-blue-600/90 px-3 my-auto text-center">Mark</Button>
                    </div>
                    <div className="text center">
                        <Button className="h-8 w-15 text-sm/4 rounded-[8px] text-white bg-blue-600 hover:bg-blue-600/90 px-3 my-auto text-center">Review</Button>
                    </div>
                </div>
            </div>
            <div className='flex gap-4 justify-center items-center mt-2'>
                <div className="text center">
                    <Button onClick={PreviousQuestion} className="h-8 w-15 text-sm rounded-[5px] text-white bg-strong hover:bg-strong/90 px-3 my-auto text-center"><ChevronLeft className="w-4 h-4 mr-2 text-white" /> previous</Button>
                </div>
                <div className="text center">
                    <Button onClick={handleExit} className="h-8 w-15 text-sm rounded-[5px] text-white bg-red-600 hover:bg-red-600/90 px-3 my-auto text-center"> Exit Test</Button>
                </div>
            </div>
        </div>
    </>
}

export default QuestionsNav