import React, { useEffect, useState } from "react";
import { IoPersonCircle } from "react-icons/io5";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import SuccessToast from '../../components/toasts/SuccessToast';
import ErrorToast from '../../components/toasts/ErrorToast';

function ChangePassword() {
  const [showCurrent, setshowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState({});

  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorToast, setErrorShowToast] = useState(false);
  const [successMessage, setSuccesMessage] = useState('');
  const [showSuccessToast, setSuccessShowToast] = useState(false);
  const [errors, setErrors] = useState({});

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const decoded = jwtDecode(token)
        setUserId(decoded.userId)
      } catch (err) {
        localStorage.removeItem("token")
        localStorage.removeItem("username")
      }
    }
  }, [])

  useEffect(() => {
    axios
      .get(`http://localhost:8080/users/${userId}`)
      .then((response) => {
        const data = response.data
        setUser(data)
        console.log(data)
      })
      .catch((error) => {
        console.error("Lỗi fetch api user", error);
      });
  }, [userId]);

  const handleChangePassword = async () => {
    const newErrors = {};

    if (newPassword !== confirmPassword) {
      setErrorMessage("Mật khẩu không khớp nhau");
      setErrorShowToast(true);
      return;
    }

    if (!newPassword.trim()) {
      setErrorMessage("Mật khẩu không được để trống");
      setErrorShowToast(true);
      return;
    }

    try {
      const res = await axios.put(`http://localhost:8080/users/change-password/${userId}`, {
        userId: userId,
        oldPassword: currentPassword,
        newPassword: newPassword,
      });
      setSuccesMessage(res.data)
      setSuccessShowToast(true)
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        newErrors.newPassword = err.response.data.newPassword

      } else {
        setErrorMessage("Mật khẩu cũ không chính xác");
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
      <div className="container mx-auto">
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
              <p>{user.lastName + " " + user.firstName}</p>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-[500px]">
            <div className="flex gap-4 items-center relative">
              <label htmlFor="" className="w-[40%] font-bold">
                Mật khẩu hiện tại
              </label>
              <input
                type={showCurrent ? "text" : "password"}
                className="border-0 bg-gray-100 text-gray-500 p-2 w-[60%]"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-2"
                onClick={() => {
                  setshowCurrent(!showCurrent);
                }}
                aria-label={showCurrent ? "Hiện mật khẩu" : "Ẩn mật khẩu"}
              >
                {showCurrent ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
            <p className="text-red-600 text-sm mt-1 min-h-[20px]">
              {""}
            </p>
            <div className="flex gap-4 items-center relative">
              <label htmlFor="" className="w-[40%] font-bold">
                Mật khẩu mới
              </label>
              <input
                type={showNew ? "text" : "password"}
                className="border-0 bg-gray-100 text-gray-500 p-2 w-[60%]"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-2"
                onClick={() => {
                  setShowNew(!showNew);
                }}
                aria-label={showNew ? "Hiện mật khẩu" : "Ẩn mật khẩu"}
              >
                {showNew ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
            <p className="text-red-600 text-sm mt-1 min-h-[20px] pl-[210px]">
              {errors.newPassword || ""}
            </p>
            <div className="flex gap-4 items-center relative">
              <label htmlFor="" className="w-[40%] font-bold">
                Nhập lại mật khẩu mới
              </label>
              <input
                type={showConfirm ? "text" : "password"}
                className="border-0 bg-gray-100 text-gray-500 p-2 w-[60%]"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-2"
                onClick={() => {
                  setShowConfirm(!showConfirm);
                }}
                aria-label={showConfirm ? "Hiện mật khẩu" : "Ẩn mật khẩu"}
              >
                {showConfirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
            <p className="text-red-600 text-sm mt-1 min-h-[20px]">
              {""}
            </p>
          </div>
          <div className="flex justify-end gap-4 items-center w-[500px]">
            <Link to="/">
              <button className="rounded-3xl px-8 py-2 border-2 border-[#031327] cursor-pointer">
                Hủy
              </button>
            </Link>
            <button
              className="bg-[#031327] rounded-2xl px-8 py-2 text-white cursor-pointer"
              onClick={handleChangePassword}
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
