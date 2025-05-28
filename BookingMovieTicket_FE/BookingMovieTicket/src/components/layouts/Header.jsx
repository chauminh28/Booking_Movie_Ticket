import React, { useEffect, useState } from "react";
import { IoPersonCircle } from "react-icons/io5";
import Logo from "/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { initFlowbite } from "flowbite";
import { jwtDecode } from 'jwt-decode';

function Header() {
  const [username, setUsername] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false)
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

  React.useEffect(() => {
    initFlowbite();
  }, []);
  return (
    <div className="bg-[#f3f3f3] h-24 flex justify-center items-center mb-12">
      <div className="h-full items-center flex container justify-around mx-auto">
        <Link to={"/"}>
          <div className="h-full flex items-center justify-center w-[150px]">
            <img
              src={Logo}
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
        </Link>

        <div className="h-full flex items-center justify-center w-[500px]">
          <ul className="flex space-x-[15] w-full justify-around h-full">
            <Link to={"/"}>
              <li className="text-[24px] cursor-pointer hover:border-b-2 hover:border-black h-full w-30 items-center flex justify-center">
                Trang chủ
              </li>
            </Link>
            <Link to={"/movie"}>
              <li className="text-[24px] cursor-pointer hover:border-b-2 hover:border-black h-full w-30 items-center flex justify-center">
                Phim
              </li>
            </Link>
            <Link to={"/schedule"}>
              <li className="text-[24px] cursor-pointer hover:border-b-2 hover:border-black h-full w-30 items-center flex justify-center">
                Lịch chiếu
              </li>
            </Link>
          </ul>
        </div>

        {username ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              type="button"
              className="cursor-pointer"
            >
              <div className="flex items-center justify-around w-[250px]">
                <IoPersonCircle className="w-8 h-16" />
                <p className="text-[24px]">{username}</p>
              </div>
            </button>

            {dropdownOpen && (
              <div
                id="dropdown"
                className="absolute right-0 mt-2 z-40 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-60"
              >
                <ul
                  className="py-2 text-sm text-gray-700"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Thông tin tài khoản
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/profile/history"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Lịch sử giao dịch
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/profile/changePassword"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Đổi mật khẩu
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-4 h-full">
            <div className="text-[24px] cursor-pointer hover:border-b-2 hover:border-black h-full w-30 items-center flex justify-center">
              <Link
                to="/login"
              >
                Đăng nhập
              </Link>
            </div>
            <div className="text-[24px] cursor-pointer hover:border-b-2 hover:border-black h-full w-30 items-center flex justify-center">
              <Link
                to="/register"
              >
                Đăng ký
              </Link>
            </div>
          </div>
        )}
      </div>
    </div >
  );
}

export default Header;
