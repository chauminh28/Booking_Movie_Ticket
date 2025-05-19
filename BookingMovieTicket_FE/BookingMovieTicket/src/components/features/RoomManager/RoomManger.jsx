import React from 'react'
import NavbarAdmin from '../../layouts/NavbarAdmin'
import Search from '../../layouts/Search';
import HeaderAdmin from '../../layouts/HeaderAdmin';

import { FaFilter } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";

export default function RoomMangaer() {
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
                                <p className='font-bold text-[28px]'>QUẢN LÝ PHÒNG CHIẾU</p>
                            </div>
                            <div className='flex justify-end items-end w-full gap-x-10 pr-[100px]'>
                                <button id="lockButton" data-dropdown-toggle="lock" class="font-medium rounded-lg text-sm text-center inline-flex items-center" type="button">
                                    <a href='#'><FaFilter className='text-[28px]' /></a> <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </button>

                                <div id="lock" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 pl-2" aria-labelledby="dropdownDefaultButton">
                                        <li>
                                            <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4" />
                                            <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Khoá</label>

                                        </li>
                                        <li>
                                            <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4" />
                                            <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Mở</label>

                                        </li>
                                    </ul>
                                </div>
                                <a href='#'><IoIosAddCircle className='text-[28px]' /></a>
                            </div>
                        </div>

                        <div>
                            <Search />
                            <div className='mt-3'>
                                <table class="table-auto w-full text-left text-sm">
                                    <thead>
                                        <tr className='font-semibold text-[15px] text-[#A2A2A6]'>
                                            <th class="px-4 py-2">Tên phòng</th>
                                            <th class="px-4 py-2">Sức chứa</th>
                                            <th class="px-4 py-2">Loại màn hình</th>
                                            <th class="px-4 py-2">Máy chiếu</th>
                                            <th class="px-4 py-2">Hệ thống âm thanh</th>
                                            <th class="px-4 py-2">Trạng thái</th>
                                            <th class="px-4 py-2">Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="border-t border-[#EEEEEE]">
                                            <td class="px-4 py-2">Phòng 1</td>
                                            <td class="px-4 py-2">160</td>
                                            <td class="px-4 py-2">2D</td>
                                            <td class="px-4 py-2">Digital Projector</td>
                                            <td class="px-4 py-2">Dolby Atmos</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
