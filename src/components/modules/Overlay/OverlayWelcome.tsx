import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LogoSVG from "@/components/elements/svg/icons/LogoSVG";
import { goFullscreen } from "@/utils/common.utils";

const OverlayWelcome = ({ isLoading }: { isLoading: boolean }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const handleFadeOut = () => {
    !isLoading && setIsFadingOut(true);
    if (window.innerWidth < 768) {
      goFullscreen();
    }
  };

  const handleAnimationComplete = () => {
    setIsHidden(true);
  };

  if (isHidden) return null;

  return (
    <motion.div
      className="bg-overlay-welcome"
      initial={{ opacity: 1 }}
      animate={{ opacity: isFadingOut ? 0 : 1 }}
      transition={{ duration: 0.7 }}
      onClick={handleFadeOut}
      onAnimationComplete={isFadingOut ? handleAnimationComplete : undefined}
    >
      <div className="flex-center h-full w-full flex-col">
        <LogoSVG />
        {isLoading ? (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isFadingOut ? 0 : 1 }}
            transition={{ duration: 4 }}
            className="buffer buffer--lg select-none"
          >
            Loading...
          </motion.div>
        ) : (
          <motion.div
            className="text-md sm:text-2xl text-white select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            Click anywhere to start
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default OverlayWelcome;
