import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import FavBioRow from './FavBioRow';
import { ContextAPI } from '../../Component/ContextAPI/AuthProvider';

const ViewFavouriteBio = () => {
    const { users } = useContext(ContextAPI);
    const { data, isPending, isError } = useQuery({
        queryKey: ['favouriteBiodata'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/allFavourites');
            return res.data;
        }
    })

    const { data: alluser, isPending: allPending, isError: allError } = useQuery({
        queryKey: ['allUser'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/alluser');
            return res.data
        }
    })

    allPending || isPending ? <div className='text-center text-2xl font-bold'>Loading...</div> : ""
    allError || isError ? <div className='text-center text-2xl font-bold'>Error: An error Occured</div> : ""

    if (!alluser || alluser.length === 0) {
        return <div className='text-center text-2xl font-bold'>No User Found</div>
    }
    if (!data || data.length === 0) {
        return <div className='text-center text-2xl font-bold'>No Favourite Biodata Found</div>
    }

    const favBio = alluser.filter(singleuser => data.some(fav => fav.biodataId === singleuser._id));
    const currentUserEmail = data.filter(current => current.userEmail === users.email);
    console.log(currentUserEmail);
    return (
        <div className="relative overflow-x-auto shadow-lg rounded-lg">
            <div className="p-4 bg-gradient-to-r from-amber-500 to-pink-500 rounded-t-lg">
                <h2 className="text-center text-white text-2xl font-bold">Biodata Information</h2>
            </div>
            {
                 currentUserEmail.length>0 ?
                    <>
                        <table className="w-full text-sm text-left text-gray-800 bg-white rounded-b-lg">
                            <thead className="text-xs uppercase bg-amber-200 text-gray-700">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Name</th>
                                    <th scope="col" className="px-6 py-3">Biodata ID</th>
                                    <th scope="col" className="px-6 py-3">Permanent Address</th>
                                    <th scope="col" className="px-6 py-3">Occupation</th>
                                    <th scope="col" className="px-6 py-3 text-center">Action</th>
                                </tr>
                            </thead>
                            {favBio.map((favbio, index) => <FavBioRow key={index} favbio={favbio}></FavBioRow>)}
                        </table>
                    </>
                    : <p className='bg-white p-4 text-2xl font-bold'>No User Found</p>
            }

        </div>

    );
};

export default ViewFavouriteBio;