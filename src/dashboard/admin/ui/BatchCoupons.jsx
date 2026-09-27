import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Ticket, ChevronLeft, ChevronRight } from "lucide-react";
import { getCouponsByBatch, downloadCouponBatchPdf } from "../../../services/admin/admin.services";
import AlertMessage from "./GenerateCoupon/AlertMessage";

const getStatusStyles = (status) => {
  switch (status) {
    case "REDEEMED":
      return "bg-red-100 text-[#d82b2b]";
    case "EXPIRED":
      return "bg-gray-100 text-gray-600";
    default:
      return "bg-emerald-100 text-emerald-800";
  }
};

const BatchCoupons = () => {
  const { batchId } = useParams();
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    fetchCoupons();
  }, [batchId]);

  // Reset to page 1 if coupons change
  useEffect(() => {
    setCurrentPage(1);
  }, [coupons]);

  const fetchCoupons = async () => {
    setIsLoading(true);
    try {
      const response = await getCouponsByBatch(batchId, { limit: 10000 }); // Fetch all for client-side pagination
      if (response.success) {
        const payloadData = response.data?.data || response.data || {};
        setCoupons(payloadData.coupons || []);
      } else {
        setError(response.message || "Failed to fetch coupons");
      }
    } catch (err) {
      setError("An error occurred while fetching coupons.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const response = await downloadCouponBatchPdf(batchId);
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `coupon-batch-${batchId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError("Failed to download PDF");
    }
  };

  const totalPages = Math.ceil(coupons.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCoupons = coupons.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 min-h-screen bg-gray-50">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 border border-gray-200"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Batch Coupons
            </h1>
            <p className="text-gray-500 mt-1">Batch ID: {batchId}</p>
          </div>
        </div>
        <button
          onClick={handleDownloadPDF}
          className="px-4 py-2 bg-[#d82b2b] hover:bg-[#b92525] text-white font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </button>
      </div>

      <AlertMessage type="error" message={error} />

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d82b2b]"></div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4">Code</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Valid Until</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedCoupons.map((coupon) => (
                  <tr key={coupon._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-gray-900">
                      {coupon.code}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      ₹{coupon.amount}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusStyles(
                          coupon.status
                        )}`}
                      >
                        {coupon.status || "ACTIVE"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-900 font-medium">
                        {new Date(coupon.expiresAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </td>
                  </tr>
                ))}
                {coupons.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                      No coupons found in this batch.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Controls */}
          {!isLoading && coupons.length > 0 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-white">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium text-gray-900">{startIndex + 1}</span> to{" "}
                <span className="font-medium text-gray-900">
                  {Math.min(startIndex + itemsPerPage, coupons.length)}
                </span>{" "}
                of <span className="font-medium text-gray-900">{coupons.length}</span> results
              </div>
              <div className="flex items-center gap-4">
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
      )}
    </div>
  );
};

export default BatchCoupons;
