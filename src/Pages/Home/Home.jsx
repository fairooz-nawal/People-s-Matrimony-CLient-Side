import React from 'react';
import Banner from '../../Component/HomeComponent/Banner';
import AllUserContainer from '../../Component/HomeComponent/AllUserContainer';
import HowItWorks from "../../Component/HomeComponent/HowItWorks"
import SuccessCounter from '../../Component/HomeComponent/SuccessCounter';

const Home = () => {
    return (
        <div className='min-h-screen'>
            <Banner></Banner>
            <AllUserContainer></AllUserContainer>
            <HowItWorks></HowItWorks>
            <SuccessCounter></SuccessCounter>
        </div>
    );
};

export default Home;