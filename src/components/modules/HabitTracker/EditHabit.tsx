import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog/Dialog";
import Button from "@/components/ui/buttons/Button";
import { Input } from "@/components/ui/inputs/Input";
import useEditHabitMutation from "@/stores/supabase/useEditHabitMutation";
import { useForm } from "react-hook-form";

type TProps = {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  habitName: string;
  onDelete: () => void;
  habitId: string;
};

type TFormValues = {
  title: string;
};

const EditHabit = ({
  habitId,
  isEditing,
  setIsEditing,
  habitName,
  onDelete,
}: TProps) => {
  const { mutate } = useEditHabitMutation();

  const { register, handleSubmit } = useForm<TFormValues>({
    defaultValues: {
      title: habitName,
    },
  });

  const handleClose = () => {
    setIsEditing(false);
  };

  const handleSave = async (formData: { title: string }) => {
    await mutate({ habitId: habitId, newTitle: formData.title });
    handleClose();
  };

  const handleDelete = () => {
    onDelete();
    handleClose();
  };

  return (
    <Dialog open={isEditing} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Habit</DialogTitle>
          <DialogDescription>
            Change the name of your habit or delete it permanently.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleSave)}>
          <div>
            <Input
              id="title"
              className="w-full ml-1 text-xl"
              type="text"
              {...register("title")}
              placeholder={""}
              required
            />
          </div>
          <div className="flex flex-row gap-4 justify-between w-full mt-8">
            <Button
              onClick={handleDelete}
              type={"button"}
              icon="trash"
              variant={"danger"}
            >
              Delete
            </Button>
            <div className="flex flex-row gap-2">
              <Button type={"button"} onClick={handleClose}>
                Cancel
              </Button>
              <Button
                onClick={() => handleSubmit(handleSave)}
                type={"submit"}
                variant={"primary"}
              >
                Confirm
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditHabit;
