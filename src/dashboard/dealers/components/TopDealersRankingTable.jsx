import { motion } from "motion/react";
import { Trophy, Medal, Award, Store, Loader2 } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { getDealerDashboardData, getPublicData } from "../../../services/dealers/dealers.services";
import { formatCurrency } from "../../../utils/helpers/constants/formatCurrency";
//top 
const TopDealersRankingTable = () => {
  const [dealers, setDealers] = useState([]);
  const [myStats, setMyStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [publicDataRes, dashboardDataRes] = await Promise.all([
          getPublicData(),
          getDealerDashboardData()
        ]);

        if (publicDataRes && publicDataRes.data) {
          const fetchedDealers = publicDataRes.data.topDealers || [];
          // Sort by totalOrderVolume descending to ensure ranking is correct
          const sortedDealers = [...fetchedDealers].sort((a, b) => (b.totalOrderVolume || 0) - (a.totalOrderVolume || 0));
          setDealers(sortedDealers);
        }

        if (dashboardDataRes?.data) {
          setMyStats(dashboardDataRes.data.myStats);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
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
  
    const currentDealerId = myStats?.id;
    const isCurrentInTop10 = currentDealerId ? top10.some(d => d._id === currentDealerId) : false;
    
    if (currentDealerId && !isCurrentInTop10 && myStats) {
      top10.push({ 
        _id: currentDealerId, 
        dealerName: "You", 
        shopName: myStats.shopName || "-", 
        totalOrderVolume: myStats.totalOrderAmount || 0,
        totalOrders: myStats.totalOrderCount || 0,
        isAppended: true,
        actualRank: myStats.rank || ""
      });
    }

    // Pad with empty rows so the table always has exactly 10 slots (excluding the appended row if any)
    // Actually, if we just want exactly 10 rows minimum:
    while (top10.length < 10) {
      top10.push({
        _id: `dummy-${top10.length}`,
        dealerName: "NA",
        shopName: "NA",
        totalOrderVolume: 0,
        totalOrders: 0,
        actualRank: top10.length + 1,
        isDummy: true
      });
    }
    
    return top10;
  }, [dealers, myStats]);

  const getRankIcon = (actualRank) => {
    switch (actualRank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Trophy className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Trophy className="w-5 h-5 text-amber-600" />;
      case "-":
        return <span className="font-bold text-gray-400 w-5 h-5 flex items-center justify-center text-sm">-</span>;
      default:
        return <span className="font-bold text-gray-400 w-5 h-5 flex items-center justify-center text-sm">{actualRank}</span>;
    }
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
              const isCurrentUser = dealer._id === myStats?.id;
              
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
                      {dealer.shopName}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex justify-center">
                      <div className={`inline-flex items-center text-sm font-bold ${
                        isCurrentUser 
                          ? 'text-red-700' 
                          : 'text-gray-900'
                      }`}>
                        {dealer.totalOrders ?? 'N/A'}
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
