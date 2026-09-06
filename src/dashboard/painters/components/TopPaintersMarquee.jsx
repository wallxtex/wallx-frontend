import { motion } from "motion/react";
import { useState } from "react";

const TopPaintersMarquee = () => {
  const [isPaused, setIsPaused] = useState(false);

  const painters = [
    {
      id: 1,
      name: "Rajesh Kumar",
      jobs: "128 jobs this month",
      initials: "RK",
      bgColor: "bg-blue-500",
    },
    {
      id: 2,
      name: "Arjun Singh",
      jobs: "115 jobs this month",
      initials: "AS",
      bgColor: "bg-purple-500",
    },
    {
      id: 3,
      name: "Priya Sharma",
      jobs: "108 jobs this month",
      initials: "PS",
      bgColor: "bg-pink-500",
    },
    {
      id: 4,
      name: "Vikram Patel",
      jobs: "102 jobs this month",
      initials: "VP",
      bgColor: "bg-green-500",
    },
    {
      id: 5,
      name: "Sneha Gupta",
      jobs: "98 jobs this month",
      initials: "SG",
      bgColor: "bg-yellow-500",
    },
    {
      id: 6,
      name: "Rohan Verma",
      jobs: "95 jobs this month",
      initials: "RV",
      bgColor: "bg-indigo-500",
    },
    {
      id: 7,
      name: "Aisha Khan",
      jobs: "92 jobs this month",
      initials: "AK",
      bgColor: "bg-cyan-500",
    },
    {
      id: 8,
      name: "Nikhil Desai",
      jobs: "89 jobs this month",
      initials: "ND",
      bgColor: "bg-rose-500",
    },
  ];

  // Duplicate the list for seamless scrolling
  const duplicatedPainters = [...painters, ...painters];

  return (
    <div className="w-full">
      {/* Section Label - Bilingual, Compact */}
      <div className="mb-3">
        <h2 className="text-base font-semibold text-black">
          Top Painters of the Month
        </h2>
        <p className="text-sm text-gray-500" style={{ fontFamily: "'Noto Sans Devanagari', system-ui, sans-serif" }}>
          इस महीने के टॉप पेंटर
        </p>
      </div>

      {/* Marquee Container */}
      <div 
        className="relative w-full overflow-hidden rounded-xl"
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
          className="flex gap-3 pb-2"
          animate={{ x: isPaused ? undefined : [-1600, 0] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {duplicatedPainters.map((painter, idx) => (
            <motion.div
              key={`${painter.id}-${idx}`}
              className="shrink-0 w-[160px] sm:w-[200px] bg-white border border-gray-200 rounded-xl p-3 sm:p-4 shadow-sm"
            >
              {/* Avatar */}
              <div
                className={`${painter.bgColor} w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-2 text-white font-bold text-sm`}
              >
                {painter.initials}
              </div>

              {/* Name */}
              <h3 className="text-sm font-medium text-black mb-1 truncate">
                {painter.name}
              </h3>

              {/* Jobs Stat */}
              <p className="text-xs text-gray-500">{painter.jobs}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TopPaintersMarquee;
