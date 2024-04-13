"use client";

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

const DataInterpretationQuestions = ({ question, NextQuestion }) => {
    const options = [
        "exam",
        "TEST for fun",
        "Test for foreign",
        "test for timepass",
    ];

    const { currentQuestion, currentSection, setSelectedChoices, selectedChoices, previousLength, result, resume } = useCurrentQuestion();
    const { currentSession } = useCurrentSession();

    /*     const [selectedChoices, setSelectedChoices] = useState([]); */
    const questionHasImage = false;

    const correctAnswer = question.options;
    console.log(correctAnswer, selectedChoices);


    useEffect(() => {
        /* if (resume && currentSession && Array.isArray(currentSession.sessionAnswers[previousLength + currentQuestion])) {
            setSelectedChoices(currentSession.sessionAnswers[previousLength + currentQuestion + 1]);
            return
        } */
        // When the component mounts, check if there are selected choices for the current question in the session data
        if (question.select && currentSession && Array.isArray(currentSession.sessionAnswers[previousLength + currentQuestion])) {
            if (resume) {
                console.log("entered", currentSession.sessionAnswers[previousLength + currentQuestion + 1]);
                setSelectedChoices(currentSession.sessionAnswers[previousLength + currentQuestion + 1]);
                return
            }
            setSelectedChoices(currentSession.sessionAnswers[previousLength + currentQuestion]);
            console.log(currentSession.sessionAnswers[previousLength + currentQuestion])
        }
    }, [currentSession, previousLength, currentQuestion, setSelectedChoices]);

    return (
        <div className="p-2 pt-4 sm:p-2 sm:pt-4 h-auto w-full sm:flex gap-4">
            <div className="p-4 text-justify border rounded-2xl sm:w-[50%] flex justify-center items-center">
                {/* <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit eum similique nihil tenetur dolorum hic veritatis ut consequuntur, minima architecto eaque eos eveniet odit odio. In deleniti impedit veritatis! Adipisci!</div>
                <Image
                    width={500}
                    height={100}
                    src={question.images[0]}
                    alt="Question Image"
                    className="w-[80%] mx-auto sm:w-[80%] sm:h-[30%] my-auto object-cover rounded-md sm:m-auto"
                />
                <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit eum similique nihil tenetur dolorum hic veritatis ut consequuntur, minima architecto eaque eos eveniet odit odio. In deleniti impedit veritatis! Adipisci!</div>
                <Image
                    width={500}
                    height={150}
                    src={question.images[1]}
                    alt="Question Image"
                    className="w-[80%] mx-auto sm:w-[80%] sm:h-[30%] my-auto object-cover rounded-md sm:m-auto"
                /> */}
                <div dangerouslySetInnerHTML={{__html: question?.question}} className="flex flex-col justify-center items-center max-w-full overflow-clip" />
            </div>
            <div className="d-block sm:flex sm:w-[50%] justify-between mt-5">
                <div className={`${questionHasImage ? `sm:w-[50%]` : `w-full`} flex justify-center items-center flex-col gap-4`}>
                    <Card className="w-full rounded-2xl">
                        <CardHeader className="flex flex-row items-center">
                            <CardTitle className="mr-5 text-center divide-y divide-zinc-600/50 flex items-center justify-center">
                                <div className="mt-1">Q :{question.questionText}</div>
                            </CardTitle>
                            {/* <div className="flex-grow text-lg">
                                {question?.questionText}
                            </div> */}
                        </CardHeader>
                    </Card>
                    {question.options.length > 0 && <div className="flex flex-col items-center justify-center w-full mt-4">
                        {console.log('options data')}
                        <Options question={question} selectmode={false} />
                        <Button
                            variant="default"
                            className="mt-2 bg-strong text-white hover:bg-strong/90"
                            size="lg"
                            onClick={NextQuestion}
                        >
                            {currentSection === currentSession.test.sections[-1] && currentQuestion === 19 ? "Submit" : "Next"} <ChevronRight className="w-4 h-4 ml-2 text-white" />
                        </Button>
                    </div>}
                    {!question.options.length > 0 && question.optionType === "numeric" && (
                        // Render numeric input
                        <div className="flex justify-center items-center">
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
                    )}
                    {!question.options.length > 0 && question.optionType === 'numeric units' && <>
                        <div className="flex justify-center items-center">
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
                        <div className="flex justify-center items-center">
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
                    </>}
                    {!question.options.length > 0 && question.optionType === 'fraction' && <>
                        <div className="flex justify-center items-center">
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
                        <div className="flex justify-center items-center">
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
                    </>}
                    {!question.options.length > 0 && <Button
                        variant="default"
                        className="mt-2 bg-strong text-white hover:bg-strong/90"
                        size="lg"
                        onClick={NextQuestion}
                    >
                        {currentSection === currentSession.test.sections[-1] && currentQuestion === 19 ? "Submit" : "Next"}
                    </Button>}
                </div>
            </div>

        </div>
    );
};

export default DataInterpretationQuestions;
