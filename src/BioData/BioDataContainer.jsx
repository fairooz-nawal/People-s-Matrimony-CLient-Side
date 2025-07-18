import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import SingleBiodata from './SingleBiodata';
import Filter from './Filter';


const BioDataContainer = () => {
    const { data: allBioData, isPending, error } = useQuery({
        queryKey: ['allBioData'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/alluser')
            return res.data;
        }
    })

    isPending && <div className='text-center text-2xl font-bold'>Loading...</div>
    error && <div className='text-center text-2xl font-bold'>Error: {error.message}</div>
    if (!allBioData || allBioData.length === 0) {
        return <div className='text-center text-2xl font-bold'>No Bio Data Found</div>
    }

    return (
        <div className='w-full'>
            <div className="pt-[120px] w-full secondarybg border-2">
                <p className="text-center text-base font-bold text-white">All Biodata</p>
                <h1 className='text-4xl font-bold text-center text-white cursive mb-5'>Our Users Biodata</h1>
            </div>
            <Filter></Filter>

            <div className="w-9/12 mx-auto py-[100px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    allBioData.map((single , index) => <SingleBiodata index={index+1} single={single}></SingleBiodata>)
                }
            </div>
        </div>
    );
};

export default BioDataContainer;