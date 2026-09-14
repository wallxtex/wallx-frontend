import { useState, useEffect } from "react";

/**
 * Hook to fetch dashboard statistics
 * Currently returns consistent mock data stored in sessionStorage
 * Data DOES NOT change on auto-refresh (simulates real backend where data only changes when actual events occur)
 * 
 * When backend endpoint is ready, replace with:
 * const response = await PrivateApi.get('/admin/dashboard/stats');
 * setData(response.data);
 */

// Helper to get or initialize mock data
const getConsistentMockData = () => {
  // Try to get existing mock data from sessionStorage
  const stored = sessionStorage.getItem('dashboardMockData');
  
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Generate new mock data only if it doesn't exist
  const newMockData = {
    totalPainters: Math.floor(Math.random() * 500) + 100,
    totalDealers: Math.floor(Math.random() * 200) + 50,
    totalCoupons: Math.floor(Math.random() * 1000) + 300,
    totalVisitEnquiries: Math.floor(Math.random() * 100) + 10,
  };
  
  // Store it so it persists across refreshes
  sessionStorage.setItem('dashboardMockData', JSON.stringify(newMockData));
  return newMockData;
};

const useDashboardStats = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchStats = async () => {
    try {
      setIsError(false);
      
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Get consistent mock data - SAME values every time (like a real API would return)
      const mockData = getConsistentMockData();

      setData(mockData);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = async () => {
    try {
      setIsError(false);
      
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Return THE SAME data (simulates real backend where data only changes when actual events occur)
      // In real implementation, backend would return updated data only if painters/dealers actually increased
      const mockData = getConsistentMockData();

      setData(mockData);
    } catch (error) {
      console.error("Error refetching dashboard stats:", error);
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return { data, isLoading, isError, refetch };
};

export default useDashboardStats;
