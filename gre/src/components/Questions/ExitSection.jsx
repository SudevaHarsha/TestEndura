// pages/ExitSectionPage.js

import { useCurrentQuestion } from '@/providers/CurrentQuestionContext';
import Link from 'next/link';

const ExitSection = ({questionLength,handleNext}) => {
  const { exitSection, setExitSection, setCurrentQuestion } = useCurrentQuestion();
  
  const handleGoBack = () => {
    setExitSection(false);
  }

  const handleExitSection = () => {
    setCurrentQuestion(questionLength - 1);
    handleNext();
    setExitSection(false);
  }

  return (
    <div className="h-[90vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Exit Section</h1>
        <p className="text-gray-700 mb-4">Are you sure you want to exit this section?</p>
        <p className="text-gray-700 mb-6">Click the &quot;Review&quot; button above to review your answers.</p>
        <div className="flex justify-center space-x-4">
          <button className="h-11 text-white bg-secondary hover:bg-secondary/90 px-3 my-auto text-center rounded" onClick={handleGoBack}>Go Back</button>
          <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-6 rounded" onClick={handleExitSection}>Exit</button>
        </div>
      </div>
    </div>
  );
};

export default ExitSection;
