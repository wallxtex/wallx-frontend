import StatsRow from "./components/StatsRow";
import SchemesRow from "./components/SchemesRow";
import ScannerPlaceholder from "./components/ScannerPlaceholder";
import PainterRankingTable from "./components/PainterRankingTable";
import { useLocation } from "react-router-dom";

const PainterDashboard = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-black">
          Painter Dashboard
        </h1>
        <p className="text-sm text-gray-500 font-medium" style={{ fontFamily: "'Noto Sans Devanagari', system-ui, sans-serif" }}>
          पेंटर डैशबोर्ड
        </p>
      </div>

      {/* Stats Row */}
      <StatsRow />

      {isAdmin && (
        <>
          <div className="border-t border-gray-100 my-4 sm:my-6" />

          {/* Painter Rankings Table */}
          <PainterRankingTable />
        </>
      )}

      {!isAdmin && (
        <>
          <div className="border-t border-gray-100 my-4 sm:my-6" />

          {/* Schemes Row */}
          <SchemesRow hideCreateButton={true} />

          <div className="border-t border-gray-100 my-4 sm:my-6" />

          {/* Scanner Placeholder */}
          <div className="fixed sm:relative bottom-0 left-0 w-full h-14 sm:h-auto bg-white sm:bg-transparent border-t border-gray-200 sm:border-none shadow-[0_-4px_20px_rgba(0,0,0,0.1)] sm:shadow-none z-[100] sm:z-auto px-4 sm:py-6 flex justify-center items-start sm:block">
            <ScannerPlaceholder />
          </div>

          <div className="h-24 sm:hidden" />
        </>
      )}
    </div>
  );
};

export default PainterDashboard;
