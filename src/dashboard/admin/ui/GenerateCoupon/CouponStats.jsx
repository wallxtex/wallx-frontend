import React from 'react';
import { Ticket, CheckCircle2, TicketMinus } from 'lucide-react';

const MOCK_STATS = {
  totalGenerated: 1250,
  active: 840,
  redeemed: 410
};

const CouponStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex items-center gap-4 transition-transform hover:-translate-y-1 hover:shadow-lg">
        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
          <Ticket className="w-6 h-6 text-blue-500" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Total Generated</p>
          <p className="text-2xl font-bold text-gray-900">{MOCK_STATS.totalGenerated.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex items-center gap-4 transition-transform hover:-translate-y-1 hover:shadow-lg">
        <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-6 h-6 text-emerald-500" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Total Active</p>
          <p className="text-2xl font-bold text-gray-900">{MOCK_STATS.active.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex items-center gap-4 transition-transform hover:-translate-y-1 hover:shadow-lg">
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
          <TicketMinus className="w-6 h-6 text-[#d82b2b]" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Total Redeemed</p>
          <p className="text-2xl font-bold text-gray-900">{MOCK_STATS.redeemed.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default CouponStats;
