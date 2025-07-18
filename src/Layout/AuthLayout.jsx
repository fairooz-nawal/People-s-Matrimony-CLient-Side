import React from 'react';
import Registration from '../Pages/Registration';
import Navbar from '../Component/Shared/Navbar';
import Footer from '../Component/Shared/Footer';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='max-w-full md:max-w-7xl lg:max-w-[1600px] mx-auto'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default AuthLayout;