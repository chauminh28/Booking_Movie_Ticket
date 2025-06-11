import { useEffect } from "react";

export default function SuccessToast({ message, onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed top-5 right-5 z-50">
      <div
        id="toast-success"
        className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
        role="alert"
      >
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 00-1.414-1.414L8 11.172l-3.293-3.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <div className="ml-3 text-sm font-normal">{message}</div>
        <button
          type="button"
          onClick={onClose}
          className="ml-2 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
