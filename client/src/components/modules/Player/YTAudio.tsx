import YouTube, { YouTubeEvent } from "react-youtube";

type TProps = {
  id: string;
  onReady: (event: YouTubeEvent<any>) => void;
};

const YTAudio = ({ onReady, id }: TProps) => {
  return (
    <YouTube
      videoId={id}
      onReady={onReady}
      opts={{
        playerVars: {
          enablejsapi: 1,
          autoplay: 1,
          loop: 1,
        },
      }}
      className={"hidden"}
    />
  );
};

export default YTAudio;
