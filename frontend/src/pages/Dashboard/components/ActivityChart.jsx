import React, { useContext } from "react";
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
import { ThemeContext } from "../../../context/ThemeContext";

const ActivityChart = ({ data }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const chartColors = isDark
    ? {
        grid: "rgba(255, 255, 255, 0.1)",
        axis: "#94a3b8",
        cursor: "rgba(255, 255, 255, 0.05)",
        tooltipBg: "#0f172a",
        tooltipBorder: "#1e293b",
        tooltipText: "#f8fafc",
        barPrimary: "#22d3ee",
        barSecondary: "#3b82f6",
      }
    : {
        grid: "rgba(0, 0, 0, 0.05)",
        axis: "#64748b",
        cursor: "rgba(0, 0, 0, 0.02)",
        tooltipBg: "#ffffff",
        tooltipBorder: "#e2e8f0",
        tooltipText: "#1e293b",
        barPrimary: "#0891b2",
        barSecondary: "#2563eb",
      };

  return (
    <div className="dashboard-chart theme-bg-surface p-6 rounded-2xl theme-border border shadow-sm h-[400px] flex flex-col">
      <h3 className="text-lg font-bold theme-text-primary mb-6">Daily Activity</h3>
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
                boxShadow: "var(--shadow-heavy)",
                color: chartColors.tooltipText,
              }}
              itemStyle={{ color: chartColors.tooltipText }}
              labelStyle={{ color: chartColors.tooltipText, fontWeight: "bold", marginBottom: "4px" }}
              formatter={(value, name) => [
                `${Math.floor(value / 60)}m ${value % 60}s`,
                name === "watchTime" ? "Watch Time" : "App Usage",
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
              name="Watch Time"
              fill={chartColors.barPrimary}
              radius={[4, 4, 0, 0]}
              barSize={30}
            />
            <Bar
              dataKey="appOpenTime"
              name="App Usage"
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
