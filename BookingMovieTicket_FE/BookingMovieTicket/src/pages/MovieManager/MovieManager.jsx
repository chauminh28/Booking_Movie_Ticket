import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import NavbarAdmin from "../../components/layouts/NavbarAdmin";
import HeaderAdmin from "../../components/layouts/HeaderAdmin";
import { Link } from "react-router-dom";
import axios from "axios";
const MOVIE_STATUS = {
  STOPPED: -1,
  UPCOMING: 0,
  SHOWING: 1,
};
function MovieManager() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(0); // trang hiện tại
  const [totalPages, setTotalPages] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const size = 5;

  useEffect(() => {
    axios
      .get("http://localhost:8080/movies", {
        params: {
          page: page,
          size: size,
          search: searchValue,
        },
      })
      .then((response) => {
        setMovies(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error("Lỗi khi tải danh sách phim!", error);
      });
  }, [page, searchValue]);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 0 && pageNumber < totalPages) {
      setPage(pageNumber);
    }
  };
  const getStatusLabel = (status) => {
    switch (status) {
      case MOVIE_STATUS.STOPPED:
        return "Ngừng chiếu";
      case MOVIE_STATUS.UPCOMING:
        return "Sắp chiếu";
      case MOVIE_STATUS.SHOWING:
        return "Đang chiếu";
      default:
        return "Không xác định";
    }
  };

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2">
        <NavbarAdmin />
      </div>
      <div className="col-span-10">
        <div className="bg-white h-[100vh] p-[10px]">
          <HeaderAdmin />
          <div className="flex mt-6 w-full mb-6">
            <div className="w-full">
              <p className="font-bold text-[28px]">QUẢN LÝ PHIM</p>
            </div>
            <div className="flex justify-end items-end w-full gap-x-10 pr-[100px]">
              <Link to={"/movieManager/addMovie"}>
                <IoIosAddCircle className="text-[28px]" />
              </Link>
            </div>
          </div>

          {/* Thanh tìm kiếm */}
          <div className="relative w-[576px] mb-4">
            <input
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setPage(0);
              }}
              className="w-[576px] h-[50px] outline-none rounded-xl border-[#BDC5D4] border-[2px] px-3 py-2"
              placeholder="Tìm kiếm tên phim"
            />
            <CiSearch className="absolute top-[16px] right-[20px]" />
          </div>

          {/* Bảng phim */}
          <table className="table-auto w-full text-left text-sm">
            <thead>
              <tr className="font-semibold text-[15px] text-[#A2A2A6]">
                <th className="px-4 py-2">Hình ảnh</th>
                <th className="px-4 py-2">Tên phim</th>
                <th className="px-4 py-2">Ngày khởi chiếu</th>
                <th className="px-4 py-2">Thời lượng</th>
                <th className="px-4 py-2">Phân loại</th>
                <th className="px-4 py-2">Trạng thái</th>
                <th className="px-4 py-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {movies.length > 0 ? (
                movies.map((movieItem) => (
                  <tr
                    key={movieItem.movie.id}
                    className="border-t border-[#EEEEEE]"
                  >
                    <td className="px-4 py-2">
                      <img
                        src={movieItem.movie.movieImage || "https://res.cloudinary.com/dnpym3szs/image/upload/v1750299782/movies/p0pr2yw9dmcwhhes0hhu.jpg"}
                        alt="Ảnh phim"
                        className="w-[80px] h-auto rounded-md"
                      />
                    </td>
                    <td className="px-4 py-2">{movieItem.movie.movieName}</td>
                    <td className="px-4 py-2">{movieItem.detail.startDate}</td>
                    <td className="px-4 py-2">
                      {movieItem.movie.movieDuration} phút
                    </td>
                    <td className="px-4 py-2">{movieItem.detail.ageName}</td>
                    <td className="px-4 py-2">
                      {getStatusLabel(movieItem.movie.movieStatus)}
                    </td>
                    <td className="px-4 py-2 h-full">
                      <div className="flex justify-start items-center gap-x-4">
                        <Link
                          to={`/movieManager/editMovie/${movieItem.movie.id}`}
                        >
                          <button className="text-blue-600 hover:text-blue-800 text-[20px]">
                            <MdEdit />
                          </button>
                        </Link>
                        <Link
                          to={`/movieManager/deleteMovie/${movieItem.movie.id}`}
                        >
                          <button className="text-red-600 hover:text-red-800 text-[20px]">
                            <MdDelete />
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    Không có phim nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Phân trang */}
          <div className="flex justify-center mt-4">
            <nav className="inline-flex items-center space-x-1 text-sm">
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page === 0}
                className="px-3 py-2 rounded-l-md bg-[#F5F5F5] border border-gray-300 hover:bg-black hover:text-white disabled:opacity-50"
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index)}
                  className={`px-3 py-2 border border-gray-300 ${index === page
                    ? "bg-black text-white"
                    : "bg-[#F5F5F5] hover:bg-black hover:text-white"
                    } rounded-md`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages - 1}
                className="px-3 py-2 rounded-r-md bg-[#F5F5F5] border border-gray-300 hover:bg-black hover:text-white disabled:opacity-50"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieManager;
