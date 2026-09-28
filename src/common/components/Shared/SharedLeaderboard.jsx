import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  IoSearchOutline, 
  IoFilterOutline 
} from 'react-icons/io5';
import { INDIAN_STATES } from '../../../constants/states';
import SectionHeader from './SectionHeader';
import SharedSection from './SharedSection';
import PodiumCard from './PodiumCard';

export const getRankBadgeStyle = (rank) => {
  if (rank === 1) return 'bg-amber-400 text-amber-950 shadow-sm';
  if (rank === 2) return 'bg-slate-300 text-slate-800';
  if (rank === 3) return 'bg-orange-300 text-orange-900';
  return 'bg-gray-100 text-gray-700 font-semibold';
};

const SharedLeaderboard = ({
  id,
  className = "bg-white relative",
  headerProps,
  data,
  metricsConfig,
  tableColumns,
  renderTableRow,
  searchPlaceholder = "Search by name or city...",
  bottomCtaProps
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('all');

  const filteredData = data.filter(item => {
    const itemName = item.name || item.dealerName || item.shopName || `${item.firstName || ''} ${item.lastName || ''}`.trim() || '';
    const itemCity = item.city || item.location?.area || item.address?.city || '';
    const itemState = item.state || item.location?.state || item.address?.state || '';

    const matchesSearch = 
      itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      itemCity.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesState = selectedState === 'all' || itemState.toLowerCase() === selectedState.toLowerCase();
    return matchesSearch && matchesState;
  });

  const top3 = data.slice(0, 3);

  return (
    <SharedSection id={id} className={className}>
      <SectionHeader {...headerProps} />

      {/* Podium for Top 3 */}
      <div className="mt-14 max-w-6xl xl:max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-10 items-end">
        {top3.map((person, idx) => {
          const name = person.name || person.dealerName || person.shopName || `${person.firstName || ''} ${person.lastName || ''}`.trim() || 'Dealer';
          const city = person.city || person.location?.area || person.address?.city || '';
          const state = person.state || person.location?.state || person.address?.state || '';
          const avatarInitials = name.substring(0, 2).toUpperCase();
          const avatarBg = 'bg-white text-gray-800';
          
          return (
            <PodiumCard 
              key={person._id || person.id || idx} 
              person={{ ...person, rank: idx + 1, name, city, state, avatarInitials, avatarBg }} 
              metricsConfig={metricsConfig} 
            />
          );
        })}
      </div>

      {/* Filter and Search Bar */}
      <div className="mt-16 bg-gray-50 border border-gray-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80 md:w-96">
          <IoSearchOutline className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder={searchPlaceholder}
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
                {tableColumns.map((col, idx) => (
                  <th key={idx} className={`py-4 px-4 ${col.align === 'center' ? 'text-center' : 'text-left'}`}>
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredData.map((item) => {
                const rank = data.indexOf(item) + 1;
                return (
                <tr
                  key={item._id || item.id}
                  className="hover:bg-red-50/30 transition-colors group"
                >
                  <td className="py-4 pl-6 pr-3 text-left">
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${getRankBadgeStyle(rank)}`}>
                      {rank === 1 ? (
                        <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                      ) : rank === 2 ? (
                        <svg className="w-4 h-4 text-slate-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                      ) : rank === 3 ? (
                        <svg className="w-4 h-4 text-orange-700" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                      ) : (
                        rank
                      )}
                    </span>
                  </td>
                  {renderTableRow(item)}
                </tr>
              )})}
            </tbody>
          </table>
        </div>

        {filteredData.length === 0 && data.length > 0 && (
          <div className="text-center py-12 px-4">
            <p className="text-gray-500 text-sm">No results found for the selected state or query.</p>
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setSelectedState('all'); }}
              className="mt-2 text-xs font-semibold text-[#d82b2b] hover:underline cursor-pointer"
            >
              Clear filter to show all
            </button>
          </div>
        )}

        {data.length === 0 && (
          <div className="text-center py-12 px-4">
            <p className="text-gray-500 text-sm">No dealers exist at the moment.</p>
          </div>
        )}
      </div>

      {/* Bottom CTA to registration */}
      {bottomCtaProps && (
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-red-50 to-white border border-red-200">
          <div>
            <h4 className="font-bold text-gray-900">{bottomCtaProps.title}</h4>
            <p className="text-xs sm:text-sm text-gray-600">
              {bottomCtaProps.description}
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link
              to={bottomCtaProps.linkUrl}
              className="px-6 py-2.5 rounded-xl bg-[#d82b2b] hover:bg-[#b82222] text-white text-xs font-semibold shadow-md shadow-red-500/20 transition-all"
            >
              {bottomCtaProps.linkText}
            </Link>
          </div>
        </div>
      )}
    </SharedSection>
  );
};

export default SharedLeaderboard;
