import React from "react";
import { IoPersonCircle } from "react-icons/io5";
import Logo from "/logo.png";
import { Link } from "react-router-dom";
import { initFlowbite } from "flowbite";
function Header() {
  React.useEffect(() => {
    initFlowbite();
  }, []);
  return (
    <>
      <div className="bg-[#f3f3f3] h-24 flex justify-center items-center mb-12">
        <div className="h-full items-center flex container justify-around mx-auto">
          <div className="h-full flex items-center justify-center w-[150px]">
            <img src={Logo} alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div className="h-full flex items-center justify-center w-[500px]">
            <ul className="flex space-x-[15] w-full justify-around h-full">
              <li className="text-[24px] cursor-pointer hover:border-b-2 hover:border-black h-full w-30 items-center flex justify-center">
                <Link to="/">Trang chủ</Link>
              </li>
              <li className="text-[24px] cursor-pointer hover:border-b-2 hover:border-black h-full w-30 items-center flex justify-center">
                Phim
              </li>
              <li className="text-[24px] cursor-pointer hover:border-b-2 hover:border-black h-full w-30 items-center flex justify-center">
                Lịch chiếu
              </li>
            </ul>
          </div>
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            className=""
            type="button"
          >
            <div className="flex items-center justify-around w-[250px] cursor-pointer">
              <IoPersonCircle className="w-8 h-16" />
              <p className="text-[24px]">Nguyen Van Anh</p>
            </div>
          </button>

          <div
            id="dropdown"
            className="z-40 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-60 dark:bg-gray-700"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Thông tin tài khoản
                </Link>
              </li>
              <li>
                <Link
                  to="/profile/history"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Lịch sử giao dịch
                </Link>
              </li>
              <li>
                <Link
                  to="/profile/changePassword"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Đổi mặt khẩu
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Đăng xuất
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
