import React, { useEffect, useState } from "react";
import NavbarAdmin from "../../components/layouts/NavbarAdmin";
import HeaderAdmin from "../../components/layouts/HeaderAdmin";
import { Link } from "react-router-dom";

import { FaFilter } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import axiosClient from "../../api/axiosClient";

function UserManager() {
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filterStatus, setFilterStatus] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const roleMap = {
    1: 'Admin',
    2: 'Customer',
    3: 'Employee'
  };
  const size = 5;

  useEffect(() => {
    axios
      .get(`http://localhost:8080/users`, {
        params: {
          page: page,
          size: size,
          search: searchValue,
          status: filterStatus !== null ? filterStatus : undefined,
        },
      })
      .then((response) => {
        console.log(response.data.content)
        setUsers(response.data.content)
        setTotalPages(response.data.totalPages)
      })
      .catch((error) => {
        console.error("Lỗi fetch api user", error);
      });
  }, [page, searchValue, filterStatus])

  const goToPage = (pageNumber) => {
    if (pageNumber >= 0 && pageNumber < totalPages) {
      setPage(pageNumber);
    }
  };

  const toggleUser = async (userId) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    const updatedUser = { status: !user.status };

    try {
      const res = await axiosClient.put(`/users/status/${userId}`, updatedUser)
      setUsers(prevUsers =>
        prevUsers.map(u =>
          u.id === userId ? { ...u, status: res.data.status } : u
        )
      );
    } catch (err) {
      console.log(err)
    }
  };

  const handleFilterChange = (value) => {
    const newValue = value === "active" ? true : false;

    if (filterStatus === newValue) {
      setFilterStatus(null);
    } else {
      setFilterStatus(newValue);
    }

    setPage(0);
  };

  return (
    <>
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
                <p className="font-bold text-[28px]">QUẢN LÝ NGƯỜI DÙNG</p>
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
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 pl-2">
                    <li>
                      <input
                        id="locked"
                        type="checkbox"
                        checked={filterStatus === false}
                        onChange={() => handleFilterChange("locked")}
                        className="w-4 h-4 text-gray-500"
                      />
                      <label
                        htmlFor="locked"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Khoá
                      </label>
                    </li>
                    <li>
                      <input
                        id="active"
                        type="checkbox"
                        checked={filterStatus === true}
                        onChange={() => handleFilterChange("active")}
                        className="w-4 h-4 text-gray-500"
                      />
                      <label
                        htmlFor="active"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Mở
                      </label>
                    </li>
                  </ul>
                </div>
                <Link to={"/userManager/addUser"}>
                  <IoIosAddCircle className="text-[28px]" />
                </Link>
              </div>
            </div>

            <div>
              <div className="relative w-[576px]">
                <input
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                    setPage(0);
                  }}
                  className="w-[576px] h-[50px] outline-none rounded-xl border-[#BDC5D4] border-[2px] px-3 py-2"
                  placeholder="Tìm kiếm người dùng"
                />
                <CiSearch className="absolute top-[16px] right-[20px]" />
              </div>
              <div className="mt-3">
                <table className="table-auto w-full text-left text-sm">
                  <thead>
                    <tr className="font-semibold text-[15px] text-[#A2A2A6]">
                      <th className="px-4 py-2">Username</th>
                      <th className="px-4 py-2">Họ tên</th>
                      <th className="px-4 py-2">Email</th>
                      <th className="px-4 py-2">Ngày sinh</th>
                      <th className="px-4 py-2">Giới tính</th>
                      <th className="px-4 py-2">Số điện thoại</th>
                      <th className="px-4 py-2">Role</th>
                      <th className="px-4 py-2">Trạng thái</th>
                      <th className="px-4 py-2">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((user) => (
                        <tr className="border-t border-[#EEEEEE]" key={user.id}>
                          <td className="px-4 py-2" >{user.userName}</td>
                          <td className="px-4 py-2">{user.lastName + " " + user.firstName}</td>
                          <td className="px-4 py-2">{user.email}</td>
                          <td className="px-4 py-2">{user.dob}</td>
                          <td className="px-4 py-2">{user.gender}</td>
                          <td className="px-4 py-2">{user.phone}</td>
                          <td className="px-4 py-2">{roleMap[user.roleId]}</td>
                          <td className="px-4 py-2">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={user.status}
                                onChange={() => toggleUser(user.id)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-300 peer-checked:bg-black rounded-full transition-colors duration-300"></div>
                              <div className="absolute w-5 h-5 bg-white rounded-full shadow left-0.5 top-0.5 peer-checked:translate-x-full transition transform duration-300"></div>
                            </label>
                          </td>
                          <td className="px-4 py-2 flex space-x-4">
                            <Link to={`/userManager/editUser/${user.id}`}>
                              <button className="text-blue-600 hover:text-blue-800 text-[20px] cursor-pointer">
                                <MdEdit />
                              </button>
                            </Link>
                            <Link to={`/userManager/deleteUser/${user.id}`}>
                              <button className="text-red-600 hover:text-red-800 text-[20px] cursor-pointer">
                                <MdDelete />
                              </button>
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="2"
                          className="text-center py-4 text-gray-500"
                        >
                          Không có người dùng nào.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div className="flex justify-center mt-4">
                  <nav className="inline-flex items-center space-x-1 text-sm">
                    <button
                      onClick={() => goToPage(page - 1)}
                      disabled={page === 0}
                      className="px-3 py-2 rounded-l-md bg-[#F5F5F5] border border-gray-300 hover:bg-black hover:text-white disabled:opacity-50"
                    >
                      Prev
                    </button>

                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToPage(index)}
                        className={`px-3 py-2 border border-gray-300 ${index === page
                          ? "bg-black text-white"
                          : "bg-[#F5F5F5] hover:bg-black hover:text-white"
                          } rounded-md`}
                      >
                        {index + 1}
                      </button>
                    ))}

                    <button
                      onClick={() => goToPage(page + 1)}
                      disabled={page === totalPages - 1}
                      className="px-3 py-2 rounded-r-md bg-[#F5F5F5] border border-gray-300 hover:bg-black hover:text-white disabled:opacity-50"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserManager;
