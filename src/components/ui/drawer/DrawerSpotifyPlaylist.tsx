import React, { useEffect } from "react";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs/Tabs";
import { TAudioSource } from "@/types/query-types";

const DrawerSpotifyPlaylist = () => {
  const { audioSource, setAudioSource } = usePlayerStore();

  useEffect(() => {
    console.log(audioSource);
  }, [audioSource]);

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
          <Tabs
            defaultValue={audioSource}
            onValueChange={(value) => setAudioSource(value as TAudioSource)}
          >
            <TabsList>
              <TabsTrigger
                value="youtube"
                className={cn("gap-1.5 flex-center w-[150px]")}
              >
                <YouTubeSVG width={20} /> Youtube
              </TabsTrigger>
              <TabsTrigger
                value="spotify"
                className={cn("gap-1.5 flex-center w-[150px]")}
              >
                <SpotifySVG width={20} /> Spotify
              </TabsTrigger>
            </TabsList>
            <TabsContent value="youtube">
              <PlaylistItems />
            </TabsContent>
            <TabsContent value="spotify">
              <PlaylistSpotify />
            </TabsContent>
          </Tabs>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerSpotifyPlaylist;
