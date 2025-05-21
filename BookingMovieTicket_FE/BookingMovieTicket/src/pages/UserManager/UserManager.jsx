import React, { useState } from 'react'
import NavbarAdmin from '../../components/layouts/NavbarAdmin'
import HeaderAdmin from '../../components/layouts/HeaderAdmin'
import Search from '../../components/layouts/Search'
import { Link } from 'react-router-dom'

import { FaFilter } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function UserManager() {
    const [userStatus, setUserStatus] = useState(true);

    const toggleUser = () => setUserStatus(!userStatus);

    return (
        <>
            <div className='grid grid-cols-12'>
                <div className='col-span-2'>
                    <NavbarAdmin />
                </div>
                <div className='col-span-10'>
                    <div className='bg-white col-span-10 h-[100vh] p-[10px]'>
                        <div className='flex'>
                            <HeaderAdmin />
                        </div>

                        <div className='flex mt-6 w-full mb-6'>
                            <div className='w-full'>
                                <p className='font-bold text-[28px]'>QUẢN LÝ NGƯỜI DÙNG</p>
                            </div>
                            <div className='flex justify-end items-end w-full gap-x-10 pr-[100px]'>
                                <button id="lockButton" data-dropdown-toggle="lock" className="font-medium rounded-lg text-sm text-center inline-flex items-center" type="button">
                                    <a href='#'><FaFilter className='text-[28px]' /></a> <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </button>

                                <div id="lock" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 pl-2" aria-labelledby="dropdownDefaultButton">
                                        <li>
                                            <input id="default-radio-1" type="radio" value="" name="default-radio" className="w-4 h-4 text-gray-500" />
                                            <label htmlFor="default-radio-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Khoá</label>

                                        </li>
                                        <li>
                                            <input id="default-radio-1" type="radio" value="" name="default-radio" className="w-4 h-4 text-gray-500" />
                                            <label htmlFor="default-radio-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Mở</label>

                                        </li>
                                    </ul>
                                </div>
                                <Link to={"/roomManager/addRoom"}><IoIosAddCircle className='text-[28px]' /></Link>
                            </div>
                        </div>

                        <div>
                            <Search />
                            <div className='mt-3'>
                                <table className="table-auto w-full text-left text-sm">
                                    <thead>
                                        <tr className='font-semibold text-[15px] text-[#A2A2A6]'>
                                            <th className="px-4 py-2">Username</th>
                                            <th className="px-4 py-2">Họ tên</th>
                                            <th className="px-4 py-2">Email</th>
                                            <th className="px-4 py-2">Ngày sinh</th>
                                            <th className="px-4 py-2">Số điện thoại</th>
                                            <th className="px-4 py-2">Role</th>
                                            <th className="px-4 py-2">Trạng thái</th>
                                            <th className="px-4 py-2">Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-t border-[#EEEEEE]">
                                            <td className="px-4 py-2">trinhza1</td>
                                            <td className="px-4 py-2">Huỳnh Ngọc Trình</td>
                                            <td className="px-4 py-2">trinhza1@gmail.com</td>
                                            <td className="px-4 py-2">12/12/2002</td>
                                            <td className="px-4 py-2">0123456789</td>
                                            <td className="px-4 py-2">Admin</td>
                                            <td className="px-4 py-2">
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={userStatus}
                                                        onChange={toggleUser}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-11 h-6 bg-gray-300 peer-checked:bg-black rounded-full transition-colors duration-300"></div>
                                                    <div className="absolute w-5 h-5 bg-white rounded-full shadow left-0.5 top-0.5 peer-checked:translate-x-full transition transform duration-300"></div>
                                                </label>
                                            </td>
                                            <td className="px-4 py-2 flex space-x-4">
                                                <Link to="/userManager/editUser">
                                                    <button className="text-blue-600 hover:text-blue-800 text-[20px] cursor-pointer">
                                                        <MdEdit />
                                                    </button>
                                                </Link>
                                                <button className="text-red-600 hover:text-red-800 text-[20px] cursor-pointer">
                                                    <MdDelete />
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="flex justify-center mt-4">
                                    <nav className="inline-flex items-center space-x-1 text-sm">
                                        <a href="#" className="px-3 py-2 rounded-l-md bg-[#F5F5F5] border border-gray-300 hover:bg-black hover:text-white"> Prev </a>
                                        <a href="#" className="px-3 py-2 bg-[#F5F5F5] border border-gray-300 hover:bg-black hover:text-white rounded-md">1</a>
                                        <a href="#" className="px-3 py-2 bg-[#F5F5F5] border border-gray-300 hover:bg-black hover:text-white rounded-md">2</a>
                                        <a href="#" className="px-3 py-2 bg-[#F5F5F5] border border-gray-300 hover:bg-black hover:text-white rounded-md">3</a>
                                        <a href="#" className="px-3 py-2 rounded-r-md bg-[#F5F5F5] border border-gray-300 hover:bg-black hover:text-white"> Next </a>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserManager