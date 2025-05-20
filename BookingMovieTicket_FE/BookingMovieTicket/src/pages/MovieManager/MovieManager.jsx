import React from "react";
import HeaderAdmin from "../../components/layouts/HeaderAdmin";
import NavbarAdmin from "../../components/layouts/NavbarAdmin";
import { FaFilter } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Search from "../../components/layouts/Search";
function MovieManager() {
  return (
    <div>
      <div className="grid grid-cols-12">
        <div className="col-span-2">
          <NavbarAdmin />
        </div>
        <div className="col-span-10">
          <div className="bg-white col-span-10 h-[100vh] p-[10px]">
            <div className="flex">
              <HeaderAdmin />
            </div>

            <div className="flex mt-6 w-full mb-6">
              <div className="w-full">
                <p className="font-bold text-[28px]">QUẢN LÝ PHIM</p>
              </div>
              <div className="flex justify-end items-end w-full gap-x-10 pr-[100px]">
                <button
                  id="lockButton"
                  data-dropdown-toggle="lock"
                  className="font-medium rounded-lg text-sm text-center inline-flex items-center"
                  type="button"
                >
                  <a href="#">
                    <FaFilter className="text-[28px]" />
                  </a>{" "}
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
                  id="lock"
                  className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700"
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200 pl-2"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li>
                      <input
                        id="default-radio-1"
                        type="radio"
                        value=""
                        name="default-radio"
                        className="w-4 h-4 text-gray-500"
                      />
                      <label
                        htmlFor="default-radio-1"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Khoá
                      </label>
                    </li>
                    <li>
                      <input
                        id="default-radio-1"
                        type="radio"
                        value=""
                        name="default-radio"
                        className="w-4 h-4 text-gray-500"
                      />
                      <label
                        htmlFor="default-radio-1"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Mở
                      </label>
                    </li>
                  </ul>
                </div>
                <Link to="/movieManager/addMovie">
                  <IoIosAddCircle className="text-[28px]" />
                </Link>
              </div>
            </div>

            <div>
              <Search />
              <div className="mt-3">
                <table className="table-auto w-full text-left text-sm">
                  <thead>
                    <tr className="font-semibold text-[15px] text-[#A2A2A6]">
                      <th className="px-4 py-2">Tên phim</th>
                      <th className="px-4 py-2">Ngày khởi chiếu</th>
                      <th className="px-4 py-2">Thời lượng</th>
                      <th className="px-4 py-2">Độ tuổi giới hạn</th>
                      <th className="px-4 py-2">Trạng thái</th>
                      <th className="px-4 py-2">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-[#EEEEEE]">
                      <td className="px-4 py-2">Biệt đội sấm sét</td>
                      <td className="px-4 py-2">30/04/2025</td>
                      <td className="px-4 py-2">126 phút</td>
                      <td className="px-4 py-2">T13</td>
                      <td className="px-4 py-2">Đang chiếu</td>

                      <td className="px-4 py-2 flex space-x-4">
                        <Link to="/movieManager/editMovie">
                          <button className="text-blue-600 hover:text-blue-800 text-[20px] cursor-pointer">
                            <MdEdit />
                          </button>
                        </Link>
                        <Link to={"/movieManager/deleteMovie"}>
                          <button className="text-red-600 hover:text-red-800 text-[20px] cursor-pointer">
                            <MdDelete />
                          </button>
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex justify-center mt-4">
                  <nav className="inline-flex items-center space-x-1 text-sm">
                    <a
                      href="#"
                      className="px-3 py-2 rounded-l-md bg-[#F5F5F5] border border-gray-300 hover:bg-black hover:text-white"
                    >
                      Prev
                    </a>
                    <a
                      href="#"
                      className="px-3 py-2 bg-[#F5F5F5] border border-gray-300 hover:bg-black hover:text-white rounded-md"
                    >
                      1
                    </a>
                    <a
                      href="#"
                      className="px-3 py-2 bg-[#F5F5F5] border border-gray-300 hover:bg-black hover:text-white rounded-md"
                    >
                      2
                    </a>
                    <a
                      href="#"
                      className="px-3 py-2 bg-[#F5F5F5] border border-gray-300 hover:bg-black hover:text-white rounded-md"
                    >
                      3
                    </a>
                    <a
                      href="#"
                      className="px-3 py-2 rounded-r-md bg-[#F5F5F5] border border-gray-300 hover:bg-black hover:text-white"
                    >
                      {" "}
                      Next{" "}
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieManager;
