import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import MonthlySummary from "../Analytics/MonthlySummary";
import CategoryAnalytics from "../Analytics/CategoryAnalytics";
import IncomeExpenseTrend from "../Analytics/IncomeExpenseTrend";

import TransactionChart from "../Transactions/TransactionChart";
import TransactionList from "../Transactions/TransactionList";

import MonthlyAIReport from "../AI/MonthlyAIReport";
import { getMonthlyAIReportAPI } from "../../services/ai/aiReportService";

const Dashboard = () => {
  const [showReport, setShowReport] = useState(false);

  const { mutateAsync, isPending, isError, data } = useMutation({
    mutationFn: getMonthlyAIReportAPI,
    mutationKey: ["monthly-ai-report"],
  });

  const handleGenerateReport = async () => {
    setShowReport(true);
    await mutateAsync();
  };

  return (
    <div className="space-y-6">
      <MonthlySummary />
      <CategoryAnalytics />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <IncomeExpenseTrend />
        <TransactionChart />
      </div>

      <TransactionList />

      {/* AI report */}
      {/* AI REPORT SECTION */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 px-6 py-5 md:px-8 md:py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Left */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 flex items-center gap-2">
              AI Financial Insights
            </h3>
            <p className="text-sm text-gray-500 mt-1 max-w-md">
              Get a smart summary of your spending patterns, trends, and savings
              powered by AI.
            </p>
          </div>

          {/* Right */}
          <button
            onClick={handleGenerateReport}
            disabled={isPending}
            className="
        inline-flex items-center justify-center
        bg-black text-white
        px-5 py-2.5
        rounded-xl
        text-sm font-medium
        hover:bg-gray-800
        transition-all
        disabled:opacity-60
        disabled:cursor-not-allowed
        w-full sm:w-auto
      "
          >
            {isPending ? "Generating…" : "Generate AI Report"}
          </button>
        </div>
      </div>

      {/* 🔹 Render AI Report */}
      {showReport && (
        <div className="mt-6">
          <MonthlyAIReport
            report={data?.aiReport}
            loading={isPending}
            error={isError ? "Failed to generate AI report" : ""}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
