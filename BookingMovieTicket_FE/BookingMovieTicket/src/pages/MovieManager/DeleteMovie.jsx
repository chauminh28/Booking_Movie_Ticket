import React, { useState } from "react";
import NavbarAdmin from "../../components/layouts/NavbarAdmin";
import HeaderAdmin from "../../components/layouts/HeaderAdmin";
import { Link } from "react-router-dom";

function DeleteMovie() {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2">
        <NavbarAdmin />
      </div>
      <div className="col-span-10">
        <div className="bg-white col-span-10 h-[100vh] p-[30px]">
          <HeaderAdmin />
          <p className="font-bold text-[28px]">XÓA PHIM</p>
          <div className="mt-[30px] pl-[30px]">
            <form>
              <div className="grid grid-cols-12 gap-5 ">
                <div className="col-span-6 gap-y-4 flex flex-col">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Tên phim 
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Tên phim"
                      className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="duration"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Thời lượng (phút) 
                    </label>
                    <input
                      type="text"
                      id="duration"
                      placeholder="Thời lượng (phút)"
                      className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-bold text-gray-700"
                    >
                      Ngày khởi chiếu
                    </label>
                    <input
                      type="date"
                      id="date"
                      placeholder="dd/MM/yyyy"
                      className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="age"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Độ tuổi giới hạn
                    </label>
                    <select
                      type="text"
                      id="age"
                      placeholder="your@email.com"
                      className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                      required
                    >
                      <option>-- Chọn độ tuổi giới hạn --</option>
                      <option>P</option>
                      <option>T13</option>
                      <option>T16</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="status"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Trạng thái
                    </label>
                    <select
                      type="text"
                      id="status"
                      placeholder="your@email.com"
                      className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                      required
                    >
                      <option>-- Chọn trạng thái --</option>
                      <option>Chưa chiếu</option>
                      <option>Đang chiếu</option>
                      <option>Sắp chiếu</option>
                    </select>
                  </div>
                </div>
                <div className="col-span-6 flex flex-col gap-4">
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Mô tả phim 
                    </label>
                    <textarea
                      type="text"
                      id="description"
                      placeholder="Mô tả phim"
                      className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Quốc gia 
                    </label>
                    <select
                      type="text"
                      id="country"
                      placeholder="your@email.com"
                      className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                      required
                    >
                      <option>-- Chọn quốc gia --</option>
                      <option>Hàn Quốc</option>
                      <option>Nhật Bản</option>
                      <option>Việt Nam</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="genres"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Thể loại 
                    </label>
                    <select
                      type="text"
                      id="genres"
                      placeholder="your@email.com"
                      className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                      required
                    >
                      <option>-- Chọn thể loại --</option>
                      <option>Khoa học - viễn tưởng</option>
                      <option>Hành động</option>
                      <option>Hoạt hình</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="image"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Ảnh phim 
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
  );
}

export default DeleteMovie;
