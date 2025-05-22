import React, { useEffect, useRef } from "react";

import { Link } from "react-router-dom";
import NavbarAdmin from "../../components/layouts/NavbarAdmin";
import HeaderAdmin from "../../components/layouts/HeaderAdmin";
import TomSelect from "tom-select";
import { DateRange } from "react-date-range";
import { LuListCollapse } from "react-icons/lu";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

export default function EditSchedule() {
  const selectRef1 = useRef(null);
  const selectRef2 = useRef(null);
  const selectRef3 = useRef(null);
  useEffect(() => {
    const initTomSelect = (select, placeholder, maxItems) => {
      if (!select) return null;

      if (select.tomselect) {
        return select.tomselect;
      }

      return new TomSelect(select, {
        maxItems,
        plugins: ["remove_button"],
        placeholder,
      });
    };

    const ts1 = initTomSelect(selectRef1.current, "Chọn phim", 1);
    const ts2 = initTomSelect(selectRef2.current, "Chọn phòng chiếu");
    const ts3 = initTomSelect(selectRef3.current, "Chọn suất chiếu");

    const container1 = ts1.wrapper;
    const container2 = ts2.wrapper;
    const container3 = ts3.wrapper;
    container1.classList.add("w-[404px]", "transition", "h-[50px]");
    container2.classList.add("w-[404px]", "transition", "h-[50px]");
    container3.classList.add("w-full", "transition", "h-[50px]");
    const control1 = container1.querySelector(".ts-control");
    const control2 = container2.querySelector(".ts-control");
    const control3 = container3.querySelector(".ts-control");
    control1.classList.add("h-full");
    control2.classList.add("h-full");
    control3.classList.add("h-full");
    return () => {
      ts1.destroy();
      ts2.destroy();
      ts3.destroy();
    };
  }, []);
  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-2">
          <NavbarAdmin />
        </div>

        <div className="col-span-10">
          <div className="bg-white col-span-10 h-[100vh] p-[30px]">
            <HeaderAdmin />
            <p className="font-bold text-[28px]">THÊM LỊCH CHIẾU</p>
            <div className="mt-[30px] pl-[30px]">
              <form>
                <div className="grid grid-cols-12 gap-5 ">
                  <div className="col-span-6 gap-y-4 flex flex-col">
                    <div>
                      <label
                        htmlFor="movie_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Tên phim:
                      </label>
                      <select
                        ref={selectRef1}
                        multiple
                        type="text"
                        id="movie_name"
                        className=""
                        required
                      >
                        <option>Biệt đội sấm sét</option>
                        <option>Doraemon</option>
                        <option>Lật mặt 8</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="room"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phòng chiếu
                      </label>
                      <select
                        ref={selectRef2}
                        multiple
                        type="text"
                        id="room"
                        className=""
                        required
                      >
                        <option>Phòng 1</option>
                        <option>Phòng 2</option>
                        <option>Phòng 3</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-span-6">
                    <div>
                      <label
                        htmlFor="room"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Lịch chiếu
                      </label>
                      <input
                        type="date"
                        id="date"
                        placeholder="dd/MM/yyyy"
                        value={new Date().toISOString().split("T")[0]}
                        className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-[56px]">
                  <Link to={"/scheduleManager"}>
                    <button className="bg-white px-4 py-2 text-black border-1 border-black font-bold text-[16px] w-[120px] h-[55px] rounded-[90px] cursor-pointer">
                      Huỷ
                    </button>
                  </Link>
                  <button className="bg-black px-4 py-2 text-white font-bold text-[16px] w-[120px] h-[55px] rounded-[90px] ml-6 cursor-pointer">
                    Lưu
                  </button>
                </div>
              </form>
              <div className="flex items-center justify-between mt-8 border-t-4 border-gray-400 shadow-md p-2">
                <p className="font-bold text-xl">Suất chiếu</p>
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
                          <th className="px-4 py-2">Giờ chiếu</th>
                          <th className="px-4 py-2 flex items-end justify-end">
                            <button
                              data-modal-target="crud-modal"
                              data-modal-toggle="crud-modal"
                            >
                              <IoMdAddCircle className="w-8 h-8 cursor-pointer text-blue-600 hover:text-blue-800" />
                            </button>
                            <div
                              id="crud-modal"
                              tabIndex="-1"
                              aria-hidden="true"
                              className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                            >
                              <div className="relative p-4 w-full max-w-md max-h-full">
                                <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                      Thêm giờ chiếu
                                    </h3>
                                    <button
                                      type="button"
                                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                      data-modal-toggle="crud-modal"
                                    >
                                      <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                      >
                                        <path
                                          stroke="currentColor"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                      </svg>
                                      <span className="sr-only">
                                        Close modal
                                      </span>
                                    </button>
                                  </div>
                                  <form className="p-4 md:p-5">
                                    <div className="grid gap-4 mb-4 grid-cols-2">
                                      <div className="col-span-2">
                                        <label
                                          htmlFor="actor_name"
                                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                          Giờ chiếu
                                        </label>
                                        <select
                                          ref={selectRef3}
                                          multiple
                                          type="text"
                                          id="showtime"
                                          className=""
                                          required
                                        >
                                          <option>07:00</option>
                                          <option>08:00</option>
                                          <option>09:00</option>
                                        </select>
                                      </div>
                                    </div>
                                    <button
                                      type="submit"
                                      className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                      <svg
                                        className="me-1 -ms-1 w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                          clipRule="evenodd"
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
                          <td className="px-4 py-2">07:00</td>

                          <td className="px-4 py-2 flex space-x-4">
                            <button
                              className="text-blue-600 hover:text-blue-800 text-[20px] cursor-pointer"
                              data-modal-target="crud-modal-edit"
                              data-modal-toggle="crud-modal-edit"
                            >
                              <MdEdit />
                            </button>
                            <div
                              id="crud-modal-edit"
                              tabIndex="-1"
                              aria-hidden="true"
                              className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                            >
                              <div className="relative p-4 w-full max-w-md max-h-full">
                                <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                      Sửa giờ chiếu
                                    </h3>
                                    <button
                                      type="button"
                                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                      data-modal-toggle="crud-modal-edit"
                                    >
                                      <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                      >
                                        <path
                                          stroke="currentColor"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                      </svg>
                                      <span className="sr-only">
                                        Close modal
                                      </span>
                                    </button>
                                  </div>
                                  <form className="p-4 md:p-5">
                                    <div className="grid gap-4 mb-4 grid-cols-2">
                                      <div className="col-span-2">
                                        <label
                                          htmlFor="actor_name"
                                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                          Giờ chiếu
                                        </label>
                                        <select
                                          type="text"
                                          id="showtime"
                                          className="bg-[#F9F9F9] mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                          required
                                        >
                                          <option>07:00</option>
                                          <option>08:00</option>
                                          <option>09:00</option>
                                        </select>
                                      </div>
                                    </div>
                                    <button
                                      type="submit"
                                      className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                      <svg
                                        className="me-1 -ms-1 w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                          clipRule="evenodd"
                                        ></path>
                                      </svg>
                                      Lưu
                                    </button>
                                  </form>
                                </div>
                              </div>
                            </div>
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
        </div>
      </div>
    </>
  );
}
