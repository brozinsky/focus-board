import useSceneStore from "@/stores/zustand/scenes/scene.store";
import React, { useEffect, useRef } from "react";
import { fontFamilyExt } from "@/lib/constants/theme.constants";

const useRootRef = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const { isBgBlur, isBgShadow, blurValue, shadowValue } = useSceneStore();
  const { fontFamily } = useSceneStore();
  const rootFontFamily = [fontFamily, ...fontFamilyExt].join(", ");

  useEffect(() => {
    if (rootRef.current) {
      rootRef.current.style.setProperty("--bg-overlay-blur", `${blurValue}px`);
      rootRef.current.style.setProperty(
        "--bg-overlay-shadow-amount",
        `${shadowValue}`
      );
    }
  }, [blurValue, shadowValue, isBgBlur, isBgShadow]);
  return { rootRef, rootFontFamily };
};

export default useRootRef;
