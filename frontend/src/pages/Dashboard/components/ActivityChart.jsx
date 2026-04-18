import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const ActivityChart = ({ data }) => {
  // Transform data for chart if needed, or assume data is passed in correct format
  // Expected data: [{ date: '2023-10-27', watchTime: 120, appOpenTime: 300 }]

  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");

  const chartColors = isDark
    ? {
        grid: "#334155",
        axis: "#cbd5e1",
        cursor: "rgba(51, 65, 85, 0.45)",
        tooltipBg: "rgba(15, 23, 42, 0.96)",
        tooltipBorder: "#475569",
        tooltipText: "#e2e8f0",
        barPrimary: "#34d399",
        barSecondary: "#60a5fa",
      }
    : {
        grid: "#334155",
        axis: "#cbd5e1",
        cursor: "rgba(51, 65, 85, 0.45)",
        tooltipBg: "rgba(15, 23, 42, 0.96)",
        tooltipBorder: "#475569",
        tooltipText: "#e2e8f0",
        barPrimary: "#34d399",
        barSecondary: "#60a5fa",
      };

  return (
    <div className="dashboard-chart bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-800 h-[400px] flex flex-col">
      <h3 className="text-lg font-bold text-slate-100 mb-6">Daily Activity</h3>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={chartColors.grid}
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: chartColors.axis, fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: chartColors.axis, fontSize: 12 }}
              tickFormatter={(val) => `${Math.round(val / 60)}m`}
            />
            <Tooltip
              cursor={{ fill: chartColors.cursor }}
              contentStyle={{
                borderRadius: "12px",
                border: `1px solid ${chartColors.tooltipBorder}`,
                backgroundColor: chartColors.tooltipBg,
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.22)",
                color: chartColors.tooltipText,
              }}
              labelStyle={{ color: chartColors.tooltipText }}
              formatter={(value, name) => [
                `${Math.floor(value / 60)}m ${value % 60}s`,
                name,
              ]}
            />
            <Legend
              wrapperStyle={{
                paddingTop: "20px",
                color: chartColors.axis,
              }}
            />
            <Bar
              dataKey="watchTime"
              name="Watch Time (sec)"
              fill={chartColors.barPrimary}
              radius={[4, 4, 0, 0]}
              barSize={30}
            />
            <Bar
              dataKey="appOpenTime"
              name="App Open Time (sec)"
              fill={chartColors.barSecondary}
              radius={[4, 4, 0, 0]}
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActivityChart;
