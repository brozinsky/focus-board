import {
  getFromLocalStorage,
  setToLocalStorage,
} from "@/utils/functions/fn-common";
import { create } from "zustand";

interface IProps {
  playlistUrl: string;
  setPlaylistUrl: (url: string) => void;
  setPlaylistFromId: (playlistId: string) => void;
}

const EMBED_URL_PREFIX = "https://open.spotify.com/embed/playlist/";
const PLAYLIST_ID = import.meta.env.VITE_SPOTIFY_PLAYLIST_ID;
const INITIAL_PLAYLIST = `${EMBED_URL_PREFIX}${PLAYLIST_ID}?theme=0`;

export const useSpotifyStore = create<IProps>((set) => ({
  playlistUrl: getFromLocalStorage("playlistUrl", INITIAL_PLAYLIST),
  setPlaylistUrl: (url: string) => {
    setToLocalStorage("playlistUrl", url);
    set({ playlistUrl: url });
  },
  setPlaylistFromId: (playlistId: string) => {
    const url = `${EMBED_URL_PREFIX}${playlistId}?theme=0`;
    setToLocalStorage("playlistUrl", url);
    set({ playlistUrl: url });
  },
}));
