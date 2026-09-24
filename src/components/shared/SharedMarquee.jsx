import { motion } from "motion/react";
import { useState } from "react";

const getCardStyle = (rank) => {
  if (rank === 1) return "bg-gradient-to-b from-amber-50/70 via-white to-amber-50/40 border-2 border-amber-400";
  if (rank === 2) return "bg-gradient-to-b from-slate-50 to-white border-2 border-slate-300";
  if (rank === 3) return "bg-gradient-to-b from-orange-50/60 to-white border-2 border-orange-300";
  return "bg-white border border-gray-100";
};

const SharedMarquee = ({ title, subtitle, data, renderStats }) => {
  const [isPaused, setIsPaused] = useState(false);
  const duplicatedData = [...data, ...data];

  return (
    <div className="w-full">
      <div className="mb-2">
        <h2 className="text-base font-semibold text-black">{title}</h2>
        <p className="text-sm text-gray-500" style={{ fontFamily: "'Noto Sans Devanagari', system-ui, sans-serif" }}>
          {subtitle}
        </p>
      </div>

      <div 
        className="relative w-full overflow-hidden rounded-xl py-2"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-4 sm:gap-6 pb-4"
          animate={{ x: isPaused ? undefined : [-1600, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {duplicatedData.map((item, idx) => (
            <motion.div
              key={`${item.id}-${idx}`}
              className={`shrink-0 w-[200px] sm:w-[260px] h-[260px] sm:h-[300px] rounded-3xl p-5 sm:p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center text-center relative overflow-hidden group hover:shadow-[0_12px_40px_-8px_rgba(216,43,43,0.2)] transition-all duration-300 hover:-translate-y-1 ${getCardStyle(item.rank)}`}
            >
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-[#d82b2b]/10 via-[#d82b2b]/5 to-transparent" />

              <div className={`${item.avatarBg} relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border-[4px] border-white shadow-md font-black text-xl sm:text-2xl mb-4 z-10 group-hover:scale-110 transition-transform duration-500`}>
                {item.avatarInitials}
              </div>

              <div className="z-10 flex-1 flex flex-col items-center justify-center w-full">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 w-full truncate px-2 group-hover:text-[#d82b2b] transition-colors" title={item.name}>
                  {item.name}
                </h3>
                <p className="text-[11px] sm:text-xs font-medium text-gray-500 mb-3 truncate w-full px-2">
                  {item.city || item.location}, {item.state}
                </p>
                <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white border border-gray-100 shadow-sm mb-2">
                  <span className="text-[10px] sm:text-xs font-bold text-[#d82b2b] tracking-wide">{item.tier}</span>
                </div>
              </div>

              {renderStats(item)}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SharedMarquee;
