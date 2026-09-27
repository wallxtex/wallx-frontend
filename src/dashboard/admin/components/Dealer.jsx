import React, { useMemo, useState, useEffect } from 'react';
import { Search, ShoppingCart, Banknote, Wallet, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RankingTableLayout from '../../../components/shared/RankingTableLayout';
import StatCard from '../../../components/shared/StatCard';
import { adminDealerStats } from '../../../services/dealers/dealer/dealerManagement';
import { DealerSignupDetails } from '../../../services/dealers/dealer/dealerSignupdetail';

const DealerManagement = () => {
  const navigate = useNavigate();
  const [dealers, setDealers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statsData, setStatsData] = useState({
    totalOrders: 0,
    totalOrderedAmount: 0,
    totalPaidAmount: 0,
    totalRemaining: 0,
  });

  // Fetch dealers and stats on component mount
  useEffect(() => {
    fetchDealers();
    fetchStats();
  }, []);

  const fetchDealers = async () => {
    setIsLoading(true);
    try {
      const response = await DealerSignupDetails();
      if (response.success) {
        const dealerData = response.data.data?.dealers || [];
        // Transform backend data to match frontend format
        const transformedDealers = dealerData.map((dealer) => ({
          id: dealer._id,
          name: dealer.dealerName,
          shopName: dealer.shopName,
          location: dealer.location?.state || 'N/A',
          state: dealer.location?.state || 'N/A',
          area: dealer.location?.area || 'N/A',
          pinCode: dealer.location?.pinCode || 'N/A',
          mobile: dealer.phone,
          email: dealer.email,
          totalOrders: 0, // Will be populated from orders if needed
          totalAmountPaid: 0,
          amountLeftToPay: 0,
        }));
        setDealers(transformedDealers);
      }
    } catch (error) {
      console.error('Error fetching dealers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await adminDealerStats();
      if (response.success) {
        const data = response.data.data;
        setStatsData({
          totalOrders: data.totalOrders || 0,
          totalOrderedAmount: data.totalOrderedAmount || 0,
          totalPaidAmount: data.totalPaidAmount || 0,
          totalRemaining: data.totalRemaining || 0,
        });
      }
    } catch (error) {
      console.error('Error fetching dealer stats:', error);
    }
  };

  const stats = useMemo(() => {
    return [
      {
        label: "Total Orders",
        value: statsData.totalOrders.toLocaleString(),
        icon: ShoppingCart,
        bgColor: "bg-blue-100",
        iconColor: "text-blue-600",
      },
      {
        label: "Total Ordered Amount",
        value: `₹${(statsData.totalOrderedAmount / 100000).toFixed(2)}L`,
        icon: Banknote,
        bgColor: "bg-purple-100",
        iconColor: "text-purple-600",
      },
      {
        label: "Total Paid Amount",
        value: `₹${(statsData.totalPaidAmount / 100000).toFixed(2)}L`,
        icon: Wallet,
        bgColor: "bg-emerald-100",
        iconColor: "text-emerald-600",
      },
      {
        label: "Total Remaining",
        value: `₹${(statsData.totalRemaining / 100000).toFixed(2)}L`,
        icon: CreditCard,
        bgColor: "bg-amber-100",
        iconColor: "text-amber-600",
      }
    ];
  }, [statsData]);
  
  const filterFn = (dealer, searchTerm) => 
    dealer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    dealer.shopName.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
          <th className="px-6 py-4 text-center">Email</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-50 bg-white">
        {isLoading ? (
          <tr>
            <td colSpan="6" className="px-6 py-12 text-center">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d82b2b]"></div>
              </div>
            </td>
          </tr>
        ) : currentData.length > 0 ? currentData.map((dealer, idx) => (
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
            <td className="px-6 py-4 text-gray-600 font-medium text-center truncate max-w-[200px]">
              {dealer.email}
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
        subtitle="All registered dealers in the system"
        data={dealers}
        searchPlaceholder="Search dealers..."
        filterFn={filterFn}
        renderTable={renderTable}
      />
    </div>
  );
};

export default DealerManagement;
