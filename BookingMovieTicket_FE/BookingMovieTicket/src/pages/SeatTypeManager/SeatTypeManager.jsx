import React, { useEffect, useState } from 'react'
import NavbarAdmin from '../../components/layouts/NavbarAdmin'
import HeaderAdmin from '../../components/layouts/HeaderAdmin'
import { Link } from 'react-router-dom'

import { FaFilter } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import axios from "axios";

function SeatTypeManager() {
    const [seatTypes, setSeatTypes] = useState([])
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    const size = 5;

    useEffect(() => {
        axios
            .get(`http://localhost:8080/seatTypes`, {
                params: {
                    page: page,
                    size: size,
                    search: searchValue,
                },
            })
            .then((response) => {
                setSeatTypes(response.data.content)
                setTotalPages(response.data.totalPages)
            })
            .catch((error) => {
                console.error("Lỗi fetch api seat type", error);
            });
    }, [page, searchValue])

    const goToPage = (pageNumber) => {
        if (pageNumber >= 0 && pageNumber < totalPages) {
            setPage(pageNumber);
        }
    };

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
                                <p className='font-bold text-[28px]'>QUẢN LÝ LOẠI GHẾ</p>
                            </div>
                            <div className='flex justify-end items-end w-full gap-x-10 pr-[100px]'>
                                <Link to={"/seatTypeManager/addSeatType"}><IoIosAddCircle className='text-[28px]' /></Link>
                            </div>
                        </div>

                        <div>
                            <div className='relative w-[576px]'>
                                <input
                                    value={searchValue}
                                    onChange={(e) => {
                                        setSearchValue(e.target.value);
                                        setPage(0);
                                    }}
                                    className='w-[576px] h-[50px] outline-none rounded-xl border-[#BDC5D4] border-[2px] px-3 py-2'
                                    placeholder='Tìm kiếm loại ghế'
                                />
                                <CiSearch className='absolute top-[16px] right-[20px]' />
                            </div>
                            <div className='mt-3'>
                                <table className="table-auto w-full text-left text-sm">
                                    <thead>
                                        <tr className="font-semibold text-[15px] text-[#A2A2A6]">
                                            <th className="px-4 py-2">Tên loại</th>
                                            <th className="px-4 py-2">Giá</th>
                                            <th className="px-4 py-2">Mô tả</th>
                                            <th className="px-4 py-2">Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {seatTypes.length > 0 ? (
                                            seatTypes.map((seatType) => (
                                                <tr className="border-t border-[#EEEEEE]">
                                                    <td className="px-4 py-2">{seatType.seatTypeName}</td>
                                                    <td className="px-4 py-2">{seatType.price.toLocaleString()}</td>
                                                    <td className="px-4 py-2">{seatType.description}</td>

                                                    <td className="px-4 py-2 h-full">
                                                        <div className="flex justify-start items-center gap-x-4">
                                                            <Link to={`/seatTypeManager/editSeatType/${seatType.id}`}>
                                                                <button className="text-blue-600 hover:text-blue-800 text-[20px] cursor-pointer">
                                                                    <MdEdit />
                                                                </button>
                                                            </Link>
                                                            <Link to={`/seatTypeManager/deleteSeatType/${seatType.id}`}>
                                                                <button className="text-red-600 hover:text-red-800 text-[20px] cursor-pointer">
                                                                    <MdDelete />
                                                                </button>
                                                            </Link>
                                                        </div>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SeatTypeManager