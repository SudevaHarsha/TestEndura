import React from 'react'
import { Button } from '../ui/button';

const VerbalReasoning2Ins = ({handleNextQuestion}) => {

    return (
        <div className="bg-gray-100 p-6 rounded-sm shadow-md">
            <h2 className="text-xl font-semibold mb-4">Verbal Reasoning, 12 Questions 21 minutes (standard time)</h2>
            <p>
                For each question, indicate the best answer, using the directions given. If you need more detailed directions, select Help at any time.
            </p>
            <p>
                If a question has answer choices with ovals, then the correct answer consists of a single choice. If a question has answer choices with square boxes, then the correct answer consists of one or more answer choices. Read the directions for each question carefully. The directions will indicate if you should select one or more answer choices. To answer questions based on a reading passage, you may need to scroll to read the entire passage. You may also use your keyboard to navigate through the passage.
            </p>
            <div>
                Select Continue to proceed,
            </div>
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

export default VerbalReasoning2Ins