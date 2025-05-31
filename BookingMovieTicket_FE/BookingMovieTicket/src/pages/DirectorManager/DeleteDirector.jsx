import React, { useEffect, useState } from "react";
import NavbarAdmin from "../../components/layouts/NavbarAdmin";
import HeaderAdmin from "../../components/layouts/HeaderAdmin";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import SuccessToast from "../../components/toasts/SuccessToast";

function DeleteDirector() {
  const [showSuccessToast, setSuccessShowToast] = useState(false);
  const [successMessage, setSuccesMessage] = useState("");

  const { id } = useParams(); // Lấy id từ URL
  const navigate = useNavigate();
  const [form, setForm] = useState({
    directorName: "",
    avatar: "",
    gender: "",
    country: "",
  });
  useEffect(() => {
    axios
      .get(`http://localhost:8080/directors/${id}`)
      .then((response) => {
        const data = response.data;
        setForm({
          directorName: data.directorName || "",
          avatar: data.avatar || "",
          gender: data.gender || "",
          country: data.country || "",
        });
      })
      .catch((error) => {
        console.error("Lỗi fetch api director", error);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:8080/directors/${id}`);
      setSuccesMessage("Xóa đạo diễn thành công");
      setSuccessShowToast(true);

      setTimeout(() => {
        navigate("/directorManager");
      }, 1000);
    } catch (error) {
      console.error("Lỗi khi xóa đạo diễn:", error);
    }
  };
  return (
    <div className="grid grid-cols-12">
      {showSuccessToast && (
        <SuccessToast
          message={successMessage}
          onClose={() => setSuccessShowToast(false)}
        />
      )}
      <div className="col-span-2">
        <NavbarAdmin />
      </div>
      <div className="col-span-10">
        <div className="bg-white col-span-10 h-[100vh] p-[30px]">
          <HeaderAdmin />
          <p className="font-bold text-[28px]">XÓA ĐẠO DIỄN</p>
          <div className="mt-[30px] pl-[30px]">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-12 gap-5 ">
                <div className="col-span-6 gap-y-4 flex flex-col">
                  <div>
                    <label
                      htmlFor="directorName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Tên đạo diễn
                    </label>
                    <input
                      type="text"
                      id="directorName"
                      name="directorName"
                      value={form.directorName}
                      placeholder="Tên đạo diễn"
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
                    <input
                      type="text"
                      id="gender"
                      name="gender"
                      value={form.gender}
                      className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                      readOnly
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Quốc gia
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={form.country}
                      className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                      readOnly
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="image"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Ảnh đạo diễn
                    </label>
                    {form.avatar && (
                      <div className="flex items-center justify-center mt-2 w-[404px]">
                        <img
                          src={form.avatar}
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
                <Link to={"/directorManager"}>
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
  );
}

export default DeleteDirector;
