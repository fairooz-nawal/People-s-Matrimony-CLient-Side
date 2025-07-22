import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../Component/Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../Loading";

const ApprovedContactRequest = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch all contact requests
    const { data: contactRequests = [], isLoading } = useQuery({
        queryKey: ["contact-requests"],
        queryFn: async () => {
            const res = await axiosSecure.get("/all-contact-requests");
            return res.data;
        }
    });


    // Mutation to approve a contact request
    const approveContactMutation = useMutation({
        mutationFn: (biodataId) =>
            axiosSecure.patch(`/change-payment-status/${biodataId}`),
        onSuccess: () => {
            queryClient.invalidateQueries(["contact-requests"]); // Refresh table
            Swal.fire({
                icon: "success",
                title: "Contact Approved",
                text: "The user can now see biodata contact details!",
                timer: 2000,
                showConfirmButton: false,
            });
        },
        onError: (err) => {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: err.response?.data?.message || "Failed to approve contact request",
            });
        }
    });

    const handleApproveContact = (biodataId) => {
        Swal.fire({
            title: "Approve Contact?",
            text: "Are you sure you want to approve this contact request?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Approve",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                approveContactMutation.mutate(biodataId);
            }
        });
    };

    if (isLoading ) {
        return <Loading></Loading>;
    }

    console.log(contactRequests)
    return (
        <div className="min-h-screen bg-gradient-to-r from-amber-500 to-pink-500 p-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full md:max-w-6xl mx-auto">
                <h1 className="text-4xl font-extrabold text-center text-pink-600 mb-6">
                    Approved Contact Requests
                </h1>

                {isLoading ? (
                    <p className="text-center text-xl font-medium text-gray-600">Loading requests...</p>
                ) : contactRequests.length === 0 ? (
                    <p className="text-center text-lg text-gray-500">No contact requests found.</p>
                ) : (
                    <div className="">
                        <table className="w-full border border-gray-300 rounded-lg shadow">
                            <thead className="bg-gradient-to-r from-pink-500 to-amber-500 text-white">
                                <tr>
                                    <th className="border px-4 py-3 text-left">Name</th>
                                    <th className="border px-4 py-3 text-left">Email</th>
                                    <th className="border px-4 py-3 text-left">Biodata ID</th>
                                    <th className="border px-4 py-3 text-left">Status</th>
                                    <th className="border px-4 py-3 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contactRequests.map((request,index) => (
                                    <tr key={index} className="hover:bg-pink-50">
                                        <td className="border px-4 py-2">{request.name}</td>
                                        <td className="border px-4 py-2">{request.email}</td>
                                        <td className="border px-4 py-2">{request.biodataId}</td>
                                        <td className="border px-4 py-2">{request.status}</td>
                                        <td className="border px-4 py-2 text-center">
                                            <button
                                                onClick={() => handleApproveContact(request._id)}
                                                className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition duration-300"
                                            >
                                                Approve Contact
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

export default ApprovedContactRequest;
