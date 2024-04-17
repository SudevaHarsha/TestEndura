import { useCurrentQuestion } from '@/providers/CurrentQuestionContext';
import React from 'react';
import InstructionsCaller from './InstructionsCaller';

const TestTakerIns = ({handleNextInsrtruction}) => {
    const {instructions,setInstructions} = useCurrentQuestion();
/*     const handleNextInsrtruction = () => {
        setInstructions(instructions+1)
        console.log('instruction caller')
        return <InstructionsCaller />
      } */
    return (
        <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-md bg-gray-100">
            <h2 className="text-lg font-bold mb-4">Test Taker Information</h2>
            <p className="mb-4">Please check the following information. If this is correct, select the <strong>Continue</strong> button. If this is incorrect, select the <strong>Exit</strong> button.</p>
            <div className="info-table mb-4">
                <table className="w-full">
                    <tbody>
                        <tr>
                            <td className="border px-4 py-2">Test:</td>
                            <td className="border px-4 py-2">Practice Test 1</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">Name:</td>
                            <td className="border px-4 py-2">sudeva harsha</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">Test Taker ID:</td>
                            <td className="border px-4 py-2">0240000012505315</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleNextInsrtruction}>Continue</button>
            </div>
        </div>
    );
};

export default TestTakerIns;
