// components/ScientificCalculator.js

import { useCurrentTest } from '@/providers/CurrentTestDetails';
import { useState } from 'react';

const ScientificCalculator = () => {
    const [output, setOutput] = useState('');

    const appendToOutput = (value) => {
        setOutput((prevOutput) => prevOutput + value);
    };

    const clearOutput = () => {
        setOutput('');
    };

    const calculate = () => {
        try {
            setOutput(eval(output));
        } catch (error) {
            setOutput('Error');
        }
    };

    const scientificFunctions = [
        { label: 'sin', value: 'Math.sin(' },
        { label: 'cos', value: 'Math.cos(' },
        { label: 'tan', value: 'Math.tan(' },
        { label: 'sqrt', value: 'Math.sqrt(' },
        { label: 'log', value: 'Math.log(' },
        { label: 'ln', value: 'Math.log(' },
        { label: 'pow', value: 'Math.pow(' },
        { label: '(', value: '(' },
        { label: ')', value: ')' },
    ];

    return (
        <div className="calculator bg-gray-100 p-4 rounded-lg w-[300px] mx-auto">
            <input
                type="text"
                value={output}
                className="w-full mb-4 p-2 rounded-md"
                readOnly
            />
            <div className="grid grid-cols-6 gap-2">
                <button onClick={clearOutput} className="col-span-2 bg-red-500 text-white font-bold py-2 rounded-md">
                    C
                </button>
                {scientificFunctions.map((func) => (
                    <button
                        key={func.label}
                        onClick={() => appendToOutput(func.value)}
                        className="bg-blue-500 text-white font-bold py-2 rounded-md"
                    >
                        {func.label}
                    </button>
                ))}
                <button onClick={() => appendToOutput('^')} className="bg-blue-500 text-white font-bold py-2 rounded-md">
                    ^
                </button>
                <button onClick={() => appendToOutput('+')} className="bg-blue-500 text-white font-bold py-2 rounded-md">
                    +
                </button>
                <button onClick={() => appendToOutput('-')} className="bg-blue-500 text-white font-bold py-2 rounded-md">
                    -
                </button>
                <button onClick={() => appendToOutput('*')} className="bg-blue-500 text-white font-bold py-2 rounded-md">
                    *
                </button>
                <button onClick={() => appendToOutput('/')} className="bg-blue-500 text-white font-bold py-2 rounded-md">
                    /
                </button>
                <button onClick={() => appendToOutput('7')} className="bg-gray-500 text-white font-bold py-2 rounded-md">
                    7
                </button>
                <button onClick={() => appendToOutput('8')} className="bg-gray-500 text-white font-bold py-2 rounded-md">
                    8
                </button>
                <button onClick={() => appendToOutput('9')} className="bg-gray-500 text-white font-bold py-2 rounded-md">
                    9
                </button>
                <button onClick={() => appendToOutput('4')} className="bg-gray-500 text-white font-bold py-2 rounded-md">
                    4
                </button>
                <button onClick={() => appendToOutput('5')} className="bg-gray-500 text-white font-bold py-2 rounded-md">
                    5
                </button>
                <button onClick={() => appendToOutput('6')} className="bg-gray-500 text-white font-bold py-2 rounded-md">
                    6
                </button>
                <button onClick={() => appendToOutput('1')} className="bg-gray-500 text-white font-bold py-2 rounded-md">
                    1
                </button>
                <button onClick={() => appendToOutput('2')} className="bg-gray-500 text-white font-bold py-2 rounded-md">
                    2
                </button>
                <button onClick={() => appendToOutput('3')} className="bg-gray-500 text-white font-bold py-2 rounded-md">
                    3
                </button>
                <button onClick={() => appendToOutput('0')} className="bg-gray-500 text-white font-bold py-2 rounded-md">
                    0
                </button>
                <button onClick={() => appendToOutput('.')} className="bg-gray-500 text-white font-bold py-2 rounded-md">
                    .
                </button>
                <button onClick={calculate} className="col-span-2 bg-green-500 text-white font-bold py-2 rounded-md">
                    =
                </button>
            </div>
        </div>
    );
};

export default ScientificCalculator;
