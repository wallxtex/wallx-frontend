import React from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  const filterFn = (dealer, searchTerm) => 
    dealer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    dealer.location.toLowerCase().includes(searchTerm.toLowerCase());

  const renderTable = (currentData, startIndex) => (
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
            onClick={() => navigate(`/admin/dealer-details/${dealer.id}`, { state: { dealer } })}
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

  return (
    <RankingTableLayout
      title="Dealer Rankings"
      subtitle="Sorted by total purchased orders"
      data={MOCK_DEALERS}
      searchPlaceholder="Search dealers..."
      filterFn={filterFn}
      renderTable={renderTable}
    />
  );
};

export default DealerRankingTable;
