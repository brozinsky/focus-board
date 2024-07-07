import usePlayerStore from "@/stores/zustand/usePlayerStore";
import { useCallback, useState } from "react";

const useVolume = () => {
  const { volume, setVolume } = usePlayerStore();

  const [prevVolume, setPrevVolume] = useState(volume);

  const changeVolume = useCallback(
    (newValue: number[]) => {
      if (newValue.length > 0) {
        setVolume(newValue[0]);
      }
    },
    [setVolume]
  );

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(prevVolume);
    } else {
      setPrevVolume(volume);
      setVolume(0);
    }
  };

  const getVolumeIcon = (volume: number) => {
    if (volume >= 0.5) {
      return "volume-hi";
    } else if (volume > 0) {
      return "volume-lo";
    } else {
      return "volume-mute";
    }
  };

  return {
    volume,
    changeVolume,
    toggleMute,
    getVolumeIcon,
  };
};

export default useVolume;
