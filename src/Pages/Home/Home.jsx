import React from 'react';
import Banner from '../../Component/Banner';
import AllUserContainer from '../../Component/AllUserContainer';

const Home = () => {
    return (
        <div className='min-h-screen'>
            <Banner></Banner>
            <AllUserContainer></AllUserContainer>
        </div>
    );
};

export default Home;