import { useState } from "react";
import { motion } from "motion/react";
import { ChevronRight, X, CheckCircle2, Plus } from "lucide-react";
import { DEALER_SCHEMES } from "../../../pages/dealers/dealerData";
import CreateSchemeModal from "../../../components/admin/CreateSchemeModal";

const DealerSchemesRow = () => {
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Section Label - Bilingual, Compact */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-black">
            Active Dealer Schemes
          </h2>
          <p className="text-sm text-gray-500" style={{ fontFamily: "'Noto Sans Devanagari', system-ui, sans-serif" }}>
            सक्रिय डीलर योजनाएं
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#d82b2b] hover:bg-[#b82222] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-md shadow-red-500/20 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Scheme</span>
          <span className="sm:hidden">New</span>
        </button>
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
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedScheme(scheme);
                }}
                className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#d82b2b] group-hover:translate-x-1 transition-transform"
              >
                View Scheme
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal for Scheme Details */}
      {selectedScheme && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start">
              <div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${selectedScheme.badgeColor}`}>
                  {selectedScheme.badge}
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

      {/* Create Scheme Modal */}
      <CreateSchemeModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        type="DEALER"
      />
    </div>
  );
};

export default DealerSchemesRow;
