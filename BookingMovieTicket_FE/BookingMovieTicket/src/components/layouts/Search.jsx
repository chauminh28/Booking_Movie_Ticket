import React from 'react'

import { CiSearch } from "react-icons/ci";

export default function Search() {
    return (
        <>
            <div className='relative w-[576px]'>
                <input
                    className='w-[576px] h-[50px] outline-none rounded-xl border-[#BDC5D4] border-[2px] px-3 py-2'
                    placeholder='Tìm kiếm phòng chiếu'
                />
                <CiSearch className='absolute top-[16px] right-[20px]' />
            </div>
        </>
    )
}
