import React from 'react'

const ConfidentialityAgreementIns = ({handleNextInsrtruction}) => {
    return (
        <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-md bg-gray-100 text-sm">
            <p className="mb-4">
                The contents of this test are confidential. Unauthorized reproduction in part or in whole of this test is prohibited. Violators will be prosecuted to the full extent of the applicable laws.
            </p>
            <p className="mb-4">
                I understand that, by selecting Continue, I will be given access to this confidential material only for the purpose of taking the test. I agree that I will not disclose to any person or entity, reproduce, or otherwise use the test questions, instructions, or other material revealed to me in the course of taking the test.
            </p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleNextInsrtruction}>
                Continue
            </button>
        </div>
    )
}

export default ConfidentialityAgreementIns