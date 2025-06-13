import React, { use, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import combo from "../../assets/public/images/CNS035_COMBO_GAU.png"
import axiosClient from '../../api/axiosClient'
import axios from "axios";

function BookTicket(props) {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedSeatIds, setSelectedSeatIds] = useState([]);
    const [products, setProducts] = useState([]);
    const [serviceTypes, setServiceTypes] = useState([]);
    const [countdown, setCountdown] = useState(300);
    const [quantities, setQuantities] = useState({});
    const [maxColumn, setMaxColumn] = useState(0);
    const [seatMaps, setSeatMaps] = useState({});
    const [seats, setSeats] = useState([]);
    const [seatType, setSeatType] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/seats/${props.room.id}`)
            .then((response) => {
                setSeats(response.data);
            })
            .catch((error) => {
                console.error("Lỗi fetch api seats", error);
            });
    }, [props.room.id]);

    useEffect(() => {
        axios
            .get("http://localhost:8080/seatTypes")
            .then((response) => {
                setSeatType(response.data.content);
            })
            .catch((error) => {
                console.error("Lỗi fetch api seat types", error);
            });
    }, []);

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


    const toggleSeat = (seat) => {
        const isSelected = selectedSeats.includes(seat.seatNumber);
        const price = seatType.find(type => type.seatTypeName === seat.seatTypeName)?.price || 0;

        if (isSelected) {
            setSelectedSeats(prev => prev.filter(s => s !== seat.seatNumber));
            setSelectedSeatIds(prev => prev.filter(id => id !== seat.seatId));
            setTotal(prev => prev - price);
        } else {
            setSelectedSeats(prev => [...prev, seat.seatNumber]);
            setSelectedSeatIds(prev => [...prev, seat.seatId]);
            setTotal(prev => prev + price);
        }
    };

    useEffect(() => {
        const seatMap = {};
        let maxCol = 0;
        seats.forEach((seat) => {
            const row = seat.seatRow;
            const column = seat.seatCol;
            if (!seatMap[row]) {
                seatMap[row] = [];
            }
            seatMap[row][column - 1] = seat;
            if (column > maxCol) {
                maxCol = column;
            }
        });
        console.log("Seat Map:", seatMap);
        console.log("Seats:", seats);
        setSeatMaps(seatMap);
        setMaxColumn(maxCol);
    }, [seats]);
    const getSeatColor = (type) => {
        switch (type) {
            case "VIP":
                return "bg-yellow-400";
            case "Standard":
                return "bg-blue-300";
            case "Couple":
                return "bg-pink-400";
            default:
                return "bg-gray-300";
        }
    };

    const renderSeats = () => {
        const rows = Object.keys(seatMaps).sort(); // A → H

        return rows.map((row) => {
            const columns = seatMaps[row];
            return (
                <div key={row} className="flex items-center mb-2">
                    <div className="w-6 mr-2">{row}</div>
                    {Array.from({ length: maxColumn }).map((_, colIndex) => {
                        const seat = columns[colIndex];

                        return seat ? (
                            <div
                                key={seat.seatId}
                                className={`w-10 h-10 m-1 flex items-center justify-center rounded 
                                    ${selectedSeats.includes(seat.seatNumber) ? "bg-green-500" : getSeatColor(seat.seatTypeName)}
                                    text-white cursor-pointer`}
                                onClick={() => toggleSeat(seat)}
                            >
                                {seat.seatNumber}
                            </div>
                        ) : (
                            <div
                                key={`empty-${row}-${colIndex}`}
                                className="w-10 h-10 m-1 bg-transparent"
                            ></div>
                        );
                    })}
                </div>
            );
        });
    };
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
                    <div className="w-[610px] h-[40px] bg-gray-400 flex items-center justify-center mb-4">
                        MÀN HÌNH
                    </div>

                    <div>{renderSeats()}</div>
                    <div className='flex mt-5 gap-[80px] mb-8'>
                        <div className="flex">
                            <div className="w-10 h-10 flex items-center justify-center rounded-md text-sm cursor-pointer bg-blue-300 mr-2"></div>
                            <p className="flex justify-center items-center">
                                Ghế thường
                            </p>
                        </div>
                        <div className="flex">
                            <div className="w-10 h-10 flex items-center justify-center rounded-md text-sm cursor-pointer bg-pink-400 mr-2"></div>
                            <p className="flex justify-center items-center">
                                Ghế đôi
                            </p>
                        </div>
                        <div className="flex">
                            <div className="w-10 h-10 flex items-center justify-center rounded-md text-sm cursor-pointer bg-yellow-400 mr-2"></div>
                            <p className="flex justify-center items-center">
                                Ghế VIP
                            </p>
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
                                                            onClick={() => {
                                                                setQuantities(prev => ({
                                                                    ...prev,
                                                                    [service.id]: Math.max((prev[service.id] || 0) - 1, 0)
                                                                }))
                                                                setTotal(prevTotal => prevTotal - service.price);
                                                            }}
                                                        >-</button>
                                                        <button
                                                            className="absolute right-2 text-[20px] hover:bg-gray-500 hover:rounded-full h-8 w-8 flex justify-center items-center"
                                                            onClick={() => {
                                                                setQuantities(prev => ({
                                                                    ...prev,
                                                                    [service.id]: (prev[service.id] || 0) + 1
                                                                }))
                                                                setTotal(prevTotal => prevTotal + service.price);
                                                            }}
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
                    <p>{props.schedule.scheduleDate + " | " + props.schedule.showtimes[props.showtime]}</p>
                    <p className="text-sm">Vé đã chọn: {(selectedSeats).join(", ")}</p>
                    <p className='text-sm'>
                        Dịch vụ đã chọn: {
                            Object.entries(quantities)
                                .filter(([_, quantity]) => quantity > 0)
                                .map(([id, quantity]) => {
                                    const service = products.find(s => s.id === parseInt(id));
                                    return service ? `${service.serviceName} x${quantity}` : '';
                                })
                                .join(', ')
                        }
                    </p>
                </div>

                <div className="flex items-center gap-6">
                    <div className="bg-yellow-400 text-black font-bold text-center px-4 py-2 rounded-md">
                        <p className="text-sm">Thời gian giữ vé:</p>
                        <p className="text-xl">{minutes}:{formatSeconds}</p>
                    </div>

                    <div className="text-right">
                        <p className="text-sm">Tạm tính</p>
                        <p className="text-2xl font-bold text-yellow-400">{total.toLocaleString()}</p>
                    </div>

                    <Link to="/checkout" state={{
                        selectedSeats,
                        selectedSeatIds,
                        serviceQuantities: quantities,
                        totalPrice: total,
                        scheduleId: props.schedule.id,
                        showTimeId: props.showtime,
                        roomId: props.room.id
                    }}>
                        <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-4 py-2 rounded-md cursor-pointer">
                            ĐẶT VÉ
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default BookTicket