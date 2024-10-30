import usePlayerStore from "@/stores/zustand/usePlayerStore";
import { useCallback, useState } from "react";

const useVolume = () => {
  const { volumeAudio, setVolumeAudio } = usePlayerStore();

  const [prevVolume, setPrevVolume] = useState(volumeAudio);

  const changeVolume = useCallback(
    (newValue: number[]) => {
      if (newValue.length > 0) {
        setVolumeAudio(newValue[0]);
      }
    },
    [setVolumeAudio]
  );

  const toggleMute = () => {
    if (volumeAudio === 0) {
      setVolumeAudio(prevVolume);
    } else {
      setPrevVolume(volumeAudio);
      setVolumeAudio(0);
    }
  };

  const getVolumeIcon = (volumeAudio: number) => {
    if (volumeAudio >= 0.5) {
      return "volume-hi";
    } else if (volumeAudio > 0) {
      return "volume-lo";
    } else {
      return "volume-mute";
    }
  };

  return {
    volumeAudio,
    changeVolume,
    toggleMute,
    getVolumeIcon,
  };
};

export default useVolume;
