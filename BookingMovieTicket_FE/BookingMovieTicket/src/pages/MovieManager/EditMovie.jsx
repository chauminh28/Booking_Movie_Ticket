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
                Lưu
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
                      <button
                        data-modal-target="crud-modal"
                        data-modal-toggle="crud-modal"
                      >
                        <IoMdAddCircle className="w-8 h-8 cursor-pointer text-blue-600 hover:text-blue-800" />
                      </button>
                      <div
                        id="crud-modal"
                        tabindex="-1"
                        aria-hidden="true"
                        class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                      >
                        <div class="relative p-4 w-full max-w-md max-h-full">
                          <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                                Thêm đạo diễn
                              </h3>
                              <button
                                type="button"
                                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-toggle="crud-modal"
                              >
                                <svg
                                  class="w-3 h-3"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 14 14"
                                >
                                  <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                  />
                                </svg>
                                <span class="sr-only">Close modal</span>
                              </button>
                            </div>
                            <form class="p-4 md:p-5">
                              <div class="grid gap-4 mb-4 grid-cols-2">
                                <div class="col-span-2">
                                  <label
                                    for="director_name"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                  >
                                    Tên đạo diễn
                                  </label>
                                  <select
                                    type="text"
                                    id="director_name"
                                    className="bg-[#F9F9F9] mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                    required
                                  >
                                    <option>-- Chọn đạo diễn --</option>
                                    <option>Trấn Thành</option>
                                    <option>Trấn Thành 1</option>
                                    <option>Trấn Thành 2</option>
                                  </select>
                                </div>
                              </div>
                              <button
                                type="submit"
                                class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              >
                                <svg
                                  class="me-1 -ms-1 w-5 h-5"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                    clip-rule="evenodd"
                                  ></path>
                                </svg>
                                Thêm
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-[#EEEEEE]">
                    <td className="px-4 py-2">Biệt đội sấm sét</td>

                    <td className="px-4 py-2 flex space-x-4">
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
                      <button
                        data-modal-target="crud-modal"
                        data-modal-toggle="crud-modal"
                      >
                        <IoMdAddCircle className="w-8 h-8 cursor-pointer text-blue-600 hover:text-blue-800" />
                      </button>
                      <div
                        id="crud-modal"
                        tabindex="-1"
                        aria-hidden="true"
                        class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                      >
                        <div class="relative p-4 w-full max-w-md max-h-full">
                          <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                                Thêm diễn viên
                              </h3>
                              <button
                                type="button"
                                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-toggle="crud-modal"
                              >
                                <svg
                                  class="w-3 h-3"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 14 14"
                                >
                                  <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                  />
                                </svg>
                                <span class="sr-only">Close modal</span>
                              </button>
                            </div>
                            <form class="p-4 md:p-5">
                              <div class="grid gap-4 mb-4 grid-cols-2">
                                <div class="col-span-2">
                                  <label
                                    for="actor_name"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                  >
                                    Tên diễn viên
                                  </label>
                                  <select
                                    type="text"
                                    id="actor_name"
                                    className="bg-[#F9F9F9] mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                    required
                                  >
                                    <option>-- Chọn diễn viên --</option>
                                    <option>Trấn Thành</option>
                                    <option>Trấn Thành 1</option>
                                    <option>Trấn Thành 2</option>
                                  </select>
                                </div>
                              </div>
                              <button
                                type="submit"
                                class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              >
                                <svg
                                  class="me-1 -ms-1 w-5 h-5"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                    clip-rule="evenodd"
                                  ></path>
                                </svg>
                                Thêm
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-[#EEEEEE]">
                    <td className="px-4 py-2">Biệt đội sấm sét</td>

                    <td className="px-4 py-2 flex space-x-4">
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
