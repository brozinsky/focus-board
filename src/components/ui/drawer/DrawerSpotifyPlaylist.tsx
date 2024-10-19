import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./Drawer";
import PlaylistSpotify from "@/components/modules/Playlist/PlaylistSpotify";
import ButtonIcon from "../buttons/ButtonIcon";
import MusicNoteSVG from "@/components/elements/svg/icons/media/MusicNoteSVG";
import usePlayerStore from "@/stores/zustand/usePlayerStore";
import { cn } from "@/lib/utils";
import PlaylistItems from "@/components/modules/Playlist/PlaylistItems";
import SpotifySVG from "@/components/elements/svg/icons/social-media/SpotifySVG";
import YouTubeSVG from "@/components/elements/svg/icons/social-media/YouTubeSVG";

const DrawerSpotifyPlaylist = () => {
  const { audioSource, setAudioSource } = usePlayerStore();

  return (
    <Drawer direction="right">
      <DrawerTrigger>
        <ButtonIcon
          onClick={() => null}
          icon={<MusicNoteSVG />}
          tooltip={"Playlist"}
        />
      </DrawerTrigger>
      <DrawerContent className="min-w-[370px] my-2">
        <DrawerHeader className="max-h-full flex flex-col gap-4">
          <DrawerTitle>Audio playlists</DrawerTitle>
          <div className="grid grid-cols-2 gap-2 mx-auto w-full">
            <button
              onClick={() => setAudioSource("youtube")}
              className={cn(
                "gap-2 w-full p-3 h-auto bg-background-glass text-foreground-primary rounded-lg flex-center",
                audioSource === "youtube" && "bg-primary"
              )}
            >
              <YouTubeSVG /> Youtube
            </button>
            <button
              onClick={() => setAudioSource("spotify")}
              className={cn(
                "gap-2 w-full p-3 h-auto bg-background-glass text-foreground-primary rounded-lg flex-center",
                audioSource === "spotify" && "bg-primary"
              )}
            >
              <SpotifySVG /> Spotify
            </button>
          </div>
          <div className="overflow-auto max-h-full">
            {audioSource === "spotify" && <PlaylistSpotify />}
            {audioSource === "youtube" && <PlaylistItems />}
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerSpotifyPlaylist;
