"use client";

import React, { createContext, useContext, useState } from "react";

const CurrentTestContext = createContext();

export const CurrentTestProvider = ({ children }) => {
  const [currentTest, setCurrentTest] = useState([]);
  const [currentTestCategory, setCurrentTestCategory] = useState([]);
  const [currentTestSection, setCurrentTestSection] = useState([]);

  const [caluculator,setCaluculator] = useState(false);

  console.log(currentTest);

  const value = {
    currentTest, setCurrentTest,
    currentTestSection, setCurrentTestSection,
    currentTestCategory, setCurrentTestCategory,
    caluculator,setCaluculator,
  };

  return (
    <CurrentTestContext.Provider value={value}>
      {children}
    </CurrentTestContext.Provider>
  );
};

export const useCurrentTest = () => {
  const {
    currentTest, setCurrentTest,
    currentTestSection, setCurrentTestSection,
    currentTestCategory, setCurrentTestCategory,
    caluculator,setCaluculator,
  } = useContext(CurrentTestContext);

  return {
    currentTest, setCurrentTest,
    currentTestSection, setCurrentTestSection,
    currentTestCategory, setCurrentTestCategory,
    caluculator,setCaluculator,
  };
};
