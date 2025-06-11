import React, { useEffect, useState } from 'react'
import NavbarAdmin from "../../components/layouts/NavbarAdmin";
import HeaderAdmin from "../../components/layouts/HeaderAdmin";
import { IoMdAddCircle } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import { LuListCollapse } from "react-icons/lu";
import { Link, useParams } from "react-router-dom";
import SuccessToast from "../../components/toasts/SuccessToast";
import ErrorToast from "../../components/toasts/ErrorToast";
import axios from "axios";
import axiosClient from "../../api/axiosClient";

function DetailTicket() {
    const { id } = useParams();
    const [status, setStatus] = useState();
    const [booking, setBooking] = useState({});
    const [products, setProducts] = useState([]);
    const [showSuccessToast, setSuccessShowToast] = useState(false);
    const [successMessage, setSuccesMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const [showErrorToast, setErrorShowToast] = useState(false);
    const [errors, setErrors] = useState({});
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [form, setForm] = useState({
        productId: '',
        quantity: ''
    })

    useEffect(() => {
        axios
            .get(`http://localhost:8080/bookings/${id}`)
            .then((response) => {
                setBooking(response.data);
            })
            .catch((error) => {
                console.error("Lỗi fetch api booking", error);
            });
    }, [id, refreshTrigger]);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/products`)
            .then((response) => {
                const data = response.data.content
                setProducts(data);
            })
            .catch((error) => {
                console.error("Lỗi fetch api service", error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
        console.log(form);
    };

    const handleSubmitService = async (e) => {
        e.preventDefault()

        const newErrors = {};

        if (!form.productId.trim()) {
            newErrors.serviceName = "Vui lòng chọn dịch vụ muốn đặt"
        }
        if (!String(form.quantity).trim()) {
            newErrors.quantity = "Vui lòng nhập số lượng"
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});

        try {
            const res = await axiosClient.post(`/bookings/${id}`, form);
            setSuccesMessage("Thêm dịch vụ thành công");
            setSuccessShowToast(true);

            setRefreshTrigger(prev => prev + 1);
        } catch (err) {
            console.log(err)
            setErrorMessage("Lỗi API không xác định");
            setErrorShowToast(true);
        }
    }

    const handleStatus = async (e) => {
        const selectedStatus = e.target.value;
        setStatus(selectedStatus);

        try {
            const res = await axiosClient.put(`/bookings/${id}?status=${selectedStatus}`);
            setSuccesMessage("Đổi trạng thái vé thành công");
            setSuccessShowToast(true);

            setRefreshTrigger(prev => prev + 1);
        } catch (err) {
            console.log(err)
            setErrorMessage("Lỗi API không xác định");
            setErrorShowToast(true);
        }
    }

    return (
        <>
            {showSuccessToast && (
                <SuccessToast
                    message={successMessage}
                    onClose={() => setSuccessShowToast(false)}
                />
            )}

            {showErrorToast && (
                <ErrorToast
                    message={errorMessage}
                    onClose={() => setErrorShowToast(false)}
                />
            )}
            <div className="grid grid-cols-12">
                <div className="col-span-2">
                    <NavbarAdmin />
                </div>
                <div className="col-span-10">
                    <div className="bg-white col-span-10 h-[100vh] p-[30px]">
                        <HeaderAdmin />
                        <div className='flex justify-between mb-[50px]'>
                            <p className="font-bold text-[28px]">CHI TIẾT VÉ</p>
                            <div className='flex gap-4'>
                                <select
                                    type="text"
                                    value={booking.ticketStatus || 1}
                                    onChange={handleStatus}
                                    id="status"
                                    className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                    required
                                >
                                    <option value={1}>Chưa sử dụng</option>
                                    <option value={2}>Đã sử dụng</option>
                                    <option value={3}>Đã hết hạn</option>
                                </select>

                                <Link to={"/ticketManager"}>
                                    <button className="bg-white px-4 py-2 text-black border-1 border-black font-bold text-[16px] w-[120px] h-[55px] rounded-[90px] cursor-pointer hover:bg-black hover:text-white">
                                        Quay lại
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <form>
                            <div className="grid grid-cols-12 gap-5 ">
                                <div className="col-span-6 gap-y-4 flex flex-col">
                                    <div>
                                        <label
                                            htmlFor="transaction"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Mã giao dịch
                                        </label>
                                        <input
                                            type="text"
                                            value={booking?.id || ''}
                                            id="transaction"
                                            placeholder="Mã giao dịch"
                                            className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="username"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Tên người dùng
                                        </label>
                                        <input
                                            type="text"
                                            value={booking?.username || ''}
                                            id="username"
                                            placeholder="Tên người dùng"
                                            className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="phone"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Số điện thoại
                                        </label>
                                        <input
                                            type="text"
                                            value={booking?.phone || ''}
                                            id="phone"
                                            placeholder="Số điện thoại"
                                            className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="schedule"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Ngày đặt
                                        </label>
                                        <input
                                            type="text"
                                            value={booking?.bookingTime || ''}
                                            id="schedule"
                                            placeholder="Tên người dùng"
                                            className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="showdate"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Ngày chiếu
                                        </label>
                                        <input
                                            type="text"
                                            value={booking?.scheduleTime || ''}
                                            id="showdate"
                                            placeholder="Ngày chiếu"
                                            className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="col-span-6 gap-y-4 flex flex-col">
                                    <div>
                                        <label
                                            htmlFor="movie"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Tên phim
                                        </label>
                                        <input
                                            type="text"
                                            value={booking?.movieName || ''}
                                            id="movie"
                                            placeholder="Tên phim"
                                            className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="showtime"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Giờ chiếu
                                        </label>
                                        <input
                                            type="text"
                                            value={booking?.startTime || ''}
                                            id="showtime"
                                            placeholder="Giờ chiếu"
                                            className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="seat"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Ghế
                                        </label>
                                        <input
                                            type="text"
                                            value={booking?.seatNumbers || ''}
                                            id="seat"
                                            placeholder="Tên ghế"
                                            className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="room"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Phòng chiếu
                                        </label>
                                        <input
                                            type="text"
                                            value={booking?.roomName || ''}
                                            id="room"
                                            placeholder="Phòng chiếu"
                                            className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className="flex items-center justify-between mt-8 border-t-4 border-gray-400 shadow-md p-2">
                            <p className="font-bold text-xl">Dịch vụ</p>
                            <button
                                data-collapse-toggle="collapseDirector"
                                type="button"
                                className="font-medium items-start cursor-pointer flex"
                            >
                                <LuListCollapse />
                            </button>
                        </div>
                        <div id="collapseDirector" className="hidden">
                            <div className="font-medium  dark:text-gray-200">
                                <div className="flex items-center w-full">
                                    <table className="table-auto w-full text-left text-sm">
                                        <thead>
                                            <tr className="font-semibold text-[15px] text-[#A2A2A6]">
                                                <th className="px-4 py-2">Tên dịch vụ</th>
                                                <th className="">Số lượng</th>
                                                <th className="">Giá</th>
                                                <th className="px-4 py-2 flex items-end justify-end">
                                                    <button
                                                        data-modal-target="crud-modal"
                                                        data-modal-toggle="crud-modal"
                                                    >
                                                        <IoMdAddCircle className="w-8 h-8 cursor-pointer text-blue-600 hover:text-blue-800" />
                                                    </button>
                                                    <div
                                                        id="crud-modal"
                                                        tabIndex="-1"
                                                        aria-hidden="true"
                                                        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                                                    >
                                                        <div className="relative p-4 w-full max-w-md max-h-full">
                                                            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                                                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                                        Thêm dịch vụ
                                                                    </h3>
                                                                    <button
                                                                        type="button"
                                                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                                                        data-modal-toggle="crud-modal"
                                                                    >
                                                                        <svg
                                                                            className="w-3 h-3"
                                                                            aria-hidden="true"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            fill="none"
                                                                            viewBox="0 0 14 14"
                                                                        >
                                                                            <path
                                                                                stroke="currentColor"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth="2"
                                                                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                                                            />
                                                                        </svg>
                                                                        <span className="sr-only">Close modal</span>
                                                                    </button>
                                                                </div>
                                                                <form className="p-4 md:p-5" onSubmit={handleSubmitService}>
                                                                    <div className="grid gap-4 mb-4 grid-cols-2">
                                                                        <div className="col-span-2">
                                                                            <label
                                                                                htmlFor="productId"
                                                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                                            >
                                                                                Tên dịch vụ
                                                                            </label>
                                                                            <select
                                                                                id="productId"
                                                                                name='productId'
                                                                                value={form.serviceName}
                                                                                onChange={handleChange}
                                                                                className="bg-[#F9F9F9] mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                                                                required
                                                                            >
                                                                                <option value="">-- Chọn dịch vụ --</option>
                                                                                {products.length > 0 ? (
                                                                                    products.map((p) => (
                                                                                        <option className='text-black' key={p.id} value={p.id}>{p.serviceName}</option>
                                                                                    ))
                                                                                ) : (
                                                                                    <option disabled>Chưa có dịch vụ nào!</option>
                                                                                )}
                                                                            </select>
                                                                            <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                                                                                {errors.actorName || ""}
                                                                            </p>
                                                                        </div>
                                                                        <div className="col-span-2">
                                                                            <label
                                                                                htmlFor="quantity"
                                                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                                            >
                                                                                Số lượng <span className="text-red-600">*</span>
                                                                            </label>
                                                                            <input type='text' id='quantity'
                                                                                name='quantity'
                                                                                value={form.quantity}
                                                                                onChange={handleChange}
                                                                                className="bg-[#F9F9F9] mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                                                            />
                                                                            <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                                                                                {errors.actorName || ""}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <button
                                                                        type="submit"
                                                                        className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                                    >
                                                                        <svg
                                                                            className="me-1 -ms-1 w-5 h-5"
                                                                            fill="currentColor"
                                                                            viewBox="0 0 20 20"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                        >
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                                                                clipRule="evenodd"
                                                                            ></path>
                                                                        </svg>
                                                                        Thêm
                                                                    </button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {booking && booking.bookingServices?.length > 0 ? (
                                                booking.bookingServices.map((b, index) => (
                                                    <tr className="border-t border-[#EEEEEE]" key={index}>
                                                        <td className="px-4 py-2">{b.serviceName}</td>
                                                        <td className="px-4 py-2">{b.price}</td>
                                                        <td className="px-4 py-2">{b.price * b.quantity}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr key={null}>
                                                    <td
                                                        colSpan="7"
                                                        className="text-center py-4 text-gray-500"
                                                    >
                                                        Không có vé nào.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailTicket