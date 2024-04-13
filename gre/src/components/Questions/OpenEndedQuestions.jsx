"use client"

import React, { useEffect, useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Timer } from "lucide-react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import TimerClock from "../Timer";

import Image from "next/image"
import Options from "./Options";
import { useCurrentQuestion } from "@/providers/CurrentQuestionContext";
import { useCurrentSession } from "@/providers/CurrentSessionContext";
import { FaCheck, FaCross } from "react-icons/fa";

const OpenEndedQuestions = ({ question, NextQuestion }) => {
  /* const blanksNumber = Array(5).fill(question.numberOfBlanks);
  console.log(blanksNumber); */

  const blanksData = [
    {
      id: 1,
      type: "input",
      sentence: "The capital of __________ is __________.",
      blanks: ["country", "capital"],
    },
    {
      id: 2,
      type: "numeric",
      sentence: "Enter a number between 100 to 200",
      range: { min: 1, max: 100 },
    },
    {
      id: 3,
      type: "multiple-choice",
      sentence: "Which of the following is a fruit? __________",
      choices: ["Carrot", "Apple", "Potato"],
    },
    // Add more blank question data as needed
  ];

  const { currentSession } = useCurrentSession();
  const { selectedChoices, setSelectedChoices, previousLength, currentQuestion, currentSection, result } = useCurrentQuestion();
  /* const [currentQuestion, currentSection, currentBlankIndex, setCurrentBlankIndex] = useState(0); */
  const questionHasImage = false; // Set this to true if the question has an image

  const currentBlank = question;

  useEffect(() => {
    // When the component mounts, check if there are selected choices for the current question in the session data
    if (currentSession && Array.isArray(currentSession.sessionAnswers[previousLength + currentQuestion])) {
      setSelectedChoices(currentSession.sessionAnswers[previousLength + currentQuestion]);
    } else {
      setSelectedChoices([]);
    }
  }, [currentSession, previousLength, currentQuestion]);

  console.log(previousLength + currentQuestion);

  /* const handleBlankChange = () => {
    setCurrentBlankIndex((prevIndex) =>
      prevIndex < blanksData.length - 1 ? prevIndex + 1 : prevIndex
    );
    setSelectedChoices([]);
  }; */

  /* console.log(selectedChoices); */

  const maxSelections = question.numberOfBlanks || question.options.length;

  const correctAnswers = question.correctAnswer;

  const handleOptionClick = (index) => {
    const groupIndex = Math.floor(index / 3); // Calculate the group index based on the option index
    const startIndex = groupIndex * 3; // Calculate the start index of the group
    const endIndex = startIndex + 2; // Calculate the end index of the group

    // Remove all options in the group from selectedChoices array
    const filteredChoices = selectedChoices.filter(
      (choiceIndex) => choiceIndex < startIndex || choiceIndex > endIndex
    );

    // Add the clicked option to the selectedChoices array
    setSelectedChoices([...filteredChoices, index]);
  };

  const groupedOptions = [];
  for (let i = 0; i < question.blankOptions.length; i += 3) {
    groupedOptions.push(question.blankOptions.slice(i, i + 3));
  }

  /*  console.log(selectedChoices); */

  return (
    <div className="h-[90vh] md:w-[80vw] max-w-4xl w-[90vw] flex flex-col items-center justify-center">
      {/* ... (previous code) */}
      <div className="d-block sm:flex w-full justify-between mt-5">
        {/* ... (previous code) */}
        <div className={`${questionHasImage ? "sm:w-[50%]" : "w-full"}`}>
          <div>
            {

              <div className="bg-gray-200 p-4 text-strong flex items-center justify-center rounded-2xl text-center">select any 1 option from the given sets below</div>
            }
          </div>
          <Card className="w-full mt-4 rounded-2xl">
            <CardHeader className="flex flex-row items-center">
              <CardTitle className="mr-5 text-center divide-y divide-zinc-600/50">
                <div>3</div>
                <div className="text-base text-slate-400">10</div>
              </CardTitle>
              <CardDescription className="flex-grow text-lg">
                {currentBlank.questionText}
              </CardDescription>
            </CardHeader>
          </Card>
          <div className="flex flex-col items-center justify-center w-full mt-4">
            {currentBlank.blankType === "input" ? (
              // Render input fields for blanks
              currentBlank.blanks.map((blank, index) => (
                <input
                  key={index}
                  type="number"
                  placeholder={`Enter ${blank}`}
                  value={selectedChoices[index] || ""}
                  onChange={(e) => {
                    const updatedChoices = [...selectedChoices];
                    updatedChoices[index] = e.target.value;
                    setSelectedChoices(updatedChoices);
                  }}
                  className="border-b p-2 mb-4 focus:outline-none focus:border-strong/70"
                />
              ))
            ) : currentBlank.blankType === "numeric" ? (
              // Render numeric input
              <div>
                <input
                  type="number"
                  placeholder={`Enter a number`}
                  value={selectedChoices[0] || ""}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setSelectedChoices([value]);
                  }}
                  className="border-b p-2 mb-4 focus:outline-none focus:border-strong/70"
                />
                {result && selectedChoices[0] === question.correctNumeric && <FaCheck />}
                {result && selectedChoices[0] != question.correctNumeric && selectedChoices[0] && <FaCross />}
              </div>
            ) :
              currentBlank.blankType === "numeric units" ? (
                <>
                  <div>
                    <input
                      type="number"
                      placeholder={`Enter a number`}
                      value={selectedChoices[0] || ""}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        const updatedChoices = [value, selectedChoices[1]];
                        setSelectedChoices(updatedChoices);
                      }}
                      className="border-b p-2 mb-4 focus:outline-none focus:border-strong/70"
                    />
                    {result && selectedChoices[0] === question.correctNumeric && <FaCheck />}
                    {result && selectedChoices[0] != question.correctNumeric && <FaCross />}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder={`Enter a unit`}
                      value={selectedChoices[1] || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        const updatedChoices = [selectedChoices[0], value];
                        setSelectedChoices(updatedChoices);
                      }}
                      className="border-b p-2 mb-4 focus:outline-none focus:border-strong/70"
                    />
                    {result && selectedChoices[1] === question.units && <FaCheck />}
                    {result && selectedChoices[1] != question.units && <FaCross />}
                  </div>
                </>
              )
                : currentBlank.blankType === "fraction" ? (
                  <>
                    <div>
                      <input
                        type="number"
                        placeholder={`Enter a numerator`}
                        value={selectedChoices[0] || ""}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          const updatedChoices = [value, selectedChoices[1]];
                          setSelectedChoices(updatedChoices);
                        }}
                        className="border-b p-2 mb-4 focus:outline-none focus:border-strong/70"
                      />
                      {result && selectedChoices[0] === question.numerator && <FaCheck />}
                      {result && selectedChoices[0] != question.numerator && <FaCross />}
                    </div>
                    <div>
                      <input
                        type="number"
                        placeholder={`Enter a denominator`}
                        value={selectedChoices[1] || ""}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          const updatedChoices = [selectedChoices[0], value];
                          setSelectedChoices(updatedChoices);
                        }}
                        className="border-b p-2 mb-4 focus:outline-none focus:border-strong/70"
                      />
                      {result && selectedChoices[1] === question.denominator && <FaCheck />}
                      {result && selectedChoices[1] != question.denominator && <FaCross />}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center w-[85%]">
                    {groupedOptions.map((group, groupIndex) => (
                      <div key={groupIndex} className="flex flex-col justify-between w-full mt-4 rounded">
                        {!result && group.map((option, index) => (
                          <Button
                            key={groupIndex * 3 + index}
                            variant={
                              selectedChoices.includes(groupIndex * 3 + index)
                                ? "default"
                                : "outline"
                            }
                            className={`w-[90%] py-4 mb-4 rounded hover:bg-gray-200 ${selectedChoices.includes(groupIndex * 3 + index)
                              ? "bg-black text-white hover:bg-black"
                              : "bg-slate-100 text-black"
                              }`}
                            onClick={() => handleOptionClick(groupIndex * 3 + index)}
                          >
                            {option}
                          </Button>
                        ))}
                        {result && group.map((option, index) => (
                          <Button
                            key={groupIndex * 3 + index}
                            variant={
                              selectedChoices.includes(groupIndex * 3 + index)
                                ? "default"
                                : "outline"
                            }
                            className={`w-[90%] py-4 mb-4 rounded hover:bg-gray-200 ${correctAnswers.includes(groupIndex * 3 + index) ? "bg-green-400 text-white hover:bg-green-500 hover:text-white" : selectedChoices.includes(groupIndex * 3 + index) && !correctAnswers.includes(groupIndex * 3 + index)
                              ? "bg-red-500 text-white hover:bg-red-600"
                              : "bg-slate-100 text-black"
                              }`}
                            onClick={() => handleOptionClick(groupIndex * 3 + index)}
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    ))}
                  </div>
                )
            }
            <Button
              variant="default"
              className="mt-2 bg-strong text-white hover:bg-strong/90"
              size="lg"
              onClick={NextQuestion}
            >
              {currentSection === currentSession.test.sections[-1] && currentQuestion === 19 ? "Submit" : "Next"} <ChevronRight className="w-4 h-4 ml-2 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenEndedQuestions;
