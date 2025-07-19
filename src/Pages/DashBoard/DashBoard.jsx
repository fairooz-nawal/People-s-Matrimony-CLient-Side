import React, { useContext, useState } from "react";
import EditBio from "./EditBIo";
import { ContextAPI } from "../../Component/ContextAPI/AuthProvider";
import bg from "../../assets/adduserbg.png";
import ViewBioData from "./ViewBioData";
const DashBoard = () => {
    const { users, signOutUser } = useContext(ContextAPI);
    const [isOpen, setIsOpen] = useState(true);
    const [currentRoute, setCurrentRoute] = useState("edit-biodata");

    console.log(users)
    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                console.log("Sign out successful");
            })
            .catch((error) => {
                console.error("Error signing out:", error);
            });
    }
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div
                className={`fixed md:static z-50 top-0 left-0 h-full w-64 bg-red-400 border-r border-gray-200 shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                    }`}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h5 className="text-2xl font-semibold text-white">
                        Dashboard Menu
                    </h5>
                    <button
                        onClick={() => setIsOpen(false)}
                        className=" text-white  hover:text-gray-800"
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
                                onClick={handleSignOut}
                                className="w-full p-2 rounded bg-red-600 text-white border-red-600 hover:bg-red-50 hover:text-red-600 font-medium"
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-0 md:ml-64">
                <div className="bg-gradient-to-r from-amber-500 to-pink-500 pt-[150px] pb-3 pl-[10px] text-white">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="text-red-400 bg-white p-[10px] rounded-2xl font-bold  hover:border-3 hover:text-white hover:bg-red-500 text-2xl"
                    >
                        DashBoard Menu View
                    </button>
                </div>

                <div className="p-4 flex items-center justify-center " style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', minHeight: '100vh' }}>
                        {currentRoute === "edit-biodata" && (
                            <EditBio></EditBio>
                        )}
                        {currentRoute === "view-biodata" && (
                            <ViewBioData email={users?.email}></ViewBioData>
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
