import Button from "@/components/ui/buttons/Button";
import { DatePicker } from "@/components/ui/datepicker/Datepicker";
import Select from "@/components/ui/dropdowns/Select";
import Checkbox from "@/components/ui/inputs/Checkbox";
import { Input } from "@/components/ui/inputs/Input";
import WeekDaysMulti from "@/components/ui/inputs/WeekDaysMulti";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import React from "react";

const { fieldContext, formContext } = createFormHookContexts()

const { useAppForm } = createFormHook({
  fieldComponents: {
    Input,
    Select,
    DatePicker,
    Checkbox,
    WeekDaysMulti
  },
  formComponents: {
    Button,
  },
  fieldContext,
  formContext,
});

export default useAppForm;
