import ButtonIcon from "@/components/ui/buttons/ButtonIcon";
import { Separator } from "@/components/ui/Separator/Separator";
import Dropdown from "@/components/ui/dropdowns/Dropdown";
import GameControllerSVG from "@/components/elements/svg/icons/interface/GameControllerSVG";
import FlagSVG from "@/components/elements/svg/icons/games/saper/FlagSVG";
import useWindowsStore from "@/stores/zustand/useWindowsStore";

const DropdownGames = () => {
  const { isOpen, setIsOpen } = useWindowsStore();

  return (
    <Dropdown
      position={"top"}
      trigger={
        <ButtonIcon
          component={"div"}
          icon={<GameControllerSVG />}
          tooltip={"Games"}
        />
      }
    >
      <div className="flex flex-col gap-3 p-4">
        <div className="text-xl">Games</div>
        <Separator className="bg-white/30" />
        <ButtonIcon
          isOpen={isOpen.saper}
          className="relative"
          onClick={() => setIsOpen("saper", !isOpen.saper)}
          icon={<FlagSVG />}
          tooltip={"Minesweeper"}
        />
      </div>
    </Dropdown>
  );
};

export default DropdownGames;
