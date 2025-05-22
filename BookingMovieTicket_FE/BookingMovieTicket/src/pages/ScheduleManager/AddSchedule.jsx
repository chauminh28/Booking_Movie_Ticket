import React, { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";
import NavbarAdmin from "../../components/layouts/NavbarAdmin";
import HeaderAdmin from "../../components/layouts/HeaderAdmin";
import TomSelect from "tom-select";
import { DateRange } from "react-date-range";

export default function AddSchedule() {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const handleSelect = (ranges) => {
    setSelectionRange(ranges.selection);
  };
  const selectRef1 = useRef(null);
  const selectRef2 = useRef(null);
  const selectRef3 = useRef(null);
  useEffect(() => {
    const initTomSelect = (select, placeholder, maxItems) => {
      if (!select) return null;

      if (select.tomselect) {
        return select.tomselect;
      }

      return new TomSelect(select, {
        maxItems,
        plugins: ["remove_button"],
        placeholder,
      });
    };

    const ts1 = initTomSelect(selectRef1.current, "Chọn phim", 1);
    const ts2 = initTomSelect(selectRef2.current, "Chọn phòng chiếu");
    const ts3 = initTomSelect(selectRef3.current, "Chọn suất chiếu");

    const container1 = ts1.wrapper;
    const container2 = ts2.wrapper;
    const container3 = ts3.wrapper;
    container1.classList.add("w-[404px]", "transition", "h-[50px]");
    container2.classList.add("w-[404px]", "transition", "h-[50px]");
    container3.classList.add("w-[404px]", "transition", "h-[50px]");
    const control1 = container1.querySelector(".ts-control");
    const control2 = container2.querySelector(".ts-control");
    const control3 = container3.querySelector(".ts-control");
    control1.classList.add("h-full");
    control2.classList.add("h-full");
    control3.classList.add("h-full");
    return () => {
      ts1.destroy();
      ts2.destroy();
      ts3.destroy();
    };
  }, []);
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
                        Tên phim: <span className="text-red-600">*</span>
                      </label>
                      <select
                        ref={selectRef1}
                        multiple
                        type="text"
                        id="movie_name"
                        className=""
                        required
                      >
                        <option>Biệt đội sấm sét</option>
                        <option>Doraemon</option>
                        <option>Lật mặt 8</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="room"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phòng chiếu <span className="text-red-600">*</span>
                      </label>
                      <select
                        ref={selectRef2}
                        multiple
                        type="text"
                        id="room"
                        className=""
                        required
                      >
                        <option>Phòng 1</option>
                        <option>Phòng 2</option>
                        <option>Phòng 3</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="showtime"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Suất chiếu <span className="text-red-600">*</span>
                      </label>
                      <select
                        ref={selectRef3}
                        multiple
                        type="text"
                        id="showtime"
                        className=""
                        required
                      >
                        <option>07:00</option>
                        <option>08:00</option>
                        <option>09:00</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-span-6">
                    <div>
                      <label
                        htmlFor="room"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Lịch chiếu <span className="text-red-600">*</span>
                      </label>
                      <DateRange
                        editableDateInputs={false}
                        onChange={handleSelect}
                        moveRangeOnFirstSelection={false}
                        ranges={[selectionRange]}
                        months={1} // Hiển thị 1 tháng (bạn có thể tăng lên 2)
                        direction="vertical" // Hiển thị dọc hoặc ngang
                        showSelectionPreview={true}
                        rangeColors={["#3b82f6"]}
                        minDate={new Date()} // Ngày bắt đầu từ hôm nay
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
