import { useState } from 'react';
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

const createRunnerUpPodium = ({ order, cardBg, crownBg, crownIcon, badgeClass, badgeLabel, boxBg, borderDivider }) => ({
  order,
  cardBg,
  crownBg,
  crownIcon,
  badgeClass,
  badgeIcon: <IoRibbonOutline />,
  badgeLabel,
  avatarClass: 'w-20 h-20 border-2 text-2xl font-bold',
  nameSize: 'text-xl font-bold',
  boxBg,
  boxLabel: 'text-gray-500 font-semibold',
  cashColor: 'text-gray-900 text-2xl font-extrabold',
  borderDivider,
  hasMilestone: false,
});

const PODIUM_CONFIG = {
  1: {
    order: 'order-1 md:order-2 transform md:-translate-y-4 shadow-2xl',
    cardBg: 'bg-gradient-to-b from-amber-50/70 via-white to-amber-50/40 border-2 border-amber-400',
    crownBg: 'bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-300 border-4 border-white shadow-xl text-amber-950 text-3xl',
    crownIcon: <IoTrophy className="text-amber-900 drop-shadow" />,
    badgeClass: 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-md shadow-amber-500/30 font-extrabold',
    badgeIcon: <IoStar className="text-white text-xs" />,
    badgeLabel: '1st Champion',
    avatarClass: 'w-24 h-24 border-4 ring-4 ring-amber-100 text-3xl font-black',
    nameSize: 'text-2xl font-extrabold',
    boxBg: 'bg-gradient-to-br from-amber-100/90 to-yellow-50 border border-amber-300/80 shadow-sm',
    boxLabel: 'text-amber-900 font-bold',
    cashColor: 'text-[#d82b2b] text-3xl font-black',
    borderDivider: 'border-amber-200 text-amber-950',
    hasMilestone: true,
  },
  2: createRunnerUpPodium({
    order: 'order-2 md:order-1 shadow-md',
    cardBg: 'bg-gradient-to-b from-slate-50 to-white border-2 border-slate-200',
    crownBg: 'bg-gradient-to-tr from-slate-400 to-slate-200 border-2 border-white shadow-md text-slate-800 text-2xl font-black',
    crownIcon: '2',
    badgeClass: 'bg-slate-100 text-slate-700 border border-slate-300 font-bold',
    badgeLabel: '2nd Position',
    boxBg: 'bg-slate-100/80 border border-slate-200',
    borderDivider: 'border-slate-200 text-gray-600',
  }),
  3: createRunnerUpPodium({
    order: 'order-3 shadow-md',
    cardBg: 'bg-gradient-to-b from-orange-50/60 to-white border-2 border-orange-200',
    crownBg: 'bg-gradient-to-tr from-amber-700 to-orange-400 border-2 border-white shadow-md text-white text-2xl font-black',
    crownIcon: '3',
    badgeClass: 'bg-orange-100 text-orange-800 border border-orange-300 font-bold',
    badgeLabel: '3rd Position',
    boxBg: 'bg-orange-50/70 border border-orange-200',
    borderDivider: 'border-orange-200 text-gray-600',
  }),
};

const getRankBadgeStyle = (rank) => {
  if (rank === 1) return 'bg-amber-400 text-amber-950 shadow-sm';
  if (rank === 2) return 'bg-slate-300 text-slate-800';
  if (rank === 3) return 'bg-orange-300 text-orange-900';
  return 'bg-gray-100 text-gray-700 font-semibold';
};

const formatINR = (val) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);
};

const PodiumCard = ({ painter }) => {
  const cfg = PODIUM_CONFIG[painter.rank];
  if (!cfg) return null;

  return (
    <div className={`${cfg.order} ${cfg.cardBg} rounded-3xl p-6 hover:shadow-xl transition-all duration-300 relative text-center flex flex-col items-center`}>
      <div className={`w-14 h-14 -mt-12 rounded-2xl flex items-center justify-center ${cfg.crownBg}`}>
        {cfg.crownIcon}
      </div>

      <span className={`mt-3 inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs ${cfg.badgeClass}`}>
        {cfg.badgeIcon} {cfg.badgeLabel} • {painter.tier}
      </span>

      <div className={`mt-4 rounded-full ${painter.avatarBg} flex items-center justify-center shadow-inner ${cfg.avatarClass}`}>
        {painter.avatarInitials}
      </div>

      <h3 className={`mt-3 text-gray-900 flex items-center justify-center gap-1.5 ${cfg.nameSize}`}>
        {painter.name}
        <IoCheckmarkCircle className="text-blue-500 text-base" title="Verified Master Painter" />
      </h3>

      <div className="mt-1 flex items-center gap-1 text-xs text-gray-500 font-medium">
        <IoLocationOutline className="text-gray-400 text-sm" />
        {painter.city}, {painter.state}
      </div>

      <div className={`mt-5 w-full rounded-2xl p-4 ${cfg.boxBg}`}>
        <div className={`text-xs uppercase tracking-wide ${cfg.boxLabel}`}>Total QR Cash Redeemed (@ ₹90/unit)</div>
        <div className={`mt-0.5 ${cfg.cashColor}`}>
          {formatINR(painter.totalRedeemedAmount)}
        </div>
        <div className={`mt-2 pt-2 border-t text-center text-xs ${cfg.borderDivider}`}>
          <span>Scanned: <strong>{painter.bucketsScanned.toLocaleString()} Bags / Buckets</strong></span>
        </div>
      </div>

      {cfg.hasMilestone && painter.recentReward && (
        <div className="mt-4 p-2 rounded-xl bg-amber-50 text-amber-900 text-xs font-semibold border border-amber-200/60 w-full">
          🎁 Milestone: {painter.recentReward}
        </div>
      )}
    </div>
  );
};

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

  return (
    <section id="top-painters" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white relative">
      <div className="max-w-7xl mx-auto">
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
          {top3.map((painter) => (
            <PodiumCard key={painter.id} painter={painter} />
          ))}
        </div>

        {/* Filter and Search Bar */}
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
                    <td className="py-4 pl-6 pr-3 text-left">
                      <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${getRankBadgeStyle(painter.rank)}`}>
                        #{painter.rank}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-left font-bold text-gray-900">
                      {painter.name}
                    </td>

                    <td className="py-4 px-4 text-gray-600 text-center">
                      <span>{painter.city}, {painter.state}</span>
                    </td>

                    <td className="py-4 px-4 text-center">
                      <div className="inline-flex items-center justify-center gap-1.5 font-semibold text-gray-700">
                        <IoQrCodeOutline className="text-gray-400" />
                        <span>{painter.bucketsScanned.toLocaleString()}</span>
                      </div>
                    </td>

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
