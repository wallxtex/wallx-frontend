import { 
  IoShieldCheckmarkOutline, 
  IoConstructOutline, 
  IoSchoolOutline, 
  IoGiftOutline, 
  IoPeopleOutline, 
  IoPhonePortraitOutline 
} from 'react-icons/io5';
import SectionHeader from './SectionHeader';

const PainterPerks = () => {
  const perks = [
    {
      icon: <IoShieldCheckmarkOutline className="text-2xl text-[#d82b2b]" />,
      title: "Painter Accidental & Health Cover",
      desc: "Free insurance coverage up to ₹5,00,000 for you and your family upon reaching silver tier status.",
    },
    {
      icon: <IoConstructOutline className="text-2xl text-amber-600" />,
      title: "German Trowels & Toolkits",
      desc: "Get complimentary Italian stucco blades, spray machines, and safety kits every festive season.",
    },
    {
      icon: <IoSchoolOutline className="text-2xl text-blue-600" />,
      title: "Master Painter Certification",
      desc: "Hands-on workshops in Venetian plaster, microcement, and travertine finishes certified by WallX.",
    },
    {
      icon: <IoGiftOutline className="text-2xl text-emerald-600" />,
      title: "Annual Mega Lucky Draws",
      desc: "Win motorcycles, LED Smart TVs, smartphones, and gold coins during Diwali and New Year galas.",
    },
    {
      icon: <IoPeopleOutline className="text-2xl text-purple-600" />,
      title: "Direct Customer Lead Dispatch",
      desc: "Get premium interior texture leads in your city directly through the WallX Painter Mitra network.",
    },
    {
      icon: <IoPhonePortraitOutline className="text-2xl text-red-600" />,
      title: "Dedicated WhatsApp Mitra Bot",
      desc: "Instant passbook check, QR scan support, and quick claim settlement in your regional language.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badgeText="Exclusive Membership Benefits"
          title="Why Join the WallX Painter Mitra Family?"
          description="More than just cashbacks — we empower professional painters and texture contractors with security, training, and prestige."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {perks.map((perk) => (
            <div
              key={perk.title}
              className="p-6 rounded-2xl bg-gray-50/70 border border-gray-200/80 hover:border-red-200 hover:bg-white hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                {perk.icon}
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900 group-hover:text-[#d82b2b] transition-colors">
                {perk.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {perk.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PainterPerks;
