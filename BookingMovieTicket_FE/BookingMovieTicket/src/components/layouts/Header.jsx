import React from "react";
import { IoPersonCircle } from "react-icons/io5";
import NotAvailable from "/not-available.jpg";
function Header() {
  return (
    <>
      <div className="bg-[#f3f3f3] h-24 flex justify-center items-center mb-12">
        <div className="h-full items-center flex container justify-around mx-auto">
          <div className="h-full flex items-center justify-center w-[120px] ">
            <img
              src={NotAvailable}
              alt="Not available"
              className="w-full h-full"
            />
          </div>
          <div className="h-full flex items-center justify-center w-[500px]">
            <ul className="flex space-x-[15] w-full justify-around h-full">
              <li className="text-[24px] cursor-pointer hover:border-b-2 hover:border-black h-full items-center flex justify-center">
                Trang Chủ
              </li>
              <li className="text-[24px] cursor-pointer hover:border-b-2 hover:border-black h-full items-center flex justify-center">
                Phim
              </li>
              <li className="text-[24px] cursor-pointer hover:border-b-2 hover:border-black h-full items-center flex justify-center">
                Lịch chiếu
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-around w-[250px] cursor-pointer">
            <IoPersonCircle className="w-8 h-16" />
            <p className="text-[24px]">Nguyen Van Anh</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
