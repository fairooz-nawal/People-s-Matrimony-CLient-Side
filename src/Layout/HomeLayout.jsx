import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Component/Shared/Navbar';
import Footer from '../Component/Shared/Footer';

const HomeLayout = () => {
    return (
        <div className='max-w-full md:max-w-7xl lg:max-w-[1600px] mx-auto'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default HomeLayout;