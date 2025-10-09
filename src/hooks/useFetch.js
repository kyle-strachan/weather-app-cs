import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      setLoading(false);
      setError(null);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        // await new Promise((r) => setTimeout(r, 1000));
        const res = await fetch(url);
        if (!res.ok)
          throw new Error(
            "Unable to connect to weather service; please try again later."
          );
        const json = await res.json();
        setData(json);
        setError(null);
      } catch (err) {
        console.log(err);
        setError(
          "Unable to connect to weather service; please try again later." // Overwrites API 'failed to fetch error'
        );
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
