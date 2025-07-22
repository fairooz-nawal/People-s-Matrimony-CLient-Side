import React from 'react';

const UserContactRow = ({ requ }) => {

    const { _id: requestedbioID, status, contactEmail, mobileNumber,name} = requ
    return (
        <tbody>
            <tr className="bg-gradient-to-r from-pink-50 to-amber-50 border-b">
                <td className="px-6 py-4 font-medium text-gray-900">{name}</td>
                <td className="px-6 py-4">{requestedbioID}</td>

                {
                    status == "approved" ? <>
                        <td className="px-6 py-4">{"Approved"}</td>
                        <td className="px-6 py-4">{contactEmail}</td>
                        <td className="px-6 py-4">{mobileNumber}</td>
                    </> : <>
                        <td className="px-6 py-4">{"Pending"}</td>
                        <td className="px-6 py-4">{"-"}</td>
                        <td className="px-6 py-4">{"-"}</td>
                    </>
                }

                <td className="px-6 py-4 text-center">
                    <button className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition">Delete</button>
                </td>
            </tr>
        </tbody>
    );
};

export default UserContactRow;