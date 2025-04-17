import { useEffect, useState } from "react";
import { Star, Heart, Smile } from "lucide-react";
import { Input } from "@/components/ui/inputs/Input";
import { cn } from "@/lib/utils";
import usePolaroidStore from "@/stores/zustand/usePolaroidStore";
import usePolaroid from "@/hooks/usePolaroid";
import ButtonEdit from "@/components/ui/buttons/panel-edit/ButtonEdit";
import ButtonDelete from "@/components/ui/buttons/panel-edit/ButtonDelete";
import ButtonIcon from "@/components/ui/buttons/ButtonIcon";
import { useDraggable } from "@dnd-kit/core";
import { getSticker } from "@/utils/photos.utils";
import imageCompression from "browser-image-compression";
import { TPolaroid } from "@/types/model/photos.model";

const Polaroid = (props: TPolaroid) => {
  const { setActiveId, updatePolaroid, activeId, removePolaroid } =
    usePolaroidStore();
  const { fileInputRef, handleDragOver } = usePolaroid();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    disabled: isEditing,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : {};

  const handleEditToggle = (e: Event) => {
    e.stopPropagation();
    setIsEditing(!isEditing);
    setActiveId(props.id);
  };

  useEffect(() => {
    console.log(activeId);
  }, [activeId]);

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const options = {
      maxWidthOrHeight: 250,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      const compressedBase64 = await imageCompression.getDataUrlFromFile(
        compressedFile
      );

      updatePolaroid(activeId, { image: compressedBase64 });
    } catch (error) {
      console.error("Error compressing the image:", error);
    }
  };

  return (
    <div
      ref={setNodeRef}
      data-no-dnd="true"
      {...listeners}
      {...attributes}
      style={{ ...style, ...props.styles }}
      className="group/panel pb-14 pointer-events-auto"
    >
      <div
        key={props.id}
        className={cn(
          `pointer-events-auto relative bg-white p-4 shadow-md transition-transform hover:rotate-0 flex-shrink-0`,
          props.tilt === "left" && !isEditing && "-rotate-2",
          props.tilt === "right" && !isEditing && "rotate-2"
        )}
        style={{ width: "250px", height: "305px" }}
        onMouseEnter={() => setActiveId(props.id)}
      >
        <div
          style={{
            background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))",
          }}
          className="transition group-hover/panel:opacity-100 opacity-0 bg-black/30 -bottom-14 left-0 right-0 h-14 w-full absolute"
        ></div>

        {isEditing && (
          <>
            <div
              style={{
                background:
                  "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))",
              }}
              className="-top-14 left-0 right-0 h-14 w-full absolute"
            ></div>
            {/* TODO change to button toggle group */}
            <div className="absolute -top-12 left-0 right-0 flex-center gap-2">
              <ButtonIcon
                className={cn(
                  "bg-background hover:bg-primary hover:opacity-100",
                  props.tilt === "left" && "border-2 border-primary",
                  !isEditing && "group-hover/panel:opacity-100 opacity-0 "
                )}
                onClick={() => updatePolaroid(props.id, { tilt: "left" })}
                icon={<div>\</div>}
                tooltip={"Rotate left"}
              />
              <ButtonIcon
                className={cn(
                  "bg-background hover:bg-primary hover:opacity-100",
                  props.tilt === "center" && "border-2 border-primary",
                  !isEditing && "group-hover/panel:opacity-100 opacity-0 "
                )}
                onClick={() => updatePolaroid(props.id, { tilt: "center" })}
                icon={<div>|</div>}
                tooltip={"Center"}
              />
              <ButtonIcon
                className={cn(
                  "bg-background hover:bg-primary hover:opacity-100",
                  props.tilt === "right" && "border-2 border-primary",
                  !isEditing && "group-hover/panel:opacity-100 opacity-0 "
                )}
                onClick={() => updatePolaroid(props.id, { tilt: "right" })}
                icon={<div>/</div>}
                tooltip={"Rotate right"}
              />
            </div>
          </>
        )}
        {isEditing && (
          <>
            <div
              style={{
                background:
                  "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))",
              }}
              className="transition top-0 -left-14 w-14 h-full absolute"
            ></div>
            {/* TODO change to button toggle group */}
            <div className="absolute top-0 -left-12 flex-center flex-col gap-2">
              <ButtonIcon
                className={cn(
                  "bg-background hover:bg-primary hover:opacity-100",
                  props.sticker === "star" && "border-2 border-primary",
                  !isEditing && "group-hover/panel:opacity-100 opacity-0 "
                )}
                onClick={() => updatePolaroid(props.id, { sticker: "star" })}
                icon={<Star className="h-4 w-4" />}
                tooltip={"Sticker"}
              />
              <ButtonIcon
                className={cn(
                  "bg-background hover:bg-primary hover:opacity-100",
                  props.sticker === "heart" && "border-2 border-primary",
                  !isEditing && "group-hover/panel:opacity-100 opacity-0 "
                )}
                onClick={() => updatePolaroid(props.id, { sticker: "heart" })}
                icon={<Heart className="h-4 w-4" />}
                tooltip={"Sticker"}
              />
              <ButtonIcon
                className={cn(
                  "bg-background hover:bg-primary hover:opacity-100",
                  props.sticker === "smile" && "border-2 border-primary",
                  !isEditing && "group-hover/panel:opacity-100 opacity-0 "
                )}
                onClick={() => updatePolaroid(props.id, { sticker: "smile" })}
                icon={<Smile className="h-4 w-4" />}
                tooltip={"Sticker"}
              />
              <ButtonIcon
                className={cn(
                  "bg-background hover:bg-primary hover:opacity-100",
                  !props.sticker && "border-2 border-primary",
                  !isEditing && "group-hover/panel:opacity-100 opacity-0 "
                )}
                onClick={() => updatePolaroid(props.id, { sticker: null })}
                icon={<div>x</div>}
                tooltip={"No sticker"}
              />
            </div>
          </>
        )}
        <ButtonEdit onClick={handleEditToggle} isEditing={isEditing} />
        <ButtonDelete
          onClick={() => removePolaroid(props.id)}
          isEditing={isEditing}
        />
        <div
          className="w-full h-[220px] bg-gray-200 mb-3.5 flex items-center justify-center cursor-pointer relative"
          onClick={() => fileInputRef.current?.click()}
          // onDrop={() => handleDrop(props.id)}
          onDragOver={handleDragOver}
        >
          {props.image ? (
            <img
              src={props.image}
              alt="Uploaded"
              className="w-full h-full object-cover"
              width={225}
              height={227}
            />
          ) : (
            <p className="text-gray-500 p-4 text-sm text-center">
              Click to add photo
              {/* Click or drag to add photo */}
            </p>
          )}
          {/* TODO photo drag n drop functionality */}
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => onChange(e)}
            className="hidden"
            ref={fileInputRef}
          />
          {props.sticker && <>{getSticker(props.sticker)}</>}
        </div>
        <Input
          type="text"
          placeholder={isEditing ? "Add a caption..." : ""}
          value={props.caption}
          onChange={(e) =>
            updatePolaroid(props.id, { caption: e.target.value })
          }
          className="w-full bg-transparent text-2xl tracking-wide font-thin border-none text-black/95 text-center focus:outline-none"
          style={{ fontFamily: "'Delicious Handrawn', cursive" }}
        />
      </div>
    </div>
  );
};

export default Polaroid;
