import React, { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import NavbarAdmin from "../../components/layouts/NavbarAdmin";
import HeaderAdmin from "../../components/layouts/HeaderAdmin";
import { IoMdAddCircle } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import { LuListCollapse } from "react-icons/lu";
import SuccessToast from "../../components/toasts/SuccessToast";
import ErrorToast from "../../components/toasts/ErrorToast";
import axiosClient from "../../api/axiosClient";
import axios from "axios";

export default function EditRoom() {
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorToast, setErrorShowToast] = useState(false);
  const [successMessage, setSuccesMessage] = useState("");
  const [showSuccessToast, setSuccessShowToast] = useState(false);
  const [duration, setDuration] = useState(3000);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [seats, setSeats] = useState([]);
  const [seatType, setSeatType] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [maxColumn, setMaxColumn] = useState(0);
  const [seatMaps, setSeatMaps] = useState({});
  const [form, setForm] = useState({
    createAt: "",
    roomName: "",
    monitor: "",
    soundSystem: "",
    projector: "",
    rows: "",
    cols: "",
    status: true,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/rooms/${id}`)
      .then((response) => {
        const data = response.data;
        setForm({
          createAt: data.createAt || "",
          roomName: data.roomName || "",
          monitor: data.monitor || "",
          soundSystem: data.soundSystem || "",
          projector: data.projector || "",
          rows: data.rows || "",
          cols: data.cols || "",
          status: data.status || true,
        });
      })
      .catch((error) => {
        console.error("Lỗi fetch api user", error);
      });
  }, [id]);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/seats/${id}`)
      .then((response) => {
        setSeats(response.data);
      })
      .catch((error) => {
        console.error("Lỗi fetch api seats", error);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/seatTypes")
      .then((response) => {
        setSeatType(response.data.content);
      })
      .catch((error) => {
        console.error("Lỗi fetch api seat types", error);
      });
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
    console.log(form);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!form.createAt.trim()) {
      newErrors.createAt = "Vui lòng nhập ngày tạo phòng";
    }
    if (!form.roomName.trim()) {
      newErrors.roomName = "Vui lòng nhập tên phòng";
    }
    if (!form.monitor.trim()) {
      newErrors.monitor = "Vui lòng chọn màn hình";
    }
    if (!form.soundSystem.trim()) {
      newErrors.soundSystem = "Vui lòng chọn hệ thống âm thanh";
    }
    if (!form.projector.trim()) {
      newErrors.projector = "Vui lòng chọn máy chiếu";
    }
    if (!String(form.rows).trim()) {
      newErrors.rows = "Vui lòng nhập số hàng";
    }
    if (!String(form.cols).trim()) {
      newErrors.cols = "Vui lòng nhập số cột";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    try {
      await axiosClient.put(`/rooms/${id}`, form);
      setSuccesMessage("Sửa phòng chiếu thành công");
      setSuccessShowToast(true);

      setTimeout(() => {
        navigate("/roomManager");
      }, 1500);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        newErrors.createAt = err.response.data.createAt;
        newErrors.roomName = err.response.data.roomName;
        newErrors.monitor = err.response.data.monitor;
        newErrors.soundSystem = err.response.data.soundSystem;
        newErrors.projector = err.response.data.projector;
        newErrors.rows = err.response.data.rows;
        newErrors.cols = err.response.data.cols;
      } else {
        setErrorMessage("Lỗi API không xác định");
        setErrorShowToast(true);
      }
    }
    console.log(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
  };
  useEffect(() => {
    const seatMap = {};
    let maxCol = 0;
    seats.forEach((seat) => {
      const row = seat.seatRow;
      const column = seat.seatCol;
      if (!seatMap[row]) {
        seatMap[row] = [];
      }
      seatMap[row][column - 1] = seat;
      if (column > maxCol) {
        maxCol = column;
      }
    });
    console.log("Seat Map:", seatMap);
    console.log("Seats:", seats);
    setSeatMaps(seatMap);
    setMaxColumn(maxCol);
  }, [seats]);
  const getSeatColor = (type) => {
    switch (type) {
      case "VIP":
        return "bg-yellow-400";
      case "Standard":
        return "bg-blue-300";
      case "Couple":
        return "bg-pink-400";
      default:
        return "bg-gray-300"; // Mặc định nếu không có loại
    }
  };
  const handleSeatClick = (seat) => {
    setSelectedSeat(seat);
    setIsModalOpen(true);
  };
  const renderSeat = () => {
    const rows = Object.keys(seatMaps).sort(); // A → H

    return rows.map((row) => {
      const columns = seatMaps[row];
      return (
        <div key={row} className="flex items-center mb-2">
          <div className="w-6 mr-2">{row}</div>
          {Array.from({ length: maxColumn }).map((_, colIndex) => {
            const seat = columns[colIndex];

            return seat ? (
              <div
                key={seat.seatId}
                className={`w-10 h-10 m-1 flex items-center justify-center rounded ${getSeatColor(
                  seat.seatTypeName
                )} text-white cursor-pointer`}
                onClick={() => handleSeatClick(seat)}
              >
                {seat.seatNumber}
              </div>
            ) : (
              <div
                key={`empty-${row}-${colIndex}`}
                className="w-10 h-10 m-1 bg-transparent"
              ></div>
            );
          })}
        </div>
      );
    });
  };

  return (
    <>
      {showSuccessToast && (
        <SuccessToast
          message={successMessage}
          onClose={() => {
            setSuccessShowToast(false);
            setDuration(3000);
          }}
          duration={duration}
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
            <p className="font-bold text-[28px]">SỬA PHÒNG CHIẾU</p>
            <div className="mt-[30px] pl-[30px]">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-12 gap-5 ">
                  <div className="col-span-6 gap-y-4 flex flex-col">
                    <div>
                      <label
                        htmlFor="createAt"
                        className="block text-sm font-bold text-gray-700"
                      >
                        Ngày tạo phòng
                      </label>
                      <input
                        type="date"
                        id="createAt"
                        value={form.createAt}
                        onChange={handleChange}
                        placeholder="dd/MM/yyyy"
                        className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                      />
                      <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                        {errors.createAt || ""}
                      </p>
                    </div>
                    <div>
                      <label
                        htmlFor="roomName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Tên phòng chiếu <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="roomName"
                        value={form.roomName}
                        onChange={handleChange}
                        placeholder="Tên phòng chiếu"
                        className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        required
                      />
                      <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                        {errors.roomName || ""}
                      </p>
                    </div>
                    <div>
                      <label
                        htmlFor="total"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Sức chứa
                      </label>
                      <input
                        type="text"
                        id="total"
                        value={seats.length}
                        placeholder="Sức chứa"
                        className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        readOnly
                      />
                    </div>
                    <div className=" w-[404px]">
                      <label className="block text-sm font-medium text-gray-700 mb-4">
                        Sơ đồ ghế <span className="text-red-600">*</span>
                      </label>
                      <div className="flex justify-around">
                        <div className="col-span-1">
                          <label
                            htmlFor="rows"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Số hàng <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            value={form.rows}
                            id="rows"
                            placeholder="Hàng"
                            onChange={handleChange}
                            className="bg-[#F9F9F9] mt-1 block w-[125px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                            required
                          />
                          <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                            {errors.rows || ""}
                          </p>
                        </div>
                        <div className="col-span-1">
                          <label
                            htmlFor="cols"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Số cột <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            value={form.cols}
                            id="cols"
                            onChange={handleChange}
                            placeholder="Cột"
                            className="bg-[#F9F9F9] mt-1 block w-[125px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                            required
                          />
                          <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                            {errors.cols || ""}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-6 flex flex-col gap-4">
                    <div>
                      <label
                        htmlFor="monitor"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Loại màn hình <span className="text-red-600">*</span>
                      </label>
                      <select
                        type="text"
                        id="monitor"
                        value={form.monitor}
                        onChange={handleChange}
                        className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        required
                      >
                        <option>-- Chọn màn hình --</option>
                        <option value={"2D"}>2D</option>
                        <option value={"3D"}>3D</option>
                        <option value={"IMAX"}>IMAX</option>
                      </select>
                      <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                        {errors.monitor || ""}
                      </p>
                    </div>
                    <div>
                      <label
                        htmlFor="soundSystem"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Hệ thống âm thanh
                        <span className="text-red-600">*</span>
                      </label>
                      <select
                        type="text"
                        id="soundSystem"
                        value={form.soundSystem}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        required
                      >
                        <option>-- Chọn hệ thống âm thanh --</option>
                        <option value={"Dolby Atmos"}>Dolby Atmos</option>
                        <option value={"DTS:X"}>DTS:X</option>
                        <option value={"IMAX Audio"}>IMAX Audio</option>
                      </select>
                      <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                        {errors.soundSystem || ""}
                      </p>
                    </div>
                    <div>
                      <label
                        htmlFor="projector"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Máy chiếu <span className="text-red-600">*</span>
                      </label>
                      <select
                        type="text"
                        id="projector"
                        value={form.projector}
                        onChange={handleChange}
                        className="bg-[#F9F9F9] mt-1 block w-[404px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        required
                      >
                        <option>-- Chọn máy chiếu --</option>
                        <option value={"Digital Projector"}>
                          Digital Projector
                        </option>
                        <option value={"IMAX"}>IMAX</option>
                        <option value={"3D"}>3D</option>
                      </select>
                      <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                        {errors.projector || ""}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-[56px]">
                  <Link to={"/roomManager"}>
                    <button className="bg-white px-4 py-2 text-black border-1 border-black font-bold text-[16px] w-[120px] h-[55px] rounded-[90px] cursor-pointer">
                      Huỷ
                    </button>
                  </Link>
                  <button className="bg-black px-4 py-2 text-white font-bold text-[16px] w-[120px] h-[55px] rounded-[90px] ml-6 cursor-pointer">
                    Sửa
                  </button>
                </div>
              </form>
              <div className="flex items-center justify-between mt-8 border-t-4 border-gray-400 shadow-md p-2">
                <p className="font-bold text-xl">Ghế</p>
                <button
                  data-collapse-toggle="collapseActor"
                  type="button"
                  className="font-medium items-start cursor-pointer flex"
                >
                  <LuListCollapse />
                </button>
              </div>
              <div id="collapseActor" className="hidden">
                <div className="font-medium  dark:text-gray-200">
                  <div className="flex items-center w-full flex-col">
                    <div className="flex items-center justify-center flex-col">
                      {isModalOpen &&
                        selectedSeat &&
                        (console.log(selectedSeat),
                        console.log(seatType),
                        (
                          <div
                            id="seat-edit-modal"
                            tabIndex="-1"
                            className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full inset-0 h-full backdrop-brightness-50"
                          >
                            <div className="relative p-4 w-full max-w-md">
                              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Chỉnh sửa loại ghế
                                  </h3>
                                  <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-400 hover:text-gray-900"
                                  >
                                    ✕
                                  </button>
                                </div>
                                <form
                                  className="p-4"
                                  onSubmit={async (e) => {
                                    e.preventDefault();
                                    try {
                                      await axios.put(
                                        `http://localhost:8080/seats/${selectedSeat.seatId}`,
                                        {
                                          seatId: selectedSeat.seatId,
                                          seatTypeId: seatType.find(
                                            (type) =>
                                              type.seatTypeName ===
                                              selectedSeat.seatTypeName
                                          )?.id, // cập nhật sau khi chọn
                                        }
                                      );
                                      setSuccesMessage(
                                        "Cập nhật loại ghế thành công"
                                      );
                                      setSuccessShowToast(true);

                                      // Reload seat data
                                      setTimeout(async () => {
                                        const res = await axios.get(
                                          `http://localhost:8080/seats/${id}`
                                        );
                                        setSeats(res.data);
                                        setIsModalOpen(false);
                                      }, 300);
                                    } catch (err) {
                                      console.log(err);
                                      setErrorMessage(
                                        "Lỗi khi cập nhật loại ghế"
                                      );
                                      setErrorShowToast(true);
                                    }
                                  }}
                                >
                                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Loại ghế
                                  </label>
                                  <select
                                    value={
                                      seatType.find(
                                        (type) =>
                                          type.seatTypeName ===
                                          selectedSeat.seatTypeName
                                      )?.id
                                    }
                                    onChange={(e) => {
                                      const selectedType = seatType.find(
                                        (type) =>
                                          type.id === parseInt(e.target.value)
                                      );
                                      setSelectedSeat({
                                        ...selectedSeat,
                                        seatTypeName:
                                          selectedType?.seatTypeName || "",
                                      });
                                      console.log(
                                        "New select value:",
                                        selectedType?.seatTypeName
                                      );
                                    }}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                  >
                                    <option value="" key={"default"}>
                                      -- Chọn loại ghế --
                                    </option>
                                    {seatType.map((type) => (
                                      <option key={type.id} value={type.id}>
                                        {type.seatTypeName}
                                      </option>
                                    ))}
                                  </select>
                                  <button
                                    type="submit"
                                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                  >
                                    Cập nhật
                                  </button>
                                </form>
                                <button
                                  type="button"
                                  onClick={async () => {
                                    const confirmed = window.confirm(
                                      "Bạn có chắc chắn muốn xóa ghế này?"
                                    );
                                    if (!confirmed) return;

                                    try {
                                      await axios.delete(
                                        `http://localhost:8080/seats/${selectedSeat.seatId}`
                                      );
                                      setSuccesMessage("Xóa ghế thành công");
                                      setSuccessShowToast(true);

                                      // Reload seat data
                                      const res = await axios.get(
                                        `http://localhost:8080/seats/${id}`
                                      );
                                      setSeats(res.data);

                                      setIsModalOpen(false);
                                    } catch (err) {
                                      console.log(err);
                                      setErrorMessage("Lỗi khi xóa ghế");
                                      setErrorShowToast(true);
                                    }
                                  }}
                                  className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full"
                                >
                                  Xóa ghế
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}

                      <div className="w-[610px] h-[40px] bg-gray-400 flex items-center justify-center mb-4">
                        MÀN HÌNH
                      </div>

                      <div>{renderSeat()}</div>
                      <div className="flex mt-5 gap-[80px] mb-8">
                        <div className="flex">
                          <div className="w-10 h-10 flex items-center justify-center rounded-md text-sm cursor-pointer bg-blue-300 mr-2"></div>
                          <p className="flex justify-center items-center">
                            Ghế thường
                          </p>
                        </div>
                        <div className="flex">
                          <div className="w-10 h-10 flex items-center justify-center rounded-md text-sm cursor-pointer bg-pink-400 mr-2"></div>
                          <p className="flex justify-center items-center">
                            Ghế đôi
                          </p>
                        </div>
                        <div className="flex">
                          <div className="w-10 h-10 flex items-center justify-center rounded-md text-sm cursor-pointer bg-yellow-400 mr-2"></div>
                          <p className="flex justify-center items-center">
                            Ghế VIP
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
