import { useEffect, useState } from "react";
import useAudioPlayer from "../useAudioPlayer";
import usePlayerStore from "@/stores/zustand/usePlayerStore";
import { useAuthStore } from "@/stores/zustand/auth/useAuthStore";
import { supabaseClient } from "@/api/client";

const useAppLoading = () => {
  const { audioSource, currentAudio } = usePlayerStore();
  const { isAudioReady } = useAudioPlayer();
  const { login, logout } = useAuthStore();
  const [isAppLoading, setIsAppLoading] = useState<boolean>(true);
  const [isCheckingUserLogged, setIsCheckingUserLogged] =
    useState<boolean>(true);

  useEffect(() => {
    if (!isCheckingUserLogged && currentAudio && !isAudioReady) {
      setIsAppLoading(false);
    }
  }, [isCheckingUserLogged, isAudioReady, audioSource]);

  useEffect(() => {
    if (isAppLoading) {
      const {
        data: { subscription },
      } = supabaseClient.auth.onAuthStateChange((_, session) => {
        setIsCheckingUserLogged(true);
        if (session?.user) {
          console.log("User Logged!", session?.user);
          login(session?.user);
        } else {
          console.log("💁No user logged in");
          logout();
        }
        setIsCheckingUserLogged(false);
      });

      return () => subscription.unsubscribe();
    }
  }, [login, logout, isAppLoading]);

  return {
    isAppLoading,
  };
};

export default useAppLoading;
