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
import Polaroid from "./Polaroid";
import usePolaroidStore from "@/stores/zustand/usePolaroidStore";
import usePolaroid from "@/hooks/usePolaroid";

export default function Photos() {
  const { polaroids, activeId, addNewPolaroid, updatePolaroid } =
    usePolaroidStore();
  const { fileInputRef, handleFileChange } = usePolaroid();

  useEffect(() => {
    console.log(polaroids);
  }, [polaroids]);

  return (
    <div className="z-50 absolute top-0 left-0 right-0 bottom-10 flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-3xl overflow-x-auto">
        <div className="flex space-x-4 p-4">
          {polaroids.map((polaroid) => (
            <Polaroid {...polaroid} />
          ))}
          <Button
            className="w-16 h-16 rounded-full flex-shrink-0 self-center"
            onClick={addNewPolaroid}
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </div>
      <Input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
      />
      <div className="mt-4 flex space-x-2">
        <Button onClick={() => updatePolaroid(activeId, { sticker: "star" })}>
          <Star className="h-4 w-4" />
        </Button>
        <Button onClick={() => updatePolaroid(activeId, { sticker: "heart" })}>
          <Heart className="h-4 w-4" />
        </Button>
        <Button onClick={() => updatePolaroid(activeId, { sticker: "smile" })}>
          <Smile className="h-4 w-4" />
        </Button>
      </div>
      <link
        href="https://fonts.googleapis.com/css2?family=Caveat&display=swap"
        rel="stylesheet"
      />
    </div>
  );
}
