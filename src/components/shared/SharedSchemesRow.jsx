import { useState } from "react";
import { motion } from "motion/react";
import { ChevronRight, X, CheckCircle2, Plus } from "lucide-react";
const SharedSchemesRow = ({ title, subtitle, schemes, type }) => {
  const [selectedScheme, setSelectedScheme] = useState(null);

  return (
    <div className="w-full">
      {/* Section Label - Bilingual, Compact */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-black">{title}</h2>
          <p className="text-sm text-gray-500" style={{ fontFamily: "'Noto Sans Devanagari', system-ui, sans-serif" }}>
            {subtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 w-full">
        {schemes.slice(0, 3).map((rawScheme, idx) => {
          // Adapt raw backend fields to UI requirements
          const scheme = {
            id: rawScheme._id || rawScheme.id || idx,
            title: rawScheme.title || "Special Offer",
            description: rawScheme.description || "No description available.",
            badgeColor: rawScheme.badgeColor || "bg-blue-100 text-blue-800",
            badge: rawScheme.targetAudience || rawScheme.badge || "OFFER",
            tag: rawScheme.tag || (rawScheme.isActive ? "ACTIVE" : ""),
            highlight: rawScheme.highlight || (rawScheme.validUntil ? `Valid until ${new Date(rawScheme.validUntil).toLocaleDateString()}` : "Limited Time"),
            cashback: rawScheme.cashback || "Exclusive Rewards",
            features: rawScheme.features || [rawScheme.description || "Terms apply.", "Valid for eligible users only."]
          };

          return (
            <motion.div
              key={scheme.id}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl hover:shadow-gray-200/50 flex flex-col justify-between relative overflow-hidden group transition-all min-h-[240px]"
            >
              {/* Decorative Background Element */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gray-50 rounded-full opacity-50 group-hover:scale-[2] transition-transform duration-700 ease-out z-0" />
              
              <div className="relative z-10">
                {/* Badge */}
                <div className="mb-4 flex items-center justify-between">
                  <span className={`inline-flex items-center px-3 py-1 rounded-md text-[10px] sm:text-xs font-black uppercase tracking-widest shadow-sm ${scheme.badgeColor}`}>
                    {scheme.badge}
                  </span>
                  {scheme.tag && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">{scheme.tag}</span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-[#d82b2b] transition-colors">
                  {scheme.title}
                </h3>
                


                {/* Description - Line clamped for mobile */}
                <p className="text-xs sm:text-sm text-gray-500 mb-2 line-clamp-3 leading-loose">
                  {scheme.description}
                </p>
              </div>

              {/* View Details Button - Pushed to bottom */}
              <div className="relative z-10 mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[10px] sm:text-xs font-semibold text-[#d82b2b] bg-red-50/80 px-2 py-0.5 rounded">
                  {scheme.highlight}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedScheme(scheme)}
                  className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#d82b2b] group-hover:translate-x-1 transition-transform cursor-pointer bg-transparent border-none p-0 m-0"
                >
                  View Scheme
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal for Scheme Details */}
      {selectedScheme && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start">
              <div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${selectedScheme.badgeColor}`}>
                  {selectedScheme.badge || selectedScheme.tag}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-2">{selectedScheme.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedScheme(null)}
                className="text-gray-400 hover:text-gray-700 font-semibold p-1.5 cursor-pointer rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="text-xs font-semibold text-gray-600">Reward Earning Potential</div>
              <div className="text-xl font-bold text-[#d82b2b] mt-1">{selectedScheme.cashback}</div>
              <div className="text-xs text-gray-500 mt-0.5">{selectedScheme.highlight}</div>
            </div>

            <div className="mt-5 space-y-3">
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Offer Terms & Eligibility:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {selectedScheme.features.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="text-emerald-500 w-5 h-5 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
               <button
                  type="button"
                  className="w-full block text-center py-3 bg-[#d82b2b] hover:bg-[#b82222] text-white rounded-xl text-sm font-semibold shadow-md shadow-red-500/20 hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => setSelectedScheme(null)}
               >
                 Got it
               </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SharedSchemesRow;
