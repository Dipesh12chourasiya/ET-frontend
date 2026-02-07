import React from "react";

import MonthlySummary from "../Analytics/MonthlySummary";
import CategoryAnalytics from "../Analytics/CategoryAnalytics";
import IncomeExpenseTrend from "../Analytics/IncomeExpenseTrend";

import TransactionChart from "../Transactions/TransactionChart";
import TransactionList from "../Transactions/TransactionList";

const Dashboard = () => {
  return (
    <>
      <MonthlySummary />
      <CategoryAnalytics />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <IncomeExpenseTrend />
        <TransactionChart />
      </div>

      <TransactionList />
    </>
  );
};

export default Dashboard;
