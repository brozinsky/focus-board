import React from "react";
import useSceneStore from "@/stores/zustand/scenes/scene.store";
import clsx from "clsx";
import { motion } from "framer-motion";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen/index";

const cld = new Cloudinary({
  cloud: { cloudName: import.meta.env.VITE_CLOUD_NAME },
});

const BgWallpaper = ({ id, mini }: { id: string; mini?: boolean }) => {
  const { isBgBlur, isBgShadow } = useSceneStore();

  return (
    <motion.div
      id="BgWallpaper"
      key={id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={clsx(
        "bg-video bg-overlay relative",
        isBgBlur && "bg-overlay--blur",
        isBgShadow && "bg-overlay--shadow",
        mini && "bg-video--mini"
      )}
    >
      <AdvancedImage
        className="aspect-video object-cover"
        cldImg={cld.image(id).format("auto")}
      />
    </motion.div>
  );
};

export default BgWallpaper;
