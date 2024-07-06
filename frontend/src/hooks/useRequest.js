import { useState, useCallback } from 'react';
import useIsMounted from './isMounted';

export default function useRequest(makeRequest, initialValue) {
  const [result, setResult] = useState(initialValue);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(initialValue?.isLoading || false);
  const isMounted = useIsMounted();

  return {
    result,
    error,
    isLoading,
    request: useCallback(
      async (...args) => {
        setIsLoading(true);
        try {
          const response = await makeRequest(...args);
          if (isMounted.current) {
            setResult(response);
            setError(null);
          }
        } catch (err) {
          if (isMounted.current) {
            setError(err);
            setResult(initialValue);
          }
        } finally {
          if (isMounted.current) {
            setIsLoading(false);
          }
        }
      },
      [makeRequest],
    ),
    setValue: setResult,
  };
}
