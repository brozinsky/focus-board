import Games from "@/components/modules/Games/Games.";
import Habits from "@/components/modules/HabitTracker/Habits";
import Journal from "@/components/modules/Journal/Journal";
import Photos from "@/components/modules/Photos/Photos";
import Playlist from "@/components/modules/Playlist/Playlist";
import Pomodoro from "@/components/modules/Pomodoro/Pomodoro";
import Scenes from "@/components/modules/Scenes/Scenes";
import SoundFX from "@/components/modules/SoundFX/SoundFX";
import StickyNotes from "@/components/modules/StickyNotes/StickyNotes";
import StickyNotesDb from "@/components/modules/StickyNotes/StickyNotesDb";
import Timer from "@/components/modules/Timer/Timer";
import TodoList from "@/components/modules/TodoList/TodoList";
import { useAuthStore } from "@/stores/zustand/auth/auth.store";
import useWindowsStore from "@/stores/zustand/global/windows.store";

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
    <div className="absolute z-20 left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] bg-black text-white p-10">
    </div>
      {Object.entries(windowComponents).map(([key, Component]) => {
        const itemKey = key as TWindows;
        return isOpen[itemKey] ? <Component key={itemKey} /> : null;
      })}
      {isLoggedIn ? <StickyNotesDb /> : <StickyNotes />}
      <Photos />
      <Games />
      <Journal />
      <Habits />
    </>
  );
};

export default Windows;
