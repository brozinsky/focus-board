import TeaSVG from "@/components/elements/svg/TeaSVG";
import LightBulbSVG from "@/components/elements/svg/icons/interface/LightBulbSVG";
import PauseIconSVG from "@/components/elements/svg/icons/media/PauseIconSVG";
import PlayIconSVG from "@/components/elements/svg/icons/media/PlayIconSVG";
import { cn } from "@/lib/utils";

interface IProps {
  max: number;
  value: number;
  min: number;
  gaugePrimaryColor: string;
  gaugeSecondaryColor: string;
  className?: string;
  displayValue: string;
  sessionName: string;
  handleStart: () => void;
  handlePause: () => void;
  isRunning: boolean;
}

export default function GaugeCircle({
  max = 100,
  min = 0,
  value = 0,
  gaugePrimaryColor,
  gaugeSecondaryColor,
  className,
  displayValue,
  sessionName,
  handleStart,
  handlePause,
  isRunning,
}: IProps) {
  const circumference = 2 * Math.PI * 45;
  const percentPx = circumference / 100;
  const currentPercent = ((value - min) / (max - min)) * 100;

  return (
    <>
      <div
        className={cn("relative h-40 w-40", className)}
        style={
          {
            "--circle-size": "100px",
            "--circumference": circumference,
            "--percent-to-px": `${percentPx}px`,
            "--gap-percent": "5",
            "--offset-factor": "0",
            "--transition-length": "1s",
            "--transition-step": "200ms",
            "--delay": "0s",
            "--percent-to-deg": "3.6deg",
            transform: "translateZ(0)",
          } as React.CSSProperties
        }
      >
        <svg
          fill="none"
          className="h-full w-full"
          strokeWidth="2"
          viewBox="0 0 100 100"
        >
          {currentPercent <= 90 && currentPercent >= 0 && (
            <circle
              cx="50"
              cy="50"
              r="45"
              strokeWidth="6"
              strokeDashoffset="0"
              strokeLinecap="round"
              strokeLinejoin="round"
              className=" opacity-50"
              style={
                {
                  stroke: gaugeSecondaryColor,
                  "--stroke-percent": 90 - currentPercent,
                  "--offset-factor-secondary": "calc(1 - var(--offset-factor))",
                  strokeDasharray:
                    "calc(var(--stroke-percent) * var(--percent-to-px)) var(--circumference)",
                  transform:
                    "rotate(calc(1turn - 90deg - (var(--gap-percent) * var(--percent-to-deg) * var(--offset-factor-secondary)))) scaleY(-1)",
                  transition: "all var(--transition-length) ease var(--delay)",
                  transformOrigin:
                    "calc(var(--circle-size) / 2) calc(var(--circle-size) / 2)",
                } as React.CSSProperties
              }
            />
          )}
          <circle
            cx="50"
            cy="50"
            r="45"
            strokeWidth="6"
            strokeDashoffset="0"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-100"
            style={
              {
                stroke: gaugePrimaryColor,
                "--stroke-percent": currentPercent,
                strokeDasharray:
                  "calc(var(--stroke-percent) * var(--percent-to-px)) var(--circumference)",
                transition:
                  "var(--transition-length) ease var(--delay),stroke var(--transition-length) ease var(--delay)",
                transitionProperty: "stroke-dasharray,transform",
                transform:
                  "rotate(calc(-90deg + var(--gap-percent) * var(--offset-factor) * var(--percent-to-deg)))",
                transformOrigin:
                  "calc(var(--circle-size) / 2) calc(var(--circle-size) / 2)",
              } as React.CSSProperties
            }
          />
        </svg>
        <span
          data-current-value={currentPercent}
          className="group overflow-hidden w-[300px] flex items-center justify-center text-7xl font-light tracking-widest duration-[var(--transition-length)] delay-[var(--delay)] absolute inset-0 m-auto h-fit ease-linear animate-in fade-in"
        >
          <span className="translate-y-0 transition group-hover:-translate-y-[150%]">
            {displayValue}
          </span>
          <span
            onClick={isRunning ? handlePause : handleStart}
            className="w-full h-full flex items-center justify-center cursor-pointer absolute translate-y-[150%] transition group-hover:translate-y-0"
          >
            {isRunning ? (
              <PauseIconSVG width="50" height="50" />
            ) : (
              <PlayIconSVG width="50" height="50" />
            )}
          </span>
        </span>
        <div className="absolute bottom-14 flex items-center justify-center w-full">
          {/* {sessionName === "Focus" ? <LightBulbSVG width="48"/> : <TeaSVG />} */}
          {sessionName === "Focus" ? null : <TeaSVG />}
        </div>
        <span className="text-xl absolute top-20 text-center w-full">
          {sessionName}
        </span>
      </div>
    </>
  );
}
