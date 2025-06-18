"use client"

import React, { useEffect, useState } from "react"
import { IoPersonCircle } from "react-icons/io5"
import Logo from "/logo.png"
import { Link, useNavigate } from "react-router-dom"
import { initFlowbite } from "flowbite"
import { jwtDecode } from "jwt-decode"

function Header() {
  const [username, setUsername] = useState(null)
  const [role, setRole] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const decoded = jwtDecode(token)
        setUsername(decoded.sub)
        setRole(decoded.scope)
      } catch (err) {
        localStorage.removeItem("token")
        localStorage.removeItem("username")
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    setUsername(null)
    setDropdownOpen(false)
    navigate("/")
  }

  React.useEffect(() => {
    initFlowbite()
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest(".dropdown-container")) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [dropdownOpen])

  return (
    <div className="bg-[#f3f3f3] h-24 flex justify-center items-center mb-12 shadow-sm border-b border-gray-200">
      <div className="h-full items-center flex container justify-between mx-auto px-6">
        {/* Logo Section */}
        <Link to={"/"}>
          <div className="h-full flex items-center justify-center w-[150px] transition-transform hover:scale-105 duration-200">
            <img src={Logo || "/placeholder.svg"} alt="Logo" className="w-full h-full object-contain" />
          </div>
        </Link>

        {/* Navigation Menu */}
        <div className="h-full flex items-center justify-center flex-1 max-w-2xl">
          <ul className="flex space-x-12 w-full justify-center h-full items-center">
            <Link to={"/"}>
              <li className="group relative text-[24px] cursor-pointer h-full flex items-center justify-center px-4 transition-all duration-200">
                <span className="whitespace-nowrap font-medium text-gray-800 hover:text-black transition-colors duration-200">
                  Trang chủ
                </span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></div>
              </li>
            </Link>
            <Link to={"/movie"}>
              <li className="group relative text-[24px] cursor-pointer h-full flex items-center justify-center px-4 transition-all duration-200">
                <span className="whitespace-nowrap font-medium text-gray-800 hover:text-black transition-colors duration-200">Phim</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></div>
              </li>
            </Link>
            <Link to={"/schedule"}>
              <li className="group relative text-[24px] cursor-pointer h-full flex items-center justify-center px-4 transition-all duration-200">
                <span className="whitespace-nowrap font-medium text-gray-800 hover:text-black transition-colors duration-200">
                  Lịch chiếu
                </span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></div>
              </li>
            </Link>
            {(role === "admin" || role === "employee") && (
              <Link to={"/dashboard"}>
                <li className="group relative text-[24px] cursor-pointer h-full flex items-center justify-center px-4 transition-all duration-200">
                  <span className="whitespace-nowrap font-medium text-gray-800 hover:text-black transition-colors duration-200">
                    Trang Admin
                  </span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></div>
                </li>
              </Link>
            )}
          </ul>
        </div>

        {/* User Section */}
        {username ? (
          <div className="relative dropdown-container">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              type="button"
              className="cursor-pointer flex items-center justify-center px-4 py-2 rounded-lg hover:bg-white/60 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <div className="flex items-center justify-center space-x-3 w-[250px]">
                <IoPersonCircle className="w-10 h-10 text-gray-700" />
                <p className="text-[24px] font-medium text-gray-800">{username}</p>
                <svg
                  className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""
                    }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {dropdownOpen && (
              <div
                id="dropdown"
                className="absolute right-0 mt-3 z-40 bg-white divide-y divide-gray-100 rounded-xl shadow-lg border border-gray-200 w-64 transform opacity-100 scale-100 transition-all duration-200"
              >
                <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
                  <li>
                    <Link
                      to="/profile"
                      className="block px-5 py-3 hover:bg-gray-50 transition-colors duration-150 font-medium"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Thông tin tài khoản
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/profile/history"
                      className="block px-5 py-3 hover:bg-gray-50 transition-colors duration-150 font-medium"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Lịch sử giao dịch
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/profile/changePassword"
                      className="block px-5 py-3 hover:bg-gray-50 transition-colors duration-150 font-medium"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Đổi mật khẩu
                    </Link>
                  </li>
                  <li className="border-t border-gray-200">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-5 py-3 hover:bg-gray-50 transition-colors duration-150 font-medium"
                    >
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-2 h-full items-center">
            <Link to="/login">
              <div className="group relative text-[22px] cursor-pointer h-full flex items-center justify-center px-4 transition-all duration-200">
                <span className="font-medium text-gray-800 hover:text-black transition-colors duration-200">
                  Đăng nhập
                </span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></div>
              </div>
            </Link>
            <span className="text-gray-400 text-xl">|</span>
            <Link to="/register">
              <div className="group relative text-[22px] cursor-pointer h-full flex items-center justify-center px-4 transition-all duration-200">
                <span className="font-medium text-gray-800 hover:text-black transition-colors duration-200">
                  Đăng ký
                </span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></div>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
