import React, { useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import MobileNotSupported from "../MobileNotSupported";

const Home = () => {
  const [activeInstrument, setActiveInstrument] = useState<"piano" | "guitar">(
    "piano"
  );
  const matches = useMediaQuery("(max-width: 768px)");

  if (matches) {
    return <MobileNotSupported />;
  }

  return (
    <div className="container flex justify-center items-center py-8 xl:h-screen">
     init
    </div>
  );
};

export default Home;
