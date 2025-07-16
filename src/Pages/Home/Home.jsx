import React from 'react';
import Banner from '../../Component/HomeComponent/Banner';
import AllUserContainer from '../../Component/HomeComponent/AllUserContainer';
import HowItWorks from "../../Component/HomeComponent/HowItWorks"

const Home = () => {
    return (
        <div className='min-h-screen'>
            <Banner></Banner>
            <AllUserContainer></AllUserContainer>
            <HowItWorks></HowItWorks>
        </div>
    );
};

export default Home;