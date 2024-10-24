import React, { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Heart,
  Smile,
  Plus,
} from "lucide-react";
import { Input } from "@/components/ui/inputs/Input";
import Button from "@/components/ui/buttons/Button";
import { cn } from "@/lib/utils";
import usePolaroidStore from "@/stores/zustand/usePolaroidStore";
import usePolaroid from "@/hooks/usePolaroid";

type TPolaroid = {
  id: number;
  image: string | null;
  caption: string;
  tilt: "left" | "center" | "right";
  sticker: "star" | "heart" | "smile" | null;
};

const Polaroid = (props: TPolaroid) => {
  const { activeId, setActiveId, updatePolaroid } = usePolaroidStore();
  const { fileInputRef, handleDrop, handleDragOver } = usePolaroid();

  const getStickerComponent = (sticker: TPolaroid["sticker"]) => {
    switch (sticker) {
      case "star":
        return <Star className="w-8 h-8 text-yellow-400" />;
      case "heart":
        return <Heart className="w-8 h-8 text-red-500" />;
      case "smile":
        return <Smile className="w-8 h-8 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div
      key={props.id}
      className={cn(
        `relative bg-white p-4 shadow-md transition-transform hover:rotate-0 flex-shrink-0`,
        props.tilt === "left" && "rotate-2",
        props.tilt === "right" && "-rotate-2"
      )}
      style={{ width: "300px", height: "380px" }}
      onMouseEnter={() => setActiveId(props.id)}
    >
      <div
        className="w-full h-64 bg-gray-200 mb-4 flex items-center justify-center cursor-pointer relative"
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {props.image ? (
          <img
            src={props.image}
            alt="Uploaded"
            className="w-full h-full object-cover"
          />
        ) : (
          <p className="text-gray-500">Click or drag to add photo</p>
        )}
        {props.sticker && (
          <div className="absolute top-2 left-2 transform -rotate-12">
            {getStickerComponent(props.sticker)}
          </div>
        )}
      </div>
      <Input
        type="text"
        placeholder="Add a caption..."
        value={props.caption}
        onChange={(e) => updatePolaroid(props.id, { caption: e.target.value })}
        className="w-full bg-transparent border-none text-center focus:outline-none"
        style={{ fontFamily: "'Caveat', cursive", fontSize: "1.2rem" }}
      />
      {activeId === props.id && (
        <div className="absolute -top-20 left-0 right-0 flex justify-between p-2 bg-black bg-opacity-50">
          <Button
            variant="ghost"
            onClick={() => updatePolaroid(props.id, { tilt: "left" })}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            onClick={() => updatePolaroid(props.id, { tilt: "center" })}
          >
            <ChevronLeft className="h-4 w-4 opacity-0" />
          </Button>
          <Button
            variant="ghost"
            onClick={() => updatePolaroid(props.id, { tilt: "right" })}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Polaroid;
