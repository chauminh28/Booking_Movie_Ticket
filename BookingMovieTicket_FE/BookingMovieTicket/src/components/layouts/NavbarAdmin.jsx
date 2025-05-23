import React, { useEffect } from "react";
import { IoPieChart } from "react-icons/io5";
import { FaCirclePlay } from "react-icons/fa6";
import { IoIosTime } from "react-icons/io";
import { BsFileEarmarkPlayFill } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { FaPersonChalkboard } from "react-icons/fa6";
import { FaPersonRays } from "react-icons/fa6";
import { FaUserGroup } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { GiPopcorn } from "react-icons/gi";
import { IoTicket } from "react-icons/io5";
import Logo from "/logo.png";
import { initFlowbite } from "flowbite";
import { Link } from "react-router-dom";

export default function NavbarAdmin() {
  useEffect(() => {
    initFlowbite();
  }, []);

  return (
    <>
      <div className=" h-[100vh] bg-[#031327] flex gap-y-3 flex-col">
        <img src={Logo} />
        <div className="flex justify-start items-start mt-2">
          <IoPieChart className="text-white mx-3 flex items-center justify-center mt-1" />

          <div className="flex-col flex justify-start items-start">
            <div className="flex">
              <button
                data-collapse-toggle="collapseExample"
                type="button"
                className="text-white font-medium items-start cursor-pointer flex"
              >
                Báo cáo
                <IoIosArrowDown className="text-white ml-1 mt-1" />
              </button>
            </div>

            <div id="collapseExample" className="hidden">
              <div className="font-medium text-white dark:text-gray-200">
                <div className="flex items-center w-full ml-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  <IoIosTime className="text-white" />
                  <a href="#" className="block px-4 py-1">
                    Theo thời gian
                  </a>
                </div>
              </div>
              <div className="font-medium text-white dark:text-gray-200">
                <div className="flex items-center ml-2 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  <FaCirclePlay className="text-white" />
                  <a href="#" className="block px-4 py-1 ">
                    Theo phim
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <BsFileEarmarkPlayFill className="text-white mx-3" />
          <Link to="/roomManager" className="text-white font-medium">
            Phòng chiếu
          </Link>
        </div>
        <div className="flex items-center">
          <FaCalendarAlt className="text-white mx-3" />
          <Link to={"/scheduleManager"} className="text-white font-medium">
            Lịch chiếu
          </Link>
        </div>
        <div className="flex items-center">
          <FaCirclePlay className="text-white mx-3" />
          <Link to="/movieManager" className="text-white font-medium">
            Phim
          </Link>
        </div>
        <div className="flex items-center">
          <BiCategory className="text-white mx-3" />
          <Link to={"/seatTypeManager"} className="text-white font-medium">
            Loại ghế
          </Link>
        </div>
        <div className="flex items-center">
          <FaPersonChalkboard className="text-white mx-3" />
          <Link to={"/directorManager"} className="text-white font-medium">
            Đạo diễn
          </Link>
        </div>
        <div className="flex items-center">
          <FaPersonRays className="text-white mx-3" />
          <Link to={"/actorManager"} className="text-white font-medium">
            Diễn viên
          </Link>
        </div>
        <div className="flex items-center">
          <GiPopcorn className="text-white mx-3" />
          <Link to={"/serviceManager"} className="text-white font-medium">
            Dịch vụ
          </Link>
        </div>
        <div className="flex items-center">
          <FaUserGroup className="text-white mx-3" />
          <Link to={"/userManager"} className="text-white font-medium">
            Người dùng
          </Link>
        </div>
        <div className="flex items-center">
          <IoTicket className="text-white mx-3" />
          <Link to={"/ticketManager"} className="text-white font-medium">
            Đặt vé
          </Link>
        </div>
      </div>
    </>
  );
}
