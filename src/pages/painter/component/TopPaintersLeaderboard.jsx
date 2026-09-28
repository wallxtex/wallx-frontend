import { IoTrophy, IoQrCodeOutline } from 'react-icons/io5';

import SharedLeaderboard from '../../../common/components/Shared/SharedLeaderboard';

const formatINR = (val) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);
};

const TopPaintersLeaderboard = () => {
  const headerProps = {
    badgeIcon: <IoTrophy className="text-amber-500 text-base" />,
    badgeText: "National QR Cash Leaderboard • Flat ₹90 / Bucket or Bag",
    badgeClass: "bg-amber-50 border-amber-200 text-amber-800",
    title: "Top 10 Painters & QR Cash Redeem Earners",
    description: "Meet our highest-earning texture coating champions who have earned massive cashbacks by redeeming genuine WallX QR coupons at flat ₹90 per bucket or bag."
  };

  const metricsConfig = {
    primaryLabel: "Total QR Cash Redeemed (@ ₹90/unit)",
    primaryKey: "totalRedeemedAmount",
    formatPrimary: formatINR,
    secondaryLabel: "Scanned",
    secondaryKey: "bucketsScanned",
    formatSecondary: (val) => `${val.toLocaleString()} Bags / Buckets`
  };

  const tableColumns = [
    { label: "Painter Name", align: "left" },
    { label: "Location", align: "center" },
    { label: "Buckets / Bags Scanned", align: "center" },
    { label: "QR Cash Redeemed (@ ₹90)", align: "center" }
  ];

  const renderTableRow = (painter) => (
    <>
      <td className="py-4 px-4 text-left font-bold text-gray-900">
        {painter.name}
      </td>
      <td className="py-4 px-4 text-gray-600 text-center">
        <span>{painter.city}, {painter.state}</span>
      </td>
      <td className="py-4 px-4 text-center">
        <div className="inline-flex items-center justify-center gap-1.5 font-semibold text-gray-700">
          <IoQrCodeOutline className="text-gray-400" />
          <span>{painter.bucketsScanned.toLocaleString()}</span>
        </div>
      </td>
      <td className="py-4 px-4 sm:px-6 text-center font-extrabold text-base text-[#d82b2b]">
        {formatINR(painter.totalRedeemedAmount)}
      </td>
    </>
  );

  const bottomCtaProps = {
    title: "Want your name on the WallX Star Painter Podium?",
    description: "Register with your mobile number, start scanning QR codes on WallX buckets & bags, and withdraw cash directly!",
    linkText: "Join Leaderboard",
    linkUrl: "/painter-signup"
  };

  return (
    <SharedLeaderboard
      id="top-painters"
      headerProps={headerProps}
      data={[]}
      metricsConfig={metricsConfig}
      tableColumns={tableColumns}
      renderTableRow={renderTableRow}
      searchPlaceholder="Search painter by name or city..."
      bottomCtaProps={bottomCtaProps}
    />
  );
};

export default TopPaintersLeaderboard;
