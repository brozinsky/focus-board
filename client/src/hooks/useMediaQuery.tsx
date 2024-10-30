import React, { useEffect, useLayoutEffect, useState } from "react";

const getMatches = (query: string): boolean => {
  if (typeof window !== "undefined") {
    return window.matchMedia(query).matches;
  }
  return false;
};

export function useMediaQuery(query: string): boolean | undefined {
  const [hasMatch, setHasMatches] = useState<boolean>(getMatches(query));
  const [initialLoad, setInitialLoad] = useState(true);

  useLayoutEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
    }
  }, []);

  function handleChange() {
    setHasMatches(getMatches(query));
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(query);
    handleChange();
    matchMedia.addEventListener("change", handleChange);
    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, [query]);

  return initialLoad ? undefined : hasMatch;
}
