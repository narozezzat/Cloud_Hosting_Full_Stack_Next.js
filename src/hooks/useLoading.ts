import { useState } from "react";

const useLoading = () => {
  const [loading, setLoading] = useState(false);

  const withLoading = async (callback: () => Promise<void>) => {
    try {
      setLoading(true);
      await callback();
    } finally {
      setLoading(false);
    }
  };

  return { loading, setLoading, withLoading };
};

export default useLoading;
