import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavbarAdmin from "../../components/layouts/NavbarAdmin";
import HeaderAdmin from "../../components/layouts/HeaderAdmin";
import axios from "axios";
import SuccessToast from "../../components/toasts/SuccessToast";

function DeleteGenre() {
  const { id } = useParams();
  const [toast, setToast] = useState(null);
  const [genreName, setGenreName] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:8080/genres/${id}`)
      .then((response) => {
        setGenreName(response.data.genreName);
      })
      .catch((error) => {
        console.error("There was an error fetching the genre!", error);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:8080/genres/${id}`);
      setToast({ message: "Xoá loại phim thành công!" });
      setTimeout(() => {
        window.location.href = "/genreManager";
      }, 1500);
    } catch (error) {
      console.error("There was an error deleting the genre!", error);
    }
  };
  return (
    <>
      {toast && (
        <SuccessToast message={toast.message} onClose={() => setToast(null)} />
      )}
      <div className="grid grid-cols-12">
        <div className="col-span-2">
          <NavbarAdmin />
        </div>
        <div className="col-span-10">
          <div className="bg-white col-span-10 h-[100vh] p-[30px]">
            <HeaderAdmin />
            <p className="font-bold text-[28px]">SỬA LOẠI PHIM</p>
            <div className="mt-[30px] pl-[30px]">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-12 gap-5 ">
                  <div className="col-span-6 gap-y-4 flex flex-col">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Tên loại phim <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={genreName}
                        placeholder="Tên loại phim"
                        className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-[56px]">
                  <Link to={"/genreManager"}>
                    <button
                      type="button"
                      className="bg-white px-4 py-2 text-black border-1 border-black font-bold text-[16px] w-[120px] h-[55px] rounded-[90px] cursor-pointer"
                    >
                      Huỷ
                    </button>
                  </Link>
                  <button
                    type="submit"
                    className="bg-red-500 px-4 py-2 text-white font-bold text-[16px] w-[120px] h-[55px] rounded-[90px] ml-6 cursor-pointer"
                  >
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

export default DeleteGenre;
