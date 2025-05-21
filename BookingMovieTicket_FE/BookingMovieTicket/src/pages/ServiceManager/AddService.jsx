import React, { useState } from "react";
import NavbarAdmin from "../../components/layouts/NavbarAdmin";
import HeaderAdmin from "../../components/layouts/HeaderAdmin";
import { Link } from "react-router-dom";

function AddService() {
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    return (
        <>
            <div className="grid grid-cols-12">
                <div className="col-span-2">
                    <NavbarAdmin />
                </div>
                <div className="col-span-10">
                    <div className="bg-white col-span-10 h-[100vh] p-[30px]">
                        <HeaderAdmin />
                        <p className="font-bold text-[28px]">THÊM DỊCH VỤ</p>
                        <div className="mt-[30px] pl-[30px]">
                            <form>
                                <div className="grid grid-cols-12 gap-5 ">
                                    <div className="col-span-6 gap-y-4 flex flex-col">
                                        <div>
                                            <label
                                                htmlFor="name"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Tên dịch vụ <span className="text-red-600">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                placeholder="Tên dịch vụ"
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
                                                placeholder="Giá dịch vụ"
                                                className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="type"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Loại dịch vụ <span className="text-red-600">*</span>{" "}
                                            </label>
                                            <select
                                                type="text"
                                                id="type"
                                                className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                                required
                                            >
                                                <option>-- Chọn loại dịch vụ --</option>
                                                <option>Combo</option>
                                                <option>Nước</option>
                                                <option>Poca</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="image"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Ảnh dịch vụ <span className="text-red-600">*</span>{" "}
                                            </label>
                                            <input
                                                type="file"
                                                id="image"
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
                                    <div className="col-span-6 gap-y-4 flex flex-col"></div>
                                </div>
                                <div className="mt-[56px]">
                                    <Link to={"/serviceManager"}>
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

export default AddService