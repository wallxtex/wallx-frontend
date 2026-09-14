import React from "react";
import { Loader2, Ticket } from "lucide-react";

const GenerateForm = ({
  scannerCount,
  setScannerCount,
  isGenerating,
  handleGenerateCoupons,
}) => {
  return (
    <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
      <div className="max-w-xl">
        <label
          htmlFor="scannerCount"
          className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2"
        >
          Number of Scanners
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            id="scannerCount"
            type="number"
            min="1"
            value={scannerCount}
            onChange={(e) => setScannerCount(e.target.value)}
            placeholder="Enter number (e.g., 5)"
            className="flex-1 px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            disabled={isGenerating}
          />
          <button
            onClick={handleGenerateCoupons}
            disabled={isGenerating}
            className="px-4 sm:px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm sm:text-base font-semibold rounded-lg transition-colors duration-200 flex items-center gap-2 sm:min-w-[140px] justify-center w-full sm:w-auto"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="hidden sm:inline">Generating...</span>
                <span className="sm:hidden">Generating...</span>
              </>
            ) : (
              <>
                <Ticket className="w-4 h-4" />
                Generate
              </>
            )}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Minimum: 1 scanner. Maximum: 100 scanners per batch.
        </p>
      </div>
    </div>
  );
};

export default GenerateForm;