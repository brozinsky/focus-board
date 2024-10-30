import { useSpotifyStore } from "@/stores/zustand/useSpotifyStore";
import { cn } from "@/lib/utils";
import ButtonIcon from "@/components/ui/buttons/ButtonIcon";
import useWindowsStore from "@/stores/zustand/useWindowsStore";
import SpotifySVG from "@/components/elements/svg/icons/social-media/SpotifySVG";

const SpotifyPlayer = () => {
  const { playlistUrl } = useSpotifyStore();
  const { isOpen, setIsOpen } = useWindowsStore();

  const WIDTH = 350;
  const HEIGHT = 500;

  return (
    <>
      <ButtonIcon
        isOpen={isOpen.spotify}
        className="relative"
        onClick={() => setIsOpen("spotify", !isOpen.spotify)}
        icon={<SpotifySVG />}
        tooltip={"Spotify player"}
      />
      <div
        style={{ width: WIDTH, height: HEIGHT }}
        className={cn(
          isOpen.spotify ? "visible opacity-100" : "invisible opacity-0",
          "absolute bottom-20 left-0 z-100 bg-background rounded-lg overflow-hidden transition duration-200"
        )}
      >
        <iframe
          className="z-20"
          src={playlistUrl}
          width={WIDTH}
          height={HEIGHT}
          allow="encrypted-media"
          title="Spotify Playlist"
        />
      </div>
    </>
  );
};

export default SpotifyPlayer;
