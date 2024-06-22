import useSceneStore from "@/stores/zustand/useSceneStore";
import clsx from "clsx";
import React from "react";
import YouTube from "react-youtube";
import { motion } from "framer-motion";

const YTVideo = ({ onReady, id }) => {
  const { isBgBlur, isBgShadow } = useSceneStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={clsx(
        "bg-video bg-overlay relative",
        isBgBlur && "bg-overlay--blur",
        isBgShadow && "bg-overlay--shadow"
      )}
    >
      <YouTube
        videoId={id}
        onReady={onReady}
        className={clsx(
            "bg-video bg-overlay relative",
            isBgBlur && "bg-overlay--blur",
            isBgShadow && "bg-overlay--shadow"
          )}
        opts={{
          playerVars: {
            enablejsapi: 1,
            autoplay: 1,
            loop: 1,
            mute: 1,
          },
        }}
      />
    </motion.div>
  );
};

export default YTVideo;
