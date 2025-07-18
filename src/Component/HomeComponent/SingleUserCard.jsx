import React from 'react';
import { Link } from 'react-router';

const SingleUserCard = ({ singleuser,index }) => {
    const { _id, age,  gender, occupation,permanentDivision, profileImage } = singleuser;
    return (
        <div>
            <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="w-[300px] h-[300px] mx-auto">
                     <img className="rounded-full w-full h-full" src={profileImage} alt="product image" />
                </div>
                   
                <div className="px-5 pb-5 mt-2 space-y-2">
                    <a href="#">
                        <h1 className="text-xl  font-semibold tracking-tight text-gray-900">Id:  <span className="text-xl text-gray-500">{index}</span></h1>
                        <h1 className="text-lg font-semibold text-gray-900">Type:  {gender}</h1>
                        <h1 className="text-lg text-gray-500 mt-2">Permenent Division:  {permanentDivision}</h1>
                        <h1 className="text-lg text-gray-500">Age:  {age}</h1>
                        <h1 className="text-lg text-gray-500">Occupation:  {occupation}</h1>
                    </a>
                  
                    <div className="flex items-center justify-end">
                        <Link to={`/biodataDetail/${_id}`}><button type="button"  className="p-3 border-2 rounded-2xl shadow-2xl font-bold primary text-white hover:bg-red-500" >View Details</button></Link>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SingleUserCard;