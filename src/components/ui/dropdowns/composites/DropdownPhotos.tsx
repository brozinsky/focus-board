import NotesSVG from "@/components/elements/svg/icons/interface/NotesSVG";
import ButtonIcon from "@/components/ui/buttons/ButtonIcon";
import { Separator } from "@/components/ui/Separator/Separator";
import Dropdown from "@/components/ui/dropdowns/Dropdown";
import Checkbox from "@/components/ui/inputs/Checkbox";
import ButtonDropdown from "@/components/ui/buttons/ButtonDropdown";
import useStickyNotesStore from "@/stores/zustand/sticky-notes/sticky-notes.store";
import useStickyNotesDb from "@/stores/supabase/useStickyNotesDb";
import { useAuthStore } from "@/stores/zustand/auth/auth.store";
import { Crown } from "lucide-react";
import ButtonPremium from "../../buttons/button-icon/ButtonPremium";
import usePolaroidStore from "@/stores/zustand/photos/polaroid.store";
import CameraSVG from "@/components/elements/svg/icons/interface/panel/CameraSVG";
import CameraOffSVG from "@/components/elements/svg/icons/interface/panel/CameraOffSVG";

const DropdownPhotos = () => {
  const { isLoggedIn } = useAuthStore();
  const {
    polaroids,
    addNewPolaroid,
    addNewPicture,
    arePhotosVisible,
    setArePhotosVisible,
  } = usePolaroidStore();

  const isDemoLimit = !isLoggedIn && polaroids.length === 2;

  return (
    <Dropdown
      position={"top"}
      trigger={
        <ButtonIcon
          component={"div"}
          icon={arePhotosVisible ? <CameraSVG /> : <CameraOffSVG />}
          tooltip={"Photos"}
        />
      }
    >
      <div className="flex flex-col gap-3 p-4">
        <div className="text-xl">Photos</div>
        <Separator className="bg-white/30" />
        <ButtonDropdown onClick={addNewPolaroid} isDisabled={!arePhotosVisible}>
          + Add new photo
        </ButtonDropdown>
        <ButtonDropdown onClick={addNewPicture} isDisabled={!arePhotosVisible}>
          + Add new picture
        </ButtonDropdown>
        <Checkbox
          isDisabled={polaroids.length === 0}
          isSelected={arePhotosVisible}
          state={arePhotosVisible}
          onChange={setArePhotosVisible}
        >
          Show photos
        </Checkbox>
      </div>
    </Dropdown>
  );
};

export default DropdownPhotos;
