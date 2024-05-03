import { useState } from 'react';

const CustomDropdown = ({ tests, selectedTests, handleChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        type="button"
        className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
        aria-haspopup="true"
        aria-expanded="true"
      >
        Select Test
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 12a2 2 0 100-4 2 2 0 000 4z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M10 2a8 8 0 100 16 8 8 0 000-16zM3 10a7 7 0 1114 0 7 7 0 01-14 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {tests && tests.map((test) => (
              <label key={test.id} className="flex items-center px-4 py-2 text-sm">
                <input 
                  type="checkbox" 
                  value={test.id} 
                  onChange={handleChange} 
                  checked={selectedTests.includes(test.id)} 
                  className="mr-2 border-gray-300 rounded focus:ring-indigo-500"
                />
                {test.name}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
