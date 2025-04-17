import React from "react";
import useSceneStore from "@/stores/zustand/scenes/scene.store";
import clsx from "clsx";
import { motion } from "framer-motion";

const BgVideo = ({ id }: { id: string }) => {
  const { isBgBlur, isBgShadow } = useSceneStore();

  return (
    <motion.div
      key={id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={clsx(
        "bg-video bg-overlay relative",
        isBgBlur && "bg-overlay--blur",
        isBgShadow && "bg-overlay--shadow"
      )}
    >
      <video
        key={id}
        className="min-h-screen min-w-screen"
        loop={true}
        autoPlay
        muted={true}
      >
        <source
          src={`https://res.cloudinary.com/${
            import.meta.env.VITE_CLOUD_NAME
          }/video/upload/${id}.webm?_a=DATAdtAAZAA0`}
          type="video/webm"
        />
      </video>
    </motion.div>
  );
};

export default BgVideo;
