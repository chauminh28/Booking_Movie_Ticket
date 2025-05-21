import React from "react";
import { IoPersonCircle } from "react-icons/io5";
function ProfileInfo() {
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
          <div className="flex gap-4 items-center">
            <label htmlFor="" className="w-[30%] font-bold">
              Họ và tên
            </label>
            <input
              type="text"
              className="border-0 bg-gray-100 text-gray-500 p-2 w-[70%]"
              value="Nguyen Van Anh"
            />
          </div>
          <div className="flex gap-4 items-center">
            <label htmlFor="" className="w-[30%] font-bold">
              Email
            </label>
            <input
              type="text"
              className="border-0 bg-gray-100 text-gray-500 p-2 w-[70%]"
              value="nvanh@gmail.com"
            />
          </div>
          <div className="flex gap-4 items-center">
            <label htmlFor="" className="w-[30%] font-bold">
              Ngày sinh
            </label>
            <input
              type="text"
              className="border-0 bg-gray-100 text-gray-500 p-2 w-[70%]"
              value="28/05/2003"
            />
          </div>
          <div className="flex gap-4 items-center h-24">
            <label htmlFor="" className="w-[30%] font-bold h-full">
              Địa chỉ
            </label>
            <textarea
              type="text"
              className="border-0 bg-gray-100 text-gray-500 p-2 h-full w-[70%]"
              placeholder="Nguyen Van Anh"
              value="Nam Ky Khoi Nghia,Phuong Hoa Hai, Quan Ngu Hanh Son, Da Nang"
              onChange={() => { }}
            />
          </div>
          <div className="flex gap-4 items-center">
            <label htmlFor="" className="font-bold w-[30%]">
              Số điện thoại
            </label>
            <input
              type="text"
              className="border-0 bg-gray-100 text-gray-500 p-2 w-[70%]"
              value="0123456789"
            />
          </div>
          <div className="flex gap-4 items-center">
            <label htmlFor="" className="font-bold w-[30%]">
              Giới tính
            </label>
            <div className="flex p-2 space-x-10 text-gray-500">
              <label htmlFor="">
                <input
                  type="radio"
                  name="gender"
                  value="Nam"
                  className="mr-2 text-gray-500"
                />
                Nam
              </label>
              <label htmlFor="">
                <input
                  type="radio"
                  name="gender"
                  value="Nữ"
                  className="mr-2 text-gray-500"
                />
                Nữ
              </label>
            </div>
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

export default ProfileInfo;
