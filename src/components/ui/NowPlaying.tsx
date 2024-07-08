import usePlayerStore from "@/stores/zustand/usePlayerStore";
import Marquee from "react-fast-marquee";

interface IProps {
  title: string;
}

const NowPlaying = ({ title }: IProps) => {
  const { isAudioPlaying } = usePlayerStore();
  return (
    <div className="max-w-[320px] absolute bottom-2 right-2 z-10 glass-blur p-2">
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
        <div>Audio paused</div>
      )}
    </div>
  );
};

export default NowPlaying;
