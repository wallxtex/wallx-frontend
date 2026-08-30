import { IoQrCode, IoCashOutline, IoCheckmarkDoneCircle, IoPhonePortraitOutline, IoShieldCheckmark, IoFlash } from 'react-icons/io5';
import { REDEEM_STEPS } from './painterData';
import SectionHeader from './SectionHeader';
import PainterSection from './PainterSection';

const STEP_CARDS_META = [
  {
    icon: <span>01</span>,
    iconClass: 'bg-red-50 border-2 border-red-200 text-[#d82b2b] shadow-inner group-hover:bg-[#d82b2b] group-hover:text-white',
    badge: (
      <>
        <IoCheckmarkDoneCircle className="text-emerald-500" />
        All 10L & 20L Buckets & Bags Eligible
      </>
    ),
    badgeClass: 'bg-gray-100 text-gray-700',
    cardBorder: 'border-gray-200/90 shadow-sm',
  },
  {
    icon: <IoQrCode className="text-3xl" />,
    iconClass: 'bg-[#d82b2b] text-white shadow-lg shadow-red-500/30',
    badge: (
      <>
        <IoPhonePortraitOutline />
        Use WallX App or WhatsApp Bot
      </>
    ),
    badgeClass: 'bg-red-50 text-[#d82b2b]',
    cardBorder: 'border-2 border-red-300 shadow-md',
  },
  {
    icon: <IoCashOutline className="text-3xl" />,
    iconClass: 'bg-emerald-50 border-2 border-emerald-200 text-emerald-600 shadow-inner group-hover:bg-emerald-600 group-hover:text-white',
    badge: (
      <>
        <IoFlash className="text-amber-500" />
        GPay, PhonePe, Paytm, Direct NEFT
      </>
    ),
    badgeClass: 'bg-emerald-50 text-emerald-700',
    cardBorder: 'border-gray-200/90 shadow-sm',
  },
];

const RedeemQRGuide = () => {
  return (
    <PainterSection className="bg-gradient-to-b from-gray-50 via-white to-gray-50 border-y border-gray-200/70">
      <SectionHeader
        badgeIcon={<IoShieldCheckmark className="text-emerald-600 text-base" />}
        badgeText="100% Genuine & Instant Payout"
        badgeClass="bg-emerald-50 border-emerald-200 text-emerald-800"
        title="How to Redeem WallX QR Cash in 3 Simple Steps"
        description="No waiting, no coin conversions, no dealer dependency. Get real cash directly transferred to your bank UPI account in seconds."
      />

      {/* 3 Step Process Cards */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        <div className="hidden md:block absolute top-1/2 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-red-200 via-[#d82b2b]/40 to-emerald-200 -translate-y-12 z-0" />

        {REDEEM_STEPS.map((step, index) => {
          const meta = STEP_CARDS_META[index] || STEP_CARDS_META[0];
          return (
            <div
              key={step.stepNumber}
              className={`bg-white rounded-2xl p-7 border ${meta.cardBorder} hover:shadow-xl transition-all duration-300 relative z-10 flex flex-col items-center text-center group`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black transition-all duration-300 group-hover:scale-110 ${meta.iconClass}`}>
                {meta.icon}
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {step.subtitle}
              </p>
              <div className={`mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold ${meta.badgeClass}`}>
                {meta.badge}
              </div>
            </div>
          );
        })}
      </div>

      {/* Security & Support Guarantee Bar */}
      <div className="mt-12 p-5 bg-white rounded-2xl border border-gray-200 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        {[
          { title: '🔒 Tamper-Proof Scratch Foil', desc: 'Each QR code is unique and 1-time scannable' },
          { title: '⚡ Instant Verification & SMS', desc: 'Receive instantaneous SMS & WhatsApp confirmation', isMiddle: true },
          { title: '📞 24/7 Painter Helpline', desc: 'Toll-free QR support: 1800-WALLX-HELP' },
        ].map((item) => (
          <div key={item.title} className={`p-3 ${item.isMiddle ? 'border-y sm:border-y-0 sm:border-x border-gray-200' : ''}`}>
            <div className="font-bold text-gray-900 text-sm">{item.title}</div>
            <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
          </div>
        ))}
      </div>
    </PainterSection>
  );
};

export default RedeemQRGuide;
