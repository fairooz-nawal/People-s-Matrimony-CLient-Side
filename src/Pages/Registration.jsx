import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import bg1 from "../assets/loginbg.png";
import bg2 from "../assets/form.jpg"
import { Link } from 'react-router';
import { ContextAPI } from '../Component/ContextAPI/AuthProvider';
import Swal from 'sweetalert2'
import axios from 'axios';
import useAxios from '../Component/Hooks/useAxios';
const Registration = () => {
    const axiosInstance = useAxios();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser} = useContext(ContextAPI);
    const onSubmit = (data) => {
        console.log(data);
        createUser(data.email, data.password)
            .then(async (res) => {
                console.log(res);
                const user = res.user;
                const userInfo = {
                    name: data.name,
                    email: data.email,
                    role: 'user',
                    createdAt: new Date().toISOString(),
                    last_log_in: new Date().toISOString()
                }

                const userInfo2 = {
                    name: data.name,
                    contactEmail: data.email,
                }

                const userRes = await axiosInstance.post('/registereduser', userInfo);
                const userRes2 = await axiosInstance.post('/alluser', userInfo2);
                console.log("Registration table",userRes.data)
                console.log("User table",userRes2.data)
               
                if (user && userRes && userRes2) {
                    Swal.fire({
                        title: "Registration Done Successfully",
                        icon: "success",
                        draggable: true
                    });
                }
            })
            .catch((error) => {
                const errorMessage = error.message;
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: errorMessage,
                });
            });
    }
    return (
        <div className='bg-[#fce7e4a9] w-full py-[150px] md:px-0 lg:px-[100px] '>
            <h1 className='text-4xl lg:text-7xl font-bold text-center text-gray-700 cursive mb-5'>Registration Here and Start Your Journey</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mx-auto p-4">
                <div className="flex items-center justify-center w-11/12  mx-auto">
                    <div style={{ backgroundImage: `url(${bg2})` }} className="w-full h-[650px] md:w-[650px] lg:w-[650px] lg:h-[700px] mx-auto rounded-full p-2 md:p-5 lg:p-5">
                        {/* form */}
                        <div className="loginbg rounded-full p-[40px] md:p-[60px] w-full h-full">
                            <h1 className='text-3xl lg:text-7xl font-bold text-center text-white cursive lg:mb-5'>Registration</h1>
                            <form onSubmit={handleSubmit(onSubmit)} className="">
                                {/* Name */}
                                <div className="mb-5">
                                    <label className="block mb-2 text-sm font-medium text-white">Your Name</label>

                                    <input type="name" {...register("name", { required: true })} className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter Your Name " />
                                    {errors.name?.type === "required" && <p className="text-red-500 text-sm">Name is required</p>}

                                </div>
                                {/* email */}
                                <div className="mb-5">
                                    <label className="block mb-2 text-sm font-medium text-white">Your email</label>

                                    <input type="email"  {...register("email", { required: "Email is required" })} className="border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@flowbite.com" />
                                    {errors.email && <p className='text-red-500 text-sm'>{errors.email?.message}</p>}
                                </div>
                                {/* password */}
                                <div className="mb-5">
                                    <label className="block mb-2 text-sm font-medium text-white">Your password</label>

                                    <input type="password" {...register("password", { required: true, minLength: 6, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ })} className=" border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter your password" />

                                    {errors.password?.type === "required" && <p className='text-red-500 text-sm'>Password is Required</p>}
                                    {errors.password?.type === "minLength" && <p className='text-red-500 text-sm'>Password must be at least 6 characters long</p>}
                                    {errors.password?.type === "pattern" && <p className='text-red-500 text-sm'>Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.</p>}
                                </div>
                                {/* photo */}
                                <div className="mb-5">
                                    <label className="block mb-2 text-sm font-medium text-white">Your Photo</label>
                                    <input type="photo" {...register("photo", { required: true })} className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter your photo" />
                                    {errors.photo?.type === "required" && <p className='text-red-500 text-sm'>Photo is Required</p>}
                                </div>

                                <button type="submit" className="text-white primary hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Submit</button><br />

                                <p className='text-white cursive text-2xl mb-4'>Already Registered? </p>
                                <div className="ml-10 w-[70px]">
                                    <Link to="/auth/login" className=" bg-blue-700 text-white p-2 rounded-xl hover:bg-white hover:text-blue-700">Login</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <img className="lg:w-[500px] lg:h-[600px] object-center mx-auto rounded-full" src={bg1} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Registration;