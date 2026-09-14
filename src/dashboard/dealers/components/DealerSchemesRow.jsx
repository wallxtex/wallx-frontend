import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { DEALER_SCHEMES } from "../../../pages/dealers/dealerData";

const DealerSchemesRow = () => {
  return (
    <div className="w-full">
      {/* Section Label - Bilingual, Compact */}
      <div className="mb-2">
        <h2 className="text-base font-semibold text-black">
          Active Dealer Schemes
        </h2>
        <p className="text-sm text-gray-500" style={{ fontFamily: "'Noto Sans Devanagari', system-ui, sans-serif" }}>
          सक्रिय डीलर योजनाएं
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 w-full">
        {DEALER_SCHEMES.slice(0, 3).map((scheme) => (
          <motion.div
            key={scheme.id}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl hover:shadow-gray-200/50 flex flex-col justify-between relative overflow-hidden group transition-all"
          >
            {/* Decorative Background Element */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gray-50 rounded-full opacity-50 group-hover:scale-[2] transition-transform duration-700 ease-out z-0" />
            
            <div className="relative z-10">
              {/* Badge */}
              <div className="mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-md text-[10px] sm:text-xs font-black uppercase tracking-widest shadow-sm ${scheme.badgeColor}`}>
                  {scheme.tag}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-[#d82b2b] transition-colors">
                {scheme.title}
              </h3>
              
              {/* Highlight */}
              <p className="text-sm font-semibold text-[#d82b2b] mb-3 bg-red-50/80 inline-block px-2.5 py-1 rounded">
                {scheme.highlight}
              </p>

              {/* Description - Line clamped for mobile */}
              <p className="text-xs sm:text-sm text-gray-500 mb-2 line-clamp-3 leading-relaxed">
                {scheme.description}
              </p>
            </div>

            {/* View Details Link - Pushed to bottom */}
            <div className="relative z-10 mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-wider">Active</span>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#d82b2b] group-hover:translate-x-1 transition-transform"
              >
                View Scheme
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DealerSchemesRow;
