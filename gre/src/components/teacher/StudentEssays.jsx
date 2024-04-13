"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import axios from 'axios';
import Link from 'next/navigation'
import AnalyticalWritingPage from '../Questions/AnalyticalWriting';
import { Textarea } from '../ui/textarea';

const StudentEssays = ({ student, setTeacherView, testId }) => {

    const [essays, setEssays] = useState([]);
    const [essay, setEssay] = useState([]);
    const [evaluate, setevaluate] = useState(false);
    const [essayMarks, setEssayMarks] = useState();

    const handleEvaluate = (essay) => {
        setevaluate(true);
        setEssay(essay);
    }

    const handleEvaluateEssay = async () => {
        const response = await axios.patch(`/api/evaluate-essay/${essay.id}`, { essayMarks });
        setEssay([]);
        setevaluate(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/user/${student.id}`);

                setEssays(response.data.studentSessions);
                console.log("Dashboard", response.data.studentSessions);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };

        fetchData();
    }, []);
    return <>
        {!evaluate && <div className='w-full flex flex-col items-center'>
            <div className='flex flex-wrap'>
                {essays.filter((essay)=>essay.testId === testId).map((essay, index) => {
                    return <div key={index} className="h-auto max-w-md w-80 mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-7">
                        <div className="md:flex">
                            <div className="p-8">
                                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                                    Essay from {essay?.test?.name}
                                </div>
                                <div href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{essay?.test?.analyticalWritingQuestions[0]?.questionText}</div>
                                {/* <div className="mt-2 text-gray-500">{essay?.test?.analyticalWritingQuestions[0]?.prompt}</div> */}
                            </div>
                        </div>
                        <div className='flex gap-5'>
                            <div
                                className="text-strong hover:text-strong/90 cursor-pointer mx-7 mb-4" onClick={() => handleEvaluate(essay)}
                            >
                                Evaluate
                            </div>
                            <div>Essay Marks : {essay?.essayMarks}</div>
                        </div>
                    </div>
                })}
            </div>
            <Button variant="default"
                className="w-36 mt-2 bg-strong text-white hover:bg-strong/90"
                size="lg"
                onClick={() => setTeacherView('teacher')}>
                Go BAck
            </Button>
        </div>}
        {evaluate && <div className="container mx-auto p-4">
            <div className="flex flex-col items-center justify-center mx-auto">
                <div className="w-[90%] text-justify">
                    <div>
                        {essay?.test?.analyticalWritingQuestions[0]?.prompt}
                    </div>
                    <div>
                        <input
                            type="number"
                            placeholder="Marks"
                            className="border border-gray-300 rounded-md p-1 w-20 text-center"
                            value={essayMarks}
                            onChange={(e) => {
                                setEssayMarks(e.target.value);
                            }}
                        />
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center p-2 text-justify">
                    <div className="w-[90%]">
                        <div className='border-b-2 mb-2 pb-1'>
                            <strong>Prompt:</strong> {essay?.test?.analyticalWritingQuestions[0]?.prompt}
                        </div>
                    </div>

                    <div className="mt-4 w-[90%] rounded-2xl">
                        <Textarea placeholder="Write your essay here..." rows={10} className="rounded-2xl h-[500px]" value={essay.sessionAnswers[0]} />
                    </div>

                    <div className="flex justify-end mt-4">
                        <Button onClick={handleEvaluateEssay} variant="primary" className="bg-strong text-white hover:bg-strong/80">
                            Evaluate Essay
                        </Button>
                    </div>
                </div>
            </div>
        </div>}
    </>
}


export default StudentEssays