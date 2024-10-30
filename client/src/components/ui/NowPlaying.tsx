import usePlayerStore from "@/stores/zustand/usePlayerStore";
import useWindowsStore from "@/stores/zustand/useWindowsStore";
import Marquee from "react-fast-marquee";

interface IProps {
  title: string | undefined;
}

const NowPlaying = ({ title }: IProps) => {
  const { isAudioPlaying, currentAudio } = usePlayerStore();
  const { setIsOpen } = useWindowsStore();

  return (
    <div className="max-w-[320px]  bottom-2 right-2 z-10 flex justify-center p-0 flex-col h-10">
      {/* {isLoading && (
        <div className="absolute top-1/2 right-0 w-full flex items-center justify-center">
          <div className="buffer">Buffering...</div>
        </div>
      )} */}
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
          <div className="flex flex-row gap-1 items-center">
            Now playing:
            {/* <a href="" className="">
            <YouTubeSVG />
          </a> */}
          </div>
          <div>
            <Marquee direction="left" speed={10} pauseOnHover>
              {title}
            </Marquee>
          </div>
        </>
      ) : (
        currentAudio && (
          // <div>Audio paused</div>
          <div className="top-1/2 right-0 w-full flex items-center justify-center">
            <div className="buffer">Buffering...</div>
          </div>
        )
      )}
    </div>
  );
};

export default NowPlaying;
