import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Component/Hooks/useAxiosSecure";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"];

const AdminDashboardCount = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch dashboard stats
    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ["dashboard-stats"],
        queryFn: async () => {
            const res = await axiosSecure.get("/success-counter");
            return res.data;
        }
    });

    const { totalFemales,totalMales,totalUsers,totalPremium,totalrevenue}=stats
// const {} = stats;
if (isLoading) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-amber-500 to-pink-500">
            <p className="text-white text-2xl font-semibold">Loading Dashboard...</p>
        </div>
    );
}

// Prepare data for Pie Chart
const genderData = [
    { name: "Male", value: totalMales || 0 },
    { name: "Female", value: totalFemales || 0 },
    { name: "Premium", value: totalPremium || 0 },
];

// Prepare data for Revenue Bar Chart
const revenueData = [
    { name: "Revenue", value: totalrevenue || 0 },
];

return (
    <div className="min-h-screen bg-gradient-to-r from-amber-500 to-pink-500 p-6">
        <h1 className="text-4xl text-center font-bold text-white mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <div className="bg-white rounded-xl shadow p-4">
                <h2 className="text-xl font-semibold mb-4 text-center">Biodata Distribution</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={genderData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) =>
                                `${name}: ${(percent * 100).toFixed(0)}%`
                            }
                        >
                            {genderData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Revenue Bar Chart */}
            <div className="bg-white rounded-xl shadow p-4">
                <h2 className="text-xl font-semibold mb-4 text-center">Total Revenue</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#FF6384" />
                    </BarChart>
                </ResponsiveContainer>
                <p className="text-center text-lg mt-2 font-bold text-green-600">
                    ${totalrevenue || 0}
                </p>
            </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white rounded-xl shadow p-4 text-center">
                <p className="text-xl font-bold">{totalUsers || 0}</p>
                <p className="text-gray-600">Total Biodata</p>
            </div>
            <div className="bg-white rounded-xl shadow p-4 text-center">
                <p className="text-xl font-bold">{totalMales || 0}</p>
                <p className="text-gray-600">Male Biodata</p>
            </div>
            <div className="bg-white rounded-xl shadow p-4 text-center">
                <p className="text-xl font-bold">{totalFemales || 0}</p>
                <p className="text-gray-600">Female Biodata</p>
            </div>
            <div className="bg-white rounded-xl shadow p-4 text-center">
                <p className="text-xl font-bold">{totalPremium || 0}</p>
                <p className="text-gray-600">Premium Biodata</p>
            </div>
        </div>
    </div>
);
};

export default AdminDashboardCount;
