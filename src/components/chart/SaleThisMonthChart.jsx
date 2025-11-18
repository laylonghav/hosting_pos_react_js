import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function SaleThisMonthChart({ data }) {
  if (!data) return null;

  const avgSale = data?.total_order ? data.total / data.total_order : 0;

  const chartData = [
    { name: "Total Sale ($)", value: data?.total },
    { name: "Total Orders", value: data?.total_order },
    { name: "Avg per Order ($)", value: avgSale },
  ];

  const COLORS = ["#4f46e5", "#06b6d4", "#f59e0b"];

  return (
    <div className="p-6 rounded-xl shadow bg-white w-full sm:w-[400px]">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        Sale This Month
      </h2>

      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {chartData.map((_, index) => (
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

      <div className="mt-4 text-center">
        <p className="text-xl font-bold text-gray-800">
          ${data?.total?.toFixed(2)}
        </p>
        <p className="text-sm text-gray-500">
          Orders: {data?.total_order} | Avg: ${avgSale?.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
