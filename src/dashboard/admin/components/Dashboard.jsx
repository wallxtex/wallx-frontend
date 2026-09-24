import KeyPerformanceMetrics from '../../../components/admin/KeyPerformanceMetrics';
import TopPerformersCharts from '../../../components/admin/TopPerformersCharts';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
      </div>

      {/* Key Performance Metrics Section */}
      <div className="mb-8">
        <KeyPerformanceMetrics/>
      </div>

      {/* Top Performers Section */}
      <div className="mb-8">
        <TopPerformersCharts />
      </div>
    </div>
  );
};

export default Dashboard;