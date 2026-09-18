import React from 'react';
import { Search } from 'lucide-react';
import RankingTableLayout from '../../../components/shared/RankingTableLayout';

const getSecureRandom = () => {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0] / (0xffffffff + 1);
};

const MOCK_DEALERS = Array.from({ length: 45 }, (_, i) => {
  const totalOrders = Math.floor(getSecureRandom() * 500) + 50;
  return {
    id: i + 1,
    name: `Dealer ${String.fromCharCode(65 + (i % 26))}${i + 1}`,
    shopName: ['Super Paints', 'Colors & Co', 'Prime Decor', 'Wall Masters', 'Elite Finishes'][i % 5] + ' ' + String.fromCharCode(65 + (i % 26)),
    location: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata'][i % 5],
    state: ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'West Bengal'][i % 5],
    area: ['Andheri', 'Connaught Place', 'Indiranagar', 'T Nagar', 'Salt Lake'][i % 5],
    pinCode: Math.floor(getSecureRandom() * 900000 + 100000).toString(),
    mobile: '+91 ' + Math.floor(getSecureRandom() * 9000000000 + 1000000000).toString(),
    email: `dealer${i + 1}@example.com`,
    totalOrders: totalOrders,
    totalAmountPaid: totalOrders * (Math.floor(getSecureRandom() * 5000) + 2000),
    amountLeftToPay: Math.floor(getSecureRandom() * 50000),
  };
}).sort((a, b) => b.totalOrders - a.totalOrders);

const DealerRankingTable = () => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  const filterFn = (dealer, searchTerm) => 
    dealer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    dealer.location.toLowerCase().includes(searchTerm.toLowerCase());

  const renderTable = (currentData, startIndex, setSelectedDealer) => (
    <table className="w-full text-center text-sm text-gray-600 whitespace-nowrap">
      <thead className="bg-gray-50/50 text-gray-900 font-semibold border-b border-gray-100">
        <tr>
          <th className="px-6 py-4 w-20 text-center">Rank</th>
          <th className="px-6 py-4 text-center">Dealer Name</th>
          <th className="px-6 py-4 text-center">Shop Name</th>
          <th className="px-6 py-4 text-center">Location</th>
          <th className="px-6 py-4 text-center">Mobile Number</th>
          <th className="px-6 py-4 text-center">Total Orders</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-50 bg-white">
        {currentData.length > 0 ? currentData.map((dealer, idx) => (
          <tr 
            key={dealer.id} 
            className="hover:bg-red-50 transition-colors group cursor-pointer"
            onClick={() => setSelectedDealer(dealer)}
          >
            <td className="px-6 py-4">
              <div className="flex items-center justify-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  startIndex + idx === 0 ? 'bg-amber-100 text-amber-700 shadow-sm' :
                  startIndex + idx === 1 ? 'bg-gray-200 text-gray-700 shadow-sm' :
                  startIndex + idx === 2 ? 'bg-orange-100 text-orange-700 shadow-sm' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {startIndex + idx + 1}
                </span>
              </div>
            </td>
            <td className="px-6 py-4 font-bold text-gray-900 group-hover:text-[#d82b2b] transition-colors text-center">
              {dealer.name}
            </td>
            <td className="px-6 py-4 text-gray-700 font-medium text-center">
              {dealer.shopName}
            </td>
            <td className="px-6 py-4 text-center">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-gray-100 text-gray-600">
                {dealer.location}
              </span>
            </td>
            <td className="px-6 py-4 text-gray-600 font-medium tracking-wide text-center">
              {dealer.mobile}
            </td>
            <td className="px-6 py-4 font-bold text-gray-900 text-center">
              <span className="bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                {dealer.totalOrders}
              </span>
            </td>
          </tr>
        )) : (
          <tr>
            <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
              <div className="flex flex-col items-center justify-center">
                <Search className="w-8 h-8 text-gray-300 mb-3" />
                <p>No dealers found matching your criteria.</p>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );

  const renderModal = (selectedDealer, onClose) => (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl relative overflow-hidden transform transition-all animate-in zoom-in-95">
        <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-5 border-b border-gray-100 flex justify-between items-start">
          <div>
            <h3 className="text-3xl font-black text-gray-900 tracking-tight">{selectedDealer.name}</h3>
            <p className="text-sm font-medium text-[#d82b2b] mt-1">{selectedDealer.shopName}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 bg-white hover:bg-gray-100 rounded-full p-2 transition-colors shadow-sm border border-gray-100 cursor-pointer"
          >
            <span className="sr-only">Close</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                Contact
              </p>
              <p className="font-semibold text-gray-900">{selectedDealer.mobile}</p>
              <p className="text-sm text-gray-600 mt-1">{selectedDealer.email}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                Location
              </p>
              <p className="font-semibold text-gray-900">{selectedDealer.area}, {selectedDealer.state}</p>
              <p className="text-sm text-gray-600 mt-1">PIN: {selectedDealer.pinCode}</p>
            </div>
          </div>

          <div className="bg-red-50 p-5 rounded-xl border border-red-100">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#d82b2b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
              Business Summary
            </h4>
            <div className="grid grid-cols-2 gap-y-5 gap-x-4">
              <div>
                <p className="text-xs text-gray-500 font-semibold mb-1">Total Orders</p>
                <p className="text-2xl font-black text-gray-900">{selectedDealer.totalOrders}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold mb-1">Total Amount Paid</p>
                <p className="text-xl font-black text-emerald-600">{formatCurrency(selectedDealer.totalAmountPaid)}</p>
              </div>
              <div className="col-span-2 pt-4 border-t border-red-200/50">
                <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-red-100">
                  <p className="text-sm text-gray-600 font-semibold">Amount Left to Pay</p>
                  <p className="text-lg font-black text-amber-600">{formatCurrency(selectedDealer.amountLeftToPay)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <RankingTableLayout
      title="Dealer Rankings"
      subtitle="Sorted by total purchased orders"
      data={MOCK_DEALERS}
      searchPlaceholder="Search dealers..."
      filterFn={filterFn}
      renderTable={renderTable}
      renderModal={renderModal}
    />
  );
};

export default DealerRankingTable;
