"use client"

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentQuestion } from "@/providers/CurrentQuestionContext";
import { Button } from "./ui/button";

const TimeBreak = ({ redirectTo }) => {
  const [seconds, setSeconds] = useState(15);
  const router = useRouter();

  const {currentSection,setInstructions,instructions} = useCurrentQuestion();

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      setInstructions(instructions+1);
      router.push(redirectTo);
    }
  }, [seconds, redirectTo, router]);

  const handleSkipBreak = () => {
   /*  const sectionKeys = Object.keys(questions);
    const currentIndex = sectionKeys.indexOf(currentSection);
    setCurrentSection(sectionKeys[currentIndex + 1]); */
    setInstructions(instructions+1);
    router.push(redirectTo);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Image */}
      <img
        src="/break.jpeg"
        alt="Take a break"
        className="mb-4"
        style={{ width: "400px", height: "200px" }}
      />
      {/* Slogan */}
      <div>You have completed the <span className="font-bold text-strong">{currentSection}</span> section</div>
      <div className="text-lg font-bold mb-2">Take a break champ </div>
      {/* Countdown */}
      <div className="text-xl mb-2">Redirecting in {seconds} seconds...</div>
      {/* Redirecting message */}
      <div className="text-sm text-gray-500">Sit tight!</div>

      <Button onClick={handleSkipBreak} className="h-11 text-white bg-strong hover:bg-strong/90 px-3 my-auto text-center mt-6 mb-0" >Skip Break</Button>
    </div>
  );
};

export default TimeBreak;
