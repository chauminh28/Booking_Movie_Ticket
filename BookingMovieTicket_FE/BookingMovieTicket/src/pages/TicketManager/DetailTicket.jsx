import React from 'react'
import NavbarAdmin from "../../components/layouts/NavbarAdmin";
import HeaderAdmin from "../../components/layouts/HeaderAdmin";
import { Link } from "react-router-dom";

function DetailTicket() {
    return (
        <>
            <div className="grid grid-cols-12">
                <div className="col-span-2">
                    <NavbarAdmin />
                </div>
                <div className="col-span-10">
                    <div className="bg-white col-span-10 h-[100vh] p-[30px]">
                        <HeaderAdmin />
                        <div className='flex justify-between mb-[50px]'>
                            <p className="font-bold text-[28px]">CHI TIẾT VÉ</p>
                            <div className='flex gap-4'>
                                <select
                                    type="text"
                                    id="status"
                                    className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                    required
                                >
                                    <option>Chưa sử dụng</option>
                                    <option>Đã sử dụng</option>
                                    <option>Đã hết hạn</option>
                                </select>

                                <Link to={"/ticketManager"}>
                                    <button className="bg-white px-4 py-2 text-black border-1 border-black font-bold text-[16px] w-[120px] h-[55px] rounded-[90px] cursor-pointer hover:bg-black hover:text-white">
                                        Quay lại
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <form>
                            <div className="grid grid-cols-12 gap-5 ">
                                <div className="col-span-6 gap-y-4 flex flex-col">
                                    <div>
                                        <label
                                            htmlFor="transaction"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Mã giao dịch
                                        </label>
                                        <input
                                            type="text"
                                            id="transaction"
                                            placeholder="Mã giao dịch"
                                            className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                            required
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="username"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Tên người dùng
                                        </label>
                                        <input
                                            type="text"
                                            id="username"
                                            placeholder="Tên người dùng"
                                            className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                            required
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="phone"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Số điện thoại
                                        </label>
                                        <input
                                            type="text"
                                            id="phone"
                                            placeholder="Số điện thoại"
                                            className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                            required
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="schedule"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Ngày đặt
                                        </label>
                                        <input
                                            type="text"
                                            id="schedule"
                                            placeholder="Tên người dùng"
                                            className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                            required
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="showdate"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Ngày chiếu
                                        </label>
                                        <input
                                            type="text"
                                            id="showdate"
                                            placeholder="Ngày chiếu"
                                            className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-span-6 gap-y-4 flex flex-col">
                                    <div>
                                        <label
                                            htmlFor="movie"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Tên phim
                                        </label>
                                        <input
                                            type="text"
                                            id="movie"
                                            placeholder="Tên phim"
                                            className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                            required
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="showtime"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Giờ chiếu
                                        </label>
                                        <input
                                            type="text"
                                            id="showtime"
                                            placeholder="Giờ chiếu"
                                            className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                            required
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="seat"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Ghế
                                        </label>
                                        <input
                                            type="text"
                                            id="seat"
                                            placeholder="Tên ghế"
                                            className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="room"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Phòng chiếu
                                        </label>
                                        <input
                                            type="text"
                                            id="room"
                                            placeholder="Phòng chiếu"
                                            className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailTicket