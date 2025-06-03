import React from "react";
import Phim from "../../assets/public/images/phim-1.png";
import Phim_2 from "../../assets/public/images/phim-2.png";
function MovieSchedule() {
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
          <div className="border-2 border-black hover:bg-[#031327] hover:text-white flex items-center justify-center flex-col rounded-xl cursor-pointer px-12 py-2 mt-4">
            <p>Thứ 6</p>
            <p>16/05/2025</p>
          </div>
          <div className="border-2 border-black hover:bg-[#031327] hover:text-white flex items-center justify-center flex-col rounded-xl cursor-pointer px-12 py-2 mt-4">
            <p>Thứ 6</p>
            <p>16/05/2025</p>
          </div>
          <div className="border-2 border-black hover:bg-[#031327] hover:text-white flex items-center justify-center flex-col rounded-xl cursor-pointer px-12 py-2 mt-4">
            <p>Thứ 6</p>
            <p>16/05/2025</p>
          </div>
          <div className="border-2 border-black hover:bg-[#031327] hover:text-white flex items-center justify-center flex-col rounded-xl cursor-pointer px-12 py-2 mt-4">
            <p>Thứ 6</p>
            <p>16/05/2025</p>
          </div>
          <div className="border-2 border-black hover:bg-[#031327] hover:text-white flex items-center justify-center flex-col rounded-xl cursor-pointer px-12 py-2 mt-4">
            <p>Thứ 6</p>
            <p>16/05/2025</p>
          </div>
          <div className="border-2 border-black hover:bg-[#031327] hover:text-white flex items-center justify-center flex-col rounded-xl cursor-pointer px-12 py-2 mt-4">
            <p>Thứ 6</p>
            <p>16/05/2025</p>
          </div>
        </div>
        <div className="mt-20 container mx-auto space-y-[80px]">
          <div className="flex gap-[50px]">
            <div className="rounded-2xl overflow-hidden w-[400px] h-[500px] flex-shrink-0">
              <img
                src={Phim}
                alt="Phim 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-6 max-h-[500px] overflow-y-auto">
              <p className="text-3xl font-bold uppercase">BIỆT ĐỘI SẤM SÉT</p>
              <div className="flex items-center gap-5">
                <p className="bg-[#031327] text-white rounded-3xl w-[32px] h-[32px] flex items-center justify-center px-6">
                  2D
                </p>
                <p className="bg-[#031327] text-white rounded-3xl w-[32px] h-[32px] flex items-center justify-center px-6">
                  T13
                </p>
              </div>
              <div className="flex flex-col gap-7 text-xl">
                <p>
                  <span className="font-bold">Thể loại:</span> Phiêu lưu, Hành
                  động.
                </p>
                <p>
                  <span className="font-bold">Đạo diễn:</span> John Doe.
                </p>
                <p>
                  <span className="font-bold">Diễn viên:</span> Jane Smith,
                  Robert Brown, Emma Wilson.
                </p>
                <p>
                  <span className="font-bold">Nội dung:</span> Bộ phim kể về
                  cuộc phiêu lưu đầy kịch tính của một nhóm anh hùng đối mặt với
                  thử thách vượt ngoài sức tưởng tượng để bảo vệ thế giới khỏi
                  hiểm họa.
                </p>
              </div>
              <div className="grid grid-cols-7 gap-4">
                <div className="bg-[#BDBDBD] text-white rounded-md px-3 py-1">
                  09:00
                </div>
                <div className="bg-[#BDBDBD] text-white rounded-md px-3 py-1">
                  10:00
                </div>
                <div className="bg-[#BDBDBD] text-white rounded-md px-3 py-1">
                  11:20
                </div>
                <div className="bg-[#031327] text-white rounded-md px-3 py-1">
                  12:35
                </div>
                <div className="bg-[#031327] text-white rounded-md px-3 py-1">
                  20:05
                </div>
                <div className="bg-[#031327] text-white rounded-md px-3 py-1">
                  21:05
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-[50px]">
            <div className="rounded-2xl overflow-hidden w-[400px] h-[500px] flex-shrink-0">
              <img
                src={Phim_2}
                alt="Phim 2"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-6 max-h-[500px] overflow-y-auto">
              <p className="text-3xl font-bold uppercase">
                SHIN CẬU BÉ BÚT CHÌ: BÍ ẨN! HỌC VIỆN HOA LỆ TENKASU
              </p>
              <div className="flex items-center gap-5">
                <p className="bg-[#031327] text-white rounded-3xl w-[32px] h-[32px] flex items-center justify-center px-6">
                  2D
                </p>
                <p className="bg-[#031327] text-white rounded-3xl w-[32px] h-[32px] flex items-center justify-center px-6">
                  P
                </p>
              </div>
              <div className="flex flex-col gap-7 text-xl">
                <p>
                  <span className="font-bold">Thể loại:</span> Hoạt hình, Phiêu
                  lưu, Gia đình.
                </p>
                <p>
                  <span className="font-bold">Đạo diễn:</span> Takashi Yamazaki.
                </p>
                <p>
                  <span className="font-bold">Diễn viên:</span> Megumi Ohara,
                  Nobuyo Oyama, Mari Mashiba.
                </p>
                <p>
                  <span className="font-bold">Nội dung:</span> Shin và nhóm bạn
                  khám phá bí ẩn tại Học viện Hoa Lệ Tenkasu, nơi những điều kỳ
                  diệu và phiêu lưu đầy bất ngờ đang chờ đón.
                </p>
              </div>
              <div className="grid grid-cols-7 gap-4">
                <div className="bg-[#BDBDBD] text-white rounded-md px-3 py-1">
                  09:00
                </div>
                <div className="bg-[#BDBDBD] text-white rounded-md px-3 py-1">
                  10:00
                </div>
                <div className="bg-[#BDBDBD] text-white rounded-md px-3 py-1">
                  11:20
                </div>
                <div className="bg-[#031327] text-white rounded-md px-3 py-1">
                  12:35
                </div>
                <div className="bg-[#031327] text-white rounded-md px-3 py-1">
                  14:05
                </div>
                <div className="bg-[#031327] text-white rounded-md px-3 py-1">
                  16:35
                </div>
                <div className="bg-[#031327] text-white rounded-md px-3 py-1">
                  19:45
                </div>
                <div className="bg-[#031327] text-white rounded-md px-3 py-1">
                  21:05
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieSchedule;
