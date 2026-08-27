import React from 'react';
import { Link } from 'react-router-dom';
import { IoQrCodeOutline, IoFlashOutline, IoTrophyOutline, IoShieldCheckmarkOutline, IoArrowForward } from 'react-icons/io5';
import { PAINTER_STATS } from './painterData';

const PainterHero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#d82b2b] rounded-full blur-[128px]"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-amber-500 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-red-600 rounded-full blur-[140px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Top Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-sm text-gray-200 shadow-inner">
            <span className="flex h-2 w-2 rounded-full bg-[#d82b2b] animate-ping" />
            <span className="font-medium tracking-wide">WallX Painter Mitra Rewards Club 2026</span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="mt-8 text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Scan Buckets. <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-[#d82b2b] to-amber-400">Earn Instant Cash</span> Directly in Bank.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Exclusive loyalty program for professional texture coaters & master painters. Earn guaranteed QR cashback on every WallX bucket, unlock festival dhamaka schemes, and compete on the national leaderboard!
          </p>

          {/* Action Buttons */}
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              to="/painter-signup"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#d82b2b] hover:bg-[#b82222] text-white font-semibold text-base shadow-lg shadow-red-900/30 hover:shadow-red-900/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <IoFlashOutline className="text-xl" />
              Register as Painter Mitra
            </Link>
            <a
              href="#top-painters"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-base backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <IoTrophyOutline className="text-xl text-amber-400" />
              View Top 10 Earners
              <IoArrowForward className="text-sm opacity-80" />
            </a>
          </div>
        </div>

        {/* Live Quick Stats Bar */}
        <div className="mt-14 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-5 text-center transform transition-transform hover:-translate-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#d82b2b]">
              {PAINTER_STATS.activePainters}
            </div>
            <div className="mt-1 text-xs sm:text-sm font-medium text-gray-400">
              Registered Painters
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-5 text-center transform transition-transform hover:-translate-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">
              {PAINTER_STATS.totalCashDisbursed}
            </div>
            <div className="mt-1 text-xs sm:text-sm font-medium text-gray-400">
              QR Cash Disbursed
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-5 text-center transform transition-transform hover:-translate-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
              {PAINTER_STATS.instantPayoutRate}
            </div>
            <div className="mt-1 text-xs sm:text-sm font-medium text-gray-400">
              5-Sec Instant UPI Payout
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-5 text-center transform transition-transform hover:-translate-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-400">
              {PAINTER_STATS.citiesCovered}
            </div>
            <div className="mt-1 text-xs sm:text-sm font-medium text-gray-400">
              Across Pan-India
            </div>
          </div>
        </div>

        {/* Feature Pill Highlights */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-xs sm:text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <IoQrCodeOutline className="text-emerald-400 text-lg" />
            <span>Tamper-proof Silver QR Scratch Codes</span>
          </div>
          <div className="hidden sm:block text-gray-700">•</div>
          <div className="flex items-center gap-2">
            <IoFlashOutline className="text-amber-400 text-lg" />
            <span>Direct Bank & UPI Transfer</span>
          </div>
          <div className="hidden sm:block text-gray-700">•</div>
          <div className="flex items-center gap-2">
            <IoShieldCheckmarkOutline className="text-blue-400 text-lg" />
            <span>100% Genuine WallX Assurance</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PainterHero;
