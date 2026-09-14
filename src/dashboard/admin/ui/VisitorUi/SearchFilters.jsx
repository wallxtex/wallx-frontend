import React from "react";
import { Search, Calendar } from "lucide-react";

const SearchFilters = ({
  searchQuery,
  onSearchChange,
  selectedDate,
  onDateChange,
  filteredCount,
  onClearFilters,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Search Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Search Visitors
          </label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by name, phone, or email..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Date Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Filter by Visit Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      {(searchQuery || selectedDate) && (
        <div className="mt-4 flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm font-medium text-blue-800">
            {filteredCount} result(s) found
          </p>
          <button
            onClick={onClearFilters}
            className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
