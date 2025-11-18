import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function SaleChart({ data }) {
  // data.sale_summary_by_months will be array [{ total, title }]

  return (
    <div className="w-full flex justify-center">
      <BarChart width={500} height={300} data={data.sale_summary_by_months}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="title"
          label={{ value: "Month", position: "insideBottom", dy: 10 }}
        />
        <YAxis
          label={{ value: "Total Sale", angle: -90, position: "insideLeft" }}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" />
      </BarChart>
    </div>
  );
}
