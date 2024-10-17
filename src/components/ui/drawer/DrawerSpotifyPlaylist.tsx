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

const DrawerSpotifyPlaylist = () => {
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
        <DrawerHeader className="max-h-full">
          <DrawerTitle>Spotify playlists</DrawerTitle>
          <div className="overflow-auto max-h-full">
            <PlaylistSpotify />
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerSpotifyPlaylist;
