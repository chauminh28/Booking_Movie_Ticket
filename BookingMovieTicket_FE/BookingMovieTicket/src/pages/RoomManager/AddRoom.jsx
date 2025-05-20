import React, { useEffect, useState } from 'react'
import HeaderAdmin from '../../layouts/HeaderAdmin'
import NavbarAdmin from '../../layouts/NavbarAdmin'

export default function AddRoom() {
    const [row, setRow] = useState(0);
    const [col, setCol] = useState(0);
    const [total, setTotal] = useState();

    useEffect(() => {
        const r = parseInt(row);
        const c = parseInt(col);
        if (!isNaN(r) && !isNaN(c)) {
            setTotal(r * c);
        } else {
            setTotal(0);
        }
    }, [row, col]);

    return (
        <>
            <div className='grid grid-cols-12'>
                <div className='col-span-2'>
                    <NavbarAdmin />
                </div>

                <div className='col-span-10'>
                    <div className='bg-white col-span-10 h-[100vh] p-[30px]'>
                        <HeaderAdmin />
                        <p className='font-bold text-[28px]'>THÊM PHÒNG CHIẾU</p>
                        <div className='mt-[30px] pl-[30px]'>
                            <form>
                                <div className='grid grid-cols-12 gap-5 '>
                                    <div className='col-span-6 gap-y-4 flex flex-col'>
                                        <div>
                                            <label for="date" class="block text-sm font-bold text-gray-700">Ngày tạo phòng</label>
                                            <input
                                                type="date"
                                                id="date"
                                                placeholder="dd/MM/yyyy"
                                                class="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                            />
                                        </div>
                                        <div>
                                            <label for="name" class="block text-sm font-medium text-gray-700">Tên phòng chiếu <span className='text-red-600'>*</span> </label>
                                            <input
                                                type="text"
                                                id="name"
                                                placeholder="Tên phòng chiếu"
                                                class="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label for="total" class="block text-sm font-medium text-gray-700">Sức chứa</label>
                                            <input
                                                type="text"
                                                id="total"
                                                value={total}
                                                placeholder="Sức chứa"
                                                class="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                                readOnly
                                            />
                                        </div>
                                        <div className=' w-[404px]'>
                                            <label class="block text-sm font-medium text-gray-700 mb-4">Sơ đồ ghế <span className='text-red-600'>*</span> </label>
                                            <div className='flex justify-around'>
                                                <div className='col-span-1'>
                                                    <label for="row" class="block text-sm font-medium text-gray-700">Số hàng <span className='text-red-600'>*</span> </label>
                                                    <input
                                                        type="text"
                                                        value={row}
                                                        id="row"
                                                        placeholder="Hàng"
                                                        onChange={(e) => setRow(e.target.value)}
                                                        class="bg-[#F9F9F9] mt-1 block w-[125px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                                        required
                                                    />
                                                </div>
                                                <div className='col-span-1'>
                                                    <label for="column" class="block text-sm font-medium text-gray-700">Số cột <span className='text-red-600'>*</span> </label>
                                                    <input
                                                        type="text"
                                                        value={col}
                                                        id="column"
                                                        placeholder="Cột"
                                                        onChange={(e) => setCol(e.target.value)}
                                                        class="bg-[#F9F9F9] mt-1 block w-[125px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-span-6 flex flex-col gap-4'>
                                        <div>
                                            <label for="monitor" class="block text-sm font-medium text-gray-700">Loại màn hình  <span className='text-red-600'>*</span> </label>
                                            <select
                                                type="text"
                                                id="monitor"
                                                placeholder="your@email.com"
                                                class="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                                required
                                            >
                                                <option>-- Chọn màn hình --</option>
                                                <option>2D</option>
                                                <option>3D</option>
                                                <option>IMAX</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label for="sound" class="block text-sm font-medium text-gray-700">Hệ thống âm thanh  <span className='text-red-600'>*</span> </label>
                                            <select
                                                type="text"
                                                id="sound"
                                                placeholder="your@email.com"
                                                class="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                                required
                                            >
                                                <option>-- Chọn hệ thống âm thanh --</option>
                                                <option>Dolby Atmos</option>
                                                <option>DTS:X</option>
                                                <option>IMAX Audio</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label for="projector" class="block text-sm font-medium text-gray-700">Máy chiếu <span className='text-red-600'>*</span> </label>
                                            <select
                                                type="text"
                                                id="projector"
                                                placeholder="your@email.com"
                                                class="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                                required
                                            >
                                                <option>-- Chọn máy chiếu --</option>
                                                <option>Digital Projector</option>
                                                <option>IMAX</option>
                                                <option>3D</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-[56px]'>
                                    <button className='bg-white px-4 py-2 text-black border-1 border-black font-bold text-[16px] w-[120px] h-[55px] rounded-[90px] cursor-pointer'>
                                        Huỷ
                                    </button>
                                    <button className='bg-black px-4 py-2 text-white font-bold text-[16px] w-[120px] h-[55px] rounded-[90px] ml-6 cursor-pointer'>
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
