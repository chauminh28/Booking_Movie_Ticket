import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaPlayCircle } from "react-icons/fa";

import picture from "../../assets/public/images/phim-1.png";
import combo from "../../assets/public/images/CNS035_COMBO_GAU.png";
import axiosClient from "../../api/axiosClient";
import axios from "axios";

import { IoTime } from "react-icons/io5";
import { FaCalendar } from "react-icons/fa";
import BookTicket from "./BookTicket";

function MovieDetail() {
  const [showTicket, setShowTicket] = useState(false);
  const [movie, setMovie] = useState(null);
  const [room, setRoom] = useState([]);
  const [actors, setActors] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [showTime, setShowTime] = useState();
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const { id } = useParams();
  const [showTrailer, setShowTrailer] = useState(false);

  const [schedules, setSchedules] = useState([]);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState({});
  const [selectedShowtimeId, setSelectedShowtimeId] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/movies/${id}`)
      .then((response) => {
        const data = response.data;
        setMovie(data);
      })
      .catch((error) => {
        console.error("Lỗi fetch api movie", error);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/rooms`)
      .then((response) => {
        const data = response.data.content;
        setRoom(data);
      })
      .catch((error) => {
        console.error("Lỗi fetch api room", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/schedules`)
      .then((response) => {
        const data = response.data.content;
        setSchedules(data);
      })
      .catch((error) => {
        console.error("Lỗi fetch api schedule", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8080/actors")
      .then((response) => {
        setActors(response.data.content);
      })
      .catch((error) => {
        console.error("Lỗi khi tải danh sách diễn viên!", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8080/directors")
      .then((response) => {
        setDirectors(response.data.content);
      })
      .catch((error) => {
        console.error("Lỗi khi tải danh sách diễn viên!", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/bookings/booked-seats", {
        params: {
          scheduleId: selectedSchedule.id,
          roomId: selectedSchedule.roomId,
          showtimeId: selectedShowtimeId,
        },
      })
      .then((response) => {
        setOccupiedSeats(response.data);
      })
      .catch((error) => {
        console.error("Lỗi fetch api schedule", error);
      });
  }, [selectedSchedule, selectedShowtimeId]);

  const handleClick = (showtime) => {
    setShowTime(showtime);
    setShowTicket(true);
    setSelectedShowtimeId(showtime.id);
    console.log(selectedDate);
  };

  return (
    <>
      {movie && (
        <div className="container mx-auto">
          <div className="grid grid-cols-12">
            <div className="col-span-3 mr-[52px]">
              <img src={movie.movie.movieImage} className="rounded-2xl" />
            </div>
            <div className="col-span-9">
              <p className="font-bold text-[35px]">{movie.movie.movieName}</p>
              <div className="flex">
                <div className="flex mr-5">
                  <IoTime className="flex items-center justify-center text-2xl mr-2 mt-1.5" />
                  <p className="font-bold text-[25px] flex items-center justify-center">
                    {movie.movie.movieDuration}
                  </p>
                </div>
                <div className="flex">
                  <FaCalendar className="flex items-center justify-center text-2xl mr-2 mt-1.5" />
                  <p className="font-bold text-[25px] flex items-center justify-centers">
                    {movie.detail.startDate}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-5 mt-4 text-[25px]">
                <p>
                  <span className="font-bold">Quốc gia:</span>{" "}
                  {movie.detail.country}
                </p>
                <p>
                  <span className="font-bold">Thể loại:</span>{" "}
                  {movie.movie.genres.join(", ")}
                </p>
                <p>
                  <span className="font-bold">Đạo diễn:</span>{" "}
                  {movie.detail.directors
                    .map((id) => {
                      const director = directors.find((d) => d.id === id);
                      return director ? director.directorName : null;
                    })
                    .filter(Boolean)
                    .join(", ")}
                </p>
                <p>
                  <span className="font-bold">Diễn viên:</span>{" "}
                  {movie.detail.actors
                    .map((id) => {
                      const actor = actors.find((d) => d.id === id);
                      return actor ? actor.actorName : null;
                    })
                    .filter(Boolean)
                    .join(", ")}
                </p>
                <p>
                  <span className="font-bold">Nội dung:</span>{" "}
                  {movie.detail.description}
                </p>
                <p
                  className="font-bold cursor-pointer text-black hover:underline flex gap-2 w-[200px]"
                  onClick={() => setShowTrailer(true)}
                >
                  <span className='mt-2'><FaPlayCircle /></span> Xem Trailer
                </p>
                {showTrailer && (
                  <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-center items-center">
                    <div className="bg-white rounded-lg overflow-hidden w-[90%] max-w-3xl relative">
                      <button
                        className="absolute top-2 right-2 text-white bg-red-500 px-2 py-1 rounded cursor-pointer"
                        onClick={() => setShowTrailer(false)}
                      >
                        X
                      </button>
                      <div className="aspect-w-16 aspect-h-9">
                        <iframe
                          src={movie.detail.trailer || "https://www.youtube.com/embed/dQw4w9WgXcQ" + "?autoplay=1"}
                          title="Trailer"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-[500px]"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Chọn suất */}
          <div className="mt-8">
            <div className="container mx-auto mb-8">
              <p className="text-[#031327] text-2xl font-bold">
                {" "}
                <span className="mr-2 border-l-4 border-l-[#031327]" />
                Chọn suất chiếu
              </p>
            </div>
            <div className="flex gap-6 items-center justify-center">
              {schedules
                .filter((schedule) => {
                  const scheduleDate = new Date(schedule.scheduleDate);
                  const today = new Date();
                  const sevenDaysLater = new Date(today);
                  sevenDaysLater.setDate(today.getDate() + 7);

                  return (
                    schedule.movieId === parseInt(id) &&
                    scheduleDate >= today &&
                    scheduleDate <= sevenDaysLater
                  );
                })
                .map((schedule) => {
                  const date = new Date(schedule.scheduleDate);
                  const day = date.getDate().toString().padStart(2, "0");
                  const month = (date.getMonth() + 1)
                    .toString()
                    .padStart(2, "0");
                  const year = date.getFullYear();
                  const formattedDate = `${day}/${month}/${year}`;
                  const weekday = date.toLocaleDateString("vi-VN", {
                    weekday: "long",
                  });

                  return (
                    <button
                      key={schedule.id}
                      onClick={() => {
                        setSelectedDate(schedule.scheduleDate);
                        setSelectedSchedule(schedule);
                      }}
                      className={`border border-black w-[150px] rounded-2xl font-bold text-[20px] cursor-pointer px-4 py-4
                        ${
                          selectedDate === schedule.scheduleDate
                            ? "bg-black text-white"
                            : "bg-white hover:bg-black hover:text-white"
                        }`}
                    >
                      <div>
                        <p>{formattedDate}</p>
                        <p className="capitalize">{weekday}</p>
                      </div>
                    </button>
                  );
                })}
            </div>
            <div className="grid grid-cols-7 gap-4 mt-[20px] mb-8">
              {selectedSchedule?.showtimes?.length > 0 ? (
                selectedSchedule.showtimes.map((showtime) => (
                  <button
                    key={showtime.id}
                    onClick={() => handleClick(showtime)}
                    className={`rounded-md px-3 py-3 text-center cursor-pointer 
                      ${
                        selectedShowtimeId === showtime.id
                          ? "bg-black text-white"
                          : "bg-[#BDBDBD] text-black hover:bg-black hover:text-white"
                      }`}
                  >
                    {showtime.time}
                  </button>
                ))
              ) : (
                <p className="col-span-7 text-center text-gray-500">
                  Không có suất chiếu
                </p>
              )}
            </div>
          </div>

          {/* Đặt vé */}
          {showTicket && (
            <BookTicket
              room={room.find((r) => r.id === selectedSchedule.roomId)}
              schedule={selectedSchedule}
              movie={movie}
              showtime={showTime}
              occupiedSeats={occupiedSeats}
            />
          )}
        </div>
      )}
    </>
  );
}

export default MovieDetail;
