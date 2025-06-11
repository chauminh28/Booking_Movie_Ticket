import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../components/layouts/HeaderAdmin";
import NavbarAdmin from "../../components/layouts/NavbarAdmin";
import { IoIosAddCircle } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import axios from "axios";

function ActorManager() {
  const [actors, setActors] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const size = 5;

  useEffect(() => {
    axios
      .get("http://localhost:8080/actors", {
        params: {
          page: page,
          size: size,
          search: searchValue,
        },
      })
      .then((response) => {
        setActors(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error("Lỗi khi tải danh sách diễn viên!", error);
      });
  }, [page, searchValue]);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 0 && pageNumber < totalPages) {
      setPage(pageNumber);
    }
  };

  return (
    <>
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
                  <p className="font-bold text-[28px]">QUẢN LÝ DIỄN VIÊN</p>
                </div>
                <div className="flex justify-end items-end w-full gap-x-10 pr-[100px]">
                  <Link to="/actorManager/addActor">
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
                    placeholder="Tìm kiếm diễn viên"
                  />
                  <CiSearch className="absolute top-[16px] right-[20px]" />
                </div>
                <div className="mt-3">
                  <table className="table-auto w-full text-left text-sm">
                    <thead>
                      <tr className="font-semibold text-[15px] text-[#A2A2A6]">
                        <th className="px-4 py-2">Ảnh</th>
                        <th className="px-4 py-2">Tên diễn viên</th>
                        <th className="px-4 py-2">Giới tính</th>
                        <th className="px-4 py-2">Quốc gia</th>
                        <th className="px-4 py-2">Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {actors.length > 0 ? (
                        actors.map((actor) => (
                          <tr
                            className="border-t border-[#EEEEEE]"
                            key={actor.id}
                          >
                            <td className="w-36 h-24">
                              <img
                                src={actor.avatar}
                                alt=""
                                className="w-full h-full"
                              />
                            </td>
                            <td className="px-4 py-2">{actor.actorName}</td>
                            <td className="px-4 py-2">{actor.gender}</td>
                            <td className="px-4 py-2">{actor.country}</td>

                            <td className="px-4 py-2 h-full">
                              <div className="flex justify-start items-center gap-x-4">
                                <Link
                                  to={`/actorManager/editActor/${actor.id}`}
                                >
                                  <button className="text-blue-600 hover:text-blue-800 text-[20px] cursor-pointer">
                                    <MdEdit />
                                  </button>
                                </Link>
                                <Link
                                  to={`/actorManager/deleteActor/${actor.id}`}
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
                            Không có diễn viên nào.
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
          </div>
        </div>
      </div>
    </>
  );
}

export default ActorManager;
