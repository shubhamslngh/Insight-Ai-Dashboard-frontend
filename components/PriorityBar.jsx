"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
  LabelList,
} from "recharts";

export default function PriorityBar({ tasks = [] }) {
  // Count priorities
  const counts = { High: 0, Medium: 0, Low: 0 };
  tasks.forEach((t) => {
    if (t.priority && counts[t.priority] !== undefined) counts[t.priority]++;
  });

  const data = Object.entries(counts).map(([name, value]) => ({ name, value }));

  const COLORS = {
    High: "#ef4444",
    Medium: "#f59e0b",
    Low: "#10b981",
  };

  return (
    <div className="w-full h-64 min-w-0">
      {/* min-w-0 ensures Recharts can measure inside flex/grid containers */}
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
            ))}
            <LabelList dataKey="value" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
