import { useEffect, useState } from "react";

const useFXInitialization = (initializeAudio: () => void) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const onLoad = () => {
      setIsReady(true);
    };

    if (document.readyState === "complete") {
      setIsReady(true);
    } else {
      window.addEventListener("load", onLoad);
    }

    return () => {
      window.removeEventListener("load", onLoad);
    };
  }, []);

  useEffect(() => {
    if (isReady) {
      initializeAudio();
    }
  }, [isReady, initializeAudio]);
};

export default useFXInitialization;
