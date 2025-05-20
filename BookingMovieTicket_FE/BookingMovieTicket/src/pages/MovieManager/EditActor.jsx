import React from "react";
import NavbarAdmin from "../../components/layouts/NavbarAdmin";
import HeaderAdmin from "../../components/layouts/HeaderAdmin";
import { Link } from "react-router-dom";

function EditActor() {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2">
        <NavbarAdmin />
      </div>
      <div className="col-span-10">
        <div className="bg-white col-span-10 h-[100vh] p-[30px]">
          <HeaderAdmin />
          <p className="font-bold text-[28px]">SỬA DIỄN VIÊN</p>
          <div className="mt-[30px] pl-[30px]">
            <form>
              <div className="grid grid-cols-12 gap-5 ">
                <div className="col-span-6 gap-y-4 flex flex-col">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Tên diễn viên <span className="text-red-600">*</span>{" "}
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Tên diễn viên"
                      className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="mt-[56px]">
                <Link to={"/movieManager/editMovie"}>
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
  );
}

export default EditActor;
