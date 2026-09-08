import { useEffect } from 'react';
import { 
  IoDiamondOutline, 
  IoBusinessOutline, 
  IoFlashOutline, 
  IoCallOutline, 
  IoCartOutline,
  IoTrophy
} from 'react-icons/io5';
import SharedSchemes from '../../common/components/Shared/SharedSchemes';
import SharedLeaderboard from '../../common/components/Shared/SharedLeaderboard';
import SharedCTA from '../../common/components/Shared/SharedCTA';
import FooterSection from '../../components/landing-pages/FooterSection';
import { DEALER_SCHEMES, TOP_DEALERS_DATA } from './dealerData';

const DealersPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const schemesHeaderProps = {
    badgeIcon: <IoDiamondOutline className="text-base animate-pulse" />,
    badgeText: "Exclusive Dealer Partner Benefits",
    title: "High-Margin Schemes & Offers",
    description: "Grow your business with WallX. Leverage our premium volume discounts, milestone rewards, and dedicated dealer support."
  };

  const schemesContactProps = {
    icon: <IoBusinessOutline />,
    title: "Interested in becoming a mega distributor?",
    description: "Contact our enterprise team to discuss state-level distributorships and special credit terms.",
    linkText: "Connect with Us",
    linkUrl: "/dealer-signup"
  };
  const leaderboardHeaderProps = {
    badgeIcon: <IoTrophy className="text-amber-500 text-base" />,
    badgeText: "National Dealer Volume Leaderboard",
    badgeClass: "bg-amber-50 border-amber-200 text-amber-800",
    title: "Top WallX Performing Dealers",
    description: "Celebrate our top-performing retail and wholesale partners driving massive volume across India."
  };

  const leaderboardMetrics = {
    primaryLabel: "Total Bonus Earned",
    primaryKey: "totalBonusEarned",
    formatPrimary: (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val),
    secondaryLabel: "Buckets Ordered",
    secondaryKey: "bucketsOrdered",
    formatSecondary: (val) => `${val.toLocaleString()} Units`
  };

  const leaderboardColumns = [
    { label: "Dealer Name", align: "left" },
    { label: "Location", align: "center" },
    { label: "Buckets Ordered", align: "center" },
    { label: "Total Bonus Earned", align: "center" }
  ];

  const renderTableRow = (dealer) => (
    <>
      <td className="py-4 px-4 text-left font-bold text-gray-900">
        {dealer.name}
      </td>
      <td className="py-4 px-4 text-gray-600 text-center">
        <span>{dealer.city}, {dealer.state}</span>
      </td>
      <td className="py-4 px-4 text-center">
        <div className="inline-flex items-center justify-center gap-1.5 font-semibold text-gray-700">
          <IoCartOutline className="text-gray-400" />
          <span>{dealer.bucketsOrdered.toLocaleString()}</span>
        </div>
      </td>
      <td className="py-4 px-4 sm:px-6 text-center font-extrabold text-base text-[#d82b2b]">
        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(dealer.totalBonusEarned)}
      </td>
    </>
  );

  return (
    <main className="min-h-screen bg-[#fafafa]">
      <SharedSchemes
        id="dealer-schemes"
        headerProps={schemesHeaderProps}
        categories={[]}
        schemes={DEALER_SCHEMES}
        contactBannerProps={schemesContactProps}
        modalTermsHeader="Dealer Scheme Terms:"
        modalCtaText="Register as Dealer"
        modalCtaLink="/dealer-signup"
      />
      
      <SharedLeaderboard
        id="top-dealers"
        headerProps={leaderboardHeaderProps}
        data={TOP_DEALERS_DATA}
        metricsConfig={leaderboardMetrics}
        tableColumns={leaderboardColumns}
        renderTableRow={renderTableRow}
        searchPlaceholder="Search dealer by name or city..."
        bottomCtaProps={{
          title: "Want to scale your business with WallX?",
          description: "Register as an authorized dealer and enjoy premium margins and volume bonuses.",
          linkText: "Join Network",
          linkUrl: "/dealer-signup"
        }}
      />

      <SharedCTA
        icon={<IoBusinessOutline />}
        title="Ready to Partner with WallX?"
        description="Join India's fastest-growing premium texture coating network. Enjoy exclusive dealer margins, credit terms, and dedicated marketing support."
        primaryBtnText="Register as Dealer"
        primaryBtnIcon={<IoFlashOutline />}
        primaryBtnLink="/dealer-signup"
        secondaryBtnText="Dealer Support: 1800-WALLX-B2B"
        secondaryBtnIcon={<IoCallOutline className="text-emerald-400" />}
        secondaryBtnLink="tel:18001239255"
        footerNote="* Minimum initial order volume requirements apply for new authorized dealerships."
      />

    </main>
  );
};

export default DealersPage;
