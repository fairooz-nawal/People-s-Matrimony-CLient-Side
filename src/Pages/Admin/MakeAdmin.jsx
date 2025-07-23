import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../Component/Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MakeAdmin = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showSearchResults, setShowSearchResults] = useState(false);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch all users on page load
    const { data: allUsers = [], isLoading: allUsersLoading } = useQuery({
        queryKey: ["all-users"],
        queryFn: async () => {
            const res = await axiosSecure.get('/registereduser');
            return res.data;
        }
    });

    // Fetch users by search
    const { data: searchUsers = [], refetch: refetchSearch, isFetching: isSearching } = useQuery({
        queryKey: ["searched-users", searchTerm],
        queryFn: async () => {
            const res = await axiosSecure.get(`/adminsearch?email=${searchTerm}`);
            return res.data;
        },
        enabled: false, // Don't fetch until explicitly called
    });

    // Toggle Admin Mutation
    const toggleAdminMutation = useMutation({
        mutationFn: ({ userId, action }) =>
            axiosSecure.patch(`/admin/toggle-admin/${userId}`, { action }),
        onSuccess: (_, variables) => {
            // Refresh user data
            queryClient.invalidateQueries(["all-users"]);
            if (showSearchResults) {
                refetchSearch();
            }
            Swal.fire({
                icon: "success",
                title: "Success",
                text:
                    variables.action === "make"
                        ? "User has been promoted to Admin!"
                        : "User has been removed from Admin!",
                timer: 2000,
                showConfirmButton: false,
            });
        },
        onError: (err) => {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: err.response?.data?.message || "Failed to update user role",
            });
        },
    });

    // Make Premium Mutation
    const makePremiumMutation = useMutation({
        mutationFn: (userId) => axiosSecure.patch(`/admin/make-premium/${userId}`),
        onSuccess: () => {
            // Refresh user data
            queryClient.invalidateQueries(["all-users"]);
            if (showSearchResults) {
                refetchSearch();
            }
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "User has been upgraded to Premium!",
                timer: 2000,
                showConfirmButton: false,
            });
        },
        onError: (err) => {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: err.response?.data?.message || "Failed to make user premium",
            });
        },
    });

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) {
            setShowSearchResults(false); // Show all users if search is empty
            return;
        }
        setShowSearchResults(true);
        await refetchSearch(); // Fetch searched users
    };

    const toggleAdmin = (userId, currentRole) => {
        const action = currentRole === "admin" ? "remove" : "make";
        Swal.fire({
            title: action === "make" ? "Make Admin?" : "Remove Admin?",
            text: `Are you sure you want to ${action} admin rights?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                toggleAdminMutation.mutate({ userId, action });
            }
        });
    };

    const makePremium = (userId) => {
        Swal.fire({
            title: "Make Premium?",
            text: "Are you sure you want to make this user premium?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                makePremiumMutation.mutate(userId);
            }
        });
    };

    // Decide which user list to show
    const usersToDisplay = showSearchResults ? searchUsers : allUsers;

    return (

        <div className="p-6 w-full mx-auto border rounded shadow bg-white overflow-x-auto">
            <h1 className="text-4xl font-extrabold text-center text-pink-600 mb-6">Manage Users</h1>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Search by email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border px-3 py-2 rounded w-full"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {isSearching ? "Searching..." : "Search"}
                </button>
            </form>

            {/* Users Table */}
            {allUsersLoading ? (
                <p>Loading users...</p>
            ) : usersToDisplay?.length > 0 ? (
                <table className="w-full border-collapse border">
                    <thead className="bg-gray-200">
                        <tr className="bg-gradient-to-r from-amber-500 to-pink-500 p-6 text-white">
                            <th className="border px-3 py-2">Name</th>
                            <th className="border px-3 py-2">Email</th>
                            <th className="border px-3 py-2">Role</th>
                            <th className="border px-3 py-2">Premium</th>
                            <th className="border px-3 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersToDisplay.map((user) => (
                            <tr key={user._id}>
                                <td className="border px-3 py-2">{user.name || "N/A"}</td>
                                <td className="border px-3 py-2">{user.email}</td>
                                <td className="border px-3 py-2">
                                    {user.role === "admin" ? (
                                        <span className="text-green-600">Admin</span>
                                    ) : (
                                        <span className="text-gray-600">User</span>
                                    )}
                                </td>
                                <td className="border px-3 py-2">
                                    {user.premium ? (
                                        <span className="text-yellow-600">Premium</span>
                                    ) : (
                                        <span className="text-gray-600">Standard</span>
                                    )}
                                </td>
                                <td className="border px-3 py-2 flex gap-2">
                                    <button
                                        onClick={() => toggleAdmin(user._id, user.role)}
                                        className={`px-3 py-1 rounded text-white ${user.role === "admin" ? "bg-red-500" : "bg-green-600"
                                            }`}
                                    >
                                        {user.role === "admin"
                                            ? "Remove Admin"
                                            : "Make Admin"}
                                    </button>
                                    {!user.premium && (
                                        <button
                                            onClick={() => makePremium(user._id)}
                                            className="px-3 py-1 rounded bg-yellow-500 text-white"
                                        >
                                            Make Premium
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No users found.</p>
            )}
        </div>

    );
};

export default MakeAdmin;
