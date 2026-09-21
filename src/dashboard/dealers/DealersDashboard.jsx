import DealerStatsRow from "./components/DealerStatsRow";
import DealerSchemesRow from "./components/DealerSchemesRow";
import TopDealersRankingTable from "./components/TopDealersRankingTable";
const DealersDashboard = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 flex flex-col pb-12 sm:pb-16">
      {/* Page Heading - Bilingual, Compact */}
      <div className="mb-4 sm:mb-5">
        <h1 className="text-xl sm:text-2xl font-bold text-black">
          Dealer Dashboard
        </h1>
        <p className="text-sm text-gray-500 font-medium" style={{ fontFamily: "'Noto Sans Devanagari', system-ui, sans-serif" }}>
          डीलर डैशबोर्ड
        </p>
      </div>

      {/* Stats Row */}
      <DealerStatsRow />

      {/* Divider */}
      <div className="border-t border-gray-100 my-4 sm:my-6" />

      {/* Schemes Row */}
      <div className="flex-shrink-0">
        <DealerSchemesRow />
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 my-4 sm:my-6" />

      {/* Top 10 Dealers Ranking Table */}
      <TopDealersRankingTable />

    </div>
  );
};

export default DealersDashboard;