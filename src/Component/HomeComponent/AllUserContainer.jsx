import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import SingleUserCard from './SingleUserCard';
import Dropdown from './Dropdown';
import { useContext } from 'react';
import { ContextAPI } from '../ContextAPI/AuthProvider';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const AllUserContainer = () => {
    const { selectedByAge } = useContext(ContextAPI);
    const axiosSecure = useAxiosSecure();
    const { data: premiumUsers, isPending, error, } = useQuery({
        queryKey: ['registeredUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/premiumRegisterduser');
            return res.data;
        }
    })

    if (isPending) {
        return <div className='text-center text-2xl font-bold'>Loading...</div>
    }

    if (error) {
        return <div className='text-center text-2xl font-bold'>Error: {error.message}</div>
    }

    if (!premiumUsers) return <div className='text-center text-2xl font-bold'>No Premium User Found</div>


    return (
        <div className='my-[100px] w-full'>
            <p className="text-center text-base font-bold secondary">Members</p>
            <h1 className='text-4xl font-bold text-center cursive mb-5'>Our Premium Members</h1>
            <div className="w-1/8 mx-auto"><Dropdown premiumUsers={premiumUsers}></Dropdown></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5 lg:w-11/12 mx-auto">
                {
                    selectedByAge.length == 0 ? (
                   premiumUsers.map((singleuser, index) => (
                        <SingleUserCard
                            key={singleuser._id}
                            singleuser={singleuser}
                            index={index + 1}
                        />
                        ))) : (selectedByAge.map((singleuser, index) => (
                        <SingleUserCard
                            key={singleuser._id}
                            singleuser={singleuser}
                            index={index + 1} 
                         />)))
                    

                }
            </div>
        </div>
    );
};

export default AllUserContainer;