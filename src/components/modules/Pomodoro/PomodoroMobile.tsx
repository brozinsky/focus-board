import useWindowsStore from "@/stores/zustand/useWindowsStore";
import { motion } from "framer-motion";
import CloseIconSVG from "@/components/elements/svg/icons/interface/CloseIconSVG";
import { cn } from "@/lib/utils";
import useThemeStore from "@/stores/zustand/useThemeStore";
import PomodoroSm from "./PomodoroSm";

const PomodoroMobile = () => {
  const { setIsOpen } = useWindowsStore();
  const { themeStyle } = useThemeStore();

  return (
    <div
      id="PomodoroModal"
      className={"modal"}
      onClick={() => setIsOpen("pomodoro", false)}
    >
      <button className={"modal__close"}>
        <CloseIconSVG />
      </button>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "modal__card !max-w-md my-auto",
          themeStyle == "glass" && "modal__card--glass"
        )}
      >
        <div className="py-6 px-4">
          <div className="block md:hidden text-xl mb-8 text-center">Pomodoro timer</div>
          <PomodoroSm />
        </div>
      </motion.div>
    </div>
  );
};

export default PomodoroMobile;
