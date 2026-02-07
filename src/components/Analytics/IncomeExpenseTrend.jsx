import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { getIncomeExpenseTrendAPI } from "../../services/analytics/analyticsService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title
);

const IncomeExpenseTrend = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

  useEffect(() => {
    const fetchTrend = async () => {
      try {
        const data = await getIncomeExpenseTrendAPI();

        // Transform API response
        const monthlyData = {};

        data.forEach((item) => {
          const month = item._id.month;

          if (!monthlyData[month]) {
            monthlyData[month] = { income: 0, expense: 0 };
          }

          monthlyData[month][item._id.type] = item.total;
        });

        const months = Object.keys(monthlyData).sort((a, b) => a - b);

        setChartData({
          labels: months.map((m) => monthNames[m - 1]),

          datasets: [
            {
              label: "Income",
              data: months.map((m) => monthlyData[m].income),
              backgroundColor: "#36A2EB",
              borderRadius: 6,
            },
            {
              label: "Expense",
              data: months.map((m) => monthlyData[m].expense),
              backgroundColor: "#FF6384",
              borderRadius: 6,
            },
          ],
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrend();
  }, []);

  if (loading) return <p>Loading trend...</p>;

  return (
    <div className="my-8 mx-2 sm:mx-4 lg:mx-6 p-6 bg-white rounded-lg shadow-xl border border-gray-200">

      <h2 className="text-2xl font-bold text-center mb-6">
        Monthly Income vs Expense
      </h2>

      <div style={{ height: "380px" }}>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  padding: 20,
                  boxWidth: 14,
                  font: {
                    size: 14,
                  },
                },
              },
              title: {
                display: false,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: (value) => `₹${value}`,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default IncomeExpenseTrend;