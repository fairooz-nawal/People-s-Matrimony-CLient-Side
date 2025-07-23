import React, { useContext } from 'react';
import { Link } from 'react-router';
import { ContextAPI } from '../../Component/ContextAPI/AuthProvider';
const CustomerUL = ({ handleSignOut }) => {
    const { users} = useContext(ContextAPI);
    return (
        <ul className="space-y-3 px-4">
            <li>
                <Link
                    to="/dashboard/user"
                    className="block w-full text-left p-2 rounded hover:bg-gray-100 hover:text-red-400 text-white font-medium"
                >
                    Edit Biodata
                </Link>
            </li>
            <li>
                <Link
                    to={`/dashboard/user/view-biodata/${users?.email}`}
                    className="block w-full text-left p-2 rounded hover:bg-gray-100 hover:text-red-400 text-white font-medium"
                >
                    View Biodata
                </Link>
            </li>
            <li>
                <Link
                    to="/dashboard/user/contact-requests"
                    className="block w-full text-left p-2 rounded hover:bg-gray-100 hover:text-red-400 text-white font-medium"
                >
                    My Contact Requests
                </Link>
            </li>
            <li>
                <Link
                    to="/dashboard/user/favourites"
                    className="block w-full text-left p-2 rounded hover:bg-gray-100 hover:text-red-400 text-white font-medium"
                >
                    Favourites Biodata
                </Link>
            </li>
            <li>
                <Link
                    to="/dashboard/user/SuccessStories"
                    className="block w-full text-left p-2 rounded hover:bg-gray-100 hover:text-red-400 text-white font-medium"
                >
                    Sucess Stories
                </Link>
            </li>
            <li>
                <button
                    onClick={handleSignOut}
                    className="w-full p-2 rounded bg-red-600 text-white border-red-600 hover:bg-red-50 hover:text-red-600 font-medium"
                >
                    Logout
                </button>
            </li>
        </ul>
    );
};

export default CustomerUL;