import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:8080",
    header: {
        "Content-Type": "application/json",
    }
})

export default axiosClient