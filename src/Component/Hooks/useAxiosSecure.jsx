import axios from 'axios';
import React, { useContext } from 'react';
import { ContextAPI } from '../ContextAPI/AuthProvider';

 const axiosSecure = axios.create({
        baseURL: 'http://localhost:5000'
    })
const useAxiosSecure = () => {
    const {users} = useContext(ContextAPI);
    axiosSecure.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${users?.accessToken}`;
        return config;
    },error => {
        return Promise.reject(error);
    })
    return axiosSecure;
};

export default useAxiosSecure;