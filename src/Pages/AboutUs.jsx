// components/AboutUs.jsx
import React from 'react';

const AboutUs = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-amber-500 to-pink-500 py-[180px] px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl w-full text-gray-800">
        <h2 className="text-4xl font-extrabold text-center mb-6">About Us</h2>
        <div className="space-y-4 text-lg">
          <p>
            Welcome to <span className="font-bold text-pink-600">MatchMate</span> – your trusted partner in finding your perfect match.
          </p>
          <p>
            Our mission is to connect individuals through a secure, smart, and emotionally resonant platform, crafted with the latest technology.
          </p>
          <p>
            We believe in love that lasts. With intelligent biodata filtering, private messaging, and premium matchmaking features, we’re making
            the journey to love simple and elegant.
          </p>
          <p>
            Join our community of thousands who are already sharing their success stories and celebrating the magic of connection.
          </p>
          <p className="font-medium text-center text-amber-600">
            Let MatchMate be the beginning of your forever.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
