import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog/Dialog";
import useEditHabitMutation from "@/stores/supabase/useEditHabitMutation";
import { cn } from "@/lib/utils";
import Checkbox from "@/components/ui/inputs/Checkbox";
import Button from "@/components/ui/buttons/Button";
import ButtonIcon from "@/components/ui/buttons/ButtonIcon";
import { z } from "zod";
import useAppForm from "@/hooks/forms/useAppForm";
import { format } from "date-fns";
import { DAYS_OF_WEEK } from "@/lib/constants/habits.constants";
import useAddHabitMutation from "@/stores/supabase/useAddHabitMutation";
import { THabitsForm } from "@/types/query/habits.types";

type TProps = {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  habitName?: string;
  onDelete?: () => void;
  habitId?: string;
  variant?: "edit" | "add";
};

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  startDate: z.date(),
  endDate: z.date().nullable(),
  selectedDays: z.record(z.boolean()),
});

const EditHabit = ({
  variant = "edit",
  habitId,
  isEditing,
  setIsEditing,
  habitName,
  onDelete,
}: TProps) => {
  const { mutateAsync: mutateEditAsync, isPending: isPendingEdit } =
    useEditHabitMutation();
  const { mutateAsync: mutateAddAsync, isPending: isPendingAdd } =
    useAddHabitMutation();

  const isLoading = isPendingEdit || isPendingAdd;

  const [isEndDate, setIsEndDate] = useState<boolean>(false);

  const form = useAppForm<
    THabitsForm,
    undefined,
    typeof formSchema,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined
  >({
    defaultValues: {
      title: habitName ?? "",
      startDate: new Date(),
      endDate: null,
      selectedDays: DAYS_OF_WEEK.reduce(
        (acc, day) => ({ ...acc, [day.id]: true }),
        {}
      ),
    },
    validators: {
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      const values = {
        ...value,
        endDate: isEndDate ? value.endDate : null,
      };

      try {
        if (variant === "add") {
          await mutateAddAsync(values);
        } else {
          await mutateEditAsync({ habitId: habitId!, values });
        }

        form.reset();

        handleClose();
      } catch (err) {
        console.error("Mutation error:", err);
      }

      // alert(JSON.stringify(values, null, 2));
    },
  });

  const toggleIsEndDate = () => {
    if (isEndDate) {
      setIsEndDate(false);
      form.setFieldValue("endDate", null);
    } else {
      setIsEndDate(true);
      form.setFieldValue(
        "endDate",
        new Date(new Date().setDate(new Date().getDate() + 14))
      );
    }
  };

  const handleClose = () => setIsEditing(false);

  const handleDelete = () => {
    onDelete && onDelete();
    handleClose();
  };

  return (
    <Dialog open={isEditing} onOpenChange={handleClose}>
      <DialogOverlay className={"z-10 backdrop-blur-sm"} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {variant === "add" ? "Add Habit" : "Edit Habit"}
          </DialogTitle>
          <DialogDescription>
            {variant === "add"
              ? "Create your new habit and start tracking it."
              : "Change the name of your habit or delete it permanently."}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="flex flex-col gap-4"
        >
          <form.AppField
            name="title"
            children={(field) => (
              <field.Input
                className="w-full ml-1 text-xl"
                type="text"
                placeholder="Habit name"
                required
                onChange={(e) => field.handleChange(e.target.value)}
                value={field.state.value}
                disabled={isLoading}
              />
            )}
          />

          <div className="settings__label settings__label--full">
            <label>Start date</label>
            <form.AppField
              name="startDate"
              children={(field) => (
                <field.DatePicker
                  date={field.state.value}
                  onDateChange={(d) => field.handleChange(d!)}
                  placeholder="Pick a date"
                  disabled={isLoading}
                />
              )}
            />
          </div>

          <div className="settings__label settings__label--full">
            <label>End date</label>
            <div className="flex flex-row items-center gap-2">
              <Checkbox
                isDisabled={isLoading}
                isSelected={isEndDate}
                state={isEndDate}
                onChange={toggleIsEndDate}
              />
              <form.AppField
                name="endDate"
                children={(field) => (
                  <field.DatePicker
                    date={field.state.value as Date}
                    onDateChange={(d) => field.handleChange(d!)}
                    disabled={!isEndDate || isLoading}
                    className={cn("relative", !isEndDate && "opacity-50")}
                    displayValue={
                      isEndDate
                        ? format(field.state.value as Date, "dd/MM/yyyy")
                        : "Never"
                    }
                  />
                )}
              />
            </div>
          </div>

          <div className="settings__label settings__label--full">
            <label>Repeat days</label>
            <form.AppField
              name="selectedDays"
              children={(field) => (
                <div className="flex flex-row items-center gap-2">
                  {DAYS_OF_WEEK.map((day) => (
                    <ButtonIcon
                      disabled={isLoading}
                      key={day.id}
                      size="sm"
                      variant="toggle"
                      icon={<span>{day.name}</span>}
                      onClick={() =>
                        field.handleChange({
                          ...field.state.value,
                          [day.id]: !field.state.value[day.id],
                        })
                      }
                      className={field.state.value[day.id] ? "active" : ""}
                    />
                  ))}
                </div>
              )}
            />
          </div>

          <div className="flex flex-row gap-4 justify-between w-full mt-8">
            {variant === "edit" && (
              <Button
                isDisabled={isLoading}
                onClick={handleDelete}
                type="button"
                icon="trash"
                variant="danger"
              >
                Delete
              </Button>
            )}
            <div className="flex flex-row gap-2 ml-auto">
              <Button
                type="button"
                onClick={handleClose}
                isDisabled={isLoading}
              >
                Cancel
              </Button>

              <Button type="submit" variant="primary" isDisabled={isLoading}>
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
