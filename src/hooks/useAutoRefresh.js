import { useState, useEffect, useRef } from "react";

// Auto-refresh interval constant (30 seconds)
const AUTO_REFRESH_INTERVAL_MS = 30000;

/**
 * Hook to manage auto-refresh with progress indication
 *
 * @param {Function} refetch - Function to call when refresh is triggered
 * @param {number} intervalMs - Refresh interval in milliseconds (default: 30000)
 * @returns {{ progress: number }} - Progress percentage (0-100)
 */
const useAutoRefresh = (refetch, intervalMs = AUTO_REFRESH_INTERVAL_MS) => {
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef(null);
  const animationFrameRef = useRef(null);
  const refreshTimeoutRef = useRef(null);
  const refetchRef = useRef(refetch);

  // Keep refetch reference up to date without restarting the effect
  useEffect(() => {
    refetchRef.current = refetch;
  }, [refetch]);

  useEffect(() => {
    // Start the progress animation
    const startProgress = () => {
      startTimeRef.current = Date.now();
      
      const updateProgress = () => {
        const elapsed = Date.now() - startTimeRef.current;
        const newProgress = Math.min((elapsed / intervalMs) * 100, 100);

        setProgress(newProgress);

        if (newProgress < 100) {
          animationFrameRef.current = requestAnimationFrame(updateProgress);
        }
      };

      animationFrameRef.current = requestAnimationFrame(updateProgress);
    };

    // Schedule the refresh
    const scheduleRefresh = () => {
      startProgress();

      refreshTimeoutRef.current = setTimeout(() => {
        // Use the ref to get the latest refetch function
        if (refetchRef.current && typeof refetchRef.current === "function") {
          refetchRef.current();
        }
        setProgress(0);
        scheduleRefresh(); // Schedule next refresh
      }, intervalMs);
    };

    // Start the first cycle
    scheduleRefresh();

    // Cleanup function
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, [intervalMs]); // Only restart if interval changes, not refetch

  return { progress };
};

export default useAutoRefresh;
