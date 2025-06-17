import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { IoPersonCircle } from "react-icons/io5";
import ErrorToast from "../toasts/ErrorToast";
import SuccessToast from "../toasts/SuccessToast";
import { useNavigate } from "react-router-dom";
function ProfileInfo() {
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorToast, setErrorShowToast] = useState(false);
  const [successMessage, setSuccesMessage] = useState("");
  const [showSuccessToast, setSuccessShowToast] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userName: "",
    lastName: "",
    firstName: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    password: "",
    status: true,
    roleId: "",
  });
  const [updateData, setUpdateData] = useState({ ...form });
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(decoded.userId);
        setUserId(decoded.userId);
        const fetchUser = async () => {
          try {
            const response = await axios.get(
              `http://localhost:8080/users/${decoded.userId}`
            );
            const data = response.data;
            setUpdateData(data);
            setForm({
              userName: data.userName || "",
              lastName: data.lastName || "",
              firstName: data.firstName || "",
              dob: data.dob || "",
              gender: data.gender || "",
              phone: data.phone || "",
              email: data.email || "",
              password: "",
              status: data.status,
              roleId: data.roleId || "",
            });
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };

        fetchUser();
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
      }
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({
      ...updateData,
      [name]: value,
    });
    console.log(updateData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    try {
      await axios.put(`http://localhost:8080/users/${userId}`, updateData);
      setSuccesMessage("Sửa người dùng thành công");
      setForm(updateData);
      setSuccessShowToast(true);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        newErrors.lastName = err.response.data.lastName;
        newErrors.firstName = err.response.data.firstName;
        newErrors.dob = err.response.data.dob;
        newErrors.gender = err.response.data.gender;
        newErrors.phone = err.response.data.phone;
        newErrors.email = err.response.data.email;
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
    <div className="container mx-auto">
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
      <div>
        <p className="uppercase text-2xl font-bold">
          <span className="border-l-4 border-l-[#031327] mr-2"></span>Thông tin
          tài khoản
        </p>
      </div>
      <div className="flex items-center justify-center mt-8 flex-col gap-8 mb-24">
        <div className="flex items-center gap-2">
          <IoPersonCircle className="w-12 h-12" />
          <div>
            <p>{`${form.lastName} ${form.firstName}`}</p>
            <p className="text-gray-500">{form.email}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col gap-4 w-[500px]">
            <div className="flex w-full justify-end">
              <div className="flex gap-4 items-center w-[70%]">
                <div className="flex w-1/2 items-center gap-2 flex-col">
                  <label className="w-full font-bold pl-3" htmlFor="lastName">
                    Họ và tên đệm
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    onChange={handleChange}
                    className="border-0 bg-gray-100 text-gray-500 p-2 w-full ml-5"
                    value={updateData.lastName}
                  />
                  {errors.lastName && (
                    <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                      {errors.lastName}
                    </p>
                  )}
                </div>
                <div className="flex w-1/2 items-center gap-2 flex-col">
                  <label className="w-full font-bold" htmlFor="firstName">
                    Tên
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    onChange={handleChange}
                    type="text"
                    className="border-0 bg-gray-100 text-gray-500 p-2 w-full"
                    value={updateData.firstName}
                  />
                  {errors.firstName && (
                    <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                      {errors.firstName}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <label htmlFor="email" className="w-[30%] font-bold">
                Email
              </label>
              <input
                id="email"
                name="email"
                onChange={handleChange}
                type="email"
                className="border-0 bg-gray-100 text-gray-500 p-2 w-[70%]"
                value={updateData.email}
              />
            </div>
            {errors.email && (
              <p className="text-red-600 text-sm mt-1 min-h-[20px] pl-[170px]">
                {errors.email}
              </p>
            )}
            <div className="flex gap-4 items-center">
              <label htmlFor="dob" className="w-[30%] font-bold">
                Ngày sinh
              </label>
              <input
                id="dob"
                name="dob"
                onChange={handleChange}
                type="date"
                className="border-0 bg-gray-100 text-gray-500 p-2 w-[70%]"
                value={updateData.dob}
              />
            </div>
            {errors.dob && (
              <p className="text-red-600 text-sm mt-1 min-h-[20px] pl-[170px]">
                {errors.dob}
              </p>
            )}
            <div className="flex gap-4 items-center">
              <label htmlFor="phone" className="font-bold w-[30%]">
                Số điện thoại
              </label>
              <input
                id="phone"
                name="phone"
                onChange={handleChange}
                type="text"
                className="border-0 bg-gray-100 text-gray-500 p-2 w-[70%]"
                value={updateData.phone}
              />
            </div>
            {errors.phone && (
              <p className="text-red-600 text-sm mt-1 min-h-[20px] pl-[170px]">
                {errors.phone}
              </p>
            )}

            <div className="flex gap-4 items-center">
              <label htmlFor="" className="font-bold w-[30%]">
                Giới tính
              </label>
              <div className="flex p-2 space-x-10 text-gray-500">
                <label htmlFor="">
                  <input
                    type="radio"
                    name="gender"
                    value="NAM"
                    onChange={handleChange}
                    checked={updateData.gender === "NAM"}
                    className="mr-2 text-gray-500"
                  />
                  Nam
                </label>
                <label htmlFor="">
                  <input
                    type="radio"
                    name="gender"
                    value="NU"
                    onChange={handleChange}
                    checked={updateData.gender === "NU"}
                    className="mr-2 text-gray-500"
                  />
                  Nữ
                </label>
              </div>
              {errors.gender && (
                <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                  {errors.gender}
                </p>
              )}
            </div>
          </div>
        </form>

        <div className="flex justify-end gap-4 items-center w-[500px]">
          <button
            type="button"
            onClick={() => {
              navigate("/");
            }}
            className="rounded-3xl px-8 py-2 border-2 border-[#031327] cursor-pointer"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="bg-[#031327] rounded-2xl px-8 py-2 text-white cursor-pointer"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
