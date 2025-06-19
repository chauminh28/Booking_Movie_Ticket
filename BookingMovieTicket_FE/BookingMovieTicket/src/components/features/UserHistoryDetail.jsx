import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

function UserHistoryDetail() {
  const [booking, setBooking] = useState(null);
  const { id } = useParams();
  const [vnpayParams] = useSearchParams();
  useEffect(() => {
    if (vnpayParams.get("vnp_ResponseCode") === "00") {
      axios
        .put(`http://localhost:8080/bookings/payment/${id}`, null, {
          params: {
            status: 1,
          },
        })
        .then((response) => {
          setBooking(response.data);
        })
        .catch((error) => {
          console.error("Lỗi cập nhật trạng thái thanh toán", error);
        });
    }
  }, [id, vnpayParams]);
  console.log("VNPAY Params:", vnpayParams);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/bookings/${id}`)
      .then((response) => {
        setBooking(response.data);
      })
      .catch((error) => {
        console.error("Lỗi fetch api booking", error);
      });
  }, [id]);
  const paymentStatusName = {
    0: "Chưa thanh toán",
    1: "Đã thanh toán",
  };
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
              <span className="font-bold">Phim: </span> {booking?.movieName}
            </p>
            <div className="w-[90%] border-b-2 border-gray-300 ml-6"></div>
            <div className="flex space-x-69 px-6">
              <div className="flex flex-col gap-3">
                <p>
                  <span className="font-bold">Ngày giờ chiếu: </span>
                  {booking?.scheduleTime} {booking?.startTime}
                </p>
                <p>
                  <span className="font-bold">Ngày đặt vé: </span>{" "}
                  {new Date(booking?.bookingTime).toLocaleString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                  })}
                </p>
                <p>
                  <span className="font-bold">Phòng: </span> {booking?.roomName}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <p>
                  <span className="font-bold">Ghế: </span>{" "}
                  {booking?.seatNumbers.join(", ")}
                </p>
                <p>
                  <span className="font-bold">Thanh toán qua: </span> VNPAY
                </p>

                <p>
                  <span className="font-bold">Số vé: </span>{" "}
                  {booking?.seatNumbers.length}
                </p>
              </div>
            </div>
            <div className="w-[90%] border-b-2 border-gray-300 ml-6"></div>

            <div className="flex space-x-90 gap-3 px-6">
              <p>
                <span className="font-bold">Trạng thái: </span>{" "}
                {paymentStatusName[booking?.paymentStatus]}
              </p>
              <p>
                <span className="font-bold">Tổng tiền: </span>{" "}
                {booking?.totalMoney.toLocaleString()} VND
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
