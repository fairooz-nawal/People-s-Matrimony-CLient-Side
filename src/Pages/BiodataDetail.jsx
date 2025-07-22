import React, { useContext} from "react";
import { useNavigate, useParams } from "react-router";
import { ContextAPI } from "../Component/ContextAPI/AuthProvider";
import Swal from 'sweetalert2'
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Component/Hooks/useAxiosSecure";
import { set } from "react-hook-form";
import Loading from "./Loading";

const BiodataDetails = () => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { users } = useContext(ContextAPI);
    const { id: _id } = useParams();

     // Fetch all contact requests
    const { data: CurrentcontactRequests = [], isLoading } = useQuery({
        queryKey: ["contact-requests"],
        queryFn: async () => {
            const res = await axiosSecure.get("/all-contact-requests");
            return res.data;
        }
    });

    const { data: Details, isPending } = useQuery({
        queryKey: ['biodataDetails'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/alluser/${_id}`);
            return res.data;
        }
    })

    // Fetch all biodata to find similar ones
    const { data: allBiodata = [] } = useQuery({
        queryKey: ["allBiodata"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/alluser`);
            return res.data;
        },
    });

    if (isPending) {
        return <Loading></Loading>
    }

    if (!Details) {
        return <div className='text-center text-2xl font-bold'>No Biodata Found</div>
    }

    const { biodataId, age, contactEmail, dob, expectedPartnerAge, expectedPartnerHeight, expectedPartnerWeight, fatherName, gender, height, mobileNumber, motherName, name, occupation, permanentDivision, presentDivision, profileImage, race, weight, isPremium
    } = Details;
    // const navigate = useNavigate();

   const requiredEmail =  CurrentcontactRequests.find(contactRequest => contactRequest.email === users?.email)
   console.log("This is the required email",requiredEmail?.email);
    const handleAddToFavourites = async () => {
        const favouriteBio = {
            biodataId: Details.biodataId,
            userEmail: users?.email,
        }
        try {
            console.log("clicked");
            const res = await axiosSecure.post('/addFavourite', favouriteBio);
            console.log(res.data);
            if (res.data.insertedId) {
                Swal.fire({
                    title: "BioData is Added to Favourites",
                    icon: "success",
                    draggable: true
                })
            }
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err,
            })
        }
    };



    // Filter similar biodata (same gender, exclude current)
    const similarBiodata = allBiodata
        .filter(
            (biodata) =>
                biodata.gender === gender && biodata._id !== Details._id
        )
        .slice(0, 3); // Limit to 3

    const handleRequestContact = () => {
        navigate(`/checkout/${biodataId}`);
    };

    const handleReload = (id) => {
        navigate(`/biodataDetail/${id}`);
        window.location.reload();
    };
console.log(similarBiodata)
    return (
        <div className="min-h-screen md:max-w-7xl lg:max-w-[1600px] mx-auto bg-white p-6 md:my-[150px]">
            <h1 className='text-4xl lg:text-7xl primary font-bold text-center text-white cursive md:w-9/12 mx-auto p-5'>Details of the Person</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 shadow-md gap-2  md:w-9/12 lg:w-9/12 mx-auto">
                <div className="border-2 bg-gray-300">
                    <img
                        src={profileImage}
                        alt={name}
                        className="w-[300px] h-[400px] object-cover mx-auto mt-10" />
                </div>
                <div className="p-5">
                    <h1 className="text-2xl font-bold">Name: {name}</h1>
                    <p className="text-gray-900 font-bold">Gender: {gender}</p>
                    <p className="text-gray-500">Age: {age}</p>
                    <p className="text-gray-500">Date of Birth: {dob}</p>
                    <p className="text-gray-500">Father's Name: {fatherName}</p>
                    <p className="text-gray-500">Mother's Name: {motherName}</p>
                    <p className="text-gray-500">Occupation: {occupation}</p>
                    <p className="text-gray-500">
                        Present Division: {presentDivision}
                    </p>
                    <p className="text-gray-500">
                        Permanent Division: {permanentDivision}
                    </p>
                    <p className="text-gray-500">Height: {height}</p>
                    <p className="text-gray-500">Weight: {weight}</p>
                    <p className="text-gray-500">Race: {race}</p>
                    <p className="text-gray-500">Expected Partner Height: {expectedPartnerHeight}</p>
                    <p className="text-gray-500">Expected Partner Weight: {expectedPartnerWeight}</p>
                    <p className="text-gray-500">Expected Partner Age: {expectedPartnerAge}</p>


                    {/* Contact Info */}
                    <div className="mt-4">
                        {isPremium ? (
                            <div className="text-green-600">
                                <p>Email: {contactEmail}</p>
                                <p>Phone: {mobileNumber}</p>
                            </div>
                        ) : (
                            <p className="text-red-500 font-bold text-xl">
                                Contact information is only visible to Premium members.
                            </p>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex gap-4">
                        <button
                            onClick={handleAddToFavourites}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Add to Favourites
                        </button>

                        {!isPremium && (
                          <button
                                onClick={handleRequestContact} 
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                                Request Contact Info
                            </button>
                           
                        )}
                    </div>
                </div>

            </div>

            {/* Similar Biodata */}
            {similarBiodata.length > 0 && (
                <div className="mt-10 md:w-9/12 lg:w-9/12 mx-auto">
                    <h2 className="text-3xl font-semibold mb-4 text-center text-gray-700">
                        Similar Biodata
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {similarBiodata.map((biodata) => (
                            <div
                                key={biodata._id}
                                className="p-4 shadow-md border rounded"
                            >
                                <img
                                    src={biodata.profileImage}
                                    alt={biodata.name}
                                    className="w-full h-60 object-cover rounded"
                                />
                                <h3 className="text-xl font-bold mt-2">
                                    {biodata.name}
                                </h3>
                                <p>Age: {biodata.age}</p>
                                <p>Occupation: {biodata.occupation}</p>
                                <button
                                    onClick={() =>
                                        handleReload(biodata._id)}
                                    className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BiodataDetails;
