import React, { useRef } from "react";
import ReactMarkdown from "react-markdown";
import html2pdf from "html2pdf.js";

const MonthlyAIReport = ({ report, loading, error }) => {
  const reportRef = useRef(null);

  if (loading) {
    return (
      <p className="text-center mt-6">🤖 Generating AI report...</p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 mt-6">
        {error}
      </p>
    );
  }

  const handleDownloadPDF = () => {
    const element = reportRef.current;

    const options = {
      margin: 0.5,
      filename: "AI_Monthly_Financial_Report.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(options).from(element).save();
  };

 return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3">
    <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <h2 className="text-lg md:text-xl font-semibold">
          📊 Monthly AI Financial Report
        </h2>

        <button
          onClick={handleDownloadPDF}
          className="bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          ⬇ Download PDF
        </button>
      </div>

      {/* Scrollable Content */}
      <div
        ref={reportRef}
        className="
          max-h-[70vh]
          overflow-y-auto
          px-6 py-5
          prose prose-sm md:prose-base
          max-w-none
          text-gray-800
        "
      >
        <ReactMarkdown>{report}</ReactMarkdown>
      </div>
    </div>
  </div>
);

}

export default MonthlyAIReport;
