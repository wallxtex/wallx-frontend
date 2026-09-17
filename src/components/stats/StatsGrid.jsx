import StatCard from "./StatCard";
import { statsConfig } from "./statsConfig";
import useDashboardStats from "../../hooks/useDashboardStats";
import useAutoRefresh from "../../hooks/useAutoRefresh";

const StatsGrid = () => {
  const { data, isLoading, isError, refetch } = useDashboardStats();
  const { progress } = useAutoRefresh(refetch);
  return (
    <div className="w-full">
      {/* Error banner */}
      {/* {isError && showError && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-3">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-100">
            <AlertCircle className="w-4 h-4 text-red-600" />
          </div>
        
          <button
            onClick={refetch}
            className="px-3 py-1 bg-white hover:bg-red-50 text-red-700 text-sm font-medium rounded border border-red-200 transition-colors duration-200 flex items-center gap-1"
          >
            Retry
          </button>
          <button
            onClick={() => setShowError(false)}
            className="text-red-600 hover:text-red-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )} */}

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {statsConfig.map((stat) => {
          const value = data?.[stat.key];
          return (
            <StatCard
              key={stat.key}
              label={stat.label}
              value={value}
              icon={stat.icon}
              accentColor={stat.accentColor}
              isLoading={isLoading}
              refreshProgress={isError ? 0 : progress}
            />
          );
        })}
      </div>
    </div>
  );
};

export default StatsGrid;
