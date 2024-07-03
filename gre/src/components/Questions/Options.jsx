import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { useCurrentSession } from '@/providers/CurrentSessionContext';
import { useCurrentQuestion } from '@/providers/CurrentQuestionContext';
import { FaCheckCircle } from 'react-icons/fa';

const Options = ({ question, selectmode }) => {
    const [clicked, setClicked] = useState(false);
    const questionHasImage = false; // Set this to true if the question has an image
    const maxSelections = question.option || question.options.length;
    const { selectedChoices, setSelectedChoices, previousLength, currentQuestion, result, resume } = useCurrentQuestion();
    const { currentSession } = useCurrentSession();

    const correctAnswer = question.correctAnswer;

    useEffect(() => {
        /* if (resume && currentSession && Array.isArray(currentSession.sessionAnswers[previousLength + currentQuestion])) {
            setSelectedChoices(currentSession.sessionAnswers[previousLength + currentQuestion + 1]);
            return
        } else {
            setSelectedChoices([]);
        } */
        // When the component mounts, check if there are selected choices for the current question in the session data
        console.log(currentSession.sessionAnswers[previousLength + currentQuestion]);
        if (currentSession && Array.isArray(currentSession.sessionAnswers[previousLength + currentQuestion])) {
            if (resume && currentSession && Array.isArray(currentSession.sessionAnswers[previousLength + currentQuestion])) {
                console.log("entered", currentSession.sessionAnswers[previousLength + currentQuestion + 1]);
                setSelectedChoices(currentSession.sessionAnswers[previousLength + currentQuestion + 1]);
                return
            }
            console.log("enterd 23")
            setSelectedChoices(currentSession.sessionAnswers[previousLength + currentQuestion]);
        } else {
            setSelectedChoices([]);
        }
    }, [currentSession, previousLength, currentQuestion, setSelectedChoices]);

    const handleOptionClick = (index) => {
        if (selectedChoices.length === maxSelections && !selectedChoices.includes(index)) {
            // Automatically deselect the previous option and select the new option
            const updatedChoices = [...selectedChoices.slice(1), index];
            setSelectedChoices(updatedChoices);
        } else {
            // Handle normal selection/deselection behavior
            const updatedChoices = selectedChoices.includes(index)
                ? selectedChoices.filter((choice) => choice !== index)
                : [...selectedChoices, index];
            setSelectedChoices(updatedChoices);
        }
        setClicked(true);
    };    

    return (
        <>
            {!result && selectmode === false && question?.options.map((option, index) => (
                <Button
                    key={option}
                    variant={
                        selectedChoices?.includes(index) ? "default" : "outline"
                    }
                    className={`justify-start w-full py-8 mb-4 rounded hover:bg-gray-200 ${selectedChoices?.includes(index)
                        ? "bg-black text-white hover:bg-black"
                        : "bg-slate-100 text-black"
                        }`}
                    onClick={() => {
                        setClicked(true);
                        handleOptionClick(index)
                    }}
                >
                    <div className="flex items-center justify-center">
                        <div className={`w-7 h-7 mr-5 flex items-center justify-center border ${question.option === 1 ? "rounded-full" : ""} ${selectedChoices?.includes(index) ? "" : "border-black"}`}>{index + 1}</div>
                        <div className="text-start">{option}</div>
                    </div>

                </Button>
            ))}

            {result && selectmode === false && question?.options.map((option, index) => {
                console.log(selectedChoices.includes(index), selectedChoices, currentQuestion, !correctAnswer.includes(index), index);
                return <Button
                    key={option}
                    variant={
                        selectedChoices.includes(index) ? "default" : "outline"
                    }
                    className={`justify-between w-full py-8 mb-4 rounded hover:bg-gray-200 ${correctAnswer.includes(index) ? "bg-green-400 text-white hover:bg-green-500 hover:text-white" : selectedChoices.includes(index) && !correctAnswer.includes(index)
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-slate-100 text-black"
                        }`}
                    onClick={() => {
                        setClicked(true);
                        handleOptionClick(index)
                    }}
                >
                    <div className="flex items-center justify-start">
                        <div className="p-2 px-3 mr-5 border">{index + 1}</div>
                        <div className="text-start">{option}</div>
                    </div>
                    {(correctAnswer.includes(index) && selectedChoices.includes(index)) && <div>
                        <FaCheckCircle size={32} color="green" />
                    </div>}
                </Button>

            })}

        </>
    )
}

export default Options;