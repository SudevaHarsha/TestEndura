import { useCurrentQuestion } from '@/providers/CurrentQuestionContext';
import { useCurrentSession } from '@/providers/CurrentSessionContext'
import React from 'react'
import { Button } from '../ui/button';

const ReviewQuestions = ({ questions }) => {

    const { previousLength, setReview, markQuestions } = useCurrentQuestion();
    const { currentSession } = useCurrentSession();

    console.log(previousLength)
    const sectionAnswers = currentSession && currentSession.sessionAnswers?.slice(previousLength, currentSession.sessionAnswers.length)
    console.log(currentSession.sessionAnswers.length - 1);
    const sectionQuestions = questions;

    return <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-4">Review Questions</h1>

        <p className="mb-8">Sections Analysis</p>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    <tr className='bg-slate-100'>
                        <td className="px-6 py-4 whitespace-nowrap">Total Questions</td>
                        <td className="px-6 py-4 whitespace-nowrap">{questions && questions?.length}</td>
                    </tr>
                    <tr className='bg-red-100'>
                        <td className="px-6 py-4 whitespace-nowrap">Unattempted Questions</td>
                        <td className="px-6 py-4 whitespace-nowrap">{sectionQuestions.length - sectionAnswers.filter((answer) => answer.length >= 0).length}</td>
                    </tr>
                    <tr className='bg-green-100'>
                        <td className="px-6 py-4 whitespace-nowrap">Attempted Questions</td>
                        <td className="px-6 py-4 whitespace-nowrap">{sectionAnswers && sectionAnswers.filter((answer) => answer.length > 0).length}</td>
                    </tr>
                    <tr className='bg-blue-100'>
                        <td className="px-6 py-4 whitespace-nowrap">Questions Marked for Review</td>
                        <td className="px-6 py-4 whitespace-nowrap">{markQuestions?.length===0 ? "No Marked Questions" : markQuestions.map((markedQuestion)=>{return markedQuestion}).join(',')}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <Button className='className="h-11 w-20 text-white bg-strong hover:bg-strong/90 px-3 my-auto text-center' onClick={() => setReview(false)}>Go Back</Button>
    </div>
}

export default ReviewQuestions