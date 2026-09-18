import StatsGrid from '../../../components/stats/StatsGrid';
import TopDealersMarquee from '../../dealers/components/TopDealersMarquee';
import TopPaintersMarquee from '../../painters/components/TopPaintersMarquee';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
      </div>

      {/* Stats Overview Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Stats Overview</h2>
        <StatsGrid />
      </div>

      {/* Top Performers Section */}
      <div className="mb-8 space-y-6">
        <TopDealersMarquee />
        <TopPaintersMarquee />
      </div>



    </div>
  );
};

export default Dashboard;