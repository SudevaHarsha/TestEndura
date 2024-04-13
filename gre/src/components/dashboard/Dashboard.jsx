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

const Dashboard = ({ users }) => {
    const [navState, setNavState] = useState('dashboard');
    const [question, setQuestion] = useState([]);
    const [questionId, setQuestionId] = useState(); // Initialize with 
    const [typeId, setTypeId] = useState(); // Initialize with null
    const [testId,setTestId] = useState();
    const [test,setTest] = useState([]);
    /* const [edited, setEdited] = useState(false); */

    const {edited,setEdited} = useCurrentQuestion();

    useEffect(() => {
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
        if (edited && questionId !== null && typeId !== null) {
            fetchData();
        }
    }, [edited, questionId, typeId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(questionId,typeId);
                const response = await axios.get(`/api/test/${testId}`);
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
                <DashboardTable users={users} setNavState={setNavState} navState={navState} setTypeId={setTypeId} setQuestionId={setQuestionId} setTestId={setTestId} />
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
                    <CreateQuestion question={question} />
                </div>
            )}
            {(navState === 'newStudent') && (
                <div className='w-full mr-3'>
                    <CreateStudentForm />
                </div>
            )}
        </div>
    );
};

export default Dashboard;
