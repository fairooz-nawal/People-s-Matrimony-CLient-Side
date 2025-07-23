import React, { useContext, useState } from "react";
import { Label, Select, TextInput, Button } from "flowbite-react";
import { ContextAPI } from "../Component/ContextAPI/AuthProvider";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../Component/Hooks/useAxiosSecure";

const divisions = [
  "Dhaka",
  "Chattagra",
  "Rangpur",
  "Barisal",
  "Khulna",
  "Mymensingh",
  "Sylhet",
];

const Filter = () => {
  const {filter, setfilter} = useContext(ContextAPI);
   const axiosSecure = useAxiosSecure();
  const { register, handleSubmit } = useForm();
  const handleChange = async(data) => {
    console.log(data);
    const res = await axiosSecure.post('/filteralluser',data);
    setfilter(res.data);
    console.log("this is response data from filter",filter);
  };

  const handleClear = () => {
    setfilter([]);
  };

  return (
    <div className="p-4 bg-sky-100 rounded-2xl shadow-md  md:max-w-5xl mx-auto border-2">
      <form onSubmit={handleSubmit(handleChange)} className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Age From */}
        <div className="flex flex-col space-y-1">
          <p className="text-gray-700 font-medium">Age From</p>
          <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 rounded-2xl"  {...register("ageFrom")} placeholder="Age from" />

        </div>

        {/* Age To */}
        <div className="flex flex-col space-y-1">
          <p className="text-gray-700 font-medium">Age To</p>
          <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 rounded-2xl"  {...register("ageTo")} placeholder="Age to" />
        </div>

        {/* Biodata Type */}
        <div className="flex flex-col space-y-1">
          <p className="text-gray-700 font-medium">Biodata Type</p>
          <Select
            {...register("biodataType")}
            className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 shadow-sm"
          >
            <option value="">Select Type</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Select>
        </div>

        {/* Division */}
        <div className="flex flex-col space-y-1">
          <p className="text-gray-700 font-medium">Division</p>
          <Select
            {...register("division")}
            className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 shadow-sm"
          >
            <option value="">Select Division</option>
            {divisions.map((div) => (
              <option key={div} value={div}>
                {div}
              </option>
            ))}
          </Select>
        </div>

        {/* Buttons */}
        <div className="md:col-span-4 flex justify-end gap-2 mt-2">
          <Button color="light" type="button" onClick={handleClear}>
            Clear Filters
          </Button>
          <Button className="primary text-white" type="submit">Apply Filters</Button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
