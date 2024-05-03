"use client";

import React, { useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Options from "./Options";
import { useCurrentQuestion } from "@/providers/CurrentQuestionContext";
import { useRouter } from "next/navigation";
import Image from "next/image"
import ScientificCalculator from "./ScientificCaluculator";
import { useCurrentTest } from "@/providers/CurrentTestDetails";
import { FaCalculator } from "react-icons/fa";

const QuantitativeQuestions = ({ question, NextQuestion }) => {
  const router = useRouter();

  /* const { caluculator, setCaluculator } = useCurrentTest(); */
  const [openCaluculator, setOpenCaluculator] = useState(false);

  const quantities = [
    {
      label: "Quantity 1",
      value: "The sum of the first 10 positive integers.",
    },
    {
      label: "Quantity 2",
      value: "Twice the average of the first 10 positive integers.",
    },
  ];

  const { currentQuestion, currentSection } = useCurrentQuestion();

  const handleNextQuestion = () => {
    if (currentQuestion === 8) {
      router.push("/submission"); // Navigate to the submit page
    } else {
      NextQuestion();
    }
  };

  const handleCaluculatorOpen = () => {
    setOpenCaluculator(!openCaluculator);
  }

  const options = [
    "A is greater",
    "B is greater",
    "The two quantities are equal",
    "The relationship cannot be determined from the information given",
  ];

  const [selectedChoices, setSelectedChoices] = useState([]);
  const questionHasImage = question.image;

  console.log(question.ImageUrl1);

  return <>
    <div className="h-auto md:w-[80vw] max-w-4xl w-[90vw] flex flex-col justify-center items-center">
      <div className="w-10">fugadjgmam</div>
      <div className="d-block sm:flex w-full justify-between mt-5">
        <div className={`${questionHasImage ? `w-full` : `w-full`}`}>
          <Card className="w-full mt-4 rounded-2xl">
            <CardHeader className="flex flex-row items-center">
              <CardHeader className="flex-grow text-lg">
                {question.questionText}
                <div className="flex flex-row justify-center gap-4">
                  <div
                    className={`w-[50%] flex flex-col justify-center items-center text-center border-r-2 pr-1}`
                    }
                  >
                    <div className="font-semibold">Quantity-1:</div>
                    <div className="pt-2">{question.Quantity1}</div>
                    {/* Add image for Quantity 1 */}
                    {questionHasImage && <Image
                      width={100}
                      height={80}
                      src={question.ImageUrl1}
                      alt="Quantity 1 Image"
                      className="h-48 w-80 mt-4"
                    />}
                  </div>
                  <div
                    className={`w-[50%] flex flex-col justify-center items-center text-center }`
                    }
                  >
                    <div className="font-semibold">Quantity-2:</div>
                    <div className="pt-2">{question.Quantity2}</div>
                    {/* Add image for Quantity 2 */}
                    {questionHasImage && <Image
                      width={100}
                      height={80}
                      src={question.ImageUrl2}
                      alt="Quantity 2 Image"
                      className="h-48 w-80 mt-4"
                    />}
                  </div>
                </div>
              </CardHeader>
            </CardHeader>
          </Card>
          <div className="flex flex-col items-center justify-center w-full mt-4">
            <Options question={question} selectmode={false} />
            <Button
              variant="default"
              className="mt-2 bg-strong text-white hover:bg-strong/90"
              size="lg"
              onClick={handleNextQuestion}
            >
              {currentSection === "QuantativeReasoning2" && currentQuestion === 19 ? "Submit" : "Next"}{" "}
              <ChevronRight className="w-4 h-4 ml-2 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </>
};

export default QuantitativeQuestions;
