import useWindowsStore from "@/stores/zustand/global/windows.store";
import { motion } from "framer-motion";
import CloseIconSVG from "@/components/elements/svg/icons/interface/CloseIconSVG";
import { cn } from "@/lib/utils";
import useThemeStore from "@/stores/zustand/global/theme.store";
import TodoListSm from "./TodoListSm";

const TodoListMobile = () => {
  const { setIsOpen } = useWindowsStore();
  const { themeStyle } = useThemeStore();

  return (
    <div
      id="TodoListModal"
      className={"modal"}
      onClick={() => setIsOpen("todoList", false)}
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
          <div className="block md:hidden text-xl mb-8 text-center">Todo list</div>
          <TodoListSm />
        </div>
      </motion.div>
    </div>
  );
};

export default TodoListMobile;
