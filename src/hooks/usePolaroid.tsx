import usePolaroidStore from "@/stores/zustand/usePolaroidStore";
import { useRef } from "react";

const usePolaroid = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { updatePolaroid } = usePolaroidStore();

  const handleDrop =
    (id: number) => (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) =>
          updatePolaroid(id, { image: e.target?.result as string });
        reader.readAsDataURL(file);
      }
    };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return {
    fileInputRef,
    handleDrop,
    handleDragOver,
  };
};

export default usePolaroid;
