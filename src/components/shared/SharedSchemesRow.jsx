import { useState } from "react";
import { motion } from "motion/react";
import { ChevronRight, X, CheckCircle2, Edit, Trash2, Gift, Sparkles, Award } from "lucide-react";

const SharedSchemesRow = ({ title, subtitle, schemes, type, isAdmin = false, onDelete, onUpdate }) => {
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <div className="w-full">
      {/* Section Label - Bilingual, Compact */}
      {title && (
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-black">{title}</h2>
            <p className="text-sm text-gray-500" style={{ fontFamily: "'Noto Sans Devanagari', system-ui, sans-serif" }}>
              {subtitle}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
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

          const icons = [Gift, Sparkles, Award];
          const Icon = icons[idx % icons.length];

          return (
            <motion.div
              key={scheme.id}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
              className="bg-white border-2 border-red-100 rounded-3xl p-6 sm:p-8 shadow-lg shadow-red-100/50 hover:shadow-2xl hover:shadow-red-500/10 hover:border-red-300 flex flex-col justify-between relative overflow-hidden group transition-all min-h-[280px]"
            >
              {/* Beautiful glowing background elements */}
              <div className="absolute -right-16 -top-16 w-48 h-48 bg-gradient-to-br from-red-100/80 to-amber-100/40 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700 ease-out z-0 blur-2xl" />
              <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-gradient-to-tr from-rose-100/60 to-transparent rounded-full opacity-0 group-hover:opacity-60 transition-all duration-700 ease-out z-0 blur-xl" />

              <div className="relative z-10 flex flex-col h-full">
                {/* Header with Icon */}
                <div className="mb-5 flex items-start justify-between">
                  <div className="flex flex-col gap-2">
                    {scheme.tag && (
                      <span className="text-[10px] w-fit font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md uppercase tracking-wider">{scheme.tag}</span>
                    )}
                  </div>
                  
                  {/* Decorative Icon */}
                  <div className="p-3 bg-gradient-to-br from-red-50 to-rose-100 rounded-2xl group-hover:rotate-12 transition-transform duration-500 shadow-sm border border-red-100">
                    <Icon className="w-6 h-6 text-[#d82b2b]" strokeWidth={2.5} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-3 leading-tight group-hover:text-[#d82b2b] transition-colors">
                  {scheme.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500 mb-6 line-clamp-3 leading-relaxed font-medium">
                  {scheme.description}
                </p>
              </div>

              {/* Action Area */}
              <div className="relative z-10 mt-auto pt-4 border-t border-gray-100/80 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 flex items-center gap-1">
                  <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                  {scheme.highlight}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedScheme(scheme)}
                  className="inline-flex items-center justify-center gap-1 px-1 py-1 text-[#d82b2b] hover:text-[#a01d1d] bg-transparent text-sm font-bold group-hover:translate-x-1 transition-all cursor-pointer"
                >
                  View Details
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
                onClick={() => {
                  setSelectedScheme(null);
                  setShowDeleteConfirm(false);
                }}
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
              {isAdmin ? (
                showDeleteConfirm ? (
                  <div className="flex flex-col items-center gap-3 animate-in slide-in-from-bottom-2">
                    <p className="text-sm font-semibold text-gray-900">Are you sure you want to delete this scheme?</p>
                    <div className="flex items-center justify-between gap-4 w-full">
                      <button
                        type="button"
                        className="w-1/2 py-2.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl text-sm font-semibold transition-all cursor-pointer"
                        onClick={() => setShowDeleteConfirm(false)}
                      >
                        No, Cancel
                      </button>
                      <button
                        type="button"
                        className="w-1/2 flex items-center justify-center gap-2 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold shadow-md shadow-red-500/20 transition-all cursor-pointer"
                        onClick={() => {
                          if (onDelete) onDelete(selectedScheme.id);
                          setSelectedScheme(null);
                          setShowDeleteConfirm(false);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                        Yes, Delete
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-4">
                    <button
                      type="button"
                      className="w-1/2 flex items-center justify-center gap-2 py-3 bg-white border border-red-200 text-red-600 hover:bg-red-50 rounded-xl text-sm font-semibold transition-all cursor-pointer"
                      onClick={() => setShowDeleteConfirm(true)}
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                    <button
                      type="button"
                      className="w-1/2 flex items-center justify-center gap-2 py-3 bg-[#d82b2b] hover:bg-[#b82222] text-white rounded-xl text-sm font-semibold shadow-md shadow-red-500/20 hover:shadow-lg transition-all cursor-pointer"
                      onClick={() => {
                        if (onUpdate) onUpdate(selectedScheme);
                        setSelectedScheme(null);
                        setShowDeleteConfirm(false);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                      Update Scheme
                    </button>
                  </div>
                )
              ) : null}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SharedSchemesRow;
