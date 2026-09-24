import React from 'react';
import { TOP_DEALERS_DATA } from '../../pages/dealers/dealerData';
import { TOP_PAINTERS_DATA } from '../../pages/painter/component/painterData';

// Use the first 10 items since we only want Top-10
const dealers10 = TOP_DEALERS_DATA.slice(0, 10);
const painters10 = TOP_PAINTERS_DATA.slice(0, 10);

const HorizontalBarChart = ({ title, data, valueKey, valueLabel, subtitle }) => {
  const maxValue = Math.max(...data.map(d => d[valueKey]));

  const getRankBadge = (rank) => {
    if (rank === 1) return <span className="absolute -right-3 -top-3 w-8 h-8 bg-gradient-to-br from-yellow-300 to-yellow-500 text-white rounded-full flex items-center justify-center font-black text-xs shadow-[0_4px_12px_rgba(234,179,8,0.4)] border-2 border-white z-10">1st</span>;
    if (rank === 2) return <span className="absolute -right-3 -top-3 w-8 h-8 bg-gradient-to-br from-slate-300 to-slate-400 text-white rounded-full flex items-center justify-center font-black text-xs shadow-[0_4px_12px_rgba(148,163,184,0.4)] border-2 border-white z-10">2nd</span>;
    if (rank === 3) return <span className="absolute -right-3 -top-3 w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-full flex items-center justify-center font-black text-xs shadow-[0_4px_12px_rgba(249,115,22,0.4)] border-2 border-white z-10">3rd</span>;
    return null;
  };

  const getBarColor = (rank) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-200 to-yellow-400";
    if (rank === 2) return "bg-gradient-to-r from-slate-200 to-slate-300";
    if (rank === 3) return "bg-gradient-to-r from-orange-200 to-orange-400";
    return "bg-[#d82b2b]/15 group-hover:bg-[#d82b2b]/30";
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.06)] flex flex-col h-auto">
      <div className="mb-6 shrink-0">
        <h3 className="text-xl font-bold text-gray-900 tracking-tight">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      
      <div className="flex-1 space-y-6">
        {data.map((item) => {
          const percentage = (item[valueKey] / maxValue) * 100;
          return (
            <div key={`${item.id}-${item.rank}`} className="flex flex-col group">
              <div className="flex justify-between items-end mb-1.5">
                <span className="text-sm font-bold text-gray-800 flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-400 w-4 text-right shrink-0">{item.rank}.</span> 
                  <span className="truncate max-w-[150px] sm:max-w-[200px]" title={item.name}>{item.name}</span>
                </span>
                <span className="text-sm font-bold text-gray-900">{item[valueKey].toLocaleString()} <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">{valueLabel}</span></span>
              </div>
              <div className="w-full bg-gray-50 h-5 rounded-full relative ml-7 w-[calc(100%-60px)]">
                <div 
                  className={`h-full rounded-full relative transition-colors duration-300 ${getBarColor(item.rank)}`}
                  style={{ width: `${Math.max(percentage, 5)}%` }}
                >
                   {getRankBadge(item.rank)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const TopPerformersCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <HorizontalBarChart 
        title="Top 10 Dealers"
        subtitle="Ranked by volume ordered this month"
        data={dealers10}
        valueKey="bucketsOrdered"
        valueLabel="Units"
      />
      <HorizontalBarChart 
        title="Top 10 Painters"
        subtitle="Ranked by QR buckets scanned this month"
        data={painters10}
        valueKey="bucketsScanned"
        valueLabel="Scans"
      />
    </div>
  );
};

export default TopPerformersCharts;
