import React from "react";
import HeaderAdmin from "../../components/layouts/HeaderAdmin";
import NavbarAdmin from "../../components/layouts/NavbarAdmin";
import { IoIosAddCircle } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
function DirectorManager() {
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
                <p className="font-bold text-[28px]">QUẢN LÝ ĐẠO DIỄN</p>
              </div>
              <div className="flex justify-end items-end w-full gap-x-10 pr-[100px]">
                <Link to="/directorManager/addDirector">
                  <IoIosAddCircle className="text-[28px]" />
                </Link>
              </div>
            </div>

            <div>
              <div className="relative w-[576px]">
                <input
                  className="w-[576px] h-[50px] outline-none rounded-xl border-[#BDC5D4] border-[2px] px-3 py-2"
                  placeholder="Tìm kiếm đạo diễn"
                />
                <CiSearch className="absolute top-[16px] right-[20px]" />
              </div>
              <div className="mt-3">
                <table className="table-auto w-full text-left text-sm">
                  <thead>
                    <tr className="font-semibold text-[15px] text-[#A2A2A6]">
                      <th className="px-4 py-2">Ảnh</th>
                      <th className="px-4 py-2">Tên đạo diễn</th>
                      <th className="px-4 py-2">Giới tính</th>
                      <th className="px-4 py-2">Quốc gia</th>
                      <th className="px-4 py-2">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-[#EEEEEE]">
                      <td className="w-36 h-24">
                        <img
                          src="/not-available.jpg"
                          alt=""
                          className="w-full h-full"
                        />
                      </td>
                      <td className="px-4 py-2">Trấn Thành</td>
                      <td className="px-4 py-2">Nam</td>
                      <td className="px-4 py-2">Việt Nam</td>

                      <td className="px-4 py-2 h-full">
                        <div className="flex justify-start items-center gap-x-4">
                          <Link to="/directorManager/editDirector">
                            <button className="text-blue-600 hover:text-blue-800 text-[20px] cursor-pointer">
                              <MdEdit />
                            </button>
                          </Link>
                          <Link to={"/directorManager/deleteDirector"}>
                            <button className="text-red-600 hover:text-red-800 text-[20px] cursor-pointer">
                              <MdDelete />
                            </button>
                          </Link>
                        </div>
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
                      
                      Next
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

export default DirectorManager;
