import React, { useEffect } from 'react'
import { useState } from 'react'
import googleIcon from '../../assets/public/icons/google-icon.png'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axiosClient from '../../api/axiosClient'
import { initFlowbite } from 'flowbite'
import SuccessToast from '../../components/toasts/SuccessToast';
import ErrorToast from '../../components/toasts/ErrorToast';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorToast, setErrorShowToast] = useState(false);
  const [successMessage, setSuccesMessage] = useState('');
  const [showSuccessToast, setSuccessShowToast] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userName: '',
    lastName: '',
    firstName: '',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    password: '',
    rePassword: '',
    status: true,
    roleId: 2
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value
    })
    console.log(form)
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (form.password !== form.rePassword) {
      setErrorMessage("Hai mật khẩu không khớp")
      setErrorShowToast(true)
      return
    }

    if (!form.userName.trim()) {
      newErrors.userName = "Vui lòng nhập tên đăng nhập"
    }
    if (!form.lastName.trim()) {
      newErrors.lastName = "Vui lòng nhập họ đệm"
    }
    if (!form.firstName.trim()) {
      newErrors.firstName = "Vui lòng nhập tên"
    }
    if (!form.dob.trim()) {
      newErrors.dob = "Vui lòng nhập ngày sinh"
    }
    if (!form.gender.trim()) {
      newErrors.gender = "Vui lòng nhập giới tính"
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại"
    }
    if (!form.email.trim()) {
      newErrors.email = "Vui lòng nhập email"
    }
    if (!form.password.trim()) {
      newErrors.password = "Vui lòng nhập mật khẩu"
    }
    if (!form.rePassword.trim()) {
      newErrors.rePassword = "Vui lòng nhập lại mật khẩu"
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    const { rePassword, ...payload } = form

    try {
      const res = await axiosClient.post("/users", payload)
      setSuccesMessage("Đăng ký thành công")
      setSuccessShowToast(true)

      navigate("/userManager")
    } catch (err) {
      console.log(err)
      setErrorMessage("Lỗi api")
      setErrorShowToast(true)
    }
  }

  useEffect(() => {
    initFlowbite();
  }, [])


  return (
    <>
      {showSuccessToast && (
        <SuccessToast
          message={successMessage}
          onClose={() => setSuccessShowToast(false)}
        />
      )}

      {showErrorToast && (
        <ErrorToast
          message={errorMessage}
          onClose={() => setErrorShowToast(false)}
        />
      )}
      <div className="bg-login h-screen w-full bg-cover bg-center bg-no-repeat 
                flex items-center justify-center">
        <div className='px-1 grid grid-cols-2'>
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
          <div className='w-[460px] h-full max-h-[90vh] bg-white rounded-2xl p-6 flex flex-col overflow-y-auto'>
            <p className='text-[22px] mb-2'>Tạo tài khoản mới</p>
            <form className="space-y-6" onSubmit={handleRegister}>
              <div>
                <label htmlFor="userName" className="block text-sm font-medium text-gray-700">Username <span className="text-red-600">*</span></label>
                <input
                  type="text"
                  id="userName"
                  value={form.userName}
                  onChange={handleChange}
                  placeholder="Username"
                  className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  required
                />
                <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                  {errors.userName || ""}
                </p>
              </div>
              <div className='flex gap-3'>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Họ và tên đệm <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Họ"
                    className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    required
                  />
                  <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                    {errors.lastName || ""}
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tên <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="Tên"
                    className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    required
                  />
                  <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                    {errors.firstName || ""}
                  </p>
                </div>
              </div>
              <div className='flex gap-3'>
                <div className="w-1/2">
                  <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                    Ngày sinh <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    id="dob"
                    value={form.dob}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    required
                  />
                  <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                    {errors.dob || ""}
                  </p>
                </div>
                <div className="w-1/2">
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                    Giới tính <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    required
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="NAM">Nam</option>
                    <option value="NU">Nữ</option>
                  </select>
                  <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                    {errors.gender || ""}
                  </p>
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Điện thoại <span className="text-red-600">*</span></label>

                <input
                  type="text"
                  id="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Số điện thoại"
                  className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  required
                />
                <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                  {errors.phone || ""}
                </p>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email <span className="text-red-600">*</span></label>
                <input
                  type="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  required
                />
                <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                  {errors.email || ""}
                </p>
              </div>
              <div className='relative'>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mật khẩu <span className="text-red-600">*</span></label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="********"
                  className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  required
                />
                <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                  {errors.password || ""}
                </p>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-[50px] right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>
              <div className='relative'>
                <label htmlFor="rePassword" className="block text-sm font-medium text-gray-700">Nhập lại mật khẩu <span className="text-red-600">*</span></label>
                <input
                  type={showRePassword ? "text" : "password"}
                  id="rePassword"
                  value={form.rePassword}
                  onChange={handleChange}
                  placeholder="********"
                  className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  required
                />
                <p className="text-red-600 text-sm mt-1 min-h-[20px]">
                  {errors.rePassword || ""}
                </p>
                <button
                  type="button"
                  onClick={() => setShowRePassword(!showRePassword)}
                  className="absolute top-[50px] right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                >
                  {showRePassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>
              <button type='submit' className='bg-[#395F18] px-4 py-2 text-white font-bold text-[16px] w-full h-[55px] rounded-lg mt-2 cursor-pointer'>Bắt đầu</button>
            </form>
            <p className='font-bold text-[13px] flex items-center justify-center my-1'>Hoặc</p>
            <button className='border-1 bg-white px-4 py-2 w-full h-[48px] rounded-lg mb-1 flex items-center justify-center gap-2'>
              <img src={googleIcon} className='w-[18px] h-[18px]' />
              <p className='text-[#616161] text-[13px]'>Đăng ký với Google</p>
            </button>
            <p className='text-[16px] flex items-center justify-center gap-2'>
              Đã có tài khoản? <Link to={"/login"}><span className='font-bold'> Đăng nhập ngay </span></Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

