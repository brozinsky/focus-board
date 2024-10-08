import React from "react";
import Volume from "@/components/modules/settings/_partials/Volume";
import Button from "@/components/ui/buttons/Button";
import { Separator } from "@/components/ui/Separator/Separator";
import useVolume from "@/hooks/useVolume";
import usePlayerStore from "@/stores/zustand/usePlayerStore";
import Marquee from "react-fast-marquee";

const OnboardingAudioContent = ({ step }: { step: number }) => {
  const { changeVolume, toggleMute, getVolumeIcon, volumeAudio } = useVolume();
  const { currentAudio } = usePlayerStore();

  return (
    <div>
      <h1 className="text-3xl mb-4 font-normal">Select your audio</h1>
      <p className="text-lg text mb-4">
        Start by choosing the perfect background audio to set the tone for your
        session.
      </p>
      <p className="text-lg text mb-4">
        Whether you want something calming or energizing, we've got options.
      </p>
      {currentAudio && (
        <>
          <Separator className="my-4 bg-white/30" />
          <div className="max-w-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex flex-row gap-1 items-center whitespace-nowrap">
                Now playing:
              </div>
              <div>
                {currentAudio && (
                  <Marquee direction="left" speed={10} pauseOnHover>
                    {currentAudio.title}
                  </Marquee>
                )}
              </div>
            </div>
            <div className="mb-2">Audio track volume</div>
            <div className="flex-center gap-2">
              <Button
                label="Toggle mute"
                onClick={toggleMute}
                icon={getVolumeIcon(volumeAudio)}
                size="sm"
                variant="ghost"
              />
              <Volume volume={volumeAudio} handleVolumeChange={changeVolume} />
            </div>
          </div>
        </>
      )}
      {/* <p className="text-lg text my-4">
        Remember you can change your audio any time by clicking the{" "}
        <MusicNoteSVG className="inline stroke-foreground h-5" /> button on a
        bottom panel.
      </p> */}
      {step === 1 && (
        <>
          <Separator className="my-4 bg-white/30" />
          <p className="text-lg text mb-4">
            You can tweak the additional sound effects and adjust the volumes.
          </p>
        </>
      )}
      {/* <p className="text-lg text mb-4">
        Or you can change it in app by pressing the{" "}
        <MixerIconSVG className="inline stroke-foreground h-5" /> button on a
        bottom panel.
      </p> */}
      {/* <div>
        <div className="grid grid-cols-3 gap-2">
          {SFX_AUDIO.map(({ name, id }) => {
            return <FxItem key={id} id={id} name={name} variant="md" />;
          })}
        </div>
      </div> */}
    </div>
  );
};

export default OnboardingAudioContent;
