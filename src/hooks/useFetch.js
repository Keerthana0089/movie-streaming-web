import { useEffect, useState } from "react";

const useFetch = (fetchFn, ...args) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchFn(...args);
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fetchFn, ...args]);

  return { data, loading, error };
};

export default useFetch;
