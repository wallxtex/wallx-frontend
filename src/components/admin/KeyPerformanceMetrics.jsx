import React, { useState, useEffect } from "react";
import { Store, PaintBucket, Ticket, MessageSquareMore, Banknote, Wallet } from "lucide-react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getEnquiryStats } from "../../services/publicforms/Enquiry";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const KeyPerformanceMetrics = () => {
  const [enquiryCount, setEnquiryCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch enquiry stats on mount
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const result = await getEnquiryStats();
        if (result.success) {
          const totalEnquiries = result.data.data.totalEnquiries || 0;
          setEnquiryCount(totalEnquiries);
        }
      } catch (error) {
        console.error("Failed to fetch enquiry stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Metrics data with dynamic enquiry count
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
      value: loading ? "..." : enquiryCount.toLocaleString(),
      rawValue: enquiryCount,
      icon: MessageSquareMore,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100",
      chartColor: "rgb(168, 85, 247)",
      showInChart: true,
    },
    {
      id: 5,
      label: "Total Redeemed Amount",
      sublabel: "Coupons Redeemed",
      value: "₹5,40,000",
      rawValue: 540000,
      icon: Banknote,
      bgColor: "bg-teal-50",
      iconColor: "text-teal-600",
      iconBg: "bg-teal-100",
      chartColor: "rgb(20, 184, 166)",
      showInChart: false,
    },
    {
      id: 6,
      label: "Total Ordered Amount",
      sublabel: "Dealer Orders",
      value: "₹12,50,000",
      rawValue: 1250000,
      icon: Wallet,
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-600",
      iconBg: "bg-indigo-100",
      chartColor: "rgb(99, 102, 241)",
      showInChart: false,
    },
  ];
  
  // Filter out monetary values so they don't skew the count-based pie chart
  const chartMetrics = metricsData.filter(m => m.showInChart !== false);

  // Prepare chart data
  const chartData = {
    labels: chartMetrics.map((metric) => metric.label),
    datasets: [
      {
        label: "Count",
        data: chartMetrics.map((metric) => metric.rawValue),
        backgroundColor: chartMetrics.map((metric) => metric.chartColor),
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 xl:gap-8">
            {metricsData.map((metric) => (
              <div
                key={metric.id}
                className={`${metric.bgColor} rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md flex items-stretch`}
              >
                {/* Icon on the Left covering full height */}
                <div className={`w-24 flex items-center justify-center shrink-0 opacity-80`}>
                  <metric.icon className={`w-12 h-12 ${metric.iconColor}`} />
                </div>
                
                {/* Details on the Right */}
                <div className="p-5 flex flex-col justify-center flex-1">
                  <div className="text-base font-bold text-gray-900 leading-tight">
                    {metric.label}
                  </div>
                  <div className="text-sm text-gray-500 mt-0.5 mb-3">
                    {metric.sublabel}
                  </div>

                  {/* Large Value */}
                  <div className="text-3xl font-black text-gray-900 tracking-tight">
                    {metric.value}
                  </div>
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
