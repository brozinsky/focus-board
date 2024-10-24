import usePolaroidStore from "@/stores/zustand/usePolaroidStore";
import { useRef } from "react";

const usePolaroid = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { updatePolaroid, activeId } = usePolaroidStore();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) =>
        updatePolaroid(activeId, { image: e.target?.result as string });
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) =>
        updatePolaroid(activeId, { image: e.target?.result as string });
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return {
    fileInputRef,
    handleFileChange,
    handleDrop,
    handleDragOver,
  };
};

export default usePolaroid;
