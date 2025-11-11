import React from "react";
import Progress from "../../components/ui/progress";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const salesData = [
  { day: "Mon", sales: 120 },
  { day: "Tue", sales: 200 },
  { day: "Wed", sales: 150 },
  { day: "Thu", sales: 300 },
  { day: "Fri", sales: 250 },
  { day: "Sat", sales: 220 }, 
  { day: "Sun", sales: 180 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-gray-50 to-gray-100 space-y-8">
      <h1 className="text-4xl font-bold text-gray-800">📊 Admin Dashboard</h1>

      
      <div className="bg-white rounded-3xl shadow-xl p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Haftalik Sotuvlar</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <XAxis dataKey="day" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip contentStyle={{ backgroundColor: "#F9FAFB", borderRadius: 8 }} />
            <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={3} dot={{ r: 5, fill: "#3B82F6" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-700">Maqsadga erishish</h2>
        <p className="text-gray-500">Hozirgi rejani 73% bajarildi</p>
        <Progress value={73} />
      </div>
      
    </div>
  );
};

export default Dashboard;
