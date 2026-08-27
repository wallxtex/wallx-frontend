import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  IoTrophy, 
  IoRibbonOutline, 
  IoLocationOutline, 
  IoQrCodeOutline, 
  IoSearchOutline, 
  IoCheckmarkCircle, 
  IoStar,
  IoFilterOutline
} from 'react-icons/io5';
import { TOP_PAINTERS_DATA } from './painterData';
import { INDIAN_STATES } from '../../../constants/states';

const TopPaintersLeaderboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('all');

  const filteredPainters = TOP_PAINTERS_DATA.filter(painter => {
    const matchesSearch = 
      painter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      painter.city.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesState = selectedState === 'all' || painter.state.toLowerCase() === selectedState.toLowerCase();
    return matchesSearch && matchesState;
  });

  const top3 = TOP_PAINTERS_DATA.slice(0, 3);
  const rank1 = top3[0];
  const rank2 = top3[1];
  const rank3 = top3[2];

  // Helper to format currency in Indian numbering
  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="top-painters" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs sm:text-sm font-semibold mb-3">
            <IoTrophy className="text-amber-500 text-base" />
            <span>National QR Cash Leaderboard • Flat ₹90 / Bucket or Bag</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Top 10 Painters & QR Cash Redeem Earners
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600">
            Meet our highest-earning texture coating champions who have earned massive cashbacks by redeeming genuine WallX QR coupons at flat ₹90 per bucket or bag.
          </p>
        </div>

        {/* Podium for Top 3 Painters */}
        <div className="mt-14 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          
          {/* Rank #2 (Silver) */}
          {rank2 && (
            <div className="order-2 md:order-1 bg-gradient-to-b from-slate-50 to-white rounded-3xl p-6 border-2 border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 relative text-center flex flex-col items-center">
              {/* Crown / Rank Icon */}
              <div className="w-14 h-14 -mt-12 rounded-2xl bg-gradient-to-tr from-slate-400 to-slate-200 border-2 border-white shadow-md flex items-center justify-center text-slate-800 text-2xl font-black">
                2
              </div>
              <span className="mt-3 inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-300">
                <IoRibbonOutline /> 2nd Position • {rank2.tier}
              </span>

              <div className={`mt-4 w-20 h-20 rounded-full ${rank2.avatarBg} border-2 flex items-center justify-center font-bold text-2xl shadow-inner`}>
                {rank2.avatarInitials}
              </div>

              <h3 className="mt-3 text-xl font-bold text-gray-900 flex items-center justify-center gap-1.5">
                {rank2.name}
                <IoCheckmarkCircle className="text-blue-500 text-base" title="Verified Master Painter" />
              </h3>

              <div className="mt-1 flex items-center gap-1 text-xs text-gray-500 font-medium">
                <IoLocationOutline className="text-gray-400 text-sm" />
                {rank2.city}, {rank2.state}
              </div>

              {/* QR Cash Earning Box */}
              <div className="mt-5 w-full bg-slate-100/80 rounded-2xl p-4 border border-slate-200">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Total QR Cash Redeemed (@ ₹90/unit)</div>
                <div className="text-2xl font-extrabold text-gray-900 mt-0.5">
                  {formatINR(rank2.totalRedeemedAmount)}
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 text-center text-xs text-gray-600">
                  <span>Scanned: <strong>{rank2.bucketsScanned.toLocaleString()} Bags / Buckets</strong></span>
                </div>
              </div>
            </div>
          )}

          {/* Rank #1 (Gold Champion) */}
          {rank1 && (
            <div className="order-1 md:order-2 bg-gradient-to-b from-amber-50/70 via-white to-amber-50/40 rounded-3xl p-7 border-2 border-amber-400 shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 relative text-center flex flex-col items-center transform md:-translate-y-4">
              {/* Champion Badge */}
              <div className="w-16 h-16 -mt-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-300 border-4 border-white shadow-xl flex items-center justify-center text-amber-950 text-3xl font-black">
                <IoTrophy className="text-amber-900 drop-shadow" />
              </div>
              <span className="mt-3 inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-extrabold bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-md shadow-amber-500/30">
                <IoStar className="text-white text-xs" /> #1 Champion • {rank1.tier}
              </span>

              <div className={`mt-4 w-24 h-24 rounded-full ${rank1.avatarBg} border-4 flex items-center justify-center font-black text-3xl shadow-inner ring-4 ring-amber-100`}>
                {rank1.avatarInitials}
              </div>

              <h3 className="mt-3 text-2xl font-extrabold text-gray-900 flex items-center justify-center gap-1.5">
                {rank1.name}
                <IoCheckmarkCircle className="text-blue-500 text-lg" title="Verified Master Painter" />
              </h3>

              <div className="mt-1 flex items-center gap-1 text-sm text-gray-500 font-medium">
                <IoLocationOutline className="text-amber-600 text-base" />
                {rank1.city}, {rank1.state}
              </div>

              {/* QR Cash Earning Box */}
              <div className="mt-5 w-full bg-gradient-to-br from-amber-100/90 to-yellow-50 rounded-2xl p-4 border border-amber-300/80 shadow-sm">
                <div className="text-xs font-bold text-amber-900 uppercase tracking-wide">Total QR Cash Redeemed (@ ₹90/unit)</div>
                <div className="text-3xl font-black text-[#d82b2b] mt-0.5">
                  {formatINR(rank1.totalRedeemedAmount)}
                </div>
                <div className="mt-2.5 pt-2.5 border-t border-amber-200 text-center text-xs text-amber-950">
                  <span>Scanned: <strong>{rank1.bucketsScanned.toLocaleString()} Bags / Buckets</strong></span>
                </div>
              </div>

              <div className="mt-4 p-2 rounded-xl bg-amber-50 text-amber-900 text-xs font-semibold border border-amber-200/60 w-full">
                🎁 Milestone: {rank1.recentReward}
              </div>
            </div>
          )}

          {/* Rank #3 (Bronze) */}
          {rank3 && (
            <div className="order-3 bg-gradient-to-b from-orange-50/60 to-white rounded-3xl p-6 border-2 border-orange-200 shadow-md hover:shadow-xl transition-all duration-300 relative text-center flex flex-col items-center">
              {/* Rank Icon */}
              <div className="w-14 h-14 -mt-12 rounded-2xl bg-gradient-to-tr from-amber-700 to-orange-400 border-2 border-white shadow-md flex items-center justify-center text-white text-2xl font-black">
                3
              </div>
              <span className="mt-3 inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-300">
                <IoRibbonOutline /> 3rd Position • {rank3.tier}
              </span>

              <div className={`mt-4 w-20 h-20 rounded-full ${rank3.avatarBg} border-2 flex items-center justify-center font-bold text-2xl shadow-inner`}>
                {rank3.avatarInitials}
              </div>

              <h3 className="mt-3 text-xl font-bold text-gray-900 flex items-center justify-center gap-1.5">
                {rank3.name}
                <IoCheckmarkCircle className="text-blue-500 text-base" title="Verified Master Painter" />
              </h3>

              <div className="mt-1 flex items-center gap-1 text-xs text-gray-500 font-medium">
                <IoLocationOutline className="text-gray-400 text-sm" />
                {rank3.city}, {rank3.state}
              </div>

              {/* QR Cash Earning Box */}
              <div className="mt-5 w-full bg-orange-50/70 rounded-2xl p-4 border border-orange-200">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Total QR Cash Redeemed (@ ₹90/unit)</div>
                <div className="text-2xl font-extrabold text-gray-900 mt-0.5">
                  {formatINR(rank3.totalRedeemedAmount)}
                </div>
                <div className="mt-2 pt-2 border-t border-orange-200 text-center text-xs text-gray-600">
                  <span>Scanned: <strong>{rank3.bucketsScanned.toLocaleString()} Bags / Buckets</strong></span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Filter and Search Bar for Top 10 Table */}
        <div className="mt-16 bg-gray-50 border border-gray-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80 md:w-96">
            <IoSearchOutline className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search painter by name or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#d82b2b] focus:border-transparent transition-all"
            />
          </div>

          {/* State Dropdown with All States */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 whitespace-nowrap">
              <IoFilterOutline className="text-sm text-[#d82b2b]" />
              <span>Select State:</span>
            </div>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full sm:w-60 px-3.5 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#d82b2b] focus:border-transparent transition-all cursor-pointer font-medium"
            >
              <option value="all">All States (Pan-India)</option>
              {INDIAN_STATES.map((stateName) => (
                <option key={stateName} value={stateName}>
                  {stateName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Full Top 10 Table */}
        <div className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/90 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="py-4 pl-6 pr-3 text-left w-20">Rank</th>
                  <th className="py-4 px-4 text-left">Painter Name</th>
                  <th className="py-4 px-4 text-center">Location</th>
                  <th className="py-4 px-4 text-center">Buckets / Bags Scanned</th>
                  <th className="py-4 px-4 sm:px-6 text-center">QR Cash Redeemed (@ ₹90)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredPainters.map((painter) => (
                  <tr
                    key={painter.id}
                    className="hover:bg-red-50/30 transition-colors group"
                  >
                    {/* 1. Rank Column (Touched on the left) */}
                    <td className="py-4 pl-6 pr-3 text-left">
                      <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                        painter.rank === 1
                          ? 'bg-amber-400 text-amber-950 shadow-sm'
                          : painter.rank === 2
                          ? 'bg-slate-300 text-slate-800'
                          : painter.rank === 3
                          ? 'bg-orange-300 text-orange-900'
                          : 'bg-gray-100 text-gray-700 font-semibold'
                      }`}>
                        #{painter.rank}
                      </span>
                    </td>

                    {/* 2. Painter Name Column */}
                    <td className="py-4 px-4 text-left font-bold text-gray-900">
                      {painter.name}
                    </td>

                    {/* 3. Location Column (Centered) */}
                    <td className="py-4 px-4 text-gray-600 text-center">
                      <span>{painter.city}, {painter.state}</span>
                    </td>

                    {/* 4. Buckets / Bags Scanned (Centered) */}
                    <td className="py-4 px-4 text-center">
                      <div className="inline-flex items-center justify-center gap-1.5 font-semibold text-gray-700">
                        <IoQrCodeOutline className="text-gray-400" />
                        <span>{painter.bucketsScanned.toLocaleString()}</span>
                      </div>
                    </td>

                    {/* 5. QR Cash Redeemed (Centered) */}
                    <td className="py-4 px-4 sm:px-6 text-center font-extrabold text-base text-[#d82b2b]">
                      {formatINR(painter.totalRedeemedAmount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPainters.length === 0 && (
            <div className="text-center py-12 px-4">
              <p className="text-gray-500 text-sm">No top painters found for the selected state or query.</p>
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setSelectedState('all'); }}
                className="mt-2 text-xs font-semibold text-[#d82b2b] hover:underline cursor-pointer"
              >
                Clear filter to show all
              </button>
            </div>
          )}
        </div>

        {/* Bottom CTA to registration */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-red-50 to-white border border-red-200">
          <div>
            <h4 className="font-bold text-gray-900">Want your name on the WallX Star Painter Podium?</h4>
            <p className="text-xs sm:text-sm text-gray-600">
              Register with your mobile number, start scanning QR codes on WallX buckets & bags, and withdraw cash directly!
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link
              to="/painter-signup"
              className="px-6 py-2.5 rounded-xl bg-[#d82b2b] hover:bg-[#b82222] text-white text-xs font-semibold shadow-md shadow-red-500/20 transition-all"
            >
              Join Leaderboard
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopPaintersLeaderboard;
