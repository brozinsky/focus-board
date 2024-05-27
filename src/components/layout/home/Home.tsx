// import { useMediaQuery } from "@mantine/hooks";
// import MobileNotSupported from "../MobileNotSupported";
import YouTube from "react-youtube";
import Panel from "@/components/modules/Player/Panel";
import usePlayer from "@/hooks/usePlayer";


const Home = () => {
  const { videoId, onReady } = usePlayer();

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
        <Panel />
        <div>

        </div>
      </div>
    </div>
  );
};

export default Home;
