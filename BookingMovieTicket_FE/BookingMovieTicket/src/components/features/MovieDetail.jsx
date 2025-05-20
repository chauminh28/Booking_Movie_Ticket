import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import picture from "../../assets/public/images/phim-1.png"
import combo from "../../assets/public/images/CNS035_COMBO_GAU.png"


import { IoTime } from "react-icons/io5";
import { FaCalendar } from "react-icons/fa";

function MovieDetail() {
  const [showTicket, setShowTicket] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [countdown, setCountdown] = useState(300);


  const cols = 20;
  const rows = 10;

  const occupiedSeats = ["A2", "B1", "C3", "B2"];
  const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
    "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
    "U", "V", "W", "X", "Y", "Z"]

  const seatPrice = 65000;
  const comboPrice = 119000;
  const total = selectedSeats.length * seatPrice + quantity * comboPrice;

  useEffect(() => {
    if (selectedSeats.length === 0) {
      setCountdown(300)
      return
    }


    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [selectedSeats])

  const minutes = "0" + Math.floor(countdown / 60);
  const seconds = countdown % 60;
  const formatSeconds = seconds < 10 ? "0" + seconds : seconds

  const handleClick = () => {
    setShowTicket(!showTicket)
  }

  const toggleSeat = (seatID) => {

    if (occupiedSeats.includes(seatID)) return;

    setSelectedSeats((prev) => prev.includes(seatID) ? prev.filter((s) => s != seatID) : [...prev, seatID])
  }

  const renderSeats = () => {
    const seats = []
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const seatID = `${alphabet[i]}${j + 1}`

        const isSelected = selectedSeats.includes(seatID)
        const isOccupied = occupiedSeats.includes(seatID)

        seats.push(
          <div
            key={seatID}
            className={`
            w-10 h-10 flex items-center justify-center rounded-md text-sm cursor-pointer
            ${isOccupied ? 'bg-gray-500 cursor-not-allowed text-white' : ''}
            ${isSelected ? 'bg-green-500 text-white' : ''}
            ${!isOccupied && !isSelected ? 'bg-gray-200 hover:bg-gray-300' : ''}
          `}
            onClick={() => toggleSeat(seatID)}
          >
            {seatID}
          </div>
        )
      }
    }

    return seats
  }

  return (
    <>
      <div className='container mx-auto'>
        <div className='grid grid-cols-12'>
          <div className='col-span-3 mr-[52px]'>
            <img src={picture} className='rounded-2xl' />
          </div>
          <div className='col-span-9'>
            <p className='font-bold text-[35px]'>Thunderbolts: Biệt đội sấm sét</p>
            <div className='flex'>
              <div className='flex mr-5'>
                <IoTime className='flex items-center justify-center text-2xl mr-2 mt-1.5' />
                <p className='font-bold text-[25px] flex items-center justify-center'>126 phút</p>
              </div>
              <div className='flex'>
                <FaCalendar className='flex items-center justify-center text-2xl mr-2 mt-1.5' />
                <p className='font-bold text-[25px] flex items-center justify-centers'>01/04/2025</p>
              </div>
            </div>
            <div className='flex flex-col gap-5 mt-4 text-[25px]'>
              <p>
                <span className="font-bold">Quốc gia:</span> Lorem ipsum dolor
                sit amet.
              </p>
              <p>
                <span className="font-bold">Thể loại:</span> Lorem ipsum dolor
                sit amet.
              </p>
              <p>
                <span className="font-bold">Đạo diễn:</span> Lorem, ipsum
                dolor.
              </p>
              <p>
                <span className="font-bold">Diễn viên:</span> Lorem ipsum,
                dolor sit amet consectetur adipisicing elit. Distinctio,
                asperiores.
              </p>
              <p>
                <span className="font-bold">Nội dung:</span> Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Accusamus, delectus!
                Suscipit commodi, molestiae ipsam dolorem praesentium
                doloribus cupiditate voluptatem omnis quod saepe, voluptate
                unde illo alias porro et nihil, eius tempora laboriosam
                impedit fugiat? Provident inventore tempore ducimus nulla aut
                consectetur non eligendi tenetur sint doloremque, impedit
                quibusdam nam dolores.
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
            <button className='border border-1px border-black bg-white hover:bg-black hover:text-white w-[120px] rounded-2xl font-bold text-[20px] cursor-pointer'>
              <div >
                <p>19/05</p>
                <p>Thứ hai</p>
              </div>
            </button>
            <button className='border border-1px border-black bg-white hover:bg-black hover:text-white w-[120px] rounded-2xl font-bold text-[20px] cursor-pointer'>
              <div >
                <p>20/05</p>
                <p>Thứ ba</p>
              </div>
            </button>
            <button className='border border-black bg-white hover:bg-black hover:text-white w-[120px] rounded-2xl font-bold text-[20px] cursor-pointer'>
              <div >
                <p>21/05</p>
                <p>Thứ tư</p>
              </div>
            </button>
          </div>
          <div className="grid grid-cols-7 gap-4 mt-[20px] mb-8">
            <button className="bg-[#BDBDBD] text-white rounded-md px-3 py-3 text-center cursor-pointer" onClick={() => handleClick()}>
              09:00
            </button>
          </div>
        </div>

        {/* Đặt vé */}
        {showTicket && (
          <div className='container mt-[40px]'>
            <div className='container mx-auto mb-8'>
              <p className="text-[#031327] text-2xl font-bold">
                {" "}
                <span className="mr-2 border-l-4 border-l-[#031327]" />
                Chọn ghế
              </p>
            </div>
            <div className='flex items-center justify-center flex-col'>
              <div className='w-[610px] h-[40px] bg-gray-400 flex items-center justify-center mb-4'>
                MÀN HÌNH
              </div>
              <div className={"grid gap-2"} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
                {renderSeats()}
              </div>
              <div className='flex mt-5 gap-[80px] mb-8'>
                <div className='flex'>
                  <div className='w-10 h-10 flex items-center justify-center rounded-md text-sm cursor-pointer bg-gray-200 mr-2'></div>
                  <p className='flex justify-center items-center'>Ghế thường</p>
                </div>
                <div className='flex'>
                  <div className='w-10 h-10 flex items-center justify-center rounded-md text-sm cursor-pointer bg-gray-200'></div>
                  <div className='w-10 h-10 flex items-center justify-center rounded-md text-sm cursor-pointer bg-gray-200 mr-2'></div>
                  <p className='flex justify-center items-center'>Ghế đôi</p>
                </div>
                <div className='flex'>
                  <div className='w-10 h-10 flex items-center justify-center rounded-md text-sm cursor-pointer bg-gray-500 mr-2'></div>
                  <p className='flex justify-center items-center'>Ghế đã đặt</p>
                </div>
                <div className='flex'>
                  <div className='w-10 h-10 flex items-center justify-center rounded-md text-sm cursor-pointer bg-green-500 mr-2'></div>
                  <p className='flex justify-center items-center'>Ghế đã chọn</p>
                </div>
              </div>
            </div>

            <div className='container mx-auto mb-8'>
              <p className="text-[#031327] text-2xl font-bold">
                {" "}
                <span className="mr-2 border-l-4 border-l-[#031327]" />
                Chọn bắp nước
              </p>
              <div>
                <p className='text-center font-bold text-[20px] text-fuchsia-700'>COMBO 2 NGĂN</p>
                <div className='grid grid-cols-3 mt-4'>
                  <div className='col-span-1'>
                    <div className='flex gap-2'>
                      <div className=''>
                        <img src={combo} />
                      </div>
                      <div className=''>
                        <p className='font-bold text-2xl'>COMBO GẤU</p>
                        <p className='font-bold'>119,000 VND</p>
                        <div className='relative w-full h-[40px] bg-gray-200 rounded-2xl flex items-center justify-center'>
                          <p className=''>{quantity}</p>
                          <button className='absolute left-3 text-[20px] hover:bg-gray-500 hover:rounded-full h-8 w-8 flex justify-center items-center'
                            onClick={() => setQuantity(prev => Math.max(prev - 1, 0))}
                          >-</button>
                          <button className='absolute right-3 text-[20px] hover:bg-gray-500 hover:rounded-full h-8 w-8 flex justify-center items-center'
                            onClick={() => setQuantity(quantity + 1)}
                          >+</button>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="bg-[#0f172a] text-white mt-6 p-4 flex justify-between items-center rounded-md">
          <div>
            <p className="text-lg font-bold mb-1">Thunderbolts: Biệt đội sấm sét (T18) | 21:00</p>
            <p className="text-sm">Vé đã chọn: {selectedSeats.join(", ")}</p>
            {quantity > 0 && (
              <p className="text-sm mt-1">{quantity} x Combo Gấu</p>
            )}
          </div>

          <div className="flex items-center gap-6">
            <div className="bg-yellow-400 text-black font-bold text-center px-4 py-2 rounded-md">
              <p className="text-sm">Thời gian giữ vé:</p>
              <p className="text-xl">{minutes}:{formatSeconds}</p>
            </div>

            <div className="text-right">
              <p className="text-sm">Tạm tính</p>
              <p className="text-2xl font-bold text-yellow-400">{total.toLocaleString()} VND</p>
            </div>

            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-4 py-2 rounded-md">
              ĐẶT VÉ
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default MovieDetail