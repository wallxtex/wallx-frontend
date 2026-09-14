import { motion } from "motion/react";
import { Package, Search, Calendar, CheckCircle2, Clock, Truck } from "lucide-react";
import { useState } from "react";

const MOCK_ORDERS = [
  {
    id: "ORD-2026-8921",
    date: "12 Sep 2026",
    status: "Delivered",
    items: "50 Units (Luxury Emulsion)",
    total: "₹1,25,000",
  },
  {
    id: "ORD-2026-8845",
    date: "05 Sep 2026",
    status: "In Transit",
    items: "120 Units (Premium Texture)",
    total: "₹3,40,000",
  },
  {
    id: "ORD-2026-8712",
    date: "28 Aug 2026",
    status: "Processing",
    items: "30 Units (Primer base)",
    total: "₹45,000",
  },
  {
    id: "ORD-2026-8550",
    date: "15 Aug 2026",
    status: "Delivered",
    items: "200 Units (Mixed Batch)",
    total: "₹5,10,000",
  }
];

const DealersOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusConfig = (status) => {
    switch (status) {
      case "Delivered":
        return { color: "text-emerald-600", bg: "bg-emerald-50", icon: CheckCircle2, border: "border-emerald-200" };
      case "In Transit":
        return { color: "text-blue-600", bg: "bg-blue-50", icon: Truck, border: "border-blue-200" };
      case "Processing":
        return { color: "text-amber-600", bg: "bg-amber-50", icon: Clock, border: "border-amber-200" };
      default:
        return { color: "text-gray-600", bg: "bg-gray-50", icon: Package, border: "border-gray-200" };
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 h-full flex flex-col">
      {/* Page Heading */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-black">
            Purchase Orders
          </h1>
          <p className="text-sm text-gray-500 font-medium" style={{ fontFamily: "'Noto Sans Devanagari', system-ui, sans-serif" }}>
            खरीद आदेश
          </p>
        </div>

        {/* Search & Filter */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full sm:w-64 pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d82b2b]/20 focus:border-[#d82b2b] sm:text-sm transition-all shadow-sm"
            placeholder="Search Order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="flex-1 overflow-y-auto pb-6">
        <div className="grid grid-cols-1 gap-4">
          {MOCK_ORDERS.filter(o => o.id.toLowerCase().includes(searchTerm.toLowerCase())).map((order, idx) => {
            const statusConfig = getStatusConfig(order.status);
            const StatusIcon = statusConfig.icon;

            return (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={order.id}
                className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-md transition-all group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                {/* Order Info Left */}
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl border ${statusConfig.bg} ${statusConfig.border}`}>
                    <Package className={`w-6 h-6 ${statusConfig.color}`} />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 flex items-center gap-2">
                      {order.id}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">{order.items}</p>
                    <div className="flex items-center gap-1.5 mt-2 text-[11px] sm:text-xs font-medium text-gray-400">
                      <Calendar className="w-3.5 h-3.5" />
                      {order.date}
                    </div>
                  </div>
                </div>

                {/* Order Info Right */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 border-gray-100 pt-3 sm:pt-0">
                  <div className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">
                    {order.total}
                  </div>
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-bold uppercase tracking-wider mt-0 sm:mt-2 ${statusConfig.bg} ${statusConfig.color} ${statusConfig.border} border`}>
                    <StatusIcon className="w-3 h-3" />
                    {order.status}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DealersOrders;
