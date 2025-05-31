import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../components/layouts/HeaderAdmin";
import NavbarAdmin from "../../components/layouts/NavbarAdmin";
import { IoIosAddCircle } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
function DirectorManager() {
  const [directors, setDirectors] = useState([]);
  const [page, setPage] = useState(0); // current page (zero-based)
  const [totalPages, setTotalPages] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const size = 5; // số bản ghi mỗi trang
  useEffect(() => {
    axios
      .get(`http://localhost:8080/directors`, {
        params: {
          page: page,
          size: size,
          search: searchValue, // Thêm tham số tìm kiếm nếu cần
        },
      })
      .then((response) => {
        setDirectors(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error("There was an error fetching the genres!", error);
      });
  }, [page, searchValue]);
  const goToPage = (pageNumber) => {
    if (pageNumber >= 0 && pageNumber < totalPages) {
      setPage(pageNumber);
    }
  };
  return (
    <div>
      <div className="grid grid-cols-12">
        <div className="col-span-2">
          <NavbarAdmin />
        </div>
        <div className="col-span-10">
          <div className="bg-white col-span-10 h-[100vh] p-[10px]">
            <div className="flex">
              <HeaderAdmin />
            </div>

            <div className="flex mt-6 w-full mb-6">
              <div className="w-full">
                <p className="font-bold text-[28px]">QUẢN LÝ ĐẠO DIỄN</p>
              </div>
              <div className="flex justify-end items-end w-full gap-x-10 pr-[100px]">
                <Link to="/directorManager/addDirector">
                  <IoIosAddCircle className="text-[28px]" />
                </Link>
              </div>
            </div>

            <div>
              <div className="relative w-[576px]">
                <input
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                    setPage(0);
                  }}
                  className="w-[576px] h-[50px] outline-none rounded-xl border-[#BDC5D4] border-[2px] px-3 py-2"
                  placeholder="Tìm kiếm đạo diễn"
                />
                <CiSearch className="absolute top-[16px] right-[20px]" />
              </div>
              <div className="mt-3">
                <table className="table-auto w-full text-left text-sm">
                  <thead>
                    <tr className="font-semibold text-[15px] text-[#A2A2A6]">
                      <th className="px-4 py-2">Ảnh</th>
                      <th className="px-4 py-2">Tên đạo diễn</th>
                      <th className="px-4 py-2">Giới tính</th>
                      <th className="px-4 py-2">Quốc gia</th>
                      <th className="px-4 py-2">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {directors.length > 0 ? (
                      directors.map((director) => (
                        <tr
                          className="border-t border-[#EEEEEE]"
                          key={director.id}
                        >
                          <td className="w-36 h-24">
                            <img
                              src={director.avatar}
                              alt=""
                              className="w-full h-full"
                            />
                          </td>
                          <td className="px-4 py-2">{director.directorName}</td>
                          <td className="px-4 py-2">{director.gender}</td>
                          <td className="px-4 py-2">{director.country}</td>

                          <td className="px-4 py-2 h-full">
                            <div className="flex justify-start items-center gap-x-4">
                              <Link
                                to={`/directorManager/editDirector/${director.id}`}
                              >
                                <button className="text-blue-600 hover:text-blue-800 text-[20px] cursor-pointer">
                                  <MdEdit />
                                </button>
                              </Link>
                              <Link
                                to={`/directorManager/deleteDirector/${director.id}`}
                              >
                                <button className="text-red-600 hover:text-red-800 text-[20px] cursor-pointer">
                                  <MdDelete />
                                </button>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="7"
                          className="text-center py-4 text-gray-500"
                        >
                          Không có đạo diễn nào.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
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
                        className={`px-3 py-2 border border-gray-300 ${
                          index === page
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
        </div>
      </div>
    </div>
  );
}

export default DirectorManager;
