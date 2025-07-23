import React from 'react';
import { Link } from 'react-router';
const AdminUL = ({handleSignOut}) => {
    return (
        <ul className="space-y-3 px-4">
            <li>
                <Link to="/dashboard/admin" 
                    className="block w-full text-left p-2 rounded hover:bg-gray-100 hover:text-red-400 text-white font-medium"
                >
                   Admin DashBoard
                </Link>
            </li>
            <li>
                <Link to="/dashboard/admin/makeAdmin"
                    className="block w-full text-left p-2 rounded hover:bg-gray-100 hover:text-red-400 text-white font-medium"
                >
                    Manage Users
                </Link>
            </li>
            <li>
                <Link to="/dashboard/admin/makePremium"
                    className="block w-full text-left p-2 rounded hover:bg-gray-100 hover:text-red-400 text-white font-medium"
                >
                    Approved Premium
                </Link>
            </li>
            <li>
                <Link to="/dashboard/admin/approveContactRequest"
                    className="block w-full text-left p-2 rounded hover:bg-gray-100 hover:text-red-400 text-white font-medium"
                >
                    My Contact Requests
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

export default AdminUL;