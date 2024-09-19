import Games from "@/components/modules/Games/Games.";
import Playlist from "@/components/modules/Playlist/Playlist";
import Pomodoro from "@/components/modules/Pomodoro/Pomodoro";
import Scenes from "@/components/modules/Scenes/Scenes";
import SoundFX from "@/components/modules/SoundFX/SoundFX";
import StickyNotes from "@/components/modules/StickyNotes/StickyNotes";
import Timer from "@/components/modules/Timer/Timer";
import TodoList from "@/components/modules/TodoList/TodoList";
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

  return (
    <>
      {Object.entries(windowComponents).map(([key, Component]) => {
        const itemKey = key as TWindows;
        return isOpen[itemKey] ? <Component key={itemKey} /> : null;
      })}
      <StickyNotes />
      <Games />
    </>
  );
};

export default Windows;
