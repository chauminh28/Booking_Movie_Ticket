import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import picture from "../../assets/public/images/phim-1.png"
import combo from "../../assets/public/images/CNS035_COMBO_GAU.png"
import axiosClient from '../../api/axiosClient'
import axios from "axios";

import { IoTime } from "react-icons/io5";
import { FaCalendar } from "react-icons/fa";
import BookTicket from './BookTicket'

function MovieDetail() {
  const [showTicket, setShowTicket] = useState(false)
  const [movie, setMovie] = useState(null);
  const [room, setRoom] = useState([]);
  const [showTime, setShowTime] = useState();
  const { id } = useParams();

  const [schedules, setSchedules] = useState([]);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8080/movies/${id}`)
      .then((response) => {
        const data = response.data
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
        const data = response.data.content
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
        const data = response.data.content
        setSchedules(data);
      })
      .catch((error) => {
        console.error("Lỗi fetch api schedule", error);
      });
  }, []);

  const handleClick = (index) => {
    setShowTime(index)
    setShowTicket(true)
    console.log(selectedDate)
  }

  return (
    <>
      {movie && (
        <div className='container mx-auto'>
          <div className='grid grid-cols-12'>
            <div className='col-span-3 mr-[52px]'>
              <img src={movie.movie.movieImage} className='rounded-2xl' />
            </div>
            <div className='col-span-9'>
              <p className='font-bold text-[35px]'>{movie.movie.movieName}</p>
              <div className='flex'>
                <div className='flex mr-5'>
                  <IoTime className='flex items-center justify-center text-2xl mr-2 mt-1.5' />
                  <p className='font-bold text-[25px] flex items-center justify-center'>{movie.movie.movieDuration}</p>
                </div>
                <div className='flex'>
                  <FaCalendar className='flex items-center justify-center text-2xl mr-2 mt-1.5' />
                  <p className='font-bold text-[25px] flex items-center justify-centers'>{movie.detail.startDate}</p>
                </div>
              </div>
              <div className='flex flex-col gap-5 mt-4 text-[25px]'>
                <p>
                  <span className="font-bold">Quốc gia:</span> {movie.detail.country}
                </p>
                <p>
                  <span className="font-bold">Thể loại:</span> {movie.movie.genres}
                </p>
                <p>
                  <span className="font-bold">Đạo diễn:</span> Diretor
                </p>
                <p>
                  <span className="font-bold">Diễn viên:</span> Actor
                </p>
                <p>
                  <span className="font-bold">Nội dung:</span> Description
                </p>
              </div>
            </div>
          </div>

          {/* Chọn suất */}
          <div className='mt-8'>
            <div className='container mx-auto mb-8'>
              <p className="text-[#031327] text-2xl font-bold">
                {" "}
                <span className="mr-2 border-l-4 border-l-[#031327]" />
                Chọn suất chiếu
              </p>
            </div>
            <div className='flex gap-6 items-center justify-center'>
              {schedules.map((schedule) => {
                const date = new Date(schedule.scheduleDate);
                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const year = date.getFullYear();
                const formattedDate = `${day}/${month}/${year}`;
                const weekday = date.toLocaleDateString("vi-VN", { weekday: 'long' });

                return (
                  <button
                    key={schedule.id}
                    onClick={() => { setSelectedDate(schedule.scheduleDate); setSelectedSchedule(schedule) }}
                    className={`border border-black w-[150px] rounded-2xl font-bold text-[20px] cursor-pointer px-4 py-4
                  ${selectedDate === schedule.scheduleDate ? "bg-black text-white" : "bg-white hover:bg-black hover:text-white"}`}
                  >
                    <div>
                      <p>{formattedDate}</p>
                      <p className='capitalize'>{weekday}</p>
                    </div>
                  </button>
                )
              })}
            </div>
            <div className="grid grid-cols-7 gap-4 mt-[20px] mb-8">
              {schedules.find(s => s.scheduleDate === selectedDate)?.showtimes.map((time, index) => (
                <button
                  key={index}
                  className="bg-[#BDBDBD] text-white rounded-md px-3 py-3 text-center cursor-pointer hover:bg-black"
                  onClick={() => handleClick(index)}
                >
                  {time}
                </button>
              )) || <p className="col-span-7 text-center text-gray-500">Không có suất chiếu</p>}
            </div>
          </div>

          {/* Đặt vé */}
          {showTicket && (
            <BookTicket room={room.find(r => r.id === selectedSchedule.roomId)} schedule={selectedSchedule} movie={movie} showtime={showTime} />
          )}
        </div>
      )}
    </>
  )
}

export default MovieDetail