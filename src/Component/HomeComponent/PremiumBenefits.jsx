import React from 'react';

const benefits = [
  "View full profile details of other users",
  "Send direct contact requests",
  "Get featured in premium user listings",
  "Priority support from our team",
  "Increased visibility and matching chances",
];

const PremiumBenefits = () => {
  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Premium?</h2>
        <p className="text-gray-600 mb-8">
          Unlock exclusive features to enhance your matchmaking experience and increase your chances of finding the right one.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-md p-5 border border-gray-200 hover:shadow-lg transition"
            >
              <span className="text-green-600 font-semibold">✓</span>{' '}
              <span className="ml-2 text-gray-700">{benefit}</span>
            </div>
          ))}
        </div>
        <button className="mt-10 bg-pink-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-pink-700 transition">
          Upgrade to Premium
        </button>
      </div>
    </div>
  );
};

export default PremiumBenefits;
