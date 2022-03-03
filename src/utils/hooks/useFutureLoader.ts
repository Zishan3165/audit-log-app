import { DependencyList, useEffect, useState } from 'react';

export function useFutureLoader(future: () => Promise<any>, deps: DependencyList) {
  const [value, setValue] = useState(null);
  const [error, setError] = useState<null>(null);
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
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    callApi();
  }, deps || [future]);
  return [value, loading, error];
}
