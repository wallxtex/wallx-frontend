import StatsGrid from '../../../components/stats/StatsGrid';
import ActiveAdminAlerts from '../../../components/admin/ActiveAdminAlerts';
import KeyPerformanceMetrics from '../../../components/admin/KeyPerformanceMetrics';

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
      
      {/* Active Admin Alerts Section */}
      <div className="mb-8">
        <ActiveAdminAlerts />
      </div>
      
      {/* Key Performance Metrics Section */}
      <div>
        <KeyPerformanceMetrics />
      </div>
    </div>
  );
};

export default Dashboard;