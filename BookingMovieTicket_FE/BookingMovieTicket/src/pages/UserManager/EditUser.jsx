import React, { useState } from 'react'
import NavbarAdmin from '../../components/layouts/NavbarAdmin'
import HeaderAdmin from '../../components/layouts/HeaderAdmin'

import { Link } from 'react-router-dom'

function EditUser() {
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

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
                                <div className="grid grid-cols-12 gap-5">
                                    <div className="col-span-6 gap-y-4 flex flex-col w-[800px">
                                        <div>
                                            <label
                                                htmlFor="username"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Username <span className="text-red-600">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="username"
                                                placeholder="Username"
                                                className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                                required
                                            />
                                        </div>
                                        <div className='grid grid-cols-7 gap-10'>
                                            <div className='col-span-2'>
                                                <label
                                                    htmlFor="lastname"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Họ và tên đệm <span className="text-red-600">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    id="lastname"
                                                    placeholder="Họ"
                                                    className="bg-[#F9F9F9] mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                                    required
                                                />
                                            </div>
                                            <div className='col-span-2'>
                                                <label
                                                    htmlFor="firstname"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Tên <span className="text-red-600">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    id="firstname"
                                                    placeholder="Tên"
                                                    className="bg-[#F9F9F9] mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="gender"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Giới tính <span className="text-red-600">*</span>
                                            </label>
                                            <div className="flex p-2 space-x-10 text-gray-500">
                                                <label htmlFor="gender">
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        value="Nam"
                                                        className="mr-2 text-gray-500"
                                                    />
                                                    Nam
                                                </label>
                                                <label htmlFor="">
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        value="Nữ"
                                                        className="mr-2 text-gray-500"
                                                    />
                                                    Nữ
                                                </label>
                                            </div>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="dob"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Ngày sinh <span className="text-red-600">*</span>
                                            </label>
                                            <input
                                                type="date"
                                                id="dob"
                                                className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-6 gap-y-4 flex flex-col">
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email <span className="text-red-600">*</span></label>
                                            <input
                                                type="text"
                                                id="email"
                                                placeholder='Email'
                                                className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Số điện thoại <span className="text-red-600">*</span></label>
                                            <input
                                                type="text"
                                                id="phone"
                                                placeholder='Số điện thoại'
                                                className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="avatar"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Ảnh đại diện
                                            </label>
                                            <input
                                                type="file"
                                                id="avatar"
                                                placeholder="image"
                                                className="bg-[#F9F9F9] rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition w-[404px]"
                                                onChange={handleImageChange}
                                            />
                                            {image && (
                                                <div className="flex items-center justify-center mt-2 w-[404px]">
                                                    <img
                                                        src={image}
                                                        alt="Preview"
                                                        className="mt-2 w-40 h-40 object-cover rounded-md border"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-[56px]">
                                    <Link to={"/userManager"}>
                                        <button className="bg-white px-4 py-2 text-black border-1 border-black font-bold text-[16px] w-[120px] h-[55px] rounded-[90px] cursor-pointer">
                                            Huỷ
                                        </button>
                                    </Link>
                                    <button className="bg-black px-4 py-2 text-white font-bold text-[16px] w-[120px] h-[55px] rounded-[90px] ml-6 cursor-pointer">
                                        Tạo
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