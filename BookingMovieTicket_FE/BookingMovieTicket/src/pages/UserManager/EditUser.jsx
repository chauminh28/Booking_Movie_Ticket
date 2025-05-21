import React from 'react'
import NavbarAdmin from '../../components/layouts/NavbarAdmin'
import HeaderAdmin from '../../components/layouts/HeaderAdmin'

import { Link } from 'react-router-dom'

function EditUser() {
    return (
        <>
            <div className='grid grid-cols-12'>
                <div className='col-span-2'>
                    <NavbarAdmin />
                </div>

                <div className='col-span-10'>
                    <div className='bg-white col-span-10 h-[100vh] p-[30px]'>
                        <HeaderAdmin />
                        <p className='font-bold text-[28px]'>SỬA THÔNG TIN NGƯỜI DÙNG</p>
                        <div className='mt-[30px] pl-[30px]'>
                            <form>
                                <div className='grid grid-cols-12 gap-5 '>
                                    <div className='col-span-6 gap-y-4 flex flex-col'>
                                        <div>
                                            <label htmlFor="fullName" className="block text-sm font-bold text-gray-700">Họ tên</label>
                                            <input
                                                type="text"
                                                id="fullName"
                                                className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                            <input
                                                type="text"
                                                id="email"
                                                className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                                            <input
                                                type="text"
                                                id="phone"
                                                className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className='col-span-6 flex flex-col gap-4'>
                                        <div>
                                            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Ngày sinh</label>
                                            <input
                                                type="date"
                                                id="dob"
                                                className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Giới tính</label>
                                            <select
                                                type="text"
                                                id="gender"
                                                className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                                required
                                            >
                                                <option>-- Chọn giới tính --</option>
                                                <option>Nam</option>
                                                <option>Nữ</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                                            <select
                                                type="text"
                                                id="role"
                                                className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                                required
                                            >
                                                <option>-- Chọn vai trò --</option>
                                                <option>Admin</option>
                                                <option>Khách hàng</option>
                                                <option>Nhân viên</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-[56px]'>
                                    <Link to={"/userManager"}>
                                        <button className='bg-white px-4 py-2 text-black border-1 border-black font-bold text-[16px] w-[120px] h-[55px] rounded-[90px] cursor-pointer'>
                                            Huỷ
                                        </button>
                                    </Link>
                                    <button className='bg-black px-4 py-2 text-white font-bold text-[16px] w-[120px] h-[55px] rounded-[90px] ml-6 cursor-pointer'>
                                        Lưu
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

export default EditUser