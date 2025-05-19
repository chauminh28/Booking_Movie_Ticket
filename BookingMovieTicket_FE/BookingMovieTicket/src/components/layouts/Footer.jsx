import React from "react";
import { FaFacebook } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import DownloadCHPLAY from "../../assets/public/images/download_chplay.png";
import DownloadAPPSTORE from "../../assets/public/images/download_ios.svg";
import Logo from "/logo.png";

function Footer() {
  return (
    <div className="bg-primary h-[307px] py-[54px]">
      <div className="flex h-full space-x-[150px] container mx-auto">
        <div className="items-center flex justify-center h-full w-[200px]">
          <img
            src={Logo}
            alt="Logo"
            className="h-full w-full object-cover cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-12">
          <h3 className="font-bold text-2xl uppercase">Trimi Cinema</h3>
          <ul className="flex flex-col gap-4 cursor-pointer text-lg">
            <li className="hover:text-gray-500">Điều khoản bảo mật</li>
            <li className="hover:text-gray-500">Điều khoản chung</li>
            <li className="hover:text-gray-500">Điều khoản giao dịch</li>
            <li className="hover:text-gray-500">Chính sách thanh toán</li>
          </ul>
        </div>
        <div className="flex flex-col gap-12">
          <h3 className="font-bold text-2xl">GIỚI THIỆU</h3>
          <ul className="flex flex-col gap-4 cursor-pointer text-lg">
            <li className="hover:text-gray-500">Về chúng tôi</li>
            <li className="hover:text-gray-500">Tuyển dụng</li>
          </ul>
        </div>
        <div className="flex flex-col gap-12">
          <h3 className="font-bold text-2xl">HỖ TRỢ</h3>
          <ul className="flex flex-col gap-4 cursor-pointer text-lg">
            <li className="hover:text-gray-500">Liên hệ góp ý</li>
            <li className="hover:text-gray-500">Hỗ trợ khách hàng</li>
            <li className="hover:text-gray-500">Hợp tác quảng cáo</li>
          </ul>
        </div>
        <div className="flex flex-col gap-12">
          <h3 className="font-bold text-2xl">LIÊN HỆ</h3>
          <div className="flex gap-4 cursor-pointer text-lg">
            <FaFacebook className="w-8 h-8" color="blue" />
            <AiFillTikTok className="w-8 h-8" />
          </div>
          <div>
            <h3>TẢI ỨNG DỤNG</h3>
            <div className="flex h-[50px] w-[250px] items-center">
              <img
                src={DownloadCHPLAY}
                alt="Download CHPLAY"
                className="h-full w-[120px] object-contain cursor-pointer"
              />
              <img
                src={DownloadAPPSTORE}
                alt="Download Appstore"
                className="h-full w-[120px] object-cover cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
