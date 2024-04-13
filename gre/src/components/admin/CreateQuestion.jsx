import React, { useEffect, useState } from 'react'
import CreateQuestionForm from './QuestionForm';
import axios from 'axios';

const CreateQuestion = ({question}) => {
    const [types, setTypes] = useState([]);
    const [tests, setTests] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const types = await axios.get("/api/find-type");
                const tests = await axios.get("/api/find-test");
                setTypes(types.data.questionTypes);
                setTests(tests.data.tests);
                console.log("Dashboard", types.data.questionTypes);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };

        fetchData();
    }, []);

    return <div className='h-full'>
        <CreateQuestionForm questionTypes={types} tests={tests} question={question} />
    </div>
}

export default CreateQuestion