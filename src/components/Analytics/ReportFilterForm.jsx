import React, { useState } from "react";
import { downloadFilteredReportAPI } from "../../services/analytics/analyticsService.js";

const ReportFilterForm = () => {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    type: "",
    category: "",
  });

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleDownload = async () => {
    try {
      const blob = await downloadFilteredReportAPI(filters);

      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Filtered_Expense_Report.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Download failed", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 space-y-4">
      <h3 className="text-lg font-semibold">Download Custom Report</h3>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

        <input
          type="date"
          name="startDate"
          onChange={handleChange}
          className="border p-2 rounded-md"
        />

        <input
          type="date"
          name="endDate"
          onChange={handleChange}
          className="border p-2 rounded-md"
        />

        <select
          name="type"
          onChange={handleChange}
          className="border p-2 rounded-md"
        >
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          type="text"
          name="category"
          placeholder="Category (optional)"
          onChange={handleChange}
          className="border p-2 rounded-md"
        />

    <button
        onClick={handleDownload}
        className="bg-black text-white px-5 py-2.5 rounded-xl hover:bg-gray-800 transition"
      >
        Download Report
      </button>
      </div>

    </div>
  );
};

export default ReportFilterForm;
