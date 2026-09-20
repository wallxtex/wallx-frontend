import React from "react";
import { Store, PaintBucket, Ticket, MessageSquareMore } from "lucide-react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const metricsData = [
  {
    id: 1,
    label: "Total Painters",
    sublabel: "PaintBucket",
    value: "1,280",
    rawValue: 1280,
    icon: PaintBucket,
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
    iconBg: "bg-orange-100",
    chartColor: "rgb(249, 115, 22)",
  },
  {
    id: 2,
    label: "Total Dealers",
    sublabel: "Store",
    value: "47",
    rawValue: 47,
    icon: Store,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
    chartColor: "rgb(59, 130, 246)",
  },
  {
    id: 3,
    label: "Total Coupons",
    sublabel: "Ticket",
    value: "3,120",
    rawValue: 3120,
    icon: Ticket,
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
    chartColor: "rgb(16, 185, 129)",
  },
  {
    id: 4,
    label: "Visit Enquiries",
    sublabel: "MessageSquareMore",
    value: "19",
    rawValue: 19,
    icon: MessageSquareMore,
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
    iconBg: "bg-purple-100",
    chartColor: "rgb(168, 85, 247)",
  },
];

const KeyPerformanceMetrics = () => {
  // Prepare chart data
  const chartData = {
    labels: metricsData.map((metric) => metric.label),
    datasets: [
      {
        label: "Count",
        data: metricsData.map((metric) => metric.rawValue),
        backgroundColor: metricsData.map((metric) => metric.chartColor),
        borderColor: "#ffffff",
        borderWidth: 3,
        hoverOffset: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 15,
          font: {
            size: 12,
            weight: "500",
          },
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleFont: {
          size: 14,
          weight: "600",
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Key Performance Metrics
        </h2>
        <p className="text-xs text-gray-500 mt-1">मुख्य प्रदर्शन के लिए मीटर</p>
      </div>

      {/* Two-column layout: Stats cards on left, Chart on right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left side - Stats cards (2 columns within) */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {metricsData.map((metric) => (
              <div
                key={metric.id}
                className={`${metric.bgColor} rounded-xl p-6 transition-all duration-200 hover:shadow-md`}
              >
                {/* Icon and Label */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`${metric.iconBg} p-2.5 rounded-lg`}>
                    <metric.icon className={`w-5 h-5 ${metric.iconColor}`} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      {metric.label}
                    </div>
                    <div className="text-xs text-gray-500">
                      {metric.sublabel}
                    </div>
                  </div>
                </div>

                {/* Large Value */}
                <div className="text-4xl font-bold text-gray-900">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Doughnut Chart */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 h-full flex flex-col justify-center">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 text-center">
              Distribution Overview
            </h3>
            <div className="w-full max-w-sm mx-auto">
              <Doughnut data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyPerformanceMetrics;
