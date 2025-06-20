import React, { useEffect, useState } from "react";
import NavbarAdmin from "../../components/layouts/NavbarAdmin";
import HeaderAdmin from "../../components/layouts/HeaderAdmin";
import { Link, useNavigate } from "react-router-dom";
import SuccessToast from "../../components/toasts/SuccessToast";
import ErrorToast from "../../components/toasts/ErrorToast";
import axiosClient from "../../api/axiosClient";

function AddSeatType() {
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorToast, setErrorShowToast] = useState(false);
  const [successMessage, setSuccesMessage] = useState("");
  const [showSuccessToast, setSuccessShowToast] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [form, setForm] = useState({
    seatTypeName: "",
    price: "",
    description: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "price") {
      const raw = value.replace(/\D/g, "");
      setForm({
        ...form,
        price: Number(raw).toLocaleString("vi-VN"),
      });
    } else {
      setForm({
        ...form,
        [id]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!form.seatTypeName.trim()) {
      newErrors.seatTypeName = "Vui lòng nhập tên loại ghế";
    }
    if (!form.price.trim()) {
      newErrors.price = "Vui lòng nhập giá ghế";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    try {
      // eslint-disable-next-line no-unused-vars
      const priceValue = parseFloat(form.price);

      if (isNaN(priceValue)) {
        newErrors.price = "Giá phải là số hợp lệ"
        setErrors(newErrors)
        return;
      }

      const payload = {
        ...form,
        price: Number(form.price.replace(/\./g, ""))
      };

      const res = await axiosClient.post("/seatTypes", payload);
      setSuccesMessage("Tạo loại ghế thành công");
      setSuccessShowToast(true);

      setTimeout(() => {
        navigate("/seatTypeManager");
      }, 1500);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        newErrors.seatTypeName = err.response.data.seatTypeName
        newErrors.price = err.response.data.price
      } else {
        setErrorMessage("Lỗi API không xác định");
        setErrorShowToast(true);
      }
    }
    console.log(newErrors)
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
            <p className="font-bold text-[28px]">THÊM LOẠI GHẾ</p>
            <div className="mt-[30px] pl-[30px]">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-12 gap-5 ">
                  <div className="col-span-6 gap-y-4 flex flex-col">
                    <div>
                      <label
                        htmlFor="seatTypeName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Tên loại ghế <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="seatTypeName"
                        value={form.seatTypeName}
                        onChange={handleChange}
                        placeholder="Tên loại ghế"
                        className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        required
                      />

                      <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                        {errors.seatTypeName || ""}
                      </p>
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
                        value={form.price}
                        onChange={handleChange}
                        placeholder="Giá loại ghế"
                        className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        required
                      />

                      <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                        {errors.price || ""}
                      </p>
                    </div>
                    <div>
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Mô tả loại ghế
                      </label>
                      <textarea
                        type="text"
                        id="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Mô tả loại ghế"
                        className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-[56px]">
                  <Link to={"/seatTypeManager"}>
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

export default AddSeatType;
