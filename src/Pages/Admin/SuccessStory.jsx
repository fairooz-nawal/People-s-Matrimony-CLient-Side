import React, { useState } from 'react';
import useAxiosSecure from '../../Component/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const SuccessStory = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedStory, setSelectedStory] = useState(null);

    const { data: successStory = [], isLoading } = useQuery({
        queryKey: ["success-story-admin"],
        queryFn: async () => {
            const res = await axiosSecure.get("/success-stories");
            return res.data;
        }
    });

    const handleStories = (story) => {
        setSelectedStory(story);
    };

    const closeModal = () => {
        setSelectedStory(null);
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-r from-amber-500 to-pink-500 p-6">
            <div className="bg-white rounded-xl shadow p-6 max-w-5xl mx-auto">
                <h1 className="text-4xl font-extrabold text-center text-pink-600 mb-6">Success Stories</h1>

                {isLoading ? (
                    <p className="text-center text-lg font-semibold">Loading requests...</p>
                ) : successStory.length === 0 ? (
                    <p className="text-center text-gray-500">No success stories found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border border-gray-300 rounded-lg">
                            <thead className="bg-gradient-to-r from-amber-500 to-pink-500 text-white">
                                <tr>
                                    <th className="border px-4 py-2">Male ID</th>
                                    <th className="border px-4 py-2">Female ID</th>
                                    <th className="border px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {successStory.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-50">
                                        <td className="border px-4 py-2">{user.selfBiodataId}</td>
                                        <td className="border px-4 py-2">{user.partnerBiodataId}</td>
                                        <td className="border px-4 py-2">
                                            <button
                                                onClick={() => handleStories(user)}
                                                className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                                            >
                                                View Story
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal */}
            {selectedStory && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-3 text-gray-600 hover:text-red-500 text-xl"
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold text-pink-600 mb-4">Success Story</h2>
                        <div className="w-[200px] h-[200px]"><img src={selectedStory.coupleImage} alt="" /></div>
                        <p><strong>Male Biodata ID:</strong> {selectedStory.selfBiodataId}</p>
                        <p><strong>Female Biodata ID:</strong> {selectedStory.partnerBiodataId}</p>
                        <p className="mt-3"><strong>Description:</strong></p>
                        <p className="text-gray-700 mt-1">{selectedStory.successStory || "No description available."}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SuccessStory;
