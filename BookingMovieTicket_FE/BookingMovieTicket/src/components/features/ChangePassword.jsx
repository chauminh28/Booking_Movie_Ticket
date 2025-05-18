import React, { useState } from "react";
import { IoPersonCircle } from "react-icons/io5";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
function ChangePassword() {
  const [showCurrent, setshowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  return (
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
            <p>Nguyen Van Anh</p>
            <p className="text-gray-500">nvanh@gmail.com</p>
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
            />
            <button
              type="button"
              className="absolute right-2"
              onClick={() => {
                setshowCurrent(!showCurrent);
              }}
              aria-label={showCurrent ? "Hiện mật khẩu" : "Ẩn mật khẩu"}
            >
              {showCurrent ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </button>
          </div>
          <div className="flex gap-4 items-center relative">
            <label htmlFor="" className="w-[40%] font-bold">
              Mật khẩu mới
            </label>
            <input
              type={showNew ? "text" : "password"}
              className="border-0 bg-gray-100 text-gray-500 p-2 w-[60%]"
            />
            <button
              type="button"
              className="absolute right-2"
              onClick={() => {
                setShowNew(!showNew);
              }}
              aria-label={showNew ? "Hiện mật khẩu" : "Ẩn mật khẩu"}
            >
              {showNew ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </button>
          </div>
          <div className="flex gap-4 items-center relative">
            <label htmlFor="" className="w-[40%] font-bold">
              Nhập lại mật khẩu mới
            </label>
            <input
              type={showConfirm ? "text" : "password"}
              className="border-0 bg-gray-100 text-gray-500 p-2 w-[60%]"
            />
            <button
              type="button"
              className="absolute right-2"
              onClick={() => {
                setShowConfirm(!showConfirm);
              }}
              aria-label={showConfirm ? "Hiện mật khẩu" : "Ẩn mật khẩu"}
            >
              {showConfirm ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </button>
          </div>
        </div>
        <div className="flex justify-end gap-4 items-center w-[500px]">
          <button className="rounded-3xl px-8 py-2 border-2 border-[#031327] cursor-pointer">
            Hủy
          </button>
          <button className="bg-[#031327] rounded-2xl px-8 py-2 text-white cursor-pointer">
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
