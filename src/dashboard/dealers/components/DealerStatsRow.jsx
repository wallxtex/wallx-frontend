import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Trophy, Package, Wallet, Loader2 } from "lucide-react";
import { getDealerDashboardData } from "../../../services/dealers/dealers.services";

const DealerStatsRow = () => {
  const [statsData, setStatsData] = useState({
    totalOrderCount: 0,
    totalOrderAmount: 0,
    totalQuantity: 0,
    totalAmountPaid: 0,
    remainingAmount: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getDealerDashboardData();
        if (response && response.data && response.data.myStats) {
          setStatsData(response.data.myStats);
        }
      } catch (error) {
        console.error("Error fetching dealer stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const stats = [
    {
      label: "Total Deals",
      value: statsData.totalOrderCount,
      icon: Trophy,
      bgColor: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    {
      label: "Quantity Ordered",
      value: statsData.totalQuantity,
      icon: Package,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      label: "Total Amount",
      value: `₹${statsData.totalOrderAmount.toLocaleString()}`,
      icon: Wallet,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      label: "Total Payed Amount",
      value: `₹${statsData.totalAmountPaid.toLocaleString()}`,
      icon: Wallet,
      bgColor: "bg-pink-100",
      iconColor: "text-pink-600",
    },
    {
      label: "Total Remaining Amount",
      value: `₹${statsData.remainingAmount.toLocaleString()}`,
      icon: Wallet,
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
    },
  ];

  if (isLoading) {
    return (
      <div className="w-full h-24 flex items-center justify-center bg-white border border-gray-100 rounded-2xl">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-8 w-full">
      {stats.map((stat, idx) => {
        const IconComponent = stat.icon;
        return (
          <motion.div
            key={idx}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all relative overflow-hidden group flex items-center gap-4"
          >
            {/* Background Glow */}
            <div className={`absolute -right-4 -bottom-4 w-16 h-16 rounded-full opacity-30 group-hover:scale-150 transition-transform duration-500 blur-2xl ${stat.bgColor}`} />

            <div className={`${stat.bgColor} shrink-0 relative z-10 w-12 h-12 rounded-xl flex items-center justify-center shadow-sm -rotate-3 group-hover:rotate-0 transition-transform duration-300 border border-white/50 backdrop-blur-sm`}>
              <IconComponent className={`${stat.iconColor} w-6 h-6`} />
            </div>

            <div className="z-10 relative">
              <div className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">{stat.label}</div>
              <div className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">{stat.value}</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default DealerStatsRow;
