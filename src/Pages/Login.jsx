import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import bg1 from "../assets/loginbg.png";
import bg2 from "../assets/form.jpg"
import { Link, useLocation, useNavigate } from 'react-router';
import { ContextAPI } from '../Component/ContextAPI/AuthProvider';
import Swal from 'sweetalert2'
import useAxios from '../Component/Hooks/useAxios';
const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInUser, signUpWithGoogle } = useContext(ContextAPI);
    const axiosInstance = useAxios();
    const navigate = useNavigate();
    const location = useLocation();
    const onSubmit = (data) => {
        signInUser(data.email, data.password)
            .then((res) => {
                const user = res.user;
                
                if (user) {
                    Swal.fire({
                        title: "Login Done Successfully",
                        icon: "success",
                        draggable: true
                    }).then(() => {
                        navigate(location?.state || '/')
                    })
                }
            })
            .catch((error) => {
                const errorMessage = error.message;
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: errorMessage,
                }).then(() => {
                    navigate('/auth/login');    
                });
            });
    }
    const handleGoogle = () => {
        signUpWithGoogle()
            .then(async(res) => {
                const user = res.user;
                if (user) {
                    const userInfo = {
                    name: user?.displayName,
                    email: user?.email,
                    role: 'user',
                    createdAt: new Date().toISOString(),
                    last_log_in: new Date().toISOString()
                }
                 
                 const userInfo2 = {
                    name: user?.displayName,
                    contactEmail: user?.email,
                }
                console.log("This is the login info,",userInfo2)
                const res = await axiosInstance.post('/registereduser', userInfo);
                const Res2 = await axiosInstance.post('/alluser', userInfo2);
                console.log("user updated info",res.data);
                console.log("user updated info",Res2.data);
                if (res && Res2) {
                    Swal.fire({
                        title: "Login Done Successfully",
                        icon: "success",
                        draggable: true
                    }).then(() => {
                        navigate(location?.state || '/');
                    });
                }
            }
            })
            .catch((error) => {
                const errorMessage = error.message;
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: errorMessage,
                }).then(() => {
                    navigate('/auth/login');
                })
            });
    }
    return (
        <div className='bg-[#fce7e4a9] w-full py-[200px] md:px-0 lg:px-[100px]'>
            <h1 className='text-4xl lg:text-7xl font-bold text-center text-gray-700 cursive mb-5'>Login Here and Start Your Journey</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mx-auto">
                <div className="flex items-center justify-center w-11/12  mx-auto">
                    <div style={{ backgroundImage: `url(${bg2})` }} className="md:w-[600px] lg:w-[600px] lg:h-[600px] mx-auto rounded-full p-2 md:p-5 lg:p-5">
                        {/* form */}
                        <div className="loginbg rounded-full p-[60px] w-full h-full">
                            <h1 className='text-4xl lg:text-7xl font-bold text-center text-white cursive lg:mb-5'>Login</h1>
                            <form onSubmit={handleSubmit(onSubmit)} className="">

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

                                <button type="submit" className="text-white primary hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Submit</button><br />

                                <p className='text-white cursive text-2xl'>Not Registered Yet? </p><br />
                                <Link to="/auth/register" className=" bg-blue-700 font-bold text-white p-2 rounded-xl hover:bg-white hover:text-blue-700 m-4">Registration</Link>

                                <button onClick={handleGoogle} type="button" className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 m-4">
                                    <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                                        <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd" />
                                    </svg>
                                    Sign in with Google
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center m-4">
                    <img className="lg:w-[500px] lg:h-[600px] object-center mx-auto rounded-full" src={bg1} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Login;