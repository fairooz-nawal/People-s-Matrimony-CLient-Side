import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import SingleUserCard from './SingleUserCard';
import Dropdown from './Dropdown';
import { useContext } from 'react';
import { ContextAPI } from '../ContextAPI/AuthProvider';

const AllUserContainer = () => {
    const { selected, sortUsersByAge } = useContext(ContextAPI);
    console.log(selected)
    const { isPending, error, data: users } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/user');
            return res.data;
        }
    })
    if (isPending) {
        return <div className='text-center text-2xl font-bold'>Loading...</div>
    }
    return (
        <div className='my-[100px] w-full'>
            <p className="text-center text-base font-bold secondary">Members</p>
            <h1 className='text-4xl font-bold text-center cursive mb-5'>Our Premium Members</h1>
            <div className="w-1/8 mx-auto"><Dropdown></Dropdown></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5 w-10/12 mx-auto">
                {
                    sortUsersByAge(users, selected).map((singleuser, index) => (
                        <SingleUserCard
                            key={singleuser._id}
                            singleuser={singleuser}
                            index={index + 1}                                           
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default AllUserContainer;