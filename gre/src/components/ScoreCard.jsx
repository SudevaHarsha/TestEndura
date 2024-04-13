import React from 'react';
import { Button } from './ui/button';

const ScoreCard = ({ setResultCard, resultCardData }) => {
    const testName = 'test-1';
    const attempts = 2;
    const testDate = '20-12-2004';
    const startTime = '18:40';
    const endTime = '19:30';
    const testScore = 40;
    const correctAnswers = 6;
    const wrongAnswers = 4;
    const unattempted = 10;
    const totalMarks = 40;
    const totalTime = 70;
    return (
        <div className="container mx-auto px-4 py-8 overflow-hidden">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">{resultCardData.testName}</h1>
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex flex-col">
                        <p className="text-sm text-gray-600">No. of attempts</p>
                        <p className="text-lg font-semibold">{attempts}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm text-gray-600">Test date</p>
                        <p className="text-lg font-semibold">{resultCardData.testDate}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm text-gray-600">Start time</p>
                        <p className="text-lg font-semibold">{resultCardData.startTime}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm text-gray-600">End time</p>
                        <p className="text-lg font-semibold">{resultCardData.endTime}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm text-gray-600">Test score</p>
                        <p className="text-lg font-semibold">{resultCardData.testScore}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm text-gray-600">Total time taken</p>
                        <p className="text-lg font-semibold">{resultCardData.totalTime} min</p>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="flex flex-col">
                        <p className="text-sm text-gray-600">Correct answers</p>
                        <p className="text-lg font-semibold">{resultCardData.correctAnswers}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm text-gray-600">Wrong answers</p>
                        <p className="text-lg font-semibold">{resultCardData.wrongAnswers}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm text-gray-600">Unattempted</p>
                        <p className="text-lg font-semibold">{resultCardData.unattempted}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm text-gray-600">Total marks</p>
                        <p className="text-lg font-semibold">{resultCardData.totalMarks}</p>
                    </div>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Section Wise Analysis</h2>
                <table className="w-full border-collapse border border-gray-400 hidden sm:block">
                    <thead>
                        <tr>
                            <th className="border border-gray-400 px-4 py-2">Section</th>
                            <th className="border border-gray-400 px-4 py-2">Total time taken</th>
                            <th className="border border-gray-400 px-4 py-2">Avg time per question</th>
                            <th className="border border-gray-400 px-4 py-2">Accuracy</th>
                            <th className="border border-gray-400 px-4 py-2">Correct</th>
                            <th className="border border-gray-400 px-4 py-2">Wrong</th>
                            <th className="border border-gray-400 px-4 py-2">Unattempted</th>
                            <th className="border border-gray-400 px-4 py-2">User marks</th>
                            <th className="border border-gray-400 px-4 py-2">Total marks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(resultCardData.sectionAnalysis).map((section, index) => {
                                return <tr key={index}>
                                    <td className='text-center border-r-2 border-black/15'>{resultCardData.sectionAnalysis[section].sectionName}</td>
                                    <td className='text-center border-r-2 border-black/15'>{resultCardData.sectionAnalysis[section].totalSectionTime} min</td>
                                    <td className='text-center border-r-2 border-black/15'>{resultCardData.sectionAnalysis[section].AvgTimePerQuestion ? resultCardData.sectionAnalysis[section].AvgTimePerQuestion : 0}sec</td>
                                    <td className='text-center border-r-2 border-black/15'>{resultCardData.sectionAnalysis[section].accuracy}%</td>
                                    <td className='text-center border-r-2 border-black/15'>{resultCardData.sectionAnalysis[section].sectionCorrectAnswers}</td>
                                    <td className='text-center border-r-2 border-black/15'>{resultCardData.sectionAnalysis[section].SectionWrongAnswers}</td>
                                    <td className='text-center border-r-2 border-black/15'>{resultCardData.sectionAnalysis[section].sectionUnattempted}</td>
                                    <td className='text-center border-r-2 border-black/15'>{resultCardData.sectionAnalysis[section].userSectionMarks}</td>
                                    <td className='text-center border-r-2 border-black/15'>{resultCardData.sectionAnalysis[section].totalSectionMarks}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                <div className="sm:hidden">
                    {/* Render separate tables for each section */}
                    {Object.keys(resultCardData.sectionAnalysis).map((section, index) => (
                        <div key={index} className="mb-4">
                            {/* Table header for section */}
                            <div className="font-bold">{resultCardData.sectionAnalysis[section].sectionName}</div>
                            {/* Table for section data */}
                            <table className="w-full border-collapse border border-gray-400">
                                {/* <thead className="bg-gray-200">
                                    <tr>
                                        <th className="px-4 py-2"></th>
                                        <th className="text-center border-r border-gray-400 px-4 py-2">{resultCardData.sectionAnalysis[section].sectionName}</th>
                                    </tr>
                                </thead> */}
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-400 px-4 py-2">Total time taken</td>
                                        <td className='text-center border border-gray-400 px-4 py-2'>{resultCardData.sectionAnalysis[section].totalSectionTime} min</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-400 px-4 py-2">Avg time per question</td>
                                        <td className='text-center border border-gray-400 px-4 py-2'>{resultCardData.sectionAnalysis[section].AvgTimePerQuestion ? resultCardData.sectionAnalysis[section].AvgTimePerQuestion : 0} sec</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-400 px-4 py-2">Accuracy</td>
                                        <td className='text-center border border-gray-400 px-4 py-2'>{resultCardData.sectionAnalysis[section].accuracy}%</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-400 px-4 py-2">Correct</td>
                                        <td className='text-center border border-gray-400 px-4 py-2'>{resultCardData.sectionAnalysis[section].sectionCorrectAnswers}</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-400 px-4 py-2">Wrong</td>
                                        <td className='text-center border border-gray-400 px-4 py-2'>{resultCardData.sectionAnalysis[section].SectionWrongAnswers}</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-400 px-4 py-2">Unattempted</td>
                                        <td className='text-center border border-gray-400 px-4 py-2'>{resultCardData.sectionAnalysis[section].sectionUnattempted}</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-400 px-4 py-2">User marks</td>
                                        <td className='text-center border border-gray-400 px-4 py-2'>{resultCardData.sectionAnalysis[section].userSectionMarks}</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-400 px-4 py-2">Total marks</td>
                                        <td className='text-center border border-gray-400 px-4 py-2'>{resultCardData.sectionAnalysis[section].totalSectionMarks}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            </div>
            <Button onClick={() => setResultCard(false)}>Go Back</Button>
        </div>
    );
};

export default ScoreCard;
