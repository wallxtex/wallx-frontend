import { useState, useEffect } from "react";
import SharedSchemesRow from "../../../components/shared/SharedSchemesRow";
import { getDealerDashboardData } from "../../../services/dealers/dealers.services";
import { Loader2 } from "lucide-react";

// Static mock scheme based strictly on the exact backend fields
const STATIC_BACKEND_SCHEME = [
  {
    _id: "static_mock_scheme_1",
    title: "Diwali Bonanza Rewards",
    description: "Achieve the target of 5000 orders this month and get an exclusive bonus payout directly to your account. Valid for all registered dealers.",
    targetAudience: "DEALER",
    validUntil: "2026-11-15T23:59:59.000Z",
    isActive: true,
    createdBy: "admin_user_mock",
    createdAt: "2026-09-22T10:00:00.000Z",
    updatedAt: "2026-09-22T10:00:00.000Z",
    __v: 0
  }
];

const DealerSchemesRow = () => {
  const [schemes, setSchemes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await getDealerDashboardData();
        if (response && response.data && response.data.activeSchemes && response.data.activeSchemes.length > 0) {
          // Pass the exact backend fields directly without modifying them
          setSchemes(response.data.activeSchemes);
        } else {
          // Fallback to our static mock scheme matching backend schema if none exist
          setSchemes(STATIC_BACKEND_SCHEME);
        }
      } catch (error) {
        console.error("Error fetching active schemes:", error);
        // Fallback to static scheme on error
        setSchemes(STATIC_BACKEND_SCHEME);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchemes();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-40 flex items-center justify-center bg-white border border-gray-100 rounded-2xl">
        <Loader2 className="w-8 h-8 animate-spin text-[#d82b2b]" />
      </div>
    );
  }

  if (schemes.length === 0) {
    return (
      <div className="w-full bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-black">Active Dealer Schemes</h2>
          <p className="text-sm text-gray-500" style={{ fontFamily: "'Noto Sans Devanagari', system-ui, sans-serif" }}>
            सक्रिय डीलर योजनाएं
          </p>
        </div>
        <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          No active schemes available right now.
        </div>
      </div>
    );
  }

  return (
    <SharedSchemesRow
      title="Active Dealer Schemes"
      subtitle="सक्रिय डीलर योजनाएं"
      schemes={schemes}
      type="DEALER"
    />
  );
};

export default DealerSchemesRow;
