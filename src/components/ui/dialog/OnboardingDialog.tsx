import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/dialog/AlertDialog";
import MusicNoteSVG from "@/components/elements/svg/icons/media/MusicNoteSVG";
import ButtonIcon from "../buttons/ButtonIcon";
import useWindowsStore from "@/stores/zustand/useWindowsStore";

const StepAudio = () => {
  const { setIsOpen } = useWindowsStore();

  return (
    <div>
      <p>
        Start by choosing the perfect background audio to set the tone for your
        session. Whether you want something calming or energizing, we've got
        options. You can tweak the additional sound effects and adjust the
        volumes.
      </p>
      <div className="py-5">
        <MusicNoteSVG />
      </div>
      <p>
        Start by choosing the perfect background audio to set the tone for your
        session. Whether you want something calming or energizing, we've got
        options. You can tweak the additional sound effects and adjust the
        volumes.
      </p>
      <ButtonIcon
        onClick={() => setIsOpen("playlist", true)}
        icon={<MusicNoteSVG />}
        tooltip={"Playlist"}
      />
    </div>
  );
};

const OnboardingDialog = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 12;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const stepContent = [
    {
      title: "Welcome to Study Board!",
      content:
        "We're excited to help you get started! In just a few steps, you'll have everything set up the way you like. Whether you're planning your day or organizing projects, we'll make sure you're good to go. Ready to dive in?",
    },
    {
      title: "Pick Your Vibe 🎧",
      content: <StepAudio />,
    },
    {
      title: "Set the Scene 🎨",
      content:
        "Next up, personalize your workspace with a background that fits your style. Adjust brightness, add a blur, or try different overlays to make it your own. You can also play around with theme colors to really make it pop!",
    },
    {
      title: "Focus Mode ⏱️",
      content:
        "Need to stay on track? Check out our built-in timers: pomodoro, stopwatch, or a regular timer. They're all right here to help you focus and boost productivity. Use them to manage your time and stay on top of your tasks!",
    },
    {
      title: "Stay Organized 📝",
      content:
        "Stay on top of everything with our to-do list, sticky notes, and journal. You can quickly jot down thoughts, track tasks, or reflect on your day. It's your personal command center for staying organized and productive!",
    },
    {
      title: "Your Control Hub ⚙️",
      content:
        "Here's where you'll find all the important settings, including fullscreen mode and the option to hide or show the panel. Whether you want a clean workspace or easy access to everything, this is your control center!",
    },
    {
      heading: "Log in to Save Your Progress 🔐",
      content:
        "You can log in to your account anytime to save your settings and progress. If you're not logged in, your data will be stored locally, but it could be lost if you clear your browser's storage. Don't forget to log in to keep everything safe!",
    },
    {
      heading: "Ready to Start? 🚀",
      content:
        "You're all set! Dive into Study Board and make it your own. Explore all the features and tools available, and enjoy your personalized workspace. Let's get started and make today productive!",
    },
    // "Step 2: Customize your profile.",
    // "Step 3: Set your preferences.",
    // ... add more step descriptions
    { title: "Test", content: "Final Step: You are ready to go!" },
  ];

  return (
    <AlertDialog>
      <AlertDialogTrigger>Open Onboarding</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {stepContent[step - 1].title || "Content for this step."}
          </AlertDialogTitle>
          <AlertDialogDescription>
            <p className="text-base">
              {stepContent[step - 1].content || "Content for this step."}
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="mt-4 flex justify-between gap-4 w-full">
            <div>{`${step} / ${totalSteps}`}</div>
            <div className="flex gap-4">
              <button
                onClick={handlePrevious}
                disabled={step === 1}
                className="btn"
              >
                {step === 1 ? "Return" : "Previous"}
              </button>
              <AlertDialogCancel>Skip tutorial</AlertDialogCancel>
              <button
                onClick={handleNext}
                className="btn"
                disabled={step === totalSteps}
              >
                {step === totalSteps ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OnboardingDialog;
