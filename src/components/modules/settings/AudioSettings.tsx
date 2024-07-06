import usePlayerStore from "@/stores/zustand/usePlayerStore";
import usePlaylistStore from "@/stores/zustand/usePlaylistStore";
import PlaylistItem from "../Card/PlaylistItem";

const AudioSettings = () => {
  const { currentAudio } = usePlayerStore();
  const { setIsPlaylistOpen } = usePlaylistStore();

  return (
    <>
      <div className="flex flex-col gap-4">
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
