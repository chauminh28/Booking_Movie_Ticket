import React, { useEffect, useRef, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import NavbarAdmin from "../../components/layouts/NavbarAdmin";
import HeaderAdmin from "../../components/layouts/HeaderAdmin";
import TomSelect from "tom-select";
import axios from "axios";

export default function EditSchedule() {
  // const [selectionRange, setSelectionRange] = useState({
  //   startDate: new Date(),
  //   endDate: new Date(),
  //   key: "selection",
  // });

  // const handleSelect = (ranges) => {
  //   setSelectionRange(ranges.selection);
  // };
  const { id } = useParams(); // Assuming you are using useParams to get the id from the URL
  const selectRef1 = useRef(null);
  const selectRef2 = useRef(null);
  const selectRef3 = useRef(null);
  const [movies, setMovies] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    movieId: "",
    movieName: "",
    roomId: "",
    roomName: "",
    showtimes: [],
    scheduleDate: "",
  });
  useEffect(() => {
    axios
      .get("http://localhost:8080/movies")
      .then((response) => {
        const movieLists = response.data.content.map((movie) => movie.movie);
        setMovies(movieLists);
        console.log("Movies fetched:", movieLists);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8080/rooms")
      .then((response) => {
        setRooms(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching rooms:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/schedules/showtimes")
      .then((response) => {
        const formattedShowtimes = response.data.map((item) => ({
          ...item,
          time: item.time.slice(0, 5),
        }));
        setShowtimes(formattedShowtimes);
        console.log("Formatted Showtimes:", formattedShowtimes);
      })
      .catch((error) => {
        console.error("Error fetching showtimes:", error);
      });
  }, []);

  useEffect(() => {
    const initTomSelect = (select, data, placeholder, maxItems) => {
      if (!select) return null;

      if (select.tomselect) {
        return select.tomselect;
      }

      return new TomSelect(select, {
        maxItems,
        plugins: ["remove_button"],
        placeholder,
        options: data.map((item) => ({
          value: item.id || item.id || item.time,
          text: item.movieName || item.roomName || item.time,
        })),
      });
    };
    const ts1 = initTomSelect(selectRef1.current, movies, "Chọn phim", 1);
    const ts2 = initTomSelect(selectRef2.current, rooms, "Chọn phòng chiếu", 1);
    const ts3 = initTomSelect(selectRef3.current, showtimes, "Chọn suất chiếu");

    ts3.on("change", () => {
      setForm((prevForm) => ({
        ...prevForm,
        showtimes: ts3.items, // hoặc ts3.getValue() nếu chọn 1
      }));
    });

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
  }, [movies, rooms, showtimes]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/schedules/${id}`)
      .then((response) => {
        const data = response.data;
        setForm({
          movieId: data.movieId,
          movieName: data.movieName,
          roomId: data.roomId,
          roomName: data.roomName,
          showtimes: data.showtimes,
          scheduleDate: data.scheduleDate,
        });
        const showtimeIds = data.showtimes.map(
          (showtime) => showtimes.find((s) => s.time === showtime)?.id
        );
        console.log("Schedule data fetched:", data.showTimes);
        if (selectRef1.current) {
          selectRef1.current.tomselect.setValue(data.movieId);
        }

        if (selectRef2.current) {
          selectRef2.current.tomselect.setValue(data.roomId);
        }

        if (selectRef3.current) {
          selectRef3.current.tomselect.setValue(showtimeIds); // Nếu là multiple
        }
      })
      .catch((error) => {
        console.error("Error fetching schedule:", error);
      });
  }, [id, showtimes]);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
    console.log(form);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.post("http://localhost:8080/schedules", form);
      alert("Thêm lịch chiếu thành công!"); // Thông báo thành công
      navigate("/scheduleManager"); // Chuyển hướng về trang quản lý lịch chiếu
    } catch (error) {
      console.error("Error adding schedule:", error);
      alert("Đã xảy ra lỗi khi thêm lịch chiếu. Vui lòng thử lại.");
    }
    console.log("Form submitted:", form);
  };
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
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-12 gap-5 ">
                  <div className="col-span-6 gap-y-4 flex flex-col">
                    <div>
                      <label
                        htmlFor="movieId"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Tên phim: <span className="text-red-600">*</span>
                      </label>
                      <select
                        ref={selectRef1}
                        multiple
                        type="text"
                        id="movieId"
                        className=""
                        onChange={handleChange}
                        required
                      >
                        {/* {movies.map((movie) => (
                          <option key={movie.movie.id} value={movie.movie.id}>
                            {movie.movie.movieName}
                          </option>
                        ))} */}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="roomId"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phòng chiếu <span className="text-red-600">*</span>
                      </label>
                      <select
                        ref={selectRef2}
                        multiple
                        type="text"
                        id="roomId"
                        className=""
                        onChange={handleChange}
                        required
                      >
                        {/* {rooms.map((room) => (
                          <option key={room.id} value={room.id}>
                            {room.roomName}
                          </option>
                        ))} */}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="showtimes"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Suất chiếu <span className="text-red-600">*</span>
                      </label>
                      <select
                        ref={selectRef3}
                        multiple
                        type="text"
                        id="showtimes"
                        className=""
                        required
                      >
                        {/* {showtimes.map((showtime) => (
                          <option key={showtime.id} value={showtime.id}>
                            {showtime.time}
                          </option>
                        ))} */}
                      </select>
                    </div>
                  </div>
                  <div className="col-span-6">
                    <div>
                      <label
                        htmlFor="scheduleDate"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Lịch chiếu <span className="text-red-600">*</span>
                      </label>
                      {/* <DateRange
                        editableDateInputs={false}
                        onChange={handleSelect}
                        moveRangeOnFirstSelection={false}
                        ranges={[selectionRange]}
                        months={1} // Hiển thị 1 tháng (bạn có thể tăng lên 2)
                        direction="vertical" // Hiển thị dọc hoặc ngang
                        showSelectionPreview={true}
                        rangeColors={["#3b82f6"]}
                        minDate={new Date()} // Ngày bắt đầu từ hôm nay
                      /> */}
                      <input
                        id="scheduleDate"
                        name="scheduleDate"
                        type="date"
                        value={form.scheduleDate}
                        onChange={handleChange}
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
