import React, { useEffect } from 'react';

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Auto-close after 5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  const getBackgroundColor = (type) => {
    switch (type) {
      case 'success':
        return '#4BB543';
      case 'error':
        return '#FF6347';
      case 'warning':
        return '#FFA500';
      default:
        return '#007BFF';
    }
  };

  return (
    <div
      className="fixed bottom-4 right-4 max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto"
      style={{ backgroundColor: getBackgroundColor(type) }}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <svg
            className="w-6 h-6 text-white mr-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {type === 'success' && (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            )}
            {type === 'error' && (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            )}
            {type === 'warning' && (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4v.01M12 21v-.01"
              />
            )}
            {type === 'info' && (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v8m0-4h.01m0 4h-.01"
              />
            )}
          </svg>
          <p className="text-sm font-medium text-white">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 focus:outline-none"
        >
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 11.414l4.95 4.95-1.414 1.414L8.586 12 3.636 17.95 2.222 16.536 7.172 11.586 2.222 6.636 3.636 5.222 8.586 10 13.536 4.05 14.95 5.464 10 10.414l4.95-4.95 1.414 1.414L11.414 10z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;
