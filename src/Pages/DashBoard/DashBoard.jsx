import React, { useState } from "react";
import EditBio from "./EditBIo";

const DashBoard = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [currentRoute, setCurrentRoute] = useState("edit-biodata");
   
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div
                className={`fixed md:static z-50 top-0 left-0 h-full w-64 bg-white border-r border-gray-200 shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                    }`}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h5 className="text-lg font-semibold text-gray-700">
                        Dashboard Menu
                    </h5>
                    <button
                        onClick={() => setIsOpen(false)}
                        className=" text-gray-500 hover:text-gray-800"
                    >
                        ✕
                    </button>
                </div>

                {/* Sidebar Links */}
                <div className="py-4">
                    <ul className="space-y-3 px-4">
                        <li>
                            <button
                                onClick={() => setCurrentRoute("edit-biodata")}
                                className="block w-full text-left p-2 rounded hover:bg-gray-100 text-gray-700 font-medium"
                            >
                                Edit Biodata
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setCurrentRoute("view-biodata")}
                                className="block w-full text-left p-2 rounded hover:bg-gray-100 text-gray-700 font-medium"
                            >
                                View Biodata
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setCurrentRoute("contact-requests")}
                                className="block w-full text-left p-2 rounded hover:bg-gray-100 text-gray-700 font-medium"
                            >
                                My Contact Requests
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setCurrentRoute("favourites")}
                                className="block w-full text-left p-2 rounded hover:bg-gray-100 text-gray-700 font-medium"
                            >
                                Favourites Biodata
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => alert("Logged out successfully!")}
                                className="w-full p-2 rounded text-red-600 border border-red-600 hover:bg-red-50 font-medium"
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-0 md:ml-64">
                <div className=" pt-[150px] pb-3 pl-[10px] primary text-white">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="text-white secondarybg p-[10px] rounded-2xl font-bold  hover:border-3 hover:border-white hover:text-white"
                    >
                       DashBoard Menu View
                    </button>
                </div>

                <div className="p-4">
                    {currentRoute === "edit-biodata" && (
                        <EditBio></EditBio>
                    )}
                    {currentRoute === "view-biodata" && (
                        <div>View Biodata Page</div>
                    )}
                    {currentRoute === "contact-requests" && (
                        <div>My Contact Requests Page</div>
                    )}
                    {currentRoute === "favourites" && (
                        <div>Favourites Biodata Page</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
