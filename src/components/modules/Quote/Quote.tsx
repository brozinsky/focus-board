import ButtonIcon from "@/components/ui/buttons/ButtonIcon";
import { QuoteIcon } from "lucide-react";
import useWindowsStore from "@/stores/zustand/useWindowsStore";
import QuoteWindow from "./QuoteWindow";

const Quote = () => {
  const { isOpen, setIsOpen } = useWindowsStore();

  if (!isOpen.quote) {
    return (
      <ButtonIcon
        className="z-20 top-2 left-2 absolute"
        onClick={() => setIsOpen("quote", !isOpen.quote)}
        icon={<QuoteIcon />}
        tooltip={"Show quotes"}
      />
    );
  }

  return <QuoteWindow />;
};

export default Quote;
