import { useCurrentSession } from '@/providers/CurrentSessionContext';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import SectionWiseQuestions from '../Questions/SectionWiseQuestions';
import { useCurrentTest } from '@/providers/CurrentTestDetails';
import { useCurrentQuestion } from '@/providers/CurrentQuestionContext';
import axios from 'axios';

const GeneralTestIns = ({ sessionId }) => {
    const router = useRouter();
    const { currentSession } = useCurrentSession();
    const [sections, setSections] = useState([]);
    const [test, setTest] = useState([]);
    const [next, setNext] = useState(false);

    const { setInstructions, instructions } = useCurrentQuestion();

    useEffect(() => {
        const fetchTest = async () => {
            const response = await axios.get(`/api/test/${currentSession?.test?.id}`)

            setTest(response?.data?.Test);
            console.log(response?.data?.Test)
        }

        fetchTest()
        router.prefetch(`/mock-tests/${sessionId}`)
    }, [])

    const handleNextInsrtruction = () => {
        /* console.log('cicked')
        setInstructions(instructions + 1) */

        router.push(`/mock-tests/${sessionId}`)
    }

    if (instructions === 5 && !test?.overallInstructions) {
        return (
            <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-md bg-gray-100 text-sm">
                <h2 className="text-lg font-bold mb-4">General Test Information</h2>
                <div className="mb-4">
                    <h3 className="font-bold mb-2">Timing Information</h3>
                    <p>Total testing time on this test is 1 hour and 58 minutes.</p>
                    <p>If you wish to leave your seat during the test, please raise your hand or otherwise indicate that you need the administrator - timing will not stop.</p>
                </div>
                <div className="mb-4">
                    <h3 className="font-bold mb-2">Test Information</h3>
                    <p>If you have a concern about the wording of a test question, please note the question number and continue the test. Report your concern to the administrator after you complete the test.</p>
                    <p>No credit will be given for any responses marked on scratch paper. Use the scratch paper to work out your answers. All scratch paper must be turned in to the administrator (or erased in front of the administrator in an at-home test) at the end of the testing session.</p>
                    <p>Within a timed section, you may skip any question and return to it later before you exit the section. You should answer as many questions as possible during the test and manage your time with this in mind. Use the Review button at any time during the test to review which questions you have answered and which questions you have skipped.</p>
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleNextInsrtruction}>
                    Continue
                </button>
            </div>
        )
    } else {
        return <div>
            <div dangerouslySetInnerHTML={{ __html: test?.overallInstructions }} className="flex flex-col justify-center items-center max-w-full overflow-clip" />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleNextInsrtruction}>
                Continue
            </button>
        </div>
    }
}

export default GeneralTestIns