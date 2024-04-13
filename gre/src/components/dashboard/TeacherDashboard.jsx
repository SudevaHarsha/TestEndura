"use client"

import React, { useEffect, useState } from 'react'
import StudentEssays from '../teacher/StudentEssays';
import axios from 'axios';

const TeacherDashboard = ({ sessions }) => {
    const UserHeadings = ['Id', 'User', 'Role', 'Exam Date', 'Teacher Mail Id'];
    const [users, setUsers] = useState([]);
    const [teacherView, setTeacherView] = useState('teacher');
    const [student, setStudent] = useState([]);
    const [selectedTest, setSelectedTest] = useState('65f73277ce3e9ee465e53313');
    const [tests, setTests] = useState([]);
    const [uniqueSessions, setUniqueSessions] = useState([]);

    const [studentsByNames, setStudentByNames] = useState([]);

    const students = users.filter((user) => user.profile.role === 'student');
    const data = students.map((student) => {
        const repeated = uniqueSessions.filter((session) => session.profileId === student.profileId);
        repeated.length === 0 && setUniqueSessions([...uniqueSessions, student])
    })

    console.log(data);



    const handleEvaluate = (user) => {
        setTeacherView('essays');
        setStudent(user);
    }

    const handleSelectTest = (test) => {
        setSelectedTest(test);
        setUniqueSessions([])
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const Filteredsessions = await axios.get(`/api/sessions/${selectedTest}`);
                setUsers(Filteredsessions.data.testSessions);
                console.log("Dashboard", Filteredsessions.data.testSessions);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };
        fetchData();
    }, [selectedTest])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tests = await axios.get("/api/find-test");
                setTests(tests.data.tests);
                const StudentByNames = await axios.get("/api/student-by-name");
                setStudentByNames(StudentByNames.data.testSessions);
                console.log("Names Dashboard", StudentByNames.data.testSessions);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };
        fetchData();
    }, []);
    return (
        <div className='overflow-hidden'>
            {tests && tests.map((test) => (
                <button
                    key={test.id}
                    className={`mr-4 mb-7 mt-5 px-4 py-2 border-2 rounded hidden sm:inline border-blue-600 ${selectedTest === test.id ? 'bg-blue-600 text-white' : 'bg-white text-black'}`}
                    onClick={() => handleSelectTest(test.id)}
                >
                    {test.name}
                </button>
            ))}
            <div className='flex items-center justify-center'>
                <select
                    className="sm:hidden block mt-1 w-full px-4 py-2 border-2 border-blue-600 bg-white text-black rounded-2xl"
                    value={selectedTest}
                    onChange={(e) => handleSelectTest(e.target.value)}
                >
                    {tests.map((test) => (
                        <option key={test.id} value={test.id} className='w-[50%]'>{test.name}</option>
                    ))}
                </select>
            </div>
            {teacherView === 'teacher' &&
                <div className="flex flex-col mt-8  h-[73vh] overflow-hidden sm:rounded-md ">
                    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="align-middle inline-block min-w-full shadow overflow-hidden border-b border-gray-200">
                            <table className="min-w-full overflow-scroll">
                                <thead className='bg-gray-50'>
                                    <tr>
                                        {
                                            UserHeadings.map((heading) => {
                                                return <th key={heading} className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                    {heading}
                                                </th>
                                            })
                                        }
                                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {uniqueSessions.map((user) => (
                                        <tr key={user.profile.id}>
                                            {/* <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                {user.profile.id}
                                            </td> */}
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img
                                                            className="h-10 w-10 rounded-full"
                                                            src={user.profile.imageUrl}
                                                            alt=""
                                                        />
                                                    </div>

                                                    <div className="ml-4">
                                                        <div className="text-sm leading-5 font-medium text-gray-900">
                                                            {user.profile.name}
                                                        </div>
                                                        <div className="text-sm leading-5 text-gray-500">
                                                            {user.profile.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    {user.profile.role}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                                                {user.profile.examDate}
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                                                {user.profile.teacherEmailId}
                                            </td>
                                            {tests && selectedTest && tests.filter((test) => test.id === selectedTest)[0].sections.includes('AnalyticalWriting') && <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium cursor-pointer" onClick={() => handleEvaluate(user.profile)}>
                                                <div
                                                    className="text-strong hover:text-strong/90"
                                                >
                                                    Evaluate
                                                </div>
                                            </td>}
                                        </tr>))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            }
            {teacherView === 'student' &&
                <div className="flex flex-col mt-8  h-[73vh] overflow-hidden sm:rounded-md ">
                    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="align-middle inline-block min-w-full shadow overflow-hidden border-b border-gray-200">
                            <table className="min-w-full">
                                <thead className='bg-gray-50'>
                                    <tr>
                                        {
                                            UserHeadings.map((heading) => {
                                                return <th key={heading} className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                    {heading}
                                                </th>
                                            })
                                        }
                                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentsByNames.map((user) => (
                                        <tr key={user.profile.id}>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                {user.profile.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img
                                                            className="h-10 w-10 rounded-full"
                                                            src={user.profile.imageUrl}
                                                            alt=""
                                                        />
                                                    </div>

                                                    <div className="ml-4">
                                                        <div className="text-sm leading-5 font-medium text-gray-900">
                                                            {user.profile.name}
                                                        </div>
                                                        <div className="text-sm leading-5 text-gray-500">
                                                            {user.profile.email}
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
                                                {user.profile.role}
                                            </td>

                                            <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                                                <a
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    Edit
                                                </a>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium cursor-pointer" onClick={() => handleEvaluate(user.profile)}>
                                                <div
                                                    className="text-strong hover:text-strong/90"
                                                >
                                                    Evaluate
                                                </div>
                                            </td>
                                        </tr>))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            }
            {teacherView === 'essays' && <StudentEssays student={student} setTeacherView={setTeacherView} testId={selectedTest} />}
        </div>
    )
}

export default TeacherDashboard