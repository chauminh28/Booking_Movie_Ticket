import { useEffect } from "react";

export default function ErrorToast({ message, onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed top-5 right-5 z-50">
            <div
                className="flex items-center w-full max-w-xs p-4 text-red-500 bg-white rounded-lg shadow dark:text-red-400 dark:bg-gray-800"
                role="alert"
            >
                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg dark:bg-red-800">
                    <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.366-.446.957-.446 1.323 0l6.518 7.956c.369.45.057 1.145-.662 1.145H3.081c-.72 0-1.031-.695-.662-1.145l6.518-7.956zM11 12a1 1 0 11-2 0 1 1 0 012 0zm-1 2a1 1 0 100 2 1 1 0 000-2z"
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
