import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import FavBioRow from './FavBioRow';
import { ContextAPI } from '../../Component/ContextAPI/AuthProvider';
import useAxiosSecure from '../../Component/Hooks/useAxiosSecure';
import Loading from '../Loading';

const ViewFavouriteBio = () => {
    const axiosSecure = useAxiosSecure();
    const { users } = useContext(ContextAPI);
    const { data, isPending, isError } = useQuery({
        queryKey: ['favouriteBiodata'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allFavourites');
            return res.data;
        }
    })


    if(isPending){<Loading></Loading>}
    if(isError) <div className='text-center text-2xl font-bold'>Error: An error Occured</div> 
    if (!data || data.length === 0) {
        return <div className='text-center text-2xl font-bold'>No Favourite Biodata Found</div>
    }
    const currentUserEmail = data.filter(current => current.userEmail === users?.email);


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
                            {currentUserEmail.map((favbio, index) => <FavBioRow key={index} favbio={favbio}></FavBioRow>)}
                        </table>
                    </>
                    : <p className='bg-white p-4 text-2xl font-bold'>No User Found</p>
            }

        </div>

    );
};

export default ViewFavouriteBio;