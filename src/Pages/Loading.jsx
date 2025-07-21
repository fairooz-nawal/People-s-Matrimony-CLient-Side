import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-500 to-pink-500">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-white"></div>
        {/* Text */}
        <p className="text-white text-xl font-semibold">Loading... Please wait</p>
      </div>
    </div>
  );
};

export default Loading;
