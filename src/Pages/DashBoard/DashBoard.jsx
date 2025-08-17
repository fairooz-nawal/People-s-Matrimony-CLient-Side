import React, { useContext, useState } from "react";
import EditBio from "./EditBIo";
import { ContextAPI } from "../../Component/ContextAPI/AuthProvider";
import bg from "../../assets/adduserbg.png";
import ViewBioData from "./ViewBioData";
import UserContactTable from "./UserContactTable";
import ViewFavouriteBio from "./ViewFavouriteBio";
import CustomerUL from "./CustomerUL";
import useUserRole from "../../Component/Hooks/useUserRole";
import AdminUL from "../Admin/AdminUL";
import Loading from "../Loading";
import SuccessStories from "./SuccessStories";
import { Outlet } from "react-router";

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
    if (roleLoading) {
        return <Loading></Loading>
    }
    return (
        <div className="flex flex-col md:flex-row min-h-screen max-w-full md:max-w-7xl lg:max-w-[1600px] mx-auto">
            {/* Sidebar */}
            <div
                className={`fixed md:static z-50 top-0 left-0 md:w-45 lg:w-48 h-full bg-red-400 border-r border-gray-200 shadow-lg transform transition-transform duration-300 ease-in-out
      ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h5 className="text-2xl font-semibold text-white">Dashboard Menu</h5>
                    {/* Close button ONLY visible on mobile */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-white hover:text-gray-200 md:hidden"
                    >
                        ✕
                    </button>
                </div>

                {/* Sidebar Links */}
                <div className="py-4 ">
                    {!roleLoading && role === "admin" && (
                        <AdminUL handleSignOut={handleSignOut} />
                    )}
                    {!roleLoading && role === "user" && (
                        <CustomerUL handleSignOut={handleSignOut} />
                    )}
                    {!roleLoading && role === "premiumUser" && (
                        <CustomerUL
                            setCurrentRoute={setCurrentRoute}
                            handleSignOut={handleSignOut}
                        />
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="w-full">
                {/* Header */}
                <div className="bg-gradient-to-r from-amber-500 to-pink-500  flex justify-between items-center w-full pt-[100px] md:pt-[69px] pb-5">
                    <h1 className="text-white font-bold text-lg">Dashboard</h1>
                    {/* Menu button ONLY visible on mobile */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className="text-red-400 bg-white px-4 py-2 rounded-2xl font-bold hover:bg-red-500 hover:text-white transition-colors duration-300 md:hidden"
                    >
                        ☰ Menu
                    </button>
                </div>

                {/* Main Body */}
                <div
                    className="flex  md:justify-end lg:justify-center overflow-x-auto py-10 p-5"
                    style={{
                        backgroundImage: `url(${bg})`,
                        backgroundSize: "cover",
                        height: "100vh", // adjust height
                    }}
                >
                    <div className="md:w-[550px] lg:w-[600px] h-[700px] overflow-auto">
                        <Outlet />
                    </div>

                </div>
            </div>
        </div>



    );
};

export default DashBoard;
