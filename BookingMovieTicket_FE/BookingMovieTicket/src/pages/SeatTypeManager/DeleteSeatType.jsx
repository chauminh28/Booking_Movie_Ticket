import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../components/layouts/HeaderAdmin";
import NavbarAdmin from "../../components/layouts/NavbarAdmin";
import SuccessToast from '../../components/toasts/SuccessToast';
import ErrorToast from '../../components/toasts/ErrorToast';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function DeleteSeatType() {
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorToast, setErrorShowToast] = useState(false);
  const [successMessage, setSuccesMessage] = useState('');
  const [showSuccessToast, setSuccessShowToast] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:8080/seatTypes/${id}`);
      setSuccesMessage("Xoá loại ghế thành công")
      setSuccessShowToast(true)

      setTimeout(() => {
        navigate("/seatTypeManager")
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
            <p className="font-bold text-[28px]">XOÁ LOẠI GHẾ</p>
            <div className="mt-[30px] pl-[30px]">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-12 gap-5 ">
                  <div className="col-span-6 gap-y-4 flex flex-col">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Tên loại ghế
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={form.seatTypeName}
                        placeholder="Tên loại ghế"
                        className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        readOnly
                      />
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
                        placeholder="Giá loại ghế"
                        className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        readOnly
                      />
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
                        placeholder="Mô tả loại ghế"
                        className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        readOnly
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

export default DeleteSeatType;
