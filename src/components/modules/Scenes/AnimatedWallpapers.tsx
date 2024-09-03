import { AdvancedImage, lazyload } from "@cloudinary/react";
import React from "react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import usePlayerStore from "@/stores/zustand/usePlayerStore";
import { Cloudinary } from "@cloudinary/url-gen/index";
import useBgVideosQuery from "@/stores/queries/useBgVideosQuery";
import clsx from "clsx";
import LoadingSpinner from "@/components/ui/loaders/LoadingSpinner";
import useWindowsStore from "@/stores/zustand/useWindowsStore";

const cld = new Cloudinary({
  cloud: { cloudName: import.meta.env.VITE_CLOUD_NAME },
});

const AnimatedWallpapers = () => {
  const bgVideosQuery = useBgVideosQuery();
  const { setIsOpen } = useWindowsStore();
  const { activeScene, setActiveScene, currentBgVideoId, setCurrentBgVideoId } =
    usePlayerStore();

  const handleBgVideoClick = (value: string) => {
    activeScene !== "bg-video" && setActiveScene("bg-video");
    setCurrentBgVideoId(value);
    setIsOpen("scene", false);
  };

  if (bgVideosQuery.isLoading) {
    return (
      <div className="mx-auto w-full flex-center mt-10">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <div
        className={
          "gap-8 grid xl:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 grid-cols-1"
        }
      >
        {bgVideosQuery.data &&
          bgVideosQuery.data.length >= 0 &&
          bgVideosQuery.data?.map((item: { public_id: string }) => {
            return (
              <div
                key={item.public_id}
                onClick={() => handleBgVideoClick(item.public_id)}
                className={clsx(
                  activeScene === "bg-video" &&
                    currentBgVideoId === item.public_id &&
                    "modal__image-wrap--active",
                  "modal__image-wrap"
                )}
              >
                <AdvancedImage
                  className="aspect-video object-cover modal__image"
                  width="305"
                  height="171"
                  plugins={[
                    lazyload({
                      rootMargin: "10px 20px 10px 30px",
                      threshold: 0.25,
                    }),
                  ]}
                  cldImg={cld
                    .video(item.public_id)
                    .resize(fill().width(305).height(171))
                    .format("auto")}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AnimatedWallpapers;
