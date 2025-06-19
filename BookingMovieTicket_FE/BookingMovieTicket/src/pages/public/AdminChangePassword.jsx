import React from 'react'
import HeaderAdmin from '../../components/layouts/HeaderAdmin'
import NavbarAdmin from '../../components/layouts/NavbarAdmin'
import ChangePassword from '../../components/features/ChangePassword'

function AdminChangePassword() {
    return (
        <div className="grid grid-cols-12">
            <div className="col-span-2">
                <NavbarAdmin />
            </div>
            <div className='col-span-10'>
                <div className="bg-white col-span-10 h-[100vh] p-[30px]">
                    <HeaderAdmin />
                    <ChangePassword />
                </div>
            </div>
        </div>
    )
}

export default AdminChangePassword