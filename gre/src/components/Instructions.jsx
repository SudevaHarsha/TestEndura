"use client"

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useCurrentQuestion } from '@/providers/CurrentQuestionContext';
import questions from '@/data/Questions';
import { useCurrentSession } from '@/providers/CurrentSessionContext';

const Instructions = ({ sessionId }) => {

  const { instructions, setInstructions, setCurrentQuestion, currentSection, setCurrentSection, currentQuestion } = useCurrentQuestion();
  const { currentSession, setCurrentSession } = useCurrentSession();

  const sectionKeys = Object.keys(questions);
  const currentIndex = sectionKeys.indexOf(currentSection);

  console.log(sessionId);

  const router = useRouter();

  console.log(sectionKeys.length)
/*   if (sectionKeys.length > 1) {
    console.log("only one")
    setInstructions(currentIndex + 1);
  }

  console.log(instructions); */

  const handleClick = () => {
    console.log("instructionsclicked");
    const sectionKeys = Object.keys(questions);
    const currentIndex = sectionKeys.indexOf(currentSection);

    if (instructions === 0) {
      setInstructions(instructions + 1);
      const sectionKeys = Object.keys(questions);
      router.push(`/insrtructions/${currentSession.id}`);
      return
    }
    if (sectionKeys.length > 1 && currentSection === currentSession.test.sections[0] && currentQuestion === 0 /* && currentSession.currentQuestion === 0 */) {
      console.log("first");
      router.push(`/mock-tests/${currentSession.id}`);

      /* setInstructions(instructions + 1); */
      return
    } /* else {
      router.push(`/mock-tests/resume-test/${currentSession.id}`)
    } */
    console.log(instructions);
    /* setCurrentSection(sectionKeys[currentIndex + 1]) */
    if (currentIndex < sectionKeys.length - 1) {
      setCurrentQuestion(0);
      /*       currentEndTime();
     */
      if (currentSession.currentQuestion === 0) {
        setCurrentSection(sectionKeys[currentIndex + 1]);
        router.push(`/mock-tests/${currentSession.id}`);
        /* setInstructions(instructions + 1); */
      } else {
        setCurrentSection(sectionKeys[currentIndex + 1]);
        router.push(`/mock-tests/resume-test/${currentSession.id}`);
        /* setInstructions(instructions + 1); */
      }
    } else {
      console.log('Quiz finished');
      setCurrentQuestion(0);
      setCurrentSection(sectionKeys[0]);
      router.push("/mock-tests")
      // You can handle quiz completion here
    }
  }

  const stmt = instructions === 0 ? "GRE MOCK TEST" :
    sectionKeys[instructions - 1] === 'AnalyticalWriting' ? "ANALYTICAL WRITING" :
      sectionKeys[instructions - 1] === 'VerbalReasoning1' ? "VERBAL REASONING-1" :
        sectionKeys[instructions - 1] === 'VerbalReasoning2' ? "VERBAL REASONING 2" :
          sectionKeys[instructions - 1] === 'QuantativeReasoning1' ? "QUANTITATIVE ANALYSIS 1" :
            sectionKeys[instructions - 1] === 'QuantativeReasoning2' ? "QUANTITATIVE ANALYSIS 2" : "";

  console.log(stmt, sectionKeys[instructions - 1]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">{stmt}</h1>

      {/* <Card className="rounded-xl p-6">
        <CardHeader>
          <CardTitle>General Instructions</CardTitle>
        </CardHeader>
        <CardDescription>
          <ul className="list-disc pl-6">
            <li>Ensure you have a stable internet connection before starting the test.</li>
            <li>You will have a total of 3 hours to complete the test.</li>
            <li>There will be multiple-choice questions, reading comprehension passages, quantitative questions, and open-ended questions.</li>
            <li>Each question may have one or more correct answers.</li>
            <li>Do not refresh the page during the test, as it may lead to loss of progress.</li>
            <li>Once you start the test, the timer will begin, and it will not stop even if you leave the page.</li>
          </ul>
        </CardDescription>
      </Card>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">How to Answer Different Question Types</h2>

        <Card className="rounded-xl p-6">
          <CardHeader>
            <CardTitle>Multiple Choice Questions</CardTitle>
          </CardHeader>
          <CardDescription>
            <p>Select the correct option by clicking on the radio button next to it. You can choose only one answer.</p>
          </CardDescription>
        </Card>

        <Card className="mt-4 rounded-xl p-6">
          <CardHeader>
            <CardTitle>Reading Comprehension</CardTitle>
          </CardHeader>
          <CardDescription>
            <p>Read the passage carefully and answer the questions based on the information provided in the passage.</p>
            <p>Some questions may ask you to select specific sentences from the passage.</p>
          </CardDescription>
        </Card>

      </div> */}

      {
        sectionKeys.length > 1 && instructions === 0 && <div className="flex flex-col items-center justify-center">
          <div className="bg-gray-100 p-6 rounded-sm shadow-md w-full">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">MJ Academy GRE Practice Test</h2>
            <p className="text-gray-700 mb-6">
              This practice test consists of five sections: an Analytical Writing section, two Quantitative sections, and two Verbal sections. Standard timing for the entire test is roughly 2 hours (longer if you have extended time). Standard section lengths are as follows:
            </p>
            <ul className="text-gray-700 mb-6 list-disc pl-6">
              <li>Analytical Writing: 30 minutes</li>
              <li>Quantitative: 121 minutes</li>
              <li>Quantitative 2: 26 minutes</li>
              <li>Verbal 1: 18 minutes</li>
              <li>Verbal 2: 23 minutes</li>
            </ul>
            <p className="text-gray-700 mb-6">
              The Verbal and Quantitative sections can be in a different order than what you see above. There are 60-second breaks between each section.
            </p>
            <p className="text-gray-700 mb-6">
              The test is meant to be taken in one sitting. Try to find a two-hour block of time to take the full practice test. If you are taking the test with extended time, be sure to factor that in.
            </p>
            <p className="text-gray-700 mb-6">
              During the test, hit the Continue or Next buttons to advance to the next section. If you hit the Exit Section button before finishing a section, you will advance to the next section. If you hit the Quit w/Save button, you will end your test and receive a score. Don&quot;t select that option unless you want to finish your test.
            </p>
            <p className="text-gray-700 mb-6">
              If you have any questions, reach out to your instructor or email us at <a href="mailto:kaplanGREfeedback@kaplan.com" className="text-blue-500 hover:underline">kaplanGREfeedback@kaplan.com</a>.
            </p>
            <div className="flex justify-center">
            </div>
          </div>
        </div>
      }

      {
        sectionKeys[instructions - 1] === 'AnalyticalWriting' && <div className="bg-gray-100 p-6 rounded-sm shadow-md">
          <h2 className="text-xl font-semibold mb-4">Analytical Writing</h2>
          <p className="mb-4">
            Analyze an Issue Task
          </p>
          <p className="mb-4">
            You will be given a brief quotation that states or implies an issue of general interest, and you will also be given specific instructions on how to respond to that issue. Standard timing for this task is 30 minutes. In that time you should plan and compose a response to the issue presented. A response to any other issue will receive a score of zero. Make sure that you respond according to the specific instructions and support your position on the issue with reasons and examples drawn from such areas as your reading, experience, observations, and/or academic studies.
          </p>
          <p className="mb-4">
            Trained GRE readers will evaluate your response according to how well you:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Respond to the specific task instructions</li>
            <li>Consider the complexities of the issue</li>
            <li>Organize, develop, and express your ideas</li>
            <li>Support your position with relevant reasons and/or examples</li>
            <li>Control the elements of standard written English</li>
          </ul>
          <p className="mb-4">
            Before you begin writing, you may want to think for a few minutes about the issue and the specific task instructions and then plan your response. Be sure to develop your position fully and organize it coherently, but leave time to reread what you have written and make any revisions you think are necessary.
          </p>
          <p>
            Select Continue to proceed. Timing for the task will start when you do so.
          </p>
        </div>
      }

      {
        (sectionKeys[instructions - 1] === 'VerbalReasoning1' || sectionKeys[instructions - 1] === 'VerbalReasoning2') && <div className="bg-gray-100 p-6 rounded-sm shadow-md">
          <h2 className="text-xl font-semibold mb-4">Verbal Reasoning, 12 Questions 21 minutes (standard time)</h2>
          <p>
            For each question, indicate the best answer, using the directions given. If you need more detailed directions, select Help at any time.
          </p>
          <p>
            If a question has answer choices with ovals, then the correct answer consists of a single choice. If a question has answer choices with square boxes, then the correct answer consists of one or more answer choices. Read the directions for each question carefully. The directions will indicate if you should select one or more answer choices. To answer questions based on a reading passage, you may need to scroll to read the entire passage. You may also use your keyboard to navigate through the passage.
          </p>
          <div>
            Select Continue to proceed,
          </div>
        </div>
      }

      {
        (sectionKeys[instructions - 1] === 'QuantativeReasoning1' || sectionKeys[instructions - 1] === 'QuantativeReasoning2') && <div className="bg-gray-100 p-6 rounded-sm shadow-md">
          <h2 className="text-xl font-semibold mb-4">Quantitative Reasoning, 12 Questions 21 minutes (standard time)</h2>
          <p className="mb-4">
            For each question, indicate the best answer, using the directions given. If you need more detailed directions, select Help at any time.
          </p>
          <p className="mb-4">
            An on-screen calculator is available for each question in this section. To use the calculator, select the calculator button.
          </p>
          <p className="mb-4">
            If a question has answer choices with ovals, then the correct answer consists of a single choice. If a question has answer choices with square boxes, then the correct answer consists of one or more answer choices. Read the directions for each question carefully. The directions will indicate if you should select one or more answer choices. To answer questions based on a data presentation, you may need to scroll or use your keyboard to access the entire presentation.
          </p>
          <p className="mb-4">
            All numbers used are real numbers.
          </p>
          <p className="mb-4">
            All figures are assumed to lie in a plane unless otherwise indicated.
          </p>
          <p className="mb-4">
            Geometric figures, such as lines, circles, triangles, and quadrilaterals, are not necessarily drawn to scale. That is, you should not assume that quantities such as lengths and angle measures are as they appear in a figure. You should assume, however, that lines shown as straight are actually straight, points on a line are in the order shown, and more generally, all geometric objects are in the relative positions shown. For questions with geometric figures, you should base your answers on geometric reasoning, not on estimating or comparing quantities by sight or by measurement.
          </p>
          <p className="mb-4">
            Coordinate systems, such as xy-planes and number lines, are drawn to scale; therefore you can read, estimate, or compare quantities in such figures by sight or by measurement.
          </p>
          <p className="mb-4">
            Graphical data presentations, such as bar graphs, circle graphs, and line graphs, are drawn to scale; therefore, you can read, estimate, or compare data values by sight or by measurement.
          </p>
          <p>
            Select Continue to proceed.
          </p>
        </div>
      }

      <div className="mt-8">
        <Button onClick={handleClick} variant="primary" className="bg-strong text-white hover:bg-strong/80">Continue</Button>
      </div>
    </div>
  );
};

export default Instructions;
