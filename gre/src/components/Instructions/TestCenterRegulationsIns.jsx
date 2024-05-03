import React from 'react'

const TestCenterRegulationsIns = ({handleNextInsrtruction}) => {
    return (
        <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-md bg-gray-100 text-sm">
            <h2 className="text-lg font-bold mb-4">Test Center Regulations</h2>
            <p className="mb-4">
                You should have nothing on your computer table except your identification, pencil, and provided scratch paper.
                The official time will be kept by the computer. A test administrator is authorized to dismiss you from a test
                session and/or your scores may be withheld and ultimately canceled for any actions that violate the policies
                and procedures set forth herein and/or communicated at the test center including, but not limited to:
            </p>
            <ul className="list-disc pl-6 mb-4">
                <li>Attempting to take the test for someone else or having someone else take the test for you</li>
                <li>Failing to provide acceptable identification</li>
                <li>Obtaining improper access to the test content or information about the test</li>
                <li>Using or having any prohibited device in your possession during the test administration</li>
                <li>Using any aids in connection with the test, including mechanical pencils, pens, all watches, etc.</li>
                <li>Creating a disturbance or disruptive behavior in any form</li>
                <li>Attempting to give or receive assistance or communication in any form during the test administration</li>
                <li>Removing or attempting to remove test content from the test center</li>
                <li>Tampering with a computer during a computer-delivered test administration</li>
                <li>Bringing food, beverages, or tobacco into the testing room</li>
                <li>Bringing a weapon or firearm into the test center</li>
                <li>Leaving the test center vicinity during the test session or during breaks</li>
                <li>Leaving the testing room without permission</li>
                <li>Taking excessive or extended unscheduled breaks during the test session</li>
                <li>Failing to follow any of the test administration regulations</li>
            </ul>
            <p className="mb-4">
                ETS reserves the right to take action for failure to comply with test administration regulations or the test
                administrator&aposs directions. Such action may include, but is not limited to, barring you from future testing
                and/or withholding or canceling your scores. If your scores are canceled, they will not be reported, and your
                registration and test fees will not be refunded. Reports of cheating or fraud will be investigated thoroughly
                and offenders may be prosecuted to the full extent of the applicable laws.
            </p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleNextInsrtruction}>
                Continue
            </button>
        </div>
    )
}

export default TestCenterRegulationsIns