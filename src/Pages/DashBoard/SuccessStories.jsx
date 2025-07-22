import React from "react";
import { useForm } from "react-hook-form";
import axios, { Axios } from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Component/Hooks/useAxiosSecure";

const SuccessStories = () => {
const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  
  const onSubmit = async (data) => {
    try {
      // Post data to your backend API
      const res = await axiosSecure.post(
        "success-stories",
        data
      );

      if (res.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Your success story has been added.",
          icon: "success",
          confirmButtonText: "OK",
        });
        reset();
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-amber-500 to-pink-500">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Share Your Success Story
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Self Biodata ID */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Your Biodata ID
            </label>
            <input
              type="text"
              {...register("selfBiodataId", { required: true })}
              placeholder="Enter your biodata ID"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {errors.selfBiodataId && (
              <p className="text-red-500 text-sm mt-1">
                This field is required
              </p>
            )}
          </div>

          {/* Partner Biodata ID */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Partner Biodata ID
            </label>
            <input
              type="text"
              {...register("partnerBiodataId", { required: true })}
              placeholder="Enter partner's biodata ID"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {errors.partnerBiodataId && (
              <p className="text-red-500 text-sm mt-1">
                This field is required
              </p>
            )}
          </div>

          {/* Couple Image Link */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Couple Image Link
            </label>
            <input
              type="text"
              {...register("coupleImage", { required: true })}
              placeholder="Paste image link"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {errors.coupleImage && (
              <p className="text-red-500 text-sm mt-1">
                This field is required
              </p>
            )}
          </div>

          {/* Success Story Review */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Your Review
            </label>
            <textarea
              {...register("review", { required: true })}
              placeholder="Write your success story here..."
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            ></textarea>
            {errors.review && (
              <p className="text-red-500 text-sm mt-1">
                This field is required
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-lg shadow-md transition duration-300"
          >
            Submit Success Story
          </button>
        </form>
      </div>
    </div>
  );
};

export default SuccessStories;
