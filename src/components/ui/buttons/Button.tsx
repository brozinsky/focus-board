import CloseIconSVG from "@/components/elements/svg/icons/interface/CloseIconSVG";
import PlayIconSVG from "@/components/elements/svg/icons/media/PlayIconSVG";
import { ReactNode } from "react";
import { cva } from "class-variance-authority";
import ExpandSVG from "@/components/elements/svg/icons/interface/ExpandSVG";
import ArrowSmSVG from "@/components/elements/svg/icons/interface/ArrowSmSVG";
import VolumeHiIconSVG from "@/components/elements/svg/icons/media/VolumeHiIconSVG";
import VolumeLoIconSVG from "@/components/elements/svg/icons/media/VolumeLoIconSVG";
import VolumeMuteIconSVG from "@/components/elements/svg/icons/media/VolumeMuteIconSVG";
import SpinnerSVG from "@/components/elements/svg/icons/interface/SpinnerSVG";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/zustand/auth/auth.store";
import { Crown, MoveRight, Plus } from "lucide-react";
import { ROOT_COLORS } from "@/lib/constants/theme.constants";
import TrashIconSVG from "@/components/elements/svg/icons/interface/TrashIconSVG";

type TProps = {
  onClick?: any;
  children?: ReactNode;
  variant?:
    | "neutral"
    | "primary"
    | "ghost"
    | "glass"
    | "glass-ghost"
    | "danger"
    | null
    | undefined;
  icon?: string;
  className?: string;
  shape?: "rectangle" | "circle" | "square" | null | undefined;
  size?: "md" | "sm" | null | undefined;
  isLoading?: boolean;
  isDisabled?: boolean;
  label?: string;
  isDiv?: boolean;
  isPremium?: boolean;
  type?: "submit" | "button";
  width?: "full" | null | undefined;
};

type TLoadingWrapper = {
  children?: ReactNode;
  isLoading?: boolean;
};

const LoadingWrapper = ({ isLoading, children }: TLoadingWrapper) => {
  return isLoading ? <div className="opacity-0">{children}</div> : children;
};

export default function Button({
  isPremium = false,
  children,
  isLoading = false,
  isDisabled = false,
  onClick,
  variant = "neutral",
  icon,
  className,
  shape = "rectangle",
  size = "md",
  label,
  isDiv = false,
  type = "submit",
  width,
}: TProps) {
  const { isLoggedIn } = useAuthStore();

  const classes = cva([className, "button hover:opacity-80"], {
    variants: {
      variant: {
        neutral: "bg-input text-foreground",
        primary: "bg-primary text-foreground-primary",
        ghost:
          "group bg-transparent-500 hover:bg-neutral-500 text-neutral-500 hover:text-neutral-500 font-bold",
        glass: "glass-btn",
        "glass-ghost": "glass-btn-hover",
        danger: "text-black bg-red-500 hover:bg-red-600 hover:opacity-100",
      },
      shape: {
        rectangle: "rounded-xl",
        circle: "rounded-full",
        square: "rounded-xl",
      },
      size: {
        md: "button--md",
        sm: "button--sm",
      },
      width: {
        full: "button--full",
      },
      isLoading: {
        true: "bg-emerald-700 !cursor-default",
      },
      isDisabled: {
        true: "button--disabled",
      },
    },
    compoundVariants: [
      {
        size: "sm",
        shape: "square",
        className: "px-2 py-2",
      },
      {
        size: "sm",
        shape: "circle",
        className: "px-2 py-2",
      },
    ],
  });

  const pathClass = cn({
    "stroke-neutral-100": variant === "neutral",
    "stroke-black": variant === "danger",
  });

  const Component = !isDiv ? "button" : "div";

  return (
    <Component
      type={type}
      aria-label={label}
      onClick={onClick}
      disabled={isDisabled}
      className={classes({
        variant,
        shape,
        size,
        isLoading,
        isDisabled: (!isLoggedIn && isPremium) || isDisabled,
      })}
    >
      <LoadingWrapper isLoading={isLoading}>
        {icon === "play" && <PlayIconSVG pathClass={pathClass} />}
        {icon === "volume-hi" && <VolumeHiIconSVG />}
        {(icon === "volume" || icon === "volume-lo") && <VolumeLoIconSVG />}
        {icon === "volume-mute" && <VolumeMuteIconSVG />}
        {icon === "plus" && <Plus size={20} />}
        {icon === "trash" && <TrashIconSVG pathClass={pathClass} />}
        {icon === "close" && <CloseIconSVG pathClass={pathClass} />}
        {icon === "expand" && (
          <ExpandSVG
            className="-rotate-90"
            pathClass="transition fill-neutral-300 group-hover:fill-neutral-100"
          />
        )}
        {icon === "arrow-sm-top" && (
          <ArrowSmSVG
            direction="top"
            pathClass="transition stroke-neutral-300 group-hover:stroke-neutral-100"
          />
        )}
      </LoadingWrapper>

      <LoadingWrapper isLoading={isLoading}>
        {children}{" "}
        {icon === "longarrow-right" && (
          <MoveRight strokeWidth={1.5} size={20} />
        )}
        {!isLoggedIn && isPremium && (
          <Crown size={16} color={ROOT_COLORS.premium} />
        )}
      </LoadingWrapper>
      {isLoading && (
        <div className=" absolute left-1/2 -rotate-90 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <SpinnerSVG
            className="origin-center"
            pathClass="stroke-neutral-800"
          />
        </div>
      )}
    </Component>
  );
}
