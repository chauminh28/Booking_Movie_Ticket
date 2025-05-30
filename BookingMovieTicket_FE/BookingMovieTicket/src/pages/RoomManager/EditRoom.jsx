import React, { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import NavbarAdmin from "../../components/layouts/NavbarAdmin";
import HeaderAdmin from "../../components/layouts/HeaderAdmin";
import { IoMdAddCircle } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import { LuListCollapse } from "react-icons/lu";
import SuccessToast from "../../components/toasts/SuccessToast";
import ErrorToast from "../../components/toasts/ErrorToast";
import axiosClient from "../../api/axiosClient";
import axios from "axios";

export default function EditRoom() {
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorToast, setErrorShowToast] = useState(false);
  const [successMessage, setSuccesMessage] = useState("");
  const [showSuccessToast, setSuccessShowToast] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [form, setForm] = useState({
    createAt: "",
    roomName: "",
    monitor: "",
    soundSystem: "",
    projector: "",
    rows: "",
    cols: "",
    status: true,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/rooms/${id}`)
      .then((response) => {
        const data = response.data;
        setForm({
          createAt: data.createAt || "",
          roomName: data.roomName || "",
          monitor: data.monitor || "",
          soundSystem: data.soundSystem || "",
          projector: data.projector || "",
          rows: data.rows || "",
          cols: data.cols || "",
          status: data.status || true,
        });
      })
      .catch((error) => {
        console.error("Lỗi fetch api user", error);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
    console.log(form);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!form.createAt.trim()) {
      newErrors.createAt = "Vui lòng nhập ngày tạo phòng";
    }
    if (!form.roomName.trim()) {
      newErrors.roomName = "Vui lòng nhập tên phòng";
    }
    if (!form.monitor.trim()) {
      newErrors.monitor = "Vui lòng chọn màn hình";
    }
    if (!form.soundSystem.trim()) {
      newErrors.soundSystem = "Vui lòng chọn hệ thống âm thanh";
    }
    if (!form.projector.trim()) {
      newErrors.projector = "Vui lòng chọn máy chiếu";
    }
    if (!String(form.rows).trim()) {
      newErrors.rows = "Vui lòng nhập số hàng";
    }
    if (!form.cols.trim()) {
      newErrors.cols = "Vui lòng nhập số cột";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    try {
      axiosClient.put(`/rooms/${id}`, form);
      setSuccesMessage("Sửa phòng chiếu thành công");
      setSuccessShowToast(true);

      setTimeout(() => {
        navigate("/roomManager");
      }, 1500);
    } catch (err) {
      console.log(err);
      setErrorMessage("Lỗi api");
      setErrorShowToast(true);
    }
  };

  return (
    <>
      {showSuccessToast && (
        <SuccessToast
          message={successMessage}
          onClose={() => setSuccessShowToast(false)}
        />
      )}

      {showErrorToast && (
        <ErrorToast
          message={errorMessage}
          onClose={() => setErrorShowToast(false)}
        />
      )}
      <div className="grid grid-cols-12">
        <div className="col-span-2">
          <NavbarAdmin />
        </div>

        <div className="col-span-10">
          <div className="bg-white col-span-10 h-[100vh] p-[30px]">
            <HeaderAdmin />
            <p className="font-bold text-[28px]">SỬA PHÒNG CHIẾU</p>
            <div className="mt-[30px] pl-[30px]">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-12 gap-5 ">
                  <div className="col-span-6 gap-y-4 flex flex-col">
                    <div>
                      <label
                        htmlFor="createAt"
                        className="block text-sm font-bold text-gray-700"
                      >
                        Ngày tạo phòng
                      </label>
                      <input
                        type="date"
                        id="createAt"
                        value={form.createAt}
                        onChange={handleChange}
                        placeholder="dd/MM/yyyy"
                        className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                      />
                      <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                        {errors.createAt || ""}
                      </p>
                    </div>
                    <div>
                      <label
                        htmlFor="roomName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Tên phòng chiếu <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="roomName"
                        value={form.roomName}
                        onChange={handleChange}
                        placeholder="Tên phòng chiếu"
                        className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        required
                      />
                      <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                        {errors.roomName || ""}
                      </p>
                    </div>
                    <div>
                      <label
                        htmlFor="total"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Sức chứa
                      </label>
                      <input
                        type="text"
                        id="total"
                        value={form.cols * form.rows}
                        placeholder="Sức chứa"
                        className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        readOnly
                      />
                    </div>
                    <div className=" w-[404px]">
                      <label className="block text-sm font-medium text-gray-700 mb-4">
                        Sơ đồ ghế <span className="text-red-600">*</span>
                      </label>
                      <div className="flex justify-around">
                        <div className="col-span-1">
                          <label
                            htmlFor="rows"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Số hàng <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            value={form.rows}
                            id="rows"
                            placeholder="Hàng"
                            onChange={handleChange}
                            className="bg-[#F9F9F9] mt-1 block w-[125px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                            required
                          />
                          <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                            {errors.rows || ""}
                          </p>
                        </div>
                        <div className="col-span-1">
                          <label
                            htmlFor="cols"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Số cột <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            value={form.cols}
                            id="cols"
                            onChange={handleChange}
                            placeholder="Cột"
                            className="bg-[#F9F9F9] mt-1 block w-[125px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                            required
                          />
                          <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                            {errors.cols || ""}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-6 flex flex-col gap-4">
                    <div>
                      <label
                        htmlFor="monitor"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Loại màn hình <span className="text-red-600">*</span>
                      </label>
                      <select
                        type="text"
                        id="monitor"
                        value={form.monitor}
                        onChange={handleChange}
                        className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        required
                      >
                        <option>-- Chọn màn hình --</option>
                        <option value={"2D"}>2D</option>
                        <option value={"3D"}>3D</option>
                        <option value={"IMAX"}>IMAX</option>
                      </select>
                      <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                        {errors.monitor || ""}
                      </p>
                    </div>
                    <div>
                      <label
                        htmlFor="soundSystem"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Hệ thống âm thanh
                        <span className="text-red-600">*</span>
                      </label>
                      <select
                        type="text"
                        id="soundSystem"
                        value={form.soundSystem}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        required
                      >
                        <option>-- Chọn hệ thống âm thanh --</option>
                        <option value={"Dolby Atmos"}>Dolby Atmos</option>
                        <option value={"DTS:X"}>DTS:X</option>
                        <option value={"IMAX Audio"}>IMAX Audio</option>
                      </select>
                      <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                        {errors.soundSystem || ""}
                      </p>
                    </div>
                    <div>
                      <label
                        htmlFor="projector"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Máy chiếu <span className="text-red-600">*</span>
                      </label>
                      <select
                        type="text"
                        id="projector"
                        value={form.projector}
                        onChange={handleChange}
                        className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        required
                      >
                        <option>-- Chọn máy chiếu --</option>
                        <option value={"Digital Projector"}>
                          Digital Projector
                        </option>
                        <option value={"IMAX"}>IMAX</option>
                        <option value={"3D"}>3D</option>
                      </select>
                      <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                        {errors.projector || ""}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-[56px]">
                  <Link to={"/roomManager"}>
                    <button className="bg-white px-4 py-2 text-black border-1 border-black font-bold text-[16px] w-[120px] h-[55px] rounded-[90px] cursor-pointer">
                      Huỷ
                    </button>
                  </Link>
                  <button className="bg-black px-4 py-2 text-white font-bold text-[16px] w-[120px] h-[55px] rounded-[90px] ml-6 cursor-pointer">
                    Sửa
                  </button>
                </div>
              </form>
              <div className="flex items-center justify-between mt-8 border-t-4 border-gray-400 shadow-md p-2">
                <p className="font-bold text-xl">Ghế</p>
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
                          <th className="px-4 py-2">Tên ghế</th>
                          <th className="px-4 py-2">Hàng ghế</th>
                          <th className="px-4 py-2">Loại ghế</th>
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
                                      Thêm ghế
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
                                          Tên ghế
                                        </label>
                                        <div className="flex justify-around">
                                          <div className="col-span-1">
                                            <label
                                              htmlFor="row"
                                              className="block text-sm font-medium text-gray-700"
                                            >
                                              Tên hàng
                                            </label>
                                            <input
                                              type="text"
                                              id="row"
                                              placeholder="Tên hàng"
                                              className="bg-[#F9F9F9] mt-1 block w-[125px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                              required
                                            />
                                          </div>
                                          <div className="col-span-1">
                                            <label
                                              htmlFor="column"
                                              className="block text-sm font-medium text-gray-700"
                                            >
                                              Số cột
                                            </label>
                                            <input
                                              type="text"
                                              id="column"
                                              placeholder="Số cột"
                                              className="bg-[#F9F9F9] mt-1 block w-[125px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                              required
                                            />
                                          </div>
                                        </div>
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
                          <td className="px-4 py-2">A1</td>
                          <td className="px-4 py-2">A</td>
                          <td className="px-4 py-2">Thường</td>

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
                                      Sửa ghế
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
                                          Sửa ghế
                                        </label>
                                        <div className="flex justify-around">
                                          <div className="col-span-1">
                                            <label
                                              htmlFor="row"
                                              className="block text-sm font-medium text-gray-700"
                                            >
                                              Tên hàng
                                            </label>
                                            <input
                                              type="text"
                                              id="row"
                                              placeholder="Tên hàng"
                                              className="bg-[#F9F9F9] mt-1 block w-[125px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                              required
                                            />
                                          </div>
                                          <div className="col-span-1">
                                            <label
                                              htmlFor="column"
                                              className="block text-sm font-medium text-gray-700"
                                            >
                                              Số cột
                                            </label>
                                            <input
                                              type="text"
                                              id="column"
                                              placeholder="Số cột"
                                              className="bg-[#F9F9F9] mt-1 block w-[125px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                              required
                                            />
                                          </div>
                                        </div>
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
