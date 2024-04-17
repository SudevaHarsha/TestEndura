import React from 'react'

const NavigationIns = ({handleNextInsrtruction}) => {
  return (
    <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-md bg-gray-100">
            <h2 className="text-lg font-bold mb-4">Navigating Through the Test</h2>
            <p className="mb-4">
                During this test, you can use the mouse OR the keyboard to move through the screens.
            </p>
            <p className="mb-4">
                You can use the following standard keys on the keyboard:
            </p>
            <ul className="list-disc pl-6 mb-4">
                <li>Tab - Press the Tab key to move from one selectable element on the page to the next.</li>
                <li>Shift + Tab - Press Shift and Tab keys to reverse direction through the selectable elements.</li>
                <li>Spacebar - Press the spacebar key to select an element.</li>
                <li>Up and Down arrows - Use the up and down arrows to scroll vertically.</li>
            </ul>
            <p className="mb-4">
                Select Continue to proceed.
            </p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleNextInsrtruction}>
                Continue
            </button>
        </div>
  )
}

export default NavigationIns