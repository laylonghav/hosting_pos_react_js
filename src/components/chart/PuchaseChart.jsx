import React from "react";
import { Bar, BarChart, CartesianAxis, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

function PuchaseChart({ data }) {
  const chartData = data?.flatMap((purchase) =>
    purchase.product_purchase.map((item) => ({
      name: item.product?.name,
      total: Number(item.qty) * Number(item.cost),
    }))
  );
  return (
    <div className="grid bg-blue-200">
      <BarChart width={1200} height={500} data={chartData}>
        <CartesianGrid strokeDasharray={"3 3"} />
        <XAxis dataKey={"name"} />
        <YAxis />
        <Tooltip />
        <Bar dataKey={"total"} />
      </BarChart>
    </div>
  );
}

export default PuchaseChart;
