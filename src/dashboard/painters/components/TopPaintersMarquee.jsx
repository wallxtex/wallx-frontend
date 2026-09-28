import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { getPublicData } from "../../../services/dealers/dealers.services";

const TopPaintersMarquee = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [painters, setPainters] = useState([]);

  useEffect(() => {
    const fetchPainters = async () => {
      try {
        const res = await getPublicData();
        if (res?.success && res.data?.topPainters?.length > 0) {
          const mapped = res.data.topPainters.map((p, index) => {
            const name = p.name || (p.firstName ? `${p.firstName} ${p.lastName || ''}`.trim() : null) || 'Painter';
            const initials = name.split(' ').filter(n => n.length > 0).map(n => n[0]).join('').substring(0, 2).toUpperCase();
            const colors = [
              "bg-amber-100 text-amber-800 border-amber-300",
              "bg-slate-100 text-slate-800 border-slate-300",
              "bg-orange-100 text-orange-800 border-orange-300",
              "bg-red-50 text-[#d82b2b] border-red-200",
              "bg-yellow-50 text-yellow-800 border-yellow-200",
              "bg-blue-50 text-blue-700 border-blue-200",
              "bg-emerald-50 text-emerald-700 border-emerald-200",
              "bg-purple-50 text-purple-700 border-purple-200"
            ];
            
            const addressParts = typeof p.address === 'string' ? p.address.split(',').map(s => s.trim()) : [];
            const city = addressParts[0] || p.city || p.location?.city || p.location?.area || p.address?.city || 'N/A';
            const state = addressParts[1] || p.state || p.location?.state || p.address?.state || 'N/A';
            
            return {
              id: p._id || p.id || index,
              rank: index + 1,
              name: name,
              avatarInitials: initials,
              avatarBg: colors[index % colors.length],
              city,
              state,
              tier: p.tier || "Active Member",
              bucketsScanned: p.couponsRedeemed ?? p.couponsScanned ?? p.bucketsScanned ?? 0,
              recentReward: null
            };
          });
          setPainters(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch top painters", err);
      }
    };
    fetchPainters();
  }, []);

  // Duplicate the list for seamless scrolling
  const duplicatedPainters = [...painters, ...painters];

  const getCardStyle = (rank) => {
    if (rank === 1) return "bg-gradient-to-b from-amber-50/70 via-white to-amber-50/40 border-2 border-amber-400";
    if (rank === 2) return "bg-gradient-to-b from-slate-50 to-white border-2 border-slate-300";
    if (rank === 3) return "bg-gradient-to-b from-orange-50/60 to-white border-2 border-orange-300";
    return "bg-white border border-gray-100";
  };

  return (
    <div className="w-full">
      {/* Section Label - Bilingual, Compact */}
      <div className="mb-2">
        <h2 className="text-base font-semibold text-black">
          Top Painters of the Month
        </h2>
        <p className="text-sm text-gray-500" style={{ fontFamily: "'Noto Sans Devanagari', system-ui, sans-serif" }}>
          इस महीने के टॉप पेंटर
        </p>
      </div>

      {/* Marquee Container */}
      <div 
        className="relative w-full overflow-hidden rounded-xl py-2"
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
          className="flex gap-4 sm:gap-6 pb-4"
          animate={{ x: isPaused ? undefined : [-2000, 0] }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {duplicatedPainters.map((painter, idx) => (
            <motion.div
              key={`${painter.id}-${idx}`}
              className={`shrink-0 w-[200px] sm:w-[260px] h-[260px] sm:h-[300px] rounded-3xl p-5 sm:p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center text-center relative overflow-hidden group hover:shadow-[0_12px_40px_-8px_rgba(216,43,43,0.2)] transition-all duration-300 hover:-translate-y-1 ${getCardStyle(painter.rank)}`}
            >
              {/* Background Accent */}
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-[#d82b2b]/10 via-[#d82b2b]/5 to-transparent" />

              {/* Avatar */}
              <div
                className={`${painter.avatarBg} relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border-[4px] border-white shadow-md font-black text-xl sm:text-2xl mb-4 z-10 group-hover:scale-110 transition-transform duration-500`}
              >
                {painter.avatarInitials}
              </div>

              {/* Name & Location */}
              <div className="z-10 flex-1 flex flex-col items-center justify-center w-full">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 w-full truncate px-2 group-hover:text-[#d82b2b] transition-colors" title={painter.name}>
                  {painter.name}
                </h3>
                <p className="text-[11px] sm:text-xs font-medium text-gray-500 mb-3 truncate w-full px-2">
                  {painter.city}, {painter.state}
                </p>
                
                {/* Tier Badge */}
                <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white border border-gray-100 shadow-sm mb-2">
                  <span className="text-[10px] sm:text-xs font-bold text-[#d82b2b] tracking-wide">{painter.tier}</span>
                </div>
              </div>

              {/* Stats - Pushed to bottom */}
              <div className="w-full mt-auto pt-4 border-t border-gray-100 flex justify-between items-end z-10">
                <div className="flex flex-col items-start">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Scanned</span>
                  <p className="text-base sm:text-lg font-black text-gray-800 leading-none">{painter.bucketsScanned} <span className="text-[10px] sm:text-xs font-semibold text-gray-500">Buckets</span></p>
                </div>
                {painter.recentReward ? (
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

export default TopPaintersMarquee;
