import StatsRow from "./components/StatsRow";
import SchemesRow from "./components/SchemesRow";
import TopPaintersMarquee from "./components/TopPaintersMarquee";
import ScannerPlaceholder from "./components/ScannerPlaceholder";

const PainterDashboard = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Page Heading - Bilingual, Compact */}
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

      {/* Divider */}
      <div className="border-t border-gray-100 my-4 sm:my-6" />

      {/* Schemes Row */}
      <SchemesRow />

      {/* Divider */}
      <div className="border-t border-gray-100 my-4 sm:my-6" />

      {/* Top Painters Marquee */}
      <TopPaintersMarquee />

      {/* Divider */}
      <div className="border-t border-gray-100 my-4 sm:my-6" />

      {/* Scanner Placeholder */}
      <div className="py-6">
        <ScannerPlaceholder />
      </div>
    </div>
  );
};

export default PainterDashboard;
