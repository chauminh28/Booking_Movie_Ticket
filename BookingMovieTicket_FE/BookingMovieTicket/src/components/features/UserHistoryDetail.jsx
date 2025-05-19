import React from "react";
import { Link } from "react-router-dom";

function UserHistoryDetail() {
  return (
    <div className="container mx-auto ">
      <div className="mb-8">
        <p className="uppercase text-2xl font-bold">
          <span className="border-l-4 border-l-[#031327] mr-2"></span>chi tiết
          hóa đơn
        </p>
      </div>
      <div className="w-[70%] mx-auto border-1 border-black rounded-2xl mb-12 flex items-center gap-[25%]">
        <div className="py-8">
          <p className="uppercase px-8 py-4 font-bold text-2xl">
            nội dung thanh toán
          </p>
          <div className="px-12 flex flex-col gap-6 text-lg">
            <p>
              <span className="font-bold">Phim: </span> Biệt đội sấm sét
            </p>
            <p>
              <span className="font-bold">Ngày giờ chiếu: </span> 30/04/2025
            </p>
            <p>
              <span className="font-bold">Ngày đặt vé: </span> 27/04/2025
            </p>
            <p>
              <span className="font-bold">Phòng: </span> 01
            </p>
            <p>
              <span className="font-bold">Ghế: </span> C5, C6
            </p>
            <p>
              <span className="font-bold">Thanh toán qua: </span> VNPAY
            </p>
            <p>
              <span className="font-bold">Trạng thái: </span> Thành công
            </p>
            <p>
              <span className="font-bold">Số vé: </span> 2
            </p>
            <p>
              <span className="font-bold">Tổng tiền: </span> 200.000 VND
            </p>
          </div>
        </div>
        <div className="w-[400px] h-[400px] flex items-center justify-center">
          <div className="w-full h-full bg-gray-500 text-white flex items-center justify-center">
            QR CODE
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end w-[70%] mx-auto mb-12">
        <button className="px-8 py-2 border-2 border-black rounded-3xl cursor-pointer">
          <Link to="/profile/history">Quay lại</Link>
        </button>
      </div>
    </div>
  );
}

export default UserHistoryDetail;
