"use client";

import React, { createContext, useState, useEffect, useContext } from "react";

const CurrentSessionContext = createContext();

export const CurrentSessionProvider = ({ children }) => {
  const [currentSession, setCurrentSession] = useState({});

  useEffect(() => {
    // Load current session from localStorage on component mount
    const savedSession = localStorage.getItem("currentSession");
    if (savedSession) {
      setCurrentSession(JSON.parse(savedSession));
    }
  }, []);

  useEffect(() => {
    // Save current session to localStorage whenever it changes
    localStorage.setItem("currentSession", JSON.stringify(currentSession));
  }, [currentSession]);

  return (
    <CurrentSessionContext.Provider
      value={{ currentSession, setCurrentSession }}
    >
      {children}
    </CurrentSessionContext.Provider>
  );
};

export const useCurrentSession = () => {
  const { currentSession, setCurrentSession } = useContext(
    CurrentSessionContext
  );

  return { currentSession, setCurrentSession };
};
