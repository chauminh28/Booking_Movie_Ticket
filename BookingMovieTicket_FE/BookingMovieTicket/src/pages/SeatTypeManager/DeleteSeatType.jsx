import React from 'react'
import HeaderAdmin from "../../components/layouts/HeaderAdmin";
import NavbarAdmin from "../../components/layouts/NavbarAdmin";
import { Link } from "react-router-dom";

function DeleteSeatType() {
    return (
        <>
            <div className="grid grid-cols-12">
                <div className="col-span-2">
                    <NavbarAdmin />
                </div>
                <div className="col-span-10">
                    <div className="bg-white col-span-10 h-[100vh] p-[30px]">
                        <HeaderAdmin />
                        <p className="font-bold text-[28px]">THÊM LOẠI GHẾ</p>
                        <div className="mt-[30px] pl-[30px]">
                            <form>
                                <div className="grid grid-cols-12 gap-5 ">
                                    <div className="col-span-6 gap-y-4 flex flex-col">
                                        <div>
                                            <label
                                                htmlFor="name"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Tên loại ghế <span className="text-red-600">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                placeholder="Tên loại ghế"
                                                className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="price"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Giá <span className="text-red-600">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="price"
                                                placeholder="Giá loại ghế"
                                                className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="description"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Mô tả phim <span className="text-red-600">*</span>{" "}
                                            </label>
                                            <textarea
                                                type="text"
                                                id="description"
                                                placeholder="Mô tả phim"
                                                className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-[56px]">
                                    <Link to={"/movieManager"}>
                                        <button className="bg-white px-4 py-2 text-black border-1 border-black font-bold text-[16px] w-[120px] h-[55px] rounded-[90px] cursor-pointer">
                                            Huỷ
                                        </button>
                                    </Link>
                                    <button className="bg-red-500 px-4 py-2 text-white font-bold text-[16px] w-[120px] h-[55px] rounded-[90px] ml-6 cursor-pointer">
                                        Xóa
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteSeatType