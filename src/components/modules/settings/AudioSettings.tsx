import usePlayerStore from "@/stores/zustand/usePlayerStore";
import usePlaylistStore from "@/stores/zustand/usePlaylistStore";
import PlaylistItem from "../Card/PlaylistItem";
import Volume from "./_partials/Volume";
import useVolume from "@/hooks/useVolume";
import Button from "@/components/ui/buttons/Button";

const AudioSettings = () => {
  const { currentAudio } = usePlayerStore();
  const { setIsPlaylistOpen } = usePlaylistStore();
  const { changeVolume, toggleMute, getVolumeIcon, volume } = useVolume();

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="max-w-sm">
          <div className="mb-2">Master volume</div>
          <div className="flex-center gap-2">
            <Button
              label="Toggle mute"
              onClick={toggleMute}
              icon={getVolumeIcon(volume)}
              size="sm"
              variant="ghost"
            />
            <Volume volume={volume} handleVolumeChange={changeVolume} />
          </div>
        </div>

        <div>Current audio track</div>
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
            onClick={() => setIsPlaylistOpen(true)}
            className="border border-white/30 bg-transparent glass-blur rounded-lg px-4 py-3 hover:bg-white/20 transition"
          >
            Change audio
          </button>
          <button
            title="Not available yet"
            className="border border-white/30 bg-transparent glass-blur rounded-lg px-4 py-3 cursor-not-allowed opacity-50"
          >
            Add custom audio
          </button>
        </div>
      </div>
    </>
  );
};

export default AudioSettings;
