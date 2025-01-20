import ArrowSmSVG from "@/components/elements/svg/icons/interface/ArrowSmSVG";
import { cn } from "@/lib/utils";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import BadgePremium from "../badge/BadgePremium";
import { useAuthStore } from "@/stores/zustand/auth/useAuthStore";

type TProps = {
  label?: string;
  options: any;
  defaultValue?: string;
  variant?: "base" | "ghost" | "glass" | "outlined";
  state: any;
  setState: any;
  displayValue?: string;
  buttonClassName?: string;
  contentType?: "type" | "tonic" | undefined;
  size?: "sm" | undefined;
  position?: "top" | "bottom";
  isPremium?: boolean;
};

export default function Select({
  variant = "base",
  label,
  options,
  contentType,
  state,
  setState,
  displayValue,
  buttonClassName,
  position,
  size,
  isPremium,
}: TProps) {
  const { isLoggedIn } = useAuthStore();

  // const [state, setState] = useState(
  //   defaultValue ? defaultValue : options[0].value
  // );

  return (
    <>
      <Listbox
        id="Select"
        as={"div"}
        className={cn(
          `select-input select-input--${variant}`,
          size && `select-input--${size}`,
          isPremium && !isLoggedIn && `select-input--disabled`
        )}
        value={state}
        onChange={setState}
        disabled={isPremium && !isLoggedIn}
      >
        {label && (
          <Listbox.Label className={"select-input__label block"}>
            {label}
          </Listbox.Label>
        )}
        <div className={cn(buttonClassName, "overflow-hidden")}>
          <Listbox.Button
            className={
              "select-input__button relative truncate nowrap overflow-hidden text-ellipsis"
            }
          >
            {displayValue ? displayValue : state}
            <span className="absolute right-1.5 top-2">
              <ArrowSmSVG
                width={12}
                className="rotate-90 "
                pathClass="stroke-white"
              />
            </span>
          </Listbox.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Listbox.Options
            className={cn(
              "select-input__list",
              contentType === "type" && "select-input__list--type",
              contentType === "tonic" && "select-input__list--tonic",
              position && `select-input__list--${position}`
            )}
          >
            {options.map((option: any) => (
              <Listbox.Option
                key={option.id}
                disabled={option.isPremium && !isLoggedIn}
                className={({ active }: any) =>
                  cn(
                    "select-input__option flex flex-row gap-2",
                    active && "select-input__option--active"
                  )
                }
                value={option.value}
              >
                <span
                  className={cn(
                    "block truncate",
                    option.value === state && "font-bold",
                    option.isPremium && !isLoggedIn && "opacity-50"
                  )}
                >
                  {option.name}
                </span>
                {option.isPremium && !isLoggedIn && (
                  <BadgePremium
                    className="absolute top-1/2 -translate-y-1/2 right-2"
                    background="transparent"
                    size="sm"
                  />
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
        {isPremium && !isLoggedIn && (
          <BadgePremium className="absolute top-0 -right-20 z-20" />
        )}
      </Listbox>
    </>
  );
}
