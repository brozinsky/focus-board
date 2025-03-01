import Select from "@/components/ui/dropdowns/Select";
import {
  JOURNAL_BG_COLORS,
  JOURNAL_FONTS,
  JOURNAL_SHEETS,
} from "@/lib/constants/const-journal";
import { Contrast, FileText, Type } from "lucide-react";
import {
  TJournalBgColors,
  TJournalFonts,
  TJournalSheets,
} from "@/types/model-types";
import { useJournalStore } from "@/stores/zustand/useJournalStore";
import { motion } from "framer-motion";
import CloseIconSVG from "@/components/elements/svg/icons/interface/CloseIconSVG";
import SettingsIconSVG from "@/components/elements/svg/icons/interface/SettingsIconSVG";
import { cn } from "@/lib/utils";
import useThemeStore from "@/stores/zustand/useThemeStore";
import useWindowsStore from "@/stores/zustand/useWindowsStore";

const JournalSheetSettings = () => {
  const { themeStyle } = useThemeStore();
  const { isOpen, setIsOpen } = useWindowsStore();
  const {
    sheetBgColor,
    setSheetBgColor,
    sheetBg,
    setSheetBg,
    fontFamily,
    setFontFamily,
  } = useJournalStore();

  if (!isOpen.journalSettings) return;

  return (
    <div
      id="JournalSheetSettings"
      className={"modal modal--centered"}
      onClick={() => setIsOpen("journalSettings", !isOpen.journalSettings)}
    >
      <button className={"modal__close"}>
        <CloseIconSVG />
      </button>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "modal__card modal__card--overflow-visible !w-[400px]",
          themeStyle == "glass" && "modal__card--glass"
        )}
      >
        <div className={"p-8 gap-6 flex flex-col"}>
          <h3 className="flex flex-row items-center text-xl gap-3 tracking-wide">
            <SettingsIconSVG /> Journal settings
          </h3>
          <div className="flex flex-col gap-8 items-center">
            <div className="flex items-center justify-between gap-2 w-full">
              <FileText className="w-4 h-4 text-foreground-muted" />
              <div className="w-full">
                <Select
                  buttonClassName="w-full"
                  size="sm"
                  variant="glass"
                  options={JOURNAL_SHEETS}
                  state={sheetBg}
                  setState={(value: TJournalSheets) => setSheetBg(value)}
                  displayValue={sheetBg}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 w-full">
              <Type className="w-4 h-4 text-foreground-muted" />
              <div className="w-full">
                <Select
                  buttonClassName="w-full"
                  size="sm"
                  variant="glass"
                  options={JOURNAL_FONTS}
                  state={fontFamily}
                  setState={(selectedValue: TJournalFonts) =>
                    setFontFamily(selectedValue)
                  }
                  displayValue={fontFamily}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 w-full">
              <Contrast className="w-4 h-4 text-foreground-muted" />
              <div className="w-full">
                <Select
                  buttonClassName="w-full"
                  size="sm"
                  variant="glass"
                  options={JOURNAL_BG_COLORS}
                  state={sheetBgColor}
                  setState={(value: TJournalBgColors) => setSheetBgColor(value)}
                  displayValue={sheetBgColor}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default JournalSheetSettings;
