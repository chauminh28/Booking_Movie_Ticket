import React from "react";
import { BsTicketDetailedFill } from "react-icons/bs";
import { Link } from "react-router-dom";
function UserHistory() {
  return (
    <div className="container mx-auto">
      <div>
        <p className="uppercase text-2xl font-bold">
          <span className="border-l-4 border-l-[#031327] mr-2"></span>Lịch sử
          giao dịch
        </p>
      </div>
      <table className="table-auto w-full text-left text-sm mt-8">
        <thead>
          <tr className="font-semibold text-[15px] text-[#A2A2A6]">
            <th className="px-4 py-2">Mã giao dịch</th>
            <th className="px-4 py-2">Tên phim</th>
            <th className="px-4 py-2">Ngày chiếu</th>
            <th className="px-4 py-2">Ngày đặt vé</th>
            <th className="px-4 py-2">Ghế</th>
            <th className="px-4 py-2">Tổng tiền</th>
            <th className="px-4 py-2">Trạng thái</th>
            <th className="px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-[#EEEEEE]">
            <td className="px-4 py-4">1</td>
            <td className="px-4 py-4">Biệt đội sấm sét</td>
            <td className="px-4 py-4">30/04/2025</td>
            <td className="px-4 py-4">27/04/2025</td>
            <td className="px-4 py-4">C5, C6</td>
            <td className="px-4 py-4">200.000đ</td>
            <td className="px-4 py-4">Thành công</td>
            <td className="px-4 py-4 flex">
              <button className=" text-[30px] cursor-pointer">
                <Link to="/profile/history/detail">
                  <BsTicketDetailedFill />
                </Link>
              </button>
            </td>
          </tr>

          <tr className="border-t border-[#EEEEEE]">
            <td className="px-4 py-4">1</td>
            <td className="px-4 py-4">Biệt đội sấm sét</td>
            <td className="px-4 py-4">30/04/2025</td>
            <td className="px-4 py-4">27/04/2025</td>
            <td className="px-4 py-4">C5, C6</td>
            <td className="px-4 py-4">200.000đ</td>
            <td className="px-4 py-4">Thành công</td>
            <td className="px-4 py-4 flex">
              <button className=" text-[30px] cursor-pointer">
                <BsTicketDetailedFill />
              </button>
            </td>
          </tr>

          <tr className="border-t border-[#EEEEEE]">
            <td className="px-4 py-4">1</td>
            <td className="px-4 py-4">Biệt đội sấm sét</td>
            <td className="px-4 py-4">30/04/2025</td>
            <td className="px-4 py-4">27/04/2025</td>
            <td className="px-4 py-4">C5, C6</td>
            <td className="px-4 py-4">200.000đ</td>
            <td className="px-4 py-4">Thành công</td>
            <td className="px-4 py-4 flex">
              <button className=" text-[30px] cursor-pointer">
                <BsTicketDetailedFill />
              </button>
            </td>
          </tr>

          <tr className="border-t border-[#EEEEEE]">
            <td className="px-4 py-4">1</td>
            <td className="px-4 py-4">Biệt đội sấm sét</td>
            <td className="px-4 py-4">30/04/2025</td>
            <td className="px-4 py-4">27/04/2025</td>
            <td className="px-4 py-4">C5, C6</td>
            <td className="px-4 py-4">200.000đ</td>
            <td className="px-4 py-4">Thành công</td>
            <td className="px-4 py-4 flex">
              <button className=" text-[30px] cursor-pointer">
                <BsTicketDetailedFill />
              </button>
            </td>
          </tr>

          <tr className="border-t border-[#EEEEEE]">
            <td className="px-4 py-4">1</td>
            <td className="px-4 py-4">Biệt đội sấm sét</td>
            <td className="px-4 py-4">30/04/2025</td>
            <td className="px-4 py-4">27/04/2025</td>
            <td className="px-4 py-4">C5, C6</td>
            <td className="px-4 py-4">200.000đ</td>
            <td className="px-4 py-4">Thành công</td>
            <td className="px-4 py-4 flex">
              <button className=" text-[30px] cursor-pointer">
                <BsTicketDetailedFill />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-center my-8">
        <nav className="inline-flex items-center space-x-1 text-sm">
          <a
            href="#"
            className="px-3 py-2 rounded-l-md bg-[#F5F5F5] border border-gray-300 hover:bg-black hover:text-white"
          >
            {" "}
            Prev{" "}
          </a>
          <a
            href="#"
            className="px-3 py-2 bg-[#F5F5F5] border border-gray-300 hover:bg-black hover:text-white rounded-md"
          >
            1
          </a>
          <a
            href="#"
            className="px-3 py-2 bg-[#F5F5F5] border border-gray-300 hover:bg-black hover:text-white rounded-md"
          >
            2
          </a>
          <a
            href="#"
            className="px-3 py-2 bg-[#F5F5F5] border border-gray-300 hover:bg-black hover:text-white rounded-md"
          >
            3
          </a>
          <a
            href="#"
            className="px-3 py-2 rounded-r-md bg-[#F5F5F5] border border-gray-300 hover:bg-black hover:text-white"
          >
            {" "}
            Next{" "}
          </a>
        </nav>
      </div>
    </div>
  );
}

export default UserHistory;
