import { motion } from "motion/react";
import { ScanLine } from "lucide-react";

const ScannerPlaceholder = () => {
  return (
    <div className="w-full">
      {/* Section Label - Bilingual, Compact */}
      <div className="mb-3 text-center">
        <h2 className="text-base font-semibold text-black">
          Scan Your Redeem Code
        </h2>
        <p className="text-sm text-gray-500" style={{ fontFamily: "'Noto Sans Devanagari', system-ui, sans-serif" }}>
          अपना रिडीम कोड स्कैन करें
        </p>
      </div>

      <div className="flex flex-col items-center justify-center w-full">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center transition-colors duration-200 hover:border-gray-400 hover:bg-gray-50 cursor-pointer"
        >
          <ScanLine className="w-7 h-7 text-gray-400" />
        </motion.div>

        {/* Caption */}
        <p className="text-sm text-gray-500 mt-2">Scan</p>
      </div>
    </div>
  );
};

export default ScannerPlaceholder;
