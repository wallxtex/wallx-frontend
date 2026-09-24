import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Check,
  X,
  MapPin,
  Phone,
  Mail,
  Store,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  DealerSignupDetails,
  DealerApproval,
} from "../../../services/dealers/dealer/dealerSignupdetail";

const DealerSignupAccounts = () => {
  console.log("[COMPONENT] DealerSignupAccounts mounted/rendered");
  
  const [dealers, setDealers] = useState([]);
  const [selectedDealer, setSelectedDealer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  // Fetch dealers on component mount
  useEffect(() => {
    console.log("[COMPONENT] useEffect triggered - calling fetchDealers");
    fetchDealers();
  }, []);

  const fetchDealers = async () => {
    console.log("[DEALER SIGNUP] ========== FETCH STARTED ==========");
    console.log("[DEALER SIGNUP] Starting to fetch dealers...");
    setIsLoading(true);
    try {
      console.log("[DEALER SIGNUP] Calling DealerSignupDetails API...");
      const response = await DealerSignupDetails();
      console.log("[DEALER SIGNUP] ========== RAW RESPONSE ==========");
      console.log(
        "[DEALER SIGNUP] Full response:",
        JSON.stringify(response, null, 2),
      );
      console.log("[DEALER SIGNUP] response.success:", response.success);
      console.log("[DEALER SIGNUP] response.data:", response.data);
      console.log("[DEALER SIGNUP] response.data.data:", response.data?.data);
      console.log(
        "[DEALER SIGNUP] response.data.data.dealers:",
        response.data?.data?.dealers,
      );

      if (response.success) {
        // Backend returns: { data: { dealers: [...], total, page, limit } }
        const dealerData = response.data.data?.dealers || [];
        console.log("[DEALER SIGNUP] ========== EXTRACTED DEALERS ==========");
        console.log("[DEALER SIGNUP] Dealer array:", dealerData);
        console.log("[DEALER SIGNUP] Dealer count:", dealerData.length);
        console.log("[DEALER SIGNUP] Setting dealers state...");
        setDealers(dealerData);
        console.log("[DEALER SIGNUP] State updated!");
      } else {
        console.error("[DEALER SIGNUP] ❌ API returned success: false");
      }
    } catch (error) {
      console.error("[DEALER SIGNUP] ========== ERROR ==========");
      console.error("[DEALER SIGNUP] Error object:", error);
      console.error("[DEALER SIGNUP] Error message:", error.message);
      console.error("[DEALER SIGNUP] Error response:", error.response);
    } finally {
      setIsLoading(false);
      console.log("[DEALER SIGNUP] ========== FETCH COMPLETE ==========");
    }
  };

  const handleApprove = async (dealerId, name) => {
    try {
      await DealerApproval(dealerId, { action: "approve" });
      // Success toast is shown by the API function
      setSelectedDealer(null);
      fetchDealers(); // Refresh the list
    } catch (error) {
      console.error("Failed to approve dealer:", error);
      // Error toast is shown by the API function
    }
  };

  const handleReject = async (dealerId, name) => {
    try {
      await DealerApproval(dealerId, {
        action: "reject",
      });
      // Success toast is shown by the API function
      setSelectedDealer(null);
      fetchDealers(); // Refresh the list
    } catch (error) {
      console.error("Failed to reject dealer:", error);
      // Error toast is shown by the API function
    }
  };

  // Stats calculation
  const totalThisMonth = dealers.length;
  const approvedAccounts = dealers.filter(
    (d) => d.status === "approved",
  ).length;
  const rejectedAccounts = dealers.filter(
    (d) => d.status === "rejected",
  ).length;
  const pendingAccounts = dealers.filter((d) => d.status === "pending").length;

  // Pagination calculation
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = dealers.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(dealers.length / recordsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRecordsPerPageChange = (e) => {
    setRecordsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 min-h-screen bg-gray-50">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Dealer Sign-up Accounts
        </h1>
        <p className="text-gray-500 mt-1">
          Manage and review new dealer account requests.
        </p>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d82b2b]"></div>
        </div>
      ) : (
        <>
          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex flex-col">
              <span className="text-gray-500 text-sm font-medium">
                Total Accounts (This Month)
              </span>
              <span className="text-3xl font-bold text-gray-900 mt-2">
                {totalThisMonth}
              </span>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex flex-col">
              <span className="text-gray-500 text-sm font-medium">
                Pending Approvals
              </span>
              <span className="text-3xl font-bold text-amber-500 mt-2">
                {pendingAccounts}
              </span>
            </div>
            <div className="bg-emerald-50 rounded-xl border border-emerald-100 p-5 shadow-sm flex flex-col">
              <span className="text-emerald-700 text-sm font-medium">
                Approved Accounts
              </span>
              <span className="text-3xl font-bold text-emerald-600 mt-2">
                {approvedAccounts}
              </span>
            </div>
            <div className="bg-red-50 rounded-xl border border-red-100 p-5 shadow-sm flex flex-col">
              <span className="text-[#d82b2b] text-sm font-medium">
                Rejected Accounts
              </span>
              <span className="text-3xl font-bold text-[#d82b2b] mt-2">
                {rejectedAccounts}
              </span>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4">Shop Details</th>
                    <th className="px-6 py-4 hidden md:table-cell">Contact</th>
                    <th className="px-6 py-4 hidden lg:table-cell">Location</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {currentRecords.map((dealer) => (
                    <tr
                      key={dealer.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      {/* Shop Details */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-[#d82b2b] flex-shrink-0">
                            <Store className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">
                              {dealer.shopName}
                            </div>
                            <div className="text-gray-500 text-xs flex items-center gap-1 mt-0.5">
                              <User className="w-3 h-3" /> {dealer.dealerName}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="px-6 py-4 hidden md:table-cell space-y-1">
                        <div className="flex items-center gap-1.5 text-gray-700">
                          <Phone className="w-3.5 h-3.5 text-gray-400" />{" "}
                          {dealer.phone}
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-700">
                          <Mail className="w-3.5 h-3.5 text-gray-400" />{" "}
                          {dealer.email}
                        </div>
                      </td>

                      {/* Location */}
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <div className="flex items-start gap-1.5 text-gray-700 max-w-[200px]">
                          <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                          <span
                            className="truncate"
                            title={`${dealer.location?.area}, ${dealer.location?.state} - ${dealer.location?.pinCode}`}
                          >
                            {dealer.location?.area}, {dealer.location?.state}
                          </span>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-900 font-medium">
                          {new Date(dealer.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            {
                              PENDING: "bg-amber-100 text-amber-800",
                              APPROVED: "bg-emerald-100 text-emerald-800",
                              REJECTED: "bg-red-100 text-[#d82b2b]",
                            }[dealer.approvalStatus] ||
                            "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {dealer.approvalStatus}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => setSelectedDealer(dealer)}
                          className="px-4 py-2 bg-[#d82b2b] hover:bg-[#b92525] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
                        >
                          View Action
                        </button>
                      </td>
                    </tr>
                  ))}
                  {currentRecords.length === 0 && (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-12 text-center text-gray-500"
                      >
                        No signup requests found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-4 border-t border-gray-200 bg-gray-50 gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Show</span>
                <select
                  value={recordsPerPage}
                  onChange={handleRecordsPerPageChange}
                  className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#d82b2b]/20 focus:border-[#d82b2b]"
                >
                  {[10, 25, 50, 100].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <span>records</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-1 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm text-gray-600 font-medium px-2">
                  Page {currentPage} of {totalPages || 1}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="p-1 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Action Modal */}
          {selectedDealer && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col"
              >
                {/* Modal Header */}
                <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50">
                  <h2 className="text-lg font-bold text-gray-900">
                    Review Dealer Account
                  </h2>
                  <button
                    onClick={() => setSelectedDealer(null)}
                    className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-5 space-y-4">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-[#d82b2b] mx-auto mb-3">
                      <Store className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {selectedDealer.shopName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {selectedDealer.dealerName}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 grid grid-cols-2 gap-4 border border-gray-100">
                    <div>
                      <span className="block text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-1">
                        Mobile
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedDealer.phone}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-1">
                        Email
                      </span>
                      <span
                        className="text-sm font-medium text-gray-900 truncate block"
                        title={selectedDealer.email}
                      >
                        {selectedDealer.email}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="block text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-1">
                        Location
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedDealer.location?.area},{" "}
                        {selectedDealer.location?.state} -{" "}
                        {selectedDealer.location?.pinCode}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Modal Footer Actions */}
                <div className="p-5 border-t border-gray-100 bg-gray-50">
                  {selectedDealer.approvalStatus === "PENDING" ? (
                    <div className="flex gap-3">
                      <button
                        onClick={() =>
                          handleReject(
                            selectedDealer._id,
                            selectedDealer.shopName,
                          )
                        }
                        className="flex-1 py-2.5 flex items-center justify-center gap-1.5 rounded-lg border border-[#d82b2b] text-[#d82b2b] font-semibold text-sm hover:bg-red-50 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Reject
                      </button>
                      <button
                        onClick={() =>
                          handleApprove(
                            selectedDealer._id,
                            selectedDealer.shopName,
                          )
                        }
                        className="flex-1 py-2.5 flex items-center justify-center gap-1.5 rounded-lg bg-emerald-500 text-white font-semibold text-sm hover:bg-emerald-600 shadow-sm shadow-emerald-500/30 transition-colors"
                      >
                        <Check className="w-4 h-4" />
                        Approve
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-2 text-sm text-gray-500 font-medium">
                      This account has already been{" "}
                      {selectedDealer.approvalStatus.toLowerCase()}.
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DealerSignupAccounts;
