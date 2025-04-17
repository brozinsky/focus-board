import { useAuthStore } from "@/stores/zustand/auth/auth.store";
import { supabaseClient } from "@/api/client";
import usePlayerStore from "@/stores/zustand/player/player.store";

const useSupabaseSync = () => {
  const { login, logout } = useAuthStore();

  const {
    audioSource,
    activeScene,
    currentVideo,
    currentAudio,
    currentBgVideoId,
  } = usePlayerStore();

  const syncLocalStorage = async () => {
    try {
      // Retrieve the user
      const { data: userData, error: userError } =
        await supabaseClient.auth.getUser();

      if (userError || !userData?.user) {
        console.error("Error retrieving user:", userError?.message);
        return;
      }

      const userId = userData.user.id;

      console.log('--- userId ---', userId);

      const { data, error } = await supabaseClient
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

        console.log('||| DATA |||',data);

      if (error) {
        console.error("Error updating audio source:", error.message);
      } else {
        console.log("Audio source updated to Spotify:", data);
      }
    } catch (error) {
      console.error("Unexpected error updating audio source:", error);
    }
  };

  const syncSupabase = async () => {
    try {
      // Retrieve the user
      const { data: userData, error: userError } =
        await supabaseClient.auth.getUser();

      if (userError || !userData?.user) {
        console.error("Error retrieving user:", userError?.message);
        return;
      }

      const userId = userData.user.id;

      const { data, error } = await supabaseClient
        .from("users")
        .update({
          audioSource,
          currentVideo,
          currentBgVideoId,
          currentAudio,
          activeScene,
        })
        .eq("id", userId);

      if (error) {
        console.error("Error updating audio source:", error.message);
      } else {
        console.log("Audio source updated to Spotify:", data);
      }
    } catch (error) {
      console.error("Unexpected error updating audio source:", error);
    }
  };

  return {
    syncSupabase,
    syncLocalStorage,
  };
};

export default useSupabaseSync;
