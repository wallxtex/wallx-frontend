import React, { useMemo } from 'react';
import { Search, ShoppingCart, Banknote, Wallet, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RankingTableLayout from '../../../components/shared/RankingTableLayout';
import StatCard from '../../../components/shared/StatCard';

import { getSecureRandom } from '../../../utils/helpers/constants/mockUtils';

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

const DealerManagement = () => {
  const navigate = useNavigate();

  const stats = useMemo(() => {
    const totalOrdersCount = MOCK_DEALERS.reduce((sum, dealer) => sum + dealer.totalOrders, 0);
    const totalPaidAmount = MOCK_DEALERS.reduce((sum, dealer) => sum + dealer.totalAmountPaid, 0);
    const totalRemainingAmount = MOCK_DEALERS.reduce((sum, dealer) => sum + dealer.amountLeftToPay, 0);
    const totalOrderedAmount = totalPaidAmount + totalRemainingAmount;

    return [
      {
        label: "Total Orders",
        value: totalOrdersCount.toLocaleString(),
        icon: ShoppingCart,
        bgColor: "bg-blue-100",
        iconColor: "text-blue-600",
      },
      {
        label: "Total Ordered Amount",
        value: `₹${(totalOrderedAmount / 100000).toFixed(2)}L`,
        icon: Banknote,
        bgColor: "bg-purple-100",
        iconColor: "text-purple-600",
      },
      {
        label: "Total Paid Amount",
        value: `₹${(totalPaidAmount / 100000).toFixed(2)}L`,
        icon: Wallet,
        bgColor: "bg-emerald-100",
        iconColor: "text-emerald-600",
      },
      {
        label: "Total Remaining",
        value: `₹${(totalRemainingAmount / 100000).toFixed(2)}L`,
        icon: CreditCard,
        bgColor: "bg-amber-100",
        iconColor: "text-amber-600",
      }
    ];
  }, []);
  
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
                  {
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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 flex flex-col pb-12 sm:pb-16">
      {/* Page Heading */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-black">
          Dealer Management
        </h1>
        <p className="text-sm text-gray-500 font-medium mt-1">
          Manage and track all dealer accounts, orders, and performance.
        </p>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, idx) => (
          <StatCard key={idx} stat={stat} />
        ))}
      </div>

      <RankingTableLayout
        title="Dealer Rankings & List"
        subtitle="Sorted by total purchased orders"
        data={MOCK_DEALERS}
        searchPlaceholder="Search dealers..."
        filterFn={filterFn}
        renderTable={renderTable}
      />
    </div>
  );
};

export default DealerManagement;