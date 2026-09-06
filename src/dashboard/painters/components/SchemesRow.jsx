import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";

const SchemesRow = () => {
  const schemes = [
    {
      id: 1,
      title: "Scheme 1",
      description: "Earn extra rewards on every project completion with exclusive benefits",
    },
    {
      id: 2,
      title: "Scheme 2",
      description: "Get exclusive benefits for repeat customers and loyalty points",
    },
    {
      id: 3,
      title: "Scheme 3",
      description: "Earn credits by referring new painters to the platform",
    },
  ];

  return (
    <div className="w-full">
      {/* Section Label - Bilingual, Compact */}
      <div className="mb-3">
        <h2 className="text-base font-semibold text-black">
          New Schemes
        </h2>
        <p className="text-sm text-gray-500" style={{ fontFamily: "'Noto Sans Devanagari', system-ui, sans-serif" }}>
          नई योजनाएं
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full">
        {schemes.map((scheme) => (
          <motion.div
            key={scheme.id}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm"
          >
            {/* Title */}
            <h3 className="text-base font-semibold text-black mb-2">
              {scheme.title}
            </h3>

            {/* Description - Line clamped for mobile */}
            <p className="text-sm text-gray-500 mb-3 line-clamp-2">
              {scheme.description}
            </p>

            {/* View Details Link - Large tap target */}
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="inline-flex items-center gap-1 py-2 text-sm font-medium text-[#d82b2b] hover:opacity-80 transition-opacity"
            >
              View details
              <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SchemesRow;
