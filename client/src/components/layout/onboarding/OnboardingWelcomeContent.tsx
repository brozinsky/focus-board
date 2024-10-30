import { Input } from "@/components/ui/inputs/Input";
import React, { useState } from "react";

const OnboardingWelcomeContent = () => {
  const [userName, setUserName] = useState<string | null>(null);
  return (
    <div >
      <h1 className="text-3xl mb-4 font-normal">Welcome to Study Board!</h1>
      <p className="text-lg text mb-4">
        We're excited to help you get started! In just a few steps, you'll have
        everything set up the way you like.
      </p>
      <p className="text-lg text mb-4">
        Whether you're planning your day or organizing projects, we'll make sure
        you're good to go.
      </p>
      <p className="text-lg text mb-10">Ready to dive in?</p>
      <p className="text-lg text mb-4">First, what’s your name?</p>
      <Input
        id="email"
        className="w-full"
        type="email"
        value={userName ?? ""}
        onChange={(e) => setUserName(e.target.value)}
        required
      />
    </div>
  );
};

export default OnboardingWelcomeContent;
