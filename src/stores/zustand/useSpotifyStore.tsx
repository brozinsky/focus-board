import {
  getFromLocalStorage,
  setToLocalStorage,
} from "@/utils/common.utils";
import { create } from "zustand";

interface IProps {
  playlistUrl: string;
  setPlaylistUrl: (url: string) => void;
  setPlaylistFromId: (playlistId: string) => void;
  playlists: any[];
  setPlaylists: (playlists: any[]) => void;
}

const EMBED_URL_PREFIX = "https://open.spotify.com/embed/playlist/";
const PLAYLIST_ID = import.meta.env.VITE_SPOTIFY_PLAYLIST_ID;
const INITIAL_PLAYLIST = `${EMBED_URL_PREFIX}${PLAYLIST_ID}?theme=0`;

export const useSpotifyStore = create<IProps>((set) => ({
  playlistUrl: getFromLocalStorage("playlistUrl", INITIAL_PLAYLIST),
  playlists: getFromLocalStorage("spotifyPlaylists", []),
  setPlaylistUrl: (url: string) => {
    setToLocalStorage("playlistUrl", url);
    set({ playlistUrl: url });
  },
  setPlaylistFromId: (playlistId: string) => {
    const url = `${EMBED_URL_PREFIX}${playlistId}?theme=0`;
    setToLocalStorage("playlistUrl", url);
    set({ playlistUrl: url });
  },
  setPlaylists: (playlists: any) => {
    setToLocalStorage("spotifyPlaylists", playlists);
    set({ playlists: playlists });
  },
}));
