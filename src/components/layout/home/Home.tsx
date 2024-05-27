// import { useMediaQuery } from "@mantine/hooks";
// import MobileNotSupported from "../MobileNotSupported";
import YouTube from "react-youtube";
import Panel from "@/components/modules/Player/Panel";
import usePlayer from "@/hooks/usePlayer";


const Home = () => {
  const { videoId, onReady, handlePlayPause, handleRewind, handleForward, handleSliderChange, handleVolumeChange } = usePlayer();


  // if (matches) {
  //   return <MobileNotSupported />;
  // }

  return (
    <div className="App" unselectable="on">
      <div unselectable="on">
      {videoId && <YouTube
          videoId={videoId}
          onReady={onReady}
          opts={{
            playerVars: {
              enablejsapi: 1,
            },
          }}
          className="bg-video relative"
        />}
        {/* <Player /> */}
        <Panel
          handleRewind={handleRewind}
          handlePlayPause={handlePlayPause}
          handleForward={handleForward}
          handleSliderChange={handleSliderChange}
          handleVolumeChange={handleVolumeChange}
        />
        <div>

        </div>
        {/* <div className="gap-4 absolute bottom-10 left-0 py-4 flex items-center justify-center z-20 bg-white/50 w-full">
          <Button onClick={handleRewind}>-10s</Button>
          <Button onClick={handlePlayPause}>
            {isPlaying ? "Pause" : "Play"}
          </Button>
          <Button onClick={handleForward}>+10s</Button>
          <div className="w-[150px]">
            <Volume volume={volume} handleVolumeChange={handleVolumeChange} />
          </div>
        </div>
        <div className="absolute bottom-24 left-0 py-4 w-full flex justify-center z-20">
          <Slider
            value={[currentTime]}
            min={0}
            max={duration}
            step={1}
            onValueChange={handleSliderChange}
          />
        </div> */}
      </div>
    </div>
  );
};

export default Home;
