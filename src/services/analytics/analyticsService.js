import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

// ================= MONTHLY SUMMARY =================
export const getMonthlySummaryAPI = async () => {
  const token = getUserFromStorage();

  const response = await axios.get(
    `${BASE_URL}/analytics/monthly-summary`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// ================= CATEGORY-WISE ANALYTICS =================
export const getCategoryAnalyticsAPI = async () => {
  const token = getUserFromStorage();

  const response = await axios.get(
    `${BASE_URL}/analytics/category-wise`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// ================= EXPENSE TREND =================
export const getIncomeExpenseTrendAPI = async () => {
  const token = getUserFromStorage();

  const response = await axios.get(
    `${BASE_URL}/analytics/monthly-expense-trend`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};