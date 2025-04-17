import usePlayerStore from "@/stores/zustand/player/player.store";
import useWindowsStore from "@/stores/zustand/global/windows.store";
import React, { useEffect, useState } from "react";

// Memory usage interface
interface MemoryUsage {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

const DevLogger: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isOpen } = useWindowsStore();
  const { currentVideo, currentAudio } = usePlayerStore();
  const [memoryUsage, setMemoryUsage] = useState<MemoryUsage | null>(null);
  const [memorySupported, setMemorySupported] = useState<boolean>(true);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "`") {
        setIsVisible((prevState) => !prevState);
      }
    };

    const monitorMemoryUsage = () => {
      if (window.performance && window.performance.memory) {
        const memory = window.performance.memory;
        setMemoryUsage({
          usedJSHeapSize: memory.usedJSHeapSize,
          totalJSHeapSize: memory.totalJSHeapSize,
          jsHeapSizeLimit: memory.jsHeapSizeLimit,
        });
      } else {
        setMemorySupported(false);  // Set to false if the memory API is not supported
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    const memoryInterval = setInterval(monitorMemoryUsage, 5000); // Update memory usage every 5 seconds

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      clearInterval(memoryInterval);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      id="Logger"
      className="absolute w-fit min-w-72 h-lg px-8 py-4 window !top-10 left-1/2 -translate-x-1/2 z-[99999999]"
    >
      <div className="flex flex-col gap-4 justify-between">
        <div className="flex justify-between">
          isOpen.playlist: <span>{isOpen.playlist.toString()}</span>
        </div>
        <div className="flex justify-between">
          isOpen.scene: <span>{isOpen.scene.toString()}</span>
        </div>
        <div className="flex justify-between">
          currentVideo: <span>{currentVideo?.videoId}</span>
        </div>
        <div className="flex justify-between">
          currentAudio: <span>{currentAudio?.title}</span>
        </div>
        {memorySupported ? (
          memoryUsage ? (
            <>
              <div className="flex justify-between">
                Used JS heap size: <span>{memoryUsage.usedJSHeapSize} bytes</span>
              </div>
              <div className="flex justify-between">
                Total JS heap size: <span>{memoryUsage.totalJSHeapSize} bytes</span>
              </div>
              <div className="flex justify-between">
                JS heap size limit: <span>{memoryUsage.jsHeapSizeLimit} bytes</span>
              </div>
            </>
          ) : (
            <div className="flex justify-between">
              Memory data is not yet available.
            </div>
          )
        ) : (
          <div className="flex justify-between">
            Memory usage monitoring is not supported in this browser.
          </div>
        )}
      </div>
    </div>
  );
};

export default DevLogger;
