import React from "react";
import { Loader2, Ticket } from "lucide-react";

const GenerateForm = ({
  scannerCount,
  setScannerCount,
  isGenerating,
  handleGenerateCoupons,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
      <div className="max-w-xl">
        <label
          htmlFor="scannerCount"
          className="block text-sm font-semibold text-gray-900 mb-2"
        >
          Number of Scanners
        </label>
        <div className="flex gap-3">
          <input
            id="scannerCount"
            type="number"
            min="1"
            value={scannerCount}
            onChange={(e) => setScannerCount(e.target.value)}
            placeholder="Enter number (e.g., 5)"
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            disabled={isGenerating}
          />
          <button
            onClick={handleGenerateCoupons}
            disabled={isGenerating}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center gap-2 min-w-[140px] justify-center"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
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