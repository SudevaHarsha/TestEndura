"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import OverallPerformance from '../OverallPerformance';

const StudentViewDashboard = () => {

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    const UserHeadings = ['Id', 'User', 'Assigned', 'Role'];
    const [studentsByNames, setStudentByNames] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [selectedAlphabet, setSelectedAlphabet] = useState();
    const [performance, setPerformance] = useState();

    const handleFilter = (letter) => {
        setSelectedAlphabet(letter);
        const filteredUsers = studentsByNames.filter((student) => student.name.toUpperCase().startsWith(letter))
        setFilteredStudents([...filteredUsers]);
    };

    const handelPerformanceClick = (id) => {
        setPerformance(id);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const StudentByNames = await axios.get("/api/student-by-name");
                setStudentByNames(StudentByNames.data.profiles);
                setFilteredStudents(StudentByNames.data.profiles)
                console.log("Names Dashboard", StudentByNames.data.profiles);
            } catch (error) {
                console.error("Error fetching StudentByNames:", error);
            }
        };
        fetchData();
    }, []);

    return <div className='overflow-hidden'>
        {performance && <OverallPerformance id={performance} />}

        {!performance &&
            <div className="flex justify-between items-center space-x-2 mt-5 mb-5 w-full sm:w-[80%] mx-auto overflow-x-scroll">
                {alphabet.map(letter => (
                    <button
                        key={letter}
                        onClick={() => handleFilter
                            (letter)}
                        className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
                    >
                        {letter}
                    </button>
                ))}
            </div>}

        {!performance &&
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
                                {filteredStudents.filter((user) => user.role === 'student').map((user) => (
                                    <tr key={user.id}>
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
                                                {user.role}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                                            {user.examDate || '----'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                                            {user.teacherEmailId || '----'}
                                        </td>

                                        <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                                            <div
                                                className="text-indigo-600 hover:text-indigo-900 cursor-pointer" onClick={() => handelPerformanceClick(user.id)}
                                            >
                                                performance
                                            </div>
                                        </td>
                                    </tr>))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        }
    </div>
}

export default StudentViewDashboard