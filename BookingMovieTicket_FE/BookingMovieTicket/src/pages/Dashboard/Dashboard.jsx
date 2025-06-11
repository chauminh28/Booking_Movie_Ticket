import React, { useEffect, useState } from 'react'
import HeaderAdmin from "../../components/layouts/HeaderAdmin";
import NavbarAdmin from "../../components/layouts/NavbarAdmin";
import { jwtDecode } from 'jwt-decode';

function Dashboard() {
    const [username, setUsername] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode(token);
            setUsername(decoded.sub);
        }
    }, []);

    return (
        <>
            <div className="grid grid-cols-12">
                <div className="col-span-2">
                    <NavbarAdmin />
                </div>
                <div className="col-span-10">
                    <div className="bg-white h-[100vh] p-[10px]">
                        <div className="flex">
                            <HeaderAdmin />
                        </div>
                        {username && (
                            <div>
                                Xin chào, {username}
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Dashboard