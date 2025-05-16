import React, { useState } from "react";
import Phim from "../../assets/public/images/phim-1.png";
import Phim_2 from "../../assets/public/images/phim-2.png";
import Phim_3 from "../../assets/public/images/phim-3.png";
import Phim_4 from "../../assets/public/images/phim-4.png";
import PlayButton from "../../assets/public/images/play-button.png";
function MovieList() {
  const items = [
    {
      src: Phim,
      title: "Biệt đội sấm sét",
      duration: "126 phút",
      age: "T13",
      start: "01/05/2025",
      genre: "Phiêu lưu, Hành động",
    },
    {
      src: Phim_2,
      title: "Shin cậu bé bút chì: Bí ẩn! Học viện hoa lệ Tenkasu",
      duration: "99 phút",
      age: "P",
      start: "02/05/2025",
      genre: "Hoạt hình",
    },
    {
      src: Phim_3,
      title: "Lật mặt 8: Vòng tay nắng",
      duration: "135 phút",
      age: "T13",
      start: "27/04/2025",
      genre: "Gia đình",
    },
    {
      src: Phim_4,
      title: "Mật danh: Kế toán 2",
      duration: "133 phút",
      age: "T18",
      start: "02/05/2025",
      genre: "Hành động, Chính kịch",
    },
  ];
  const displayCount = 3;
  const [currentIndex, setCurrentIndex] = useState(0);

  const getVisibleItems = () => {
    const visible = [];
    for (let i = 0; i < displayCount; i++) {
      const index = (currentIndex + i) % items.length;
      visible.push(items[index]);
    }
    return visible;
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="container flex flex-col items-center mx-auto mb-12">
      {/* Tab chọn phim */}
      <div className="flex w-full mb-8 container mx-auto justify-center space-x-[250px]">
        <div className="border-2 border-black hover:bg-black hover:text-white rounded-3xl cursor-pointer px-12 py-2">
          <p className="font-bold">Phim đang chiếu</p>
        </div>
        <div className="border-2 border-black hover:bg-black hover:text-white rounded-3xl cursor-pointer px-12 py-2">
          <p className="font-bold">Phim sắp chiếu</p>
        </div>
      </div>

      {/* Carousel phim */}
      <div className="flex w-full space-x-4 relative justify-center">
        <button
          type="button"
          className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={handlePrev}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/30 dark:bg-gray-800/30 group-hover:bg-green-300 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>

        <div className="flex space-x-40">
          {getVisibleItems().map((src, idx) => (
            <div key={idx} className="w-[300px] rounded">
              <div className="w-full h-[400px] rounded relative group">
                <img
                  src={src.src}
                  alt={`Phim ${idx}`}
                  className="w-full h-full object-contain
                  "
                />
                <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out cursor-pointer">
                  <img
                    src={PlayButton}
                    alt="play"
                    className="w-16 h-16 relative z-20"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center p-4 h-[30%] text-[16px] font-bold">
                <p className="mb-6 flex items-center justify-center h-[48px] font">
                  {src.title}
                </p>
                <p className="flex items-center justify-center">
                  {src.duration}{" "}
                  <span className="ml-1 h-[60%] flex justify-center items-center border-l-2 border-black" />
                  <span className="ml-1 text-red-500 font-bold">{src.age}</span>
                </p>
                <p className="flex items-center justify-center">
                  Khởi chiếu: {src.start}
                </p>
                <p className="flex items-center justify-center">
                  Thể loại: {src.genre}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={handleNext}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/30 dark:bg-gray-800/30 group-hover:bg-green-300 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    </div>
  );
}

export default MovieList;
