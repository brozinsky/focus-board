import React, { useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import MobileNotSupported from "../MobileNotSupported";

const Home = () => {
  const matches = useMediaQuery("(max-width: 768px)");

  // if (matches) {
  //   return <MobileNotSupported />;
  // }

  return (
    <div className="App" unselectable="on">
      <div className="bg-video" unselectable="on">
        <iframe
          src={`https://www.youtube.com/embed/D9km3yXmR8k?enablejsapi=1`}
          title="Background video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          unselectable="on"
          onSelect={() => false}
          onMouseDown={() => false}
        />
      </div>
    </div>
  );
};

export default Home;
