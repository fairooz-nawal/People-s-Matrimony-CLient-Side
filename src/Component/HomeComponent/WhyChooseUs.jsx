import React from 'react';
import { FaHeart, FaShieldAlt, FaSmile, FaHandshake } from 'react-icons/fa';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaShieldAlt className="text-4xl text-sky-500" />,
      title: 'Safe & Verified Profiles',
      description: 'Every profile is manually reviewed to ensure safety and authenticity.',
    },
    {
      icon: <FaHeart className="text-4xl text-rose-400" />,
      title: 'Genuine Matches',
      description: 'We connect people with serious intent to build lifelong relationships.',
    },
    {
      icon: <FaHandshake className="text-4xl text-lime-500" />,
      title: 'Simple & Elegant Design',
      description: 'Easy to navigate and built to help you focus on finding the right match.',
    },
    {
      icon: <FaSmile className="text-4xl text-amber-400" />,
      title: 'Thousands of Happy Stories',
      description: 'Join a growing community of successful matches and beautiful journeys.',
    },
  ];

  return (
    <section className="py-16 bg-[#f9fafb]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose People's Matrimony?</h2>
        <p className="text-gray-600 text-lg mb-12">
          We're more than just a matchmaking platform — we're a place where stories begin.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white shadow-sm hover:shadow-md transition rounded-lg p-6 border border-gray-100"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">{feature.title}</h3>
              <p className="text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
