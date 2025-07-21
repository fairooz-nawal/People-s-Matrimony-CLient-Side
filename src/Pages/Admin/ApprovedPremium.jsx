import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../Component/Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ApprovedPremium = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch all pending premium requests
    const { data: requests = [], isLoading } = useQuery({
        queryKey: ["premium-requests"],
        queryFn: async () => {
            const res = await axiosSecure.get("/approvePremium");
            return res.data; 
        }
    });

    // Mutation to approve premium
    const approvePremiumMutation = useMutation({
        mutationFn: (biodataId) => axiosSecure.patch(`/admin/make-premium/${biodataId}`),
        onSuccess: () => {
            queryClient.invalidateQueries(["premium-requests"]); // refetch data
            Swal.fire({
                icon: "success",
                title: "Approved",
                text: "User has been upgraded to Premium!",
                timer: 2000,
                showConfirmButton: false,
            });
        },
        onError: (err) => {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: err.response?.data?.message || "Failed to approve premium",
            });
        }
    });

    const handleMakePremium = (biodataId) => {
        Swal.fire({
            title: "Make Premium?",
            text: "Are you sure you want to make this user premium?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Approve",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                approvePremiumMutation.mutate(biodataId);
            }
        });
    };
    console.log(requests)
    return (
        <div className="min-h-screen bg-gradient-to-r from-amber-500 to-pink-500 p-6">
            <div className="bg-white rounded-xl shadow p-6 max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-4 text-center text-pink-600">Premium Approval Requests</h1>

                {isLoading ? (
                    <p className="text-center text-lg font-semibold">Loading requests...</p>
                ) : requests.length === 0 ? (
                    <p className="text-center text-gray-500">No premium approval requests found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border border-gray-300 rounded-lg">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border px-4 py-2">Name</th>
                                    <th className="border px-4 py-2">Email</th>
                                    <th className="border px-4 py-2">BioId</th>
                                    <th className="border px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map((user) => (
                                    <tr key={user.biodataId} className="hover:bg-gray-50">
                                        <td className="border px-4 py-2">{user.reqName}</td>
                                        <td className="border px-4 py-2">{user.reqEmail}</td>
                                        <td className="border px-4 py-2">{user.reqBioId}</td>
                                        <td className="border px-4 py-2">
                                            <button
                                                onClick={() => handleMakePremium(user.biodataId)}
                                                className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                                            >
                                                Make Premium
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ApprovedPremium;
