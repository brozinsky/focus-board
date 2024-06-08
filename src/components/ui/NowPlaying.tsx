import Marquee from "react-fast-marquee";

interface IProps {
  title: string;
}

const NowPlaying = ({ title }: IProps) => {
  return (
    <div className="max-w-[320px] absolute bottom-2 right-2 z-10 glass-blur p-2">
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
    </div>
  );
};

export default NowPlaying;
