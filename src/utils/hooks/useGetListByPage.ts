import { useEffect, useState } from 'react';

export function useGetListByPage(future: (...args: any) => Promise<any>, pageNumber: number) {
  const [value, setValue] = useState<any>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const getFunc = async () => {
    try {
      if (loading) return;
      setLoading(true);
      const query = { pageNumber };
      const resp = await future(query);
      if (resp?.responseCode == 200) {
        setValue((value: any) => [...value, ...resp.data]);
        setHasFinished(resp.data.length === 0);
      } else {
        throw new Error('Did not get 200 response');
      }
      setLoading(false);
    } catch (e) {
      setError(e);
      setHasFinished(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    getFunc();
  }, [pageNumber]);

  return [value, loading, hasFinished, error];
}
