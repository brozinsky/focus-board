import useVideoPlayer from "@/hooks/useVideoPlayer";
import usePlayerStore from "@/stores/zustand/usePlayerStore";
import useWindowsStore from "@/stores/zustand/useWindowsStore";
import Marquee from "react-fast-marquee";

interface IProps {
  title: string | undefined;
}

const NowPlaying = ({ title }: IProps) => {
  const { isAudioPlaying, currentAudio, isBuffering } = usePlayerStore();
  const {} = useVideoPlayer();
  const { setIsOpen } = useWindowsStore();

  return (
    <div className="max-w-[320px]  bottom-2 right-2 z-10 flex justify-center p-0 flex-col h-10">
      {!currentAudio && (
        <div className="flex flex-col">
          <span>It's quiet in here...</span>
          <span
            className="underline cursor-pointer"
            onClick={() => setIsOpen("playlist", true)}
          >
            Let's play <span>something!</span>
          </span>
        </div>
      )}
      {isAudioPlaying ? (
        <>
          <div className="flex flex-row gap-1 items-center">Now playing:</div>
          <div>
            <Marquee direction="left" speed={10} pauseOnHover>
              {title}
            </Marquee>
          </div>
        </>
      ) : (
        currentAudio && (
          <div className="top-1/2 right-0 w-full flex items-center justify-center">
            {isBuffering && <div className="buffer">Buffering...</div>}
          </div>
        )
      )}
    </div>
  );
};

export default NowPlaying;
