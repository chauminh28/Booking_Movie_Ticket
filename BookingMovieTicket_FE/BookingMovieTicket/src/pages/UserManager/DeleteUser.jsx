import React, { useEffect, useState } from 'react'
import NavbarAdmin from "../../components/layouts/NavbarAdmin";
import HeaderAdmin from "../../components/layouts/HeaderAdmin";
import SuccessToast from '../../components/toasts/SuccessToast';
import ErrorToast from '../../components/toasts/ErrorToast';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function DeleteUser() {
    const { id } = useParams();
    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorToast, setErrorShowToast] = useState(false);
    const [successMessage, setSuccesMessage] = useState('');
    const [showSuccessToast, setSuccessShowToast] = useState(false);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        userName: '',
        lastName: '',
        firstName: '',
        dob: '',
        gender: '',
        phone: '',
        email: '',
        password: '',
        status: true,
        roleId: ''
    })

    useEffect(() => {
        axios
            .get(`http://localhost:8080/users/${id}`)
            .then((response) => {
                const data = response.data
                setForm({
                    userName: data.userName || '',
                    lastName: data.lastName || '',
                    firstName: data.firstName || '',
                    dob: data.dob || '',
                    gender: data.gender || '',
                    phone: data.phone || '',
                    email: data.email || '',
                    password: '',
                    status: data.status,
                    roleId: data.roleId || ''
                });
            })
            .catch((error) => {
                console.error("Lỗi fetch api user", error);
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`http://localhost:8080/users/${id}`);
            setSuccesMessage("Xoá người dùng thành công")
            setSuccessShowToast(true)

            setTimeout(() => {
                navigate("/userManager")
            }, 1500);
        } catch (error) {
            console.log(err)
            setErrorMessage("Lỗi api")
            setErrorShowToast(true)
        }
    };

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
                        <p className="font-bold text-[28px]">XÓA NGƯỜI DÙNG</p>
                        <div className="mt-[30px] pl-[30px]">
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-12 gap-5">
                                    <div className="col-span-6 gap-y-4 flex flex-col w-[800px">
                                        <div>
                                            <label
                                                htmlFor="userName"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Username
                                            </label>
                                            <input
                                                type="text"
                                                id="userName"
                                                name='userName'
                                                value={form.userName}
                                                placeholder="Username"
                                                className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                                readOnly
                                            />
                                        </div>
                                        <div className='grid grid-cols-7 gap-12'>
                                            <div className='col-span-2'>
                                                <label
                                                    htmlFor="lastName"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Họ và tên đệm
                                                </label>
                                                <input
                                                    type="text"
                                                    id="lastName"
                                                    name='lastName'
                                                    value={form.lastName}
                                                    placeholder="Họ"
                                                    className="bg-[#F9F9F9] mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                                    readOnly
                                                />
                                            </div>
                                            <div className='col-span-2'>
                                                <label
                                                    htmlFor="firstName"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Tên
                                                </label>
                                                <input
                                                    type="text"
                                                    id="firstName"
                                                    name='firstName'
                                                    value={form.firstName}
                                                    placeholder="Tên"
                                                    className="bg-[#F9F9F9] mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="gender"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Giới tính
                                            </label>
                                            <div className="flex p-2 space-x-10 text-gray-500">
                                                <label htmlFor="gender">
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        value="NAM"
                                                        checked={form.gender === "NAM"}
                                                        className="mr-2 text-gray-500"
                                                        readOnly
                                                    />
                                                    Nam
                                                </label>
                                                <label htmlFor="">
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        value="NU"
                                                        checked={form.gender === "NU"}
                                                        className="mr-2 text-gray-500"
                                                        readOnly
                                                    />
                                                    Nữ
                                                </label>
                                            </div>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="dob"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Ngày sinh
                                            </label>
                                            <input
                                                type="date"
                                                id="dob"
                                                name='dob'
                                                value={form.dob}
                                                className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-6 gap-y-4 flex flex-col">
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                            <input
                                                type="text"
                                                id="email"
                                                name='email'
                                                value={form.email}
                                                readOnly
                                                placeholder='Email'
                                                className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Số điện thoại <span className="text-red-600">*</span></label>
                                            <input
                                                type="text"
                                                id="phone"
                                                name='phone'
                                                value={form.phone}
                                                readOnly
                                                placeholder='Số điện thoại'
                                                className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="roleId"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Role
                                            </label>
                                            <select
                                                type="text"
                                                id="roleId"
                                                name='roleId'
                                                value={form.roleId}
                                                readOnly
                                                className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                            >
                                                <option>-- Chọn role --</option>
                                                <option value={1}>Admin</option>
                                                <option value={2}>Customer</option>
                                                <option value={3}>Employee</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-[56px]">
                                    <Link to={"/userManager"}>
                                        <button className="bg-white px-4 py-2 text-black border-1 border-black font-bold text-[16px] w-[120px] h-[55px] rounded-[90px] cursor-pointer">
                                            Huỷ
                                        </button>
                                    </Link>
                                    <button className="bg-red-500 px-4 py-2 text-white font-bold text-[16px] w-[120px] h-[55px] rounded-[90px] ml-6 cursor-pointer">
                                        Xoá
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default DeleteUser