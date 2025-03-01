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

const JournalSheetSettings = () => {
  const {
    sheetBgColor,
    setSheetBgColor,
    sheetBg,
    setSheetBg,
    fontFamily,
    setFontFamily,
  } = useJournalStore();

  return (
    <div className="grid grid-cols-3 gap-8 items-center">
      <div className="flex items-center justify-between gap-2 w-full">
        <FileText className="w-4 h-4 text-foreground-muted" />
        <div className="w-10/12">
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
        <div className="w-10/12">
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
        <div className="w-10/12">
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
  );
};

export default JournalSheetSettings;
