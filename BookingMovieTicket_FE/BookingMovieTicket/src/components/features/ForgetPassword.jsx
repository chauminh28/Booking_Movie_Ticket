import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function ForgetPassword() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const inputs = useRef([]);

    const handleChange = (e, index) => {
        const value = e.target.value;

        if (value.length > 1) {
            e.target.value = value.charAt(0)
        }
        if (value && index < inputs.current.length - 1) {
            inputs.current[index + 1].focus()
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            inputs.current[index - 1].focus();
        }
    }

    const handleNextStep = () => {
        setStep(step + 1)
    }

    const handleEmailSubmit = () => {
        if (email === '') {
            setError("Email không được để trống")
            return
        }
        setError(null)
        handleNextStep()
    }

    const handleOtpSubmit = () => {
        const otpCode = inputs.current.map(input => input.value).join('');
        console.log(otpCode)

        if (otpCode != '1234') {
            setError("OTP sai")
            return
        }
        setError(null)
        handleNextStep()
    }

    const handlePasswordSubmit = () => {
        if (newPassword < 6) {
            setError("Mật khẩu phải từ 6 kí tự");
            return
        }
        setError(null)
        alert("Đăng lại mật khẩu thành công")
    }

    return (
        <>
            <div className="bg-login h-screen w-full bg-cover bg-center bg-no-repeat 
                flex items-center justify-center">
                <div className='w-[460px] h-[340px] bg-white rounded-3xl p-8'>
                    <p className='text-[23px] font-bold'>Quên mật khẩu</p>

                    {step === 1 && (
                        <>
                            <p className='text-[17px]'>Vui lòng cung cấp email đã đăng ký để khôi phục mật khẩu!</p>
                            <form className="space-y-4">
                                <div className='py-3'>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        id="email"
                                        placeholder="your@email.com"
                                        className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                        onChange={(e) => { setEmail(e.target.value) }}
                                        required
                                    />
                                </div>
                                <button className='bg-[#395F18] px-4 py-2 text-white font-bold text-[16px] w-full h-[55px] rounded-lg cursor-pointer'
                                    onClick={() => handleEmailSubmit()}>
                                    Tiếp tục
                                </button>

                                <Link
                                    className='pl-4  text-[16px] text-black flex items-star justify-star'
                                    to={"/login"}
                                >
                                    <IoIosArrowBack className='mt-1' /> Trở lại
                                </Link>
                            </form>
                            {error && <p className="text-red-500 mt-2">{error}</p>}
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <p className='text-[17px]'>Mã 4 chữ số đã được gửi đến email của bạn.
                                Bạn sẽ nhận được mã OTP trong vòng 60 giây.</p>
                            <div className='flex items-center justify-center gap-x-2 my-5'>
                                {[0, 1, 2, 3].map((i) => (
                                    <input
                                        className='w-[50px] h-[50px] bg-[#E3E3E3] rounded-xl focus:ring-2 focus: ring-blue-500 outline-none text-center gap-x-3'
                                        key={i}
                                        maxLength={1}
                                        ref={(el) => { inputs.current[i] = el }}
                                        onChange={(e) => handleChange(e, i)}
                                        onKeyDown={(e) => handleKeyDown(e, i)}
                                    />
                                ))}
                            </div>

                            <p className='text-[16px] flex items-center justify-center gap-2'>Chưa nhận được mã? <Link>
                                <span className='font-bold'> Gửi lại ngay </span></Link>
                            </p>
                            <button
                                className='bg-[#395F18] px-4 py-2 text-white font-bold text-[16px] w-full h-[55px] rounded-lg mt-5 cursor-pointer'
                                onClick={() => handleOtpSubmit()}
                            >
                                Tiếp tục
                            </button>
                            {error && <p className="text-red-500 mt-2">{error}</p>}
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <p className='text-[17px]'>Vui lòng nhập mật khẩu mới!</p>
                            <div className='my-6 relative'>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Mật khẩu</label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={newPassword}
                                    id="password"
                                    placeholder="********"
                                    className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                    onChange={(e) => { setNewPassword(e.target.value) }}
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
                            <button
                                className='bg-[#395F18] px-4 py-2 text-white font-bold text-[16px] w-full h-[55px] rounded-lg mt-6 cursor-pointer'
                                onClick={() => handlePasswordSubmit()}
                            >
                                Xác nhận
                            </button>
                            {error && <p className="text-red-500 mt-2">{error}</p>}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
