"use client"

import { useCurrentQuestion } from '@/providers/CurrentQuestionContext';
import { useCurrentSession } from '@/providers/CurrentSessionContext';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const TimerClock = ({ TestDuration, test, testSession }) => {
    const [sessionStarted, setSessionStarted] = useState(false);
    const [sessionExpired, setSessionExpired] = useState(false);
    const [minutes, setMinutes] = useState(null);
    const [seconds, setSeconds] = useState(null);

    const { currentSection, currentQuestion } = useCurrentQuestion();
    const {currentSession} = useCurrentSession();

/*     const testSession = currentSession;

    console.log(currentSession); */

    const date = new Date();
    date.setHours(23, 37, 0, 0);

    const router = useRouter();

    const onTimeout = () => {
        console.log("end");
        router.push("/timeout")
    }

    let sectionEndTime = new Date();;

    if (testSession.sectionEndTimes && testSession.finished === false && currentQuestion) {
        const sectionEndTimesLength = testSession.sectionEndTimes.length;

        console.log("resumed");

        if (sectionEndTimesLength > 0) {
            const sectionEnd = new Date(testSession.sectionEndTimes[sectionEndTimesLength - 1]);
            const sectionStart = sectionEndTimesLength === 1 ? new Date(testSession.startTime) : new Date(currentSession?.sectionEndTimes[sectionEndTimesLength - 2]);

            const remainingDuration = sectionEnd.getTime() - sectionStart.getTime();
            const currentDate = new Date();

            sectionEndTime = new Date(currentDate.getTime() + remainingDuration);
        }
    }

    if (testSession.duration === "") {
        const sections = test.sectionDuration; // Assuming test.sections is an array of section durations
        // Calculate the start time of the current section
        let totalDuration = 0;
        const sectionStartTime = new Date();

        // Get the duration of the current section
        const index = test.sections.indexOf(currentSection);
        const sectionDuration = sections[index];
        /* sectionEndTime = new Date(sectionDurationString); */

        // Calculate the end time of the current section

        sectionEndTime = new Date(sectionStartTime.getTime() + sectionDuration * 60000);
    }

    useEffect(() => {
        const countDownTime = date.getTime() + TestDuration * 1000;

        const timer = setInterval(() => {
            const now = new Date();
            const distance = sectionEndTime - now.getTime();

            const remainingMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const remainingSeconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance <= 0) {
                clearInterval(timer);
                setSessionExpired(true);
                onTimeout();
            } else {
                setSessionStarted(true);
                setMinutes(remainingMinutes);
                setSeconds(remainingSeconds);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [TestDuration]);

    return (
        <div>
            {sessionStarted && !sessionExpired ? (
                <div>
                    <p>Remaining time: {minutes} : {seconds}</p>
                </div>
            ) : sessionExpired ? (
                <div>
                    <p>Session expired</p>
                </div>
            ) : (
                <div>
                    <p>Timer not started yet</p>
                </div>
            )}
        </div>
    );
};


export default TimerClock;
