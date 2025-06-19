import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function MovieSchedule() {
  const [schedules, setSchedules] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [movieMap, setMovieMap] = useState({});
  const [actors, setActors] = useState([]);
  const [directors, setDirectors] = useState([]);
  const getNextFiveDays = () => {
    const days = [];
    const today = new Date();

    for (let i = 0; i < 5; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      days.push(date);
    }

    return days;
  };

  const days = getNextFiveDays();
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
      .get("http://localhost:8080/schedules", {
        params: {
          date: selectedDate.toISOString().split("T")[0],
        },
      })
      .then(async (res) => {
        const scheduleList = res.data.content;
        setSchedules(scheduleList);

        // Lấy danh sách movieId duy nhất
        const movieIds = [...new Set(scheduleList.map((s) => s.movieId))];

        // Gọi API lấy thông tin phim cho từng movieId
        const movieData = {};
        await Promise.all(
          movieIds.map(async (id) => {
            const res = await axios.get(`http://localhost:8080/movies/${id}`);
            movieData[id] = res.data;
          })
        );

        setMovieMap(movieData); // state chứa thông tin chi tiết phim
      });
  }, [selectedDate]);

  return (
    <div className="my-12 container mx-auto">
      <div>
        <div>
          <p className="text-[#031327] text-2xl font-bold">
            {" "}
            <span className="mr-2 border-l-4 border-l-[#031327]" />
            LỊCH CHIẾU
          </p>
        </div>
        <div className="px-20 flex justify-around mt-8 font-bold">
          {days.map((date, index) => {
            const day = date.getDate().toString().padStart(2, "0");
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const year = date.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;
            const weekday = date.toLocaleDateString("vi-VN", {
              weekday: "long",
            });

            const isSelected =
              selectedDate.toDateString() === date.toDateString();

            return (
              <button
                key={index}
                onClick={() => setSelectedDate(date)}
                className={`border border-black w-[150px] rounded-2xl font-bold text-[20px] cursor-pointer px-4 py-4
              ${
                isSelected
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
        <div className="mt-20 container mx-auto space-y-[80px]">
          {schedules.length === 0 ? (
            <p className="text-center text-gray-500 text-xl italic">
              Không có lịch chiếu
            </p>
          ) : (
            schedules.map((schedule) => {
              const movie = movieMap[schedule.movieId];
              console.log("Movie:", movie);
              if (!movie) {
                return null; // Nếu không tìm thấy thông tin phim, bỏ qua
              }
              return (
                <div key={schedule.id} className="flex gap-[50px]">
                  <div className="rounded-2xl overflow-hidden w-[400px] h-[500px] flex-shrink-0">
                    <Link to={`/movie/detail/${schedule.movieId}`}>
                      <img
                        src={movie.movie.movieImage}
                        alt={movie.movie.movieName}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                  </div>
                  <Link to={`/movie/detail/${schedule.movieId}`}>
                    <div className="flex flex-col gap-6 max-h-[500px] overflow-y-auto">
                      <p className="text-3xl font-bold uppercase">
                        {movie.movie.movieName}
                      </p>
                      <div className="flex items-center gap-5">
                        <p className="bg-[#031327] text-white rounded-3xl w-[32px] h-[32px] flex items-center justify-center px-6">
                          {movie.movie.movieDuration}'
                        </p>
                        <p className="bg-[#031327] text-white rounded-3xl w-[32px] h-[32px] flex items-center justify-center px-6">
                          {movie.detail.ageName}
                        </p>
                      </div>
                      <div className="flex flex-col gap-7 text-xl">
                        <p>
                          <span className="font-bold">Thể loại:</span>{" "}
                          {movie.movie.genres.join(", ")}
                        </p>
                        <p>
                          <span className="font-bold">Đạo diễn:</span>{" "}
                          {movie.detail.directors
                            .map((id) => {
                              const director = directors.find(
                                (d) => d.id === id
                              );
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
                      </div>
                      {/* <div className="grid grid-cols-7 gap-4">
                      {(schedule.showtimes || []).map((showtime) => (
                        <div
                          key={showtime.id}
                          className="bg-[#031327] text-white rounded-md px-3 py-1 text-center"
                        >
                          {showtime.time?.substring(0, 5) || "--:--"}
                        </div>
                      ))}
                    </div> */}
                    </div>
                  </Link>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieSchedule;
