import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL : "http://localhost:5200/api",
    withCredentials: true,
})