import { IoFlameOutline, IoSparklesOutline } from 'react-icons/io5';
import { PAINTER_SCHEMES } from './painterData';
import SharedSchemes from '../../../common/components/Shared/SharedSchemes';

const PainterSchemes = () => {
  const categories = [
    { id: 'all', label: 'All Offers & Schemes' },
    { id: 'cashback', label: 'Cashback Dhamaka' },
    { id: 'milestone', label: 'Milestone Rewards' },
    { id: 'referral', label: 'Referral Rewards' },
  ];

  const headerProps = {
    badgeIcon: <IoFlameOutline className="text-base animate-pulse" />,
    badgeText: "High-Earning Painter Opportunities",
    title: "Active Schemes & Cash Offers for Painters",
    description: "Maximize your income with WallX bonus pools, instant QR cashback boosters, and milestone rewards on luxury texture buckets and bags."
  };

  const contactBannerProps = {
    icon: <IoSparklesOutline />,
    title: "Have a special bulk commercial project?",
    description: "Contact your regional WallX technical officer for custom contractor pricing and volume multiplier slabs.",
    linkText: "Claim Painter Offers Now",
    linkUrl: "/painter-signup"
  };

  return (
    <SharedSchemes
      id="painter-schemes"
      className="bg-[#fafafa]"
      headerProps={headerProps}
      categories={categories}
      schemes={PAINTER_SCHEMES}
      contactBannerProps={contactBannerProps}
      modalTermsHeader="Offer Terms & Eligibility:"
      modalCtaText="Register & Start Earning"
      modalCtaLink="/painter-signup"
    />
  );
};

export default PainterSchemes;
