import React, { useEffect } from 'react'
import { useState } from 'react'
import googleIcon from '../../assets/public/icons/google-icon.png'
import { Link } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { initFlowbite } from 'flowbite'

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    initFlowbite();
  }, [])

  return (
    <>
      <div className="bg-login h-screen w-full bg-cover bg-center bg-no-repeat 
                flex items-center justify-center">
        <div className='px-1 grid grid-cols-2 gap-6'>
          <div id="default-carousel" className="relative w-full h-[400px] mt-[100px]" data-carousel="slide">
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
              <div className="hidden duration-700" data-carousel-item>
                <div className='absolute w-full flex items-center justify-center flex-col h-full'>
                  <p className="text-white text-xl font-bold">Chào mừng bạn đến với Cinestar!</p>
                  <p className="text-white">Sẵn sàng để đặt vé và thưởng thức phim bom tấn?</p>
                </div>
              </div>
              <div className="hidden duration-700" data-carousel-item>
                <div className='absolute w-full flex items-center justify-center flex-col h-full'>
                  <p className="text-white text-xl font-bold">Đừng bỏ lỡ suất chiếu yêu thích!</p>
                  <p className="text-white">Đăng ký ngay để trải nghiệm điện ảnh tiện lợi.</p>
                </div>
              </div>
              <div className="hidden duration-700" data-carousel-item>
                <div className='absolute w-full flex items-center justify-center flex-col h-full'>
                  <p className="text-white text-xl font-bold">Tạo tài khoản ngay!</p>
                  <p className="text-white">Đặt vé dễ dàng, chọn ghế đẹp và nhận ưu đãi.</p>
                </div>
              </div>
            </div>
            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
              <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
              <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
              <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
            </div>
            <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
                </svg>
                <span className="sr-only">Previous</span>
              </span>
            </button>
            <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                </svg>
                <span className="sr-only">Next</span>
              </span>
            </button>
          </div>
          <div className='w-[460px] h-full bg-white rounded-3xl p-8 flex-col'>
            <p className='font-bold text-[23px] mb-1'>Bắt đầu ngay!</p>
            <p className='text-[22px] mb-2'>Tạo tài khoản mới</p>
            <form className="space-y-6">
              <div>
                <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">Họ và tên</label>
                <input
                  type="text"
                  id="fullname"
                  placeholder="Họ và tên"
                  className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  required
                />
              </div>
              <div>
                <label htmlFor="Phone" className="block text-sm font-medium text-gray-700">Điện thoại</label>

                <input
                  type="text"
                  id="Phone"
                  placeholder="Số điện thoại"
                  className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  required

                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="your@email.com"
                  className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  required
                />
              </div>
              <div className='relative'>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mật khẩu</label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="********"
                  className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-[50px] right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>
              <button className='bg-[#395F18] px-4 py-2 text-white font-bold text-[16px] w-full h-[55px] rounded-lg mt-5 cursor-pointer'>Bắt đầu</button>
            </form>
            <p className='font-bold text-[13px] flex items-center justify-center my-3'>Hoặc</p>
            <div>
              <button className='border-1 bg-white px-4 py-2 w-full h-[48px] rounded-lg mb-2 flex items-center justify-center gap-3'>
                <img src={googleIcon} className='w[18px] h-[18px]' />
                <p className='text-[#616161] text-[13px]'>Đăng ký với Google</p>
              </button>
            </div>
            <p className='text-[16px] flex items-center justify-center gap-2'>Đã có tài khoản? <Link to={"/login"}><span className='font-bold'> Đăng nhập ngay </span></Link></p>
          </div>
        </div>
      </div>
    </>
  )
}