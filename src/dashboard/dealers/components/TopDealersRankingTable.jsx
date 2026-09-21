import { motion } from "motion/react";
import { Trophy, Medal, Award, Store, Loader2 } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { getDealerDashboardData } from "../../../services/dealers/dealers.services";

const TopDealersRankingTable = () => {
  const [dealers, setDealers] = useState([]);
  const [myStats, setMyStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const CURRENT_LOGGED_IN_DEALER_ID = "CURRENT_USER_ID_PLACEHOLDER"; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDealerDashboardData();
        if (data && data.data) {
          const fetchedDealers = data.data.topDealers || [];
          // Sort by totalOrderVolume descending to ensure ranking is correct
          const sortedDealers = [...fetchedDealers].sort((a, b) => (b.totalOrderVolume || 0) - (a.totalOrderVolume || 0));
          setDealers(sortedDealers);
          setMyStats(data.data.myStats);
        }
      } catch (error) {
        console.error("Failed to fetch top dealers:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const displayData = useMemo(() => {
    // Assign ranks
    const rankedDealers = dealers.map((dealer, index) => ({
      ...dealer,
      actualRank: index + 1
    }));

    const top10 = rankedDealers.slice(0, 10);
  
    const isCurrentInTop10 = top10.some(d => d._id === CURRENT_LOGGED_IN_DEALER_ID);
    
    if (!isCurrentInTop10 && myStats) {
      top10.push({ 
        _id: CURRENT_LOGGED_IN_DEALER_ID, 
        dealerName: "You", 
        shopName: "-", 
        totalOrderVolume: myStats.totalOrderAmount || 0,
        isAppended: true,
        actualRank: "-" // Rank is unknown if outside top 10 from API
      });
    }
    
    return top10;
  }, [dealers, myStats]);

  const getRankIcon = (actualRank) => {
    switch (actualRank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      case "-":
        return <span className="font-bold text-gray-400 w-5 h-5 flex items-center justify-center text-sm">-</span>;
      default:
        return <span className="font-bold text-gray-400 w-5 h-5 flex items-center justify-center text-sm">{actualRank}</span>;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="w-full bg-white border border-gray-100 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden mt-6">
      <div className="p-5 sm:p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Top 10 Dealers Leaderboard</h2>
          <p className="text-sm text-gray-500 mt-1">Based on maximum total order amount</p>
        </div>
      </div>
      
      <div className="overflow-x-auto min-h-[200px] relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-10">
            <Loader2 className="w-8 h-8 animate-spin text-[#d82b2b]" />
          </div>
        ) : null}

        <table className="w-full text-center border-collapse min-w-max">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider w-16 text-center">Rank</th>
              <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Dealer Name</th>
              <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Shop Name</th>
              <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Quantity Order</th>
              <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Total Orders Amount</th>
            </tr>
          </thead>
          <tbody>
            {displayData.length === 0 && !isLoading && (
              <tr>
                <td colSpan="5" className="py-8 text-center text-gray-500 font-medium">
                  No dealer rankings available.
                </td>
              </tr>
            )}
            {displayData.map((dealer, idx) => {
              const isCurrentUser = dealer._id === CURRENT_LOGGED_IN_DEALER_ID;
              
              return (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={dealer._id || idx} 
                  className={`border-b group transition-colors ${
                    isCurrentUser 
                      ? 'bg-red-50/80 hover:bg-red-50 border-l-4 border-l-red-500 border-b-gray-100' 
                      : 'border-b-gray-50 hover:bg-gray-50/50 border-l-4 border-l-transparent'
                  } ${dealer.isAppended ? 'border-t-2 border-t-gray-200' : ''}`}
                >
                  <td className="py-4 px-6">
                    <div className="flex justify-center">
                      {getRankIcon(dealer.actualRank)}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col items-center">
                      <span className={`font-bold transition-colors ${isCurrentUser ? 'text-red-700' : 'text-gray-900 group-hover:text-[#d82b2b]'}`}>
                        {dealer.dealerName} {isCurrentUser && dealer.dealerName !== "You" && "(You)"}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className={`flex items-center justify-center gap-1.5 text-sm font-medium ${isCurrentUser ? 'text-red-600' : 'text-gray-600'}`}>
                      <Store className={`w-3.5 h-3.5 ${isCurrentUser ? 'text-red-500' : 'text-gray-400'}`} />
                      {dealer.shopName}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex justify-center">
                      <div className={`inline-flex items-center px-2.5 py-1 rounded-md text-sm font-bold border ${
                        isCurrentUser 
                          ? 'bg-red-100 text-red-700 border-red-200' 
                          : 'bg-blue-50 text-blue-700 border-blue-100'
                      }`}>
                        N/A
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className={`font-bold ${isCurrentUser ? 'text-red-700' : 'text-gray-900'}`}>
                      {formatCurrency(dealer.totalOrderVolume)}
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopDealersRankingTable;
