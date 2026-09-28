import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  IoDiamondOutline,
  IoBusinessOutline,
  IoFlashOutline,
  IoCallOutline,
  IoCartOutline,
  IoTrophy
} from 'react-icons/io5';
import SharedSchemesRow from '../../components/shared/SharedSchemesRow';
import SharedSection from '../../common/components/Shared/SharedSection';
import SectionHeader from '../../common/components/Shared/SectionHeader';
import SharedLeaderboard from '../../common/components/Shared/SharedLeaderboard';
import SharedCTA from '../../common/components/Shared/SharedCTA';
import { getPublicData } from '../../services/dealers/dealers.services';

const DealersPage = () => {

  const [schemes, setSchemes] = useState([])
  const [topDealers, setTopDealers] = useState([])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchDealerData = async () => {
      try {
        const response = await getPublicData()
        if (response?.success) {
          const activeSchemes = response?.data.activeSchemes || []
          const filteredSchemes = activeSchemes.filter(s => s.targetAudience === 'DEALER' || s.targetAudience === 'BOTH');
          setSchemes(filteredSchemes)
          
          const dealersList = response?.data.topDealers || []
          setTopDealers(dealersList)
        }
      }
      catch (error) {
        console.log("Something went wrong : ", error)
      }
    }
    fetchDealerData()
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
    primaryLabel: "Total Ordered Amount",
    primaryKey: "totalOrderVolume",
    formatPrimary: (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val || 0),
    secondaryLabel: "Total Orders",
    secondaryKey: "totalOrders",
    formatSecondary: (val) => `${(val || 0).toLocaleString()} Orders`
  };

  const leaderboardColumns = [
    { label: "Dealer Name", align: "left" },
    { label: "Location", align: "center" },
    { label: "Total Orders", align: "center" },
    { label: "Total Ordered Amount", align: "center" }
  ];

  const renderTableRow = (dealer) => (
    <>
      <td className="py-4 px-4 text-left font-bold text-gray-900">
        {dealer.name || dealer.dealerName || dealer.shopName || `${dealer.firstName || ''} ${dealer.lastName || ''}`.trim() || 'Dealer'}
      </td>
      <td className="py-4 px-4 text-gray-600 text-center">
        <span>{dealer.city || dealer.location?.area || dealer.address?.city || 'N/A'}, {dealer.state || dealer.location?.state || dealer.address?.state || 'N/A'}</span>
      </td>
      <td className="py-4 px-4 text-center">
        <div className="inline-flex items-center justify-center gap-1.5 font-semibold text-gray-700">
          <IoCartOutline className="text-gray-400" />
          <span>{Number(dealer.bucketsOrdered || dealer.totalOrders || 0).toLocaleString()}</span>
        </div>
      </td>
      <td className="py-4 px-4 sm:px-6 text-center font-extrabold text-base text-[#d82b2b]">
        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(dealer.totalBonusEarned || dealer.totalOrderVolume || dealer.totalRewards || 0)}
      </td>
    </>
  );

  return (
    <main className="min-h-screen bg-[#fafafa]">
      <SharedSection id="dealer-schemes" className="bg-[#fafafa]">
        <SectionHeader {...schemesHeaderProps} />

        <div className="mt-10">
          <SharedSchemesRow
            title=""
            subtitle=""
            schemes={schemes}
            type="DEALER"
            isAdmin={false}
          />
        </div>

        {schemesContactProps && (
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-xl bg-[#d82b2b] flex items-center justify-center text-white text-2xl shrink-0 shadow-md">
                {schemesContactProps.icon}
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">{schemesContactProps.title}</h4>
                <p className="text-sm text-gray-300">
                  {schemesContactProps.description}
                </p>
              </div>
            </div>
            <Link
              to={schemesContactProps.linkUrl}
              className="whitespace-nowrap px-6 py-2.5 rounded-xl bg-[#d82b2b] hover:bg-[#b82222] text-white text-sm font-semibold transition-all shrink-0"
            >
              {schemesContactProps.linkText}
            </Link>
          </div>
        )}
      </SharedSection>

      <SharedLeaderboard
        id="top-dealers"
        headerProps={leaderboardHeaderProps}
        data={topDealers}
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
