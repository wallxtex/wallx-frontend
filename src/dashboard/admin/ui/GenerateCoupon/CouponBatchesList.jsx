import React, { useState, useEffect } from "react";
import { DownloadCloud, ExternalLink, Calendar, PlusCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CouponBatchesList = ({ batches, isLoading, onDownloadPDF }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Reset to page 1 if batches change
  useEffect(() => {
    setCurrentPage(1);
  }, [batches]);

  const totalPages = Math.ceil(batches.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBatches = batches.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const renderTableContent = () => {
    if (isLoading) {
      return (
        <tr>
          <td colSpan="6" className="px-6 py-12 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d82b2b] mx-auto"></div>
          </td>
        </tr>
      );
    }

    if (batches.length === 0) {
      return (
        <tr>
          <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
            No batches generated yet.
          </td>
        </tr>
      );
    }

    return paginatedBatches.map((batch) => (
      <tr key={batch._id} className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4 font-mono font-medium text-gray-900">
          {batch._id.slice(-6).toUpperCase()}
        </td>
        <td className="px-6 py-4 font-bold text-gray-900">
          {batch.quantity} <span className="font-normal text-gray-500 text-xs ml-1">coupons</span>
        </td>
        <td className="px-6 py-4 font-semibold text-emerald-600">
          ₹{batch.amount}
        </td>
        <td className="px-6 py-4 text-gray-600">
          {batch.validityDays} Days
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {new Date(batch.generatedAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          })}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => navigate(`/admin/coupons/batches/${batch._id}`)}
              className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View
            </button>
            <button
              onClick={() => onDownloadPDF(batch._id)}
              className="px-3 py-1.5 bg-[#d82b2b]/10 text-[#d82b2b] hover:bg-[#d82b2b]/20 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <DownloadCloud className="w-3.5 h-3.5" />
              PDF
            </button>
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <div className="mt-8">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">Generated Batches</h2>
        <p className="text-sm text-gray-500">History of all coupon generations.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Batch ID</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Validity</th>
                <th className="px-6 py-4">Generated Date</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {renderTableContent()}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Controls */}
        {!isLoading && batches.length > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-white">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium text-gray-900">{startIndex + 1}</span> to{" "}
              <span className="font-medium text-gray-900">
                {Math.min(startIndex + itemsPerPage, batches.length)}
              </span>{" "}
              of <span className="font-medium text-gray-900">{batches.length}</span> results
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CouponBatchesList;
