import { useState, useCallback, useRef, useEffect } from "react";

export function useAsyncAction(asyncFn) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  
  const run = useCallback(
    async (...args) => {
      // Prevent double-submission
      if (loading) {
        return;
      }
      if (!isMountedRef.current) {
        return;
      }
      setLoading(true);
      setError(null);

      try {
        const result = await asyncFn(...args);
        
        // Only update state if still mounted
        if (isMountedRef.current) {
          setLoading(false);
        }
        
        return result;
      } catch (err) {
        // Only update state if still mounted
        if (isMountedRef.current) {
          setError(err);
          setLoading(false);
        }
        
        // Re-throw to preserve existing error handling
        throw err;
      }
    },
    [asyncFn, loading]
  );

  return { run, loading, error };
}

export default useAsyncAction;
