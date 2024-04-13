"use client"

import { useEffect, useState } from "react";
import PerformanceInsights from "./PerformanceInsights";
import PerformanceOverview from "./PerformanceOverview";
import ProgressTracking from "./ProgressTracking";
import TestScores from "./TestScores";
import axios from 'axios'

const OverallPerformance = ({ id }) => {

    const [performanceData, setPerformanceData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/overall-performance/${id}`);

                setPerformanceData(response.data.response);

                console.log("performace fetch", response.data.response);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };

        fetchData();
    }, []);

    console.log('performance', performanceData && Object.values(performanceData?.overallPerformance))
    return (
        <div className="overflow-hidden" >
            <div className="overflow-x-auto mb-5">
                <table className="min-w-full bg-white border rounded-md">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Test Name</th>
                            <th className="py-3 px-6 text-left">Correct Answers</th>
                            <th className="py-3 px-6 text-left">Wrong Answers</th>
                            <th className="py-3 px-6 text-left">Unattempted</th>
                            <th className="py-3 px-6 text-left">Total Time Taken</th>
                            <th className="py-3 px-6 text-left">Total Marks</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {performanceData && Object.values(performanceData?.overallPerformance).map((test, index) => {
                            return <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left whitespace-nowrap">{test?.testName}</td>
                                <td className="py-3 px-6 text-left">{test?.correctAnswers}</td>
                                <td className="py-3 px-6 text-left">{test?.wrongAnswers}</td>
                                <td className="py-3 px-6 text-left">{test?.unattempted}</td>
                                <td className="py-3 px-6 text-left">{test?.totalTime} mins</td>
                                <td className="py-3 px-6 text-left">{test?.totalMarks}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>

            <table className="min-w-full bg-white border rounded-md">
                <thead>
                    <tr className="bg-gray-100 text-gray-700 uppercase text-sm font-semibold">
                        <th className="py-2 px-4">Category</th>
                        <th className="py-2 px-4">Score</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="py-2 px-4">Analytical Writing</td>
                        <td className="py-2 px-4">{performanceData?.AnalyticalPerformance}</td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4">Verbal</td>
                        <td className="py-2 px-4">{performanceData?.VerbalPerformance}</td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4">Quantitative</td>
                        <td className="py-2 px-4">{performanceData?.QuantitativePerformance}</td>
                    </tr>
                </tbody>
            </table>
        </div >
    );
};

/* export async function getServerSideProps() {
    // Fetch user performance data from an API or mock data
    const performanceData = await axios.get('/api/overall-performance');
    console.log('props',performanceData)
    return {
        props: {
            performanceData,
        },
    };
} */

async function fetchPerformanceData() {
    // Simulated performance data
    return {
        overallScore: 320,
        verbalScore: 160,
        quantitativeScore: 160,
        analyticalWritingScore: 4.5,
        testScores: [
            { id: 1, testName: 'Practice Test 1', score: 310 },
            { id: 2, testName: 'Practice Test 2', score: 325 },
            { id: 3, testName: 'Practice Test 3', score: 315 },
        ],
        insights: {
            strengths: ['Vocabulary', 'Algebra'],
            weaknesses: ['Geometry', 'Reading Comprehension'],
        },
        progress: {
            targetScore: 330,
            currentScore: 320,
            progressPercentage: 70,
        },
    };
}

export default OverallPerformance;