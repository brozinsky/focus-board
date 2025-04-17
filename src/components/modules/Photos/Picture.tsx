import { useState } from "react";
import {
  RectangleHorizontal,
  RectangleVertical,
  Sun,
  Moon,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import usePolaroidStore from "@/stores/zustand/photos/polaroid.store";
import usePolaroid from "@/hooks/usePolaroid";
import ButtonEdit from "@/components/ui/buttons/panel-edit/ButtonEdit";
import ButtonDelete from "@/components/ui/buttons/panel-edit/ButtonDelete";
import ButtonIcon from "@/components/ui/buttons/ButtonIcon";
import { useDraggable } from "@dnd-kit/core";
import imageCompression from "browser-image-compression";
import { Input } from "@/components/ui/inputs/Input";
import { TPolaroid } from "@/types/model/photos.model";

const Picture = (props: TPolaroid) => {
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

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const options = {
      maxWidthOrHeight: 450,
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
        // className={cn(
        //   `pointer-events-auto relative bg-white p-4 shadow-md transition-transform hover:rotate-0 flex-shrink-0`
        className={cn(
          "pointer-events-auto relative w-full mb-3.5 flex items-center justify-center cursor-pointer relative",
          props.frame === "light" && "bg-white",
          props.frame === "dark" && "bg-gray-800"
        )}
        style={{
          width: props.orientation === "landscape" ? "450px" : "300px",
          height: props.orientation === "landscape" ? "300px" : "450px",
        }}
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
            <div className="absolute -top-12 left-0 right-0 flex-center gap-2">
              <ButtonIcon
                className={cn(
                  "bg-background hover:bg-primary hover:opacity-100",
                  props.orientation === "landscape" &&
                    "border-2 border-primary",
                  !isEditing && "group-hover/panel:opacity-100 opacity-0 "
                )}
                onClick={() =>
                  updatePolaroid(props.id, { orientation: "landscape" })
                }
                icon={<RectangleHorizontal className="h-4 w-4" />}
                tooltip={"Landscape orientation"}
              />
              <ButtonIcon
                className={cn(
                  "bg-background hover:bg-primary hover:opacity-100",
                  props.orientation === "portrait" && "border-2 border-primary",
                  !isEditing && "group-hover/panel:opacity-100 opacity-0 "
                )}
                onClick={() =>
                  updatePolaroid(props.id, { orientation: "portrait" })
                }
                icon={<RectangleVertical className="h-4 w-4" />}
                tooltip={"Portrait orientation"}
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
            <div className="absolute top-0 -left-12 flex-center flex-col gap-2">
              <ButtonIcon
                className={cn(
                  "bg-background hover:bg-primary hover:opacity-100",
                  props.frame === "light" && "border-2 border-primary",
                  !isEditing && "group-hover/panel:opacity-100 opacity-0 "
                )}
                onClick={() => updatePolaroid(props.id, { frame: "light" })}
                icon={<Sun className="h-4 w-4" />}
                tooltip={"Light frame"}
              />
              <ButtonIcon
                className={cn(
                  "bg-background hover:bg-primary hover:opacity-100",
                  props.frame === "dark" && "border-2 border-primary",
                  !isEditing && "group-hover/panel:opacity-100 opacity-0 "
                )}
                onClick={() => updatePolaroid(props.id, { frame: "dark" })}
                icon={<Moon className="h-4 w-4" />}
                tooltip={"Dark frame"}
              />
              <ButtonIcon
                className={cn(
                  "bg-background hover:bg-primary hover:opacity-100",
                  props.frame === "none" && "border-2 border-primary",
                  !isEditing && "group-hover/panel:opacity-100 opacity-0 "
                )}
                onClick={() => updatePolaroid(props.id, { frame: "none" })}
                icon={<X className="h-4 w-4" />}
                tooltip={"No frame"}
              />
              <div className="h-4"></div>
              <ButtonIcon
                className={cn(
                  "bg-background hover:bg-primary hover:opacity-100",
                  props.padding === "none" && "border-2 border-primary",
                  !isEditing && "group-hover/panel:opacity-100 opacity-0 "
                )}
                onClick={() => updatePolaroid(props.id, { padding: "none" })}
                icon={<div className="border border-inherit size-4"></div>}
                tooltip={"Full frame"}
              />

              <ButtonIcon
                className={cn(
                  "bg-background hover:bg-primary hover:opacity-100",
                  props.padding === "padding" && "border-2 border-primary",
                  !isEditing && "group-hover/panel:opacity-100 opacity-0 "
                )}
                onClick={() => updatePolaroid(props.id, { padding: "padding" })}
                icon={
                  <div className="border-inherit border-[3px] size-4"></div>
                }
                tooltip={"Frame with space"}
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
          onClick={() => fileInputRef.current?.click()}
          // onDrop={() => handleDrop(props.id)}
          onDragOver={handleDragOver}
        >
          <div
            className={cn(
              "relative bg-white border-[0.75rem] flex items-center justify-center cursor-pointer",
              props.orientation === "landscape" && "w-[450px] h-[300px]",
              props.orientation === "portrait" && "w-[300px] h-[450px]",
              props.frame === "light" && "border-gray-200",
              props.frame === "dark" && "border-gray-950",
              props.frame === "none" && "border-none"
            )}
          >
            {props.image ? (
              <img
                src={props.image}
                alt="Uploaded"
                className={cn(
                  props.padding === "padding" && "p-5",
                  "w-full h-full object-cover"
                )}
                width={225}
                height={227}
              />
            ) : (
              <p className="text-gray-500 p-4 text-sm text-center">
                Click to add picture
              </p>
            )}
            <Input
              type="file"
              accept="image/*"
              onChange={onChange}
              className="hidden"
              ref={fileInputRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Picture;
