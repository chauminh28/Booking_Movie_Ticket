import React, { useEffect, useState } from 'react'
import HeaderAdmin from "../../components/layouts/HeaderAdmin";
import NavbarAdmin from "../../components/layouts/NavbarAdmin";
import { Link, useNavigate, useParams } from "react-router-dom";
import SuccessToast from '../../components/toasts/SuccessToast';
import ErrorToast from '../../components/toasts/ErrorToast';
import axiosClient from '../../api/axiosClient'
import axios from "axios";

function EditSeatType() {
    const { id } = useParams();
    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorToast, setErrorShowToast] = useState(false);
    const [successMessage, setSuccesMessage] = useState('');
    const [showSuccessToast, setSuccessShowToast] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const [form, setForm] = useState({
        seatTypeName: '',
        price: '',
        description: ''
    });

    useEffect(() => {
        axios
            .get(`http://localhost:8080/seatTypes/${id}`)
            .then((response) => {
                const data = response.data
                setForm({
                    seatTypeName: data.seatTypeName || "",
                    price: data.price || "",
                    description: data.description || "",
                });
            })
            .catch((error) => {
                console.error("Lỗi fetch api seat type", error);
            });
    }, [id])

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value
        })
        console.log(form)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newErrors = {}

        if (!form.seatTypeName.trim()) {
            newErrors.seatTypeName = "Vui lòng nhập tên loại ghế"
        }
        if (!String(form.price).trim()) {
            newErrors.price = "Vui lòng nhập giá ghế"
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});

        try {
            const res = await axiosClient.put(`/seatTypes/${id}`, form)
            setSuccesMessage("Sửa loại ghế thành công")
            setSuccessShowToast(true)

            setTimeout(() => {
                navigate("/seatTypeManager")
            }, 1500);
        } catch (err) {
            console.log(err)
            setErrorMessage("Lỗi api")
            setErrorShowToast(true)
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
                <div className="bg-white col-span-10 h-[100vh] p-[30px]">
                    <HeaderAdmin />
                    <p className="font-bold text-[28px]">SỬA LOẠI GHẾ</p>
                    <div className="mt-[30px] pl-[30px]">
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-12 gap-5 ">
                                <div className="col-span-6 gap-y-4 flex flex-col">
                                    <div>
                                        <label
                                            htmlFor="seatTypeName"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Tên loại ghế
                                        </label>
                                        <input
                                            type="text"
                                            id="seatTypeName"
                                            value={form.seatTypeName}
                                            onChange={handleChange}
                                            placeholder="Tên loại ghế"
                                            className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                            required
                                        />

                                        <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                                            {errors.seatTypeName || ""}
                                        </p>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="price"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Giá
                                        </label>
                                        <input
                                            type="text"
                                            id="price"
                                            value={form.price}
                                            onChange={handleChange}
                                            placeholder="Giá loại ghế"
                                            className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                            required
                                        />

                                        <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                                            {errors.price || ""}
                                        </p>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="description"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Mô tả loại ghế
                                        </label>
                                        <textarea
                                            type="text"
                                            id="description"
                                            value={form.description}
                                            onChange={handleChange}
                                            placeholder="Mô tả loại ghế"
                                            className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-[56px]">
                                <Link to={"/seatTypeManager"}>
                                    <button className="bg-white px-4 py-2 text-black border-1 border-black font-bold text-[16px] w-[120px] h-[55px] rounded-[90px] cursor-pointer">
                                        Huỷ
                                    </button>
                                </Link>
                                <button className="bg-black px-4 py-2 text-white font-bold text-[16px] w-[120px] h-[55px] rounded-[90px] ml-6 cursor-pointer">
                                    Lưu
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditSeatType