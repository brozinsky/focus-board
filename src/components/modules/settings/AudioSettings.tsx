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

const AudioSettings = () => {
  const { currentAudio, audioSource, setAudioSource } = usePlayerStore();
  const { setIsOpen } = useWindowsStore();
  const { changeVolume, toggleMute, getVolumeIcon, volumeAudio } = useVolume();

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="max-w-sm">
          <div className="mb-2">Audio source</div>
          <div className="grid grid-cols-2 gap-2 mx-auto w-full mb-6">
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
          {audioSource === "youtube" && (
            <>
              <div className="mb-2">Audio track volume</div>
              <div className="flex-center gap-2">
                <Button
                  label="Toggle mute"
                  onClick={toggleMute}
                  icon={getVolumeIcon(volumeAudio)}
                  size="sm"
                  variant="ghost"
                />
                <Volume
                  volume={volumeAudio}
                  handleVolumeChange={changeVolume}
                />
              </div>
            </>
          )}
        </div>

        {audioSource === "youtube" && (
          <>
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
          </>
        )}

        <Separator className="my-4 bg-white/30" />

        <div>Active sound effects</div>
        <div>
          <div className="grid grid-cols-3 gap-2">
            {SFX_AUDIO.map(({ name, id }) => {
              return <FxItem key={id} id={id} name={name} variant="md" />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default AudioSettings;
