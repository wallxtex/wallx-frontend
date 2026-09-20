import { motion } from "motion/react";
import { Trophy, Gift, Wallet } from "lucide-react";

const StatsRow = () => {
  const stats = [
    {
      label: "Total Ranks",
      value: "1,245",
      icon: Trophy,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      label: "Total Redeem",
      value: "328",
      icon: Gift,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      label: "Total Redeemed Amount",
      value: "₹48,500",
      icon: Wallet,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 w-full">
      {stats.map((stat, idx) => {
        const IconComponent = stat.icon;
        return (
          <motion.div
            key={idx}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm"
          >
            {/* Icon Badge */}
            <div className={`${stat.bgColor} w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-3`}>
              <IconComponent className={`${stat.iconColor} w-5 h-5 sm:w-6 sm:h-6`} />
            </div>

            {/* Value - Big and glanceable */}
            <div className="text-2xl sm:text-3xl font-bold text-black mb-1">
              {stat.value}
            </div>

            {/* Label */}
            <div className="text-xs sm:text-sm text-gray-500">{stat.label}</div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatsRow;
