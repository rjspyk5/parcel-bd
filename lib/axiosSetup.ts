import axios from "axios";

export const axiosPublic = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL })

export const axiosSecure = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL })


axiosSecure.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})