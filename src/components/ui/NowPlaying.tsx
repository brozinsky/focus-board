import usePlayerStore from "@/stores/zustand/usePlayerStore";
import Marquee from "react-fast-marquee";

interface IProps {
  title: string;
}

const NowPlaying = ({ title }: IProps) => {
  const { isAudioPlaying } = usePlayerStore();
  return (
    <div className="max-w-[320px]  bottom-2 right-2 z-10 p-2">
      {/* {isLoading && (
        <div className="absolute top-1/2 right-0 w-full flex items-center justify-center">
          <div className="buffer">Buffering...</div>
        </div>
      )} */}
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
        // <div>Audio paused</div>
        <div className=" top-1/2 right-0 w-full flex items-center justify-center">
        <div className="buffer">buffering...</div>
      </div>
      )}
    </div>
  );
};

export default NowPlaying;
