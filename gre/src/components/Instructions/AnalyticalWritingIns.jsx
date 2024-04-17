import React from 'react'
import { Button } from '../ui/button';

const AnalyticalWritingIns = ({handleNextQuestion}) => {

    return (
        <div className="bg-gray-100 p-6 rounded-sm shadow-md">
            <h2 className="text-xl font-semibold mb-4">Analytical Writing</h2>
            <p className="mb-4">
                Analyze an Issue Task
            </p>
            <p className="mb-4">
                You will be given a brief quotation that states or implies an issue of general interest, and you will also be given specific instructions on how to respond to that issue. Standard timing for this task is 30 minutes. In that time you should plan and compose a response to the issue presented. A response to any other issue will receive a score of zero. Make sure that you respond according to the specific instructions and support your position on the issue with reasons and examples drawn from such areas as your reading, experience, observations, and/or academic studies.
            </p>
            <p className="mb-4">
                Trained GRE readers will evaluate your response according to how well you:
            </p>
            <ul className="list-disc pl-6 mb-4">
                <li>Respond to the specific task instructions</li>
                <li>Consider the complexities of the issue</li>
                <li>Organize, develop, and express your ideas</li>
                <li>Support your position with relevant reasons and/or examples</li>
                <li>Control the elements of standard written English</li>
            </ul>
            <p className="mb-4">
                Before you begin writing, you may want to think for a few minutes about the issue and the specific task instructions and then plan your response. Be sure to develop your position fully and organize it coherently, but leave time to reread what you have written and make any revisions you think are necessary.
            </p>
            <p>
                Select Continue to proceed. Timing for the task will start when you do so.
            </p>
            <Button
                variant="default"
                className="mt-2 bg-strong text-white hover:bg-strong/90"
                size="lg"
                onClick={handleNextQuestion}
            >
                Continue
            </Button>
        </div>
    )
}

export default AnalyticalWritingIns