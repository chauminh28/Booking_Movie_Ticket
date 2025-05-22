import React from "react";
import NavbarAdmin from "../../components/layouts/NavbarAdmin";
import HeaderAdmin from "../../components/layouts/HeaderAdmin";
import { Link } from "react-router-dom";

function DeleteSchedule() {
  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-2">
          <NavbarAdmin />
        </div>

        <div className="col-span-10">
          <div className="bg-white col-span-10 h-[100vh] p-[30px]">
            <HeaderAdmin />
            <p className="font-bold text-[28px]">THÊM LỊCH CHIẾU</p>
            <div className="mt-[30px] pl-[30px]">
              <form>
                <div className="grid grid-cols-12 gap-5 ">
                  <div className="col-span-6 gap-y-4 flex flex-col">
                    <div>
                      <label
                        htmlFor="movie_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Tên phim: 
                      </label>
                      <input
                        type="text"
                        id="date"
                        value={"Biệt đội sấm sét"}
                        className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="room"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phòng chiếu 
                      </label>
                      <input
                        type="text"
                        id="date"
                        value={"Phòng 1"}
                        className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                      />
                    </div>
                  </div>
                  <div className="col-span-6">
                    <div>
                      <label
                        htmlFor="room"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Lịch chiếu 
                      </label>
                      <input
                        type="date"
                        id="date"
                        placeholder="dd/MM/yyyy"
                        value={new Date().toISOString().split("T")[0]}
                        className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-[56px]">
                  <Link to={"/scheduleManager"}>
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

export default DeleteSchedule;
