import React from 'react';

const CustomerUL = ({setCurrentRoute,handleSignOut}) => {
    return (
        <ul className="space-y-3 px-4">
            <li>
                <button
                    onClick={() => setCurrentRoute("edit-biodata")}
                    className="block w-full text-left p-2 rounded hover:bg-gray-100 hover:text-red-400 text-white font-medium"
                >
                    Edit Biodata
                </button>
            </li>
            <li>
                <button
                    onClick={() => setCurrentRoute("view-biodata")}
                    className="block w-full text-left p-2 rounded hover:bg-gray-100 hover:text-red-400 text-white font-medium"
                >
                    View Biodata
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
                    onClick={() => setCurrentRoute("favourites")}
                    className="block w-full text-left p-2 rounded hover:bg-gray-100 hover:text-red-400 text-white font-medium"
                >
                    Favourites Biodata
                </button>
            </li>
            <li>
                <button
                    onClick={() => setCurrentRoute("SuccessStories")}
                    className="block w-full text-left p-2 rounded hover:bg-gray-100 hover:text-red-400 text-white font-medium"
                >
                    Sucess Stories
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

export default CustomerUL;