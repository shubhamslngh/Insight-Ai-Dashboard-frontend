"use client";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface Task {
  id: string;
  text: string;
  status: "pending" | "completed";
  priority?: "High" | "Medium" | "Low";
}

interface ProgressPieProps {
  tasks: Task[];
}

export default function ProgressPie({ tasks }: ProgressPieProps) {
  const completed = tasks.filter((t) => t.status === "completed").length;
  const pending = tasks.length - completed;

  const data = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
  ];

  const COLORS = ["#10b981", "#f59e0b"];

  return (
    <div className="w-full h-64 min-w-0">
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius="70%"
            label
            dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
