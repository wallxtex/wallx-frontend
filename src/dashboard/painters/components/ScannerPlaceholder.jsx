import { motion } from "motion/react";
import { ScanLine } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ScannerPlaceholder = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* Desktop view: Original Section Label & Dashed Box */}
      <div className="hidden sm:block">
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
            onClick={() => navigate('/painter/scan')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-28 h-28 bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center transition-colors duration-200 hover:border-gray-400 hover:bg-gray-50 cursor-pointer"
          >
            <ScanLine className="w-7 h-7 text-gray-400" />
          </motion.div>

          <p className="text-sm text-gray-500 mt-2">Scan</p>
        </div>
      </div>

      {/* Mobile view: Floating Action Button (FAB) style */}
      <div className="sm:hidden flex justify-center -mt-10 relative z-10">
        <motion.div
          onClick={() => navigate('/painter/scan')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="w-20 h-20 bg-gray-100 border-4 border-white rounded-full flex items-center justify-center shadow-lg cursor-pointer"
        >
          <ScanLine className="w-8 h-8 text-gray-700" />
        </motion.div>
      </div>
    </div>
  );
};

export default ScannerPlaceholder;
