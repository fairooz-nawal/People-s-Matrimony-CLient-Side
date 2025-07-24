import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://peoples-matrimony-server.vercel.app",
});

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;