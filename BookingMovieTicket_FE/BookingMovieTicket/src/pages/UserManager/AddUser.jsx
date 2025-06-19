import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import NavbarAdmin from "../../components/layouts/NavbarAdmin";
import HeaderAdmin from "../../components/layouts/HeaderAdmin";
import SuccessToast from '../../components/toasts/SuccessToast';
import ErrorToast from '../../components/toasts/ErrorToast';
import axiosClient from '../../api/axiosClient'

function AddUser() {
    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorToast, setErrorShowToast] = useState(false);
    const [successMessage, setSuccesMessage] = useState('');
    const [showSuccessToast, setSuccessShowToast] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const [form, setForm] = useState({
        userName: '',
        lastName: '',
        firstName: '',
        dob: '',
        gender: '',
        phone: '',
        email: '',
        password: '123456',
        status: true,
        roleId: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
        console.log(form)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newErrors = {};

        if (!form.userName.trim()) {
            newErrors.userName = "Vui lòng nhập tên đăng nhập"
        }
        if (!form.lastName.trim()) {
            newErrors.lastName = "Vui lòng nhập họ đệm"
        }
        if (!form.firstName.trim()) {
            newErrors.firstName = "Vui lòng nhập tên"
        }
        if (!form.dob.trim()) {
            newErrors.dob = "Vui lòng nhập ngày sinh"
        }
        if (!form.gender.trim()) {
            newErrors.gender = "Vui lòng nhập giới tính"
        }
        if (!form.phone.trim()) {
            newErrors.phone = "Vui lòng nhập số điện thoại"
        }
        if (!form.email.trim()) {
            newErrors.email = "Vui lòng nhập email"
        }
        if (form.roleId == 0) {
            newErrors.roleId = "Vui lòng chọn role"
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});

        const res = await axiosClient.get(`/users/check-username?username=${form.userName}`);
        if (res.data === true) {
            newErrors.userName = "Tên đăng nhập đã tồn tại";
            setErrors(newErrors);
            setErrorMessage("Tên đăng nhập đã tồn tại");
            setErrorShowToast(true);
            return;
        }

        try {
            if (form.gender === "") {
                form.gender = null;
            }
            const res = await axiosClient.post("/users/admin", form)
            setSuccesMessage("Tạo người dùng thành công")
            setSuccessShowToast(true)

            setTimeout(() => {
                navigate("/userManager")
            }, 1500);
        } catch (err) {
            if (err.response && err.response.status === 400) {
                newErrors.userName = err.response.data.userName
                newErrors.lastName = err.response.data.lastName
                newErrors.firstName = err.response.data.firstName
                newErrors.dob = err.response.data.dob
                newErrors.gender = err.response.data.gender
                newErrors.phone = err.response.data.phone
                newErrors.email = err.response.data.email
                newErrors.roleId = err.response.data.roleId

            } else {
                setErrorMessage("Lỗi API không xác định");
                setErrorShowToast(true);
            }
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});
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
                        <p className="font-bold text-[28px]">THÊM NGƯỜI DÙNG</p>
                        <div className="mt-[30px] pl-[30px]">
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-12 gap-5">
                                    <div className="col-span-6 gap-y-4 flex flex-col w-[800px">
                                        <div>
                                            <label
                                                htmlFor="userName"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Username <span className="text-red-600">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="userName"
                                                name='userName'
                                                value={form.userName}
                                                onChange={handleChange}
                                                placeholder="Username"
                                                className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                                required
                                            />
                                            <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                                                {errors.userName || ""}
                                            </p>
                                        </div>
                                        <div className='grid grid-cols-7 gap-12'>
                                            <div className='col-span-2'>
                                                <label
                                                    htmlFor="lastName"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Họ và tên đệm <span className="text-red-600">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    id="lastName"
                                                    name='lastName'
                                                    value={form.lastName}
                                                    onChange={handleChange}
                                                    placeholder="Họ"
                                                    className="bg-[#F9F9F9] mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                                    required
                                                />
                                                <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                                                    {errors.lastName || ""}
                                                </p>
                                            </div>
                                            <div className='col-span-2'>
                                                <label
                                                    htmlFor="firstName"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Tên <span className="text-red-600">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    id="firstName"
                                                    name='firstName'
                                                    value={form.firstName}
                                                    onChange={handleChange}
                                                    placeholder="Tên"
                                                    className="bg-[#F9F9F9] mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                                    required
                                                />
                                                <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                                                    {errors.firstName || ""}
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="gender"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Giới tính <span className="text-red-600">*</span>
                                            </label>
                                            <div className="flex p-2 space-x-10 text-gray-500">
                                                <label htmlFor="gender">
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        value="NAM"
                                                        checked={form.gender === "NAM"}
                                                        onChange={handleChange}
                                                        className="mr-2 text-gray-500"
                                                    />
                                                    Nam
                                                </label>
                                                <label htmlFor="">
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        value="NU"
                                                        checked={form.gender === "NU"}
                                                        onChange={handleChange}
                                                        className="mr-2 text-gray-500"
                                                    />
                                                    Nữ
                                                </label>
                                            </div>
                                            <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                                                {errors.gender || ""}
                                            </p>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="dob"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Ngày sinh <span className="text-red-600">*</span>
                                            </label>
                                            <input
                                                type="date"
                                                id="dob"
                                                name='dob'
                                                value={form.dob}
                                                onChange={handleChange}
                                                className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                                required
                                            />
                                            <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                                                {errors.dob || ""}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-span-6 gap-y-4 flex flex-col">
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email <span className="text-red-600">*</span></label>
                                            <input
                                                type="text"
                                                id="email"
                                                name='email'
                                                value={form.email}
                                                onChange={handleChange}
                                                placeholder='Email'
                                                className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                            />
                                            <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                                                {errors.email || ""}
                                            </p>
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Số điện thoại <span className="text-red-600">*</span></label>
                                            <input
                                                type="text"
                                                id="phone"
                                                name='phone'
                                                value={form.phone}
                                                onChange={handleChange}
                                                placeholder='Số điện thoại'
                                                className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                            />
                                            <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                                                {errors.phone || ""}
                                            </p>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="roleId"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Role <span className="text-red-600">*</span>
                                            </label>
                                            <select
                                                type="text"
                                                id="roleId"
                                                name='roleId'
                                                value={form.roleId}
                                                onChange={handleChange}
                                                className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                                required
                                            >
                                                <option value={0}>-- Chọn role --</option>
                                                <option value={1}>Admin</option>
                                                <option value={2}>Customer</option>
                                                <option value={3}>Employee</option>
                                            </select>
                                        </div>
                                        <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                                            {errors.roleId || ""}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-[56px]">
                                    <Link to={"/userManager"}>
                                        <button className="bg-white px-4 py-2 text-black border-1 border-black font-bold text-[16px] w-[120px] h-[55px] rounded-[90px] cursor-pointer">
                                            Huỷ
                                        </button>
                                    </Link>
                                    <button className="bg-black px-4 py-2 text-white font-bold text-[16px] w-[120px] h-[55px] rounded-[90px] ml-6 cursor-pointer">
                                        Tạo
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddUser