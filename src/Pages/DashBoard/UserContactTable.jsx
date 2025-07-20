import React, { useContext } from 'react';
import UserContactRow from './UserContactRow';
import { useQuery } from '@tanstack/react-query';
import { ContextAPI } from '../../Component/ContextAPI/AuthProvider';
import useAxiosSecure from '../../Component/Hooks/useAxiosSecure';


const UserContactTable = () => {
    const axiosSecure = useAxiosSecure();
    const {users} = useContext(ContextAPI);
    const { data, isPending, isError } = useQuery({
        queryKey: ['ContactBiodata'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-contact-requests');
            return res.data;
        }
    })

    if (isPending) {
        return <div className='text-center text-2xl font-bold'>Loading...</div>
    }
    if (isError) {
        return <div className='text-center text-2xl font-bold'>Error: {isError.message}</div>
    }
    console.log(data);

    const currentUserEmail = data.filter(current => current.email === users.email);
    return (
        <div>
            <div className="relative overflow-x-auto shadow-lg rounded-lg">
                <div className="p-4 bg-gradient-to-r from-amber-500 to-pink-500 rounded-t-lg">
                    <h2 className="text-center text-white text-2xl font-bold">Biodata Information</h2>
                </div>
                {
                    currentUserEmail.length === 0 ? <div className='text-center text-2xl font-bold bg-white'>No Contact Request Found</div> :
                        <>
                            <table className="w-full text-sm text-left text-gray-800 bg-white rounded-b-lg">
                                <thead className="text-xs uppercase bg-amber-200 text-gray-700">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Name</th>
                                        <th scope="col" className="px-6 py-3">Biodata ID</th>
                                        <th scope="col" className="px-6 py-3">Status</th>
                                        <th scope="col" className="px-6 py-3">Mobile No </th>
                                        <th scope="col" className="px-6 py-3">Email  </th>
                                        <th scope="col" className="px-6 py-3 text-center">Action</th>
                                    </tr>
                                </thead>
                                {data.map((requ, index) => <UserContactRow key={index} requ={requ}></UserContactRow>)}
                            </table>
                        </>
                }

            </div>
        </div>
    );
};

export default UserContactTable;