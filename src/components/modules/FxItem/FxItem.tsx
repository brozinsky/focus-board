import ButtonFX from "@/components/ui/buttons/ButtonFX";
import React, { ReactNode, useEffect, useState, useRef } from "react";
import { Howl, Howler } from "howler";
import Slider from "@/components/ui/inputs/Slider";
import { cn } from "@/lib/utils";

interface IProps {
  audio: string;
  icon: ReactNode;
  name: string;
}

const FxItem = ({ icon, audio, name }: IProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(0.5);
  const [isActive, setIsActive] = useState<boolean>(false);
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    Howler.volume(volume);
  }, [volume]);

  useEffect(() => {
    if (!soundRef.current) {
      soundRef.current = new Howl({
        src: [audio],
        loop: true,
        volume: volume,
        onload: () => {
          setIsLoading(false);
        },
      });
    }

    if (isActive) {
      soundRef.current.play();
    } else {
      soundRef.current.pause();
    }

    return () => {
      if (soundRef.current) {
        soundRef.current.pause();
      }
    };
  }, [isActive, audio]);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const handleVolumeChange = (value: number[]) => {
    if (value.length > 0) {
      const newVolume = value[0] / 100; // Convert to a range of 0 to 1
      setVolume(newVolume);
      if (soundRef.current) {
        soundRef.current.volume(newVolume);
      }
    }
  };

  return (
    <div className="flex flex-row items-center gap-4">
      <ButtonFX tooltip={name} isActive={isActive} isLoading={isLoading} icon={icon} onClick={handleClick} />
      <div className={cn(isActive ? "opacity-100": "opacity-30","w-40")}>
        <Slider
          value={[volume * 100]}
          onValueChange={handleVolumeChange}
          min={0}
          max={100}
          step={1}
          disabled={!isActive}
        />
      </div>
    </div>
  );
};

export default FxItem;
