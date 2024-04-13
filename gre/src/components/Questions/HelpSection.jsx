// pages/HelpPage.js

import { useCurrentQuestion } from '@/providers/CurrentQuestionContext';
import Link from 'next/link';

const HelpSection = () => {
    const { help, setHelp } = useCurrentQuestion();

    const handleGoBack = () => {
        setHelp(false);
    }

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className="bg-white p-8 w-full">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Help</h1>
                <p className="text-gray-700 mb-6">
                    Welcome to the GRE Quiz App Help page. Here are some tips to get started:
                </p>
                <ul className="text-gray-700 mb-6 list-disc pl-6">
                    <li>Ensure you have a stable internet connection during the quiz.</li>
                    <li>Read each question carefully before answering.</li>
                    <li>Use the &quot;Review&quot; button to go back and revise your answers.</li>
                    <li>Click &quot;Submit&quot; when you are ready to finish the quiz.</li>
                    <li>Take breaks if needed to maintain focus and concentration.</li>
                    <li>Manage your time effectively to complete all sections within the allotted time.</li>
                    <li>Stay calm and focused, and don&quot;t rush through questions.</li>
                    <li>If you encounter technical issues, notify your instructor immediately.</li>
                </ul>
                <div className="flex justify-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded-lg" onClick={handleGoBack}>Go Back</button>
                </div>
            </div>
        </div>
    );
};

export default HelpSection;
