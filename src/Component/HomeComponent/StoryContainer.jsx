import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import StoryCard from './StoryCard';


const StoryContainer = () => {
    const [sortedStories, setSortedStories] = useState([]);
    const { data: marriages, isPending } = useQuery({
        queryKey: ['successStories'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/success-stories')
            return res.data;
        }
    });

     useEffect(() => {
        if (marriages && marriages.length > 0) {
            const sorted = [...marriages].sort(
                (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            );
            setSortedStories(sorted);
        }else{
            setSortedStories([])
        }
    }, [marriages]);

    if (isPending) {
        return <div className='text-center text-2xl font-bold'>Loading...</div>
    }

    

    if (marriages.length === 0) {
        return <div className='text-center text-2xl font-bold'>No Success Stories Found</div>
    }


    return (
        <div className='my-[100px] w-full'>
            <p className="text-center text-base font-bold secondary">Successful Stories</p>
            <h1 className='text-4xl font-bold text-center cursive mb-5'>Our Successful Marriage Stories</h1>
            {/* <div className="w-1/8 mx-auto"><Dropdown></Dropdown></div> */}

            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 p-5 w-10/12 mx-auto">
                {
                    sortedStories.map((singlemarriage, index) => (
                        <StoryCard
                            key={singlemarriage._id}
                            singlemarriage={singlemarriage}
                            index={index + 1}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default StoryContainer;