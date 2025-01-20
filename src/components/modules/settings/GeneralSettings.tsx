import { Switch } from "@/components/ui/buttons/Switch";
import Select from "@/components/ui/dropdowns/Select";
import { themeColors } from "@/lib/constants/const-theme";
import useQuoteStore from "@/stores/zustand/useQuoteStore";
import useSceneStore from "@/stores/zustand/useSceneStore";
import useThemeStore from "@/stores/zustand/useThemeStore";
import React from "react";

const fontFamilyOptions = [
  {
    id: 0,
    value: "WorkSans",
    name: "WorkSans",
  },
  {
    id: 1,
    value: "Quicksand",
    name: "Quicksand",
  },
  {
    id: 2,
    value: "HelveticaNeue",
    name: "Helvetica Neue",
  },
];

const themeStyleOptions = [
  {
    id: 0,
    value: "solid",
    name: "Solid",
  },
  {
    id: 1,
    value: "glass",
    name: "Glass",
  },
];

const uiStyleOptions = [
  {
    id: 0,
    value: "ghost",
    name: "Ghost",
  },
  {
    id: 1,
    value: "glass",
    name: "Glass",
  },
];

const themeColorsArray = Object.entries(themeColors).map(([key, value]) => ({
  value: key,
  name: value.name,
  theme: value,
}));

const transformThemeColors = (colors: typeof themeColors) => {
  return Object.keys(colors).map((key) => ({
    id: key,
    name: colors[key].name,
    value: key,
    isPremium: colors[key].isPremium,
  }));
};

const themeColorOptions = transformThemeColors(themeColors);

const themeColorsOptions = [
  {
    id: 0,
    name: "Purple",
    colors: {
      primary: "#a855f7",
    },
  },
  {
    id: 1,
    name: "Emerald",
    colors: {
      primary: "#10b981",
    },
  },
  {
    id: 2,
    name: "Blue",
    colors: {
      primary: "#3b82f6",
    },
  },
];

const GeneralSettings = () => {
  const { fontFamily, setFontFamily } = useSceneStore();
  const {
    colorTheme,
    setColorTheme,
    setThemeStyle,
    themeStyle,
    uiStyle,
    setUIStyle,
  } = useThemeStore();
  const currentThemeName = themeColorOptions.find(
    (option) => option.value === colorTheme.name
  )?.name;

  const handleThemeChange = (selectedValue: string) => {
    const selectedTheme = themeColors[selectedValue];
    setColorTheme(selectedTheme);
  };

  // const {
  //   currentVideo,
  //   currentAudio,
  //   isSharedVideoAndAudio,
  //   setIsSharedVideoAndAudio,
  // } = usePlayerStore();
  const { isQuoteActive, setIsQuoteActive } = useQuoteStore();

  return (
    <>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center max-w-sm">
          <div>Show quotes</div>
          <Switch checked={isQuoteActive} onCheckedChange={setIsQuoteActive} />
        </div>
      </div>
      <div className="flex flex-row justify-between max-w-sm">
        <label htmlFor="time-option">Theme color</label>
        <div className="relative">
          <Select
            buttonClassName="w-[160px]"
            size={"sm"}
            variant={"glass"}
            options={themeColorOptions}
            state={colorTheme.name}
            setState={handleThemeChange}
            displayValue={currentThemeName}
          />
          <span className="absolute bottom-1/2 translate-y-1/2 -right-12 bg-primary w-8 h-8 rounded-sm"></span>
        </div>
      </div>
      {/* <div className="flex justify-end max-w-sm items-center gap-2">
        <span className="bg-primary w-8 h-8 rounded-sm"></span>
        <span className="bg-secondary w-8 h-8 rounded-sm"></span>
        <span className="bg-foreground w-8 h-8 rounded-sm"></span>
        <span className="bg-background border-white/40 border w-8 h-8 rounded-sm"></span>
      </div> */}
      <div className="flex flex-row justify-between max-w-sm">
        <label htmlFor="time-option">Theme style</label>
        <Select
          isPremium={true}
          buttonClassName="w-[160px]"
          size={"sm"}
          variant={"glass"}
          options={themeStyleOptions}
          state={themeStyle}
          setState={setThemeStyle}
          displayValue={
            themeStyleOptions.find((item) => item.value === themeStyle)?.name
          }
        />
      </div>
      <div className="flex flex-row justify-between max-w-sm">
        <label htmlFor="time-option">Button interface style</label>
        <Select
          isPremium={true}
          buttonClassName="w-[160px]"
          size={"sm"}
          variant={"glass"}
          options={uiStyleOptions}
          state={uiStyle}
          setState={setUIStyle}
          displayValue={
            uiStyleOptions.find((item) => item.value === uiStyle)?.name
          }
        />
      </div>
      <div className="flex flex-row justify-between max-w-sm">
        <label htmlFor="time-option">Font</label>
        <Select
          isPremium={true}
          buttonClassName="w-[160px]"
          size={"sm"}
          variant={"glass"}
          options={fontFamilyOptions}
          displayValue={
            fontFamilyOptions.find((item) => item.value === fontFamily)?.name
          }
          state={fontFamily}
          setState={setFontFamily}
        />
      </div>
      {/* <div className="flex justify-between items-center max-w-sm">
        <div>Use same video and audio source</div>
        <Switch
          checked={isSharedVideoAndAudio}
          onCheckedChange={setIsSharedVideoAndAudio}
        />
      </div> */}
      {/* <div className="flex flex-row gap-8">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <div>Video</div>
          </div>
          <div className="modal__image-wrap">
            {currentVideo?.imgHi ? (
              <img
                onClick={() => setIsOpen("scene", true)}
                className="aspect-video object-cover modal__image"
                src={currentVideo.imgHi.url}
                loading={"lazy"}
                height={198}
                width={352}
                alt={currentVideo.title}
              />
            ) : (
              <div className="aspect-video bg-white/50 flex items-center justify-center">
                <PictureSVG pathClass="stroke-neutral-500" width={60} />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <div>Audio</div>
          </div>
          <div className="modal__image-wrap">
            {currentVideo?.imgHi && currentAudio?.imgHi ? (
              <img
                onClick={() => {
                  if (!isSharedVideoAndAudio) {
                    setIsOpen("playlist", true);
                  }
                }}
                className={clsx(
                  isSharedVideoAndAudio && "modal__image--disabled",
                  "aspect-video object-cover modal__image"
                )}
                src={
                  isSharedVideoAndAudio
                    ? currentVideo.imgHi.url
                    : currentAudio.imgHi.url
                }
                loading={"lazy"}
                height={198}
                width={352}
                alt={
                  isSharedVideoAndAudio
                    ? currentVideo.title
                    : currentAudio.title
                }
              />
            ) : (
              <div className="aspect-video bg-white/50 flex items-center justify-center">
                <PictureSVG pathClass="stroke-neutral-500" width={60} />
              </div>
            )}
          </div>
        </div>
      </div> */}
    </>
  );
};

export default GeneralSettings;
