import React from 'react'
import { Button } from '../ui/button';
import QuestionsNav from '../Questions/QuestionsNav';

const QuantativeReasoning2Ins = ({ handleNextQuestion }) => {

    return <>
        {/* <QuestionsNav /> */}
        <div className="bg-gray-100 p-6 rounded-sm shadow-md">
            <h2 className="text-xl font-semibold mb-4">Quantitative Reasoning, 12 Questions 21 minutes (standard time)</h2>
            <p className="mb-4">
                For each question, indicate the best answer, using the directions given. If you need more detailed directions, select Help at any time.
            </p>
            <p className="mb-4">
                An on-screen calculator is available for each question in this section. To use the calculator, select the calculator button.
            </p>
            <p className="mb-4">
                If a question has answer choices with ovals, then the correct answer consists of a single choice. If a question has answer choices with square boxes, then the correct answer consists of one or more answer choices. Read the directions for each question carefully. The directions will indicate if you should select one or more answer choices. To answer questions based on a data presentation, you may need to scroll or use your keyboard to access the entire presentation.
            </p>
            <p className="mb-4">
                All numbers used are real numbers.
            </p>
            <p className="mb-4">
                All figures are assumed to lie in a plane unless otherwise indicated.
            </p>
            <p className="mb-4">
                Geometric figures, such as lines, circles, triangles, and quadrilaterals, are not necessarily drawn to scale. That is, you should not assume that quantities such as lengths and angle measures are as they appear in a figure. You should assume, however, that lines shown as straight are actually straight, points on a line are in the order shown, and more generally, all geometric objects are in the relative positions shown. For questions with geometric figures, you should base your answers on geometric reasoning, not on estimating or comparing quantities by sight or by measurement.
            </p>
            <p className="mb-4">
                Coordinate systems, such as xy-planes and number lines, are drawn to scale; therefore you can read, estimate, or compare quantities in such figures by sight or by measurement.
            </p>
            <p className="mb-4">
                Graphical data presentations, such as bar graphs, circle graphs, and line graphs, are drawn to scale; therefore, you can read, estimate, or compare data values by sight or by measurement.
            </p>
            <p>
                Select Continue to proceed.
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
    </>
}

export default QuantativeReasoning2Ins