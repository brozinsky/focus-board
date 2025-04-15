import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import EditHabit from "./EditHabit";

const AddHabit = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <div>
      <div className={cn("flex-center gap-1.5")}>
        <button
          className={
            "button--md button button--full hover:opacity-80 mx-auto !w-full border border-foreground/30"
          }
          onClick={() => setIsEditing(true)}
        >
          <Plus size={20} />
          Add
        </button>
      </div>
      <EditHabit
        variant={"add"}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
    </div>
  );
};

export default AddHabit;
