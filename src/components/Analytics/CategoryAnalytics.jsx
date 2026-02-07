import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { getCategoryAnalyticsAPI } from "../../services/analytics/analyticsService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
);

const CategoryAnalytics = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const data = await getCategoryAnalyticsAPI();
        setCategories(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, []);

  if (loading)
    return (
      <div className="p-4 bg-white rounded-lg shadow text-center text-gray-500">
        Loading category analytics...
      </div>
    );

  if (categories.length === 0)
    return (
      <div className="p-4 bg-white rounded-lg shadow text-center text-gray-500">
        No category data available
      </div>
    );

  // Prepare Bar chart data
  const barData = {
    labels: categories.map((c) => c._id),
    datasets: [
      {
        label: "Spending (₹)",
        data: categories.map((c) => c.total),
        backgroundColor: "#36A2EB",
        borderRadius: 6,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Spending per Category" },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { callback: (value) => `₹${value}` },
      },
    },
  };

  // Prepare Pie chart data
  const pieData = {
    labels: categories.map((c) => c._id),
    datasets: [
      {
        data: categories.map((c) => c.total),
        backgroundColor: [
          "#36A2EB",
          "#FF6384",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverOffset: 8,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: { display: true, text: "Spending Distribution" },
    },
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg border border-gray-200 mx-2 sm:mx-4 lg:mx-6 my-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        Category Analytics
      </h2>

      {/* Responsive grid: 1 column mobile, 2 columns desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="h-64 sm:h-80">
          <Bar data={barData} options={barOptions} />
        </div>

        {/* Pie Chart */}
        <div className="h-64 sm:h-80">
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
    </div>
  );
};

export default CategoryAnalytics;
