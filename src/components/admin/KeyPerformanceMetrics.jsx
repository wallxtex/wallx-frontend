import React, { useState, useEffect } from "react";
import { getAdminDashboardData } from "../../services/admin/admin.services";
import { Store, PaintBucket, Ticket, MessageSquareMore, Banknote, Wallet } from "lucide-react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const getMetricsData = (data) => [
  {
    id: 1,
    label: "Total Painters",
    sublabel: "PaintBucket",
    value: (data?.totalPainters || 0).toLocaleString(),
    rawValue: data?.totalPainters || 0,
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
    value: (data?.totalDealers || 0).toLocaleString(),
    rawValue: data?.totalDealers || 0,
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
    value: (data?.totalCouponsRedeemed || 0).toLocaleString(),
    rawValue: data?.totalCouponsRedeemed || 0,
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
    value: (data?.visitEnquiries || 0).toLocaleString(),
    rawValue: data?.visitEnquiries || 0,
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
    value: (data?.totalCouponAmount || 0).toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }),
    rawValue: data?.totalCouponAmount || 0,
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
    value: (data?.totalOrderAmount || 0).toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }),
    rawValue: data?.totalOrderAmount || 0,
    icon: Wallet,
    bgColor: "bg-indigo-50",
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-100",
    chartColor: "rgb(99, 102, 241)",
    showInChart: false,
  },
];

const KeyPerformanceMetrics = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await getAdminDashboardData();
        if (response?.success) {
          // The response structure might be response.data.data depending on axios and your API response wrapper
          const actualData = response.data?.data || response.data;
          setDashboardData(actualData);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const metricsData = getMetricsData(dashboardData);

  // Prepare pie chart data strictly for the three monetary fields requested
  const chartData = {
    labels: ["Total Ordered Amount", "Total Received Amount", "Total Pending Amount"],
    datasets: [
      {
        label: "Amount",
        data: [
          dashboardData?.totalOrderAmount || 0,
          dashboardData?.totalReceivedAmount || 0,
          dashboardData?.totalPendingAmount || 0
        ],
        backgroundColor: [
          "rgb(99, 102, 241)", // Indigo (Ordered)
          "rgb(16, 185, 129)", // Green (Received)
          "rgb(249, 115, 22)"  // Orange (Pending)
        ],
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
            const formattedValue = value.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
            return `${label}: ${formattedValue} (${percentage}%)`;
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
              Order Amount Breakdown
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
