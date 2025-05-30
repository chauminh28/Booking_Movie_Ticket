import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavbarAdmin from "../../components/layouts/NavbarAdmin";
import HeaderAdmin from "../../components/layouts/HeaderAdmin";
import SuccessToast from '../../components/toasts/SuccessToast';
import ErrorToast from '../../components/toasts/ErrorToast';
import countries from "../../assets/data/countries.json";
import axiosClient from '../../api/axiosClient'
import axios from "axios";

function DeleteActor() {
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorToast, setErrorShowToast] = useState(false);
  const [successMessage, setSuccesMessage] = useState('');
  const [showSuccessToast, setSuccessShowToast] = useState(false);
  const [errors, setErrors] = useState({});
  const [countriesList, setCountriesList] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

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
    setImage(form.avatar)
  }, [form])

  useEffect(() => {
    axios
      .get(`http://localhost:8080/actors/${id}`)
      .then((response) => {
        const data = response.data
        setForm({
          actorName: data.actorName || '',
          avatar: data.avatar || '',
          gender: data.gender || '',
          country: data.country || ''
        });
      })
      .catch((error) => {
        console.error("Lỗi fetch api user", error);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:8080/actors/${id}`);
      setSuccesMessage("Xoá diễn viên thành công")
      setSuccessShowToast(true)

      setTimeout(() => {
        navigate("/actorManager")
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
            <p className="font-bold text-[28px]">XÓA DIỄN VIÊN</p>
            <div className="mt-[30px] pl-[30px]">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-12 gap-5 ">
                  <div className="col-span-6 gap-y-4 flex flex-col">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Tên diễn viên
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={form.actorName}
                        placeholder="Tên diễn viên"
                        className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        readOnly
                      />
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
                            checked={form.gender === "NAM"}
                            value="NAM"
                            className="mr-2 text-gray-500"
                            readOnly
                          />
                          Nam
                        </label>
                        <label htmlFor="">
                          <input
                            type="radio"
                            name="gender"
                            checked={form.gender === "NU"}
                            value="NU"
                            className="mr-2 text-gray-500"
                            readOnly
                          />
                          Nữ
                        </label>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Quốc gia
                      </label>
                      <select
                        type="text"
                        id="country"
                        value={form.country}
                        className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        readOnly
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
                    </div>
                    <div>
                      <label
                        htmlFor="image"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Ảnh diễn viên
                      </label>
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
                  <button className="bg-red-500 px-4 py-2 text-white font-bold text-[16px] w-[120px] h-[55px] rounded-[90px] ml-6 cursor-pointer">
                    Xóa
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

export default DeleteActor;
