import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import SingleBiodata from './SingleBiodata';
import Filter from './Filter';
import bg from "../assets/seeAllBioData.jpg"

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
        <div className='w-full' >
            <div style = {{backgroundImage:  `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center'}} className="pt-[150px] w-full border-2">
                <p className="text-center text-lg font-bold secondary">All Biodata</p>
                <h1 className='text-5xl font-semibold text-center cursive mb-5 text-black'>Our Users Biodata</h1>
            </div>
            <Filter></Filter>

            <div className="w-11/12 mx-auto py-[100px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    allBioData.map((single , index) => <SingleBiodata key={index} index={index+1} single={single}></SingleBiodata>)
                }
            </div>
        </div>
    );
};

export default BioDataContainer;