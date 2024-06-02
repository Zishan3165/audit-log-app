import { useEffect, useState } from 'react';

export function useGetListByPage<T>(
  future: (...args: any) => Promise<any>,
  pageNumber: number
): [T[], boolean, boolean, Error | null] {
  const [value, setValue] = useState<T[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const getFunc = async () => {
    try {
      if (loading) return;
      setLoading(true);
      const query = { pageNumber };
      const resp = await future(query);
      if (resp?.responseCode == 200) {
        setValue((prevValues: T[]) => [...prevValues, ...(resp.data as T[])]);
        setHasFinished(resp.data.length === 0);
      } else {
        throw new Error('Did not get 200 response');
      }
      setLoading(false);
    } catch (e) {
      if (e instanceof Error) {
        setError(e);
      }
      setHasFinished(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    getFunc();
  }, [pageNumber]);

  return [value, loading, hasFinished, error];
}
