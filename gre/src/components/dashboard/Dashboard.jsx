"use client"

import React, { useEffect, useState } from 'react';
import SideNavbar from './SideNavbar';
import DashboardTable from './DashboardTable';
import CreateTestForm from '../admin/CreateTestForm';
import QuestionTypeForm from '../admin/QuestionTypeForm';
import CreateQuestionForm from '../admin/QuestionForm';
import CreateQuestion from '../admin/CreateQuestion';
import axios from 'axios';
import { useCurrentQuestion } from '@/providers/CurrentQuestionContext';
import { currentProfile } from '@/lib/current-profile';

import { useRouter } from 'next/navigation';
import CreateStudentForm from '../admin/CreateStudentForm';
import MakeATestDashboard from './MakeATestDashboard';
import CreateSubjectForm from '../admin/CreateSubject';

const Dashboard = ({ users }) => {
    const [navState, setNavState] = useState('dashboard');
    const [question, setQuestion] = useState([]);
    const [questionId, setQuestionId] = useState(); // Initialize with 
    const [typeId, setTypeId] = useState(); // Initialize with null
    const [testId,setTestId] = useState();
    const [test,setTest] = useState([]);
    /* const [edited, setEdited] = useState(false); */

    const [questions, setQuestions] = useState([]);
    const [filteredQuestions, setFilteredQuestions] = useState([]);

    const {edited,setEdited} = useCurrentQuestion();

    const fetchQuestions = async ()=> {
        const response = await axios.get(`/api/all-questions?timestamp=${new Date().getTime()}`, {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });
        setQuestions(response.data.allQuestions);
        setFilteredQuestions(response.data.allQuestions);
    }

    useEffect(() => {
        fetchQuestions();
        const fetchData = async () => {
            try {
                console.log(questionId,typeId);
                const response = await axios.get(`/api/questions/${questionId}/${typeId}`);
                console.log("Dashboard", response.data.Question);
                setQuestion(response.data.Question); // Update state with fetched data
                /* setEdited(false); */
            } catch (error) {
                console.error("Error fetching question:", error);
            }
        };

        // Call fetchData only if 'edited' is true and questionId and typeId are not null
        if (edited && questionId !== null && typeId !== null && testId) {
            fetchData();
        }
    }, [edited, questionId, typeId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(questionId,typeId);
                const response = await axios.get(`/api/test/${testId}?timestamp=${new Date().getTime()}`);
                console.log("Dashboard", response.data.Test);
                setTest(response.data.Test); // Update state with fetched data
                /* setEdited(false); */
            } catch (error) {
                console.error("Error fetching test:", error);
            }
        };

        // Call fetchData only if 'edited' is true and questionId and typeId are not null
        if (edited && testId !== null) {
            fetchData();
        }
    }, [edited, testId]);

    return (
        <div className='flex w-full h-full'>
            <SideNavbar users={users} setNavState={setNavState} navState={navState} />
            {(navState === 'dashboard' || navState === 'users' || navState === 'tests' || navState === 'question types') && (
                <DashboardTable users={users} setNavState={setNavState} navState={navState} setTypeId={setTypeId} setQuestionId={setQuestionId} setTestId={setTestId} fetchQuestions={fetchQuestions} filteredQuestions={filteredQuestions} questions={questions} />
            )}
            {(navState === 'test' || (edited && navState === 'test')) && (
                <div className='w-full mr-3'>
                    <CreateTestForm test={test} />
                </div>
            )}
            {navState === 'type' && (
                <div className='w-full mr-3'>
                    <QuestionTypeForm />
                </div>
            )}
            {(navState === 'question' || (edited && navState === 'question')) && (
                <div className='w-full mr-3'>
                    <CreateQuestion question={question} fetchQuestions={fetchQuestions} />
                </div>
            )}
            {(navState === 'newStudent') && (
                <div className='w-full mr-3'>
                    <CreateStudentForm />
                </div>
            )}
            {(navState === 'newTest') && (
                <div className='w-full mr-3'>
                    <MakeATestDashboard />
                </div>
            )}
            {(navState === 'newSubject') && (
                <div className='w-full mr-3'>
                    <CreateSubjectForm />
                </div>
            )}
        </div>
    );
};

export default Dashboard;
