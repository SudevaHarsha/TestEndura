"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useCurrentQuestion } from '@/providers/CurrentQuestionContext';
import { Button } from '../ui/button';
import CustomDropdown from './CustomDropdown';
import { useToast } from '@/providers/ToastContext';

const DashboardTable = ({ users, setNavState, navState, setQuestionId, setTypeId, setTestId, questions, filteredQuestions, fetchQuestions, setFilteredQuestions }) => {

    const [types, setTypes] = useState([]);
    const [tests, setTests] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedTests, setSelectedTests] = useState([]);
    const [sections, setSections] = useState([]);
    const [categories, setCategories] = useState([]);

    const { setEdited } = useCurrentQuestion();
    const {showToast} = useToast();

    const fetchQuestionTypes = async () => {
        const types = await axios.get(`/api/find-type?timestamp=${new Date().getTime()}`);
        setTypes(types.data.questionTypes);
    }

    const fetchTests = async () => {
        const response = await fetch('/api/find-test', {
            headers: {
              'Cache-Control': 'no-store',
              'revalidate':600,
            },
          });
          const data = await response.json();
        setTests(data.tests);
    }
    const fetchCategories = async () => {
        const response = await fetch('/api/TestCategory', {
            headers: {
              'Cache-Control': 'no-store',
              'revalidate':600,
            },
          });
          const data = await response.json();
        setCategories(data.categories);
    }
    const fetchSections = async () => {
        const response = await fetch('/api/TestSection', {
            headers: {
              'Cache-Control': 'no-store',
              'revalidate':600,
            },
          });
          const data = await response.json();
        setSections(data.testSections);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                fetchQuestions();
                fetchQuestionTypes();
                fetchTests();
                fetchSections();
                fetchCategories();
                console.log("Dashboard", response.data.allQuestions);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };

        fetchData();
    }, []);

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
        fetchQuestions();
    } 

    const handleEditQuestionType = (typeId) => {
        setTypeId(typeId);
        setNavState('type');
        setEdited(true);

        fetchQuestionTypes();
    } 

    const handleSectionEdit = (sectionId) => {
        setTestId(sectionId);
        setNavState('sectionsEdit');
        setEdited(true);

        fetchSections();
    }

    const handleEditCategory = (categoryId) => {
        setTestId(categoryId);
        setNavState('categoryEdit');
        setEdited(true);

        fetchCategories();
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
    subjects = questions?.map((question) => question.subject);
    const uniqueSubjects = subjects?.reduce((accumulator, currentValue) => {
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

    const handleCheckboxChange = (e, { id }) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            setSelectedUsers(prevState => [...prevState, id]);
        } else {
            setSelectedUsers(prevState => prevState.filter(item => !(item === id)));
        }
    };

    const DashboardHeadings = ['Id', 'test', 'Subject', 'Question', 'Topic', 'Type', 'Points'];
    const UserHeadings = ['Id', 'User', 'Assigned', 'Role'];
    const QuestionTypesHeadings = ['Id', 'Type'];
    const TestSectionsHeadings = ['Id', 'section', 'category'];
    const CategoryHeadings = ['Id','Name'];
    const TestHeadings = ['Id', 'Name', 'Description', 'Overall Duration', 'Sections'];

    console.log(types);

    const handleCreateUser = () => {
        setNavState('newStudent')
    }

    const handleChange = (event) => {
        const { value } = event.target;
        const selectedTestId = value;

        // Check if the selected test ID already exists in the array
        if (selectedTests.includes(selectedTestId)) {
            // If it exists, remove it
            setSelectedTests([
                ...selectedTests.filter((test) => test.id === selectedTestId)
            ]);
        } else {
            // If it doesn't exist, add it
            setSelectedTests([
                ...selectedTests,
                selectedTestId,
            ]);
        }
    };

    console.log(selectedTests)

    const handleAssignTest = async () => {
        const response = await axios.put('/api/assign-tests', { assignedTests: selectedTests, selectedUsers });
        showToast('Test assignes sucessfully', 'error');
    }

    const handleQuestionDelete = async (question) => {
        await axios.delete(`/api/questions/${question.id}/${question.typeId}`)
        fetchQuestions()
        showToast('Question deleted sucessfully', 'error');
    }

    return (
        <div className='w-[85%]'>
            <div className="mt-4">
                <div className="flex flex-wrap -mx-6">
                    <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
                        <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                            <div className="p-3 rounded-full bg-indigo-600 bg-opacity-75">
                                <svg
                                    className="h-8 w-8 text-white"
                                    viewBox="0 0 28 30"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </div>
                            <div className="mx-5">
                                <h4 className="text-2xl font-semibold text-gray-700">{users.length}</h4>
                                <div className="text-gray-500">New Users</div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
                        <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                            <div className="p-3 rounded-full bg-orange-600 bg-opacity-75">
                                <svg
                                    className="h-8 w-8 text-white"
                                    viewBox="0 0 28 28"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4.19999 1.4C3.4268 1.4 2.79999 2.02681 2.79999 2.8C2.79999 3.57319 3.4268 4.2 4.19999 4.2H5.9069L6.33468 5.91114C6.33917 5.93092 6.34409 5.95055 6.34941 5.97001L8.24953 13.5705L6.99992 14.8201C5.23602 16.584 6.48528 19.6 8.97981 19.6H21C21.7731 19.6 22.4 18.9732 22.4 18.2C22.4 17.4268 21.7731 16.8 21 16.8H8.97983L10.3798 15.4H19.6C20.1303 15.4 20.615 15.1004 20.8521 14.6261L25.0521 6.22609C25.2691 5.79212 25.246 5.27673 24.991 4.86398C24.7357 4.45123 24.2852 4.2 23.8 4.2H8.79308L8.35818 2.46044C8.20238 1.83722 7.64241 1.4 6.99999 1.4H4.19999Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M22.4 23.1C22.4 24.2598 21.4598 25.2 20.3 25.2C19.1403 25.2 18.2 24.2598 18.2 23.1C18.2 21.9402 19.1403 21 20.3 21C21.4598 21 22.4 21.9402 22.4 23.1Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M9.1 25.2C10.2598 25.2 11.2 24.2598 11.2 23.1C11.2 21.9402 10.2598 21 9.1 21C7.9402 21 7 21.9402 7 23.1C7 24.2598 7.9402 25.2 9.1 25.2Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </div>

                            <div className="mx-5">
                                <h4 className="text-2xl font-semibold text-gray-700">
                                    {questions.length}
                                </h4>
                                <div className="text-gray-500">Total Questions</div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
                        <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                            <div className="p-3 rounded-full bg-pink-600 bg-opacity-75">
                                <svg
                                    className="h-8 w-8 text-white"
                                    viewBox="0 0 28 28"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z"
                                        fill="currentColor"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z"
                                        stroke="currentColor"
                                        stroke-width="2"
                                    />
                                </svg>
                            </div>

                            <div className="mx-5">
                                <h4 className="text-2xl font-semibold text-gray-700">
                                    {tests.length}
                                </h4>
                                <div className="text-gray-500">Available Tests</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8"></div>

            {navState === 'users' && <div className='mt-5 mb-5 flex justify-between'>
                <Button className="h-11 text-white bg-strong hover:bg-strong/90 px-3 my-auto text-center" onClick={handleCreateUser}>Create User</Button>

                <div className='flex gap-5'>
                    <CustomDropdown tests={tests} handleChange={handleChange} selectedTests={selectedTests} />
                    <Button className="h-11 text-white bg-strong hover:bg-strong/90 px-3 my-auto text-center" onClick={handleAssignTest}>Assign Test</Button>
                </div>
            </div>}

            <div className="flex flex-col mt-8  h-[73vh] overflow-hidden sm:rounded-md ">
                <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div className="align-middle inline-block min-w-full shadow overflow-hidden border-b border-gray-200">
                        <table className="min-w-full">
                            <thead className='bg-gray-50'>
                                <tr>
                                    {navState === 'dashboard' &&
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
                                    {navState === 'users' &&
                                        UserHeadings.map((heading) => {
                                            return <th key={heading} className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                {heading}
                                            </th>
                                        })
                                    }
                                    {navState === 'question types' &&
                                        QuestionTypesHeadings.map((heading) => {
                                            return <th key={heading} className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                {heading}
                                            </th>
                                        })
                                    }
                                    {navState === 'sections' &&
                                        TestSectionsHeadings.map((heading) => {
                                            return <th key={heading} className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                {heading}
                                            </th>
                                        })
                                    }
                                    {navState === 'categories' &&
                                        CategoryHeadings.map((heading) => {
                                            return <th key={heading} className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                {heading}
                                            </th>
                                        })
                                    }
                                    {navState === 'tests' &&
                                        TestHeadings.map((heading) => {
                                            return <th key={heading} className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                {heading}
                                            </th>
                                        })
                                    }
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                                </tr>
                            </thead>

                            <tbody className="bg-white">
                                {
                                    navState === 'dashboard' && questions && filteredQuestions && filteredQuestions.map((question) => {
                                        return <tr key={question.id}>
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
                                                    onClick={()=>handleQuestionDelete(question)}
                                                >
                                                    Delete
                                                </div>
                                            </td>
                                        </tr>
                                    })
                                }
                                {
                                    navState === 'users' && users && users.map((user) => {
                                        const isChecked = selectedUsers.some((item) => item === user.id);
                                        return <tr key={user.id}>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <input
                                                    type="checkbox"
                                                    checked={isChecked}
                                                    onChange={(e) => handleCheckboxChange(e, { id: user.id })}
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                {user.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img
                                                            className="h-10 w-10 rounded-full"
                                                            src={user.imageUrl}
                                                            alt=""
                                                        />
                                                    </div>

                                                    <div className="ml-4">
                                                        <div className="text-sm leading-5 font-medium text-gray-900">
                                                            {user.name}
                                                        </div>
                                                        <div className="text-sm leading-5 text-gray-500">
                                                            {user.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    Active
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                                                {user.role}
                                            </td>

                                            <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                                                <a
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    Edit
                                                </a>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                                                <a
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Delete
                                                </a>
                                            </td>
                                        </tr>
                                    })
                                }
                                {
                                    navState === 'question types' && types && types.map((type) => {
                                        return <tr key={type.id}>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                {type.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                                                {type.type}
                                            </td>

                                            <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                                                <div
                                                    className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                                                    onClick={()=> handleEditQuestionType(type.id)}
                                                >
                                                    Edit
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                                                <div
                                                    className="text-red-600 hover:text-red-900 cursor-pointer"
                                                    onClick={async () => { 
                                                        await axios.delete(`/api/question-type/${type.id}`);
                                                        fetchQuestionTypes();
                                                    }}
                                                >
                                                    Delete
                                                </div>
                                            </td>
                                        </tr>
                                    })
                                }
                                {
                                    navState === 'sections' && sections && sections.map((section) => {
                                        return <tr key={section.id}>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                {section.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                                                {section.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                                                {categories.find((category) => category.id === section.categoryId)?.name}
                                            </td>

                                            <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                                                <div
                                                    className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                                                    onClick={()=> handleSectionEdit(section.id)}
                                                >
                                                    Edit
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                                                <div
                                                    className="text-red-600 hover:text-red-900 cursor-pointer"
                                                    onClick={async () => { 
                                                        await axios.delete(`/api/TestSection/${section.id}`);
                                                        fetchSections();
                                                    }}
                                                >
                                                    Delete
                                                </div>
                                            </td>
                                        </tr>
                                    })
                                }
                                {
                                    navState === 'categories' && categories && categories.map((category) => {
                                        return <tr key={category.id}>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                {category.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                                                {category.name}
                                            </td>

                                            <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                                                <div
                                                    className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                                                    onClick={()=>handleEditCategory(category.id)}
                                                >
                                                    Edit
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                                                <div
                                                    className="text-red-600 hover:text-red-900 cursor-pointer"
                                                    onClick={async () => { 
                                                        await axios.delete(`/api/TestCategory/${category.id}`);
                                                        fetchCategories();
                                                    }}
                                                >
                                                    Delete
                                                </div>
                                            </td>
                                        </tr>
                                    })
                                }
                                {
                                    navState === 'tests' && tests && tests.map((test) => {
                                        return <tr key={test.id}>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                {test.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                                                {test.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                                                {test.description}
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                                                {test.sections.map((section, index) => {
                                                    return <div key={index} className='flex gap-3 text-justify'>
                                                        <div className='text-justify w-40'>{section}</div>
                                                        <div>{test.sectionDuration[index]} mins</div>
                                                    </div>
                                                })}
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium cursor-pointer">
                                                <div
                                                    className="text-indigo-600 hover:text-indigo-900" onClick={() => { setEdited(true); setTestId(test.id); setNavState('test') }}
                                                >
                                                    Edit
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium cursor-pointer">
                                                <div
                                                    className="text-red-600 hover:text-red-900"
                                                    onClick={async() => {
                                                        await axios.delete(`/api/test/${test.id}`);
                                                        showToast("Test deleted sucessfully","error");
                                                        fetchTests();
                                                    }}
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

export default DashboardTable