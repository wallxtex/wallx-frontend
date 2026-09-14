import { motion } from "motion/react";
import { useState } from "react";
import { TOP_DEALERS_DATA } from "../../../pages/dealers/dealerData";

const TopDealersMarquee = () => {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate the list for seamless scrolling
  const duplicatedDealers = [...TOP_DEALERS_DATA, ...TOP_DEALERS_DATA];

  return (
    <div className="w-full flex-1 flex flex-col min-h-0">
      {/* Section Label - Bilingual, Compact */}
      <div className="mb-2">
        <h2 className="text-base font-semibold text-black">
          Top Dealers of the Month
        </h2>
        <p className="text-sm text-gray-500" style={{ fontFamily: "'Noto Sans Devanagari', system-ui, sans-serif" }}>
          इस महीने के टॉप डीलर
        </p>
      </div>

      {/* Marquee Container */}
      <div 
        className="relative w-full flex-1 overflow-hidden rounded-xl"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Fade gradient overlay */}
        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

        {/* Scrolling Container */}
        <motion.div
          className="flex gap-3 pb-2 h-full items-stretch"
          animate={{ x: isPaused ? undefined : [-1600, 0] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {duplicatedDealers.map((dealer, idx) => (
            <motion.div
              key={`${dealer.id}-${idx}`}
              className="shrink-0 w-[180px] sm:w-[240px] bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center text-center relative overflow-hidden group hover:shadow-[0_8px_30px_-4px_rgba(216,43,43,0.15)] transition-all duration-300"
            >
              {/* Background Accent */}
              <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-gray-50 to-white border-b border-gray-50" />

              {/* Avatar */}
              <div
                className={`${dealer.avatarBg} relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border-4 border-white shadow-sm font-bold text-lg sm:text-xl mb-3 z-10 group-hover:scale-105 transition-transform duration-300`}
              >
                {dealer.avatarInitials}
              </div>

              {/* Name & Location */}
              <div className="z-10 flex-1 flex flex-col items-center justify-center w-full">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1 w-full truncate px-2" title={dealer.name}>
                  {dealer.name}
                </h3>
                <p className="text-[11px] sm:text-xs text-gray-500 mb-3 truncate w-full px-2">
                  {dealer.city}, {dealer.state}
                </p>
                
                {/* Tier Badge */}
                <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-gray-50 border border-gray-100 mb-2">
                  <span className="text-[10px] sm:text-xs font-bold text-[#d82b2b] tracking-wide">{dealer.tier}</span>
                </div>
              </div>

              {/* Stats - Pushed to bottom */}
              <div className="w-full mt-auto pt-4 border-t border-gray-100 flex justify-between items-center z-10">
                <div className="flex flex-col items-start">
                  <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Volume</span>
                  <p className="text-sm sm:text-base font-bold text-gray-800">{dealer.bucketsOrdered} <span className="text-[10px] sm:text-xs font-medium text-gray-500">Units</span></p>
                </div>
                {dealer.recentReward ? (
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Reward</span>
                    <span className="text-[10px] sm:text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded flex items-center gap-1">
                      🏆 Won
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Status</span>
                    <span className="text-[10px] sm:text-xs font-medium text-gray-400 px-2 py-0.5">
                      Active
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TopDealersMarquee;
