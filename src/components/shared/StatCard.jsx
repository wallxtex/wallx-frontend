import { motion } from "motion/react";

const StatCard = ({ stat, isCompact }) => {
  const IconComponent = stat.icon;
  
  if (isCompact) {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm"
      >
        <div className={`${stat.bgColor} w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-3`}>
          <IconComponent className={`${stat.iconColor} w-5 h-5 sm:w-6 sm:h-6`} />
        </div>
        <div className="text-2xl sm:text-3xl font-bold text-black mb-1">
          {stat.value}
        </div>
        <div className="text-xs sm:text-sm text-gray-500">{stat.label}</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all relative overflow-hidden group flex items-center gap-4"
    >
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
};

export default StatCard;
