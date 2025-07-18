import React from 'react';

const SingleBiodata = ({ single, index }) => {
  console.log(single);

  const { gender, profileImage, permanentDivision, age, occupation, onViewProfile, } = single
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 w-11/12 mx-auto overflow-hidden border">
      {/* Profile Image */}
      <div className="relative">
        <div className="w-full h-[300px] mx-auto border-2">
          <img
            src={profileImage}
            alt={`Profile of ${gender}`}
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold ${gender === "Male"
              ? "bg-blue-500 text-white"
              : "bg-pink-500 text-white"
            }`}
        >
          {gender}
        </div>
      </div>

      {/* Details */}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">Biodata #{index}</h2>
        <p className="text-gray-600 text-sm mb-1">
          <span className="font-medium">Permanent Division:</span> {permanentDivision}
        </p>
        <p className="text-gray-600 text-sm mb-1">
          <span className="font-medium">Age:</span> {age} years
        </p>
        <p className="text-gray-600 text-sm mb-3">
          <span className="font-medium">Occupation:</span> {occupation}
        </p>

        {/* View Profile Button */}
        <button
          onClick={onViewProfile}
          className="w-full secondarybg text-white py-2 px-4 rounded-lg hover:secondarybg transition duration-300"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default SingleBiodata;