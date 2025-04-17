import React, { useEffect, useState } from "react";
import cafeMP3 from "@/assets/audio/fx/cafe.mp3";
import campfireMP3 from "@/assets/audio/fx/campfire.mp3";
import forestMP3 from "@/assets/audio/fx/forest.mp3";
import keyboardTypingMP3 from "@/assets/audio/fx/keyboard-typing.mp3";
import futureCityMP3 from "@/assets/audio/fx/future-city.mp3";
import cityMP3 from "@/assets/audio/fx/city.mp3";
import rainMP3 from "@/assets/audio/fx/rain.mp3";
import softRainMP3 from "@/assets/audio/fx/soft-rain.mp3";
import nightMP3 from "@/assets/audio/fx/night-forest.mp3";
import wavesMP3 from "@/assets/audio/fx/waves.mp3";
import windMP3 from "@/assets/audio/fx/wind.mp3";
import { TSoundFX } from "@/types/model-types";

export const SFX_AUDIO: TSoundFX[] = [
  {
    id: "rain",
    volume: 0.5,
    audio: rainMP3,
    name: "Rain",
    isActive: false,
    isPremium: false,
  },
  {
    id: "forest",
    volume: 0.5,
    audio: forestMP3,
    name: "Forest",
    isActive: false,
    isPremium: false,
  },
  {
    id: "ocean-waves",
    volume: 0.5,
    audio: wavesMP3,
    name: "Ocean waves",
    isActive: false,
    isPremium: false,
  },
  {
    id: "wind",
    volume: 0.5,
    audio: windMP3,
    name: "Wind",
    isActive: false,
    isPremium: false,
  },
  {
    id: "night",
    volume: 0.5,
    audio: nightMP3,
    name: "Night",
    isActive: false,
    isPremium: false,
  },
  {
    id: "future-city",
    volume: 0.5,
    audio: futureCityMP3,
    name: "Future city",
    isActive: false,
    isPremium: false,
  },
  {
    id: "storm",
    volume: 0.5,
    audio: rainMP3,
    name: "Storm",
    isActive: false,
    isPremium: false,
  },
  {
    id: "coffee-shop",
    volume: 0.5,
    audio: cafeMP3,
    name: "Coffee shop",
    isActive: false,
    isPremium: false,
  },
  {
    id: "campfire",
    volume: 0.5,
    audio: campfireMP3,
    name: "Campfire",
    isActive: false,
    isPremium: false,
  },
  {
    id: "city",
    volume: 0.5,
    audio: cityMP3,
    name: "City",
    isActive: false,
    isPremium: false,
  },
];
