import React, { useEffect } from "react";
import Button from "@/components/ui/buttons/Button";
import useAddHabitMutation from "@/stores/supabase/useAddHabitMutation";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/inputs/Input";
import { useForm } from "react-hook-form";
import useHabitsQuery from "@/stores/supabase/useHabitsQuery";

type TFormValues = {
  name: string;
};

const NewHabitForm = () => {
  const {
    mutate: addHabit,
    isPending: isPendingAdd,
    isSuccess: isSuccessAdd,
  } = useAddHabitMutation();
  const { refetch } = useHabitsQuery();

  useEffect(() => {
    isSuccessAdd && refetch();
  }, [isSuccessAdd]);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<TFormValues>();

  const onSubmit = async (data: TFormValues) => {
    try {
      await addHabit(data.name);

      reset();
    } catch (error) {
      setError("root", {
        message: "Error adding new habit",
      });
    }
  };

  return (
    <div>
      <form
        className={cn(isPendingAdd && "opacity-15", "flex-center gap-1.5")}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          id="name"
          className="w-full ml-1"
          type="text"
          {...register("name")}
          placeholder={"Add a new habit"}
          required
        />
        <Button className={"mx-auto"} type="submit">
          Add+
        </Button>
      </form>
      {errors.root && (
        <p className="text-red-500 mt-2 text-sm ml-4">{errors.root.message}</p>
      )}
      {/* <DevTool control={control} /> */}
    </div>
  );
};

export default NewHabitForm;
