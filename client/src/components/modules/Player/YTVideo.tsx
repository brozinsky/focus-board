import useSceneStore from "@/stores/zustand/useSceneStore";
import clsx from "clsx";
import YouTube, { YouTubeEvent } from "react-youtube";
import { motion } from "framer-motion";

type TProps = {
  id: string;
  onReady: (event: YouTubeEvent<any>) => void;
};

const YTVideo = ({ onReady, id }: TProps) => {
  const { isBgBlur, isBgShadow } = useSceneStore();

  return (
    <motion.div
      id="YTVideo"
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
