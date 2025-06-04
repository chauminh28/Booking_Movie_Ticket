import React, { use, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import combo from "../../assets/public/images/CNS035_COMBO_GAU.png"
import axiosClient from '../../api/axiosClient'
import axios from "axios";

function BookTicket(props) {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [products, setProducts] = useState([]);
    const [serviceTypes, setServiceTypes] = useState([]);
    const [countdown, setCountdown] = useState(300);
    const [quantities, setQuantities] = useState({});
    const [total, setTotal] = useState();

    console.log(quantities)

    const cols = props.room.cols
    const rows = props.room.rows

    const occupiedSeats = ["A2", "B1", "C3", "B2"];
    const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
        "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
        "U", "V", "W", "X", "Y", "Z"]

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

    useEffect(() => {
        axios
            .get(`http://localhost:8080/products`)
            .then((response) => {
                const data = response.data.content
                setProducts(data);
            })
            .catch((error) => {
                console.error("Lỗi fetch api service", error);
            });
    }, []);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/serviceTypes`)
            .then((response) => {
                setServiceTypes(response.data.content);
            })
            .catch((error) => {
                console.error("Lỗi fetch api serviceType", error);
            });
    }, []);

    const minutes = "0" + Math.floor(countdown / 60);
    const seconds = countdown % 60;
    const formatSeconds = seconds < 10 ? "0" + seconds : seconds


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

                <div className="container mx-auto mb-8">
                    <p className="text-[#031327] text-2xl font-bold">
                        <span className="mr-2 border-l-4 border-l-[#031327]" />
                        Chọn bắp nước
                    </p>

                    {serviceTypes.map((type) => (
                        <div key={type.id} className="mb-6">
                            <p className="text-center font-bold text-[20px] text-fuchsia-700 mt-4">{type.name}</p>
                            <div className="grid grid-cols-3 gap-6 mt-4">
                                {products
                                    .filter(service => service.serviceTypeId === type.id)
                                    .map(service => (
                                        <div key={service.id} className="col-span-1">
                                            <div className="flex gap-4">
                                                <div className="w-[100px] h-[100px]">
                                                    <img src={service.image} alt={service.serviceName} className="w-full h-full object-cover rounded-xl" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-xl">{service.serviceName}</p>
                                                    <p className="font-bold">{service.price.toLocaleString()} VND</p>
                                                    <div className="relative w-[120px] h-[40px] bg-gray-200 rounded-2xl flex items-center justify-center mt-2">
                                                        <p>{quantities[service.id] || 0}</p>
                                                        <button
                                                            className="absolute left-2 text-[20px] hover:bg-gray-500 hover:rounded-full h-8 w-8 flex justify-center items-center"
                                                            onClick={() =>
                                                                setQuantities(prev => ({
                                                                    ...prev,
                                                                    [service.id]: Math.max((prev[service.id] || 0) - 1, 0)
                                                                }))
                                                            }
                                                        >-</button>
                                                        <button
                                                            className="absolute right-2 text-[20px] hover:bg-gray-500 hover:rounded-full h-8 w-8 flex justify-center items-center"
                                                            onClick={() =>
                                                                setQuantities(prev => ({
                                                                    ...prev,
                                                                    [service.id]: (prev[service.id] || 0) + 1
                                                                }))
                                                            }
                                                        >+</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            <div className="bg-[#0f172a] text-white mt-6 p-4 flex justify-between items-center rounded-md">
                <div>
                    <p className="text-lg text-white font-bold mb-1">{props.movie.movie.movieName}</p>
                    <p>{props.schedule.date + " | " + props.schedule.showtimes[props.showtime]}</p>
                    <p className="text-sm">Vé đã chọn: {selectedSeats.join(", ")}</p>
                    <p className='text-sm'>Dịch vụ đã chọn:</p>
                    {Object.entries(quantities)
                        .filter(([_, quantity]) => quantity > 0)
                        .map(([id, quantity]) => {
                            const service = products.find(s => s.id === parseInt(id));
                            return (
                                <p key={id} className="text-sm">
                                    {service?.serviceName} x{quantity}
                                </p>
                            );
                        })}
                </div>

                <div className="flex items-center gap-6">
                    <div className="bg-yellow-400 text-black font-bold text-center px-4 py-2 rounded-md">
                        <p className="text-sm">Thời gian giữ vé:</p>
                        <p className="text-xl">{minutes}:{formatSeconds}</p>
                    </div>

                    <div className="text-right">
                        <p className="text-sm">Tạm tính</p>
                        <p className="text-2xl font-bold text-yellow-400">275.000 VND</p>
                    </div>

                    <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-4 py-2 rounded-md">
                        ĐẶT VÉ
                    </button>
                </div>
            </div>
        </>
    )
}

export default BookTicket