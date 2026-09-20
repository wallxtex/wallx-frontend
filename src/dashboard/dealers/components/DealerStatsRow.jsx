import { motion } from "motion/react";
import { Trophy, Package, Wallet } from "lucide-react";

const DealerStatsRow = () => {
  const stats = [
    {
      label: "Total Deals",
      value: "145",
      icon: Trophy,
      bgColor: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    {
      label: "Quantity Ordered",
      value: "3,280",
      icon: Package,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      label: "Total Amount",
      value: "₹4,85,000",
      icon: Wallet,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      label: "Total Payed Amount",
      value: "₹2,85,000",
      icon: Wallet,
      bgColor: "bg-pink-100",
      iconColor: "text-pink-600",
    },
    {
      label: "Total Remaining Amount",
      value: "₹2,00,000",
      icon: Wallet,
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 w-full">
      {stats.map((stat, idx) => {
        const IconComponent = stat.icon;
        return (
          <motion.div
            key={idx}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all relative overflow-hidden group flex items-center justify-between"
          >
            {/* Background Glow */}
            <div className={`absolute -right-4 -bottom-4 w-16 h-16 rounded-full opacity-30 group-hover:scale-150 transition-transform duration-500 blur-2xl ${stat.bgColor}`} />

            <div className="z-10 relative">
              <div className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">{stat.label}</div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 tracking-tight">{stat.value}</div>
            </div>

            <div className={`${stat.bgColor} relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-sm rotate-6 group-hover:-rotate-3 transition-transform duration-300 border border-white/50 backdrop-blur-sm`}>
              <IconComponent className={`${stat.iconColor} w-5 h-5 sm:w-6 sm:h-6`} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default DealerStatsRow;
