import { DependencyList, useEffect, useState } from 'react';

export function useFutureLoader<T>(
  future: () => Promise<any>,
  deps: DependencyList
): [T | null, boolean, Error | null] {
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState<null | Error>(null);
  const [loading, setLoading] = useState(true);

  const callApi = async () => {
    try {
      setLoading(true);
      const resp = await future();
      if (resp.responseCode != 200) {
        throw new Error('Failed');
      }
      setValue(resp.data);
    } catch (e) {
      if (e instanceof Error) {
        setError(e);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    callApi();
  }, deps || [future]);
  return [value, loading, error];
}
