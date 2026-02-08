import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useQuery } from "@tanstack/react-query";
import { getIncomeExpenseTrendAPI } from "../../services/analytics/analyticsService";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const MonthlyExpenseTrend = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["monthly-expense-trend"],
    queryFn: getIncomeExpenseTrendAPI,
  });

  if (isLoading) return <p>Loading expense trend...</p>;
  if (isError) return <p>Failed to load expense trend</p>;


  // ✅ Sort months correctly
  const sortedData = [...data].sort(
    (a, b) => a._id.month - b._id.month
  );

  const chartData = {
    labels: sortedData.map(
      (item) => monthNames[item._id.month - 1]
    ),
    datasets: [
      {
        label: "Monthly Expense",
        data: sortedData.map((item) => item.totalExpense),
        backgroundColor: "#EF4444", // Tailwind red-500 vibe
        borderRadius: 8,
        barThickness: 40,
      },
    ],
  };

  return (
    <div className="my-8 mx-2 sm:mx-4 lg:mx-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 text-gray-800">
        Monthly Expense Overview
      </h2>

      <div className="h-[350px]">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: "bottom" },
              tooltip: {
                callbacks: {
                  label: (ctx) => `₹${ctx.raw}`,
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: (value) => `₹${value}`,
                },
                grid: {
                  color: "#E5E7EB",
                },
              },
              x: {
                grid: {
                  display: false,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default MonthlyExpenseTrend;
