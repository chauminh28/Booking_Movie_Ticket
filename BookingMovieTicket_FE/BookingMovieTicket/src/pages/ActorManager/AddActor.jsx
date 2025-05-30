import React, { useEffect, useState } from "react";
import NavbarAdmin from "../../components/layouts/NavbarAdmin";
import HeaderAdmin from "../../components/layouts/HeaderAdmin";
import { Link, useNavigate } from "react-router-dom";
import countries from "../../assets/data/countries.json";
import SuccessToast from '../../components/toasts/SuccessToast';
import ErrorToast from '../../components/toasts/ErrorToast';
import axios from "axios";
import axiosClient from '../../api/axiosClient'

function AddActor() {
  const MediaType = {
    MOVIE_IMAGE: "MOVIE_IMAGE",
    DIRECTOR_IMAGE: "DIRECTOR_IMAGE",
    ACTOR_IMAGE: "ACTOR_IMAGE",
    TRAILER: "TRAILER",
  };
  const [image, setImage] = useState(null);
  const [countriesList, setCountriesList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorToast, setErrorShowToast] = useState(false);
  const [successMessage, setSuccesMessage] = useState('');
  const [showSuccessToast, setSuccessShowToast] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const [form, setForm] = useState({
    actorName: '',
    avatar: '',
    gender: '',
    country: ''
  })

  useEffect(() => {
    const countryArray = Object.entries(countries).map(([code, name]) => ({
      code,
      name,
    }));
    setCountriesList(countryArray);
  }, [])

  useEffect(() => {
    console.log(form)
  }, [form])

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview ảnh
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload lên Cloudinary
    try {
      const url = await uploadToCloudinary(file, MediaType.ACTOR_IMAGE);
      setForm((prev) => ({
        ...prev,
        avatar: url,
      }));
    } catch (err) {
      console.error("Lỗi khi upload ảnh:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = {}

    if (!form.actorName.trim()) {
      newErrors.actorName = "Vui lòng nhập tên diễn viên"
    }
    if (!form.gender.trim()) {
      newErrors.gender = "Vui lòng nhập giới tính"
    }
    if (!form.country.trim()) {
      newErrors.country = "Vui lòng nhập quốc gia"
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    try {
      console.log(form)
      const res = await axiosClient.post("/actors", form)
      setSuccesMessage("Thêm diễn viên thành công")
      setSuccessShowToast(true)

      setTimeout(() => {
        navigate("/actorManager")
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
            <p className="font-bold text-[28px]">THÊM DIỄN VIÊN</p>
            <div className="mt-[30px] pl-[30px]">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-12 gap-5 ">
                  <div className="col-span-6 gap-y-4 flex flex-col">
                    <div>
                      <label
                        htmlFor="actorName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Tên diễn viên <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="actorName"
                        name="actorName"
                        value={form.actorName}
                        onChange={handleChange}
                        placeholder="Tên diễn viên"
                        className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        required
                      />
                      <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                        {errors.actorName || ""}
                      </p>
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
                        <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                          {errors.gender || ""}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Quốc gia <span className="text-red-600">*</span>
                      </label>
                      <select
                        type="text"
                        id="country"
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        required
                      >
                        {countriesList.length > 0 ? (
                          countriesList.map((country) => (
                            <option key={country.code} value={country.name}>
                              {country.name}
                            </option>
                          ))
                        ) : (
                          <option>Không có quốc gia</option>
                        )}
                      </select>
                      <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                        {errors.country || ""}
                      </p>
                    </div>
                    <div>
                      <label
                        htmlFor="avatar"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Ảnh diễn viên
                      </label>
                      <input
                        type="file"
                        id="avatar"
                        name="avatar"
                        placeholder="image"
                        className="bg-[#F9F9F9] rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition w-[404px]"
                        onChange={handleImageChange}
                      />
                      {image && (
                        <div className="flex items-center justify-center mt-2 w-[404px]">
                          <img
                            src={image}
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
                  <Link to={"/actorManager"}>
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
  );
}

export default AddActor;
