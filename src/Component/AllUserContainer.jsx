import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import SingleUserCard from './SingleUserCard';

const AllUserContainer = () => {
    const { isPending, error, data: users } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/user');
            return res.data;
        }
    })
    if (isPending) {
        return <div className='text-center text-2xl font-bold'>Loading...</div>}

    console.log(users);
    return (
        <div className='my-[100px]'>
            <p className="text-center text-base font-bold secondary">Members</p>
            <h1 className='text-4xl font-bold text-center cursive mb-5'>Our Premium Members</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5 w-10/12 mx-auto">
                {
                    users.map((singleuser,index) => <SingleUserCard key={singleuser._id} singleuser={singleuser} index={index+1}></SingleUserCard>)
                }
            </div>
        </div>
    );
};

export default AllUserContainer;