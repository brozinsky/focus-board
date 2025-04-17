import useWindowsStore from "@/stores/zustand/global/windows.store";
import { motion } from "framer-motion";
import CloseIconSVG from "@/components/elements/svg/icons/interface/CloseIconSVG";
import { cn } from "@/lib/utils";
import useThemeStore from "@/stores/zustand/global/theme.store";
import TimerSm from "./TimerSm";

const TimerMobile = () => {
  const { setIsOpen } = useWindowsStore();
  const { themeStyle } = useThemeStore();

  return (
    <div
      id="TimerModal"
      className={"modal"}
      onClick={() => setIsOpen("timer", false)}
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
        <div className="py-4 px-4">
          <div className="block md:hidden text-xl mb-8 text-center">
            Timer
          </div>
          <TimerSm />
        </div>
      </motion.div>
    </div>
  );
};

export default TimerMobile;
