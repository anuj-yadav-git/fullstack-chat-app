import  axios from "axios"

//creating an instance to avoid repeated config on every use
//Instead of writing axios.get(...) every time, 
//you can do: axiosInstance.get(...) with config already baked in

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api": "/api",
    withCredentials: true, //this is how we send cookies in every single request
})