import { Separator } from "@/components/ui/Separator/Separator";
import SceneSettings from "@/components/modules/settings/SceneSettings";
import Select from "@/components/ui/dropdowns/Select";
import { themeColors } from "@/lib/constants/const-theme";
import useThemeStore from "@/stores/zustand/useThemeStore";
import { useEffect } from "react";

const transformThemeColors = (colors: typeof themeColors) => {
  return Object.keys(colors).map((key) => ({
    id: key,
    name: colors[key].name,
    value: key,
    isPremium: colors[key].isPremium,
  }));
};

const themeColorOptions = transformThemeColors(themeColors);

const OnboardingBackgroundContent = () => {
  const { colorTheme, setColorTheme } = useThemeStore();
  const currentThemeName = themeColorOptions.find(
    (option) => option.value === colorTheme.name
  )?.name;
  const handleThemeChange = (selectedValue: string) => {
    const selectedTheme = themeColors[selectedValue];
    setColorTheme(selectedTheme);
  };
  return (
    <div>
      <h1 className="text-3xl mb-4 font-normal">Set up your background</h1>
      <p className="text-lg text mb-4">
        Next up, personalize your workspace with a background that fits your
        style.
      </p>
      <div className="flex flex-row justify-between max-w-sm">
        <label htmlFor="time-option">Theme color</label>
        <Select
          buttonClassName="w-[160px]"
          size={"sm"}
          variant={"glass"}
          options={themeColorOptions}
          state={colorTheme.name}
          setState={handleThemeChange}
          displayValue={currentThemeName}
        />
      </div>
      <div className="flex justify-end max-w-sm items-center gap-2">
        <span className="bg-primary w-8 h-8 rounded-sm"></span>
        <span className="bg-secondary w-8 h-8 rounded-sm"></span>
        <span className="bg-foreground w-8 h-8 rounded-sm"></span>
        <span className="bg-background border-white/40 border w-8 h-8 rounded-sm"></span>
      </div>
    </div>
  );
};

export default OnboardingBackgroundContent;
