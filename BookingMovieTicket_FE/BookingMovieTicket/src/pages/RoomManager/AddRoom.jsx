import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import NavbarAdmin from "../../components/layouts/NavbarAdmin";
import HeaderAdmin from "../../components/layouts/HeaderAdmin";
import SuccessToast from "../../components/toasts/SuccessToast";
import ErrorToast from "../../components/toasts/ErrorToast";
import axiosClient from "../../api/axiosClient";

export default function AddRoom() {
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorToast, setErrorShowToast] = useState(false);
  const [successMessage, setSuccesMessage] = useState("");
  const [showSuccessToast, setSuccessShowToast] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [form, setForm] = useState({
    createAt: new Date().toISOString().split('T')[0],
    roomName: "",
    monitor: "",
    soundSystem: "",
    projector: "",
    rows: "",
    cols: "",
    status: true,
  });

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
    if (!form.rows.trim()) {
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
      // eslint-disable-next-line no-unused-vars
      const res = await axiosClient.post("/rooms", form);
      setSuccesMessage("Tạo phòng chiếu thành công");
      setSuccessShowToast(true);

      setTimeout(() => {
        navigate("/roomManager");
      }, 1500);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        newErrors.createAt = err.response.data.createAt
        newErrors.roomName = err.response.data.roomName
        newErrors.monitor = err.response.data.monitor
        newErrors.soundSystem = err.response.data.soundSystem
        newErrors.projector = err.response.data.projector
        newErrors.rows = err.response.data.rows
        newErrors.cols = err.response.data.cols
      } else {
        setErrorMessage("Lỗi API không xác định");
        setErrorShowToast(true);
      }
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
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
            <p className="font-bold text-[28px]">THÊM PHÒNG CHIẾU</p>
            <div className="mt-[30px] pl-[30px]">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-12 gap-5 ">
                  <div className="col-span-6 gap-y-4 flex flex-col">
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
                            onAbort={handleChange}
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
                    Tạo
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
