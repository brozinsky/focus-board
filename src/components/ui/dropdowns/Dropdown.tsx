import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, ReactNode } from "react";

type TProps = {
  children: ReactNode;
  trigger?: ReactNode;
  isCenter?: boolean;
  position?: "bottom" | "top" | "screen-bottom-left";
};

export default function Dropdown({
  position = "bottom",
  children,
  trigger,
  isCenter = false,
}: TProps) {
  return (
    <div id="Dropdown" className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button>
            {trigger ? (
              trigger
            ) : (
              <span className="cursor-pointer">Dropdown</span>
            )}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={clsx(
              position === "top" && "bottom-12 left-1/2 -translate-x-1/2 origin-bottom",
              position === "screen-bottom-left" && "absolute bottom-24 left-[3%] z-100 bg-background rounded-lg overflow-hidden",
              position === "bottom" && "origin-top-right",
              "z-50 absolute mt-3 w-56 glass-neutral divide-y divide-neutral-800 rounded-md",
              isCenter ? "left-1/2 -translate-x-1/2" : "right-0"
            )}
          >
            {children}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
