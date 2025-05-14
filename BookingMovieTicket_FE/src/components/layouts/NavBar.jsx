import React from "react";
import { IoPersonCircle } from "react-icons/io5";
function NavBar() {
  return (
    <div className="bg-[#f3f3f3] flex h-24 w-full items-center justify-between mb-12">
      <div className="container mx-auto flex items-center justify-between w-full h-full ">
        <p className="h-full flex items-center justify-center text-[22px]">
          Cinermas
        </p>
        <div className="h-full flex justify-center items-center">
          <ul className="flex items-center justify-around w-full h-full space-x-16">
            <li className="text-[22px] hover:text-gray-800 hover:border-b-2 hover:border-black pb-1 cursor-pointer w-32 h-full items-center justify-center flex">
              Trang chủ
            </li>
            <li className="text-[22px] hover:text-gray-800 hover:border-b-2 hover:border-black pb-1 cursor-pointer w-32 h-full items-center justify-center flex">
              Lịch chiếu
            </li>
            <li className="text-[22px] hover:text-gray-800 hover:border-b-2 hover:border-black pb-1 cursor-pointer w-32 h-full items-center justify-center flex">
              Phim
            </li>
          </ul>
        </div>
        <div className="text-[22px] flex items- gap-8">
          <IoPersonCircle className="w-12 h-8" />
          <p>Nguyễn Văn A</p>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
