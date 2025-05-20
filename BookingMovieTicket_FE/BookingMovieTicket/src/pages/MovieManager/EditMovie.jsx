import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../components/layouts/HeaderAdmin";
import NavbarAdmin from "../../components/layouts/NavbarAdmin";
import { Link } from "react-router-dom";
import { LuListCollapse } from "react-icons/lu";
import { initFlowbite } from "flowbite";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
function EditMovie() {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    initFlowbite();
  }, []);
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2">
        <NavbarAdmin />
      </div>
      <div className="bg-white col-span-10 h-[100vh] p-[30px]">
        <HeaderAdmin />
        <p className="font-bold text-[28px]">SỬA PHIM</p>
        <div className="mt-[30px] pl-[30px]">
          <form>
            <div className="grid grid-cols-12 gap-5 ">
              <div className="col-span-6 gap-y-4 flex flex-col">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tên phim <span className="text-red-600">*</span>{" "}
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
                    Thời lượng (phút) <span className="text-red-600">*</span>{" "}
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
                    Độ tuổi giới hạn<span className="text-red-600">*</span>{" "}
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
                    Trạng thái<span className="text-red-600">*</span>{" "}
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
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Quốc gia <span className="text-red-600">*</span>{" "}
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
                    Thể loại <span className="text-red-600">*</span>{" "}
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
                    Ảnh phim <span className="text-red-600">*</span>{" "}
                  </label>
                  <input
                    type="file"
                    id="image"
                    placeholder="image"
                    className=" rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition w-[404px]"
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
              <button className="bg-black px-4 py-2 text-white font-bold text-[16px] w-[120px] h-[55px] rounded-[90px] ml-6 cursor-pointer">
                Tạo
              </button>
            </div>
          </form>
        </div>
        <div className="flex items-center justify-between mt-8 border-t-4 border-gray-400 shadow-md p-2">
          <p className="font-bold text-xl">Đạo diễn</p>
          <button
            data-collapse-toggle="collapseDirector"
            type="button"
            className="font-medium items-start cursor-pointer flex"
          >
            <LuListCollapse />
          </button>
        </div>
        <div id="collapseDirector" className="hidden">
          <div className="font-medium  dark:text-gray-200">
            <div className="flex items-center w-full">
              <table className="table-auto w-full text-left text-sm">
                <thead>
                  <tr className="font-semibold text-[15px] text-[#A2A2A6]">
                    <th className="px-4 py-2">Tên đạo diễn</th>
                    <th className="px-4 py-2 flex items-end justify-end">
                      <Link to={"/movieManager/editMovie/addDirector"}>
                        <IoMdAddCircle className="w-8 h-8 cursor-pointer text-blue-600 hover:text-blue-800" />
                      </Link>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-[#EEEEEE]">
                    <td className="px-4 py-2">Biệt đội sấm sét</td>

                    <td className="px-4 py-2 flex space-x-4">
                      <Link to="/movieManager/editMovie/editDirector">
                        <button className="text-blue-600 hover:text-blue-800 text-[20px] cursor-pointer">
                          <MdEdit />
                        </button>
                      </Link>
                      <button
                        className="text-red-600 hover:text-red-800 text-[20px] cursor-pointer"
                        onClick={() => alert("Xóa thành công")}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-8 border-t-4 border-gray-400 shadow-md p-2">
          <p className="font-bold text-xl">Diễn viên</p>
          <button
            data-collapse-toggle="collapseActor"
            type="button"
            className="font-medium items-start cursor-pointer flex"
          >
            <LuListCollapse />
          </button>
        </div>
        <div id="collapseActor" className="hidden">
          <div className="font-medium  dark:text-gray-200">
            <div className="flex items-center w-full">
              <table className="table-auto w-full text-left text-sm">
                <thead>
                  <tr className="font-semibold text-[15px] text-[#A2A2A6]">
                    <th className="px-4 py-2">Tên diễn viên</th>
                    <th className="px-4 py-2 flex items-end justify-end">
                      <Link to={"/movieManager/editMovie/addActor"}>
                        <IoMdAddCircle className="w-8 h-8 cursor-pointer text-blue-600 hover:text-blue-800" />
                      </Link>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-[#EEEEEE]">
                    <td className="px-4 py-2">Biệt đội sấm sét</td>

                    <td className="px-4 py-2 flex space-x-4">
                      <Link to="/movieManager/editMovie/editActor">
                        <button className="text-blue-600 hover:text-blue-800 text-[20px] cursor-pointer">
                          <MdEdit />
                        </button>
                      </Link>
                      <button
                        className="text-red-600 hover:text-red-800 text-[20px] cursor-pointer"
                        onClick={() => alert("Xóa thành công")}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditMovie;
