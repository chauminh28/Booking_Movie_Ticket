import React, { useEffect, useState } from "react";
import NavbarAdmin from "../../components/layouts/NavbarAdmin";
import HeaderAdmin from "../../components/layouts/HeaderAdmin";
import { Link, useNavigate } from "react-router-dom";
import SuccessToast from '../../components/toasts/SuccessToast';
import ErrorToast from '../../components/toasts/ErrorToast';
import axios from "axios";
import axiosClient from '../../api/axiosClient'

function AddService() {
    const MediaType = {
        MOVIE_IMAGE: "MOVIE_IMAGE",
        DIRECTOR_IMAGE: "DIRECTOR_IMAGE",
        ACTOR_IMAGE: "ACTOR_IMAGE",
        TRAILER: "TRAILER",
    };
    const [imageReview, setImageReview] = useState(null);
    const [serviceTypes, setServiceTypes] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorToast, setErrorShowToast] = useState(false);
    const [successMessage, setSuccesMessage] = useState('');
    const [showSuccessToast, setSuccessShowToast] = useState(false);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const [form, setForm] = useState({
        serviceName: '',
        price: '',
        serviceTypeId: '',
        image: ''
    })

    useEffect(() => {
        axios
            .get(`http://localhost:8080/serviceTypes`)
            .then((response) => {
                setServiceTypes(response.data.content);
            })
            .catch((error) => {
                console.error("Lỗi fetch api serviceType", error);
            });
    }, []);

    const uploadToCloudinary = async (file, type) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", type); // 'IMAGE' or 'VIDEO'

        const response = await axios.post(
            "http://localhost:8080/uploads",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data.url;
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Preview ảnh
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageReview(reader.result);
        };
        reader.readAsDataURL(file);

        // Upload lên Cloudinary
        try {
            const url = await uploadToCloudinary(file, MediaType.MOVIE_IMAGE);
            setForm((prev) => ({
                ...prev,
                image: url,
            }));
        } catch (err) {
            console.error("Lỗi khi upload ảnh:", err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
        console.log(form)
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newErrors = {}

        if (!form.serviceName.trim()) {
            newErrors.actorName = "Vui lòng nhập tên dịch vụ"
        }
        if (!form.price.trim()) {
            newErrors.price = "Vui lòng nhập giá của dịch vụ"
        }
        if (!form.serviceTypeId.trim()) {
            newErrors.serviceTypeId = "Vui lòng chọn loại dịch vụ"
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});

        try {
            console.log(form)
            const res = await axiosClient.post("/products", form)
            setSuccesMessage("Thêm dịch vụ thành công")
            setSuccessShowToast(true)

            setTimeout(() => {
                navigate("/serviceManager")
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
                <div className="col-span-10">
                    <div className="bg-white col-span-10 h-[100vh] p-[30px]">
                        <HeaderAdmin />
                        <p className="font-bold text-[28px]">THÊM DỊCH VỤ</p>
                        <div className="mt-[30px] pl-[30px]">
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-12 gap-5 ">
                                    <div className="col-span-6 gap-y-4 flex flex-col">
                                        <div>
                                            <label
                                                htmlFor="serviceName"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Tên dịch vụ <span className="text-red-600">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="serviceName"
                                                value={form.serviceName}
                                                onChange={handleChange}
                                                placeholder="Tên dịch vụ"
                                                className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                                required
                                            />
                                            <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                                                {errors.serviceName || ""}
                                            </p>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="price"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Giá <span className="text-red-600">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="price"
                                                value={form.price}
                                                onChange={handleChange}
                                                placeholder="Giá dịch vụ"
                                                className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                                required
                                            />
                                            <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                                                {errors.price || ""}
                                            </p>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="serviceTypeId"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Loại dịch vụ <span className="text-red-600">*</span>{" "}
                                            </label>
                                            <select
                                                type="text"
                                                name="serviceTypeId"
                                                onChange={handleChange}
                                                className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                                required
                                            >
                                                <option>-- Chọn loại dịch vụ --</option>
                                                {serviceTypes.length > 0 ? (
                                                    serviceTypes.map((service) => (
                                                        <option key={service.id} value={service.id}>
                                                            {service.name}
                                                        </option>
                                                    ))
                                                ) : (
                                                    <option>Không có loại dịch vụ</option>
                                                )}
                                            </select>
                                            <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                                                {errors.serviceTypeId || ""}
                                            </p>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="image"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Ảnh dịch vụ
                                            </label>
                                            <input
                                                type="file"
                                                id="image"
                                                placeholder="image"
                                                className="bg-[#F9F9F9] rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition w-[404px]"
                                                onChange={handleImageChange}
                                            />
                                            {imageReview && (
                                                <div className="flex items-center justify-center mt-2 w-[404px]">
                                                    <img
                                                        src={imageReview}
                                                        alt="Preview"
                                                        className="mt-2 w-40 h-40 object-cover rounded-md border"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-span-6 gap-y-4 flex flex-col"></div>
                                </div>
                                <div className="mt-[56px]">
                                    <Link to={"/serviceManager"}>
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

export default AddService