import React from 'react';
import { Link } from 'react-router-dom';
import { IoFlashOutline, IoCallOutline, IoQrCodeOutline } from 'react-icons/io5';

const PainterCTA = () => {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-950 text-white relative overflow-hidden">
      {/* Glow gradient blobs */}
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#d82b2b] rounded-full blur-[100px]"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-amber-500 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#d82b2b]/20 border border-[#d82b2b]/40 text-[#d82b2b] flex items-center justify-center text-3xl mx-auto shadow-inner mb-6">
          <IoQrCodeOutline />
        </div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          Ready to Start Earning with WallX?
        </h2>
        <p className="mt-4 text-base sm:text-xl text-gray-300 max-w-2xl mx-auto">
          Join thousands of painters across India earning flat ₹90 instant cash on every texture bucket or bag. Simple 2-minute mobile signup.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/painter-signup"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#d82b2b] hover:bg-[#b82222] text-white font-bold text-base shadow-xl shadow-red-900/40 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <IoFlashOutline className="text-xl" />
            Register as Painter Mitra Now
          </Link>
          <a
            href="tel:18001239255"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-base backdrop-blur-sm transition-all"
          >
            <IoCallOutline className="text-xl text-emerald-400" />
            Toll Free: 1800-WALLX-HELP
          </a>
        </div>

        <p className="mt-6 text-xs text-gray-400">
          * Instant cash redemption requires a valid UPI ID / bank account linked with registered mobile number.
        </p>
      </div>
    </section>
  );
};

export default PainterCTA;
