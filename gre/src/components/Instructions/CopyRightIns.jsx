import React from 'react'

const CopyRightIns = ({handleNextInsrtruction}) => {
    return (
        <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-md bg-gray-100 text-sm">
            <p className="mb-4">
                <span className="font-bold">GRADUATE RECORD EXAMINATIONS®</span><br />
                <span className="font-bold">ETS GRE</span><br />
                Copyright © 2023 by Educational Testing Service. All rights reserved. ETS, the ETS logo,
                GRADUATE RECORD EXAMINATIONS and GRE are registered trademarks of Educational Testing
                Service (ETS) in the United States and other countries.
            </p>
            <p className="mb-4">
                This test, its test delivery system, and all test questions contained in the following
                program are the unpublished confidential and proprietary materials of Educational Testing
                Service. No reproduction or disclosure permitted. Unauthorized reproduction in part or
                in whole of this test is prohibited. Violators will be prosecuted to the full extent of
                all applicable laws.
            </p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleNextInsrtruction}>
                Continue
            </button>
        </div>
    )
}

export default CopyRightIns