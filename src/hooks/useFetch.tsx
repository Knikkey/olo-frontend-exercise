import { useState, useEffect } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<any>();

  useEffect(() => {
    setIsPending(true);
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setIsPending(false);
        setError(null);
      } catch (err: any) {
        setIsPending(false);
        setError(err);
        console.log("error:", err);
      }
    };
    fetchData();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
