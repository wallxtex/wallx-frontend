import { useRef, useState, useEffect } from "react";
import { Crown } from "lucide-react";
import { IoLocationOutline } from "react-icons/io5";
import { useSectionAnimation } from "./useSectionAnimation";
import PodiumCard from '../../common/components/Shared/PodiumCard';
import { TOP_PAINTERS_DATA } from '../../pages/painter/component/painterData';
import { getPublicData } from '../../services/dealers/dealers.services';

const PainterCard = ({ person, metricsConfig }) => (
  <div className="min-w-[230px] w-[230px] sm:min-w-[280px] sm:w-[280px] md:min-w-[310px] md:w-[310px] h-[325px] md:h-[355px] bg-red-50 border-2 border-red-100 rounded-3xl p-5 sm:p-6 hover:shadow-lg transition-all duration-300 relative text-center flex flex-col items-center mx-3 sm:mx-4">
    <div className="w-12 h-12 -mt-11 sm:-mt-12 rounded-full flex items-center justify-center bg-white border border-red-200 shadow-sm text-red-600 font-black text-xl z-10">
      {person.rank}
    </div>

    <div className={`mt-4 w-20 h-20 rounded-full border-2 font-bold flex items-center justify-center shadow-inner text-2xl ${person.avatarBg}`}>
      {person.avatarInitials}
    </div>

    <h3 className="mt-3 text-gray-900 flex items-center justify-center gap-1.5 text-lg font-bold">
      {person.name}
    </h3>

    <div className="mt-1 flex items-center gap-1 text-xs text-gray-500 font-medium">
      <IoLocationOutline className="text-gray-400 text-sm" />
      {person.address || `${person.city}, ${person.state}`}
    </div>

    <div className="mt-auto w-full rounded-2xl p-4 bg-white border border-red-50">
      <div className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{metricsConfig.primaryLabel}</div>
      <div className="mt-0.5 text-gray-900 text-xl font-extrabold">
        {metricsConfig.formatPrimary ? metricsConfig.formatPrimary(person[metricsConfig.primaryKey]) : person[metricsConfig.primaryKey]}
      </div>
      <div className="mt-2 pt-2 border-t border-gray-100 text-center text-xs text-gray-500">
        <span>{metricsConfig.secondaryLabel}: <strong>{metricsConfig.formatSecondary ? metricsConfig.formatSecondary(person[metricsConfig.secondaryKey]) : person[metricsConfig.secondaryKey]}</strong></span>
      </div>
    </div>
  </div>
);

const ThirdSection = () => {
  const headerRef = useRef(null);
  const performanceCardRef = useRef(null);
  const [paintersData, setPaintersData] = useState([]);

  useEffect(() => {
    const fetchPainters = async () => {
      try {
        const response = await getPublicData();
        if (response?.success) {
          const list = response?.data?.topPainters || [];
          
          if (list.length > 0) {
            const mappedList = list.map((painter, index) => {
              const name = painter.name || (painter.firstName ? `${painter.firstName} ${painter.lastName || ''}`.trim() : null) || 'Painter';
              const initials = name.split(' ').filter(n => n.length > 0).map(n => n[0]).join('').substring(0, 2).toUpperCase();
              const colors = [
                "bg-amber-100 text-amber-800 border-amber-300",
                "bg-slate-100 text-slate-800 border-slate-300",
                "bg-orange-100 text-orange-800 border-orange-300",
                "bg-red-50 text-[#d82b2b] border-red-200",
                "bg-yellow-50 text-yellow-800 border-yellow-200",
                "bg-blue-50 text-blue-700 border-blue-200",
                "bg-emerald-50 text-emerald-700 border-emerald-200",
                "bg-purple-50 text-purple-700 border-purple-200"
              ];
              const color = colors[index % colors.length];

              const address = typeof painter.address === 'string' ? painter.address : 'N/A';

              return {
                id: painter._id || painter.id || index,
                name: name,
                rank: index + 1,
                avatarInitials: initials,
                avatarBg: color,
                address: address,
                totalRedeemedAmount: painter.totalRedeemedAmount || painter.totalRewards || painter.totalBonusEarned || 0,
                couponsScanned: painter.couponsRedeemed ?? painter.couponsScanned ?? painter.bucketsScanned ?? painter.totalScans ?? painter.totalOrders ?? 0,
              };
            });
            setPaintersData(mappedList);
          }
        }
      } catch (error) {
        console.error("Failed to fetch top painters:", error);
      }
    };
    
    fetchPainters();
  }, []);

  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const metricsConfig = {
    primaryLabel: "Total Cash Redeemed",
    primaryKey: "totalRedeemedAmount",
    formatPrimary: formatINR,
    secondaryLabel: "Scanned",
    secondaryKey: "couponsScanned",
    formatSecondary: (val) => `${val ? val.toLocaleString() : 0} Coupons`
  };

  const sectionRef = useSectionAnimation(headerRef, performanceCardRef);

  return (
    <section ref={sectionRef} className="w-full bg-white py-16 md:py-24 lg:py-32 overflow-hidden">
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}
      </style>
      <div className="w-full h-auto flex items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-6xl">
          {/* Section Header */}
          <div
            ref={headerRef}
            className="w-full text-center mb-12 md:mb-16 lg:mb-20"
          >
            <div className="flex items-center justify-center gap-2 mb-3 md:mb-4 lg:mb-5">
              <Crown className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-red-500" />
              <span className="text-xs sm:text-sm md:text-sm font-bold text-red-500 uppercase tracking-wider">
                Top Performers
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black leading-tight mb-4 md:mb-6 lg:mb-8">
              Our Best <span className="text-red-500">Painters</span>
            </h2>
            <p className="text-sm sm:text-base md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto text-center leading-relaxed">
              Meet our talented painters delivering exceptional craftsmanship across India.
            </p>
          </div>

          {/* Main Content */}
          <div className="w-full flex flex-col gap-10 md:gap-12 lg:gap-16">
            {/* Podium for Top 3 */}
            <div className="w-full grid grid-cols-3 gap-2 sm:gap-6 items-end mt-8 sm:mt-12 mb-8 max-w-5xl mx-auto px-1 sm:px-0">
              {paintersData.slice(0, 3).map((person) => (
                <PodiumCard key={person.id} person={person} metricsConfig={metricsConfig} />
              ))}
            </div>

            {/* Marquee for Ranks 4-10 */}
            <div
              ref={performanceCardRef}
              className="w-full mt-10"
            >
              <div className="mb-8 md:mb-10 text-center">
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black mb-2">
                  More <span className="text-red-500">Top Performers</span>
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  Ranking 4 to 10 across our network
                </p>
              </div>

              <div className="w-full py-10 relative">


                <div className="flex w-max animate-marquee pt-8 pb-4">
                  {/* First set of cards */}
                  {paintersData.slice(3, 10).map((person) => (
                    <PainterCard key={`first-${person.id}`} person={person} metricsConfig={metricsConfig} />
                  ))}
                  {/* Duplicate set for infinite scroll effect */}
                  {paintersData.slice(3, 10).map((person) => (
                    <PainterCard key={`second-${person.id}`} person={person} metricsConfig={metricsConfig} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThirdSection;