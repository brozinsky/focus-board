import usePlayerStore from "@/stores/zustand/usePlayerStore";
import PlaylistItem from "../Card/PlaylistItem";
import Volume from "./_partials/Volume";
import useVolume from "@/hooks/useVolume";
import Button from "@/components/ui/buttons/Button";
import { Separator } from "@/components/ui/Separator/Separator";
import FxItem from "../FxItem/FxItem";
import { SFX_AUDIO } from "@/lib/constants/const-sfx";
import useWindowsStore from "@/stores/zustand/useWindowsStore";
import YouTubeSVG from "@/components/elements/svg/icons/social-media/YouTubeSVG";
import { cn } from "@/lib/utils";
import SpotifySVG from "@/components/elements/svg/icons/social-media/SpotifySVG";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs/Tabs";
import { TAudioSource } from "@/types/query-types";

const AudioSettings = () => {
  const { currentAudio, audioSource, setAudioSource } = usePlayerStore();
  const { setIsOpen } = useWindowsStore();
  const { changeVolume, toggleMute, getVolumeIcon, volumeAudio } = useVolume();

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="mb-2">Audio source</div>
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
            <div className="mb-2">Audio track volume</div>
            <div className="flex-center gap-2 max-w-sm">
              <Button
                label="Toggle mute"
                onClick={toggleMute}
                icon={getVolumeIcon(volumeAudio)}
                size="sm"
                variant="ghost"
              />
              <Volume volume={volumeAudio} handleVolumeChange={changeVolume} />
            </div>
            <div>Current playlist</div>
            {currentAudio ? (
              <PlaylistItem
                isHoverable={false}
                isActive={false}
                item={currentAudio}
                handleClick={() => null}
              />
            ) : (
              <div>None</div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setIsOpen("playlist", true)}
                className="border border-white/30 bg-transparent glass-blur rounded-lg px-4 py-3 hover:bg-white/20 transition"
              >
                Change
              </button>
              <button
                title="Not available yet"
                className="border border-white/30 bg-transparent glass-blur rounded-lg px-4 py-3 cursor-not-allowed opacity-50"
              >
                Add custom audio
              </button>
            </div>
          </TabsContent>
          <TabsContent value="spotify"></TabsContent>
        </Tabs>
        <Separator className="my-4 bg-white/30" />
        <div>Active sound effects</div>
        <div>
          <div className="grid grid-cols-3 gap-2">
            {SFX_AUDIO.map(({ name, id }) => {
              return <FxItem key={id} id={id} name={name} variant="md" isPremium={true}/>;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default AudioSettings;
