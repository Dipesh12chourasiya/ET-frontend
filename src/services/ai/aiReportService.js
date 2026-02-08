import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

// ================= AI MONTHLY REPORT =================
export const getMonthlyAIReportAPI = async () => {
  const token = getUserFromStorage();

  const response = await axios.get(
    `${BASE_URL}/ai/monthly-report`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
