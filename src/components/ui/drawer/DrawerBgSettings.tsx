import SceneSettings from "@/components/modules/settings/SceneSettings";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./Drawer";
import ButtonIcon from "../buttons/ButtonIcon";
import { ArrowLeftFromLine } from "lucide-react";

const DrawerBgSettings = ({
  setIsDrawerOpen,
  isDrawerOpen,
}: {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (value: boolean) => void;
}) => {
  const onOpenChange = (value: boolean) => {
    setIsDrawerOpen(value);
  };

  return (
    <Drawer
      handleOnly={true}
      isOverlay={false}
      direction="right"
      onOpenChange={(e: boolean) => onOpenChange(e)}
    >
      {!isDrawerOpen && (
        <DrawerTrigger>
          <button>Settings</button>
        </DrawerTrigger>
      )}
      <DrawerContent className="min-w-[300px] sm:min-w-[370px] my-2">
        <DrawerHeader className="max-h-full flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <DrawerTrigger>
              <ButtonIcon
                size={"sm"}
                onClick={() => null}
                icon={<ArrowLeftFromLine />}
                tooltip={"Fullscreen"}
              />
            </DrawerTrigger>
            <DrawerTitle>Background Settings</DrawerTitle>
          </div>
          <SceneSettings />
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerBgSettings;
