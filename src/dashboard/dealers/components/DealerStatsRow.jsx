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
      label: "Buckets Ordered",
      value: "3,280",
      icon: Package,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      label: "Total Bonus",
      value: "₹4,85,000",
      icon: Wallet,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
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
            className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 lg:p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all relative overflow-hidden group flex items-center justify-between"
          >
            {/* Background Glow */}
            <div className={`absolute -right-4 -bottom-4 w-20 h-20 rounded-full opacity-30 group-hover:scale-150 transition-transform duration-500 blur-2xl ${stat.bgColor}`} />

            <div className="z-10 relative">
              <div className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{stat.label}</div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">{stat.value}</div>
            </div>

            <div className={`${stat.bgColor} relative z-10 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center shadow-sm rotate-6 group-hover:-rotate-3 transition-transform duration-300 border border-white/50 backdrop-blur-sm`}>
              <IconComponent className={`${stat.iconColor} w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8`} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default DealerStatsRow;
