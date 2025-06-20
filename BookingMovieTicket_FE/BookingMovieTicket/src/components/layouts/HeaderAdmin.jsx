import React, { useEffect, useState } from "react";

import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export default function HeaderAdmin() {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.sub);
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername(null);

    navigate("/")
  };

  const handleChangePassword = () => {
    navigate("/profile/changePassword")
  }

  const handleProfile = () => {
    navigate("/profile")
  }

  return (
    <>
      <div className="flex justify-end items-center w-full">
        <button
          id="userButton"
          data-dropdown-toggle="user"
          className="font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center cursor-pointer"
          type="button"
        >
          <FaUserCircle className="text-[32px]" />
          <p className="ml-3">{username}</p>
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        <div
          id="user"
          className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <Link
                to="/admin/profile"
                onClick={handleProfile}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Thông tin tài khoản
              </Link>
            </li>
            <li>
              <Link
                to="/admin/changePassword"
                onClick={handleChangePassword}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Đổi mật khẩu
              </Link>
            </li>
            <li>
              <a
                href="#"
                onClick={handleLogout}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Đăng xuất
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
