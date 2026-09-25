import { formatCurrency } from '../../../utils/helpers/constants/formatCurrency'
import { Search, User, MapPin, Phone, CreditCard, TrendingUp, X } from 'lucide-react';
import RankingTableLayout from '../../../components/shared/RankingTableLayout';

import { getSecureRandom } from '../../../utils/helpers/constants/mockUtils';
import { useEffect, useState } from 'react';
import { getAllPainters } from '../../../services/admin/admin.services';

// const MOCK_PAINTERS = Array.from({ length: 45 }, (_, i) => {
//   const totalRedeems = Math.floor(getSecureRandom() * 200) + 10;
//   return {
//     id: i + 1,
//     name: `Painter ${String.fromCharCode(65 + (i % 26))}${i + 1}`,
//     mobileNumber: '+91 ' + Math.floor(getSecureRandom() * 9000000000 + 1000000000).toString(),
//     upiId: `painter${i + 1}@upi`,
//     address: ['Andheri, Mumbai', 'Connaught Place, Delhi', 'Indiranagar, Bangalore', 'T Nagar, Chennai', 'Salt Lake, Kolkata'][i % 5],
//     totalRedeems: totalRedeems,
//     totalRedeemedAmount: totalRedeems * (Math.floor(getSecureRandom() * 500) + 100),
//     role: "painter",
//     razorpayContactId: `cont_${getSecureRandom().toString(36).substr(2, 14)}`,
//     razorpayFundAccountId: `fa_${getSecureRandom().toString(36).substr(2, 14)}`,
//   };
// }).sort((a, b) => b.totalRedeemedAmount - a.totalRedeemedAmount);

const PainterRankingTable = () => {

  const filterFn = (painter, searchTerm) =>
    painter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    painter.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    painter.mobileNumber.includes(searchTerm);

  const renderTable = (currentData, startIndex, setSelectedPainter) => (
    <table className="w-full text-center text-sm text-gray-600 whitespace-nowrap">
      <thead className="bg-gray-50/50 text-gray-900 font-semibold border-b border-gray-100">
        <tr>
          <th className="px-6 py-4 w-20 text-center">Rank</th>
          <th className="px-6 py-4 text-center">Name</th>
          <th className="px-6 py-4 text-center">Mobile Number</th>
          <th className="px-6 py-4 text-center">Address</th>
          <th className="px-6 py-4 text-center">Total Redeemed Amount</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-50 bg-white">
        {currentData.length > 0 ? currentData.map((painter, idx) => (
          <tr
            key={painter.id}
            className="hover:bg-red-50 transition-colors group cursor-pointer"
            onClick={() => setSelectedPainter(painter)}
          >
            <td className="px-6 py-4">
              <div className="flex items-center justify-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${{
                  0: 'bg-amber-100 text-amber-700 shadow-sm',
                  1: 'bg-gray-200 text-gray-700 shadow-sm',
                  2: 'bg-orange-100 text-orange-700 shadow-sm'
                }[startIndex + idx] || 'bg-gray-100 text-gray-600'
                  }`}>
                  {startIndex + idx + 1}
                </span>
              </div>
            </td>
            <td className="px-6 py-4 font-bold text-gray-900 group-hover:text-[#d82b2b] transition-colors text-center">
              {painter.name}
            </td>
            <td className="px-6 py-4 text-gray-700 font-medium text-center">
              {painter.mobileNumber}
            </td>
            <td className="px-6 py-4 text-center">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-sm font-semibold  text-gray-700 truncate max-w-[200px]">
                {painter.address}
              </span>
            </td>
            <td className="px-6 py-4 font-bold text-red-700 text-sm text-center">
              {painter.totalRedeemedAmount}
            </td>
          </tr>
        )) : (
          <tr>
            <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
              <div className="flex flex-col items-center justify-center">
                <Search className="w-8 h-8 text-gray-300 mb-3" />
                <p>No painters found matching your criteria.</p>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );

  const renderModal = (selectedPainter, onClose) => (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl relative overflow-hidden transform transition-all animate-in zoom-in-95">
        <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-5 border-b border-gray-100 flex justify-between items-start">
          <div>
            <h3 className="text-3xl font-black text-gray-900 tracking-tight">{selectedPainter.name}</h3>
            <p className="text-sm font-medium text-[#d82b2b] mt-1 capitalize flex items-center gap-1.5">
              <User className="w-4 h-4" />
              Role: {selectedPainter.role || "Painter"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 bg-white hover:bg-gray-100 rounded-full p-2 transition-colors shadow-sm border border-gray-100 cursor-pointer"
          >
            <span className="sr-only">Close</span>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors shadow-sm">
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-gray-400" />
              Profile & Contact
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Mobile Number</p>
                <p className="font-semibold text-gray-900">{selectedPainter.mobileNumber || "N/A"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> Address
                </p>
                <p className="font-semibold text-gray-900 text-sm">{selectedPainter.address || "N/A"}</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 hover:border-blue-200 transition-colors shadow-sm">
            <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-blue-500" />
              UPI Details
            </p>
            <div className="flex flex-col">
              <p className="text-xs text-blue-500/80 mb-1">UPI ID</p>
              <div className="bg-white px-3 py-2 rounded-lg border border-blue-100 inline-block font-mono text-sm font-bold text-gray-800 shadow-sm w-max">
                {selectedPainter.upiId || "N/A"}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-orange-50 p-5 rounded-xl border border-red-100 shadow-sm">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-red-200 pb-3">
              <TrendingUp className="w-4 h-4 text-[#d82b2b]" />
              Performance Summary
            </h4>
            <div className="grid grid-cols-2 gap-y-5 gap-x-4 pt-1">
              <div>
                <p className="text-xs text-gray-500 font-semibold mb-1">Total Redeems</p>
                <p className="text-2xl font-black text-gray-900">{selectedPainter.totalRedeems || "N/A"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold mb-1">Redeemed Amount</p>
                <p className="text-2xl font-black text-emerald-600">{selectedPainter.totalRedeemedAmount ? formatCurrency(selectedPainter.totalRedeemedAmount) : "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const [painters, setPainters] = useState([])

  useEffect(() => {
    const fetchAllPainters = async () => {
      try {
        const response = await getAllPainters()
        if (response?.success) {
          let actualData = response.data?.data || response.data || []

          if (!Array.isArray(actualData)) {
            const arrayProp = Object.values(actualData).find(val => Array.isArray(val));
            actualData = arrayProp || [];
          }

          // Sort painters by totalRedeemedAmount in descending order
          actualData.sort((a, b) => (b.totalRedeemedAmount || 0) - (a.totalRedeemedAmount || 0));

          setPainters(actualData)
        }
      }
      catch (error) {
        console.log("something went wrong in fetching painters ", error)
      }
    }
    fetchAllPainters()
  }, [])

  return (
    <RankingTableLayout
      title="Painter Rankings"
      subtitle="Sorted by total redeemed amount"
      data={painters}
      searchPlaceholder="Search painters..."
      filterFn={filterFn}
      renderTable={renderTable}
      renderModal={renderModal}
    />
  );
};

export default PainterRankingTable;
