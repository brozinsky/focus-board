import React, { useRef, useEffect, useState } from "react";
import { useToggleState } from "@react-stately/toggle";
import { useCheckbox } from "@react-aria/checkbox";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import classNames from "clsx";
import { cn } from "@/lib/utils";

type TProps = {
  isSelected: boolean;
  state: boolean;
  onChange: (state: boolean) => void;
  animationDraw?: boolean;
  animationSwipe?: boolean;
  isDisabled?: boolean;
  children: any;
  variant?: "default" | "dark";
};

const Checkbox = ({
  animationDraw = false,
  animationSwipe = true,
  isDisabled = false,
  ...props
}: TProps) => {
  const state = useToggleState(props);
  const ref = useRef(null);
  const { inputProps } = useCheckbox(props, state, ref);
  const { focusProps, isFocusVisible } = useFocusRing();

  const [checkboxClassName, setCheckboxClassName] = useState("");
  const [svgClassName, setSvgClassName] = useState("");
  const [hasRendered, setHasRendered] = useState(false);

  useEffect(() => {
    const checkboxClassName = classNames(
      "checkbox",
      state.isSelected ? "checkbox--selected" : "checkbox--empty",
      props.variant === "dark" && "dark",
      isDisabled ? "border-neutral-500" : "",
      isFocusVisible ? "shadow-outline" : ""
    );

    const svgClassName = classNames(
      "stroke-current w-3 h-3",
      !state.isSelected ? "translate-y-5" : "translate-y-0",
      animationSwipe ? "transition ease-in-out duration-150" : ""
    );

    setCheckboxClassName(checkboxClassName);
    setSvgClassName(svgClassName);

    // Mark as rendered after first render
    if (!hasRendered) {
      setHasRendered(true);
    }
  }, [
    state.isSelected,
    isFocusVisible,
    animationSwipe,
    isDisabled,
    hasRendered,
  ]);

  const labelClassName = classNames(
    isDisabled ? "checkbox__label--disabled checkbox__label" : "checkbox__label"
  );

  return (
    <label className={"flex items-start group h-fit w-fit"}>
      <VisuallyHidden>
        <input
          {...mergeProps(inputProps, focusProps)}
          disabled={isDisabled}
          ref={ref}
        />
      </VisuallyHidden>
      <div
        className={cn(
          checkboxClassName,
          "mt-0",
          isDisabled && "checkbox--disabled"
        )}
        aria-hidden="true"
      >
        {hasRendered && (
          <svg className={svgClassName} viewBox="0 0 18 18">
            <polyline
              points="1 9 7 14 15 4"
              fill="none"
              strokeWidth={3}
              strokeDasharray={22}
              strokeDashoffset={
                animationDraw ? (state.isSelected ? 44 : 66) : 0
              }
              style={{
                transition: "all 400ms",
              }}
            />
          </svg>
        )}
      </div>
      <span className={labelClassName}>{props.children}</span>
    </label>
  );
};

export default Checkbox;
