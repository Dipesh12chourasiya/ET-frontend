import React, { useEffect, useState } from "react";
import { getMonthlySummaryAPI } from "../../services/analytics/analyticsService";

const MonthlySummary = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getMonthlySummaryAPI();
        setSummary(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading)
    return (
      <div className="my-6 mx-2 sm:mx-4 lg:mx-6 p-6 bg-white rounded-xl shadow-lg text-center text-gray-500">
        Loading monthly summary...
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-6 mx-2 sm:mx-4 lg:mx-6">
      {/* Total Income */}
      <div className="p-6 bg-green-50 rounded-xl shadow-md flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300">
        <h4 className="text-sm font-medium text-gray-600 mb-2">Total Income</h4>
        <p className="text-2xl font-bold text-green-700">₹{summary?.income}</p>
      </div>

      {/* Total Expense */}
      <div className="p-6 bg-red-50 rounded-xl shadow-md flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300">
        <h4 className="text-sm font-medium text-gray-600 mb-2">Total Expense</h4>
        <p className="text-2xl font-bold text-red-700">₹{summary?.expense}</p>
      </div>

      {/* Savings */}
      <div className="p-6 bg-blue-50 rounded-xl shadow-md flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300">
        <h4 className="text-sm font-medium text-gray-600 mb-2">Savings</h4>
        <p className="text-2xl font-bold text-blue-700">₹{summary?.savings}</p>
      </div>
    </div>
  );
};

export default MonthlySummary;
