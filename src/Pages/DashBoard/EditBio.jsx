import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { ContextAPI } from "../../Component/ContextAPI/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const EditBio = () => {
    const { users } = useContext(ContextAPI);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const { data: userData, isLoading, isError } = useQuery({
        queryKey: ["biodata", users?.email],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/singlealluser?email=${users?.email}`);
            return res.data;
        },
        enabled: !!users?.email,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {isError.message}</div>;
    }
    //  Pre-fill the form with fetched biodata
    if (userData) {
        Object.keys(userData).forEach((key) => {
            setValue(key, userData[key]);
        });
    }

 const onSubmit = async (data) => {
        try {
            const updatedBio = {
                ...data,
            };

            const res = await axios.put(`http://localhost:5000/alluser/${userData?._id}`, updatedBio);

            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    title: "Success!",
                    text: "Your biodata has been updated/created successfully.",
                    icon: "success",
                }).then(() => {
                    window.location.reload();
                });
            } else {
                Swal.fire({
                    title: "No Changes",
                    text: "You didn’t change anything.",
                    icon: "info",
                });
            }
        } catch (err) {
            console.error("Error updating biodata:", err);
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: "Something went wrong. Try again later.",
            });
        }
    };


    const divisions = [
        "Dhaka",
        "Chattagram",
        "Rangpur",
        "Barisal",
        "Khulna",
        "Mymensingh",
        "Sylhet",
    ];

    const heights = ["5'0\"", "5'2\"", "5'4\"", "5'6\"", "5'8\"", "6'0\""];
    const weights = ["50 kg", "55 kg", "60 kg", "65 kg", "70 kg", "75 kg", "80 kg", "85 kg", "90 kg", "95 kg", "100 kg"];
    const occupations = [
        "Engineer",
        "Teacher",
        "Doctor",
        "Business",
        "Student",
        "Other",
    ];
    const races = ["Light", "Fair", "Medium", "Olive", "Brown", "Dark"];

    return (

        <form
            onSubmit={handleSubmit(onSubmit)}
            className="md:w-[700px] lg:w-[900px] bg-gradient-to-r from-amber-500 to-pink-500 text-white bg-white rounded-lg shadow-lg p-8 space-y-4"
        >
            <h2 className="text-3xl font-bold text-center text-white mb-6">
                Create Biodata
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="">
                    {/* Biodata Type */}
                    <div>
                        <label className="block mb-1 font-medium text-white">
                            Biodata Type <span className="text-red-500">*</span>
                        </label>
                        <select
                            {...register("gender", { required: "Select a biodata type" })}
                            className="w-full border text-gray-700 border-gray-300 rounded-lg p-2"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        {errors.gender && (
                            <p className="text-red-500 text-sm">{errors.gender.message}</p>
                        )}
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block mb-1 font-medium text-white">
                            Name
                        </label>
                        <input
                            type="text"
                            {...register("name")}
                            placeholder="Enter your name"
                            className="w-full text-gray-700  border border-gray-300 rounded-lg p-2"
                        />
                    </div>

                    {/* Profile Image */}
                    <div>
                        <label className="block mb-1 font-medium text-white">
                            Profile Image Link
                        </label>
                        <input
                            type="url"
                            {...register("profileImage")}
                            placeholder="https://example.com/photo.jpg"
                            className="w-full border text-gray-700  border-gray-300 rounded-lg p-2"
                        />
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label className="block mb-1 font-medium text-white">
                            Date of Birth <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            {...register("dob", { required: "Date of birth is required" })}
                            className="w-full border text-gray-700 border-gray-300 rounded-lg p-2"
                        />
                        {errors.dob && (
                            <p className="text-red-500 text-sm">{errors.dob.message}</p>
                        )}
                    </div>

                    {/* Height */}
                    <div>
                        <label className="block mb-1 font-medium text-white">
                            Height <span className="text-red-500">*</span>
                        </label>
                        <select
                            {...register("height", { required: "Height is required" })}
                            className="w-full border text-gray-700 border-gray-300 rounded-lg p-2"
                        >
                            <option value="">Select Height</option>
                            {heights.map((h, i) => (
                                <option key={i} value={h}>
                                    {h}
                                </option>
                            ))}
                        </select>
                        {errors.height && (
                            <p className="text-red-500 text-sm">{errors.height.message}</p>
                        )}
                    </div>

                    {/* Weight */}
                    <div>
                        <label className="block mb-1 font-medium text-white">
                            Weight <span className="text-red-500">*</span>
                        </label>
                        <select
                            {...register("weight", { required: "Weight is required" })}
                            className="w-full border text-gray-700 border-gray-300 rounded-lg p-2"
                        >
                            <option value="">Select Weight</option>
                            {weights.map((w, i) => (
                                <option key={i} value={w}>
                                    {w}
                                </option>
                            ))}
                        </select>
                        {errors.weight && (
                            <p className="text-red-500 text-sm">{errors.weight.message}</p>
                        )}
                    </div>

                    {/* Age */}
                    <div>
                        <label className="block mb-1 font-medium text-white">Age</label>
                        <input
                            type="number"
                            {...register("age")}
                            placeholder="Enter your age"
                            className="w-full border text-gray-700 border-gray-300 rounded-lg p-2"
                        />
                    </div>

                </div>
                <div className="">
                    {/* Father's Name */}
                    <div>
                        <label className="block mb-1 font-medium text-white">
                            Father’s Name
                        </label>
                        <input
                            type="text"
                            {...register("fatherName")}
                            placeholder="Enter father's name"
                            className="w-full border text-gray-700 border-gray-300 rounded-lg p-2"
                        />
                    </div>

                    {/* Mother's Name */}
                    <div>
                        <label className="block mb-1 font-medium text-white">
                            Mother’s Name
                        </label>
                        <input
                            type="text"
                            {...register("motherName")}
                            placeholder="Enter mother's name"
                            className="w-full border text-gray-700 border-gray-300 rounded-lg p-2"
                        />
                    </div>

                    {/* Permanent Division */}
                    <div>
                        <label className="block mb-1 font-medium text-white">
                            Permanent Division <span className="text-red-500">*</span>
                        </label>
                        <select
                            {...register("permanentDivision", {
                                required: "Permanent division is required",
                            })}
                            className="w-full border text-gray-700 border-gray-300 rounded-lg p-2"
                        >
                            <option value="">Select Division</option>
                            {divisions.map((div, i) => (
                                <option key={i} value={div}>
                                    {div}
                                </option>
                            ))}
                        </select>
                        {errors.permanentDivision && (
                            <p className="text-red-500 text-sm">
                                {errors.permanentDivision.message}
                            </p>
                        )}
                    </div>

                    {/* Present Division */}
                    <div>
                        <label className="block mb-1 font-medium text-white">
                            Present Division <span className="text-red-500">*</span>
                        </label>
                        <select
                            {...register("presentDivision", {
                                required: "Present division is required",
                            })}
                            className="w-full  text-gray-700 border border-gray-300 rounded-lg p-2"
                        >
                            <option value="">Select Division</option>
                            {divisions.map((div, i) => (
                                <option key={i} value={div}>
                                    {div}
                                </option>
                            ))}
                        </select>
                        {errors.presentDivision && (
                            <p className="text-red-500 text-sm">
                                {errors.presentDivision.message}
                            </p>
                        )}
                    </div>

                    {/* Occupation */}
                    <div>
                        <label className="block mb-1 font-medium text-white">
                            Occupation <span className="text-red-500">*</span>
                        </label>
                        <select
                            {...register("occupation", { required: "Occupation is required" })}
                            className="w-full text-gray-700 border border-gray-300 rounded-lg p-2"
                        >
                            <option value="">Select Occupation</option>
                            {occupations.map((occ, i) => (
                                <option key={i} value={occ}>
                                    {occ}
                                </option>
                            ))}
                        </select>
                        {errors.occupation && (
                            <p className="text-red-500 text-sm">{errors.occupation.message}</p>
                        )}
                    </div>

                    {/* Race */}
                    <div>
                        <label className="block mb-1 font-medium text-white">
                            Race (Skin Color) <span className="text-red-500">*</span>
                        </label>
                        <select
                            {...register("race", { required: "Race is required" })}
                            className="w-full text-gray-700 border border-gray-300 rounded-lg p-2"
                        >
                            <option value="">Select Skin Color</option>
                            {races.map((r, i) => (
                                <option key={i} value={r}>
                                    {r}
                                </option>
                            ))}
                        </select>
                        {errors.race && (
                            <p className="text-red-500 text-sm">{errors.race.message}</p>
                        )}
                    </div>

                </div>
            </div>

            {/* Expected Partner Age */}
            <div>
                <label className="block mb-1 font-medium text-white">
                    Expected Partner Age
                </label>
                <input
                    type="number"
                    {...register("expectedPartnerAge")}
                    placeholder="e.g. 25-30"
                    className="w-full text-gray-700 border border-gray-300 rounded-lg p-2"
                />
            </div>

            {/* Expected Partner Height */}
            <div>
                <label className="block mb-1 font-medium text-white">
                    Expected Partner Height <span className="text-red-500">*</span>
                </label>
                <select
                    {...register("expectedPartnerHeight", {
                        required: "Expected partner height is required",
                    })}
                    className="w-full text-gray-700 border border-gray-300 rounded-lg p-2"
                >
                    <option value="">Select Height</option>
                    {heights.map((h, i) => (
                        <option key={i} value={h}>
                            {h}
                        </option>
                    ))}
                </select>
                {errors.expectedPartnerHeight && (
                    <p className="text-red-500 text-sm">
                        {errors.expectedPartnerHeight.message}
                    </p>
                )}
            </div>

            {/* Expected Partner Weight */}
            <div>
                <label className="block mb-1 font-medium text-white">
                    Expected Partner Weight <span className="text-red-500">*</span>
                </label>
                <select
                    {...register("expectedPartnerWeight", {
                        required: "Expected partner weight is required",
                    })}
                    className="w-full text-gray-700 border border-gray-300 rounded-lg p-2"
                >
                    <option value="">Select Weight</option>
                    {weights.map((w, i) => (
                        <option key={i} value={w}>
                            {w}
                        </option>
                    ))}
                </select>
                {errors.expectedPartnerWeight && (
                    <p className="text-red-500 text-sm">
                        {errors.expectedPartnerWeight.message}
                    </p>
                )}
            </div>

            {/* Contact Email */}
            <div>
                <label className="block mb-1 font-medium text-white">
                    Contact Email
                </label>
                <input
                    type="email"
                    value={users?.email || ""}
                    {...register("contactEmail")}
                    readOnly
                    className="w-full text-gray-700 border border-gray-300 rounded-lg p-2 bg-gray-100"
                />
            </div>

            {/* Mobile Number */}
            <div>
                <label className="block mb-1 font-medium text-white">
                    Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    {...register("mobileNumber", {
                        required: "Mobile number is required",
                    })}
                    placeholder="Enter mobile number"
                    className="w-full text-gray-700 border border-gray-300 rounded-lg p-2"
                />
                {errors.mobileNumber && (
                    <p className="text-red-500 text-sm">
                        {errors.mobileNumber.message}
                    </p>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-white text-red-500  rounded-lg p-3 font-semibold hover:opacity-90 transition"
            >
                Save and Publish Biodata
            </button>
        </form>

    );
};

export default EditBio;
