import React, { useEffect } from "react";
import {
  Plus,
} from "lucide-react";
import Button from "@/components/ui/buttons/Button";
import Polaroid from "./Polaroid";
import usePolaroidStore from "@/stores/zustand/usePolaroidStore";

export default function Photos() {
  const { polaroids, addNewPolaroid } = usePolaroidStore();

  return (
    <div className="z-50 absolute top-0 left-0 right-0 bottom-10 flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-3xl overflow-x-auto">
        <div className="flex space-x-4 p-20">
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

      <link
        href="https://fonts.googleapis.com/css2?family=Caveat&display=swap"
        rel="stylesheet"
      />
    </div>
  );
}
