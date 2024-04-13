"use client";

import React, { useState } from "react";
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
import { useCurrentQuestion } from "@/providers/CurrentQuestionContext";
import Options from "./Options";
/* import { useCurrentQuestion } from "@/providers/CurrentQuestionContext.js"; */

const MCQ = ({question,NextQuestion}) => {
  const options = [
    "exam",
    "TEST for fun",
    "Test for foreign",
    "test for timepass",
  ];

  const [selectedChoices, setSelectedChoices] = useState([]);
  const questionHasImage = question.image; // Set this to true if the question has an image
  const maxSelections = question.option;

  const {currentQuestion,currentSection} = useCurrentQuestion();

  console.log(currentQuestion);

  const handleOptionClick = (index) => {
    if (selectedChoices.length < maxSelections || selectedChoices.includes(index)) {
      const updatedChoices = selectedChoices.includes(index)
        ? selectedChoices.filter((choice) => choice !== index)
        : [...selectedChoices, index];
      setSelectedChoices(updatedChoices);
    }
  };

  console.log(selectedChoices);

/*   const NextQuestion = () => {
    currentQuestion < 10 - 1 ? currentQuestion + 1 : currentQuestion
};
 */
  return (
    <div className="h-[90vh] md:w-[80vw] max-w-4xl w-[90vw] flex flex-col justify-center items-center">
      {/* <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <p>
            <span className="text-slate-400">Topic</span> &nbsp;
            <span className="px-2 py-1 text-white rounded-lg bg-slate-800">
              an gre test
            </span>
          </p>
          <div className="flex self-start mt-3 text-slate-400">
            <Timer className="mr-2" />
            <TimerClock duration="30" />
          </div>
        </div>
        <div className="flex gap-5">
          <Button className="h-11 text-white bg-strong hover:bg-strong/90 px-3 my-auto text-center"><ChevronLeft className="w-4 h-4 mr-2 text-white" /> previous</Button>
        </div>
      </div> */}
      <div className="d-block sm:flex w-full justify-between mt-5">
        {questionHasImage && (
          <Image
            width={200}
            height={150}
            src={question.ImageUrl}
            alt="Question Image"
            className="w-[80%] mx-auto sm:w-[45%] sm:h-[90%] my-auto object-cover rounded-md sm:mr-4"
          />
        )}
        <div className={`${questionHasImage ? `sm:w-[50%]` : `w-full`}`}>
          <Card className="w-full mt-4 rounded-2xl">
            <CardHeader className="flex flex-row items-center">
              <CardTitle className="mr-5 text-center divide-y divide-zinc-600/50">
                <div>3</div>
                <div className="text-base text-slate-400">10</div>
              </CardTitle>
              <CardDescription className="flex-grow text-lg">
                {question.questionText}
              </CardDescription>
            </CardHeader>
          </Card>
          <div className="flex flex-col items-center justify-center w-full mt-4">
            <Options question={question} selectmode={false} />
            <Button
              variant="default"
              className="mt-2 bg-strong text-white hover:bg-strong/90"
              size="lg"
              onClick={NextQuestion}
            >
              {currentSection==="QuantativeReasoning2" && currentQuestion === 19 ? "Submit" : "Next"} <ChevronRight className="w-4 h-4 ml-2 text-white" />
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default MCQ;
