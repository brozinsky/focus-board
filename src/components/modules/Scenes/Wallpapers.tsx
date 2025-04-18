import { AdvancedImage, lazyload } from "@cloudinary/react";
import React from "react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import usePlayerStore from "@/stores/zustand/player/player.store";
import { Cloudinary } from "@cloudinary/url-gen/index";
import clsx from "clsx";
import LoadingSpinner from "@/components/ui/loaders/LoadingSpinner";
import useWindowsStore from "@/stores/zustand/global/windows.store";
import { cn } from "@/lib/utils";
import BadgePremium from "@/components/ui/badge/BadgePremium";
import { useAuthStore } from "@/stores/zustand/auth/auth.store";
import useBgWallpapersQuery from "@/stores/queries/bg-wallpapers.query";

const cld = new Cloudinary({
  cloud: { cloudName: import.meta.env.VITE_CLOUD_NAME },
});

const Wallpapers = ({ grid = "md" }: { grid?: "sm" | "md" }) => {
  const bgWallpapersQuery = useBgWallpapersQuery();
  const { setIsOpen } = useWindowsStore();
  const { activeScene, setActiveScene, currentBgVideoId, setCurrentBgVideoId } =
    usePlayerStore();
  const { isLoggedIn } = useAuthStore();

  const isDisabled = false;

  const handleWallpaperClick = (value: string) => {
    activeScene !== "wallpaper" && setActiveScene("wallpaper");
    setCurrentBgVideoId(value);
    setIsOpen("scene", false);
  };

  if (bgWallpapersQuery.isLoading) {
    return (
      <div className="mx-auto w-full flex-center mt-10">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <div
        className={cn(
          grid === "sm" &&
            "gap-2 grid xl:grid-cols-4 2xl:grid-cols-6 md:grid-cols-3 grid-cols-1",
          grid === "md" &&
            "gap-8 grid lg:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 grid-cols-1"
        )}
      >
        {bgWallpapersQuery.data &&
          bgWallpapersQuery.data.length >= 0 &&
          bgWallpapersQuery.data?.map((item: { public_id: string }) => {
            return (
              <div
                key={item.public_id}
                onClick={() =>
                  !isDisabled && handleWallpaperClick(item.public_id)
                }
                className={clsx(
                  activeScene === "wallpaper" &&
                    currentBgVideoId === item.public_id &&
                    "modal__image-wrap--active",
                  "modal__image-wrap"
                )}
              >
                {isDisabled && (
                  <BadgePremium
                    size="sm"
                    className="absolute top-1 right-1 z-20"
                  />
                )}
                <AdvancedImage
                  className={cn(
                    "aspect-video object-cover modal__image",
                    !isDisabled && "modal__image--available"
                  )}
                  width="305"
                  height="171"
                  plugins={[
                    lazyload({
                      rootMargin: "10px 20px 10px 30px",
                      threshold: 0.25,
                    }),
                  ]}
                  cldImg={cld
                    .image(item.public_id)
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

export default Wallpapers;
