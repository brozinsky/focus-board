import ArrowSmSVG from "@/components/elements/svg/icons/interface/ArrowSmSVG";
import { cn } from "@/lib/utils";
import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment } from "react";

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
}: TProps) {
  // const [state, setState] = useState(
  //   defaultValue ? defaultValue : options[0].value
  // );

  return (
    <Listbox
      id="Select"
      as={"div"}
      className={cn(
        `select-input select-input--${variant}`,
        size && `select-input--${size}`
      )}
      value={state}
      onChange={setState}
    >
      {label && (
        <Listbox.Label className={" select-input__label block"}>
          {label}
        </Listbox.Label>
      )}
      <div className={clsx(buttonClassName, "overflow-hidden")}>
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
          className={clsx(
            contentType === "type" && "select-input__list--type",
            contentType === "tonic" && "select-input__list--tonic",
            "select-input__list",
            position && `select-input__list--${position}`
          )}
        >
          {options.map(({ id, name, value }: any) => (
            <Listbox.Option
              key={id}
              className={({ active }: any) =>
                `select-input__option ${
                  active && "select-input__option--active"
                }`
              }
              value={value}
            >
              <span
                className={`block truncate ${
                  value === state ? "font-bold" : ""
                }`}
              >
                {name}
              </span>
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
}
