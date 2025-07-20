import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../Component/Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MakeAdmin = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch users by name
    const { data: users = [], refetch, isFetching } = useQuery({
        queryKey: ["searched-users", searchTerm],
        queryFn: async () => {
            if (!searchTerm) return [];
            const res = await axiosSecure.get(`/adminsearch?email=${searchTerm}`);
            return res.data;
        },
        enabled: false,
    });

    // Toggle Admin Mutation
    const toggleAdminMutation = useMutation({
        mutationFn: ({ userId, action }) =>
            axiosSecure.patch(`/admin/toggle-admin/${userId}`, { action }),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries(["searched-users", searchTerm]);
            Swal.fire({
                icon: "success",
                title: "Success",
                text:
                    variables.action === "make"
                        ? "User has been promoted to Admin!"
                        : "User has been removed from Admin!",
                timer: 2000,
                showConfirmButton: false,
            }).then(() => {
                refetch();
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
            queryClient.invalidateQueries(["searched-users", searchTerm]);
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "User has been upgraded to Premium!",
                timer: 2000,
                showConfirmButton: false,
            }).then(() => {
                refetch();
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

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchTerm) {
            Swal.fire("Warning", "Please enter a username to search!", "warning");
            return;
        }
        refetch();
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

    return (
        <div className="min-h-screen flex justify-center items-center">

            <div className="p-6 max-w-5xl mx-auto border rounded shadow">
                <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

                {/* Search Form */}
                <form onSubmit={handleSearch} className="flex gap-2 mb-6">
                    <input
                        type="text"
                        placeholder="Search by username"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border px-3 py-2 rounded w-full"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Search
                    </button>
                </form>

                {/* Users Table */}
                {isFetching ? (
                    <p>Loading...</p>
                ) : users.length > 0 ? (
                    <table className="w-full border-collapse border">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border px-3 py-2">Name</th>
                                <th className="border px-3 py-2">Email</th>
                                <th className="border px-3 py-2">Role</th>
                                <th className="border px-3 py-2">Premium</th>
                                <th className="border px-3 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
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
                                            {user.role === "admin" ? "Remove Admin" : "Make Admin"}
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
        </div>

    );
};

export default MakeAdmin;
