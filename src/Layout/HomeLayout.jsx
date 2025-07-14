import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Component/Shared/Navbar';

const HomeLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default HomeLayout;