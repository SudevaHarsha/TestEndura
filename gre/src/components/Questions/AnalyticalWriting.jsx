import React, { useEffect, useRef, useState } from 'react';
import { CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea"
import { useCurrentQuestion } from '@/providers/CurrentQuestionContext';
import { useCurrentSession } from '@/providers/CurrentSessionContext';
import dynamic from 'next/dynamic';

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

const AnalyticalWritingPage = ({ NextQuestion, question }) => {
  const { setCurrentQuestion, setSelectedChoices, selectedChoices, previousLength, currentQuestion, currentSection, resume } = useCurrentQuestion();
  const { currentSession } = useCurrentSession();
  const [essay, setEssay] = useState('');

  const editor = useRef(null)

  const contentFieldChanaged = (data) => {
    setEssay(data);
    setSelectedChoices([data]);
    return false
  }
  const handleSubmitEssay = (essay) => {
    // Handle submission logic here
    console.log('Submitted Essay:', essay);
    setCurrentQuestion(3);
    NextQuestion();
  };

  useEffect(() => {
    /* if (resume && currentSession && Array.isArray(currentSession.sessionAnswers[previousLength + currentQuestion])) {
        setSelectedChoices(currentSession.sessionAnswers[previousLength + currentQuestion + 1]);
        return
    } */
    // When the component mounts, check if there are selected choices for the current question in the session data
    if (currentSession && Array.isArray(currentSession.sessionAnswers[previousLength + currentQuestion])) {
      if (resume) {
        console.log("entered", currentSession.sessionAnswers[previousLength + currentQuestion + 1]);
        setSelectedChoices(currentSession.sessionAnswers[previousLength + currentQuestion + 1]);
        setEssay(currentSession.sessionAnswers[previousLength + currentQuestion + 1][0])
        return
      }
      setSelectedChoices(currentSession.sessionAnswers[previousLength + currentQuestion]);
      setEssay(currentSession.sessionAnswers[previousLength + currentQuestion][0])
      console.log(currentSession.sessionAnswers[previousLength + currentQuestion][0])
    }
  }, [currentSession, previousLength, currentQuestion, setSelectedChoices]);

  return (
    <div className="container mx-auto p-4 w-full">
      <div className="flex flex-col items-center justify-center mx-auto">
        <div className="w-[90%] text-justify">
          <div>
            In this section, you will be presented with an essay prompt. Please read the prompt carefully and write
            your essay in the text box provided below.
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-2 text-justify w-full">
          <div className="w-[90%]">
            <div className='border-b-2 mb-2 pb-1'>
              <strong>Prompt:</strong> {currentSession.prompt}
            </div>
            <div>
              {question.prompt}
            </div>
          </div>

          <div className="mt-4 w-[90%] rounded-2xl">
            {/* <Textarea placeholder="Write your essay here..." rows={10} className="rounded-2xl h-[500px]" value={selectedChoices[0] || ""}
              onChange={(e) => {
                setSelectedChoices([e.target.value]);
              }} /> */}
            <JoditEditor
              ref={editor}
              value={essay}
              onChange={(newContent) => contentFieldChanaged(newContent)}
            />
          </div>

          <div className="flex justify-end mt-4">
            <Button onClick={handleSubmitEssay} variant="primary" className="bg-strong text-white hover:bg-strong/80">
              Submit Essay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticalWritingPage;
