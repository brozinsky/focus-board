import Games from "@/components/modules/Games/Games.";
import Photos from "@/components/modules/Photos/Photos";
import Playlist from "@/components/modules/Playlist/Playlist";
import Pomodoro from "@/components/modules/Pomodoro/Pomodoro";
import Scenes from "@/components/modules/Scenes/Scenes";
import SoundFX from "@/components/modules/SoundFX/SoundFX";
import StickyNotes from "@/components/modules/StickyNotes/StickyNotes";
import StickyNotesDb from "@/components/modules/StickyNotes/StickyNotesDb";
import Timer from "@/components/modules/Timer/Timer";
import TodoList from "@/components/modules/TodoList/TodoList";
import { useAuthStore } from "@/stores/zustand/auth/useAuthStore";
import useWindowsStore from "@/stores/zustand/useWindowsStore";

type TWindows =
  | "pomodoro"
  | "timer"
  | "todoList"
  | "playlist"
  | "scene"
  | "soundFX";

const windowComponents: Record<TWindows, React.ComponentType> = {
  pomodoro: Pomodoro,
  timer: Timer,
  todoList: TodoList,
  playlist: Playlist,
  scene: Scenes,
  soundFX: SoundFX,
};

const Windows = () => {
  const { isOpen } = useWindowsStore();
  const { isLoggedIn } = useAuthStore();

  return (
    <>
      {Object.entries(windowComponents).map(([key, Component]) => {
        const itemKey = key as TWindows;
        return isOpen[itemKey] ? <Component key={itemKey} /> : null;
      })}
      {isLoggedIn ? <StickyNotesDb /> : <StickyNotes />}
      <Photos />
      <Games />
    </>
  );
};

export default Windows;
