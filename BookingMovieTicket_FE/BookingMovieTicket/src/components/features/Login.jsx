import React, { useState } from 'react'
import googleIcon from '../../assets/public/icons/google-icon.png'
import { Link } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <div className={`bg-login h-screen w-full bg-cover bg-center bg-no-repeat 
                flex items-center justify-center`}>
                <div className='w-[460px] h-[570px] bg-white flex items-star justify-star rounded-3xl p-8 flex-col'>
                    <p className='font-bold text-2xl mb-6'>Đăng nhập ngay!</p>
                    <form class="space-y-6">
                        <div>
                            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="your@email.com"
                                class="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                required
                            />
                        </div>
                        <div className='relative'>
                            <label for="password" class="block text-sm font-medium text-gray-700">Mật khẩu</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="********"
                                class="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
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
                    </form>
                    <Link to={"/forgetPassword"} className='text-[12px] text-[#BDBDBD] flex items-center justify-center my-5'>Quên mật khẩu?</Link>
                    <button className='bg-[#395F18] px-4 py-2 text-white font-bold text-[16px] w-full h-[55px] rounded-lg'>Bắt đầu</button>
                    <p className='font-bold text-[13px] flex items-center justify-center my-5'>Hoặc</p>
                    <div>
                        <button className='border-1 bg-white px-4 py-2 w-[380px] h-[48px] rounded-lg mb-5 flex items-center justify-center gap-3'>
                            <img src={googleIcon} className='w[18px] h-[18px]' />
                            <p className='text-[#616161] text-[13px]'>Đăng nhập với Google</p>
                        </button>
                    </div>
                    <p className='text-[16px] flex items-center justify-center gap-2'>Chưa có tài khoản? <Link to={"/register"}><span className='font-bold'> Đăng ký ngay </span></Link></p>
                </div>
            </div>
        </>
    )
}
