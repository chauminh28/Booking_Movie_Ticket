import React from "react";

function MovieList() {
  return (
    <div className="container flex justify-center items-center mx-auto mb-12">
      <div className="flex justify-around w-full">
        <div className="border-2 border-black hover:bg-black hover:text-white rounded-3xl">
          <p className="py-2 px-15 font-bold">Phim đang chiếu</p>
        </div>
        <div className="border-2 border-black hover:bg-black hover:text-white rounded-3xl">
          <p className="py-2 px-15 font-bold">Phim sắp chiếu</p>
        </div>
      </div>
    </div>
  );
}

export default MovieList;
