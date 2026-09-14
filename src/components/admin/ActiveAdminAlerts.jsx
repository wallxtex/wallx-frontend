import React from "react";
import { AlertCircle, ChevronRight, X } from "lucide-react";

const mockAlerts = [
  {
    id: 1,
    title: "STOCK ALERT - LOW",
    subtitle: "15% Extra Margin on 500+ Units",
    description:
      "Unlock up to 15% extra discount on top of base margins when you order 500+ luxury texture buckets in a single billing cycle.",
    status: "ACTIVE",
    statusColor: "text-green-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-100",
  },
  {
    id: 2,
    title: "International Dealer Trip",
    subtitle: "All-Expenses-Paid Dubai Trip",
    description:
      "Achieve an annual sales target of ₹50 Lakhs and secure an all-expenses-paid 4N/5D trip to Dubai for you and your spouse.",
    status: "ACTIVE",
    statusColor: "text-green-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-100",
  },
  {
    id: 3,
    title: "New Dealer Starter Kit",
    subtitle: "Premium Showroom Display",
    description:
      "Partner with WallX and place your first order of 50 units to receive a premium showroom display stand and a complete shade card kit.",
    status: "ACTIVE",
    statusColor: "text-green-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-100",
  },
];

const ActiveAdminAlerts = () => {
  const [alerts, setAlerts] = React.useState(mockAlerts);
  const [showError, setShowError] = React.useState(true);

  const handleDismissAlert = (id) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Active Admin Alerts</h2>
          <p className="text-xs text-gray-500 mt-1">सक्रिय व्यवस्थापक अलर्ट</p>
        </div>
      </div>

      {/* Error Banner */}
      {showError && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-3">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-100">
            <AlertCircle className="w-4 h-4 text-red-600" />
          </div>
          <p className="text-sm text-red-800 flex-1">
            Error fetching some stats. Please try again.
          </p>
          <button className="px-3 py-1 bg-white hover:bg-red-50 text-red-700 text-sm font-medium rounded border border-red-200 transition-colors duration-200">
            Retry
          </button>
          <button
            onClick={() => setShowError(false)}
            className="text-red-600 hover:text-red-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Alerts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`${alert.bgColor} ${alert.borderColor} border rounded-xl p-6 transition-all duration-200 hover:shadow-md`}
          >
            {/* Alert Header */}
            <div className="mb-4">
              <h3 className="text-base font-bold text-gray-900 mb-1">
                {alert.title}
              </h3>
              <p className="text-sm font-semibold text-red-600">
                {alert.subtitle}
              </p>
            </div>

            {/* Alert Description */}
            <p className="text-sm text-gray-700 mb-6 leading-relaxed">
              {alert.description}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <span className={`text-sm font-semibold ${alert.statusColor}`}>
                {alert.status}
              </span>
              <button className="flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors">
                View Scheme
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveAdminAlerts;
