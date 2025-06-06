import React, { useEffect, useState } from "react";
import NavbarAdmin from "../../components/layouts/NavbarAdmin";
import HeaderAdmin from "../../components/layouts/HeaderAdmin";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import SuccessToast from '../../components/toasts/SuccessToast';
import ErrorToast from '../../components/toasts/ErrorToast';
import axiosClient from '../../api/axiosClient'

function EditServiceType() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorToast, setErrorShowToast] = useState(false);
    const [successMessage, setSuccesMessage] = useState('');
    const [showSuccessToast, setSuccessShowToast] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios
            .get(`http://localhost:8080/serviceTypes/${id}`)
            .then((response) => {
                setName(response.data.name);
            })
            .catch((error) => {
                console.error("Lỗi fetch api service types", error);
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newErrors = {};

        if (!name.trim()) {
            newErrors.name = "Vui lòng nhập tên loại dịch vụ"
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});

        try {
            const res = await axiosClient.put(`/serviceTypes/${id}`, {
                name: name
            })
            setSuccesMessage("Sửa loại dịch vụ thành công")
            setSuccessShowToast(true)

            setTimeout(() => {
                navigate("/serviceTypeManager")
            }, 1500);
        } catch (err) {
            if (err.response && err.response.status === 400) {
                newErrors.name = err.response.data.name
            } else {
                setErrorMessage("Lỗi API không xác định");
                setErrorShowToast(true);
            }
        }
        console.log(newErrors)
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
                        <p className="font-bold text-[28px]">THÊM LOẠI DỊCH VỤ</p>
                        <div className="mt-[30px] pl-[30px]">
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-12 gap-5 ">
                                    <div className="col-span-6 gap-y-4 flex flex-col">
                                        <div>
                                            <label
                                                htmlFor="name"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Tên loại dịch vụ <span className="text-red-600">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Tên loại dịch vụ"
                                                className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                            />
                                            {errors.name && (
                                                <p className="text-red-600 text-sm mt-1">
                                                    {errors.name}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-[56px]">
                                    <Link to={"/serviceTypeManager"}>
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

export default EditServiceType