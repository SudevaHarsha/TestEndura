"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
    const [sessionStarted, setSessionStarted] = useState(false);
    const [sessionExpired, setSessionExpired] = useState(false);
    const [minutes, setMinutes] = useState(null);
    const [seconds, setSeconds] = useState(null);
    const [duration, setDuration] = useState(0); // Default duration is 0 seconds

    useEffect(() => {
        const storedSessionStarted = localStorage.getItem('sessionStarted');
        const storedSessionExpired = localStorage.getItem('sessionExpired');
        const storedMinutes = localStorage.getItem('minutes');
        const storedSeconds = localStorage.getItem('seconds');
        const storedDuration = localStorage.getItem('duration');

        console.log(storedSeconds);

        setSessionStarted(storedSessionStarted ? JSON.parse(storedSessionStarted) : false);
        setSessionExpired(storedSessionExpired ? JSON.parse(storedSessionExpired) : false);
        setMinutes(storedMinutes ? JSON.parse(storedMinutes) : null);
        setSeconds(storedSeconds ? JSON.parse(storedSeconds) : null);
        setDuration(storedDuration ? JSON.parse(storedDuration) : 0);
    }, []); // Load from localStorage only on initial render

    useEffect(() => {
        localStorage.setItem('sessionStarted', JSON.stringify(sessionStarted));
        localStorage.setItem('sessionExpired', JSON.stringify(sessionExpired));
        localStorage.setItem('minutes', JSON.stringify(minutes));
        localStorage.setItem('seconds', JSON.stringify(seconds));
        localStorage.setItem('duration', JSON.stringify(duration));
    }, [sessionStarted, sessionExpired, minutes, seconds, duration]);

    return (
        <TimerContext.Provider value={{ sessionStarted, setSessionStarted, sessionExpired, setSessionExpired, minutes, setMinutes, seconds, setSeconds, duration, setDuration }}>
            {children}
        </TimerContext.Provider>
    );
};

export const useTimer = () => {
    const {
        sessionStarted,
        setSessionStarted,
        sessionExpired,
        setSessionExpired,
        minutes,
        setMinutes,
        seconds,
        setSeconds,
        duration,
        setDuration,
    } = useContext(TimerContext);

    return {
        sessionStarted,
        setSessionStarted,
        sessionExpired,
        setSessionExpired,
        minutes,
        setMinutes,
        seconds,
        setSeconds,
        duration,
        setDuration,
    };
};
