import Panel from "@/components/modules/Player/Panel";
import useAudioPlayer from "@/hooks/useAudioPlayer";
import Windows from "./Windows";

const Main = () => {
  const { handlePlayPause: handleAudioPlayPause } = useAudioPlayer();

  return (
    <>
      <Panel handlePlayPause={handleAudioPlayPause} />
      <Windows />
    </>
  );
};

export default Main;
