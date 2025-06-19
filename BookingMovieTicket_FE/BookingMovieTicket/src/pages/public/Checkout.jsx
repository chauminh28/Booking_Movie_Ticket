import React, { useEffect, useState } from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import { Link, useLocation } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import AddMovie from "../MovieManager/AddMovie";

function Checkout() {
  const [userId, setUserId] = useState(null);
  const [isLoadingPaymentUrl, setIsLoadingPaymentUrl] = useState(false);
  const { state } = useLocation();
  const {
    selectedSeats,
    selectedSeatIds,
    serviceQuantities,
    totalPrice,
    scheduleId,
    showTimeId,
    roomId,
  } = state;

  useEffect(() => {
    console.log(showTimeId);
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.userId);
      } catch (err) {}
    }
  }, []);

  const bookingServices = Object.entries(serviceQuantities)
    .filter(([_, quantity]) => quantity > 0)
    .map(([serviceId, quantity]) => ({
      serviceId: parseInt(serviceId),
      quantity: quantity,
    }));

  const form = {
    userId: userId,
    scheduleId: scheduleId,
    showTimeId: showTimeId.id,
    roomId: roomId,
    seatIds: selectedSeatIds,
    bookingServices: bookingServices,
    paymentStatus: 0,
    ticketStatus: 1,
  };
  const [paymentMethod, setPaymentMethod] = useState("momo");
  const [products, setProducts] = useState([]);
  const [schedule, setSchedule] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8080/products`)
      .then((response) => {
        const data = response.data.content;
        setProducts(data);
      })
      .catch((error) => {
        console.error("Lỗi fetch api service", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/schedules/${scheduleId}`)
      .then((response) => {
        const data = response.data;
        setSchedule(data);
      })
      .catch((error) => {
        console.error("Lỗi fetch api schedules", error);
      });
  }, []);

  const handlePayment = async (e) => {
    e.preventDefault();
    let bookingId;
    setIsLoadingPaymentUrl(true);
    try {
      console.log("Booking response:", form);
      const res = await axios.get("http://localhost:8080/create-payment", {
        params: {
          amount: totalPrice,
        },
      });
      if (res !== null) {
        window.location.href = res.data;
      }
    } catch (error) {
      console.error("Lỗi khi tạo booking:", error);
      alert("Đặt vé thất bại. Vui lòng thử lại.");
    } finally {
      setIsLoadingPaymentUrl(false);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6 mb-10">
        <h2 className="text-2xl font-bold mb-4">Xác nhận thanh toán</h2>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            Suất chiếu: {schedule.scheduleDate} lúc {showTimeId.time}
          </h3>
        </div>

        {/* Thông tin ghế */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Ghế đã chọn:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedSeats.map((seat, index) => (
              <span key={index} className="bg-gray-200 px-3 py-1 rounded-md">
                {seat}
              </span>
            ))}
          </div>
        </div>

        {/* Dịch vụ đã chọn */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Dịch vụ đã chọn:</h3>
          {Object.keys(serviceQuantities).length === 0 ? (
            <p>Không có dịch vụ nào được chọn.</p>
          ) : (
            <ul className="list-disc list-inside">
              {Object.entries(serviceQuantities).map(
                ([productId, quantity]) => {
                  const product = products.find(
                    (p) => p.id === parseInt(productId)
                  );
                  if (!product) return null;

                  return (
                    <li key={productId}>
                      {product.serviceName} - {quantity} cái (
                      {(product.price * quantity).toLocaleString()} VND)
                    </li>
                  );
                }
              )}
            </ul>
          )}
        </div>

        {/* Tổng tiền */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Tổng tiền:</h3>
          <p className="text-xl font-bold text-green-600">
            {totalPrice.toLocaleString()} VND
          </p>
        </div>

        {/* Chọn phương thức thanh toán */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">
            Phương thức thanh toán:
          </h3>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="momo"
                checked={paymentMethod === "momo"}
                onChange={() => setPaymentMethod("momo")}
              />
              MoMo
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="vnpay"
                checked={paymentMethod === "vnpay"}
                onChange={() => setPaymentMethod("vnpay")}
              />
              VNPay
            </label>
          </div>
        </div>

        {/* Nút xác nhận */}
        <div className="text-right">
          <button
            onClick={handlePayment}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-2 rounded-md cursor-pointer"
            disabled={isLoadingPaymentUrl}
          >
            XÁC NHẬN THANH TOÁN
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Checkout;
