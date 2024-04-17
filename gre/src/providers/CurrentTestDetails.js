"use client";

import React, { createContext, useContext, useState } from "react";

const CurrentTestContext = createContext();

export const CurrentTestProvider = ({ children }) => {
  const [currentTest, setCurrentTest] = useState([]);

  console.log(currentTest);

  const value = {
    currentTest, setCurrentTest
  };

  return (
    <CurrentTestContext.Provider value={value}>
      {children}
    </CurrentTestContext.Provider>
  );
};

export const useCurrentTest = () => {
  const {
    currentTest, setCurrentTest
  } = useContext(CurrentTestContext);

  return {
    currentTest, setCurrentTest
  };
};
