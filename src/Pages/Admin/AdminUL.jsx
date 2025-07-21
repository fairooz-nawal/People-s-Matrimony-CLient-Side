import React from 'react';

const AdminUL = ({setCurrentRoute,handleSignOut}) => {
    return (
        <ul className="space-y-3 px-4">
            <li>
                <button
                    onClick={() => setCurrentRoute("AdminDashBoard")}
                    className="block w-full text-left p-2 rounded hover:bg-gray-100 hover:text-red-400 text-white font-medium"
                >
                   Admin DashBoard
                </button>
            </li>
            <li>
                <button
                    onClick={() => setCurrentRoute("makeAdmin")}
                    className="block w-full text-left p-2 rounded hover:bg-gray-100 hover:text-red-400 text-white font-medium"
                >
                    Manage Users
                </button>
            </li>
            <li>
                <button
                    onClick={() => setCurrentRoute("makePremium")}
                    className="block w-full text-left p-2 rounded hover:bg-gray-100 hover:text-red-400 text-white font-medium"
                >
                    Approved Premium
                </button>
            </li>
            <li>
                <button
                    onClick={() => setCurrentRoute("contact-requests")}
                    className="block w-full text-left p-2 rounded hover:bg-gray-100 hover:text-red-400 text-white font-medium"
                >
                    My Contact Requests
                </button>
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