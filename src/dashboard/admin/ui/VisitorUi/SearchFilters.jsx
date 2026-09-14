import React from "react";
import { Search, Calendar, Download } from "lucide-react";

const SearchFilters = ({
  searchQuery,
  onSearchChange,
  selectedDate,
  onDateChange,
  filteredCount,
  onClearFilters,
  onExport,
  selectedType,
}) => {
  const getFilterLabel = () => {
    if (selectedType === "all") return "All Visitors";
    return selectedType;
  };

  return (
    <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {/* Search Input */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
            Search Visitors
          </label>
          <div className="relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by name, phone, or email..."
              className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Date Filter */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
            Filter by Visit Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Export and Clear Filters Section */}
      <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Left side - Results count (when filters active) */}
        <div className="flex-1">
          {(searchQuery || selectedDate) && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs sm:text-sm font-medium text-blue-800">
                {filteredCount} result(s) found
              </p>
              <button
                onClick={onClearFilters}
                className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Right side - Export Button */}
        <button
          onClick={onExport}
          disabled={filteredCount === 0}
          className="px-4 sm:px-6 py-2.5 sm:py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm sm:text-base font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 whitespace-nowrap"
          title={`Export ${getFilterLabel()} data to CSV`}
        >
          <Download className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">Export {getFilterLabel()}</span>
          <span className="sm:hidden">Export CSV</span>
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;
