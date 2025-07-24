import React from 'react';

const FavBioRow = ({favbio}) => {
    
    const { name,_id:biodataId , permanentDivision, occupation } = favbio;
    return (
        <tbody>
            <tr className="bg-gradient-to-r from-pink-50 to-amber-50 border-b">
                <td className="px-6 py-4 font-medium text-gray-900">{name}</td>
                <td className="px-6 py-4">{biodataId}</td>
                <td className="px-6 py-4">{permanentDivision}</td>
                <td className="px-6 py-4">{occupation}</td>
                <td className="px-6 py-4 text-center">
                    <button className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition">Delete</button>
                </td>
            </tr>
        </tbody>
    );
};

export default FavBioRow;