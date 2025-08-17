import React from 'react';
import Banner from '../../Component/HomeComponent/Banner';
import AllUserContainer from '../../Component/HomeComponent/AllUserContainer';
import HowItWorks from "../../Component/HomeComponent/HowItWorks"
import SuccessCounter from '../../Component/HomeComponent/SuccessCounter';
import StoryContainer from '../../Component/HomeComponent/StoryContainer';
import FAQ from '../../Component/HomeComponent/FAQ';
import PremiumBenefits from '../../Component/HomeComponent/PremiumBenefits';
import WhyChooseUs from '../../Component/HomeComponent/WhyChooseUs';

const Home = () => {
    return (
        <div className='min-h-screen w-full'>
            <Banner></Banner>
            <AllUserContainer></AllUserContainer>
            <HowItWorks></HowItWorks>
            <SuccessCounter></SuccessCounter>
            <StoryContainer></StoryContainer>
            <FAQ></FAQ>
            <PremiumBenefits></PremiumBenefits>
            <WhyChooseUs></WhyChooseUs>
        </div>
    );
};

export default Home;