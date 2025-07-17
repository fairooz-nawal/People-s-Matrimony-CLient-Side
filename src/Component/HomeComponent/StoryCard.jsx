import React from "react";
import { Star } from "lucide-react";

const StoryCard = ({ singlemarriage }) => {
  const { coupleImage, createdAt:marriageDate, successStory,rating } = singlemarriage;
  const date = marriageDate.split("T")[0];
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 w-9/12 mx-auto overflow-hidden mb-5">
      <div className="relative">
        <img
          src={coupleImage}
          alt="Couple"
          className="w-full h-[300px] object-cover"
        />
        <div className="absolute bottom-0 left-0 bg-[#0d0d0da7] text-white w-full text-sm px-3 py-1 rounded-tr-xl">
          Married on:  {date}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`h-5 w-5 ${
                index < rating ? "text-yellow-500 " : "text-gray-300"
              }`}
              fill={index < rating ? "currentColor" : "none"}
            />
          ))}
        </div>
        <p className="text-gray-700 text-base line-clamp-4">
          {successStory}
        </p>
      </div>
    </div>
  );
};

export default StoryCard;
