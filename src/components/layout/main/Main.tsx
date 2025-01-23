import Panel from "@/components/modules/Player/Panel";
import Windows from "./Windows";

const Main = ({ handlePlayPause }: { handlePlayPause: () => void }) => {

  return (
    <>
      <Panel handlePlayPause={handlePlayPause} />
      <Windows />
    </>
  );
};

export default Main;
