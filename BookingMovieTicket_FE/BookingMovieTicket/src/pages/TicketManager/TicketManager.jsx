import React, { useEffect, useState } from 'react'
import NavbarAdmin from "../../components/layouts/NavbarAdmin";
import HeaderAdmin from "../../components/layouts/HeaderAdmin";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaFilter } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { IoReorderThreeOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";

function TicketManager() {
    const [booking, setBooking] = useState({});
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    const size = 5;
    const ticketStatus = {
        1: 'Chưa sử dụng',
        2: 'Đã sử dụng',
        3: 'Đã hết hạn'
    };

    useEffect(() => {
        axios
            .get("http://localhost:8080/bookings", {
                params: {
                    page: page,
                    size: size,
                    search: searchValue,
                },
            })
            .then((response) => {
                setBooking(response.data.content);
                setTotalPages(response.data.totalPages);
            })
            .catch((error) => {
                console.error("Lỗi khi tải danh sách đặt vé!", error);
            });
    }, [page, searchValue]);

    const goToPage = (pageNumber) => {
        if (pageNumber >= 0 && pageNumber < totalPages) {
            setPage(pageNumber);
        }
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
                                <p className="font-bold text-[28px]">QUẢN LÝ ĐẶT VÉ</p>
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
                                            <th className="px-4 py-2">Mã giao dịch</th>
                                            <th className="px-4 py-2">Tên người dùng</th>
                                            <th className="px-4 py-2">Số điện thoại</th>
                                            <th className="px-4 py-2">Ngày đặt</th>
                                            <th className="px-4 py-2">Trạng thái</th>
                                            <th className="px-4 py-2">Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {booking.length > 0 ? (
                                            booking.map(b => (
                                                <tr className="border-t border-[#EEEEEE]">
                                                    <td className="px-4 py-2">{b.id}</td>
                                                    <td className="px-4 py-2">{b.username}</td>
                                                    <td className="px-4 py-2">{b.phone}</td>
                                                    <td className="px-4 py-2">{b.bookingTime}</td>
                                                    <td className="px-4 py-2">
                                                        {ticketStatus[b.ticketStatus]}
                                                    </td>
                                                    <td className="px-4 py-2 flex space-x-4">
                                                        <Link to={`/ticketManager/detail/${b.id}`}>
                                                            <button className="text-black hover:text-gray-800 text-[25px] cursor-pointer">
                                                                <IoReorderThreeOutline />
                                                            </button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="7"
                                                    className="text-center py-4 text-gray-500"
                                                >
                                                    Không có vé nào.
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
    )
}

export default TicketManager