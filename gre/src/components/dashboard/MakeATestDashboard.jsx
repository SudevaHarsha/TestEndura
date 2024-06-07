"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useCurrentQuestion } from '@/providers/CurrentQuestionContext';
import { Button } from '../ui/button';

const MakeATestDashboard = () => {

    const [questions, setQuestions] = useState([]);
    const [types, setTypes] = useState([]);
    const [tests, setTests] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState();
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [testId, setTestId] = useState();
    const [subject, setSubject] = useState();
    const [section, setSection] = useState();

    const [filteredQuestions, setFilteredQuestions] = useState([]);

    const { setEdited } = useCurrentQuestion();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/all-questions");
                const types = await axios.get("/api/find-type");
                const tests = await axios.get("/api/find-test");
                setQuestions(response.data.allQuestions);
                setFilteredQuestions(response.data.allQuestions);
                setTypes(types.data.questionTypes);
                setTests(tests.data.tests);
                console.log("Dashboard", response.data.allQuestions);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' || type === 'radio' ? (type === 'checkbox' ? checked : value === 'true') : value;
        name === 'testId' && setTestId(newValue);
        name === 'subject' && setSubject(newValue);
        name === 'section' && setSection(newValue);
    };

    const getLastFourDigits = (number) => {
        // Convert number to string
        const numString = String(number);

        // Get the last 4 characters
        const lastFourDigits = numString.slice(-4);

        // Convert back to number if needed
        // const lastFourDigitsAsNumber = parseInt(lastFourDigits);

        return lastFourDigits;
    }

    const handleQuestionEdit = (questionId, typeId) => {
        console.log("entered");
        console.log(questionId, typeId);
        setQuestionId(questionId);
        setTypeId(typeId);
        setNavState('question')
        setEdited(true);

        console.log("set");
    }

    const handleTypeFilterChange = (event) => {
        setSelectedFilter(event.target.value === 'all' ? null : event.target.value);
        console.log('type', event.target.value);
        if (event.target.value != 'all') {
            const filteredData = questions.filter((question) => question.typeId === event.target.value);
            setFilteredQuestions([...filteredData]);
            console.log(filteredQuestions);
        }
        if (event.target.value === 'all') {
            setFilteredQuestions([...questions]);
        }
    };
    const handleTestFilterChange = (event) => {
        setSelectedFilter(event.target.value === 'all' ? null : event.target.value);
        console.log('type', event.target.value);
        if (event.target.value != 'all') {
            const filteredData = questions.filter((question) => question.testId === event.target.value);
            setFilteredQuestions([...filteredData]);
            console.log(filteredQuestions);
        }
        if (event.target.value === 'all') {
            setFilteredQuestions([...questions]);
        }
    };
    let subjects = [];
    subjects = questions.map((question) => question.subject);
    const uniqueSubjects = subjects.reduce((accumulator, currentValue) => {
        if (!accumulator.includes(currentValue)) {
            accumulator.push(currentValue);
        }
        return accumulator;
    }, []);
    console.log(uniqueSubjects);

    const handleSubjectFilterChange = (event) => {
        setSelectedFilter(event.target.value === 'all' ? null : event.target.value);
        if (event.target.value != 'all') {
            const filteredData = questions.filter((question) => question.subject === event.target.value);
            setFilteredQuestions([...filteredData]);
            console.log(filteredQuestions);
        }
        if (event.target.value === 'all') {
            setFilteredQuestions([...questions]);
        }
    }

    const DashboardHeadings = ['', 'Id', 'test', 'Subject', 'Question', 'Topic', 'Type', 'Points'];
    const UserHeadings = ['Id', 'User', 'Assigned', 'Role'];
    const QuestionTypesHeadings = ['Id', 'Type'];
    const TestHeadings = ['Id', 'Name', 'Description', 'Overall Duration', 'Sections'];

    console.log(types);

    const handleCreateUser = () => {
        setNavState('newStudent')
    }

    const handleCreateTest = () => {
        const response = axios.put('/api/questions', { testId, subject, section, selectedQuestions })

        console.log(response.data);
    }

    const handleCheckboxChange = (e, { id, typeId }) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            setSelectedQuestions(prevState => [...prevState, { id, typeId }]);
        } else {
            setSelectedQuestions(prevState => prevState.filter(item => !(item.id === id && item.typeId === typeId)));
        }
    };

    console.log(selectedQuestions);

    return (
        <div className='w-full'>

            <div className="mt-8"></div>
            <div>
                <label className="block mb-4">
                    Section:
                    <select
                        name="testId"
                        value={testId}
                        onChange={handleChange}
                        className="block w-full mt-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="">Select Section</option>
                        {tests &&
                            tests.map((test, index) => (
                                <option key={index} value={test.id}>
                                    {test.name}
                                </option>
                            ))}
                    </select>
                </label>
                <label className="block mb-4">
                    Section:
                    <select
                        name="subject"
                        value={subject}
                        onChange={handleChange}
                        className="block w-full mt-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="">Select Section</option>
                        <option value="Algebra">Algebra</option>
                        <option value="Verbal">Verbal</option>
                    </select>
                </label>
                <label className="block mb-4">
                    Section:
                    <select
                        name="section"
                        value={section}
                        onChange={handleChange}
                        className="block w-full mt-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="">Select Section</option>
                        {testId &&
                            tests
                                .find((test) => test.id === testId)
                                ?.sections.map((section, index) => (
                                    <option key={index} value={section}>
                                        {section}
                                    </option>
                                ))}
                    </select>
                </label>
                <Button onClick={handleCreateTest}>Create</Button>
            </div>

            <div className="flex flex-col mt-8  h-[73vh] overflow-hidden sm:rounded-md ">
                <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div className="align-middle inline-block min-w-full shadow overflow-hidden border-b border-gray-200">
                        <table className="min-w-full">
                            <thead className='bg-gray-50'>
                                <tr>
                                    {
                                        DashboardHeadings.map((heading) => {
                                            if (heading != 'Type' && heading != 'Subject' && heading != 'test') {
                                                return <th key={heading} className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                    {heading}
                                                </th>
                                            }
                                            if (heading === 'Type') {
                                                return <th className='p-0 m-0' key={heading}>
                                                    <select id="typeFilter" className='font-normal bg-gray-50' onChange={handleTypeFilterChange}>
                                                        <option value="all">Type</option>
                                                        {types.map((type) => (
                                                            <option key={type.id} value={type.id}>
                                                                {type.type}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </th>
                                            }
                                            console.log(heading === 'Subject');
                                            if (heading === 'Subject') {
                                                console.log('subject');
                                                return <th className='p-0 m-0' key={heading}>
                                                    <select id="testFilter" className='bg-gray-50 font-normal' onChange={handleSubjectFilterChange}>
                                                        <option value="all">Subject</option>
                                                        {uniqueSubjects.map((subject) => (
                                                            <option key={subject} value={subject}>
                                                                {subject}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </th>
                                            }
                                            if (heading === 'test') {
                                                return <th className='p-0 m-0' key={heading}>
                                                    <select id="testFilter" className='bg-gray-50 font-normal' onChange={handleTestFilterChange}>
                                                        <option value="all">Test</option>
                                                        {tests?.map((test) => (
                                                            <option key={test.id} value={test.id}>
                                                                {test.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </th>
                                            }
                                        })
                                    }
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                                </tr>
                            </thead>

                            <tbody className="bg-white">
                                {
                                    questions && filteredQuestions && filteredQuestions.map((question) => {
                                        const isChecked = selectedQuestions.some((item) => item.id === question.id && item.typeId === question.typeId);
                                        return <tr key={question.id}>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <input
                                                    type="checkbox"
                                                    checked={isChecked}
                                                    onChange={(e) => handleCheckboxChange(e, { id: question.id, typeId: question.typeId })}
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <div>
                                                    {getLastFourDigits(question.id)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <div>
                                                    {tests.find((test) => test.id === question.testId)?.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <div>
                                                    {question?.subject ? question?.subject : "no"}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                {question.questionText}
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <div>
                                                    {question.section}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <div>
                                                    {types.find((type) => type.id === question.typeId)?.type}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <div>
                                                    {question?.marks ? question.marks : 1.5}
                                                </div>
                                            </td>
                                            {/* <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    Active
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                                                Owner
                                            </td> */}

                                            <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium cursor-pointer">
                                                <div
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                    onClick={() => handleQuestionEdit(question.id, question.typeId)}
                                                >
                                                    Edit
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium cursor-pointer">
                                                <div
                                                    className="text-red-600 hover:text-red-900"
                                                    onClick={async () => await axios.delete(`/api/questions/${question.id}/${question.typeId}`)}
                                                >
                                                    Delete
                                                </div>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MakeATestDashboard