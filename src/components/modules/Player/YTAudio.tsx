import YouTube from "react-youtube";

const YTAudio = ({ onReady, id }) => {

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
