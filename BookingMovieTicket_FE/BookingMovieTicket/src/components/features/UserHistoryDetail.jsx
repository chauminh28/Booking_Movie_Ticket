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
      <div className="w-[60%] mx-auto border-1 border-black rounded-2xl mb-12 flex items-center gap-[25%]">
        <div className="py-8 w-full">
          <p className="uppercase px-4 pb-5 font-bold text-2xl">
            thông tin hóa đơn
          </p>
          <div className="flex flex-col gap-6 text-lg justify-center">
            <p className="px-6">
              <span className="font-bold">Phim: </span> Biệt đội sấm sét
            </p>
            <div className="w-[90%] border-b-2 border-gray-300 ml-6"></div>
            <div className="flex space-x-69 px-6">
              <div className="flex flex-col gap-3">
                <p>
                  <span className="font-bold">Ngày giờ chiếu: </span> 30/04/2025
                </p>
                <p>
                  <span className="font-bold">Ngày đặt vé: </span> 27/04/2025
                </p>
                <p>
                  <span className="font-bold">Phòng: </span> 01
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <p>
                  <span className="font-bold">Ghế: </span> C5, C6
                </p>
                <p>
                  <span className="font-bold">Thanh toán qua: </span> VNPAY
                </p>

                <p>
                  <span className="font-bold">Số vé: </span> 2
                </p>
              </div>
            </div>
            <div className="w-[90%] border-b-2 border-gray-300 ml-6"></div>

            <div className="flex space-x-102 gap-3 px-6">
              <p>
                <span className="font-bold">Trạng thái: </span> Thành công
              </p>
              <p>
                <span className="font-bold">Tổng tiền: </span> 200.000 VND
              </p>
            </div>
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
