import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { BsTicketDetailedFill } from "react-icons/bs";
import { Link } from "react-router-dom";
function UserHistory() {
  const [booking, setBooking] = useState({});
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const size = 10;
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.sub);
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
      }
    }
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8080/bookings", {
        params: {
          page: page,
          size: size,
          searchValue: userName,
        },
      })
      .then((response) => {
        setBooking(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error("Lỗi khi tải danh sách đặt vé!", error);
      });
  }, [page, userName]);
  const goToPage = (pageNumber) => {
    if (pageNumber >= 0 && pageNumber < totalPages) {
      setPage(pageNumber);
    }
  };
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
          {booking.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-4 text-gray-500">
                Không có vé nào.
              </td>
            </tr>
          ) : (
            booking.map((item) => (
              <tr className="border-t border-[#EEEEEE]" key={item.id}>
                <td className="px-4 py-4">{item.movieName}</td>
                <td className="px-4 py-4">{`${item.scheduleTime} ${item.startTime}`}</td>
                <td className="px-4 py-4">{item.bookingTime}</td>
                <td className="px-4 py-4">{item.seatNumber.join(", ")}</td>
                <td className="px-4 py-4"></td>
                <td className="px-4 py-4">Thành công</td>
                <td className="px-4 py-4 flex">
                  <button className=" text-[30px] cursor-pointer">
                    <Link to="/profile/history/detail">
                      <BsTicketDetailedFill />
                    </Link>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="flex justify-center my-8">
        <nav className="inline-flex items-center space-x-1 text-sm">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page === 0}
            className="px-3 py-2 rounded-l-md bg-[#F5F5F5] border border-gray-300 hover:bg-black hover:text-white disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={`px-3 py-2 border border-gray-300 ${
                index === page
                  ? "bg-black text-white"
                  : "bg-[#F5F5F5] hover:bg-black hover:text-white"
              } rounded-md`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages - 1}
            className="px-3 py-2 rounded-r-md bg-[#F5F5F5] border border-gray-300 hover:bg-black hover:text-white disabled:opacity-50"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
}

export default UserHistory;
