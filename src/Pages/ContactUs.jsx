// components/ContactUs.jsx
import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert('Thanks for contacting us!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-amber-500 to-pink-500 py-[180px] px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl w-full">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Your Email"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Your Message"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-pink-500 text-white py-2 rounded-md font-semibold text-lg hover:scale-105 transition-transform"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
