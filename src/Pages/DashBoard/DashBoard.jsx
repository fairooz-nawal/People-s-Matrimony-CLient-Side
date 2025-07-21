import React, { useContext, useState } from "react";
import EditBio from "./EditBIo";
import { ContextAPI } from "../../Component/ContextAPI/AuthProvider";
import bg from "../../assets/adduserbg.png";
import ViewBioData from "./ViewBioData";
import UserContactTable from "./UserContactTable";
import ViewFavouriteBio from "./ViewFavouriteBio";
import CustomerUL from "./CustomerUL";
import useUserRole from "../../Component/Hooks/useUserRole";
import AdminUL from "./AdminUL";
import MakeAdmin from "../Admin/MakeAdmin";
import AdminDashboardCount from "./AdminDashboardCount";
const DashBoard = () => {
    const { role, roleLoading } = useUserRole()
    console.log(role);
    const { users, signOutUser, currentRoute, setCurrentRoute } = useContext(ContextAPI);
    const [isOpen, setIsOpen] = useState(true);

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
                    {!roleLoading && role === "admin" && <AdminUL setCurrentRoute={setCurrentRoute} handleSignOut={handleSignOut}></AdminUL>}
                    {!roleLoading && role === "user" && <CustomerUL setCurrentRoute={setCurrentRoute} handleSignOut={handleSignOut}></CustomerUL>}


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
                    {/* admin routes */}
                    
                    {!roleLoading && role === "admin" && currentRoute === "AdminDashBoard" && (
                       <AdminDashboardCount></AdminDashboardCount>
                    )}
                    {!roleLoading && role === "admin" && currentRoute === "makeAdmin" && (
                        <MakeAdmin></MakeAdmin>
                    )}

                    {/* users routes */}
                    {!roleLoading && role === "user" &&  currentRoute === "edit-biodata" && (
                        <EditBio></EditBio>
                    )}
                    {!roleLoading && role === "user" && currentRoute === "view-biodata" && (
                        <ViewBioData email={users?.email}></ViewBioData>
                    )}
                    {!roleLoading && role === "user" && currentRoute === "contact-requests" && (
                        <UserContactTable></UserContactTable>
                    )}
                    {!roleLoading && role === "user" && currentRoute === "favourites" && (
                        <ViewFavouriteBio></ViewFavouriteBio>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
